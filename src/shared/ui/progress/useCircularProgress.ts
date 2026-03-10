import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";

export const SIZE = 70;
export const STROKE_WIDTH = 10;
export const CENTER = SIZE / 2;
export const RADIUS = (SIZE - STROKE_WIDTH) / 2;
export const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TRANSITION_CONFIG = {
  duration: 250,
  easing: Easing.bezier(0.33, 1, 0.68, 1),
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export const useCircularProgress = (progress: number) => {
  const value = clamp(progress);
  const animatedOffset = useSharedValue(CIRCUMFERENCE * (1 - value / 100));

  useEffect(() => {
    animatedOffset.value = withTiming(
      CIRCUMFERENCE * (1 - value / 100),
      TRANSITION_CONFIG
    );
  }, [value, animatedOffset]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: animatedOffset.value,
  }));

  return { value, animatedProps };
};
