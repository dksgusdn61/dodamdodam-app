import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { Tag, Divider, Progress, IconButton } from "@shared/ui";
import { Trash } from "@shared/icons/mono";
import type { TagColor } from "@shared/ui/tag/Tag";
import type { OutSleeping, OutSleepingStatus } from "@entities/out-sleeping/types";
import { formatDate } from "./utils/formatDate";

interface OutSleepingCardProps {
  item: OutSleeping;
  onDelete?: (publicId: string) => void;
}

const STATUS_MAP: Record<OutSleepingStatus, { label: string; color: TagColor }> = {
  APPROVED: { label: "승인됨", color: "blue" },
  PENDING: { label: "대기 중", color: "default" },
  REJECTED: { label: "거절됨", color: "red" },
};

const calcProgress = (startAt: string, endAt: string): number => {
  const now = Date.now();
  const start = new Date(startAt).getTime();
  const end = new Date(endAt).getTime();
  if (now <= start) return 0;
  if (now >= end) return 100;
  return ((now - start) / (end - start)) * 100;
};

const calcRemaining = (endAt: string): string | null => {
  const diff = new Date(endAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  return `${minutes}분`;
};

export const OutSleepingCard = ({ item, onDelete }: OutSleepingCardProps) => {
  const { colors } = useTheme();
  const { label, color } = STATUS_MAP[item.status];
  const remaining = calcRemaining(item.endAt);
  const progress = calcProgress(item.startAt, item.endAt);

  return (
    <View style={[styles.card, { backgroundColor: colors.background.surface }]}>
      <View style={styles.header}>
        <Tag text={label} color={color} />
        <IconButton
          icon={<Trash />}
          size={24}
          iconSize={24}
          onPress={() => onDelete?.(item.publicId)}
        />
      </View>

      <Text style={[styles.reason, { color: colors.text.primary }]}>
        {item.reason}
      </Text>

      <Divider marginHorizontal={0} marginVertical={0} />

      {item.status !== "REJECTED" && remaining && (
        <>
          <View style={styles.remainingRow}>
            <Text style={[styles.remainingText, { color: colors.text.primary }]}>
              {remaining}
            </Text>
            <Text style={[styles.remainingLabel, { color: colors.text.tertiary }]}>
              남음
            </Text>
          </View>
          <View style={styles.progressSection}>
            <Progress
              progress={progress}
              disabled={item.status === "PENDING"}
            />
            <View style={styles.dateRow}>
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>외출</Text>
                <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
                  {formatDate(new Date(item.startAt))}
                </Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>복귀</Text>
                <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
                  {formatDate(new Date(item.endAt))}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}

      {item.status === "REJECTED" && (
        <View style={styles.dateItem}>
          <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>외출</Text>
          <Text style={[styles.dateValue, { color: colors.text.primary }]}>
            {formatDate(new Date(item.startAt))} ~ {formatDate(new Date(item.endAt))}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    paddingHorizontal: 12,
    borderRadius: shapes.large,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reason: {
    ...typo("Body1", "Medium"),
  },
  remainingRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
  },
  remainingText: {
    ...typo("Heading2", "Bold"),
  },
  remainingLabel: {
    ...typo("Label", "Medium"),
    lineHeight: 20,
  },
  progressSection: {
    gap: 4,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateLabel: {
    ...typo("Label", "Medium"),
  },
  dateValue: {
    ...typo("Body1", "Medium"),
  },
});