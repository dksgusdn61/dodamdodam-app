import { useSuspenseQuery } from "@tanstack/react-query";
import { mealApi } from "@entities/meal/api";
import { mealQueryKeys } from "@entities/meal/api/queryKeys";
import type { Meal } from "@entities/meal/types";
import { saveMealsToWidget } from "@shared/lib/widget/mealWidget";
import { useEffect } from "react";
import type { MealType } from "@entities/meal/types";

const MEAL_ORDER: MealType[] = ["BREAKFAST", "LUNCH", "DINNER"];

const fetchMeal = async (date: string): Promise<Meal[]> => {
  const { data } = await mealApi.getByDate(date);
  return data.data;
};

export const useMealSuspense = (date: string): Meal[] => {
  const { data } = useSuspenseQuery({
    queryKey: mealQueryKeys.byDate(date),
    queryFn: () => fetchMeal(date),
  });

  useEffect(() => {
    if (!data) return;
    const widgetMeals = MEAL_ORDER.map((type) => {
      const m = data.find((m) => m.mealType === type);
      return {
        mealType: m?.mealType ?? type,
        menus: m?.menus ?? [],
        kcal: m?.calorie ?? 0,
      };
    });
    saveMealsToWidget(widgetMeals);
  }, [data]);

  return data;
};