"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Phone, Navigation, LayoutGrid, List, X, ExternalLink, MapPin, Loader2 } from "lucide-react";
import type { Jeweller } from "@/data/jewellers";

const ActionModal = ({ 
  isOpen, 
  onClose, 
  jeweller, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  jeweller: Jeweller | null; 
  type: "phone" | "map" | null 
}) => {
  if (!isOpen || !jeweller) return null;

  const isPhone = type === "phone";
  const title = isPhone ? "Contact Number" : "Store Location";
  const actionText = isPhone ? "CALL NOW" : "OPEN IN MAPS";
  const icon = isPhone ? <Phone size={24} /> : <MapPin size={24} />;
  const value = isPhone ? jeweller.phone : jeweller.address;
  const href = isPhone 
    ? `tel:${jeweller.phone.replace(/\s/g, '')}` 
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(jeweller.name + " " + jeweller.address)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="p-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-platinum/30 rounded-full flex items-center justify-center mb-6 text-black">
              {icon}
            </div>
            
            <h3 className="text-[10px] text-spaced font-bold text-black/40 mb-2 uppercase">{title}</h3>
            <h4 className="text-xl font-semibold text-black mb-2">{jeweller.name}</h4>
            <p className="text-black/60 font-light mb-8 text-lg">{value}</p>

            <div className="grid grid-cols-2 gap-4 w-full">
              <button 
                onClick={onClose}
                className="py-4 border border-platinum text-[10px] text-spaced font-bold hover:bg-platinum/10 transition-colors"
              >
                CANCEL
              </button>
              <a 
                href={href}
                target={isPhone ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="py-4 bg-black text-white text-[10px] text-spaced font-bold flex items-center justify-center space-x-2 hover:bg-black/80 transition-colors"
                onClick={() => {
                  if (isPhone) onClose();
                }}
              >
                <ExternalLink size={14} />
                <span>{actionText}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JewellersPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [modalType, setModalType] = useState<"phone" | "map" | null>(null);
  const [selectedJeweller, setSelectedJeweller] = useState<Jeweller | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jewellers, setJewellers] = useState<Jeweller[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    async function fetchJewellers() {
      try {
        const response = await fetch('/api/admin/jewellers');
        const result = await response.json();
        if (result.success) {
          setJewellers(result.data);
        }
      } catch (error) {
        console.error("Error fetching jewellers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJewellers();
  }, []);

  const openModal = (jeweller: Jeweller, type: "phone" | "map") => {
    setSelectedJeweller(jeweller);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedJeweller(null);
  };

  const filteredJewellers = jewellers.filter(jeweller => 
    jeweller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    jeweller.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    jeweller.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      
      {/* Hero Header with Background Image */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/purchesing .png"
            alt="Our Jewellers Header"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-xs md:text-sm text-spaced mb-6 font-bold">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={14} />
            <span className="text-white uppercase">Our Jewellers</span>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              Our <span className="font-semibold italic font-serif">Jewellers</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
              Browse our curated list of Hatton Garden jewellers to discover trusted specialists in diamonds, bespoke rings, and luxury jewellery.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-platinum py-8 md:py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl md:text-2xl font-light text-black uppercase tracking-[0.2em]">All Jewellers</h2>
                <p className="text-black/40 text-[9px] md:text-[10px] font-bold mt-2 uppercase tracking-widest">Showing {filteredJewellers.length} Results</p>
              </div>
              
              <div className="flex items-center bg-platinum/10 p-1 rounded-sm border border-platinum">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center space-x-2 text-[9px] text-spaced font-bold transition-all px-4 py-2 ${viewMode === "grid" ? "bg-black text-white shadow-md" : "text-black/30 hover:text-black"}`}
                  >
                      <LayoutGrid size={14} />
                      <span className="hidden sm:inline">GRID</span>
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`flex items-center space-x-2 text-[9px] text-spaced font-bold transition-all px-4 py-2 ${viewMode === "list" ? "bg-black text-white shadow-md" : "text-black/30 hover:text-black"}`}
                  >
                      <List size={14} />
                      <span className="hidden sm:inline">LIST</span>
                  </button>
              </div>
            </div>

            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="SEARCH BY NAME, CATEGORY OR KEYWORD..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fcfcfc] border border-platinum px-6 py-4 text-[10px] font-bold tracking-widest focus:outline-none focus:border-black transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-black animate-spin" />
              <p className="text-black/40 text-[10px] font-bold tracking-widest uppercase">Loading Jewellers...</p>
            </div>
          ) : filteredJewellers.length > 0 ? (
            <div className="flex flex-col items-center">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 w-full">
                  {filteredJewellers.slice(0, visibleCount).map((jeweller, index) => (
                    <div key={index} className="group bg-white rounded-sm overflow-hidden border border-platinum/50 shadow-sm hover:shadow-xl transition-all duration-500">
                      <Link href={`/jewellers/${jeweller.slug}`} className="block relative h-64 w-full overflow-hidden">
                        <Image
                          src={jeweller.image}
                          alt={jeweller.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-black px-3 py-1 text-[9px] text-spaced font-bold text-white border border-white/10 uppercase">
                          {jeweller.category}
                        </div>
                        <div className="absolute top-4 right-4 bg-black/80 text-white px-2 py-1 text-[10px] flex items-center space-x-1 backdrop-blur-sm">
                          <span>★</span>
                          <span>{jeweller.rating}</span>
                        </div>
                      </Link>
                      
                      <div className="p-8">
                        <Link href={`/jewellers/${jeweller.slug}`}>
                          <h3 className="text-xl font-semibold text-black mb-3 group-hover:text-black/70 transition-colors uppercase tracking-tight">{jeweller.name}</h3>
                        </Link>
                        <p className="text-black/60 font-light text-sm line-clamp-2 min-h-[2.5rem] mb-6 leading-relaxed">
                          {jeweller.description}
                        </p>
                        
                        <div className="pt-6 border-t border-platinum flex items-center justify-between">
                          <Link href={`/jewellers/${jeweller.slug}`} className="flex items-center space-x-2 text-[11px] text-spaced font-bold text-black border-b border-black pb-1 hover:opacity-100 transition-opacity opacity-70">
                              DETAILS
                          </Link>
                          <div className="flex items-center space-x-3">
                              <button 
                                onClick={() => openModal(jeweller, "phone")}
                                className="p-2 bg-platinum/30 rounded-full hover:bg-black hover:text-white transition-all duration-300" 
                                title="Call"
                              >
                                  <Phone size={14} />
                              </button>
                              <button 
                                onClick={() => openModal(jeweller, "map")}
                                className="p-2 bg-platinum/30 rounded-full hover:bg-black hover:text-white transition-all duration-300" 
                                title="Location"
                              >
                                  <Navigation size={14} />
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 w-full">
                  {filteredJewellers.slice(0, visibleCount).map((jeweller, index) => (
                    <div key={index} className="group bg-white rounded-sm overflow-hidden border border-platinum/50 flex flex-col md:flex-row hover:shadow-lg transition-all duration-500">
                      <Link href={`/jewellers/${jeweller.slug}`} className="relative h-64 md:h-auto md:w-80 shrink-0 overflow-hidden">
                        <Image
                          src={jeweller.image}
                          alt={jeweller.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[9px] text-spaced font-bold text-black border border-platinum uppercase">
                          {jeweller.category}
                        </div>
                      </Link>
                      
                      <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <Link href={`/jewellers/${jeweller.slug}`}>
                              <h3 className="text-2xl font-light text-black group-hover:text-black/70 transition-colors uppercase tracking-tight">{jeweller.name}</h3>
                            </Link>
                            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 flex items-center space-x-1">
                              <span>★</span>
                              <span>{jeweller.rating}</span>
                            </div>
                          </div>
                          <p className="text-black/60 font-light text-sm mb-6 leading-relaxed max-w-3xl">
                            {jeweller.description}
                          </p>
                          <div className="flex flex-wrap gap-6 text-[11px] text-black/50 mb-6 font-medium">
                            <button 
                              onClick={() => openModal(jeweller, "phone")}
                              className="flex items-center space-x-2 hover:text-black transition-colors"
                            >
                               <Phone size={14} />
                               <span>{jeweller.phone}</span>
                            </button>
                            <button 
                              onClick={() => openModal(jeweller, "map")}
                              className="flex items-center space-x-2 hover:text-black transition-colors"
                            >
                               <Navigation size={14} />
                               <span>{jeweller.address.split(',')[1] || jeweller.address}</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="pt-6 border-t border-platinum flex items-center justify-between">
                          <Link href={`/jewellers/${jeweller.slug}`} className="flex items-center space-x-2 text-[11px] text-spaced font-bold text-black border-b border-black pb-1 hover:opacity-100 transition-opacity opacity-70">
                              VIEW PROFILE
                          </Link>
                          <div className="flex items-center space-x-4">
                             <a href={jeweller.website} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-black/40 hover:text-black transition-colors uppercase tracking-widest border-r border-platinum pr-4">Website</a>
                             <a href={`mailto:${jeweller.email}`} className="text-[10px] font-bold text-black/40 hover:text-black transition-colors uppercase tracking-widest">Email</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {visibleCount < filteredJewellers.length && (
                <div className="mt-20 text-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 10)}
                    className="px-12 py-4 bg-black text-white text-[11px] font-bold tracking-[0.3em] hover:bg-black/90 transition-all uppercase shadow-xl"
                  >
                    Load More Jewellers
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-32 text-center border-2 border-dashed border-platinum rounded-sm">
              <h3 className="text-2xl font-light text-black/40 uppercase tracking-widest mb-4">No Jewellers Found</h3>
              <p className="text-black/30 text-sm font-light italic font-serif">Try searching for a different name, category, or service.</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-8 px-8 py-3 bg-black text-white text-[10px] font-bold tracking-widest hover:bg-black/80 transition-all"
              >
                CLEAR SEARCH
              </button>
            </div>
          )}
        </div>
      </section>

      <ActionModal 
        isOpen={modalType !== null}
        onClose={closeModal}
        jeweller={selectedJeweller}
        type={modalType}
      />

      <Footer />
    </main>
  );
};

export default JewellersPage;
