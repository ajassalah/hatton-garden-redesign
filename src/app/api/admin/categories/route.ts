import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { readData, addItem, updateItem, deleteItem } from '@/lib/db';

export async function GET(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await readData('categories', []);
    return NextResponse.json({
      success: true,
      data: data,
      total: data.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newCategory = {
      id: Math.random().toString(36).substr(2, 9),
      name: body.name,
      type: body.type || 'jeweller'
    };

    const data = await addItem('categories', newCategory, []);
    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
