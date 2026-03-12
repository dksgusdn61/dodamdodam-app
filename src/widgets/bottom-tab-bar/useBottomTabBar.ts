import { useCallback, useEffect, useRef } from "react";
import type { LayoutChangeEvent } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { useHaptic } from "@shared/hooks";
import { INDICATOR_SIZE, PAN_ACTIVE_OFFSET, TIMING_CONFIG } from "./constants";

interface UseBottomTabBarParams {
  tabCount: number;
  activeIndex: number;
  onTabChange: (index: number) => void;
}

const calcTargetX = (
  index: number,
  barWidth: number,
  tabCount: number,
) => {
  "worklet";
  const tabW = barWidth / tabCount;
  return index * tabW + (tabW - INDICATOR_SIZE) / 2;
};

export const useBottomTabBar = ({
  tabCount,
  activeIndex,
  onTabChange,
}: UseBottomTabBarParams) => {
  const translateX = useSharedValue(0);
  const barWidth = useSharedValue(0);
  const dragStartX = useSharedValue(0);
  const isFirstRender = useRef(true);
  const haptic = useHaptic("light");

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    haptic();
    if (barWidth.value > 0) {
      translateX.value = withTiming(
        calcTargetX(activeIndex, barWidth.value, tabCount),
        TIMING_CONFIG,
      );
    }
  }, [activeIndex, tabCount]);

  const onBarLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const width = e.nativeEvent.layout.width;
      barWidth.value = width;
      translateX.value = calcTargetX(activeIndex, width, tabCount);
    },
    [activeIndex, tabCount],
  );

  const panGesture = Gesture.Pan()
    .activeOffsetX([-PAN_ACTIVE_OFFSET, PAN_ACTIVE_OFFSET])
    .onStart(() => {
      dragStartX.value = translateX.value;
    })
    .onUpdate((e) => {
      const tabW = barWidth.value / tabCount;
      const minX = (tabW - INDICATOR_SIZE) / 2;
      const maxX = (tabCount - 1) * tabW + minX;
      translateX.value = Math.max(
        minX,
        Math.min(maxX, dragStartX.value + e.translationX),
      );
    })
    .onEnd(() => {
      const tabW = barWidth.value / tabCount;
      const centerX = translateX.value + INDICATOR_SIZE / 2;
      const nearestIndex = Math.max(
        0,
        Math.min(tabCount - 1, Math.round(centerX / tabW - 0.5)),
      );
      translateX.value = withTiming(
        calcTargetX(nearestIndex, barWidth.value, tabCount),
        TIMING_CONFIG,
      );
      runOnJS(onTabChange)(nearestIndex);
    });

  const indicatorStyle = useAnimatedStyle(() => {
    if (barWidth.value === 0) return { opacity: 0 };
    return {
      opacity: 1,
      transform: [{ translateX: translateX.value }],
    };
  });

  return { onBarLayout, indicatorStyle, panGesture, translateX, barWidth };
};
