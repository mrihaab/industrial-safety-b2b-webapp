import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthModel } from '@/models/authModel';
import { AuthService } from '@/services/authService';
import { dbPool } from './db';

export async function testAuthApi() {
  console.log('[Auth API Test]: Testing Admin Authentication & JWT Logic...');

  // 1. Seed Admin User
  const defaultEmail = 'admin@ghulamsafety.com';
  const defaultPassword = 'AdminPassword123!';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  await AuthModel.createUser('admin', defaultEmail, passwordHash, 'admin');
  console.log('[Auth API Test]: Default admin user seeded/verified.');

  // 2. Test Valid Login
  const validResult = await AuthService.login({
    email: defaultEmail,
    password: defaultPassword,
  });

  if (!validResult || !validResult.token) {
    throw new Error('Valid login failed to issue a JWT token');
  }

  console.log('[Auth API Test]: Valid Login Successful.');
  console.log('[Auth API Test]: Token issued:', validResult.token.substring(0, 35) + '...');
  console.log('[Auth API Test]: User object:', validResult.user);

  // 3. Verify JWT token signature
  const jwtSecret = process.env.JWT_SECRET || 'ghulam_safety_hub_jwt_super_secret_key_2026';
  const decoded: any = jwt.verify(validResult.token, jwtSecret);
  if (decoded.email !== defaultEmail || decoded.role !== 'admin') {
    throw new Error('JWT token payload verification failed');
  }
  console.log('[Auth API Test]: JWT Token payload verified:', decoded);

  // 4. Test Invalid Password Login
  const invalidResult = await AuthService.login({
    email: defaultEmail,
    password: 'WrongPassword123!',
  });

  if (invalidResult !== null) {
    throw new Error('Invalid login check failed. Expected null, received token');
  }
  console.log('[Auth API Test]: Invalid Credentials correctly rejected (returned null).');

  console.log('[Auth API Test]: ALL AUTHENTICATION MODULE CHECKS PASSED SUCCESSFULLY.');
}

if (require.main === module) {
  testAuthApi()
    .then(async () => {
      await dbPool.end();
      process.exit(0);
    })
    .catch(async err => {
      console.error('[Auth API Test Error]:', err);
      await dbPool.end();
      process.exit(1);
    });
}
