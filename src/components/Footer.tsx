"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin, Clock, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-platinum pt-24 pb-12 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/footer bg.jpg" 
          alt="Footer Background" 
          fill 
          className="object-cover opacity-60 scale-105"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-black">
          <div className="lg:col-span-1">
            <span className="text-xl lg:text-2xl font-bold tracking-[0.1em] uppercase block mb-8">
              Hatton <span className="font-extrabold">Garden</span>
            </span>
            <p className="text-black font-bold text-xs lg:text-sm leading-relaxed mb-8 max-w-xs">
              London's world-renowned diamond district. A historic destination for exquisite jewellery, artisan craft, and vibrant London life.
            </p>
            <div className="flex space-x-6">
              <Link href="https://www.facebook.com/hattongardenlondon/" target="_blank" className="text-black hover:opacity-70 transition-opacity" aria-label="Facebook">
                <Facebook size={20} strokeWidth={2.5} />
              </Link>
              <Link href="https://www.instagram.com/hattongarden.london" target="_blank" className="text-black hover:opacity-70 transition-opacity" aria-label="Instagram">
                <Instagram size={20} strokeWidth={2.5} />
              </Link>
              <Link href="https://www.tiktok.com/@hattongardenlondon" target="_blank" className="text-black hover:opacity-70 transition-opacity" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="lucide">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.07-1.27 1.81-.07.7-.06 1.41.16 2.08.27.73.81 1.37 1.45 1.72.77.42 1.67.54 2.52.34.89-.21 1.69-.76 2.17-1.53.4-.63.58-1.39.6-2.14V.02z"/>
                </svg>
              </Link>
              <Link href="https://uk.pinterest.com/hattongardenlondon/" target="_blank" className="text-black hover:opacity-70 transition-opacity" aria-label="Pinterest">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="lucide">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.63 11.17-.1-.95-.2-2.41.04-3.44.22-.94 1.41-5.97 1.41-5.97s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 4-.28 1.19.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.89 2.74.1.12.11.22.08.35l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.79 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.03-1 2.32-1.49 3.12 1.13.35 2.32.54 3.55.54 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] lg:text-[15px] text-spaced font-extrabold mb-8 uppercase">Information</h4>
            <ul className="space-y-4 text-xs lg:text-sm text-black font-bold">
              <li><Link href="/jewellers" className="hover:opacity-70 transition-opacity">Find a Jeweller</Link></li>
              <li><Link href="/eat-drink" className="hover:opacity-70 transition-opacity">Where to Eat</Link></li>
              <li><Link href="/blog" className="hover:opacity-70 transition-opacity">Blog</Link></li>
              <li><Link href="/getting-here" className="hover:opacity-70 transition-opacity">How to Visit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] lg:text-[15px] text-spaced font-extrabold mb-8 uppercase">Our Links</h4>
            <ul className="space-y-4 text-xs lg:text-sm text-black font-bold">
              <li><Link href="/about" className="hover:opacity-70 transition-opacity">About Us</Link></li>
              <li><Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:opacity-70 transition-opacity">Terms of Use</Link></li>
              <li><Link href="/faq" className="hover:opacity-70 transition-opacity">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] lg:text-[15px] text-spaced font-extrabold mb-8 uppercase">Visit Us</h4>
            <div className="text-xs lg:text-sm text-black font-bold space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 w-4 h-4 shrink-0" />
                <span>Hatton Garden, Holborn,<br />London EC1N 8LE</span>
              </div>
             
              <div className="flex items-start pt-4">
                <Clock className="mr-3 w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Monday — Saturday<br />
                  10:00 AM — 6:00 PM
                </span>
              </div>

              <div className="flex items-center pt-4">
                <Phone className="mr-3 w-4 h-4 shrink-0" />
                <a href="tel:+447566756499" className="hover:opacity-70 transition-opacity">
                  +44 7566 7564 99
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-black font-bold text-spaced">
            © 2026 Hatton Garden London. All rights reserved.
          </p>
          <div className="flex space-x-8">
             <span className="text-[10px] text-black font-bold text-spaced">Sitemap</span>
             <span className="text-[10px] text-black font-bold text-spaced">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
