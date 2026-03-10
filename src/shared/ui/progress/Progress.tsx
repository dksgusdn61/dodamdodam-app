import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useProgress } from "./useProgress";

interface ProgressProps {
  progress: number;
  disabled?: boolean;
  customStyle?: ViewStyle;
}

export const Progress = ({
  progress,
  disabled = false,
  customStyle = {},
}: ProgressProps) => {
  const { colors } = useTheme();
  const { value, barAnimatedStyle } = useProgress(progress);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.border.subtle },
        customStyle,
      ]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: value }}
    >
      <Animated.View
        style={[
          styles.bar,
          {
            backgroundColor: disabled
              ? colors.border.strong
              : colors.brand.primary,
          },
          barAnimatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 14,
    borderRadius: 999,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 999,
  },
});

export type { ProgressProps };
