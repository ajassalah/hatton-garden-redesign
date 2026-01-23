"use client";

import React from "react";
import Image from "next/image";

const ExperienceCard = ({ title, subtitle, image, large = false }: { title: string, subtitle: string, image: string, large?: boolean }) => (
  <div className={`relative overflow-hidden group ${large ? "md:col-span-2 aspect-[16/9]" : "aspect-[1/1]"}`}>
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover transition-transform duration-1000 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-10 left-10">
      <p className="text-white/60 text-spaced text-[10px] mb-2">{subtitle}</p>
      <h3 className={`text-white font-light ${large ? "text-4xl" : "text-2xl"}`}>{title}</h3>
    </div>
  </div>
);

const VisitExperience = () => {
  return (
    <section id="visit" className="section-padding bg-black text-white">
      <div className="container mx-auto">
        <div className="max-w-xl mb-20 text-center mx-auto">
          <p className="text-white/40 text-spaced mb-6">Beyond the Diamonds</p>
          <h2 className="text-4xl md:text-5xl font-light mb-8 italic font-serif">A Remarkable Experience</h2>
          <p className="text-white/60 leading-relaxed font-light">
            Hatton Garden is more than just a jewellery quarter. Explore historic markets, artisan coffee shops, and the vibrant culinary scene of Leather Lane.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExperienceCard 
            title="Culinary Delights" 
            subtitle="Dine & Drink" 
            image="/jewellers.png" 
            large
          />
          <ExperienceCard 
            title="Leather Lane Market" 
            subtitle="Explore" 
            image="/hero.png" 
          />
          <ExperienceCard 
            title="Artisanal Coffee" 
            subtitle="Caffeine & Craft" 
            image="/jewellers.png" 
          />
          <ExperienceCard 
            title="Heritage & Travel" 
            subtitle="Visit" 
            image="/hero.png" 
            large
          />
        </div>
      </div>
    </section>
  );
};

export default VisitExperience;
