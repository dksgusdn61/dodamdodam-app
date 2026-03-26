const toStartOfDay = (dateStr: string): number =>
  new Date(dateStr).getTime();

const toEndOfDay = (dateStr: string): number => {
  const d = new Date(dateStr);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
};

export const calcProgress = (startAt: string, endAt: string): number => {
  const now = Date.now();
  const start = toStartOfDay(startAt);
  const end = toEndOfDay(endAt);
  if (now <= start) return 0;
  if (now >= end) return 100;
  return ((now - start) / (end - start)) * 100;
};

export const calcRemainingDays = (startAt: string, endAt: string): string => {
  const now = Date.now();
  const start = toStartOfDay(startAt);
  const end = toEndOfDay(endAt);
  if (now < start) return "시작 전";
  if (now >= end) return "종료됨";
  const diff = end - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 24) return `${hours}시간`;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${days}일`;
};

export const calcRemainingTime = (startAt: string, endAt: string): string => {
  const now = Date.now();
  const start = toStartOfDay(startAt);
  const end = toEndOfDay(endAt);
  if (now < start) return "시작 전";
  if (now >= end) return "종료됨";
  const diff = end - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours >= 24) {
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return `${days}일`;
  }
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}시간 ${minutes}분`;
  return `${minutes}분`;
};