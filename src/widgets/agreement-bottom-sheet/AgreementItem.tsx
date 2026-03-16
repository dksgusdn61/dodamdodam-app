import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { Checkbox } from "@shared/ui";

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const AgreementItem = ({ label, checked, onPress }: AgreementItemProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <Pressable onPress={onPress} style={styles.left}>
        <Checkbox size="medium" variant="outlined" selected={checked} onPress={onPress} />
        <Text
          style={[typo("Label", "Medium"), { color: colors.text.secondary, flex: 1 }]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </Pressable>
      <Pressable>
        <Text style={[typo("Label", "Medium"), { color: colors.text.tertiary }]}>보기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: 12,
  },
});
