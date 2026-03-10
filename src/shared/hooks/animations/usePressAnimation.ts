import { useCallback } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface UsePressAnimationOptions {
  scale?: number;
  disabled?: boolean;
}

export const usePressAnimation = (options?: UsePressAnimationOptions) => {
  const { scale = 0.95, disabled = false } = options ?? {};
  const scaleValue = useSharedValue(1);
  const brightnessValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const brightnessOverlayStyle = useAnimatedStyle(() => ({
    opacity: brightnessValue.value,
  }));

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    scaleValue.value = withTiming(scale, {
      duration: 100,
      easing: Easing.linear,
    });
    brightnessValue.value = withTiming(0.08, {
      duration: 100,
      easing: Easing.linear,
    });
  }, [disabled, scale, scaleValue, brightnessValue]);

  const handlePressOut = useCallback(() => {
    scaleValue.value = withTiming(1, {
      duration: 100,
      easing: Easing.linear,
    });
    brightnessValue.value = withTiming(0, {
      duration: 100,
      easing: Easing.linear,
    });
  }, [scaleValue, brightnessValue]);

  return {
    animatedStyle,
    brightnessOverlayStyle,
    handlePressIn,
    handlePressOut,
  };
};
