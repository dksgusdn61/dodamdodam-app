import React from "react";
import { HomeScheduleWidget, type ScheduleData } from "@features/home/home-schedule";

const MOCK_SCHEDULE: ScheduleData = {
  timetable: [
    ["자율", "한국", "운동", "인수", "네트", "네트", "실영"],
    ["자바", "자바", "웹프", "웹프", "웹프", "디자", "인수"],
    ["인수", "디자", "진로", "한국", "실영", "네트", "네트"],
    ["경제", "인수", "실영", "한국", "자바", "자바", "실국"],
    ["웹프", "웹프", "실국", "운동", "동아", "-", "-"],
  ],
};

export const HomeScheduleCard = React.memo(() => {
  return <HomeScheduleWidget schedule={MOCK_SCHEDULE} />;
});

HomeScheduleCard.displayName = "HomeScheduleCard";