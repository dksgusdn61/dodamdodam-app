import React from "react";
import { View, StyleSheet } from "react-native";
import { TextField } from "@shared/ui";
import { DatePickerRow } from "@features/out-sleeping";
import { TimeSlotPicker, type TimeSlot } from "./TimeSlotPicker";

interface ProjectFormProps {
  common: {
    timeSlot: TimeSlot;
    setTimeSlot: (slot: TimeSlot) => void;
    startDate: Date;
    setStartDate: (date: Date) => void;
    endDate: Date;
    setEndDate: (date: Date) => void;
  };
  project: {
    projectName: string;
    setProjectName: (text: string) => void;
    projectDescription: string;
    setProjectDescription: (text: string) => void;
  };
}

export const ProjectForm = ({ common, project }: ProjectFormProps) => (
  <View style={styles.form}>
    <TextField label="프로젝트명" value={project.projectName} onChangeText={project.setProjectName} />
    <TextField label="프로젝트 개요" value={project.projectDescription} onChangeText={project.setProjectDescription} />
    <TimeSlotPicker value={common.timeSlot} onChange={common.setTimeSlot} />
    <DatePickerRow label="시작 날짜" date={common.startDate} onChangeDate={common.setStartDate} />
    <DatePickerRow label="종료 날짜" date={common.endDate} onChangeDate={common.setEndDate} />
  </View>
);

const styles = StyleSheet.create({
  form: { gap: 12 },
});