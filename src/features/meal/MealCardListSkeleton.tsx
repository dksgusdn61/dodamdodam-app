import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@shared/ui";
import { shapes } from "@shared/tokens";

const CardSkeleton = () => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Skeleton width={56} height={32} radius={20} />
      <Skeleton width={60} height={16} radius={4} />
    </View>
    <View style={styles.menus}>
      <Skeleton width="70%" height={16} radius={4} />
      <Skeleton width="55%" height={16} radius={4} />
      <Skeleton width="65%" height={16} radius={4} />
      <Skeleton width="45%" height={16} radius={4} />
    </View>
  </View>
);

export const MealCardListSkeleton = () => (
  <View style={styles.container}>
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  card: {
    padding: 20,
    gap: 12,
    borderRadius: shapes.extraLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menus: {
    gap: 4,
  },
});