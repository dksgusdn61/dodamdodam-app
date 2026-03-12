import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";

export const NightStudyPage = () => {
  const { colors } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background.default }]}
    >
      <Text style={[styles.title, { color: colors.text.primary }]}>심자</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
