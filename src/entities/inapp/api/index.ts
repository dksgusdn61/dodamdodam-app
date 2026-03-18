import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { InAppPageResponse } from "@entities/inapp/types";

export const inappApi = {
  getActiveApps: (page: number, size: number = 10) =>
    basicApiHandler.get<ApiResponse<InAppPageResponse>>("/inapp/app/active", {
      params: { page, size },
    }),
};
