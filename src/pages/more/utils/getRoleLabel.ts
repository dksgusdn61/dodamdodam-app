interface UserInfo {
  role: "student" | "teacher" | "graduate";
  grade?: number;
  classroom?: number;
  number?: number;
}

export const getRoleLabel = (user: UserInfo): string => {
  if (user.role === "student") {
    return `${user.grade}학년 ${user.classroom}반 ${user.number}번`;
  }
  if (user.role === "teacher") return "교사";
  return "졸업생";
};
