import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { Meal } from "@entities/meal/types";

export const mealApi = {
  getByDate: (date: string) =>
    basicApiHandler.get<ApiResponse<Meal[]>>("/neis/meal", {
      params: { date },
    }),
};
