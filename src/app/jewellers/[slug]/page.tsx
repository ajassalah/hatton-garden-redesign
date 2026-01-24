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
  PenTool,
  X,
  Quote,
  Plus,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { jewellers } from "@/data/jewellers";

const TestimonialModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  jewellerName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: { 
    text: string; 
    author: string; 
    rating: number; 
    headline: string; 
    dateVisited: string; 
    productPurchased: string;
    images: string[];
  }) => void;
  jewellerName: string;
}) => {
  const [text, setText] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [headline, setHeadline] = React.useState("");
  const [dateVisited, setDateVisited] = React.useState("");
  const [productPurchased, setProductPurchased] = React.useState("");
  const [images, setImages] = React.useState<string[]>([]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      Promise.all(fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })).then(newImages => {
        setImages(prev => [...prev, ...newImages]);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
          <button onClick={onClose} className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors z-20">
            <X size={24} />
          </button>
          
          <h3 className="text-[10px] text-spaced font-bold text-black/40 mb-2 uppercase tracking-widest">Write a Testimonial</h3>
          <h4 className="text-3xl font-light text-black mb-10 leading-tight">
            Share your experience with <span className="font-bold italic font-serif leading-none block md:inline">{jewellerName}</span>
          </h4>

          <div className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Your Name</label>
              <input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-platinum px-5 py-4 focus:outline-none focus:border-black text-[13px] font-medium transition-all"
                placeholder="E.G. SARAH JAMES"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Date Visited</label>
                <input 
                  type="date"
                  value={dateVisited}
                  onChange={(e) => setDateVisited(e.target.value)}
                  className="w-full bg-[#F9F9F9] border border-platinum px-5 py-4 focus:outline-none focus:border-black text-[13px] font-medium transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Product Purchased</label>
                <input 
                  type="text"
                  value={productPurchased}
                  onChange={(e) => setProductPurchased(e.target.value)}
                  className="w-full bg-[#F9F9F9] border border-platinum px-5 py-4 focus:outline-none focus:border-black text-[13px] font-medium transition-all"
                  placeholder="E.G. ENGAGEMENT RING"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Review Headline</label>
              <input 
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-platinum px-5 py-4 focus:outline-none focus:border-black text-[13px] font-medium transition-all"
                placeholder="What About"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Your Experience</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full bg-[#F9F9F9] border border-platinum p-5 focus:outline-none focus:border-black min-h-[140px] font-serif italic text-lg leading-relaxed"
                placeholder="Describe your visit..."
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Upload Item Image</label>
              <div className="space-y-4">
                {images.length === 0 ? (
                  <label className="block w-full bg-[#F9F9F9] border border-platinum px-5 py-4 cursor-pointer hover:border-black transition-colors group">
                    <input 
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-between">
                       <span className="text-[11px] font-bold text-black/60 group-hover:text-black transition-colors uppercase tracking-[0.1em]">Choose files...</span>
                       <ImageIcon size={18} className="text-black/20 group-hover:text-black transition-colors" />
                    </div>
                  </label>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-24 h-24 rounded-sm overflow-hidden border border-platinum group/preview animate-in fade-in zoom-in-95 duration-500">
                        <Image src={img} alt="preview" fill className="object-cover" />
                        <button 
                          onClick={() => setImages(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                    <label className="w-24 h-24 border-2 border-dashed border-platinum rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-black/5 transition-all text-black/20 hover:text-black group">
                      <input 
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <Plus size={24} />
                      <span className="text-[8px] font-bold mt-1 uppercase tracking-widest">ADD MORE</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-spaced text-black/40 mb-3 uppercase tracking-widest">Your Rating</label>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setRating(star)}
                    className={`${rating >= star ? 'text-emerald-600' : 'text-platinum'} hover:scale-125 transition-all duration-300`}
                  >
                    <Star size={28} fill={rating >= star ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                if (text && author && headline) {
                  onSubmit({ text, author, rating, headline, dateVisited, productPurchased, images });
                  setText("");
                  setAuthor("");
                  setHeadline("");
                  setDateVisited("");
                  setProductPurchased("");
                  setImages([]);
                  onClose();
                }
              }}
              className="w-full bg-black text-white py-5 text-[12px] font-bold text-spaced hover:bg-black/90 transition-all uppercase tracking-[0.3em] shadow-lg active:scale-[0.98]"
            >
              Submit Testimonial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JewellerDetailPage = () => {
  const params = useParams();
  const slug = params.slug;
  const jeweller = jewellers.find((j) => j.slug === slug);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = React.useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = React.useState(0);
  const [localTestimonials, setLocalTestimonials] = React.useState([
    {
      text: "Overall pleasurable experience. The bespoke service was beyond our expectations. They took the time to understand exactly what we wanted for our wedding bands, which made me feel very confident and comfortable. Seamless and easy process.",
      author: "Sarah Johnston",
      role: "Engagement Client",
      rating: 5,
      date: "12 Jan, 2026",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      itemImages: ["https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400&auto=format&fit=crop"],
      headline: "Perfect Wedding Bands"
    },
    {
      text: "Absolutely stunning craftsmanship and professional service. The team really knows their diamonds and guided us through the whole process as milestones are achieved. Highly recommended for anyone seeking perfection.",
      author: "Michael Alexander",
      role: "Bespoke Collector",
      rating: 5,
      date: "29 Dec, 2025",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      itemImages: [],
      headline: "Exquisite Craftsmanship"
    },
    {
      text: "A truly wonderful experience from start to finish. The attention to detail is unmatched in Hatton Garden. They made the daunting process of choosing an engagement ring simple and enjoyable. Truly recommended.",
      author: "Lauren Contreras",
      role: "Regular Customer",
      rating: 4.8,
      date: "15 Nov, 2025",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      itemImages: ["https://images.unsplash.com/photo-1535633302703-b07034633930?q=80&w=400&auto=format&fit=crop"],
      headline: "Seamless Experience"
    }
  ]);

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % localTestimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + localTestimonials.length) % localTestimonials.length);
  };

  const handleAddTestimonial = (data: { 
    text: string; 
    author: string; 
    rating: number; 
    headline: string; 
    dateVisited: string; 
    productPurchased: string;
    images: string[];
  }) => {
    const newTestimonial = {
      ...data,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.author)}&background=f0f0f0&color=000`,
      itemImages: data.images
    };
    setLocalTestimonials([newTestimonial, ...localTestimonials]);
    setActiveTestimonialIndex(0);
  };

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
                 <div className="flex items-center space-x-5 border-r border-platinum pr-6">
                    {jeweller.socials.twitter && (
                      <a href={jeweller.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Twitter">
                        <Twitter size={18} />
                      </a>
                    )}
                    {jeweller.socials.facebook && (
                      <a href={jeweller.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Facebook">
                        <Facebook size={18} />
                      </a>
                    )}
                    {jeweller.socials.instagram && (
                      <a href={jeweller.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Instagram">
                        <Instagram size={18} />
                      </a>
                    )}
                    <a href={jeweller.website} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-all hover:scale-110 active:scale-95" title="Visit Website">
                        <Globe size={18} />
                    </a>
                 </div>
                 
                 <div className="flex items-center space-x-4">
                    <a href={`tel:${jeweller.phone.replace(/\s/g, '')}`} className="text-black font-medium text-lg hover:underline decoration-1 underline-offset-4 flex items-center space-x-2">
                        <Phone size={18} className="text-black/20" />
                        <span>{jeweller.phone}</span>
                    </a>
                 </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-10">
                <a href={jeweller.website} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-3 text-[11px] text-spaced font-bold hover:bg-black/80 transition-all flex items-center space-x-2">
                    <ExternalLink size={14} />
                    <span>VISIT WEBSITE</span>
                </a>
                <button 
                  onClick={() => document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2"
                >
                    <ImageIcon size={14} />
                    <span>GALLERY</span>
                </button>
                <button 
                  onClick={() => setIsTestimonialModalOpen(true)}
                  className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2"
                >
                    <PenTool size={14} />
                    <span>WRITE TESTIMONIAL</span>
                </button>
                <button 
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-platinum bg-white text-black px-8 py-3 text-[11px] text-spaced font-bold hover:bg-platinum/20 transition-all flex items-center space-x-2"
                >
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
                 <h2 className="text-spaced text-[11px] font-bold text-black/30 mb-8 tracking-[0.3em] uppercase">About {jeweller.name}</h2>
                 <p className="text-2xl md:text-3xl font-light leading-relaxed text-black/80 italic font-serif">
                    {jeweller.longDescription}
                 </p>
            </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-section" className="py-24 bg-white border-t border-platinum">
        <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-spaced text-[11px] font-bold text-black/40 mb-12 border-b border-platinum pb-4 uppercase tracking-[0.2em]">Our Gallery</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative aspect-[4/5] overflow-hidden group shadow-sm bg-platinum/20">
                        <Image
                            src={jeweller.image}
                            alt={`${jeweller.name} gallery ${i}`}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-[1.5s] brightness-95 group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                ))}
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
                 src={`https://www.google.com/maps?q=${encodeURIComponent(jeweller.address + " Hatton Garden London")}&output=embed`}
                 title={`Map for ${jeweller.name}`}
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
                        <a href={jeweller.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:opacity-70 transition-opacity">
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

      {/* Testimonials Section - Centered Layout Redesign */}
      <section id="testimonials-section" className="py-32 bg-[#F2F2F2] border-y border-platinum relative">
        <div className="container mx-auto px-6 md:px-12">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black font-serif">Our Clients Say</h2>
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
              {/* Profile Image with Ring */}
              <div className="relative mb-12">
                <div className="w-48 h-48 rounded-full border-[6px] border-emerald-600 p-1.5 bg-white shadow-xl relative scale-100 hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                    <Image 
                      src={localTestimonials[activeTestimonialIndex].avatar} 
                      alt={localTestimonials[activeTestimonialIndex].author} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="mb-8">
                <p className="text-xl md:text-2xl font-light text-black/80 leading-relaxed italic max-w-2xl mx-auto font-serif">
                  "{localTestimonials[activeTestimonialIndex].text}"
                </p>
              </div>

              {/* Author Name */}
              <div className="mb-12">
                <h4 className="text-3xl font-bold text-black font-serif mb-2 tracking-tight">
                  {localTestimonials[activeTestimonialIndex].author}
                </h4>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.4em]">
                  {localTestimonials[activeTestimonialIndex].headline || "Verified Order"}
                </p>
              </div>

              {/* Multiple Item Images Gallery (Optional Display) */}
              {localTestimonials[activeTestimonialIndex].itemImages && localTestimonials[activeTestimonialIndex].itemImages.length > 0 && (
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                  {localTestimonials[activeTestimonialIndex].itemImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-sm overflow-hidden border border-platinum shadow-md group/img hover:scale-110 transition-transform">
                      <Image src={img} alt="item" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2.5 mt-4">
              {localTestimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTestimonialIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border border-black/10 ${activeTestimonialIndex === i ? 'bg-emerald-600 border-emerald-600 w-5' : 'bg-platinum'}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => setIsTestimonialModalOpen(true)}
              className="text-[10px] font-bold text-black/30 hover:text-emerald-600 transition-colors uppercase tracking-[0.3em] border-b border-platinum/50 pb-1"
            >
              Share Your Own Hatton Garden Story
            </button>
          </div>
        </div>
      </section>

      <TestimonialModal 
        isOpen={isTestimonialModalOpen}
        onClose={() => setIsTestimonialModalOpen(false)}
        onSubmit={handleAddTestimonial}
        jewellerName={jeweller.name}
      />

      <Footer />
    </main>
  );
};

export default JewellerDetailPage;
