import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { readTrash, restoreItem, deletePermanently } from '@/lib/db';
import { User } from '@/data/users';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const trashedUsers = await readTrash<User>('users');
    return NextResponse.json({ success: true, data: trashedUsers });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trashed users' }, { status: 500 });
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
      await restoreItem<User>('users', id);
      return NextResponse.json({ success: true, message: 'User restored successfully' });
    } else if (action === 'delete') {
      await deletePermanently<User>('users', id);
      return NextResponse.json({ success: true, message: 'User permanently deleted' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
