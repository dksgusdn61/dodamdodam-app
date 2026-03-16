import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";

export type MealType = "breakfast" | "lunch" | "dinner";

interface MealCardProps {
  type: MealType;
  calorie: number;
  menus: string[];
}

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "아침",
  lunch: "점심",
  dinner: "저녁",
};

const labelTypo = typo("Label", "Bold");
const calorieTypo = typo("Body2", "Medium");
const menuTypo = typo("Body1", "Medium");

export const MealCard = memo(({ type, calorie, menus }: MealCardProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.background.surface,
          borderRadius: shapes.extraLarge,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.tag, { backgroundColor: colors.brand.primary }]}>
          <Text style={[labelTypo, { color: colors.static.white }]}>
            {MEAL_LABELS[type]}
          </Text>
        </View>
        <Text style={[calorieTypo, { color: colors.text.tertiary }]}>
          {calorie}Kcal
        </Text>
      </View>
      <View style={styles.menus}>
        {menus.map((menu, i) => (
          <Text key={i} style={[menuTypo, { color: colors.text.primary }]}>
            {menu}
          </Text>
        ))}
      </View>
    </View>
  );
});

MealCard.displayName = "MealCard";

const styles = StyleSheet.create({
  card: {
    padding: 20,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  menus: {
    gap: 4,
  },
});
