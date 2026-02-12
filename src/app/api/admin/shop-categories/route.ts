import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { readData, addItem, updateItem, deleteItem } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const data = await readData('shop_categories', []);
    return NextResponse.json({
      success: true,
      data: data,
      total: data.length
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const userAuth = authenticateRequest(request);
  if (!userAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...body
    };

    await addItem('shop_categories', newItem, []);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
