import readline from 'readline';
import bcrypt from 'bcryptjs';
import { AuthModel } from '@/models/authModel';
import { dbPool } from '@/config/db';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

export async function createAdminCli() {
  console.log('\n==================================================');
  console.log('  Ghulam Safety Hub - Production Admin Seed CLI');
  console.log('==================================================\n');

  try {
    const usernameInput = await askQuestion('Enter Admin Username (default: admin): ');
    const username = usernameInput.trim() || 'admin';

    const emailInput = await askQuestion('Enter Admin Email: ');
    const email = emailInput.trim().toLowerCase();

    if (!email || !email.includes('@')) {
      console.error('\n[Error]: Valid email address is required.');
      process.exit(1);
    }

    const existingUser = await AuthModel.findUserByEmail(email);
    if (existingUser) {
      console.error(`\n[Error]: User with email '${email}' already exists in database (ID: ${existingUser.id}). Duplicate admin creation aborted.`);
      process.exit(1);
    }

    const password = await askQuestion('Enter Master Admin Password (min 8 chars): ');
    if (!password || password.length < 8) {
      console.error('\n[Error]: Password must be at least 8 characters long.');
      process.exit(1);
    }

    const confirmPassword = await askQuestion('Confirm Master Admin Password: ');
    if (password !== confirmPassword) {
      console.error('\n[Error]: Passwords do not match. Aborting.');
      process.exit(1);
    }

    console.log('\n[Processing]: Hashing password with bcrypt...');
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log('[Processing]: Inserting master admin account into database...');
    const insertedId = await AuthModel.createUser(username, email, passwordHash, 'admin');

    console.log('\n==================================================');
    console.log('  SUCCESS: Master Admin Account Created!');
    console.log(`  User ID:  ${insertedId}`);
    console.log(`  Username: ${username}`);
    console.log(`  Email:    ${email}`);
    console.log(`  Role:     admin`);
    console.log('==================================================\n');
  } catch (error: any) {
    console.error('\n[Error Creating Admin Account]:', error.message || error);
    process.exit(1);
  } finally {
    rl.close();
    await dbPool.end();
  }
}

if (require.main === module) {
  createAdminCli();
}
