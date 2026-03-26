import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@shared/ui";

const ItemSkeleton = () => (
  <View style={styles.item}>
    <Skeleton width={40} height={40} radius={10} />
    <View style={styles.content}>
      <View style={styles.titleRow}>
        <Skeleton width={120} height={16} />
        <Skeleton width={40} height={12} />
      </View>
      <Skeleton width="80%" height={14} />
    </View>
  </View>
);

export const NotificationListSkeleton = ({ count = 6 }: { count?: number }) => (
  <View>
    {Array.from({ length: count }, (_, i) => (
      <ItemSkeleton key={i} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
