import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface UseFadeAnimationOptions {
  visible: boolean;
  duration?: number;
}

export const useFadeAnimation = ({
  visible,
  duration = 200,
}: UseFadeAnimationOptions) => {
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [visible, duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { animatedStyle, opacity };
};
