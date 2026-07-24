import { Request } from 'express';

export interface UserRow {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: Date;
}

export interface UserDto {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: UserDto;
}

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
