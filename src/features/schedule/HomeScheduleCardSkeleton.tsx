import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { Skeleton } from "@shared/ui";

export const HomeScheduleCardSkeleton = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.background.surface }]}>
        <View style={styles.header}>
          <Skeleton width={32} height={32} radius={16} />
          <Skeleton width={60} height={18} radius={4} />
          <View style={{ flex: 1 }} />
          <Skeleton width={40} height={24} radius={8} />
        </View>
        <View style={[styles.table, { backgroundColor: colors.fill.primary }]}>
          {Array.from({ length: 5 }, (_, i) => (
            <View key={i} style={styles.row}>
              {Array.from({ length: 6 }, (_, j) => (
                <View key={j} style={styles.cell}>
                  <Skeleton width={32} height={14} radius={4} />
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  card: {
    borderRadius: 16,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 8,
  },
  table: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderCurve: "continuous",
    overflow: "hidden",
    padding: 8,
    gap: 8,
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