import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { BANNER_HEIGHT } from "./constants/constants";
import type { BannerItem } from "./HomeBanner";

interface BannerImageProps {
  item: BannerItem;
  width: number;
  onPress?: () => void;
}

export const BannerImage = React.memo(({ item, width, onPress }: BannerImageProps) => (
  <Pressable onPress={onPress}>
    <Image
      source={{ uri: item.imageUrl }}
      style={[styles.image, { width }]}
      resizeMode="cover"
    />
  </Pressable>
));

const styles = StyleSheet.create({
  image: {
    height: BANNER_HEIGHT,
  },
});