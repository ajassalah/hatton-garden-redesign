"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-platinum pt-24 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <span className="text-2xl font-light tracking-[0.3em] uppercase block mb-8">
              Hatton <span className="font-semibold">Garden</span>
            </span>
            <p className="text-black/50 text-sm leading-relaxed mb-8 max-w-xs">
              London's world-renowned diamond district. A historic destination for exquisite jewellery, artisan craft, and vibrant London life.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-black/40 hover:text-black transition-colors"><Instagram size={20} strokeWidth={1.5} /></Link>
              <Link href="#" className="text-black/40 hover:text-black transition-colors"><Facebook size={20} strokeWidth={1.5} /></Link>
              <Link href="#" className="text-black/40 hover:text-black transition-colors"><Twitter size={20} strokeWidth={1.5} /></Link>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] text-spaced font-bold mb-8">Our District</h4>
            <ul className="space-y-4 text-sm text-black/60 font-light">
              <li><Link href="/jewellers" className="hover:text-black transition-colors">Find a Jeweller</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Where to Eat</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Events</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Hatton Garden Card</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-spaced font-bold mb-8">Information</h4>
            <ul className="space-y-4 text-sm text-black/60 font-light">
              <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-black transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] text-spaced font-bold mb-8">Visit Us</h4>
            <div className="text-sm text-black/60 font-light space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 w-4 h-4 shrink-0 text-black/40" />
                <span>Hatton Garden, Holborn,<br />London EC1N 8LE</span>
              </div>
              <p className="pt-4">
                Monday — Saturday<br />
                10:00 AM — 6:00 PM
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-platinum pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-black/40 text-spaced font-medium">
            © 2026 Hatton Garden London. All rights reserved.
          </p>
          <div className="flex space-x-8">
             <span className="text-[10px] text-black/40 text-spaced font-medium">Sitemap</span>
             <span className="text-[10px] text-black/40 text-spaced font-medium">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
