import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { Jeweller } from '@/data/jewellers';
import { readTrash, restoreItem, deletePermanently } from '@/lib/db';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await readTrash<Jeweller>('jewellers');
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trash' }, { status: 500 });
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
      await restoreItem<Jeweller>('jewellers', slug);
      return NextResponse.json({ success: true, message: 'Jeweller restored successfully' });
    } else if (action === 'delete') {
      await deletePermanently<Jeweller>('jewellers', slug);
      return NextResponse.json({ success: true, message: 'Jeweller deleted permanently' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Action failed' }, { status: 500 });
  }
}
