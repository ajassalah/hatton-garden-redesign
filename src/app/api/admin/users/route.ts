import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';
import { migrate } from '@/lib/migrate';

let migrated = false;
async function ensureMigrated() {
  if (!migrated) { await migrate(); migrated = true; }
}

export async function GET(request: NextRequest) {
  await ensureMigrated();
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await pool.execute('SELECT * FROM admin_users ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows, total: (rows as any[]).length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await ensureMigrated();
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const id = Math.random().toString(36).substr(2, 9);
    const today = new Date().toISOString().split('T')[0];

    await pool.execute(
      'INSERT INTO admin_users (id, username, email, role, status, last_login, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, body.username, body.email || '', body.role || 'Editor', 'Active', today, today]
    );

    return NextResponse.json({ success: true, data: { id, username: body.username, email: body.email, role: body.role || 'Editor', status: 'Active', lastLogin: today, createdAt: today } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
