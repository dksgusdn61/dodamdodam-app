import React, { useEffect } from "react";
import { type ViewStyle } from "react-native";
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
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      false,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 0.5, 1],
      [0.4, 1, 0.4],
    );
    return { opacity };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: colors.border.disabled,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

export type { SkeletonProps };