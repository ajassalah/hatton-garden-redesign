import bcrypt from 'bcryptjs';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123';

export async function validateAdminCredentials(
  username: string,
  password: string
): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false;
  }

  // For production, store hashed password in database
  // For now, direct comparison (hash it for better security)
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  return await bcrypt.compare(password, hashedPassword);
}

export function isValidUsername(username: string): boolean {
  return username.length >= 3 && username.length <= 50;
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}
