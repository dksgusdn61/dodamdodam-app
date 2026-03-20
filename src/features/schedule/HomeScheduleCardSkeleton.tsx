import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@shared/ui";

export const HomeScheduleCardSkeleton = () => (
  <View style={skeletonStyles.container}>
    <View style={skeletonStyles.card}>
      <View style={skeletonStyles.header}>
        <Skeleton width={32} height={32} radius={16} />
        <Skeleton width={60} height={18} radius={4} />
        <View style={{ flex: 1 }} />
        <Skeleton width={40} height={24} radius={8} />
      </View>
      <View style={skeletonStyles.table}>
        {Array.from({ length: 5 }, (_, i) => (
          <View key={i} style={skeletonStyles.row}>
            {Array.from({ length: 6 }, (_, j) => (
              <View key={j} style={skeletonStyles.cell}>
                <Skeleton width={32} height={14} radius={4} />
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  </View>
);

const skeletonStyles = StyleSheet.create({
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
  table: {
    gap: 8,
    borderRadius: 12,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    gap: 4,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
  },
});