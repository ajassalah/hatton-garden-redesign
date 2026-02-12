import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { readTrash, restoreItem, deletePermanently } from '@/lib/db';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const trashedItems = await readTrash('shop_categories');
    return NextResponse.json({ success: true, data: trashedItems });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, id } = await request.json();

    if (action === 'restore') {
      await restoreItem('shop_categories', id);
      return NextResponse.json({ success: true, message: 'Item restored' });
    } else if (action === 'delete') {
      await deletePermanently('shop_categories', id);
      return NextResponse.json({ success: true, message: 'Item permanently deleted' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
