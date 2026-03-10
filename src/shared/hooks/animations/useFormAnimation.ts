import { useCallback } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface UseFormAnimationOptions {
  disabled?: boolean;
}

export const useFormAnimation = (options?: UseFormAnimationOptions) => {
  const { disabled = false } = options ?? {};
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : 1,
  }));

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(0.97, {
      stiffness: 300,
      damping: 20,
      mass: 1,
    });
  }, [disabled, scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, {
      stiffness: 300,
      damping: 20,
      mass: 1,
    });
  }, [scale]);

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
  };
};
