import axios from "axios";
import type { ApiResponse } from "@shared/types";
import type { LoginRequest, TokenData, RegisterStudentRequest, RegisterTeacherRequest } from "@entities/auth/types";
import { basicApiHandler } from "@entities/api/common";
import { env } from "@shared/config";

export const authApi = {
  login: (body: LoginRequest) =>
    axios.post<ApiResponse<TokenData>>(`${env.API_BASE_URL}/auth/login`, body),

  registerStudent: (body: RegisterStudentRequest) =>
    axios.post<ApiResponse>(`${env.API_BASE_URL}/user/register-student`, body),

  registerTeacher: (body: RegisterTeacherRequest) =>
    axios.post<ApiResponse>(`${env.API_BASE_URL}/user/register-teacher`, body),

  requestPhoneVerification: (phone: string) =>
    axios.post<ApiResponse>(`${env.API_BASE_URL}/user/phone-verification/request`, { phone }),

  confirmPhoneVerification: (phone: string, code: string) =>
    axios.post<ApiResponse>(`${env.API_BASE_URL}/user/phone-verification/confirm`, { phone, code }),
};
