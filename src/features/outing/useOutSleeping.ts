import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { outSleepingApi } from "@entities/out-sleeping/api";
import { outSleepingQueryKeys } from "@entities/out-sleeping/api/queryKeys";
import { toast } from "@shared/ui";
import type { OutSleepingResponse } from "@entities/out-sleeping/types";

const EMPTY_RESPONSE: OutSleepingResponse = {
  outSleeping: [],
};

const fetchOutSleeping = async (): Promise<OutSleepingResponse> => {
  try {
    const { data } = await outSleepingApi.getMe();
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      toast.error("외박 조회 권한이 없어요.", { position: "top" });
      return EMPTY_RESPONSE;
    }
    throw error;
  }
};

export const useOutSleepingSuspense = (): OutSleepingResponse => {
  const { data } = useSuspenseQuery({
    queryKey: outSleepingQueryKeys.me,
    queryFn: fetchOutSleeping,
    retry: 1,
  });
  return data;
};