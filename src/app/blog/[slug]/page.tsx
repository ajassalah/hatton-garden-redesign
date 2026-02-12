"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/data/blog";
import { Loader2 } from "lucide-react";

const BlogPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/admin/blog/${slug}`);
        const result = await response.json();
        if (result.success) {
          setPost(result.data);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar solid />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-emerald-600 hover:underline">← Back to Blog</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 pb-12">
          <div className="flex items-center space-x-2 text-white/60 text-[10px] text-spaced mb-4">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
            <ChevronRight size={10} />
            <span className="text-white">ARTICLE</span>
          </div>
          <div className="inline-block bg-emerald-600 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest mb-4">
            {post.category}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-black transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" />
            Back to Journal
          </Link>

          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-[11px] text-black/40 font-bold uppercase tracking-widest mb-12 pb-8 border-b border-platinum">
            <div className="flex items-center">
              <Calendar size={14} className="mr-2 text-emerald-600" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-2 text-emerald-600" />
              {post.author}
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-black/70 leading-relaxed">
            {post.content}
          </div>

          <div className="mt-16 pt-16 border-t border-platinum">
            <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-black transition-colors text-sm font-bold uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2" />
              View All Articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
