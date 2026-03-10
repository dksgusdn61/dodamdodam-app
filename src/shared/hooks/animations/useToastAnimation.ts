import { useEffect, useCallback, useRef } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import type { ToastPosition } from "@shared/ui/toast/toastManager";

const SWIPE_THRESHOLD = 60;
const DRAG_ELASTIC = 0.5;
const EXIT_DURATION = 200;

const TOAST_SPRING = { damping: 22, stiffness: 300, mass: 1 };
const SNAP_SPRING = { stiffness: 500, damping: 30 };

interface UseToastAnimationOptions {
  position: ToastPosition;
  duration: number;
  onRemove: () => void;
}

export const useToastAnimation = ({
  position,
  duration,
  onRemove,
}: UseToastAnimationOptions) => {
  const isDismissing = useRef(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(position === "top" ? -100 : 100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    translateY.value = withSpring(0, TOAST_SPRING);
    scale.value = withSpring(1, TOAST_SPRING);
    opacity.value = withTiming(1, { duration: EXIT_DURATION });
  }, [translateY, opacity, scale]);

  const animateOut = useCallback(() => {
    if (isDismissing.current) return;
    isDismissing.current = true;
    const exitY = position === "top" ? -100 : 100;
    translateY.value = withSpring(exitY, TOAST_SPRING);
    scale.value = withSpring(0.9, TOAST_SPRING);
    opacity.value = withTiming(0, { duration: EXIT_DURATION }, () => {
      runOnJS(onRemove)();
    });
  }, [position, translateY, opacity, scale, onRemove]);

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(animateOut, duration);
    return () => clearTimeout(timer);
  }, [duration, animateOut]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX * DRAG_ELASTIC;
      translateY.value = event.translationY * DRAG_ELASTIC;
    })
    .onEnd((event) => {
      const shouldDismissX = Math.abs(event.translationX) > SWIPE_THRESHOLD;
      const shouldDismissY =
        (position === "top" && event.translationY < -SWIPE_THRESHOLD) ||
        (position === "bottom" && event.translationY > SWIPE_THRESHOLD);

      if (shouldDismissX) {
        translateX.value = withTiming(
          event.translationX > 0 ? 300 : -300,
          { duration: EXIT_DURATION },
          () => runOnJS(onRemove)()
        );
      } else if (shouldDismissY) {
        translateY.value = withTiming(
          position === "top" ? -100 : 100,
          { duration: EXIT_DURATION },
          () => runOnJS(onRemove)()
        );
      } else {
        translateX.value = withSpring(0, SNAP_SPRING);
        translateY.value = withSpring(0, SNAP_SPRING);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return { panGesture, animatedStyle };
};
