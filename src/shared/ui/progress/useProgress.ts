import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const TRANSITION_CONFIG = {
  duration: 250,
  easing: Easing.bezier(0.33, 1, 0.68, 1),
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));

export const useProgress = (progress: number) => {
  const value = clamp(progress);
  const widthPercent = useSharedValue(value);

  useEffect(() => {
    widthPercent.value = withTiming(value, TRANSITION_CONFIG);
  }, [value, widthPercent]);

  const barAnimatedStyle = useAnimatedStyle(() => ({
    width: `${widthPercent.value}%` as unknown as number,
  }));

  return { value, barAnimatedStyle };
};
