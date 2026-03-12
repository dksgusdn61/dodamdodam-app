import React from "react";
import { View, type ViewStyle } from "react-native";
import { useTheme } from "@shared/theme";

interface DividerProps {
  thickness?: number;
  color?: string;
  marginHorizontal?: number;
  marginVertical?: number;
  style?: ViewStyle;
}

export const Divider = React.memo(({
  thickness = 1,
  color,
  marginHorizontal = 16,
  marginVertical = 8,
  style,
}: DividerProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          height: thickness,
          backgroundColor: color ?? colors.border.subtle,
          marginHorizontal,
          marginVertical,
        },
        style,
      ]}
    />
  );
});
