import React, { Children, cloneElement, isValidElement } from "react";
import { View, Pressable, Text, StyleSheet, ScrollView, LayoutChangeEvent, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { usePressAnimation, useHaptic } from "@shared/hooks";
import { useTabIndicator } from "./useTabIndicator";

interface TabItemProps {
  children: React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
}

interface InternalItemProps extends TabItemProps {
  _flex?: boolean;
  _onLayout?: (e: LayoutChangeEvent) => void;
}

interface TabProps {
  children: React.ReactNode;
  itemGap?: number;
  fluid?: boolean;
  onChange?: (index: number) => void;
  customStyle?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabItem = ({ children, selected, onPress, _flex, _onLayout }: InternalItemProps) => {
  const { colors } = useTheme();
  const triggerHaptic = useHaptic("light");
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation({
    scale: 0.95,
  });

  return (
    <AnimatedPressable
      onPress={() => { triggerHaptic(); onPress?.(); }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLayout={_onLayout}
      style={[
        styles.item,
        _flex ? styles.itemFlex : undefined,
        animatedStyle,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          { color: selected ? colors.text.primary : colors.text.tertiary },
        ]}
      >
        {children}
      </Text>
    </AnimatedPressable>
  );
};

interface TabComponent extends React.FC<TabProps> {
  Item: React.FC<TabItemProps>;
}

export const Tab: TabComponent = ({
  children,
  itemGap,
  fluid = false,
  onChange,
  customStyle = {},
}) => {
  const { colors } = useTheme();
  const { selectedIndex, indicatorAnimatedStyle, handleItemLayout } = useTabIndicator(children);

  const renderChildren = () =>
    Children.map(children, (child, index) => {
      if (!isValidElement<InternalItemProps>(child)) return child;
      const shouldFlex = !fluid && !itemGap;
      return cloneElement(child, {
        onPress: () => onChange?.(index),
        _flex: shouldFlex,
        _onLayout: (e: LayoutChangeEvent) => handleItemLayout(index, e),
      });
    });

  const indicator = (
    <Animated.View
      style={[
        styles.indicator,
        { backgroundColor: colors.text.primary },
        indicatorAnimatedStyle,
      ]}
    />
  );

  if (fluid) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          styles.container,
          itemGap ? { gap: itemGap } : undefined,
          customStyle,
        ]}
        contentContainerStyle={styles.scrollContent}
      >
        {renderChildren()}
        {indicator}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.container,
        itemGap ? { gap: itemGap } : undefined,
        customStyle,
      ]}
    >
      {renderChildren()}
      {indicator}
    </View>
  );
};

Tab.Item = TabItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
  },
  scrollContent: {
    flexDirection: "row",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  itemFlex: {
    flex: 1,
  },
  itemText: {
    ...typo("Body1", "Medium"),
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
  },
});

export type { TabProps, TabItemProps };
