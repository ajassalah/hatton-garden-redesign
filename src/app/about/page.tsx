"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Target, Lightbulb, ShieldCheck } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-heritage.png"
            alt="Hatton Garden Heritage"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-[10px] text-spaced mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-white">ABOUT US</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-4">
            Our <span className="font-semibold italic font-serif">Success</span>
          </h1>
        </div>
      </section>

      {/* Modern Luxury Stats Section - "Our Success" */}
      <section className="py-24 bg-white border-b border-platinum">
        <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">300+</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase">Jewellery Businesses</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">55+</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase">Specialist Shops</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">19th</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase">Century Heritage</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">100k+</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase">Annual Visitors</span>
                </div>
            </div>
        </div>
      </section>

      {/* Intro Section - "The Legacy" */}
      <section className="section-padding">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-black/40 text-[11px] text-spaced font-bold mb-6 uppercase tracking-widest">The Legacy</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
                The Heart of London’s <br />
                <span className="font-semibold italic font-serif">Diamond District</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8 text-black/60 font-light leading-relaxed text-xl">
                <p>
                  Hatton Garden has been the centre of the UK’s diamond and jewellery trade since the 19th century. 
                  Originally a residential district for London’s elite, it evolved into a world-renowned trade hub 
                  that remains the heartbeat of the capital’s high-end craftsmanship.
                </p>
                <p>
                  Today, it is a global destination where heritage meets innovation. Home to master diamond setters, 
                  bespoke designers, and historical boutiques, the area offers an ecosystem of excellence 
                  unmatched anywhere else in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values - Emaar Style Grid */}
      <section className="py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-black/40 text-[11px] text-spaced font-bold mb-16 uppercase tracking-widest text-center">Brand Values</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-platinum mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <Target size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Our Vision</h3>
                    <p className="text-black/60 font-light leading-relaxed text-sm max-w-xs">
                        To remain the global benchmark for jewellery excellence, blending centuries of tradition with the 
                        highest standards of modern luxury and innovation.
                    </p>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-platinum mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <Lightbulb size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Our Mission</h3>
                    <p className="text-black/60 font-light leading-relaxed text-sm max-w-xs">
                        To support and showcase Hatton Garden's unique community of artisans, retailers, and traders, 
                        ensuring an exceptional experience for every visitor.
                    </p>
                </div>
                <div className="flex flex-col items-center group">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border border-platinum mb-8 group-hover:bg-black group-hover:text-white transition-all duration-500">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Our Commitment</h3>
                    <p className="text-black/60 font-light leading-relaxed text-sm max-w-xs">
                        Upholding absolute integrity through ethical sourcing practices and the Kimberley Process, 
                        honouring the trust of our clients across the globe.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* Image & Detail Section */}
      <section className="bg-white py-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[600px] lg:h-auto overflow-hidden group">
            <Image
              src="/about-artisan.png"
              alt="Artisan Craftsmanship"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
          <div className="section-padding flex items-center">
            <div className="max-w-xl mx-auto lg:ml-24">
              <p className="text-black/40 text-[11px] text-spaced font-bold mb-6 uppercase tracking-widest">CRAFTSMANSHIP</p>
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                Mastery in every <span className="font-semibold italic font-serif">Detail</span>
              </h2>
              <div className="space-y-6 text-black/60 font-light leading-relaxed text-lg">
                <p>
                  Hatton Garden is home to the highest concentration of jewelery expertise in the UK. 
                  Beyond the shop windows, the area houses specialized workshops where master craftsmen 
                  continue techniques passed down through generations.
                </p>
                <p>
                  From the precision of diamond cutting to the delicate art of hand-engraving, 
                  our artisans represent the pinnacle of British jewellery making, transforming 
                  raw stones into timeless heirlooms.
                </p>
              </div>
              <div className="mt-12 pt-12 border-t border-platinum">
                 <Link href="/jewellers" className="inline-flex items-center text-[12px] text-spaced font-bold border-b-2 border-black pb-1 hover:opacity-60 transition-opacity group uppercase">
                    Our Jewellers <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
