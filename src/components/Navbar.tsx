"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const Navbar = ({ solid = false }: { solid?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Jewellers", href: "/jewellers" },
    { name: "Dine", href: "/#dine" },
    { name: "News & Events", href: "#news" },
    { name: "Business & Directory", href: "#business&directory" },
    { name: "Contact Us", href: "#Contact" },
  ];

  const isLightMode = solid || isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isLightMode ? "bg-white/95 backdrop-blur-md py-4 shadow-md" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className={`text-2xl font-light tracking-[0.3em] uppercase transition-colors duration-500 ${isLightMode ? "text-black" : "text-white"}`}>
            Hatton <span className="font-semibold">Garden</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[11px] font-bold text-spaced transition-colors duration-300 ${
                isLightMode ? "text-black/70 hover:text-black" : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className={`${isLightMode ? "text-black" : "text-white"} hover:scale-110 transition-transform`}>
            <Search size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-6">
          <button className={`${isLightMode ? "text-black" : "text-white"}`}>
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

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/98 z-[60] flex flex-col items-center justify-center transition-transform duration-700 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>
        <div className="flex flex-col space-y-8 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-2xl font-light text-spaced hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
