"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import type { BlogPost } from "@/data/blog";

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/admin/blog');
        const result = await response.json();
        if (result.success) {
          setBlogPosts(result.data.filter((p: BlogPost) => p.status === 'published'));
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hatton-garden.webp"
            alt="Hatton Garden Blog"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-xs md:text-sm text-spaced mb-6 font-bold">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={14} />
            <span className="text-white">BLOG</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-6">
            Hatton Garden <span className="font-semibold italic font-serif">Journal</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
            News, Trends & Expert Advice from the heart of London’s iconic jewellery quarter.
          </p>
        </div>
      </section>

      {/* Blog Feed Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
              <p className="text-black/40 text-[10px] font-bold tracking-widest uppercase">Loading Journal...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {blogPosts.map((post, i) => (
                <article key={i} className="group flex flex-col h-full bg-[#fcfcfc] border border-platinum hover:bg-white hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-emerald-600 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center space-x-4 text-[10px] text-black/40 font-bold uppercase tracking-widest mb-6 border-b border-platinum pb-4">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-2 text-emerald-600" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <User size={12} className="mr-2 text-emerald-600" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-black mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-black/60 font-light leading-relaxed text-sm mb-8 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      {post.hasFullArticle ? (
                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-[11px] font-bold text-spaced text-black group/link uppercase tracking-widest">
                          Read Full Article 
                          <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-2 transition-transform duration-300" />
                        </Link>
                      ) : (
                        <div className="h-6"></div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
