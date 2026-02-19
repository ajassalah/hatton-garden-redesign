import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hettongarden',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;

export function safeJSONParse(val: any) {
  if (typeof val !== 'string') return val;
  if (!val) return val;
  try {
    // Only try to parse if it looks like JSON (starts with { or [)
    if (val.trim().startsWith('{') || val.trim().startsWith('[')) {
      return JSON.parse(val);
    }
    return val;
  } catch {
    return val;
  }
}
