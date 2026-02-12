import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { cafes as initialCafes, Cafe } from '@/data/cafes';
import { readData, addItem } from '@/lib/db';

// GET all cafes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    const data = await readData<Cafe>('cafes', initialCafes);
    let filtered = [...data];

    if (category && category !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.category.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error fetching cafes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cafes' },
      { status: 500 }
    );
  }
}

// POST - Create new cafe (protected)
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
    const newCafe: Cafe = {
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
      image: body.image || '/Cafes/placeholder.jpg',
      socials: body.socials || {},
      longDescription: body.longDescription || body.description
    };

    const updatedData = await addItem<Cafe>('cafes', newCafe, initialCafes);
    
    return NextResponse.json({
      success: true,
      data: newCafe,
      message: 'Cafe created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating cafe:', error);
    return NextResponse.json(
      { error: 'Failed to create cafe' },
      { status: 500 }
    );
  }
}
