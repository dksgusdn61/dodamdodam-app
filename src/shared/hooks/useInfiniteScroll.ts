import { useCallback, useRef } from "react";
import type { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

const DEFAULT_THRESHOLD = 100;

export const useInfiniteScroll = (threshold = DEFAULT_THRESHOLD) => {
  const onEndReachedRef = useRef<(() => void) | null>(null);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
      const distanceFromEnd =
        contentSize.height - layoutMeasurement.height - contentOffset.y;
      if (distanceFromEnd < threshold) {
        onEndReachedRef.current?.();
      }
    },
    [threshold],
  );

  return { onScroll, onEndReachedRef };
};
