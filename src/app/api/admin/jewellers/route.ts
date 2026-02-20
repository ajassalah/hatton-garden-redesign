import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool, { safeJSONParse } from '@/lib/mysql';
import { migrate } from '@/lib/migrate';

// Ensure tables exist
let migrated = false;
async function ensureMigrated() {
  if (!migrated) { await migrate(); migrated = true; }
}

function rowToJeweller(row: any) {
  return {
    ...row,
    rating: parseFloat(row.rating),
    reviewsCount: row.reviews_count,
    longDescription: row.long_description,
    openingTimes: safeJSONParse(row.opening_times),
    socials: safeJSONParse(row.socials),
    gallery: safeJSONParse(row.gallery),
  };
}

// GET all jewellers
export async function GET(request: NextRequest) {
  await ensureMigrated();
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let query = 'SELECT * FROM jewellers WHERE deleted_at IS NULL';
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
    const data = (rows as any[]).map(rowToJeweller);

    return NextResponse.json({ success: true, data, total: data.length });
  } catch (error) {
    console.error('Error fetching jewellers:', error);
    return NextResponse.json({ error: 'Failed to fetch jewellers' }, { status: 500 });
  }
}

// POST - Create new jeweller (protected)
export async function POST(request: NextRequest) {
  await ensureMigrated();
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    await pool.execute(
      `INSERT INTO jewellers (slug, name, category, description, long_description, phone, email, website, address, rating, reviews_count, image, gallery, opening_times, socials)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        body.name,
        body.category || '',
        body.description || '',
        body.longDescription || body.description || '',
        body.phone || '',
        body.email || '',
        body.website || '',
        body.address || '',
        body.rating || 4.5,
        body.reviewsCount || 0,
        body.image || '/jewellers/placeholder.jpg',
        JSON.stringify(body.gallery || []),
        JSON.stringify(body.openingTimes || {}),
        JSON.stringify(body.socials || {}),
      ]
    );

    return NextResponse.json({ success: true, data: { slug, ...body }, message: 'Jeweller created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating jeweller:', error);
    return NextResponse.json({ error: 'Failed to create jeweller' }, { status: 500 });
  }
}
