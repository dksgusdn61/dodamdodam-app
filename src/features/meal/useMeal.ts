import { useSuspenseQuery } from "@tanstack/react-query";
import { mealApi } from "@entities/meal/api";
import { mealQueryKeys } from "@entities/meal/api/queryKeys";
import type { Meal } from "@entities/meal/types";

const fetchMeal = async (date: string): Promise<Meal[]> => {
  const { data } = await mealApi.getByDate(date);
  return data.data;
};

export const useMealSuspense = (date: string): Meal[] => {
  const { data } = useSuspenseQuery({
    queryKey: mealQueryKeys.byDate(date),
    queryFn: () => fetchMeal(date),
  });
  return data;
};