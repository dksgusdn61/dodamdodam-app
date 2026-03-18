import React, { Suspense, useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { useInfiniteScroll } from "@shared/hooks";
import { TopNavBar } from "@shared/ui";
import { Gear, Chart, File } from "@shared/icons/mono";
import { ProfileCard } from "@features/profile";
import { InAppList } from "@features/inapp";
import { MenuItem } from "./ui/MenuItem";

export const MorePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const { onScroll, onEndReachedRef } = useInfiniteScroll();

  const openSettings = useCallback(() => navigation.navigate("Settings"), [navigation]);
  const openEditProfile = useCallback(() => navigation.navigate("EditProfile"), [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar
        right={<TopNavBar.IconButton icon={<Gear />} onPress={openSettings} />}
      >
        <TopNavBar.Title>전체</TopNavBar.Title>
      </TopNavBar>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={200}
      >
        <Suspense fallback={<ProfileCard.Skeleton />}>
          <ProfileCard onPress={openEditProfile} />
        </Suspense>

        <View style={styles.section}>
          <MenuItem icon={<Chart />} title="내 상벌점 보기" />
          <MenuItem icon={<File />} title="내 학생코드 보기" />
        </View>

        <Suspense fallback={<InAppList.Skeleton />}>
          <InAppList onEndReachedRef={onEndReachedRef} />
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
    flexGrow: 1,
    paddingBottom: 24,
  },
  section: {
    paddingVertical: 4,
  },
});
