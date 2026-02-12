import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { blogPosts as initialBlogPosts, BlogPost } from '@/data/blog';
import { readData, addItem } from '@/lib/db';

// GET all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const data = await readData<BlogPost>('blog', initialBlogPosts);
    let filtered = [...data];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.excerpt.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post (protected)
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
    const newPost: BlogPost = {
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: body.title,
      excerpt: body.excerpt,
      image: body.image || '/blog/placeholder.jpg',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      author: body.author || 'Admin',
      category: body.category || 'General',
      hasFullArticle: body.hasFullArticle || false,
      content: body.content || '',
      views: 0,
      status: body.status || 'draft'
    };

    await addItem<BlogPost>('blog', newPost, initialBlogPosts);
    
    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Blog post created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
