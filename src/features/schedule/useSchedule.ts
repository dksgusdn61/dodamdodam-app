import { useSuspenseQuery } from "@tanstack/react-query";
import { scheduleApi } from "@entities/schedule/api";
import { scheduleQueryKeys } from "@entities/schedule/api/queryKeys";
import type { Schedule } from "@entities/schedule/types";
import type { ScheduleData } from "@features/home/home-schedule";

const DAYS = ["월", "화", "수", "목", "금"] as const;

const getWeekDates = (): string[] => {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${dd}`;
  });
};

const toTimetable = (items: Schedule[]): string[][] => {
  const weekDates = getWeekDates();

  return weekDates.map((date) => {
    const dayItems = items
      .filter((item) => item.date === date)
      .sort((a, b) => a.period - b.period);

    if (dayItems.length === 0) return [];

    const maxPeriod = Math.max(...dayItems.map((item) => item.period));
    const slots: string[] = Array.from({ length: maxPeriod }, () => "-");

    for (const item of dayItems) {
      slots[item.period - 1] = item.subject;
    }

    return slots;
  });
};

const fetchSchedule = async (): Promise<Schedule[]> => {
  const { data } = await scheduleApi.getMySchedule();
  return data.data;
};

export const useScheduleSuspense = (): ScheduleData => {
  const { data } = useSuspenseQuery({
    queryKey: scheduleQueryKeys.me,
    queryFn: fetchSchedule,
  });

  return { timetable: toTimetable(data) };
};