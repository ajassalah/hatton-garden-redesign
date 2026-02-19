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
      `UPDATE shop_categories SET
        name = COALESCE(?, name),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        count = COALESCE(?, count)
       WHERE id = ? AND deleted_at IS NULL`,
      [body.name || null, body.description || null, body.image || null, body.count ?? null, id]
    );

    const [rows] = await pool.execute('SELECT * FROM shop_categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true, data: (rows as any[])[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await pool.execute('UPDATE shop_categories SET deleted_at = NOW() WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Category moved to bin' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
