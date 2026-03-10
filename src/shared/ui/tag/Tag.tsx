import React from "react";
import { Pressable, Text, StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import type { ColorTokens } from "@shared/tokens";

type TagColor = "red" | "blue" | "default";

interface TagProps {
  text: string;
  color?: TagColor;
  onPress?: () => void;
  customStyle?: ViewStyle;
}

const getBackgroundColor = (color: TagColor, colors: ColorTokens): string => {
  switch (color) {
    case "red":
      return colors.status.error;
    case "blue":
      return colors.brand.primary;
    case "default":
      return colors.fill.secondary;
  }
};

const getTextColor = (color: TagColor, colors: ColorTokens): string => {
  switch (color) {
    case "red":
    case "blue":
      return colors.static.white;
    case "default":
      return colors.text.primary;
  }
};

export const Tag = ({
  text,
  color = "default",
  onPress,
  customStyle,
}: TagProps) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: getBackgroundColor(color, colors),
          opacity: pressed && onPress ? 0.8 : 1,
        },
        customStyle,
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: getTextColor(color, colors) },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 45,
    minHeight: 30,
    borderRadius: 34,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    ...typo("Caption1", "Bold"),
    paddingVertical: 7.5,
    paddingHorizontal: 12,
  },
});

export type { TagColor, TagProps };
