import { HomeBanner as _HomeBanner } from "./HomeBanner";
import { HomeBannerSkeleton } from "./HomeBannerSkeleton";

export const HomeBanner = Object.assign(_HomeBanner, {
  Skeleton: HomeBannerSkeleton,
});

export type { BannerItem } from "./HomeBanner";
