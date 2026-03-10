import React, { useMemo, Dispatch, SetStateAction, useCallback } from "react";
import { View, Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useHaptic, useSegmentedIndicator } from "@shared/hooks";
import { typo, shapes } from "@shared/tokens";

interface SegmentedButtonData {
  text: string;
  isActive: boolean;
  value: string;
}

interface SegmentedButtonProps {
  data: SegmentedButtonData[];
  setData: Dispatch<SetStateAction<SegmentedButtonData[]>>;
  onBlockClick?: (value: string) => void;
  width?: number | "auto";
  containerCustomStyle?: ViewStyle;
  itemCustomStyle?: ViewStyle;
}

const SegmentedItem = ({
  item,
  onPress,
  style,
}: {
  item: SegmentedButtonData;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  const { colors } = useTheme();
  const triggerHaptic = useHaptic("light");
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withTiming(0.95, { duration: 100, easing: Easing.linear });
  }, [scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withTiming(1, { duration: 100, easing: Easing.linear });
  }, [scale]);

  return (
    <Pressable
      onPress={() => { triggerHaptic(); onPress(); }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.item, style]}
    >
      <Animated.View style={animatedStyle}>
        <Text
          style={[
            styles.itemText,
            {
              color: item.isActive
                ? colors.text.primary
                : colors.text.secondary,
            },
          ]}
        >
          {item.text}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export const SegmentedButton = ({
  data,
  setData,
  onBlockClick,
  width = "auto",
  containerCustomStyle = {},
  itemCustomStyle = {},
}: SegmentedButtonProps) => {
  const { colors } = useTheme();

  const selectedIndex = useMemo(
    () => data.findIndex((item) => item.isActive),
    [data]
  );

  const { handleContainerLayout, indicatorAnimatedStyle } = useSegmentedIndicator({
    selectedIndex,
    itemCount: data.length,
    padding: 4,
  });

  const handleClick = (value: string) => {
    onBlockClick?.(value);
    setData((prev) =>
      prev.map((item) => ({ ...item, isActive: item.value === value }))
    );
  };

  return (
    <View
      onLayout={handleContainerLayout}
      style={[
        styles.container,
        {
          backgroundColor: colors.fill.secondary,
          borderRadius: shapes.medium,
        },
        width !== "auto" ? { width } : undefined,
        containerCustomStyle,
      ]}
    >
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: colors.fill.primary,
            borderRadius: shapes.small,
          },
          indicatorAnimatedStyle,
        ]}
      />
      {data.map((item) => (
        <SegmentedItem
          key={item.value}
          item={item}
          onPress={() => handleClick(item.value)}
          style={itemCustomStyle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 48,
    minHeight: 48,
    padding: 4,
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  itemText: {
    ...typo("Headline", "Medium"),
  },
});

export type { SegmentedButtonProps, SegmentedButtonData };
