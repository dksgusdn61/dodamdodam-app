import React, { Suspense, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { Divider, TopNavBar, Skeleton, toast } from "@shared/ui";
import { useLogout } from "@features/auth";
import { SettingProfile } from "./ui/SettingProfile";
import { SettingItem } from "./ui/SettingItem";

const APP_VERSION = "3.4.7";

export const SettingsPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const openEditProfile = useCallback(() => navigation.navigate("EditProfile"), [navigation]);
  const logout = useLogout();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar left={<TopNavBar.BackButton onPress={goBack} />}>
        <TopNavBar.Title hasBackButton>설정</TopNavBar.Title>
      </TopNavBar>
      <View style={styles.content}>
        <Suspense fallback={<ProfileSkeleton />}>
          <SettingProfile onEditPress={openEditProfile} />
        </Suspense>
        <Divider />
        <View style={styles.section}>
          <SettingItem title="서비스 운영 정책" onPress={() => toast("서비스 운영 정책")} />
          <SettingItem title="개인정보 처리 방침" onPress={() => toast("개인정보 처리 방침")} />
          <SettingItem title="버전 정보" rightText={APP_VERSION} />
        </View>
        <Divider />
        <View style={styles.section}>
          <SettingItem title="로그아웃" onPress={logout} />
          <SettingItem
            title="회원탈퇴"
            color={colors.status.error}
            onPress={() => toast("회원탈퇴")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const ProfileSkeleton = () => (
  <View style={styles.profileSkeleton}>
    <Skeleton width={80} height={80} radius={40} />
    <View style={styles.profileSkeletonText}>
      <Skeleton width={100} height={20} radius={4} />
      <Skeleton width={60} height={14} radius={4} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 4,
  },
  profileSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  profileSkeletonText: {
    gap: 4,
  },
});