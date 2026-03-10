import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { Person } from "@shared/icons/mono";

interface AvatarProps {
  size?: number;
}

export const Avatar = ({ size = 24 }: AvatarProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          minWidth: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.fill.primary,
        },
      ]}
    >
      <Person size={size * 0.6} color={colors.fill.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
