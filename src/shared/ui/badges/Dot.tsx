import React from "react";
import { View, type ViewStyle } from "react-native";
import { useTheme } from "@shared/theme";

interface DotProps {
  size?: number;
  backgroundColor?: string;
  dotCustomStyle?: ViewStyle;
}

export const Dot = ({
  size = 8,
  backgroundColor,
  dotCustomStyle = {},
}: DotProps) => {
  const { colors } = useTheme();
  const bgColor = backgroundColor ?? colors.status.error;

  return (
    <View
      style={[
        {
          width: size,
          minWidth: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: bgColor,
        },
        dotCustomStyle,
      ]}
    />
  );
};
