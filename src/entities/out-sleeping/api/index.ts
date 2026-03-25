import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { OutSleepingResponse, OutSleepingRequest } from "@entities/out-sleeping/types";

export const outSleepingApi = {
  getMe: () =>
    basicApiHandler.get<ApiResponse<OutSleepingResponse>>("/out-sleeping/me"),

  create: (body: OutSleepingRequest) =>
    basicApiHandler.post<ApiResponse>("/out-sleeping", body),
};
