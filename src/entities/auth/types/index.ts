export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenData {
  access: string;
  refresh: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  id: string;
  pw: string;
  phone: string;
  role: "STUDENT" | "TEACHER";
  grade?: number;
  room?: number;
  number?: number;
  position?: string;
}
