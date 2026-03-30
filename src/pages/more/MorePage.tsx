import React, { Suspense, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar, RefreshView } from "@shared/ui";
import { Gear, Chart, File } from "@shared/icons/mono";
import { ProfileCard } from "@features/profile";
import { InAppList } from "@features/inapp";
import { userQueryKeys } from "@entities/user/api/queryKeys";
import { inappQueryKeys } from "@entities/inapp/api/queryKeys";
import { MenuItem } from "./ui/MenuItem";

export const MorePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

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
      <RefreshView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        queryKeys={[userQueryKeys.me, inappQueryKeys.activeApps]}
      >
        <Suspense fallback={<ProfileCard.Skeleton />}>
          <ProfileCard onPress={openEditProfile} />
        </Suspense>

        <View style={styles.section}>
          <MenuItem icon={<Chart />} title="내 상벌점 보기" />
          <MenuItem icon={<File />} title="내 학생코드 보기" />
        </View>

        <Suspense fallback={<InAppList.Skeleton />}>
          <InAppList />
        </Suspense>
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
    flexGrow: 1,
    paddingBottom: 24,
  },
  section: {
    paddingVertical: 4,
  },
});
