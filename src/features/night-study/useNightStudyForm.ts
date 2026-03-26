import { useState, useCallback } from "react";
import type { TimeSlot } from "./TimeSlotPicker";

export const useNightStudyForm = () => {
  const [timeSlot, setTimeSlot] = useState<TimeSlot>("NIGHT1");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 개인
  const [reason, setReason] = useState("");
  const [usePhone, setUsePhone] = useState(false);
  const [phoneReason, setPhoneReason] = useState("");
  const togglePhone = useCallback(() => setUsePhone((prev) => !prev), []);

  // 프로젝트
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  return {
    common: { timeSlot, setTimeSlot, startDate, setStartDate, endDate, setEndDate },
    personal: { reason, setReason, usePhone, togglePhone, phoneReason, setPhoneReason },
    project: { projectName, setProjectName, projectDescription, setProjectDescription },
  };
};