import React, { useCallback, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { EmptyState, FilledButton, toast } from "@shared/ui";
import { Tent } from "@shared/icons/illustration";
import { outSleepingApi } from "@entities/out-sleeping/api";
import { outSleepingQueryKeys } from "@entities/out-sleeping/api/queryKeys";
import { OutSleepingCard } from "./OutSleepingCard";
import { useOutSleepingSuspense } from "./useOutSleeping";

export const OutSleepingList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const outSleeping = useOutSleepingSuspense();

  const handleApply = useCallback(() => {
    navigation.navigate("OutSleepingApply");
  }, [navigation]);

  const deletingRef = useRef(false);

  const handleDelete = useCallback(async (publicId: string) => {
    if (deletingRef.current) return;
    deletingRef.current = true;
    try {
      await outSleepingApi.delete(publicId);
      await queryClient.invalidateQueries({ queryKey: outSleepingQueryKeys.me });
      toast.success("외박 신청이 삭제되었어요.", { position: "top" });
    } catch {
      toast.error("외박 삭제에 실패했어요.", { position: "top" });
    } finally {
      deletingRef.current = false;
    }
  }, [queryClient]);

  if (outSleeping.length === 0) {
    return (
      <View style={[styles.card, { backgroundColor: colors.background.surface }]}>
        <EmptyState
          icon={<Tent size={36} />}
          message="아직 신청한 외박이 없어요."
          cta={
            <FilledButton
              role="assistive"
              size="large"
              display="fill"
              onPress={handleApply}
            >
              외박 신청하기
            </FilledButton>
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {outSleeping.map((item) => (
        <OutSleepingCard key={item.publicId} item={item} onDelete={handleDelete} />
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
