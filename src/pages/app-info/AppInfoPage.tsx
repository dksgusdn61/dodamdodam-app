import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { TopNavBar } from "@shared/ui";

export interface AppInfoParams {
  name: string;
  team: string;
  description: string;
}

type AppInfoRouteProp = RouteProp<{ AppInfo: AppInfoParams }, "AppInfo">;

export const AppInfoPage = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute<AppInfoRouteProp>();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background.default }]}
      edges={["top"]}
    >
      <TopNavBar left={<TopNavBar.BackButton onPress={() => navigation.goBack()} />}>
        <TopNavBar.Title hasBackButton>{params.name}</TopNavBar.Title>
      </TopNavBar>
      <View style={styles.content}>
        <View style={[styles.iconPlaceholder, { backgroundColor: colors.fill.secondary }]} />
        <Text style={[styles.appName, { color: colors.text.primary }]}>{params.name}</Text>
        <Text style={[styles.teamName, { color: colors.brand.primary }]}>{params.team}</Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          {params.description}
        </Text>
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
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  iconPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 16,
    borderCurve: "continuous" as const,
    marginBottom: 16,
  },
  appName: {
    ...typo("Title3", "Bold"),
    marginBottom: 4,
  },
  teamName: {
    ...typo("Body1", "SemiBold"),
    marginBottom: 24,
  },
  description: {
    ...typo("Body2", "Regular"),
  },
});
