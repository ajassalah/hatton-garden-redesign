import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const [rows] = await pool.execute('SELECT * FROM admin_users WHERE id = ?', [id]);
    const data = rows as any[];
    if (!data.length) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();

    await pool.execute(
      `UPDATE admin_users SET
        username = COALESCE(?, username),
        email = COALESCE(?, email),
        role = COALESCE(?, role),
        status = COALESCE(?, status)
       WHERE id = ?`,
      [body.username || null, body.email || null, body.role || null, body.status || null, id]
    );

    const [rows] = await pool.execute('SELECT * FROM admin_users WHERE id = ?', [id]);
    return NextResponse.json({ success: true, data: (rows as any[])[0], message: 'User updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;

    // Prevent deleting the main admin
    if (id === '1') {
      return NextResponse.json({ error: 'Cannot delete Super Admin' }, { status: 403 });
    }

    await pool.execute('DELETE FROM admin_users WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
