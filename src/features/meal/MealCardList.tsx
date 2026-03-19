import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { MealCard } from "@widgets/meal";
import { EmptyState } from "@shared/ui";
import { CookedRice } from "@shared/icons/illustration";
import { useMealSuspense } from "./useMeal";
import type { MealType as ApiMealType } from "@entities/meal/types";
import type { MealType as CardMealType } from "@widgets/meal";

const API_TO_CARD: Record<ApiMealType, CardMealType> = {
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  DINNER: "dinner",
};

const MEAL_ORDER: ApiMealType[] = ["BREAKFAST", "LUNCH", "DINNER"];

interface MealCardListProps {
  date: string;
}

export const MealCardList = memo(({ date }: MealCardListProps) => {
  const meals = useMealSuspense(date);

  const sorted = MEAL_ORDER
    .map((type) => meals.find((m) => m.mealType === type))
    .filter(Boolean);

  if (sorted.length === 0) {
    return <EmptyState icon={<CookedRice size={48} />} message="급식이 없어요" />;
  }

  return (
    <View style={styles.cardList}>
      {sorted.map((meal) => (
        <MealCard
          key={meal!.mealType}
          type={API_TO_CARD[meal!.mealType]}
          calorie={meal!.calorie}
          menus={meal!.menus}
        />
      ))}
    </View>
  );
});

MealCardList.displayName = "MealCardList";

const styles = StyleSheet.create({
  cardList: {
    padding: 16,
    gap: 12,
    paddingBottom: 140,
  },
});