import { MealCardList as _MealCardList } from "./MealCardList";
import { MealCardListSkeleton } from "./MealCardListSkeleton";
import { HomeMealCard as _HomeMealCard } from "./HomeMealCard";
import { HomeMealCardSkeleton } from "./HomeMealCardSkeleton";

export const MealCardList = Object.assign(_MealCardList, {
  Skeleton: MealCardListSkeleton,
});

export const HomeMealCard = Object.assign(_HomeMealCard, {
  Skeleton: HomeMealCardSkeleton,
});

export { useMealSuspense } from "./useMeal";