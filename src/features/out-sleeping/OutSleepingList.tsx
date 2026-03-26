import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { EmptyState, FilledButton } from "@shared/ui";
import { Tent } from "@shared/icons/illustration";
import { OutSleepingCard } from "./OutSleepingCard";
import { useOutSleepingSuspense } from "./useOutSleeping";

export const OutSleepingList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { outSleeping } = useOutSleepingSuspense();

  const handleApply = useCallback(() => {
    navigation.navigate("OutSleepingApply");
  }, [navigation]);

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
        <OutSleepingCard key={item.publicId} item={item} />
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
