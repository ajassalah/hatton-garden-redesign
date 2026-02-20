import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool, { safeJSONParse } from '@/lib/mysql';
import { migrate } from '@/lib/migrate';

let migrated = false;
async function ensureMigrated() {
  if (!migrated) { await migrate(); migrated = true; }
}

function rowToCafe(row: any) {
  return {
    ...row,
    rating: parseFloat(row.rating),
    reviewsCount: row.reviews_count,
    longDescription: row.long_description,
    openingTimes: safeJSONParse(row.opening_times),
    socials: safeJSONParse(row.socials),
  };
}

// GET all cafes
export async function GET(request: NextRequest) {
  await ensureMigrated();
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = 'SELECT * FROM cafes WHERE deleted_at IS NULL';
    const params: any[] = [];

    if (category && category !== 'all') {
      query += ' AND category LIKE ?';
      params.push(`%${category}%`);
    }
    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ? OR category LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(query, params);
    const data = (rows as any[]).map(rowToCafe);
    return NextResponse.json({ success: true, data, total: data.length });
  } catch (error) {
    console.error('Error fetching cafes:', error);
    return NextResponse.json({ error: 'Failed to fetch cafes' }, { status: 500 });
  }
}

// POST - Create new cafe (protected)
export async function POST(request: NextRequest) {
  await ensureMigrated();
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await pool.execute(
      `INSERT INTO cafes (slug, name, category, description, long_description, phone, email, website, address, rating, reviews_count, image, opening_times, socials)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, body.name, body.category || '', body.description || '',
        body.longDescription || body.description || '',
        body.phone || '', body.email || '', body.website || '',
        body.address || '', body.rating || 4.5, body.reviewsCount || 0,
        body.image || '/Cafes/placeholder.jpg',
        JSON.stringify(body.openingTimes || {}),
        JSON.stringify(body.socials || {}),
      ]
    );

    return NextResponse.json({ success: true, data: { slug, ...body }, message: 'Cafe created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating cafe:', error);
    return NextResponse.json({ error: 'Failed to create cafe' }, { status: 500 });
  }
}
