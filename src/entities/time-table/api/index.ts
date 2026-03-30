import { basicApiHandler } from "@entities/api/common/basicApiHandler";
import type { ApiResponse } from "@shared/types/api";
import type { TimeTable } from "../types";

export const timeTableApi = {
  getMyTimeTable: () =>
    basicApiHandler.get<ApiResponse<TimeTable[]>>("/neis/time-table/me"),
};
