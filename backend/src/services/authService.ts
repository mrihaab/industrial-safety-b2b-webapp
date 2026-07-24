import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthModel } from '@/models/authModel';
import { LoginInput, LoginResponseDto, JwtPayload } from '@/types/auth';

export class AuthService {
  /**
   * Authenticate admin credentials and generate JWT token
   */
  static async login(input: LoginInput): Promise<LoginResponseDto | null> {
    const user = await AuthModel.findUserByEmail(input.email);

    if (!user) {
      return null;
    }

    // Verify bcrypt password hash
    const isPasswordValid = await bcrypt.compare(input.password, user.password_hash);
    if (!isPasswordValid) {
      return null;
    }

    // Generate JWT payload & signed token
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const jwtSecret = process.env.JWT_SECRET || 'ghulam_safety_hub_jwt_super_secret_key_2026';
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}
