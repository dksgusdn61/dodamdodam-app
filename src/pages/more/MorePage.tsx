import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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

// TODO: 실제 유저 데이터 연동
const MOCK_USER = {
  name: "박병춘",
  role: "student" as const,
  grade: 3,
  classroom: 4,
  number: 6,
};

const getRoleLabel = (user: typeof MOCK_USER): string => {
  if (user.role === "student") {
    return `${user.grade}학년 ${user.classroom}반 ${user.number}번`;
  }
  if (user.role === "teacher") return "교사";
  return "졸업생";
};

export const MorePage = () => {
  const { colors } = useTheme();

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
          <MenuItem icon={<SchoolBus />} title="귀가 버스 신청하기" appName="버스" />
          <MenuItem icon={<DoorOpen />} title="외출/외박 확인하기" />
          <MenuItem icon={<Megaphone />} title="기상송 확인하기" />
          <MenuItem icon={<Note />} title="기상송 신청하기" appName="기상송" />
          <MenuItem icon={<People />} title="그룹" appName="그룹" />
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
    paddingBottom: 24,
  },
  section: {
    paddingVertical: 4,
  },
});
