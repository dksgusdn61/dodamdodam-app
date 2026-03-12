import React from "react";
import { Image, StyleSheet } from "react-native";
import { BANNER_HEIGHT } from "./constants/constants";
import type { BannerItem } from "./HomeBanner";

interface BannerImageProps {
  item: BannerItem;
  width: number;
}

export const BannerImage = React.memo(({ item, width }: BannerImageProps) => (
  <Image
    source={item.image}
    style={[styles.image, { width }]}
    resizeMode="cover"
  />
));

const styles = StyleSheet.create({
  image: {
    height: BANNER_HEIGHT,
  },
});
