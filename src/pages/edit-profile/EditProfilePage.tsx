import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { FilledButton, TextField, TopNavBar, toast, TextAreaProvider } from "@shared/ui";
import { ProfileAvatar } from "./ui/ProfileAvatar";

// TODO: 실제 유저 데이터 연동
const MOCK_USER = {
  name: "김민규",
  phone: "010-7131-5417",
  role: "student" as const,
  grade: "3",
  classroom: "4",
  number: "6",
  position: "",
};

export const EditProfilePage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const goBack = useCallback(() => navigation.goBack(), [navigation]);

  const [name, setName] = useState(MOCK_USER.name);
  const [phone, setPhone] = useState(MOCK_USER.phone);
  const [grade, setGrade] = useState(MOCK_USER.grade);
  const [classroom, setClassroom] = useState(MOCK_USER.classroom);
  const [number, setNumber] = useState(MOCK_USER.number);
  const [position, setPosition] = useState(MOCK_USER.position);

  const isStudent = MOCK_USER.role === "student";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top", "bottom"]}
    >
      <TopNavBar left={<TopNavBar.BackButton onPress={goBack} />}>
        <TopNavBar.Title hasBackButton>정보 수정</TopNavBar.Title>
      </TopNavBar>
      <TextAreaProvider style={styles.content}>
        <View>
          <ProfileAvatar onPress={() => toast("프로필 사진 변경")} />
          <View style={styles.fields}>
            <TextField label="이름" value={name} onChangeText={setName} />
            <TextField label="전화번호" value={phone} onChangeText={setPhone} />
            {isStudent ? (
              <View style={styles.row}>
                <TextField label="학년" value={grade} onChangeText={setGrade} customStyle={styles.rowField} />
                <TextField label="반" value={classroom} onChangeText={setClassroom} customStyle={styles.rowField} />
                <TextField label="번호" value={number} onChangeText={setNumber} customStyle={styles.rowField} />
              </View>
            ) : (
              <TextField label="직위" value={position} onChangeText={setPosition} />
            )}
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <FilledButton display="fill" size="large" onPress={() => toast("수정 완료")}>
            수정 완료
          </FilledButton>
        </View>
      </TextAreaProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between" as const,
  },
  fields: {
    paddingHorizontal: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row" as const,
    gap: 12,
  },
  rowField: {
    flex: 1,
  },
  buttonWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});
