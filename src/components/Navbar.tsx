"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const Navbar = ({ solid = false, hideBookButton = false }: { solid?: boolean; hideBookButton?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC key to close search
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [searchOpen]);

  // Search suggestions data
  const searchSuggestions = [
    { type: "Jeweller", name: "Queensmith", url: "/jewellers/queensmith" },
    { type: "Jeweller", name: "Daniel Christopher", url: "/jewellers/daniel-christopher" },
    { type: "Category", name: "Engagement Rings", url: "/categories/engagement-rings" },
    { type: "Category", name: "Wedding Rings", url: "/categories/wedding-rings" },
    { type: "Category", name: "Diamond Jewellery", url: "/categories/diamond-jewellery" },
    { type: "Category", name: "Luxury Watches", url: "/categories/luxury-watches" },
    { type: "Category", name: "Bespoke Jewellery", url: "/categories/bespoke-jewellery" },
    { type: "Article", name: "Best Jewellers Guide", url: "/blog/hatton-garden-best-jewellers" },
    { type: "Article", name: "Engagement Ring Trends 2025", url: "/blog/engagement-ring-trends-2025" },
    { type: "Page", name: "About Us", url: "/about" },
    { type: "Page", name: "Contact Us", url: "/contact" },
    { type: "Page", name: "Getting Here", url: "/getting-here" },
  ];

  const filteredSuggestions = searchQuery.trim()
    ? searchSuggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { name: "Our Jewellers", href: "/jewellers" },
    { name: "Categories", href: "/categories" },
    { 
      name: "Visit", 
      href: "#", 
      dropdown: [
        { name: "Eat and Drink", href: "/eat-drink" },
        { name: "Getting Here", href: "/getting-here" },
      ]
    },
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isLightMode = solid || isScrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isLightMode ? "bg-white py-4 shadow-md" : "bg-transparent py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className={`text-xl lg:text-2xl font-light tracking-[0.1em] uppercase transition-colors duration-500 ${isLightMode ? "text-black" : "text-white"}`}>
              Hatton <span className="font-semibold">Garden</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-7 items-center">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.dropdown ? (
                  <div 
                    className="flex items-center cursor-pointer"
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    <span className={`text-[14px] font-bold text-spaced transition-colors duration-300 ${
                      isLightMode ? "text-black/70 hover:text-black" : "text-white/80 hover:text-white"
                    }`}>
                      {link.name}
                    </span>
                    <ChevronDown size={14} className={`ml-1 transition-transform duration-300 ${categoriesOpen ? "rotate-180" : ""} ${isLightMode ? "text-black/70" : "text-white/80"}`} />
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-8 bg-white shadow-2xl min-w-[280px] transition-all duration-500 ${categoriesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}>
                      {/* Dropdown Arrow */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-lg"></div>
                      
                      <div className="relative bg-white">
                        {/* Header */}
                        <div className="px-8 py-5 border-b border-platinum/50 bg-gradient-to-br from-emerald-50/30 to-white">
                          <h3 className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Explore</h3>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="py-3">
                          {link.dropdown.map((sub, idx) => (
                            <Link 
                              key={sub.name} 
                              href={sub.href}
                              className="group/item flex items-center justify-between px-8 py-4 text-[12px] font-bold text-black/70 hover:text-emerald-600 hover:bg-emerald-50/50 uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap"
                            >
                              <span>{sub.name}</span>
                              <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-emerald-600" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-[14px] font-bold text-spaced transition-colors duration-300 ${
                      isLightMode ? "text-black/70 hover:text-black" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <button 
              onClick={() => setSearchOpen(true)}
              className={`${isLightMode ? "text-black" : "text-white"} hover:scale-110 transition-transform ml-2`}
            >
              <Search size={22} strokeWidth={1.5} />
            </button>
            {!hideBookButton && (
              <Link 
                href="/book-appointment"
                className="ml-4 px-6 py-2.5 bg-emerald-600 text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Book Appointment
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center space-x-6">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`${isLightMode ? "text-black" : "text-white"}`}
            >
              <Search size={22} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${isLightMode ? "text-black" : "text-white"}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/98 z-[200] transition-transform duration-700 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
        >
          <X size={32} />
        </button>
        <div className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col space-y-8 text-center overflow-y-auto max-h-[80vh] px-6">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <div className="flex flex-col space-y-4">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{link.name}</span>
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white text-xl font-light text-spaced hover:opacity-70 transition-opacity"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-2xl font-light text-spaced hover:opacity-70 transition-opacity"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            {!hideBookButton && (
              <Link
                href="/book-appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 bg-emerald-600 text-white text-sm font-bold uppercase tracking-[0.12em] hover:bg-emerald-700 transition-all duration-300 shadow-lg"
              >
                Book Appointment
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[300] flex items-center justify-center p-4">
          <button
            onClick={() => {
              setSearchOpen(false);
              setSearchQuery("");
            }}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="w-full max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-white font-light font-serif italic mb-4">
                Search Hatton Garden
              </h2>
              <p className="text-white/60 font-light">Find jewellers, categories, or articles</p>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for jewellers, engagement rings, watches..."
                className="w-full bg-white/10 border-2 border-white/20 text-white placeholder-white/40 px-8 py-6 text-lg focus:border-emerald-600 focus:bg-white/20 outline-none transition-all"
                autoFocus
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40" size={24} />
            </div>

            {/* Live Suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 max-h-[400px] overflow-y-auto">
                {filteredSuggestions.map((suggestion, i) => (
                  <Link
                    key={i}
                    href={suggestion.url}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-emerald-600/50 transition-all border-b border-white/10 last:border-b-0 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-600/30 flex items-center justify-center group-hover:bg-emerald-600 transition-all">
                        <Search size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-light">{suggestion.name}</p>
                        <p className="text-white/40 text-xs uppercase tracking-widest">{suggestion.type}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            )}

            {/* No Results */}
            {searchQuery.trim() && filteredSuggestions.length === 0 && (
              <div className="mt-6 text-center py-12 bg-white/5 border border-white/10">
                <p className="text-white/60">No results found for "{searchQuery}"</p>
                <p className="text-white/40 text-sm mt-2">Try searching for jewellers, categories, or articles</p>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="text-white/40 text-sm">
                Press <kbd className="px-2 py-1 bg-white/10 rounded text-white/60">ESC</kbd> to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
