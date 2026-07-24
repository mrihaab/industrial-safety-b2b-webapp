import { api, ApiResponse } from '@/services/api';
import { User } from '@/contexts/AuthContext';

export interface LoginResponseDto {
  token: string;
  user: User;
}

export class AuthService {
  static async login(email: string, password: string): Promise<ApiResponse<LoginResponseDto>> {
    return api.post<LoginResponseDto>('/admin/auth/login', { email, password });
  }
}
