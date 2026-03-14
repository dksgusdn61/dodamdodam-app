import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { usePressAnimation } from "@shared/hooks";
import { typo } from "@shared/tokens";
import { ChevronRight } from "@shared/icons/mono";

interface SettingItemProps {
  title: string;
  rightText?: string;
  color?: string;
  onPress?: () => void;
}

export const SettingItem = React.memo(
  ({ title, rightText, color, onPress }: SettingItemProps) => {
    const { colors } = useTheme();
    const { animatedStyle, handlePressIn, handlePressOut } =
      usePressAnimation({ scale: 0.98 });

    return (
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={[styles.title, { color: color ?? colors.text.primary }]}>{title}</Text>
          {rightText ? (
            <Text style={[styles.rightText, { color: colors.text.tertiary }]}>
              {rightText}
            </Text>
          ) : (
            <ChevronRight size={16} color={colors.text.tertiary} />
          )}
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 52,
  },
  title: {
    ...typo("Body1", "Medium"),
  },
  rightText: {
    ...typo("Body1", "Regular"),
  },
});
