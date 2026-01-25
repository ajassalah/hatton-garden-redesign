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
      image: "/jewellers/queensmith.jpg",
      count: "50+ Specialists"
    },
    {
      name: "Wedding Rings",
      description: "Discover beautiful wedding bands, matching sets, and eternity rings crafted by expert jewellers",
      icon: Sparkles,
      image: "/jewellers/London Victorian Ring  Co.jpg",
      count: "40+ Jewellers"
    },
    {
      name: "Diamond Jewellery",
      description: "Explore stunning diamond necklaces, earrings, bracelets and rings from GIA-certified specialists",
      icon: Gem,
      image: "/jewellers/hatton garden diamond.jpg",
      count: "60+ Stores"
    },
    {
      name: "Luxury Watches",
      description: "Premium timepieces from Rolex, Cartier, Patek Philippe and other world-renowned brands",
      icon: Watch,
      image: "/jewellers/luxury watch.webp",
      count: "25+ Retailers"
    },
    {
      name: "Bespoke Jewellery",
      description: "Custom-designed pieces crafted to your exact specifications by master jewellers and designers",
      icon: Crown,
      image: "/jewellers/baspoke.jpg",
      count: "35+ Designers"
    },
    {
      name: "Gold & Silver Jewellery",
      description: "Fine gold and silver jewellery including chains, bracelets, earrings and rings for every occasion",
      icon: Gift,
      image: "/jewellers/gold and silver.webp",
      count: "45+ Shops"
    },
    {
      name: "Vintage & Antique",
      description: "Rare vintage pieces, Art Deco designs, and antique jewellery from specialist dealers",
      icon: Award,
      image: "/jewellers/wintage and antique.jpeg",
      count: "20+ Dealers"
    },
    {
      name: "Gemstone Jewellery",
      description: "Sapphires, rubies, emeralds and other precious gemstones set in stunning designs",
      icon: Star,
      image: "/jewellers/holts gems.jpg",
      count: "30+ Specialists"
    },
    {
      name: "Pearls",
      description: "Cultured pearls, South Sea pearls, and baroque pearl jewellery from expert pearl dealers",
      icon: Zap,
      image: "/jewellers/pearls ads.jpg",
      count: "15+ Retailers"
    },
    {
      name: "Men's Jewellery",
      description: "Cufflinks, signet rings, chains, and watches designed specifically for men",
      icon: Diamond,
      image: "/jewellers/mens jewels.avif",
      count: "25+ Stores"
    },
    {
      name: "Necklaces & Pendants",
      description: "From delicate chains to statement necklaces, find the perfect piece for any occasion",
      icon: Sparkles,
      image: "/jewellers/nacless with pendone.webp",
      count: "40+ Jewellers"
    },
    {
      name: "Earrings",
      description: "Studs, hoops, drops and chandelier earrings in gold, silver, platinum and diamonds",
      icon: Star,
      image: "/jewellers/anais rose.jpg",
      count: "45+ Retailers"
    },
    {
      name: "Bracelets & Bangles",
      description: "Tennis bracelets, charm bracelets, cuffs and bangles in precious metals and gemstones",
      icon: Gift,
      image: "/jewellers/braclet and bagles.webp",
      count: "35+ Shops"
    },
    {
      name: "Brooches & Pins",
      description: "Vintage brooches, modern pins and statement pieces from specialist dealers",
      icon: Crown,
      image: "/jewellers/Alexis Jewels.jpg",
      count: "18+ Dealers"
    },
    {
      name: "Jewellery Repairs",
      description: "Expert repair services, resizing, restoration and cleaning by skilled craftsmen",
      icon: Award,
      image: "/jewellers/Jewelry_Repair_Expert_midtown_jewelers.webp",
      count: "30+ Workshops"
    },
    {
      name: "Loose Diamonds",
      description: "GIA-certified loose diamonds for custom rings and jewellery from trusted dealers",
      icon: Gem,
      image: "/jewellers/buy fine diamonds.jpg",
      count: "40+ Dealers"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/jewellers/Hatton Garden Diamonds.jpg"
            alt="Hatton Garden Store Categories"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-[10px] text-spaced mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-white">STORE CATEGORIES</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              Shop by <span className="font-semibold italic font-serif">Category</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
              Navigate Hatton Garden's specialized jewellers through curated categories. 
              Find master craftsmen and world-class collections tailored to your specific search.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => {
              const Icon = category.icon;
              return (
                <div 
                  key={i} 
                  className="group relative overflow-hidden bg-black border border-white/10 transition-all duration-500 flex flex-col h-full shadow-sm"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/20 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-500">
                      <Icon size={18} className="text-white" />
                    </div>

                    {/* Count Badge - Shown as per user's latest diff */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-emerald-600 text-white text-[8px] font-bold px-2 py-1 uppercase tracking-widest">
                        {category.count}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight uppercase tracking-tight group-hover:text-emerald-500 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/60 font-light leading-relaxed text-xs mb-6 line-clamp-3">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
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
              Why Shop by Category?
            </h2>
            <p className="text-black/70 font-light leading-relaxed text-lg mb-12">
              Hatton Garden is home to over 300 jewellery businesses. Our category system 
              helps you navigate this historic district to find the perfect specialist for your needs.
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

      <Footer />
    </main>
  );
};

export default CategoriesPage;
