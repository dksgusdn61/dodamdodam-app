import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import { Checkmark } from "@shared/icons/mono";
import { usePressAnimation } from "@shared/hooks/animations/usePressAnimation";

interface RoleCardProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export const RoleCard = ({ label, selected, onPress, children }: RoleCardProps) => {
  const { colors } = useTheme();
  const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation({ scale: 0.97 });

  return (
    <Pressable
      style={styles.pressable}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={[
          styles.card,
          {
            borderColor: selected ? colors.brand.primary : colors.border.normal,
            borderRadius: shapes.medium,
            backgroundColor: colors.background.surface,
          },
          animatedStyle,
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={[typo("Body1", "Medium"), { color: colors.text.primary }]}>
            {label}
          </Text>
          <Checkmark size={20} color={selected ? colors.brand.primary : colors.border.normal} />
        </View>
        <View style={styles.illustration}>
          {children}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
  },
  card: {
    borderWidth: 2,
    aspectRatio: 1,
    padding: 16,
  },
  cardHeader: {
    paddingLeft: 4,
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },
  illustration: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
