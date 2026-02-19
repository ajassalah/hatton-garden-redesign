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
  try {
    const [rows] = await pool.execute('SELECT * FROM shop_categories WHERE deleted_at IS NULL ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: rows, total: (rows as any[]).length });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await ensureMigrated();
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const id = Math.random().toString(36).substr(2, 9);

    await pool.execute(
      'INSERT INTO shop_categories (id, name, description, image, count, icon, type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, body.name || '', body.description || '', body.image || '', body.count || '0', body.icon || '', body.type || 'shop']
    );

    return NextResponse.json({ success: true, data: { id, ...body } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
