import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { Divider, TopNavBar, toast } from "@shared/ui";
import { SettingProfile } from "./ui/SettingProfile";
import { SettingItem } from "./ui/SettingItem";

// TODO: 실제 유저 데이터 연동
const MOCK_USER_NAME = "김민규";
const APP_VERSION = "3.4.7";

export const SettingsPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const goBack = useCallback(() => navigation.goBack(), [navigation]);
  const openEditProfile = useCallback(() => navigation.navigate("EditProfile"), [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar left={<TopNavBar.BackButton onPress={goBack} />}>
        <TopNavBar.Title hasBackButton>설정</TopNavBar.Title>
      </TopNavBar>
      <View style={styles.content}>
        <SettingProfile
          name={MOCK_USER_NAME}
          onEditPress={openEditProfile}
        />
        <Divider />
        <View style={styles.section}>
          <SettingItem title="서비스 운영 정책" onPress={() => toast("서비스 운영 정책")} />
          <SettingItem title="개인정보 처리 방침" onPress={() => toast("개인정보 처리 방침")} />
          <SettingItem title="버전 정보" rightText={APP_VERSION} />
        </View>
        <Divider />
        <View style={styles.section}>
          <SettingItem title="로그아웃" onPress={() => toast("로그아웃")} />
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
});
