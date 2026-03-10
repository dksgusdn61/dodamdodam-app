import { useEffect, useCallback } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface UseDialogAnimationOptions {
  open: boolean;
}

export const useDialogAnimation = ({ open }: UseDialogAnimationOptions) => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (open) {
      scale.value = withSpring(1, { stiffness: 300, damping: 25 });
      opacity.value = withSpring(1, { stiffness: 300, damping: 25 });
      translateX.value = 0;
    } else {
      scale.value = withSpring(0.9, { stiffness: 300, damping: 25 });
      opacity.value = withSpring(0, { stiffness: 300, damping: 25 });
    }
  }, [open, scale, opacity, translateX]);

  const wiggle = useCallback(() => {
    translateX.value = withSequence(
      withTiming(4, { duration: 50 }),
      withTiming(-4, { duration: 50 }),
      withTiming(3, { duration: 50 }),
      withTiming(-3, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
    ],
    opacity: opacity.value,
  }));

  return { animatedStyle, wiggle };
};
