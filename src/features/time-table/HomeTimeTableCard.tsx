import React from "react";
import { HomeTimeTableWidget } from "@features/home/home-timetable";
import { useTimeTableSuspense } from "./useTimeTable";

export const HomeTimeTableCard = React.memo(() => {
  const timeTable = useTimeTableSuspense();
  return <HomeTimeTableWidget timeTable={timeTable} />;
});

HomeTimeTableCard.displayName = "HomeTimeTableCard";
