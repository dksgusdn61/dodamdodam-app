import { StyleSheet } from "react-native";
import { typo } from "@shared/tokens";

const CARD_RADIUS = 16;
const CARD_PADDING = 16;
const HORIZONTAL_PADDING = 16;
const ICON_CONTAINER_SIZE = 32;

export const DAYS = ["월", "화", "수", "목", "금"] as const;
export const TODAY_COLUMN_MARGIN = 6;
export const TODAY_COLUMN_RADIUS = 10;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 12,
  },
  card: {
    borderRadius: CARD_RADIUS,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: CARD_PADDING,
    paddingTop: CARD_PADDING,
    paddingBottom: 12,
    gap: 8,
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: ICON_CONTAINER_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    ...typo("Body1", "SemiBold"),
  },
  table: {
    marginHorizontal: CARD_PADDING,
    marginBottom: CARD_PADDING,
    borderRadius: 12,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerCell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    ...typo("Caption1", "SemiBold"),
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    ...typo("Caption1", "Medium"),
  },
  periodCell: {
    width: 48,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  periodText: {
    ...typo("Caption1", "Medium"),
  },
  periodHeaderCell: {
    width: 48,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  periodLabel: {
    ...typo("Label", "Medium"),
    paddingRight: 8,
  },
  cellTextBold: {
    fontWeight: "700",
  },
  todayColumn: {
    position: "absolute",
    borderRadius: TODAY_COLUMN_RADIUS,
    borderCurve: "continuous",
  },
});