import React, { useState, useCallback } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { TopNavBar, FilledButton, SegmentedButton, TextAreaProvider } from "@shared/ui";
import type { SegmentedButtonData } from "@shared/ui/buttons/SegmentedButton";
import { PersonalForm, ProjectForm, useNightStudyForm } from "@features/night-study";

const makeSegments = (tab: string): SegmentedButtonData[] => [
  { text: "개인", value: "personal", isActive: tab === "personal" },
  { text: "프로젝트", value: "project", isActive: tab === "project" },
];

export const NightStudyApplyPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<any>();
  const initialTab = route.params?.tab ?? "personal";

  const [segments, setSegments] = useState(() => makeSegments(initialTab));
  const activeTab = segments.find((s) => s.isActive)?.value ?? "personal";
  const { common, personal, project } = useNightStudyForm();

  const handleSubmit = useCallback(() => {
    // TODO: API 연동
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top", "bottom"]}
    >
      <TopNavBar
        left={<TopNavBar.BackButton onPress={() => navigation.goBack()} />}
      >
        <TopNavBar.Title hasBackButton>심야 자습 신청하기</TopNavBar.Title>
      </TopNavBar>

      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TextAreaProvider style={styles.inner}>
          <SegmentedButton data={segments} setData={setSegments} />

          {activeTab === "personal" ? (
            <PersonalForm common={common} personal={personal} />
          ) : (
            <ProjectForm common={common} project={project} />
          )}

          <View style={styles.spacer} />

          <FilledButton size="large" display="fill" onPress={handleSubmit}>
            신청
          </FilledButton>
        </TextAreaProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1 },
  inner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  spacer: { flex: 1 },
});