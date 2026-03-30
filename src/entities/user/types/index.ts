export type UserStatus = "DEACTIVATED" | "ACTIVE" | "PENDING";
export type UserRole =
  | "STUDENT"
  | "TEACHER"
  | "BROADCASTER"
  | "DORMITORY_MANAGER";

export interface UserSearchParams {
  keyword: string | null;
  roles: UserRole[];
  generationOnly: boolean;
  page: number;
  size: number;
}

export interface UserSearchResponse {
  content: User[];
  hasNext: boolean;
}

export interface StudentInfo {
  grade: number;
  room: number;
  number: number;
}

export interface TeacherInfo {
  position: string;
}

export interface User {
  publicId: string;
  username: string;
  name: string;
  phone: string;
  profileImage: string | null;
  status: UserStatus;
  roles: UserRole[];
  student: StudentInfo | null;
  teacher: TeacherInfo | null;
  createdAt: string;
}

export interface UpdateUserRequest {
  name: string | null;
  phone: string | null;
  profileImage: string | null;
}

export interface ChangePasswordRequest {
  pastPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  phone: string;
  newPassword: string;
}
