import axios from "axios";
import type { ApiResponse } from "@shared/types";
import type { LoginRequest, TokenData, SignUpRequest } from "@entities/auth/types";
import { basicApiHandler } from "@entities/api/common";
import { env } from "@shared/config";

export const authApi = {
  login: (body: LoginRequest) =>
    axios.post<ApiResponse<TokenData>>(`${env.API_BASE_URL}/auth/login`, body),

  signUp: (body: SignUpRequest) =>
    basicApiHandler.post<ApiResponse>("/auth/join", body),
};
