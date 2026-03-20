import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, View, type LayoutChangeEvent } from "react-native";
import { useTheme } from "@shared/theme";
import { Clock } from "@shared/icons/mono";
import { DAYS, styles, TODAY_COLUMN_MARGIN } from "./styles";

export interface ScheduleData {
  timetable: string[][];
}

interface HomeScheduleWidgetProps {
  schedule: ScheduleData;
}

const PERIOD_TIMES = [
  { start: [8, 50], end: [9, 40] },
  { start: [9, 50], end: [10, 40] },
  { start: [10, 50], end: [11, 40] },
  { start: [11, 50], end: [12, 40] },
  { start: [13, 30], end: [14, 20] },
  { start: [14, 30], end: [15, 20] },
  { start: [15, 30], end: [16, 20] },
] as const;

const getCurrentPeriodLabel = (): string => {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < PERIOD_TIMES.length; i++) {
    const endMinutes = PERIOD_TIMES[i].end[0] * 60 + PERIOD_TIMES[i].end[1];
    if (minutes <= endMinutes) return `${i + 1}교시`;
  }

  return "야자";
};

const getCurrentPeriodIndex = (): number => {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < PERIOD_TIMES.length; i++) {
    const endMinutes = PERIOD_TIMES[i].end[0] * 60 + PERIOD_TIMES[i].end[1];
    if (minutes <= endMinutes) return i;
  }

  return -1;
};

const getTodayIndex = () => {
  const day = new Date().getDay();
  return day >= 1 && day <= 5 ? day - 1 : -1;
};

export const HomeScheduleWidget = React.memo(({ schedule }: HomeScheduleWidgetProps) => {
  const { colors } = useTheme();
  const todayIndex = getTodayIndex();
  const currentPeriodLabel = useMemo(getCurrentPeriodLabel, []);
  const currentPeriodIndex = useMemo(getCurrentPeriodIndex, []);
  const maxPeriods = Math.max(...schedule.timetable.map((col) => col.length), 0);

  const tableRef = useRef<View>(null);
  const todayCellRef = useRef<View>(null);
  const [todayLayout, setTodayLayout] = useState<{ x: number; width: number } | null>(null);
  const [tableHeight, setTableHeight] = useState(0);

  const onTableLayout = useCallback((e: LayoutChangeEvent) => {
    setTableHeight(e.nativeEvent.layout.height);
  }, []);

  const onTodayCellLayout = useCallback(() => {
    if (todayCellRef.current && tableRef.current) {
      todayCellRef.current.measureLayout(tableRef.current, (x, _y, width) => {
        setTodayLayout({ x, width });
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.background.surface }]}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: colors.brand.primary }]}>
            <Clock size={16} color={colors.static.white} />
          </View>
          <Text style={[styles.title, { color: colors.text.primary }]}>시간표</Text>
          <Text style={[styles.periodLabel, { color: colors.text.tertiary }]}>
            {currentPeriodLabel}
          </Text>
        </View>

        <View
          ref={tableRef}
          style={[styles.table, { backgroundColor: colors.fill.primary }]}
          onLayout={onTableLayout}
        >
          {todayIndex >= 0 && todayLayout && tableHeight > 0 && (
            <View
              style={[
                styles.todayColumn,
                {
                  backgroundColor: colors.fill.secondary,
                  left: todayLayout.x + TODAY_COLUMN_MARGIN,
                  width: todayLayout.width - TODAY_COLUMN_MARGIN * 2,
                  height: tableHeight - TODAY_COLUMN_MARGIN * 2,
                  top: TODAY_COLUMN_MARGIN,
                },
              ]}
            />
          )}

          <View style={styles.tableRow}>
            <View style={styles.periodHeaderCell}>
              <Text style={[styles.headerText, { color: colors.text.tertiary }]}>교시</Text>
            </View>
            {DAYS.map((day, i) => (
              <View
                key={day}
                ref={i === todayIndex ? todayCellRef : undefined}
                onLayout={i === todayIndex ? onTodayCellLayout : undefined}
                style={styles.headerCell}
              >
                <Text
                  style={[
                    styles.headerText,
                    { color: i === todayIndex ? colors.text.primary : colors.text.tertiary },
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>

          {Array.from({ length: maxPeriods }, (_, row) => (
            <View key={row} style={styles.tableRow}>
              <View style={styles.periodCell}>
                <Text style={[styles.periodText, { color: colors.text.tertiary }]}>{row + 1}</Text>
              </View>
              {DAYS.map((day, col) => {
                const subject = schedule.timetable[col]?.[row] ?? "-";
                const isCurrentCell = col === todayIndex && row === currentPeriodIndex;
                return (
                  <View key={day} style={styles.cell}>
                    <Text
                      style={[
                        styles.cellText,
                        { color: isCurrentCell ? colors.brand.primary : colors.text.primary },
                        isCurrentCell && styles.cellTextBold,
                      ]}
                    >
                      {subject}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});