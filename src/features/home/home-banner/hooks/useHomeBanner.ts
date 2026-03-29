import { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, useWindowDimensions, type NativeSyntheticEvent, type NativeScrollEvent } from "react-native";
import { AUTO_SCROLL_INTERVAL, HORIZONTAL_PADDING } from "../constants/constants";
import type { BannerItem } from "../HomeBanner";

export const useHomeBanner = (items: BannerItem[]) => {
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<BannerItem>>(null);
  const isUserScrolling = useRef(false);

  const contentWidth = screenWidth - HORIZONTAL_PADDING * 2;

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      if (isUserScrolling.current) return;

      const nextIndex = (activeIndex + 1) % items.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex, items.length]);

  const handleMomentumScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / contentWidth);
      setActiveIndex(index);
    },
    [contentWidth],
  );

  const keyExtractor = useCallback((item: BannerItem) => item.id, []);

  const handleScrollBeginDrag = useCallback(() => {
    isUserScrolling.current = true;
  }, []);

  const handleScrollEndDrag = useCallback(() => {
    isUserScrolling.current = false;
  }, []);

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: contentWidth,
      offset: contentWidth * index,
      index,
    }),
    [contentWidth],
  );

  return {
    activeIndex,
    contentWidth,
    flatListRef,
    keyExtractor,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    handleMomentumScrollEnd,
    getItemLayout,
  };
};