import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@shared/theme";
import { shapes } from "@shared/tokens";
import { TopNavBar, EmptyState, FilledButton, SegmentedButton } from "@shared/ui";
import type { SegmentedButtonData } from "@shared/ui/buttons/SegmentedButton";
import { Plus } from "@shared/icons/mono";
import { FullMoonFace } from "@shared/icons/illustration";

const INITIAL_SEGMENTS: SegmentedButtonData[] = [
  { text: "개인", value: "personal", isActive: true },
  { text: "프로젝트", value: "project", isActive: false },
];

export const NightStudyPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [segments, setSegments] = useState(INITIAL_SEGMENTS);

  const activeTab = segments.find((s) => s.isActive)?.value ?? "personal";

  const handleApply = useCallback(() => {
    navigation.navigate("NightStudyApply", { tab: activeTab });
  }, [navigation, activeTab]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar
        right={
          <TopNavBar.IconButton
            icon={<Plus />}
            onPress={handleApply}
            customStyle={{ opacity: 0.5 }}
          />
        }
      >
        <TopNavBar.Title>심야 자습</TopNavBar.Title>
      </TopNavBar>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SegmentedButton data={segments} setData={setSegments} />
        <View style={[styles.card, { backgroundColor: colors.background.surface }]}>
          <EmptyState
            icon={<FullMoonFace size={36} />}
            message="아직 신청한 심야 자습이 없어요."
            cta={
              <FilledButton
                role="assistive"
                size="large"
                display="fill"
                onPress={handleApply}
              >
                심야 자습 신청하기
              </FilledButton>
            }
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  card: {
    padding: 16,
    borderRadius: shapes.large,
  },
});