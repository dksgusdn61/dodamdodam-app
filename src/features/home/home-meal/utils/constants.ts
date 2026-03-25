import type { ViewabilityConfig } from "react-native";

export const CARD_RADIUS = 16;
export const CARD_PADDING = 16;
export const HORIZONTAL_PADDING = 16;
export const ICON_CONTAINER_SIZE = 32;
export const ICON_SIZE = 16;
export const DOT_SIZE = 6;
export const DOT_GAP = 4;
export const COLUMNS = 2;
export const MEAL_TITLES = ["오늘의 아침", "오늘의 점심", "오늘의 저녁"];

export const MENU_LINE_HEIGHT = 19.6; // Label: fontSize 14 * lineHeight 1.4
export const MENU_GAP = 4;
export const CONTENT_PADDING_BOTTOM = 12;
export const EMPTY_STATE_HEIGHT = 36;

export const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 50,
};
