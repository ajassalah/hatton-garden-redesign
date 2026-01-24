"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Gem, Watch, Heart, Sparkles, Crown, Gift, Star, Zap, Award, Diamond } from "lucide-react";

const CategoriesPage = () => {
  const categories = [
    {
      name: "Engagement Rings",
      description: "Find your perfect engagement ring from Hatton Garden's finest jewellers specializing in diamonds and bespoke designs",
      icon: Heart,
      image: "/buying-an-engagement-ring-in-hatton-harden.webp",
      count: "50+ Specialists"
    },
    {
      name: "Wedding Rings",
      description: "Discover beautiful wedding bands, matching sets, and eternity rings crafted by expert jewellers",
      icon: Sparkles,
      image: "/wedding-ring-trends-for-2025.webp",
      count: "40+ Jewellers"
    },
    {
      name: "Diamond Jewellery",
      description: "Explore stunning diamond necklaces, earrings, bracelets and rings from GIA-certified specialists",
      icon: Gem,
      image: "/jewellery-shops-in-hatton-garden-london.webp",
      count: "60+ Stores"
    },
    {
      name: "Luxury Watches",
      description: "Premium timepieces from Rolex, Cartier, Patek Philippe and other world-renowned brands",
      icon: Watch,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800",
      count: "25+ Retailers"
    },
    {
      name: "Bespoke Jewellery",
      description: "Custom-designed pieces crafted to your exact specifications by master jewellers and designers",
      icon: Crown,
      image: "/bespoke-engagement-ring-made-by-hatton-harden-jeweller.webp",
      count: "35+ Designers"
    },
    {
      name: "Gold & Silver Jewellery",
      description: "Fine gold and silver jewellery including chains, bracelets, earrings and rings for every occasion",
      icon: Gift,
      image: "/gold-and-silver-jewellery-in-hatton-garden.webp",
      count: "45+ Shops"
    },
    {
      name: "Vintage & Antique",
      description: "Rare vintage pieces, Art Deco designs, and antique jewellery from specialist dealers",
      icon: Award,
      image: "/hatton-garden-london-vintage-oval-diamond-engagement-ring-filigree.webp",
      count: "20+ Dealers"
    },
    {
      name: "Gemstone Jewellery",
      description: "Sapphires, rubies, emeralds and other precious gemstones set in stunning designs",
      icon: Star,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800",
      count: "30+ Specialists"
    },
    {
      name: "Pearls",
      description: "Cultured pearls, South Sea pearls, and baroque pearl jewellery from expert pearl dealers",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
      count: "15+ Retailers"
    },
    {
      name: "Men's Jewellery",
      description: "Cufflinks, signet rings, chains, and watches designed specifically for men",
      icon: Diamond,
      image: "https://images.unsplash.com/photo-1611085583191-a3b136336aa5?q=80&w=800",
      count: "25+ Stores"
    },
    {
      name: "Necklaces & Pendants",
      description: "From delicate chains to statement necklaces, find the perfect piece for any occasion",
      icon: Sparkles,
      image: "/jewellery-trends-layered-necklaces-pearls.webp",
      count: "40+ Jewellers"
    },
    {
      name: "Earrings",
      description: "Studs, hoops, drops and chandelier earrings in gold, silver, platinum and diamonds",
      icon: Star,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800",
      count: "45+ Retailers"
    },
    {
      name: "Bracelets & Bangles",
      description: "Tennis bracelets, charm bracelets, cuffs and bangles in precious metals and gemstones",
      icon: Gift,
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343a?q=80&w=800",
      count: "35+ Shops"
    },
    {
      name: "Brooches & Pins",
      description: "Vintage brooches, modern pins and statement pieces from specialist dealers",
      icon: Crown,
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800",
      count: "18+ Dealers"
    },
    {
      name: "Jewellery Repairs",
      description: "Expert repair services, resizing, restoration and cleaning by skilled craftsmen",
      icon: Award,
      image: "https://images.unsplash.com/photo-1611085583191-a3b136336aa5?q=80&w=800",
      count: "30+ Workshops"
    },
    {
      name: "Loose Diamonds",
      description: "GIA-certified loose diamonds for custom rings and jewellery from trusted dealers",
      icon: Gem,
      image: "/hatton-garden-2025-round-brilliant-engagement-ring-platinum-pave.webp",
      count: "40+ Dealers"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/jewellery-shops-in-hatton-garden-london.webp"
            alt="Hatton Garden Jewellery Categories"
            fill
            className="object-cover brightness-[0.35]"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-[10px] text-spaced mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-white">STORE CATEGORIES</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-8 leading-[1.1]">
            Jewellery Store <br className="hidden md:block" />
            <span className="font-semibold italic font-serif">Categories</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
            Explore our Hatton Garden jewellery store categories to find expert shops for diamond rings, watches, bespoke pieces, and more.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <Link 
                  key={i} 
                  href={`/categories/${category.name.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                  className="group relative overflow-hidden bg-white border border-platinum hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-500">
                      <Icon size={18} className="text-white" />
                    </div>

                    {/* Count Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-emerald-600 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-widest">
                        {category.count}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-black mb-2 group-hover:text-emerald-600 transition-colors leading-tight">
                      {category.name}
                    </h3>
                    <p className="text-black/60 font-light leading-relaxed text-xs mb-4 line-clamp-3">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                      Explore
                      <ChevronRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-[#F9F9F9] border-t border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light font-serif italic mb-8">
              Why Shop by Category in Hatton Garden?
            </h2>
            <p className="text-black/70 font-light leading-relaxed text-lg mb-12">
              Hatton Garden is home to over 300 jewellery businesses, each specializing in different categories. 
              Whether you're looking for a specific type of jewellery or exploring options, our category system 
              helps you find the perfect specialist for your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gem size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Specialists</h3>
                <p className="text-black/60 text-sm font-light">Each category features jewellers who specialize in that specific area</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Assured</h3>
                <p className="text-black/60 text-sm font-light">All jewellers are vetted professionals with years of experience</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Best Prices</h3>
                <p className="text-black/60 text-sm font-light">Direct from manufacturers and wholesalers means competitive pricing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light font-serif italic mb-8">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/70 font-light leading-relaxed text-lg mb-12">
              Our expert team can help you find the perfect jeweller for your specific needs. Get in touch with us today.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-12 py-5 bg-emerald-600 text-white text-[11px] font-bold text-spaced uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CategoriesPage;
