import React, { useEffect } from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "@shared/theme";

interface SkeletonProps {
  width: number | string;
  height: number;
  radius?: number;
  style?: ViewStyle;
}

export const Skeleton = ({ width, height, radius = 8, style }: SkeletonProps) => {
  const { colors } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.linear }),
      -1,
      false,
    );
  }, [progress]);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [-1, 2]);
    return {
      transform: [{ translateX: translateX * (typeof width === "number" ? width : 200) }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: colors.border.disabled,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            height,
            backgroundColor: colors.fill.primary,
          opacity: 0.75,
          },
          shimmerStyle,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    width: "60%",
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.4,
    transform: [{ skewX: "-20deg" }],
  },
});
