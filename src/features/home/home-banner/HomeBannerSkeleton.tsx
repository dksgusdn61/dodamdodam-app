import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { CORNER_RADIUS, BANNER_HEIGHT, HORIZONTAL_PADDING } from "./constants/constants";

export const HomeBannerSkeleton = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.banner, { backgroundColor: colors.background.surface }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 12,
  },
  banner: {
    height: BANNER_HEIGHT,
    borderRadius: CORNER_RADIUS,
    borderCurve: "continuous",
  },
});
