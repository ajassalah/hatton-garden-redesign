"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Luxury Jewelry Boutique"
          fill
          priority
          className="object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <p className="text-white/80 text-spaced mb-6 animate-fade-in-up text-xs lg:text-sm">
            London's Historic Diamond District
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white font-light tracking-tight mb-8 leading-[1.1] animate-fade-in-up [animation-delay:200ms]">
            The Heart of <br />
            <span className="font-semibold italic font-serif">Luxury Jewellery</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up [animation-delay:400ms]">
            <Link href="/jewellers" className="px-10 py-5 bg-white text-black text-spaced text-[11px] font-bold hover:bg-black hover:text-white transition-all duration-300 flex items-center group">
              Explore Our Jewellers
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/book-appointment" className="px-10 py-5 bg-transparent border border-white/30 text-white text-spaced text-[11px] font-bold hover:bg-white/10 transition-all duration-300">
              Plan Your Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white" />
        </div>
      </div>

      <style jsx>{`
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
