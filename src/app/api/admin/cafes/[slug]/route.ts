import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { cafes as initialCafes, Cafe } from '@/data/cafes';
import { readData, updateItem, softDeleteItem } from '@/lib/db';

// GET single cafe by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await readData<Cafe>('cafes', initialCafes);
    const cafe = data.find(c => c.slug === slug);

    if (!cafe) {
      return NextResponse.json(
        { error: 'Cafe not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: cafe
    });
  } catch (error) {
    console.error('Error fetching cafe:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cafe' },
      { status: 500 }
    );
  }
}

// PUT - Update cafe (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { slug } = await params;
    const body = await request.json();

    const updatedData = await updateItem<Cafe>('cafes', slug, body, initialCafes);
    const updatedCafe = updatedData.find(c => c.slug === slug || c.slug === body.slug);
    
    return NextResponse.json({
      success: true,
      data: updatedCafe,
      message: 'Cafe updated successfully'
    });

  } catch (error) {
    console.error('Error updating cafe:', error);
    return NextResponse.json(
      { error: 'Failed to update cafe' },
      { status: 500 }
    );
  }
}

// DELETE - Delete cafe (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { slug } = await params;

    await softDeleteItem<Cafe>('cafes', slug, initialCafes);
    
    return NextResponse.json({
      success: true,
      message: 'Cafe moved to bin successfully'
    });

  } catch (error) {
    console.error('Error deleting cafe:', error);
    return NextResponse.json(
      { error: 'Failed to delete cafe' },
      { status: 500 }
    );
  }
}
