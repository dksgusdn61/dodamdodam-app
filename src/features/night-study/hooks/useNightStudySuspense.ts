import axios from "axios";
import { useSuspenseQuery } from "@tanstack/react-query";
import { nightStudyApi } from "@entities/night-study/api";
import { nightStudyQueryKeys } from "@entities/night-study/api/queryKeys";
import { toast } from "@shared/ui";
import type { NightStudyPersonal, NightStudyProject } from "@entities/night-study/types";

const fetchMyPersonal = async (): Promise<NightStudyPersonal[]> => {
  try {
    const { data } = await nightStudyApi.getMyPersonal();
    return data.data ?? [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      toast.error("심야 자습 조회 권한이 없어요.", { position: "top" });
      return [];
    }
    throw error;
  }
};

export const useNightStudyPersonalSuspense = (): NightStudyPersonal[] => {
  const { data } = useSuspenseQuery({
    queryKey: nightStudyQueryKeys.myPersonal,
    queryFn: fetchMyPersonal,
    retry: 1,
  });
  return data;
};

const fetchMyProject = async (): Promise<NightStudyProject[]> => {
  try {
    const { data } = await nightStudyApi.getMyProject();
    return data.data ?? [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      toast.error("심야 자습 조회 권한이 없어요.", { position: "top" });
      return [];
    }
    throw error;
  }
};

export const useNightStudyProjectSuspense = (): NightStudyProject[] => {
  const { data } = useSuspenseQuery({
    queryKey: nightStudyQueryKeys.myProject,
    queryFn: fetchMyProject,
    retry: 1,
  });
  return data;
};
