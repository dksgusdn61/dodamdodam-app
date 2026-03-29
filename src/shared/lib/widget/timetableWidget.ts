import { NativeModules } from "react-native";

const { RNTimetableWidgetModule } = NativeModules;

export const saveTimetableToWidget = (timetable: string[][]) => {
  RNTimetableWidgetModule?.saveTimetable(JSON.stringify(timetable));
};
