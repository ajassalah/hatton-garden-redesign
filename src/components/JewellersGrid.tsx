"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { jewellers as allJewellers } from "@/data/jewellers";
import Link from "next/link";

interface JewellerCardProps {
  name: string;
  category: string;
  image: string;
  slug: string;
  className?: string;
}

const JewellerCard = ({ name, category, image, slug, className = "" }: JewellerCardProps) => (
  <Link href={`/jewellers/${slug}`} className={`group cursor-pointer overflow-hidden block ${className}`}>
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 bg-black p-6">
        <p className="text-white/50 text-[9px] lg:text-[10px] text-spaced mb-1 uppercase tracking-[0.2em]">{category}</p>
        <h3 className="text-white text-lg lg:text-xl font-medium tracking-tight">{name}</h3>
      </div>
    </div>
  </Link>
);

const JewellersGrid = () => {
  // Take the first 4 jewellers for the homepage grid
  const displayJewellers = allJewellers.slice(0, 4);

  return (
    <section id="jewellers" className="section-padding bg-[#fafafa]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-black/50 text-spaced mb-4 text-xs lg:text-sm">DISCOVER THE COLLECTIONS</p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light tracking-tight">
              Most Populer <span className="font-semibold italic font-serif">Jewellers</span>
            </h2>
          </div>
          <Link href="/jewellers" className="text-[10px] lg:text-[11px] text-spaced font-bold border-b border-black pb-1 hover:opacity-60 transition-opacity flex items-center group">
            See All Jewellers <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayJewellers.map((item, index) => (
            <JewellerCard 
              key={index} 
              {...item} 
              className={`animate-fade-in [animation-delay:${index * 100}ms]`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default JewellersGrid;
