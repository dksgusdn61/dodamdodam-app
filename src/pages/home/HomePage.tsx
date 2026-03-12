import React, { useCallback } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar } from "@shared/ui";
import { Bell } from "@shared/icons/mono";
import { HomeBanner, type BannerItem } from "@widgets/home-banner";
import { HomeMealWidget, type MealData } from "@widgets/home-meal";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bannerImage = require("../../../banner.png");

const MOCK_BANNERS: BannerItem[] = [
  { id: "1", image: bannerImage },
  { id: "2", image: bannerImage },
  { id: "3", image: bannerImage },
];

const MOCK_MEALS: MealData[] = [
  {
    id: "breakfast",
    label: "조식",
    menus: ["쇠고기우엉볶음밥", "계란실파국", "오이생채", "배추김치"],
  },
  {
    id: "lunch",
    label: "중식",
    menus: ["불고기치즈파니니", "미소된장국", "감자고로케", "깍두기", "요구르트"],
  },
  {
    id: "dinner",
    label: "석식",
    menus: ["돈까스카레라이스", "유부장국", "콘샐러드", "배추김치"],
  },
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
        right={<TopNavBar.IconButton icon={<Bell />} onPress={() => {}} />}
      >
        <TopNavBar.Logo />
      </TopNavBar>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeBanner items={MOCK_BANNERS} />
        <HomeMealWidget meals={MOCK_MEALS} onPress={navigateToMeal} />
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
