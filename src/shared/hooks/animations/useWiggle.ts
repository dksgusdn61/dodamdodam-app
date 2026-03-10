import { useCallback, useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { useHaptic } from "../useHaptic";

const WIGGLE_STEP = 42;

interface UseWiggleOptions {
  closeOnDimmerClick?: boolean;
  onClose?: () => void;
  setDimClickHandler?: (handler: () => void) => void;
}

export const useWiggle = ({
  closeOnDimmerClick = false,
  onClose,
  setDimClickHandler,
}: UseWiggleOptions) => {
  const translateX = useSharedValue(0);
  const triggerHaptic = useHaptic("warning");

  const wiggle = useCallback(() => {
    triggerHaptic();
    translateX.value = withSequence(
      withTiming(4, { duration: WIGGLE_STEP }),
      withTiming(-4, { duration: WIGGLE_STEP }),
      withTiming(3, { duration: WIGGLE_STEP }),
      withTiming(-3, { duration: WIGGLE_STEP }),
      withTiming(0, { duration: WIGGLE_STEP })
    );
  }, [translateX, triggerHaptic]);

  const handleDimClick = useCallback(() => {
    if (closeOnDimmerClick) {
      onClose?.();
    } else {
      wiggle();
    }
  }, [closeOnDimmerClick, onClose, wiggle]);

  useEffect(() => {
    if (setDimClickHandler) {
      setDimClickHandler(handleDimClick);
    }
  }, [setDimClickHandler, handleDimClick]);

  const wiggleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { wiggleStyle, wiggle };
};
