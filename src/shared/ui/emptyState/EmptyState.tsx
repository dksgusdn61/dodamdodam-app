import React, { type ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
}

const messageTypo = typo("Body1", "Medium");

export const EmptyState = ({ icon, message }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {icon}
      <Text style={[messageTypo, styles.message, { color: colors.text.tertiary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    gap: 12,
  },
  message: {
    textAlign: "center",
  },
});
