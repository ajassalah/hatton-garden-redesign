import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { users as initialUsers, User } from '@/data/users';
import { readData, updateItem, softDeleteItem } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await readData<User>('users', initialUsers);
    const user = data.find(u => u.id === id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updatedData = await updateItem<User>('users', id, body, initialUsers);
    const updatedUser = updatedData.find(u => u.id === id);
    
    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Prevent deleting the main admin
    if (id === '1') {
      return NextResponse.json({ error: 'Cannot delete Super Admin' }, { status: 403 });
    }

    await softDeleteItem<User>('users', id, initialUsers);
    return NextResponse.json({ success: true, message: 'User moved to bin successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
