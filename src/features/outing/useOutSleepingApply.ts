import { useState, useCallback } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { outSleepingApi } from "@entities/out-sleeping/api";
import { outSleepingQueryKeys } from "@entities/out-sleeping/api/queryKeys";
import { toast } from "@shared/ui";
import { formatDateParam } from "./utils/formatDate";

export const useOutSleepingApply = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const apply = useCallback(
    async (params: { reason: string; startDate: Date; endDate: Date }): Promise<boolean> => {
      if (!params.reason.trim()) {
        toast.error("외박 사유를 입력해주세요.", { position: "top" });
        return false;
      }

      setLoading(true);
      try {
        await outSleepingApi.create({
          reason: params.reason,
          startAt: formatDateParam(params.startDate),
          endAt: formatDateParam(params.endDate),
        });
        await queryClient.invalidateQueries({ queryKey: outSleepingQueryKeys.me });
        toast.success("외박 신청이 완료되었어요.", { position: "top" });
        return true;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.code === "OUT_SLEEPING_DEADLINE_EXCEEDED") {
          toast.warning("외박 신청 기간이 아니에요.", { position: "top" });
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [queryClient],
  );

  return { apply, loading };
};