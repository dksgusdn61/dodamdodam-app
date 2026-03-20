import React, { Suspense, useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar, RefreshView } from "@shared/ui";
import { Bell } from "@shared/icons/mono";
import { HomeBanner, type BannerItem } from "@features/home/home-banner";
import { HomeMealCard } from "@features/meal";
import { HomeScheduleCard } from "@features/schedule";
import { mealQueryKeys } from "@entities/meal/api/queryKeys";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bannerImage = require("../../../banner.png");

const MOCK_BANNERS: BannerItem[] = [
  { id: "1", image: bannerImage },
  { id: "2", image: bannerImage },
  { id: "3", image: bannerImage },
];

const formatToday = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const HomePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const navigateToMeal = useCallback(() => navigation.navigate("Meal"), [navigation]);

  const today = useMemo(formatToday, []);
  const queryKeys = useMemo(() => [mealQueryKeys.byDate(today)], [today]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar
        right={<TopNavBar.IconButton icon={<Bell />} onPress={() => navigation.navigate("Notification")} />}
      >
        <TopNavBar.Logo />
      </TopNavBar>
      <RefreshView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        queryKeys={queryKeys}
      >
        <HomeBanner items={MOCK_BANNERS} />
        <Suspense fallback={<HomeMealCard.Skeleton />}>
          <HomeMealCard onPress={navigateToMeal} />
        </Suspense>
        <HomeScheduleCard />
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
    paddingBottom: 24,
  },
});