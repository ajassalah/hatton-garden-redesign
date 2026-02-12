"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ChevronRight, 
  Phone, 
  Globe, 
  Mail, 
  MapPin, 
  Clock, 
  Twitter, 
  Facebook, 
  Instagram,
  Star,
  ExternalLink,
  Utensils,
  Coffee,
  X,
  Quote,
  ArrowLeft,
  ArrowRight,
  Navigation
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Cafe } from "@/data/cafes";
import { Loader2 } from "lucide-react";

const CafeDetailPage = () => {
  const params = useParams();
  const slug = params.slug;
  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCafe() {
      try {
        const response = await fetch(`/api/admin/cafes/${slug}`);
        const result = await response.json();
        if (result.success) {
          setCafe(result.data);
        }
      } catch (error) {
        console.error("Error fetching cafe details:", error);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchCafe();
  }, [slug]);

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const testimonials = [
    {
      text: "The food was exceptional and the service was top-notch. Such a hidden gem in Hatton Garden. Highly recommend for a business lunch or a relaxed dinner.",
      author: "James Wilson",
      rating: 5,
      date: "15 Jan, 2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      headline: "Fantastic Experience"
    },
    {
      text: "Best coffee in the area! The atmosphere is perfect for getting some work done or meeting a friend. A must-visit whenever I'm in the district.",
      author: "Elena Rodriguez",
      rating: 4.8,
      date: "02 Jan, 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      headline: "Local Favorite"
    },
    {
      text: "Historic charm combined with excellent modern hospitality. We loved the wine selection and the overall vibe of the place. Will definitely be back.",
      author: "Oliver Bennett",
      rating: 5,
      date: "20 Dec, 2025",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      headline: "Atmospheric & Quality"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-black animate-spin" />
      </div>
    );
  }

  if (!cafe) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Header / Breadcrumbs */}
      <div className="pt-24 pb-12 bg-[#F9F9F9] border-b border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center space-x-2 text-black/40 text-[10px] text-spaced mb-12">
            <Link href="/" className="hover:text-black transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <Link href="/eat-drink" className="hover:text-black transition-colors">EAT & DRINK</Link>
            <ChevronRight size={10} />
            <span className="text-black uppercase">{cafe.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="w-32 h-32 md:w-64 md:h-64 rounded-sm border border-platinum bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative">
                <Image
                  src={cafe.image}
                  alt={cafe.name}
                  fill
                  className="object-cover"
                />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black">{cafe.name}</h1>
                <div className="flex items-center justify-center md:justify-start space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-100">
                    <Star size={14} fill="currentColor" />
                    <span>{cafe.rating}</span>
                    <span className="text-emerald-700/50 font-normal">({cafe.reviewsCount} reviews)</span>
                </div>
              </div>
              
              <p className="text-spaced text-[11px] font-bold text-black/40 mb-8 tracking-widest uppercase">{cafe.category}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                 {/* Social Links */}
                 <div className="flex items-center space-x-5 border-r border-platinum pr-6">
                    {cafe.socials.twitter && (
                      <a href={cafe.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Twitter">
                        <Twitter size={18} />
                      </a>
                    )}
                    {cafe.socials.facebook && (
                      <a href={cafe.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Facebook">
                        <Facebook size={18} />
                      </a>
                    )}
                    {cafe.socials.instagram && (
                      <a href={cafe.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Instagram">
                        <Instagram size={18} />
                      </a>
                    )}
                    <a href={cafe.website} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Visit Website">
                        <Globe size={18} />
                    </a>
                 </div>
                 
                 <div className="flex items-center space-x-4">
                    {cafe.phone !== "N/A" && (
                      <a href={`tel:${cafe.phone.replace(/\s/g, '')}`} className="text-black font-medium text-lg hover:underline decoration-1 underline-offset-4 flex items-center space-x-2">
                          <Phone size={18} className="text-black/20" />
                          <span>{cafe.phone}</span>
                      </a>
                    )}
                 </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                <a href={cafe.website} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-3 text-[11px] text-spaced font-bold hover:bg-black/80 transition-all flex items-center space-x-2 shadow-lg">
                    <ExternalLink size={14} />
                    <span>VISIT WEBSITE</span>
                </a>
                <button 
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2"
                >
                    <MapPin size={14} />
                    <span>LOCATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl">
                 <h2 className="text-spaced text-[11px] font-bold text-black/30 mb-8 tracking-[0.3em] uppercase">About {cafe.name}</h2>
                 <p className="text-2xl md:text-3xl font-light leading-relaxed text-black/80 italic font-serif">
                    {cafe.longDescription}
                 </p>
            </div>
        </div>
      </section>


      {/* Map & Info Section */}
      <section id="contact-section" className="py-24 bg-[#F8F8F8] border-y border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Map Section */}
            <div className="bg-platinum/50 aspect-video lg:aspect-square relative rounded-sm overflow-hidden border border-platinum shadow-inner flex items-center justify-center group">
               <iframe
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 loading="lazy"
                 allowFullScreen
                 referrerPolicy="no-referrer-when-downgrade"
                 src={`https://www.google.com/maps?q=${encodeURIComponent(cafe.name + " " + cafe.address)}&output=embed`}
                 title={`Map for ${cafe.name}`}
                 className="grayscale hover:grayscale-0 transition-all duration-700"
               ></iframe>
            </div>

            {/* Contact & Hours */}
            <div className="space-y-16">
                <div>
                   <h3 className="text-spaced text-[11px] font-bold text-black/40 mb-8 border-b border-platinum pb-4">FIND US</h3>
                   <div className="flex items-start space-x-6">
                        <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-light leading-tight">{cafe.address}</p>
                        </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-spaced text-[11px] font-bold text-black/40 mb-8 border-b border-platinum pb-4">OPENING HOURS</h3>
                   <div className="flex items-start space-x-6">
                        <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-light leading-tight">{cafe.openingTimes}</p>
                        </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-spaced text-[11px] font-bold text-black/40 mb-8 border-b border-platinum pb-4">GET IN TOUCH</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cafe.email !== "N/A" && (
                          <a href={`mailto:${cafe.email}`} className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
                              <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                  <Mail size={20} />
                              </div>
                              <span className="font-medium">{cafe.email}</span>
                          </a>
                        )}
                        {cafe.phone !== "N/A" && (
                          <a href={`tel:${cafe.phone.replace(/\s/g, '')}`} className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
                              <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                  <Phone size={20} />
                              </div>
                              <span className="font-medium">{cafe.phone}</span>
                          </a>
                        )}
                        <a href={cafe.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
                            <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                <Globe size={20} />
                            </div>
                            <span className="font-medium">Official Website</span>
                        </a>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-32 bg-[#F2F2F2] border-y border-platinum relative">
        <div className="container mx-auto px-6 md:px-12">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black font-serif">Guest Experiences</h2>
          </div>

          <div className="max-w-4xl mx-auto relative px-12 md:px-24">
            {/* Lateral Navigation Arrows */}
            <div className="absolute top-[100px] left-0 right-0 flex justify-between pointer-events-none px-4">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-all pointer-events-auto group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 transition-all pointer-events-auto group"
              >
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Active Testimonial Content */}
            <div key={activeTestimonialIndex} className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center text-center">
              <div className="relative mb-12">
                <div className="w-48 h-48 rounded-full border-[6px] border-emerald-600 p-1.5 bg-white shadow-xl relative scale-100 hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                    <Image 
                      src={testimonials[activeTestimonialIndex].avatar} 
                      alt={testimonials[activeTestimonialIndex].author} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xl md:text-2xl font-light text-black/80 leading-relaxed italic max-w-2xl mx-auto font-serif">
                  "{testimonials[activeTestimonialIndex].text}"
                </p>
              </div>

              <div className="mb-12">
                <h4 className="text-3xl font-bold text-black font-serif mb-2 tracking-tight">
                  {testimonials[activeTestimonialIndex].author}
                </h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em]">
                  {testimonials[activeTestimonialIndex].headline}
                </p>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2.5 mt-4">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border border-black/10 ${activeTestimonialIndex === i ? 'bg-emerald-600 border-emerald-600 w-5' : 'bg-platinum'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CafeDetailPage;
