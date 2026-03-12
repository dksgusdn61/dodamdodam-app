import React, { useCallback } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ListRenderItemInfo,
} from "react-native";
import { useTheme } from "@shared/theme";
import { Indicator } from "@shared/ui";
import { CORNER_RADIUS, BANNER_HEIGHT, HORIZONTAL_PADDING } from "./constants/constants";
import { useHomeBanner } from "./hooks/useHomeBanner";

export interface BannerItem {
  id: string;
  image: ImageSourcePropType;
}

interface HomeBannerProps {
  items: BannerItem[];
}

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

export const HomeBanner = React.memo(({ items }: HomeBannerProps) => {
  const { colors } = useTheme();
  const {
    activeIndex,
    contentWidth,
    flatListRef,
    viewabilityConfigCallbackPairs,
    keyExtractor,
    handleScrollBeginDrag,
    handleScrollEndDrag,
    getItemLayout,
  } = useHomeBanner(items);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<BannerItem>) => (
      <BannerImage item={item} width={contentWidth} />
    ),
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
