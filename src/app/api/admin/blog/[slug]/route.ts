import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import pool from '@/lib/mysql';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const [rows] = await pool.execute('SELECT * FROM blog_posts WHERE slug = ? AND deleted_at IS NULL', [slug]);
    const data = rows as any[];
    if (!data.length) return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    const post = { ...data[0], hasFullArticle: !!data[0].has_full_article };
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug } = await params;
    const body = await request.json();

    await pool.execute(
      `UPDATE blog_posts SET
        title = COALESCE(?, title),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        image = COALESCE(?, image),
        author = COALESCE(?, author),
        category = COALESCE(?, category),
        status = COALESCE(?, status),
        has_full_article = COALESCE(?, has_full_article)
       WHERE slug = ? AND deleted_at IS NULL`,
      [
        body.title || null, body.excerpt || null, body.content || null,
        body.image || null, body.author || null, body.category || null,
        body.status || null,
        body.hasFullArticle !== undefined ? (body.hasFullArticle ? 1 : 0) : null,
        slug,
      ]
    );

    const [rows] = await pool.execute('SELECT * FROM blog_posts WHERE slug = ?', [body.slug || slug]);
    const updated = (rows as any[])[0];
    return NextResponse.json({ success: true, data: updated ? { ...updated, hasFullArticle: !!updated.has_full_article } : null, message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = authenticateRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { slug } = await params;
    await pool.execute('UPDATE blog_posts SET deleted_at = NOW() WHERE slug = ?', [slug]);
    return NextResponse.json({ success: true, message: 'Blog post moved to bin successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
