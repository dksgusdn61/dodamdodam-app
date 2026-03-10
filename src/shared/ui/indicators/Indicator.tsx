import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";

interface IndicatorProps {
  size?: number;
  color?: string;
  current?: number;
  total?: number;
  onChangePage?: (page: number) => void;
}

export const Indicator = ({
  size = 10,
  color,
  current = 0,
  total = 0,
  onChangePage,
}: IndicatorProps) => {
  const { colors } = useTheme();
  const dotColor = color ?? colors.brand.primary;

  return (
    <View style={[styles.container, { gap: size }]}>
      {Array.from({ length: total }).map((_, index) => (
        <Pressable
          key={index}
          onPress={() => onChangePage?.(index)}
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor:
                index === current ? dotColor : colors.text.disabled,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export type { IndicatorProps };
