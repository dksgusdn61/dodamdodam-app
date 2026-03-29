import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { outSleepingApi } from "@entities/out-sleeping/api";
import { outSleepingQueryKeys } from "@entities/out-sleeping/api/queryKeys";
import { toast } from "@shared/ui";
import type { OutSleeping } from "@entities/out-sleeping/types";

const fetchOutSleeping = async (): Promise<OutSleeping[]> => {
  try {
    const { data } = await outSleepingApi.getMe();
    console.log("[OutSleeping] response:", JSON.stringify(data.data));
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      toast.error("외박 조회 권한이 없어요.", { position: "top" });
      return [];
    }
    throw error;
  }
};

export const useOutSleepingSuspense = (): OutSleeping[] => {
  const { data } = useSuspenseQuery({
    queryKey: outSleepingQueryKeys.me,
    queryFn: fetchOutSleeping,
    retry: 1,
  });
  return data;
};