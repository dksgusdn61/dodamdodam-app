export interface CalendarCell {
  date: Date | null;
  day: number | null;
}

export const DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const getMonthCalendar = (year: number, month: number): CalendarCell[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];

  for (let i = 0; i < startWeekDay; i++) {
    cells.push({ date: null, day: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ date: new Date(year, month, day), day });
  }

  return cells;
};

export const getIsPast = (date: Date | null): boolean => {
  if (!date) return false;
  return Number(date) < Number(new Date(new Date().setHours(0, 0, 0, 0)));
};
