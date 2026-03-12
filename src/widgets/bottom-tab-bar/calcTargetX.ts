import { INDICATOR_SIZE } from "./constants";

export const calcTargetX = (
  index: number,
  barWidth: number,
  tabCount: number,
) => {
  "worklet";
  const tabW = barWidth / tabCount;
  return index * tabW + (tabW - INDICATOR_SIZE) / 2;
};
