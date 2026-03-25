import React, { Suspense, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { TopNavBar, EmptyState, FilledButton, RefreshView, NetworkErrorBoundary } from "@shared/ui";
import { Plus } from "@shared/icons/mono";
import { Tent } from "@shared/icons/illustration";
import { OutSleepingCard, OutSleepingCardSkeleton, useOutSleepingSuspense } from "@features/outing";
import { outSleepingQueryKeys } from "@entities/out-sleeping/api/queryKeys";

const OutSleepingList = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { outSleeping } = useOutSleepingSuspense();

  const handleApply = useCallback(() => {
    navigation.navigate("OutingApply");
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

export const OutingPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const handleApply = useCallback(() => {
    navigation.navigate("OutingApply");
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar
        right={
          <TopNavBar.IconButton
            icon={<Plus />}
            onPress={handleApply}
          />
        }
      >
        <TopNavBar.Title>외박</TopNavBar.Title>
      </TopNavBar>
      <RefreshView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        queryKeys={[outSleepingQueryKeys.me]}
      >
        <NetworkErrorBoundary fallback={<OutSleepingCardSkeleton />}>
          <Suspense fallback={<OutSleepingCardSkeleton />}>
            <OutSleepingList />
          </Suspense>
        </NetworkErrorBoundary>
      </RefreshView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  card: {
    padding: 16,
    borderRadius: shapes.large,
  },
  list: {
    gap: 12,
  },
});