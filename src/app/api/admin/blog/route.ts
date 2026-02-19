import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';
import { migrate } from '@/lib/migrate';

let migrated = false;
async function ensureMigrated() {
  if (!migrated) { await migrate(); migrated = true; }
}

// GET all blog posts
export async function GET(request: NextRequest) {
  await ensureMigrated();
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query = 'SELECT * FROM blog_posts WHERE deleted_at IS NULL';
    const params: any[] = [];

    if (category && category !== 'all') {
      query += ' AND category LIKE ?';
      params.push(`%${category}%`);
    }
    if (search) {
      query += ' AND (title LIKE ? OR excerpt LIKE ? OR category LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(query, params);
    const data = (rows as any[]).map(row => ({
      ...row,
      hasFullArticle: !!row.has_full_article,
    }));
    return NextResponse.json({ success: true, data, total: data.length });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST - Create new blog post (protected)
export async function POST(request: NextRequest) {
  await ensureMigrated();
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    await pool.execute(
      `INSERT INTO blog_posts (slug, title, excerpt, content, image, author, category, status, views, has_full_article, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug, body.title, body.excerpt || '', body.content || '',
        body.image || '/blog/placeholder.jpg',
        body.author || 'Admin', body.category || 'General',
        body.status || 'draft', 0,
        body.hasFullArticle ? 1 : 0, date,
      ]
    );

    return NextResponse.json({ success: true, data: { slug, ...body, date }, message: 'Blog post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
