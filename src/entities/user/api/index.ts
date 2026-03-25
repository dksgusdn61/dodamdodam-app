import { basicApiHandler } from "@entities/api/common";
import type { ApiResponse } from "@shared/types";
import type { User, UpdateUserRequest, StudentInfo, TeacherInfo } from "@entities/user/types";

export const userApi = {
  getMe: () => basicApiHandler.get<ApiResponse<User>>("/user/me"),

  updateMe: (body: UpdateUserRequest) =>
    basicApiHandler.patch<ApiResponse<User>>("/user", body),

  updateStudent: (body: StudentInfo) =>
    basicApiHandler.patch<ApiResponse<void>>("/user/student", body),

  updateTeacher: (body: TeacherInfo) =>
    basicApiHandler.patch<ApiResponse<void>>("/user/teacher", body),
};
