import React, { Suspense, useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar } from "@shared/ui";
import { Bell } from "@shared/icons/mono";
import { HomeBanner, type BannerItem } from "@widgets/home-banner";
import { HomeMealCard } from "@features/meal";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bannerImage = require("../../../banner.png");

const MOCK_BANNERS: BannerItem[] = [
  { id: "1", image: bannerImage },
  { id: "2", image: bannerImage },
  { id: "3", image: bannerImage },
];

export const HomePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const navigateToMeal = useCallback(() => navigation.navigate("Meal"), [navigation]);

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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeBanner items={MOCK_BANNERS} />
        <Suspense fallback={<HomeMealCard.Skeleton />}>
          <HomeMealCard onPress={navigateToMeal} />
        </Suspense>
      </ScrollView>
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