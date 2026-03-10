import { useState, useCallback, useRef, useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import type { OverlayElement } from "@shared/ui/overlay/OverlayContext";

const DIM_DURATION = 150;
const EXIT_DURATION = 250;
const CONTENT_DURATION = 200;
const CONTENT_EASING = Easing.out(Easing.cubic);

interface OverlayItem {
  id: string;
  element: OverlayElement;
}

export const useOverlayAnimation = () => {
  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const dimClickHandlerRef = useRef<(() => void) | null>(null);
  const isClosingRef = useRef(false);

  const dimOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.9);
  const contentOpacity = useSharedValue(0);

  const hasOverlays = overlays.length > 0;

  useEffect(() => {
    if (hasOverlays && !isClosingRef.current) {
      dimOpacity.value = withTiming(1, { duration: DIM_DURATION });
      contentScale.value = withTiming(1, {
        duration: CONTENT_DURATION,
        easing: CONTENT_EASING,
      });
      contentOpacity.value = withTiming(1, { duration: CONTENT_DURATION });
    }
  }, [hasOverlays, dimOpacity, contentScale, contentOpacity]);

  const removeOverlay = useCallback((id: string) => {
    setOverlays((prev) => prev.filter((item) => item.id !== id));
    dimClickHandlerRef.current = null;
    isClosingRef.current = false;
  }, []);

  const mount = useCallback(
    (id: string, element: OverlayElement) => {
      isClosingRef.current = false;
      dimOpacity.value = 0;
      contentScale.value = 0.9;
      contentOpacity.value = 0;
      setOverlays([{ id, element }]);
    },
    [dimOpacity, contentScale, contentOpacity]
  );

  const handleClose = useCallback(
    (id: string) => {
      if (isClosingRef.current) return;
      isClosingRef.current = true;
      dimOpacity.value = withTiming(0, { duration: EXIT_DURATION });
      contentScale.value = withTiming(0.9, { duration: EXIT_DURATION });
      contentOpacity.value = withTiming(0, { duration: EXIT_DURATION }, () => {
        runOnJS(removeOverlay)(id);
      });
    },
    [dimOpacity, contentScale, contentOpacity, removeOverlay]
  );

  const setDimClickHandler = useCallback((handler: () => void) => {
    dimClickHandlerRef.current = handler;
  }, []);

  const handleDimPress = useCallback(() => {
    dimClickHandlerRef.current?.();
  }, []);

  const dimAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dimOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: contentScale.value }],
    opacity: contentOpacity.value,
  }));

  return {
    overlays,
    hasOverlays,
    mount,
    handleClose,
    setDimClickHandler,
    handleDimPress,
    dimAnimatedStyle,
    contentAnimatedStyle,
  };
};
