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
const DOT_SIZE = 6;
const DOT_GAP = 4;

const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};

export const HomeBanner = ({ items }: HomeBannerProps) => {
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
      <Image
        source={item.image}
        style={[styles.bannerImage, { width: contentWidth }]}
        resizeMode="cover"
      />
    ),
    [contentWidth],
  );

  const keyExtractor = useCallback((item: BannerItem) => item.id, []);

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
          onScrollBeginDrag={() => { isUserScrolling.current = true; }}
          onScrollEndDrag={() => { isUserScrolling.current = false; }}
          style={{ width: contentWidth }}
          getItemLayout={(_, index) => ({
            length: contentWidth,
            offset: contentWidth * index,
            index,
          })}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
        />
        {items.length > 1 && (
          <View style={styles.dotsContainer}>
            {items.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === activeIndex
                        ? colors.static.white
                        : colors.static.white + "4D",
                  },
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

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
  dotsContainer: {
    position: "absolute",
    right: 16,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: DOT_GAP,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
