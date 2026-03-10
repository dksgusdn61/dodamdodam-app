import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface UseScaleAnimationOptions {
  visible: boolean;
}

export const useScaleAnimation = ({ visible }: UseScaleAnimationOptions) => {
  const scale = useSharedValue(visible ? 1 : 0.9);
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(visible ? 1 : 0.9, {
      stiffness: 400,
      damping: 25,
      mass: 1,
    });
    opacity.value = withSpring(visible ? 1 : 0, {
      stiffness: 400,
      damping: 25,
      mass: 1,
    });
  }, [visible, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle, scale, opacity };
};
