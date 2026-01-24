"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const blogPosts = [
    {
      title: "Hatton Garden's Best Jewellers: Discover London's Top Jewellery Shops",
      excerpt: "Discover the best jewellers in Hatton Garden with our expert guide to top-rated shops for engagement rings, diamonds, and bespoke jewellery.",
      image: "/jewellery-shops-in-hatton-garden-london.webp",
      date: "Jan 24, 2025",
      author: "Hatton Garden Staff",
      category: "Guides",
      slug: "hatton-garden-best-jewellers",
      hasFullArticle: true
    },
    {
      title: "Engagement Ring Trends 2025: What's Hot in Hatton Garden",
      excerpt: "Hatton Garden is London's top spot for engagement rings in 2025, with bold 3 carat diamonds, timeless solitaires, and lab-grown diamonds leading the trends.",
      image: "/buying-an-engagement-ring-in-hatton-harden.webp",
      date: "Jan 20, 2025",
      author: "Diamond Expert",
      category: "Trends",
      slug: "engagement-ring-trends-2025",
      hasFullArticle: true
    },
    {
      title: "Wedding Ring Trends for 2025: From Chunky Bands to Vintage Revival",
      excerpt: "Explore the top wedding ring trends for 2025, featuring bold chunky gold bands, vintage-inspired milgrain details, and contemporary stackable designs.",
      image: "/wedding-ring-trends-for-2025.webp",
      date: "Jan 15, 2025",
      author: "Style Guide",
      category: "Wedding",
      slug: "wedding-ring-trends-2025",
      hasFullArticle: false
    },
    {
      title: "Jewellery Trends You Can't Miss in 2025: Layered Necklaces, Pearls, and More",
      excerpt: "Stay ahead of the curve with the must-have jewellery trends of 2025. From layered necklaces and mismatched earrings to the resurgence of pearls.",
      image: "/jewellery-trends-layered-necklaces-pearls.webp",
      date: "Jan 10, 2025",
      author: "Fashion Editor",
      category: "Trends",
      slug: "jewellery-trends-2025",
      hasFullArticle: false
    },
    {
      title: "Gold and Silver Jewellery: The Best of Both Worlds in Hatton Garden",
      excerpt: "Find out why sterling silver is back in style, how to mix metals for a modern look, and where to shop for investment-worthy gold and silver pieces.",
      image: "/gold-and-silver-jewellery-in-hatton-garden.webp",
      date: "Jan 05, 2025",
      author: "Metal Specialist",
      category: "Investment",
      slug: "gold-silver-jewellery-guide",
      hasFullArticle: false
    }
  ];

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
          <div className="flex items-center justify-center space-x-2 text-white/60 text-[10px] text-spaced mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
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
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
