import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';

// GET - jewellers in bin
export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await pool.execute('SELECT * FROM jewellers WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC');
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trash' }, { status: 500 });
  }
}

// POST - restore or permanently delete
export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { action, slug } = await request.json();

    if (action === 'restore') {
      await pool.execute('UPDATE jewellers SET deleted_at = NULL WHERE slug = ?', [slug]);
      return NextResponse.json({ success: true, message: 'Jeweller restored successfully' });
    }

    if (action === 'delete') {
      await pool.execute('DELETE FROM jewellers WHERE slug = ?', [slug]);
      return NextResponse.json({ success: true, message: 'Jeweller deleted permanently' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Action failed' }, { status: 500 });
  }
}
