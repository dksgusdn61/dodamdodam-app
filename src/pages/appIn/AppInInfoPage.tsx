import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { Checkbox, FilledButton, TopNavBar } from "@shared/ui";

export interface AppInParams {
  name: string;
  team: string;
  subTitle: string;
  description: string;
}

type AppInRouteProp = RouteProp<{ AppIn: AppInParams }, "AppIn">;

export const AppInInfoPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute<AppInRouteProp>();
  const [doNotShowAgain, setDoNotShowAgain] = useState(true);
  const toggleDoNotShowAgain = useCallback(() => setDoNotShowAgain((prev) => !prev), []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top", "bottom"]}
    >
      <TopNavBar left={<TopNavBar.BackButton onPress={() => navigation.goBack()} />}>
      </TopNavBar>
      <View style={styles.content}>
        <View>
          <View style={[styles.iconPlaceholder, { backgroundColor: colors.fill.secondary }]} />
          <Text style={[styles.appName, { color: colors.text.primary }]}>{params.name}</Text>
          <Text style={[styles.teamName, { color: colors.brand.primary }]}>{params.team}</Text>
          <Text style={[styles.subTitle, { color: colors.text.primary }]}>{params.subTitle}</Text>
          <Text style={[styles.description, { color: colors.text.primary }]}>
            {params.description}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.checkboxRow}>
            <Text style={[styles.checkboxLabel, { color: colors.text.secondary }]}>
              다음부턴 보지 않기
            </Text>
            <Checkbox
              size="small"
              selected={doNotShowAgain}
              onPress={toggleDoNotShowAgain}
            />
          </View>
          <FilledButton display="fill" size="large">서비스 시작하기</FilledButton>
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
    justifyContent: "space-between" as const,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  buttonWrapper: {
    paddingBottom: 16,
  },
  checkboxRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    gap: 4,
    marginBottom: 12,
  },
  checkboxLabel: {
    ...typo("Label", "Regular"),
  },
  iconPlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 16,
    borderCurve: "continuous" as const,
    marginBottom: 16,
  },
  appName: {
    ...typo("Title2", "ExtraBold"),
    marginBottom: 4,
  },
  teamName: {
    ...typo("Body1", "SemiBold"),
    marginBottom: 24,
  },
  subTitle: {
    ...typo("Body1", "SemiBold"),
    marginBottom: 2,
  },
  description: {
    ...typo("Body2", "Regular"),
  },
});
