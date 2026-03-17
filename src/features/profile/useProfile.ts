import { useState, useEffect, useCallback } from "react";
import { userApi } from "@entities/user/api";
import type { User } from "@entities/user/types";

let cachedUser: User | null = null;
let fetchPromise: Promise<void> | null = null;
let fetchError: Error | null = null;

const fetchUser = async () => {
  try {
    const { data } = await userApi.getMe();
    cachedUser = data.data;
    fetchError = null;
  } catch (e) {
    fetchError = e as Error;
    cachedUser = null;
  } finally {
    fetchPromise = null;
  }
};

export const useProfileSuspense = (): User => {
  if (fetchError) {
    const err = fetchError;
    fetchError = null;
    throw err;
  }

  if (cachedUser) return cachedUser;

  if (!fetchPromise) {
    fetchPromise = fetchUser();
  }
  throw fetchPromise;
};

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(cachedUser);
  const [loading, setLoading] = useState(!cachedUser);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userApi.getMe();
      cachedUser = data.data;
      setUser(data.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!cachedUser) fetch();
  }, [fetch]);

  const isStudent = user?.roles.includes("STUDENT") ?? false;

  const roleLabel = user
    ? isStudent && user.student
      ? `${user.student.grade}학년 ${user.student.room}반 ${user.student.number}번`
      : user.teacher?.position ?? ""
    : "";

  return { user, loading, roleLabel, refetch: fetch };
};

export const invalidateProfile = () => {
  cachedUser = null;
  fetchPromise = null;
  fetchError = null;
};
