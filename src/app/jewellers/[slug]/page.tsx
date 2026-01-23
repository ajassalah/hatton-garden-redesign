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
  Calendar,
  Image as ImageIcon,
  PenTool
} from "lucide-react";
import { jewellers } from "@/data/jewellers";

const JewellerDetailPage = () => {
  const params = useParams();
  const slug = params.slug;
  const jeweller = jewellers.find((j) => j.slug === slug);

  if (!jeweller) {
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
            <Link href="/jewellers" className="hover:text-black transition-colors">OUR JEWELLERS</Link>
            <ChevronRight size={10} />
            <span className="text-black uppercase">{jeweller.name}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="w-32 h-32 md:w-64 md:h-64 rounded-sm border border-platinum bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-lg relative">
                <Image
                  src={jeweller.image}
                  alt={jeweller.name}
                  fill
                  className="object-cover"
                />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black">{jeweller.name}</h1>
                <div className="flex items-center justify-center md:justify-start space-x-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-100">
                    <Star size={14} fill="currentColor" />
                    <span>{jeweller.rating}</span>
                    <span className="text-emerald-700/50 font-normal">({jeweller.reviewsCount} reviews)</span>
                </div>
              </div>
              
              <p className="text-spaced text-[11px] font-bold text-black/40 mb-8 tracking-widest">{jeweller.category}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                 {/* Social Links */}
                 <div className="flex items-center space-x-4 border-r border-platinum pr-6">
                    {jeweller.socials.twitter && <Link href={jeweller.socials.twitter} className="text-black/40 hover:text-black transition-colors"><Twitter size={18} /></Link>}
                    {jeweller.socials.facebook && <Link href={jeweller.socials.facebook} className="text-black/40 hover:text-black transition-colors"><Facebook size={18} /></Link>}
                    {jeweller.socials.instagram && <Link href={jeweller.socials.instagram} className="text-black/40 hover:text-black transition-colors"><Instagram size={18} /></Link>}
                 </div>
                 
                 <div className="flex items-center space-x-4">
                    <a href={jeweller.website} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors">
                        <Globe size={18} />
                    </a>
                    <a href={`tel:${jeweller.phone}`} className="text-black font-medium text-lg hover:underline decoration-1 underline-offset-4">
                        {jeweller.phone}
                    </a>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                <a href={jeweller.website} className="bg-black text-white px-8 py-3 text-[11px] text-spaced font-bold hover:bg-black/80 transition-all flex items-center space-x-2">
                    <ExternalLink size={14} />
                    <span>VISIT WEBSITE</span>
                </a>
                <button className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2">
                    <ImageIcon size={14} />
                    <span>STORE GALLERY</span>
                </button>
                <button className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2">
                    <PenTool size={14} />
                    <span>WRITE TESTIMONIAL</span>
                </button>
                <button className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2">
                    <Mail size={14} />
                    <span>CONTACT</span>
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
                 <h2 className="text-spaced text-[11px] font-bold text-black/30 mb-8 tracking-[0.3em]">ABOUT {jeweller.name.toUpperCase()}</h2>
                 <p className="text-2xl md:text-3xl font-light leading-relaxed text-black/80 italic font-serif">
                    {jeweller.longDescription}
                 </p>
            </div>
        </div>
      </section>

      {/* Map & Info Section */}
      <section className="py-24 bg-[#F8F8F8] border-y border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Map Placeholder */}
            <div className="bg-platinum/50 aspect-video lg:aspect-square relative rounded-sm overflow-hidden border border-platinum shadow-inner flex items-center justify-center group">
               <div className="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center flex-col space-y-4">
                    <MapPin size={48} className="text-black/20 group-hover:scale-110 transition-transform duration-500" />
                    <span className="text-spaced text-[10px] font-bold text-black/40">GOOGLE MAPS VIEW</span>
               </div>
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
                            <p className="text-2xl font-light leading-tight">{jeweller.address}</p>
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
                            <p className="text-2xl font-light leading-tight">{jeweller.openingTimes}</p>
                        </div>
                   </div>
                </div>

                <div>
                   <h3 className="text-spaced text-[11px] font-bold text-black/40 mb-8 border-b border-platinum pb-4">GET IN TOUCH</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <a href={`mailto:${jeweller.email}`} className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
                            <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                <Mail size={20} />
                            </div>
                            <span className="font-medium">{jeweller.email}</span>
                        </a>
                        <a href={`tel:${jeweller.phone.replace(/\s/g, '')}`} className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
                            <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                <Phone size={20} />
                            </div>
                            <span className="font-medium">{jeweller.phone}</span>
                        </a>
                        <a href={jeweller.website} className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
                            <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                <Globe size={20} />
                            </div>
                            <span className="font-medium">Visit Official Website</span>
                        </a>
                        <button className="flex items-center space-x-4 hover:opacity-70 transition-opacity text-left">
                            <div className="bg-white p-4 rounded-full border border-platinum shadow-sm">
                                <Calendar size={20} />
                            </div>
                            <span className="font-medium underline underline-offset-4">Book Appointment</span>
                        </button>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default JewellerDetailPage;
