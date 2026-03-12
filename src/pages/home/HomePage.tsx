import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar } from "@shared/ui";
import { Bell } from "@shared/icons/mono";
import { HomeBanner, type BannerItem } from "@widgets/home-banner";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bannerImage = require("../../../banner.png");

const MOCK_BANNERS: BannerItem[] = [
  { id: "1", image: bannerImage },
  { id: "2", image: bannerImage },
  { id: "3", image: bannerImage },
];

export const HomePage = () => {
  const { colors } = useTheme();

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
