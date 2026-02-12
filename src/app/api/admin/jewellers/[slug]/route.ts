import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { jewellers as initialJewellers, Jeweller } from '@/data/jewellers';
import { readData, updateItem, softDeleteItem } from '@/lib/db';

// GET single jeweller by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await readData<Jeweller>('jewellers', initialJewellers);
    const jeweller = data.find(j => j.slug === slug);

    if (!jeweller) {
      return NextResponse.json(
        { error: 'Jeweller not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: jeweller
    });
  } catch (error) {
    console.error('Error fetching jeweller:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jeweller' },
      { status: 500 }
    );
  }
}

// PUT - Update jeweller (protected)
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

    const updatedData = await updateItem<Jeweller>('jewellers', slug, body, initialJewellers);
    const updatedJeweller = updatedData.find(j => j.slug === slug || j.slug === body.slug);
    
    return NextResponse.json({
      success: true,
      data: updatedJeweller,
      message: 'Jeweller updated successfully'
    });

  } catch (error) {
    console.error('Error updating jeweller:', error);
    return NextResponse.json(
      { error: 'Failed to update jeweller' },
      { status: 500 }
    );
  }
}

// DELETE - Delete jeweller (protected)
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

    await softDeleteItem<Jeweller>('jewellers', slug, initialJewellers);
    
    return NextResponse.json({
      success: true,
      message: 'Jeweller deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting jeweller:', error);
    return NextResponse.json(
      { error: 'Failed to delete jeweller' },
      { status: 500 }
    );
  }
}
