import { useState, useEffect, useCallback } from "react";
import { type LayoutChangeEvent } from "react-native";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Children, isValidElement } from "react";
import type { TabItemProps } from "./Tab";

const INDICATOR_SPRING = {
  damping: 20,
  stiffness: 200,
  mass: 1,
  overshootClamping: true,
};

export const useTabIndicator = (children: React.ReactNode) => {
  const [layouts, setLayouts] = useState<{ x: number; width: number }[]>([]);
  const indicatorLeft = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  const selectedIndex = Children.toArray(children).findIndex(
    (child) => isValidElement<TabItemProps>(child) && child.props.selected
  );

  useEffect(() => {
    if (selectedIndex >= 0 && layouts[selectedIndex]) {
      indicatorLeft.value = withSpring(
        layouts[selectedIndex].x,
        INDICATOR_SPRING
      );
      indicatorWidth.value = withSpring(
        layouts[selectedIndex].width,
        INDICATOR_SPRING
      );
    }
  }, [selectedIndex, layouts, indicatorLeft, indicatorWidth]);

  const indicatorAnimatedStyle = useAnimatedStyle(() => ({
    left: indicatorLeft.value,
    width: indicatorWidth.value,
  }));

  const handleItemLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setLayouts((prev) => {
        const next = [...prev];
        next[index] = { x, width };
        return next;
      });
    },
    []
  );

  return { selectedIndex, indicatorAnimatedStyle, handleItemLayout };
};
