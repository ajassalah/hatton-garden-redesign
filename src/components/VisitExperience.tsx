"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const ExperienceCard = ({ title, subtitle, image, href = "/eat-drink", large = false }: { title: string, subtitle: string, image: string, href?: string, large?: boolean }) => (
  <Link href={href} className={`relative overflow-hidden group block h-full ${large ? "md:col-span-2" : ""}`}>
    <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105 block"
        sizes={large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 right-0 bg-black p-8 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-white/50 text-spaced text-[9px] lg:text-[10px] mb-2 uppercase tracking-[0.2em]">{subtitle}</p>
        <h3 className={`text-white font-medium ${large ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"}`}>{title}</h3>
      </div>
    </div>
  </Link>
);

const VisitExperience = () => {
  return (
    <section id="visit" className="section-padding bg-black text-white">
      <div className="container mx-auto">
        <div className="max-w-xl mb-20 text-center mx-auto">
          <p className="text-white/40 text-spaced mb-6 text-xs lg:text-sm">Beyond the Diamonds</p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light mb-8 italic font-serif">A Remarkable Experience</h2>
          <p className="text-white/60 leading-relaxed font-light text-sm lg:text-base">
            Hatton Garden is more than just a jewellery quarter. Explore historic markets, artisan coffee shops, and the vibrant culinary scene of Leather Lane.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[450px]">
          <ExperienceCard 
            title="Culinary Delights" 
            subtitle="Dine & Drink" 
            image="/Cafes/craft-beer-co-hatton-garden.webp" 
            large
            href="/eat-drink"
          />
          <ExperienceCard 
            title="Leather Lane Market" 
            subtitle="Explore" 
            image="/Cafes/leather-lane-street-market-hatton-garden.webp" 
            href="/eat-drink/leather-lane-market"
          />
          <ExperienceCard 
            title="Artisanal Coffee" 
            subtitle="Caffeine & Craft" 
            image="/Artisan-coffee.jpg" 
            href="/eat-drink"
          />
          <ExperienceCard 
            title="Heritage & Travel" 
            subtitle="Visit" 
            image="/about-heritage.png" 
            large
            href="/getting-here"
          />
        </div>
      </div>
    </section>
  );
};

export default VisitExperience;
