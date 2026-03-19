export const mealQueryKeys = {
  byDate: (date: string) => ["meal", date] as const,
};
