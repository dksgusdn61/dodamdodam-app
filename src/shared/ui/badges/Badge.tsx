import React from "react";
import { View, Text, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";

interface BadgeProps {
  backgroundColor?: string;
  badgeCustomStyle?: ViewStyle;
  number: number;
  maxNumber?: number;
}

export const Badge = ({
  backgroundColor,
  badgeCustomStyle = {},
  number,
  maxNumber = 999,
}: BadgeProps) => {
  const { colors } = useTheme();
  const bgColor = backgroundColor ?? colors.status.error;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bgColor },
        badgeCustomStyle,
      ]}
    >
      <Text style={[styles.text, { color: colors.static.white }]}>
        {number > maxNumber ? `${maxNumber}+` : number}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 999,
  },
  text: {
    ...typo("Label", "Medium"),
  },
});
