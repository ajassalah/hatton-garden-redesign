import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';

// Note: admin_users table uses hard delete (no soft delete column),
// so trash returns an empty list for now.
// If you want soft-delete for users, add a deleted_at column to admin_users.

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // Users don't have soft-delete in this schema; return empty
    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trashed users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { action, id } = await request.json();

    if (action === 'delete') {
      await pool.execute('DELETE FROM admin_users WHERE id = ?', [id]);
      return NextResponse.json({ success: true, message: 'User permanently deleted' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
