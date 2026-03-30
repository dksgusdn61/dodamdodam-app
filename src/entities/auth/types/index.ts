export interface LoginRequest {
  username: string;
  password: string;
}

export interface TokenData {
  access: string;
  refresh: string;
}

export interface RegisterStudentRequest {
  username: string;
  name: string;
  password: string;
  phone: string;
  grade: number;
  room: number;
  number: number;
}

export interface RegisterTeacherRequest {
  username: string;
  name: string;
  password: string;
  phone: string;
  position: string;
}
