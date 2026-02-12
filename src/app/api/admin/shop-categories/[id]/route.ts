import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { updateItem, softDeleteItem } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const updatedData = await updateItem('shop_categories', id, body, []);
    const item = updatedData.find((c: any) => c.id === id);
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await softDeleteItem('shop_categories', id, []);
    return NextResponse.json({ success: true, message: 'Category moved to bin' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
