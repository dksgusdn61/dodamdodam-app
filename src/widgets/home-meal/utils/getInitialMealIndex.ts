export const getInitialMealIndex = (): number => {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (minutes < 510) return 0; // ~08:30 → 조식
  if (minutes < 800) return 1; // ~13:20 → 중식
  return 2; // 이후 → 석식
};
