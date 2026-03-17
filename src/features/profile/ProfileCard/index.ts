import {ProfileCardComponent} from "@features/profile/ProfileCard/ProfileCard";
import {ProfileCardSkeleton} from "@features/profile/ProfileCard/ProfileCardSkeleton";

export const ProfileCard = Object.assign(ProfileCardComponent, {
	Skeleton: ProfileCardSkeleton,
});
