import React from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "@shared/theme";

interface IndicatorProps {
  size?: number;
  gap?: number;
  activeColor?: string;
  inactiveColor?: string;
  current?: number;
  total?: number;
  style?: ViewStyle;
}

export const Indicator = React.memo(({
  size = 6,
  gap = 4,
  activeColor,
  inactiveColor,
  current = 0,
  total = 0,
  style,
}: IndicatorProps) => {
  const { colors } = useTheme();
  const active = activeColor ?? colors.brand.primary;
  const inactive = inactiveColor ?? colors.text.disabled;

  if (total <= 1) return null;

  return (
    <View style={[styles.container, { gap }, style]}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: index === current ? active : inactive,
          }}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export type { IndicatorProps };
