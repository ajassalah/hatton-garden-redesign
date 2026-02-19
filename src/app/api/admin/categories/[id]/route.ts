import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();

    await pool.execute(
      'UPDATE categories SET name = COALESCE(?, name), type = COALESCE(?, type) WHERE id = ?',
      [body.name || null, body.type || null, id]
    );

    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    const updated = (rows as any[])[0];
    return NextResponse.json({ success: true, data: updated, message: 'Category updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
