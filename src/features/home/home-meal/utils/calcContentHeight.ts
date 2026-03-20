import { COLUMNS, MENU_LINE_HEIGHT, MENU_GAP, CONTENT_PADDING_BOTTOM, EMPTY_STATE_HEIGHT } from "./constants";

export const calcContentHeight = (menuCount: number) => {
  if (menuCount === 0) return EMPTY_STATE_HEIGHT;
  const rows = Math.ceil(menuCount / COLUMNS);
  return rows * MENU_LINE_HEIGHT + (rows - 1) * MENU_GAP + CONTENT_PADDING_BOTTOM;
};
