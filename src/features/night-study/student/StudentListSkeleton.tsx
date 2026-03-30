import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "@shared/ui";
import { shapes } from "@shared/tokens";

const RowSkeleton = () => (
  <View style={styles.row}>
    <View style={styles.info}>
      <Skeleton width={38} height={38} radius={19} />
      <View style={styles.textGroup}>
        <Skeleton width={60} height={16} />
        <Skeleton width={32} height={14} />
      </View>
    </View>
  </View>
);

export const StudentListSkeleton = ({ count = 5 }: { count?: number }) => (
  <View style={styles.list}>
    {Array.from({ length: count }, (_, i) => (
      <RowSkeleton key={i} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  list: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    borderRadius: shapes.extraSmall,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textGroup: {
    gap: 4,
  },
});
