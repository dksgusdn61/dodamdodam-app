import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { User } from "@entities/user/types";

export const userApi = {
  getMe: () => basicApiHandler.get<ApiResponse<User>>("/user/me"),
};
