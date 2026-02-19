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
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows, total: (rows as any[]).length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await ensureMigrated();
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const id = Math.random().toString(36).substr(2, 9);
    const newCategory = { id, name: body.name, type: body.type || 'jeweller' };

    await pool.execute(
      'INSERT INTO categories (id, name, type) VALUES (?, ?, ?)',
      [id, body.name, body.type || 'jeweller']
    );

    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
