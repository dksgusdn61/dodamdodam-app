import React from "react";
import { View } from "react-native";
import { Skeleton } from "@shared/ui";
import { styles } from "./styles";

const SkeletonItem = () => (
  <View style={styles.skeletonItem}>
    <Skeleton width={40} height={40} radius={12} />
    <View style={styles.skeletonText}>
      <Skeleton width={120} height={16} radius={4} />
      <Skeleton width={60} height={12} radius={4} />
    </View>
  </View>
);

export const InAppListSkeleton = () => (
  <View style={styles.section}>
    <SkeletonItem />
    <SkeletonItem />
    <SkeletonItem />
  </View>
);
