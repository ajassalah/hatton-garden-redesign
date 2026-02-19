import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool, { safeJSONParse } from '@/lib/mysql';

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

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const [rows] = await pool.execute('SELECT * FROM cafes WHERE slug = ? AND deleted_at IS NULL', [slug]);
    const data = rows as any[];
    if (!data.length) return NextResponse.json({ error: 'Cafe not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: rowToCafe(data[0]) });
  } catch (error) {
    console.error('Error fetching cafe:', error);
    return NextResponse.json({ error: 'Failed to fetch cafe' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug } = await params;
    const body = await request.json();

    await pool.execute(
      `UPDATE cafes SET
        name = COALESCE(?, name),
        category = COALESCE(?, category),
        description = COALESCE(?, description),
        long_description = COALESCE(?, long_description),
        phone = COALESCE(?, phone),
        email = COALESCE(?, email),
        website = COALESCE(?, website),
        address = COALESCE(?, address),
        rating = COALESCE(?, rating),
        reviews_count = COALESCE(?, reviews_count),
        image = COALESCE(?, image),
        opening_times = COALESCE(?, opening_times),
        socials = COALESCE(?, socials)
       WHERE slug = ? AND deleted_at IS NULL`,
      [
        body.name || null, body.category || null, body.description || null,
        body.longDescription || null, body.phone || null, body.email || null,
        body.website || null, body.address || null, body.rating || null,
        body.reviewsCount || null, body.image || null,
        body.openingTimes ? JSON.stringify(body.openingTimes) : null,
        body.socials ? JSON.stringify(body.socials) : null,
        slug,
      ]
    );

    const [rows] = await pool.execute('SELECT * FROM cafes WHERE slug = ?', [body.slug || slug]);
    const updated = (rows as any[])[0];
    return NextResponse.json({ success: true, data: updated ? rowToCafe(updated) : null, message: 'Cafe updated successfully' });
  } catch (error) {
    console.error('Error updating cafe:', error);
    return NextResponse.json({ error: 'Failed to update cafe' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug } = await params;
    await pool.execute('UPDATE cafes SET deleted_at = NOW() WHERE slug = ?', [slug]);
    return NextResponse.json({ success: true, message: 'Cafe moved to bin successfully' });
  } catch (error) {
    console.error('Error deleting cafe:', error);
    return NextResponse.json({ error: 'Failed to delete cafe' }, { status: 500 });
  }
}
