import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { Tag, Divider, Progress, IconButton } from "@shared/ui";
import { Trash } from "@shared/icons/mono";
import { calcProgress, calcRemainingDays } from "@shared/utils";
import { formatDate } from "@features/out-sleeping";
import type { TagColor } from "@shared/ui/tag/Tag";
import type { NightStudyPersonal, NightStudyProject, NightStudyStatus } from "@entities/night-study/types";

interface NightStudyCardProps {
  item: NightStudyPersonal | NightStudyProject;
  onDelete?: (id: string) => void;
}

const STATUS_MAP: Record<NightStudyStatus, { label: string; color: TagColor }> = {
  ALLOWED: { label: "승인됨", color: "blue" },
  PENDING: { label: "대기 중", color: "default" },
  REJECTED: { label: "거절됨", color: "red" },
};

const PERIOD_LABEL: Record<number, string> = {
  1: "심자 1",
  2: "심자 2",
};

const isProject = (item: NightStudyPersonal | NightStudyProject): item is NightStudyProject =>
  "name" in item;

export const NightStudyCard = ({ item, onDelete }: NightStudyCardProps) => {
  const { colors } = useTheme();
  const { label, color } = STATUS_MAP[item.status];
  const remaining = calcRemainingDays(item.startAt, item.endAt);
  const progress = calcProgress(item.startAt, item.endAt);

  return (
    <Animated.View
      style={[styles.card, { backgroundColor: colors.background.surface }]}
      layout={LinearTransition.duration(300)}
    >
      <View style={styles.header}>
        <Tag text={label} color={color} />
        {onDelete && (
          <IconButton
            icon={<Trash color={colors.text.secondary} />}
            size={34}
            iconSize={24}
            onPress={() => onDelete(item.id)}
          />
        )}
      </View>

      {isProject(item) && (
        <Text style={[styles.name, { color: colors.text.primary }]}>
          {item.name}
        </Text>
      )}

      <Text style={[styles.description, { color: colors.text.primary }]}>
        {item.description}
      </Text>

      <Divider marginHorizontal={0} marginVertical={0} />

      {item.status !== "REJECTED" && (
        <>
          <View style={styles.remainingRow}>
            <Text style={[styles.remainingText, { color: colors.text.primary }]}>
              {remaining}
            </Text>
            {remaining !== "시작 전" && remaining !== "종료됨" && (
              <Text style={[styles.remainingLabel, { color: colors.text.tertiary }]}>
                남음
              </Text>
            )}
          </View>
          <View style={styles.progressSection}>
            <Progress progress={progress} disabled={item.status === "PENDING"} />
            <View style={styles.dateRow}>
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>시작</Text>
                <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
                  {formatDate(new Date(item.startAt))}
                </Text>
              </View>
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>종료</Text>
                <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
                  {formatDate(new Date(item.endAt))}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.dateItem}>
              <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>진행 시각</Text>
              <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
                {PERIOD_LABEL[item.period] ?? `심자 ${item.period}`}
              </Text>
            </View>
            {isProject(item) && (
              <View style={styles.dateItem}>
                <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>심자 실</Text>
                <Text style={[styles.dateValue, { color: colors.text.secondary }]}>
                  {item.room?.name ?? "미정"}
                </Text>
              </View>
            )}
          </View>
        </>
      )}

      {item.status === "REJECTED" && (
        <View style={styles.dateItem}>
          <Text style={[styles.dateLabel, { color: colors.text.tertiary }]}>거절 사유</Text>
          <Text style={[styles.dateValue, { color: colors.text.primary }]}>
            {item.rejectionReason}
          </Text>
        </View>
      )}
    </Animated.View>
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
  name: {
    ...typo("Heading2", "Bold"),
  },
  description: {
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
  infoRow: {
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
