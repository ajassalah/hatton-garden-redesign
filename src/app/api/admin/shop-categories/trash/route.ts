import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await pool.execute('SELECT * FROM shop_categories WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { action, id } = await request.json();

    if (action === 'restore') {
      await pool.execute('UPDATE shop_categories SET deleted_at = NULL WHERE id = ?', [id]);
      return NextResponse.json({ success: true, message: 'Item restored' });
    }
    if (action === 'delete') {
      await pool.execute('DELETE FROM shop_categories WHERE id = ?', [id]);
      return NextResponse.json({ success: true, message: 'Item permanently deleted' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
