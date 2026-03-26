import React, { useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { EmptyState, FilledButton, toast } from "@shared/ui";
import { FullMoonFace } from "@shared/icons/illustration";
import { nightStudyApi } from "@entities/night-study/api";
import { nightStudyQueryKeys } from "@entities/night-study/api/queryKeys";
import { NightStudyCard } from "../card/NightStudyCard";
import { useNightStudyPersonalSuspense } from "../hooks/useNightStudySuspense";

export const NightStudyPersonalList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const items = useNightStudyPersonalSuspense();
  const deletingRef = useRef(false);

  const handleApply = useCallback(() => {
    navigation.navigate("NightStudyApply", { tab: "personal" });
  }, [navigation]);

  const handleDelete = useCallback(async (id: string) => {
    if (deletingRef.current) return;
    deletingRef.current = true;
    try {
      await nightStudyApi.delete(id);
      await queryClient.invalidateQueries({ queryKey: nightStudyQueryKeys.myPersonal });
      toast.success("심야 자습이 삭제되었어요.", { position: "top" });
    } catch {
      toast.error("삭제에 실패했어요.", { position: "top" });
    } finally {
      deletingRef.current = false;
    }
  }, [queryClient]);

  if (items.length === 0) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.surface }]}>
        <EmptyState
          icon={<FullMoonFace size={36} />}
          message="아직 신청한 심야 자습이 없어요."
          cta={
            <FilledButton role="assistive" size="large" display="fill" onPress={handleApply}>
              심야 자습 신청하기
            </FilledButton>
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {items.map((item) => (
        <NightStudyCard key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: shapes.large,
  },
  list: {
    gap: 12,
  },
});
