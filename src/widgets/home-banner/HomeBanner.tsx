import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  type ImageSourcePropType,
  type ListRenderItemInfo,
  type ViewabilityConfig,
  type ViewToken,
} from "react-native";
import { useTheme } from "@shared/theme";
import { Indicator } from "@shared/ui";

export interface BannerItem {
  id: string;
  image: ImageSourcePropType;
}

interface HomeBannerProps {
  items: BannerItem[];
}

const CORNER_RADIUS = 20;
const BANNER_HEIGHT = 56;
const HORIZONTAL_PADDING = 16;
const AUTO_SCROLL_INTERVAL = 4000;


const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

interface BannerImageProps {
  item: BannerItem;
  width: number;
}

const BannerImage = React.memo(({ item, width }: BannerImageProps) => (
  <Image
    source={item.image}
    style={[styles.bannerImage, { width }]}
    resizeMode="cover"
  />
));

const onScrollBeginDrag = (ref: React.MutableRefObject<boolean>) => () => {
  ref.current = true;
};

const onScrollEndDrag = (ref: React.MutableRefObject<boolean>) => () => {
  ref.current = false;
};

export const HomeBanner = React.memo(({ items }: HomeBannerProps) => {
  const { colors } = useTheme();
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
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(timer);
  }, [activeIndex, items.length]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<BannerItem>) => (
      <BannerImage item={item} width={contentWidth} />
    ),
    [contentWidth],
  );

  const keyExtractor = useCallback((item: BannerItem) => item.id, []);

  const handleScrollBeginDrag = useCallback(
    onScrollBeginDrag(isUserScrolling),
    [],
  );
  const handleScrollEndDrag = useCallback(
    onScrollEndDrag(isUserScrolling),
    [],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: contentWidth,
      offset: contentWidth * index,
      index,
    }),
    [contentWidth],
  );

  if (items.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.banner, { backgroundColor: colors.background.surface }]}>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          style={{ width: contentWidth }}
          getItemLayout={getItemLayout}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
        <Indicator
          current={activeIndex}
          total={items.length}
          activeColor={colors.static.white}
          inactiveColor={colors.static.white + "4D"}
          style={styles.indicator}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 12,
  },
  banner: {
    height: BANNER_HEIGHT,
    borderRadius: CORNER_RADIUS,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  bannerImage: {
    height: BANNER_HEIGHT,
  },
  indicator: {
    position: "absolute",
    right: 16,
    bottom: 10,
  },
});
