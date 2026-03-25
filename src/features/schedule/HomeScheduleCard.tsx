import React from "react";
import { HomeScheduleWidget } from "@features/home/home-schedule";
import { useScheduleSuspense } from "./useSchedule";

export const HomeScheduleCard = React.memo(() => {
  const schedule = useScheduleSuspense();
  return <HomeScheduleWidget schedule={schedule} />;
});

HomeScheduleCard.displayName = "HomeScheduleCard";