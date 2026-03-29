import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { Banner } from "@entities/banner/types";

export const bannerApi = {
  get: () =>
    basicApiHandler.get<ApiResponse<Banner[]>>("/file/banner"),
};
