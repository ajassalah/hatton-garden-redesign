import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { users as initialUsers, User } from '@/data/users';
import { readData, addItem } from '@/lib/db';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await readData<User>('users', initialUsers);
    return NextResponse.json({
      success: true,
      data: data,
      total: data.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: body.username,
      email: body.email,
      role: body.role || 'Editor',
      status: 'Active',
      lastLogin: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
    };

    await addItem<User>('users', newUser, initialUsers);
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
