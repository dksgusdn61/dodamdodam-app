import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

interface UseSwitchAnimationOptions {
  checked: boolean;
  trackWidth: number;
  thumbSize: number;
  padding?: number;
  trackColorOff?: string;
  trackColorOn?: string;
}

export const useSwitchAnimation = ({
  checked,
  trackWidth,
  thumbSize,
  padding = 2,
  trackColorOff = "#e0e0e0",
  trackColorOn = "#3b82f6",
}: UseSwitchAnimationOptions) => {
  const progress = useSharedValue(checked ? 1 : 0);
  const maxTranslateX = trackWidth - thumbSize - padding * 2;

  useEffect(() => {
    progress.value = withSpring(checked ? 1 : 0, {
      stiffness: 500,
      damping: 30,
      mass: 1,
    });
  }, [checked, progress]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * maxTranslateX }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [trackColorOff, trackColorOn],
    ),
  }));

  return { thumbStyle, trackStyle, progress };
};
