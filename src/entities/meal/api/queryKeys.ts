export const mealQueryKeys = {
  byDate: (date: string) => ["meal", date] as const,
  byMonth: (yearMonth: string) => ["meal", "month", yearMonth] as const,
};