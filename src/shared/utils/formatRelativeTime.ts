export const formatRelativeTime = (dateString: string): string => {
  const target = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - target.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return `${diffSec}초 전`;
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay === 1) return "1일 전";

  const targetYear = target.getFullYear();
  const nowYear = now.getFullYear();
  const month = target.getMonth() + 1;
  const day = target.getDate();

  if (targetYear === nowYear) return `${month}월 ${day}일`;
  return `${targetYear}년 ${month}월 ${day}일`;
};
