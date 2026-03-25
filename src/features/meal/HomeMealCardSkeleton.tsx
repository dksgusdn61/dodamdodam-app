import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@shared/ui";

export const HomeMealCardSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.card}>
      <View style={styles.header}>
        <Skeleton width={32} height={32} radius={16} />
        <Skeleton width={80} height={18} radius={4} />
      </View>
      <View style={styles.menus}>
        <View style={styles.row}>
          <Skeleton width="45%" height={14} radius={4} />
          <Skeleton width="40%" height={14} radius={4} />
        </View>
        <View style={styles.row}>
          <Skeleton width="50%" height={14} radius={4} />
          <Skeleton width="35%" height={14} radius={4} />
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menus: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
});