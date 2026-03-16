import React, { memo, useCallback, useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { SquircleView } from "react-native-figma-squircle";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import type { useCalendar } from "./useCalendar";

type CalendarData = ReturnType<typeof useCalendar>;

interface MealCalendarProps {
  calendar: CalendarData;
  scrollY: SharedValue<number>;
}

const ROW_HEIGHT = 44;
const INDICATOR_SIZE = 40;

const headerTypo = typo("Caption1", "Medium");
const dayTypo = typo("Headline", "Medium");

export const MealCalendar = memo(({ calendar, scrollY }: MealCalendarProps) => {
  const { colors } = useTheme();
  const { days, monthDates, selectDate, selectedDay, selectedWeekRowIndex } = calendar;

  const rowCount = Math.ceil(monthDates.length / 7);
  const monthHeight = rowCount * ROW_HEIGHT;
  const collapsible = monthHeight - ROW_HEIGHT;
  const weekOffset = selectedWeekRowIndex * ROW_HEIGHT;

  const containerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, collapsible],
      [monthHeight, ROW_HEIGHT],
      Extrapolation.CLAMP,
    ),
  }));

  const gridStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, collapsible],
          [0, -weekOffset],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const rows = useMemo(() => {
    const result: (number | null)[][] = [];
    for (let i = 0; i < monthDates.length; i += 7) {
      result.push(monthDates.slice(i, i + 7));
    }
    return result;
  }, [monthDates]);

  return (
    <View style={{ backgroundColor: colors.background.default }}>
      <View style={styles.container}>
        <View style={styles.dayHeaders}>
          {days.map((d) => (
            <View key={d} style={styles.headerCell}>
              <Text style={[headerTypo, { color: colors.text.tertiary }]}>{d}</Text>
            </View>
          ))}
        </View>

        <Animated.View style={[styles.gridClip, containerStyle]}>
          <Animated.View style={gridStyle}>
            {rows.map((row, ri) => (
              <View key={ri} style={styles.weekRow}>
                {row.map((day, ci) =>
                  day ? (
                    <DayCell
                      key={ci}
                      day={day}
                      selected={day === selectedDay}
                      onSelect={selectDate}
                      primaryColor={colors.brand.primary}
                      textColor={colors.text.primary}
                    />
                  ) : (
                    <View key={ci} style={styles.cell} />
                  ),
                )}
              </View>
            ))}
          </Animated.View>
        </Animated.View>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border.normal }]} />
    </View>
  );
});

MealCalendar.displayName = "MealCalendar";

export { ROW_HEIGHT };

interface DayCellProps {
  day: number;
  selected: boolean;
  onSelect: (day: number) => void;
  primaryColor: string;
  textColor: string;
}

const DayCell = memo(
  ({ day, selected, onSelect, primaryColor, textColor }: DayCellProps) => {
    const handlePress = useCallback(() => onSelect(day), [onSelect, day]);

    return (
      <Pressable onPress={handlePress} style={styles.cell}>
        {selected ? (
          <SquircleView
            style={styles.indicator}
            squircleParams={{
              cornerRadius: 12,
              cornerSmoothing: 0.8,
              fillColor: primaryColor,
            }}
          >
            <Text style={[dayTypo, styles.whiteText]}>{day}</Text>
          </SquircleView>
        ) : (
          <View style={styles.indicator}>
            <Text style={[dayTypo, { color: textColor }]}>{day}</Text>
          </View>
        )}
      </Pressable>
    );
  },
);

DayCell.displayName = "DayCell";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  dayHeaders: {
    flexDirection: "row",
    marginBottom: 4,
  },
  headerCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  gridClip: {
    overflow: "hidden",
  },
  weekRow: {
    flexDirection: "row",
    height: ROW_HEIGHT,
  },
  cell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteText: {
    color: "#FFFFFF",
  },
  divider: {
    height: 1,
    marginTop: 8,
  },
});
