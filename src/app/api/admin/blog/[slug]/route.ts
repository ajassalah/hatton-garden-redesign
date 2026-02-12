import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { blogPosts as initialBlogPosts, BlogPost } from '@/data/blog';
import { readData, updateItem, softDeleteItem } from '@/lib/db';

// GET single blog post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await readData<BlogPost>('blog', initialBlogPosts);
    const post = data.find(p => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post (protected)
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

    const updatedData = await updateItem<BlogPost>('blog', slug, body, initialBlogPosts);
    const updatedPost = updatedData.find(p => p.slug === slug || p.slug === body.slug);
    
    return NextResponse.json({
      success: true,
      data: updatedPost,
      message: 'Blog post updated successfully'
    });

  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post (protected)
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

    await softDeleteItem<BlogPost>('blog', slug, initialBlogPosts);
    
    return NextResponse.json({
      success: true,
      message: 'Blog post moved to bin successfully'
    });

  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
