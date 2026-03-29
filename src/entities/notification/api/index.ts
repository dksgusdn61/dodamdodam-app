import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { NotificationResponse } from "@entities/notification/types";

export const notificationApi = {
  getMy: (params: { limit: number; offset: number }) =>
    basicApiHandler.get<ApiResponse<NotificationResponse>>("/notification/my", {
      params,
    }),

  markAsRead: (id: string) =>
    basicApiHandler.patch<ApiResponse>(`/notification/${id}/read`),

  readAll: () =>
    basicApiHandler.patch<ApiResponse>("/notification/read-all"),
};
