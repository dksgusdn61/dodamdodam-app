import { useState, useMemo, useCallback } from "react";

const DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const getMonthDates = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return cells;
};

export const useCalendar = () => {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewDate, setViewDate] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthDates = useMemo(() => getMonthDates(year, month), [year, month]);

  const selectedDay = selectedDate.getDate();
  const isSelectedMonth =
    selectedDate.getFullYear() === year && selectedDate.getMonth() === month;

  const selectDate = useCallback(
    (day: number) => {
      const newDate = new Date(year, month, day);
      setSelectedDate(newDate);
    },
    [year, month],
  );

  const selectedWeekRowIndex = useMemo(() => {
    if (!isSelectedMonth) return 0;
    const firstDay = new Date(year, month, 1).getDay();
    return Math.floor((firstDay + selectedDay - 1) / 7);
  }, [year, month, selectedDay, isSelectedMonth]);

  return {
    selectedDay: isSelectedMonth ? selectedDay : -1,
    year,
    month,
    monthDates,
    selectDate,
    selectedWeekRowIndex,
    days: DAYS,
  };
};
