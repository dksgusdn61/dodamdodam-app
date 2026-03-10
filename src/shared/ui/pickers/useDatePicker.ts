import { useState, useCallback, useMemo } from "react";
import { getMonthCalendar } from "./datePickerUtils";

interface UseDatePickerOptions {
  date: Date;
  onChangeDate?: (date: Date) => void;
  onClose?: () => void;
}

export const useDatePicker = ({ date, onChangeDate, onClose }: UseDatePickerOptions) => {
  const [current, setCurrent] = useState(
    () => new Date(date.getFullYear(), date.getMonth())
  );
  const [selected, setSelected] = useState<Date>(date);

  const year = current.getFullYear();
  const month = current.getMonth();

  const calendar = useMemo(
    () => getMonthCalendar(year, month),
    [year, month]
  );

  const goPrevMonth = useCallback(
    () => setCurrent(new Date(year, month - 1, 1)),
    [year, month]
  );

  const goNextMonth = useCallback(
    () => setCurrent(new Date(year, month + 1, 1)),
    [year, month]
  );

  const handleDayPress = useCallback((cellDate: Date) => {
    setSelected(cellDate);
  }, []);

  const handleConfirm = useCallback(() => {
    onChangeDate?.(selected);
    onClose?.();
  }, [onChangeDate, selected, onClose]);

  return { year, month, calendar, selected, goPrevMonth, goNextMonth, handleDayPress, handleConfirm };
};
