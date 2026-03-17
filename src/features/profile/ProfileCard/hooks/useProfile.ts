import { useSuspenseQuery } from "@tanstack/react-query";
import { userApi } from "@entities/user/api";
import { userQueryKeys } from "@entities/user/api/queryKeys";
import type { User } from "@entities/user/types";

const fetchMe = async (): Promise<User> => {
  const { data } = await userApi.getMe();
  return data.data;
};

export const useProfileSuspense = (): User => {
  const { data } = useSuspenseQuery({
    queryKey: userQueryKeys.me,
    queryFn: fetchMe,
  });
  return data;
};
