import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { readTrash, restoreItem, deletePermanently } from '@/lib/db';
import { Cafe } from '@/data/cafes';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const trashData = await readTrash<Cafe>('cafes');
    return NextResponse.json({
      success: true,
      data: trashData
    });
  } catch (error) {
    console.error('Error fetching cafes trash:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { action, slug } = await request.json();

    if (action === 'restore') {
      await restoreItem<Cafe>('cafes', slug);
      return NextResponse.json({ success: true, message: 'Restored' });
    }

    if (action === 'delete') {
      await deletePermanently<Cafe>('cafes', slug);
      return NextResponse.json({ success: true, message: 'Deleted' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in cafes trash action:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
