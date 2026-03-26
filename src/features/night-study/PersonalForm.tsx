import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@shared/theme";
import { typo } from "@shared/tokens";
import { TextField, Checkbox } from "@shared/ui";
import { DatePickerRow } from "@features/out-sleeping";
import { TimeSlotPicker, type TimeSlot } from "./TimeSlotPicker";

interface PersonalFormProps {
  common: {
    timeSlot: TimeSlot;
    setTimeSlot: (slot: TimeSlot) => void;
    startDate: Date;
    setStartDate: (date: Date) => void;
    endDate: Date;
    setEndDate: (date: Date) => void;
  };
  personal: {
    reason: string;
    setReason: (text: string) => void;
    usePhone: boolean;
    togglePhone: () => void;
    phoneReason: string;
    setPhoneReason: (text: string) => void;
  };
}

export const PersonalForm = ({ common, personal }: PersonalFormProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.form}>
      <TextField label="심야 자습 사유" value={personal.reason} onChangeText={personal.setReason} />
      <TimeSlotPicker value={common.timeSlot} onChange={common.setTimeSlot} />
      <DatePickerRow label="시작 날짜" date={common.startDate} onChangeDate={common.setStartDate} />
      <DatePickerRow label="종료 날짜" date={common.endDate} onChangeDate={common.setEndDate} />
      <View style={styles.phoneRow}>
        <Text style={[styles.phoneLabel, { color: colors.text.tertiary }]}>휴대폰 사용</Text>
        <Checkbox selected={personal.usePhone} onPress={personal.togglePhone} />
      </View>
      {personal.usePhone && (
        <TextField placeholder="휴대폰 사용 사유" value={personal.phoneReason} onChangeText={personal.setPhoneReason} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: 12 },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  phoneLabel: { ...typo("Headline", "Medium") },
});