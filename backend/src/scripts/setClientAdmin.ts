import bcrypt from 'bcryptjs';
import { AuthModel } from '@/models/authModel';
import { dbPool } from '@/config/db';

async function setClientAdminCredentials() {
  const email = 'ghulamsafehub@gmail.com';
  const rawPassword = 'ghulam123';
  const username = 'ghulamsafety';
  const role = 'admin';

  console.log(`[Admin Account Update]: Setting client admin credentials for ${email}...`);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(rawPassword, saltRounds);

  const existingUser = await AuthModel.findUserByEmail(email);

  if (existingUser) {
    console.log(`[Admin Account Update]: Updating password for existing user ID ${existingUser.id}...`);
    await dbPool.query(
      'UPDATE users SET password_hash = ?, username = ?, role = ? WHERE id = ?',
      [passwordHash, username, role, existingUser.id]
    );
  } else {
    console.log('[Admin Account Update]: Creating new admin user record...');
    await AuthModel.createUser(username, email, passwordHash, role);
  }

  console.log('==================================================');
  console.log('  CLIENT ADMIN CREDENTIALS SET SUCCESSFULLY!');
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${rawPassword}`);
  console.log('==================================================');
}

setClientAdminCredentials()
  .then(async () => {
    await dbPool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('[Admin Account Update Error]:', err);
    await dbPool.end();
    process.exit(1);
  });
