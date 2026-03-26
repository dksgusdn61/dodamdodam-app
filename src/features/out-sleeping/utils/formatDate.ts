import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const formatDate = (date: Date): string =>
  dayjs(date).format("M월 D일 (dd)");

export const formatDateParam = (date: Date): string =>
  dayjs(date).format("YYYY-MM-DD");
