"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Gem, Watch, Heart, Sparkles, Crown, Gift, Star, Zap, Award, Diamond, LayoutGrid, List, Search, ArrowRight, Loader2 } from "lucide-react";

const iconMap: any = {
  Heart, Sparkles, Gem, Watch, Crown, Gift, Star, Zap, Award, Diamond
};

const CategoriesPage = () => {
  const [categories, setCategories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    fetch('/api/admin/shop-categories')
      .then(res => res.json())
      .then(result => {
        setCategories(result.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
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
          <div className="flex items-center justify-center space-x-2 text-white/60 text-xs md:text-sm text-spaced mb-6 font-bold">
            <Link href="/" className="hover:text-white transition-colors uppercase">HOME</Link>
            <ChevronRight size={14} />
            <span className="text-white uppercase tracking-widest">STORE CATEGORIES</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 uppercase">
              Shop by <span className="font-semibold italic font-serif">Category</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
              Navigate Hatton Garden's specialized jewellers through curated categories. 
              Find master craftsmen and world-class collections tailored to your specific search.
            </p>
          </div>
        </div>
      </section>

      {/* Search and View Filter Section */}
      <div className="bg-white border-b border-platinum py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl md:text-2xl font-light text-black uppercase tracking-[0.2em]">All Categories</h2>
                <p className="text-black/40 text-[9px] md:text-[10px] font-bold mt-2 uppercase tracking-widest">Showing {filteredCategories.length} Categories</p>
              </div>
              
              <div className="flex items-center bg-platinum/10 p-1 rounded-sm border border-platinum">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center space-x-2 text-[9px] text-spaced font-bold transition-all px-4 py-2 ${viewMode === "grid" ? "bg-black text-white shadow-md" : "text-black/30 hover:text-black"}`}
                  >
                      <LayoutGrid size={14} />
                      <span className="hidden sm:inline tracking-widest">GRID</span>
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`flex items-center space-x-2 text-[9px] text-spaced font-bold transition-all px-4 py-2 ${viewMode === "list" ? "bg-black text-white shadow-md" : "text-black/30 hover:text-black"}`}
                  >
                      <List size={14} />
                      <span className="hidden sm:inline tracking-widest">LIST</span>
                  </button>
              </div>
            </div>

            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="SEARCH FOR CATEGORIES, PRODUCTS OR SPECIALISTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fcfcfc] border border-platinum px-6 py-4 text-[10px] font-bold tracking-widest focus:outline-none focus:border-black transition-colors uppercase"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20">
                <Search size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Loader2 className="w-12 h-12 text-black animate-spin" />
          <p className="text-black/40 text-[10px] font-bold tracking-widest uppercase">Loading Categories...</p>
        </div>
      ) : filteredCategories.length > 0 ? (
        <section className="py-24 bg-[#F8F8F8]">
          <div className="container mx-auto px-6 md:px-12">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredCategories.map((category, i) => {
                  const Icon = iconMap[category.icon] || Gem;
                  return (
                    <div 
                      key={i} 
                      className="group relative overflow-hidden bg-white border border-platinum/50 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-xl rounded-sm"
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
                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-platinum group-hover:bg-black group-hover:border-black transition-all duration-500">
                          <Icon size={18} className="text-black group-hover:text-white" />
                        </div>

                        {/* Count Badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-black text-white text-[8px] font-bold px-3 py-1.5 uppercase tracking-widest">
                            {category.count}
                          </span>
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-8 flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-black mb-3 leading-tight uppercase tracking-tight group-hover:text-black/70 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-black/50 font-light leading-relaxed text-xs mb-6 line-clamp-3">
                            {category.description}
                          </p>
                        </div>
                        <div className="pt-4 border-t border-platinum">
                           <div className="flex items-center space-x-2 text-[10px] text-spaced font-bold text-black border-b border-black w-fit pb-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                              EXPLORE
                           </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCategories.map((category, i) => {
                  const Icon = iconMap[category.icon] || Gem;
                  return (
                    <div 
                      key={i} 
                      className="group bg-white rounded-sm overflow-hidden border border-platinum/50 flex flex-col md:flex-row hover:shadow-lg transition-all duration-500"
                    >
                      <div className="relative h-64 md:h-80 md:w-96 shrink-0 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 text-[9px] text-spaced font-bold text-black border border-platinum uppercase">
                          {category.count}
                        </div>
                        <div className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                          <Icon size={18} className="text-white" />
                        </div>
                      </div>
                      
                      <div className="p-10 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-3xl font-light text-black mb-6 uppercase tracking-tight group-hover:text-black/70 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-black/60 font-light text-sm mb-8 leading-relaxed max-w-2xl">
                            {category.description}
                          </p>
                        </div>
                        
                        <div className="pt-8 border-t border-platinum">
                           <button className="flex items-center space-x-2 text-[11px] text-spaced font-bold text-black border-b border-black pb-1 hover:opacity-100 transition-opacity opacity-70">
                              <span>VIEW SPECIALISTS IN {category.name}</span>
                              <ArrowRight size={14} />
                           </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className="py-32 container mx-auto px-6 text-center">
            <div className="max-w-md mx-auto py-20 border-2 border-dashed border-platinum rounded-sm">
              <h3 className="text-2xl font-light text-black/40 uppercase tracking-widest mb-4">No Categories Found</h3>
              <p className="text-black/30 text-sm font-light italic font-serif">Try searching for a different keyword or service.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-8 px-8 py-3 bg-black text-white text-[10px] font-bold tracking-widest hover:bg-black/80 transition-all font-sans"
              >
                CLEAR SEARCH
              </button>
            </div>
        </div>
      )}

      {/* Info Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center border-t border-platinum pt-24">
            <h2 className="text-3xl md:text-5xl font-light font-serif italic mb-10 text-black">
              Why Shop by Category?
            </h2>
            <p className="text-black/70 font-light leading-loose text-lg mb-20 max-w-3xl mx-auto">
              Hatton Garden is home to over 300 jewellery businesses. Our category system 
              helps you navigate this historic district to find the perfect specialist for your needs.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-16">
              <div className="text-center group">
                <div className="w-20 h-20 border border-platinum rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-black group-hover:border-black transition-all duration-500">
                  <Gem size={32} className="text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xs tracking-[0.3em] font-bold mb-4 uppercase">Expert Specialists</h3>
                <p className="text-black/40 text-[10px] font-bold uppercase leading-relaxed tracking-widest">Dedicated masters in their craft</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 border border-platinum rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-black group-hover:border-black transition-all duration-500">
                  <Award size={32} className="text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xs tracking-[0.3em] font-bold mb-4 uppercase">Quality Assured</h3>
                <p className="text-black/40 text-[10px] font-bold uppercase leading-relaxed tracking-widest">Historic standards maintained</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 border border-platinum rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-black group-hover:border-black transition-all duration-500">
                  <Star size={32} className="text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xs tracking-[0.3em] font-bold mb-4 uppercase">Direct Values</h3>
                <p className="text-black/40 text-[10px] font-bold uppercase leading-relaxed tracking-widest">Wholesale pricing directly to you</p>
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
