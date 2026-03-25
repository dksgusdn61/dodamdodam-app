import { basicApiHandler } from "@entities/api/common/basicApiHandler";
import type { ApiResponse } from "@shared/types/api";
import type { Schedule } from "../types";

export const scheduleApi = {
  getMySchedule: () =>
    basicApiHandler.get<ApiResponse<Schedule[]>>("/neis/schedule/me"),
};
