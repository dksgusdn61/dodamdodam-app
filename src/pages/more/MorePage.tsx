import React, { useCallback } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { TopNavBar, Divider, toast } from "@shared/ui";
import {
  Gear,
  Chart,
  File,
  DoorOpen,
  Megaphone,
  Note,
  People,
} from "@shared/icons/mono";
import { SchoolBus } from "@shared/icons/illustration";
import { ProfileCard } from "./ui/ProfileCard";
import { MenuItem } from "./ui/MenuItem";
import { getRoleLabel } from "./utils/getRoleLabel";

// TODO: 실제 유저 데이터 연동
const MOCK_USER = {
  name: "박병춘",
  role: "student" as const,
  grade: 3,
  classroom: 4,
  number: 6,
};

export const MorePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const openAppIn = useCallback(
    (name: string, team: string, subTitle: string, description: string) => () =>
      navigation.navigate("AppIn", { name, team, subTitle, description }),
    [navigation],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar
        right={<TopNavBar.IconButton icon={<Gear />} onPress={() => {}} />}
      >
        <TopNavBar.Title>전체</TopNavBar.Title>
      </TopNavBar>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          name={MOCK_USER.name}
          roleLabel={getRoleLabel(MOCK_USER)}
          onPress={() => toast("테스트예요")}
        />

        <View style={styles.section}>
          <MenuItem icon={<Chart />} title="내 상벌점 보기" />
          <MenuItem icon={<File />} title="내 학생코드 보기" />
        </View>

        <Divider />

        <View style={styles.section}>
          <MenuItem
            icon={<SchoolBus />}
            title="귀가 버스 신청하기"
            appName="버스"
            onPress={openAppIn("귀가 버스", "B1ND", "통학 버스 서비스", "귀가 버스 신청 및 관리 서비스입니다.")}
          />
          <MenuItem icon={<DoorOpen />} title="외출/외박 확인하기" />
          <MenuItem icon={<Megaphone />} title="기상송 확인하기" />
          <MenuItem
            icon={<Note />}
            title="기상송 신청하기"
            appName="기상송"
            onPress={openAppIn("기상송", "B1ND", "기상송 서비스", "기상송 신청 및 투표 서비스입니다.")}
          />
          <MenuItem
            icon={<People />}
            title="그룹"
            appName="그룹"
            onPress={openAppIn("그룹", "B1ND", "그룹 서비스", "그룹 생성 및 관리 서비스입니다.")}
          />
        </View>
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
