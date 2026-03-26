import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@shared/ui";
import { shapes } from "@shared/tokens";

const CardSkeleton = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Skeleton width={64} height={30} radius={34} />
      <Skeleton width={24} height={24} radius={4} />
    </View>
    <Skeleton width="80%" height={16} radius={4} />
    <View style={styles.divider} />
    <Skeleton width={120} height={20} radius={4} />
    <Skeleton width="100%" height={14} radius={8} />
    <View style={styles.dateRow}>
      <Skeleton width={100} height={14} radius={4} />
      <Skeleton width={100} height={14} radius={4} />
    </View>
    <View style={styles.dateRow}>
      <Skeleton width={80} height={14} radius={4} />
      <Skeleton width={60} height={14} radius={4} />
    </View>
  </View>
);

export const NightStudyCardSkeleton = () => (
  <View style={styles.container}>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </View>
);

const styles = StyleSheet.create({
  container: { gap: 12 },
  card: {
    padding: 16,
    paddingHorizontal: 12,
    borderRadius: shapes.large,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: { height: 1 },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
