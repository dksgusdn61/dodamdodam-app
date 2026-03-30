import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { timeTableApi } from "@entities/time-table/api";
import { timeTableQueryKeys } from "@entities/time-table/api/queryKeys";
import type { TimeTable } from "@entities/time-table/types";
import type { TimeTableData } from "@features/home/home-timetable";
import { saveTimetableToWidget } from "@shared/lib/widget/timetableWidget";

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

const toTimetable = (items: TimeTable[]): string[][] => {
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

const fetchTimeTable = async (): Promise<TimeTable[]> => {
  const { data } = await timeTableApi.getMyTimeTable();
  return data.data;
};

export const useTimeTableSuspense = (): TimeTableData => {
  const { data } = useSuspenseQuery({
    queryKey: timeTableQueryKeys.me,
    queryFn: fetchTimeTable,
  });

  const timetable = toTimetable(data);

  useEffect(() => {
    saveTimetableToWidget(timetable);
  }, [data]);

  return { timetable };
};
