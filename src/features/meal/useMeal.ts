import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { mealApi } from "@entities/meal/api";
import { mealQueryKeys } from "@entities/meal/api/queryKeys";
import type { Meal } from "@entities/meal/types";
import { saveMealsToWidget } from "@shared/lib/widget/mealWidget";
import { useEffect } from "react";

const fetchMeal = async (date: string): Promise<Meal[]> => {
  const { data } = await mealApi.getByDate(date);
  return data.data;
};

const getYearMonth = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
};

export const useMealSuspense = (date: string): Meal[] => {
  const yearMonth = getYearMonth();

  const { data } = useSuspenseQuery({
    queryKey: mealQueryKeys.byDate(date),
    queryFn: () => fetchMeal(date),
  });

  const { data: monthData } = useQuery({
    queryKey: mealQueryKeys.byMonth(yearMonth),
    queryFn: async () => {
      const { data } = await mealApi.getByMonth(yearMonth);
      return data.data;
    },
  });

  useEffect(() => {
    if (!monthData) return;
    saveMealsToWidget(monthData);
  }, [monthData]);

  return data;
};