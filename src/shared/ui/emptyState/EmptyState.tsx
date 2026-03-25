import React, { type ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  cta?: ReactNode;
}

const messageTypo = typo("Body1", "Medium");

export const EmptyState = ({ icon, message, cta }: EmptyStateProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, cta ? styles.withCta : styles.default]}>
      <View style={styles.content}>
        {icon}
        <Text style={[messageTypo, styles.message, { color: colors.text.tertiary }]}>
          {message}
        </Text>
      </View>
      {cta}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  default: {
    alignItems: "center",
    paddingVertical: 48,
    gap: 12,
  },
  withCta: {
    alignItems: "stretch",
    gap: 24,
  },
  content: {
    alignItems: "center",
    gap: 12,
  },
  message: {
    textAlign: "center",
  },
});
