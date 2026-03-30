import React from "react";
import { View, Text, Pressable, Keyboard, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { DatePicker, PickerTrigger } from "@shared/ui";
import { Calendar } from "@shared/icons/mono";
import { formatDate } from "./utils/formatDate";

interface DatePickerRowProps {
  label: string;
  date: Date;
  onChangeDate: (date: Date) => void;
}

export const DatePickerRow = ({ label, date, onChangeDate }: DatePickerRowProps) => {
  const { colors } = useTheme();

  return (
    <PickerTrigger
      content={({ onClose, setDimClickHandler }) => (
        <DatePicker
          date={date}
          onChangeDate={onChangeDate}
          disablePast
          title={label}
          onClose={onClose}
          closeOnDimmerClick
          setDimClickHandler={setDimClickHandler}
        />
      )}
    >
      <Pressable style={styles.row} onPressIn={Keyboard.dismiss}>
        <Text style={[styles.label, { color: colors.text.tertiary }]}>
          {label}
        </Text>
        <View style={styles.value}>
          <Text style={[styles.dateText, { color: colors.brand.primary }]}>
            {formatDate(date)}
          </Text>
          <Calendar size={24} color={colors.brand.primary} />
        </View>
      </Pressable>
    </PickerTrigger>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: {
    ...typo("Headline", "Medium"),
  },
  value: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateText: {
    ...typo("Headline", "Regular"),
  },
});