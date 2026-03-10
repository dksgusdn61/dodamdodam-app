import React, { memo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { useTheme } from "@shared/theme";
import { useWiggle } from "@shared/hooks";
import { typo, shapes } from "@shared/tokens";
import { ChevronLeft, ChevronRight } from "@shared/icons/mono";
import { FilledButton } from "@shared/ui/buttons";
import { DAYS, getIsPast } from "./datePickerUtils";
import { useDatePicker } from "./useDatePicker";

interface DatePickerProps {
  date?: Date;
  onChangeDate?: (date: Date) => void;
  disablePast?: boolean;
  title?: string;
  onClose?: () => void;
  closeOnDimmerClick?: boolean;
  setDimClickHandler?: (handler: () => void) => void;
}

export const DatePicker = memo(
  ({
    date = new Date(),
    onChangeDate,
    disablePast = false,
    title = "날짜 선택",
    onClose,
    closeOnDimmerClick = false,
    setDimClickHandler,
  }: DatePickerProps) => {
    const { colors } = useTheme();
    const { wiggleStyle } = useWiggle({
      closeOnDimmerClick,
      onClose,
      setDimClickHandler,
    });

    const {
      year,
      month,
      calendar,
      selected,
      goPrevMonth,
      goNextMonth,
      handleDayPress,
      handleConfirm,
    } = useDatePicker({ date, onChangeDate, onClose });

    return (
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.background.surface,
            borderRadius: shapes.extraLarge,
          },
          wiggleStyle,
        ]}
      >
        <Text style={[styles.title, { color: colors.text.primary }]}>
          {title}
        </Text>

        <View style={styles.header}>
          <Text style={[styles.monthText, { color: colors.text.primary }]}>
            {year}년 {month + 1}월
          </Text>
          <View style={styles.arrows}>
            <Pressable onPress={goPrevMonth} style={styles.arrow}>
              <ChevronLeft size={20} color={colors.brand.primary} />
            </Pressable>
            <Pressable onPress={goNextMonth} style={styles.arrow}>
              <ChevronRight size={20} color={colors.brand.primary} />
            </Pressable>
          </View>
        </View>

        <View>
          <View style={styles.weekRow}>
            {DAYS.map((day) => (
              <Text
                key={day}
                style={[styles.weekText, { color: colors.text.tertiary }]}
              >
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {calendar.map((cell, i) => {
              if (!cell.day) {
                return <View key={i} style={styles.dayCell} />;
              }
              const isPast = disablePast && getIsPast(cell.date);
              const isSelected =
                selected?.toDateString() === cell.date?.toDateString();

              return (
                <Pressable
                  key={i}
                  onPress={
                    isPast ? undefined : () => handleDayPress(cell.date!)
                  }
                  disabled={isPast}
                  style={[
                    styles.dayCell,
                    {
                      backgroundColor: isSelected
                        ? colors.brand.primary
                        : "transparent",
                      borderRadius: shapes.small,
                      opacity: isPast ? 0.3 : 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      {
                        color: isSelected
                          ? colors.static.white
                          : colors.text.tertiary,
                      },
                    ]}
                  >
                    {cell.day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <FilledButton size="large" onPress={handleConfirm}>
          선택
        </FilledButton>
      </Animated.View>
    );
  }
);

DatePicker.displayName = "DatePicker";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    ...typo("Heading2", "Bold"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  monthText: {
    ...typo("Body1", "Medium"),
  },
  arrows: {
    flexDirection: "row",
    gap: 8,
  },
  arrow: {
    padding: 8,
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekText: {
    ...typo("Label", "Regular"),
    flex: 1,
    textAlign: "center",
  },
  grid: {
    width: 280,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: 40,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
  },
  dayText: {
    ...typo("Headline", "Medium"),
  },
});

export type { DatePickerProps };
