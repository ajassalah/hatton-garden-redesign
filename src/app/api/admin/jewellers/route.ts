import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { jewellers as initialJewellers, Jeweller } from '@/data/jewellers';
import { readData, addItem } from '@/lib/db';

// GET all jewellers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const data = await readData<Jeweller>('jewellers', initialJewellers);
    let filtered = [...data];

    if (category && category !== 'all') {
      filtered = filtered.filter(j => j.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(j => 
        j.name.toLowerCase().includes(searchLower) ||
        j.description.toLowerCase().includes(searchLower) ||
        j.category.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error fetching jewellers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jewellers' },
      { status: 500 }
    );
  }
}

// POST - Create new jeweller (protected)
export async function POST(request: NextRequest) {
  const user = authenticateRequest(request);
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const newJeweller: Jeweller = {
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: body.name,
      category: body.category,
      description: body.description,
      phone: body.phone,
      email: body.email,
      website: body.website,
      address: body.address,
      rating: body.rating || 4.5,
      reviewsCount: body.reviewsCount || 0,
      openingTimes: body.openingTimes,
      image: body.image || '/jewellers/placeholder.jpg',
      socials: body.socials || {},
      longDescription: body.longDescription || body.description,
      gallery: body.gallery || []
    };

    const updatedData = await addItem<Jeweller>('jewellers', newJeweller, initialJewellers);
    
    return NextResponse.json({
      success: true,
      data: newJeweller,
      message: 'Jeweller created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating jeweller:', error);
    return NextResponse.json(
      { error: 'Failed to create jeweller' },
      { status: 500 }
    );
  }
}
