import { useCallback, useEffect } from "react";
import { type LayoutChangeEvent } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const SPRING_CONFIG = {
  stiffness: 150,
  damping: 20,
  mass: 1,
};

interface UseSegmentedIndicatorOptions {
  selectedIndex: number;
  itemCount: number;
  padding?: number;
}

export const useSegmentedIndicator = ({
  selectedIndex,
  itemCount,
  padding = 4,
}: UseSegmentedIndicatorOptions) => {
  const containerWidth = useSharedValue(0);
  const indicatorLeft = useSharedValue(0);

  const handleContainerLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const w = e.nativeEvent.layout.width;
      containerWidth.value = w;
      const itemW = (w - padding * 2) / itemCount;
      indicatorLeft.value = padding + itemW * selectedIndex;
    },
    [containerWidth, indicatorLeft, itemCount, selectedIndex, padding]
  );

  useEffect(() => {
    if (containerWidth.value === 0) return;
    const itemW = (containerWidth.value - padding * 2) / itemCount;
    indicatorLeft.value = withSpring(
      padding + itemW * selectedIndex,
      SPRING_CONFIG
    );
  }, [selectedIndex, itemCount, containerWidth, indicatorLeft, padding]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
    if (containerWidth.value === 0) return { left: 0, width: 0 };
    const itemW = (containerWidth.value - padding * 2) / itemCount;
    return {
      left: indicatorLeft.value,
      width: itemW,
    };
  });

  return { handleContainerLayout, indicatorAnimatedStyle };
};
