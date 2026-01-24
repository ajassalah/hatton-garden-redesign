"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, ChevronRight } from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/jewellery-stores.webp"
            alt="Contact Hatton Garden Jewellers"
            fill
            className="object-cover brightness-[0.3] scale-105"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-[10px] text-spaced mb-6">
            <Link href="/" className="hover:text-white transition-colors uppercase">Home</Link>
            <ChevronRight size={10} />
            <span className="text-white uppercase">Contact Us</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-8 leading-[1.1]">
            Contact Hatton Garden <br className="hidden md:block" />
            <span className="font-semibold italic font-serif">Jewellers</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
           Have questions or want to get in touch with Hatton Garden’s top jewellery shops? Use our contact page to find expert jewellers, request information, or arrange a visit in London’s renowned jewellery district.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* Left Column: Info */}
            <div className="animate-in slide-in-from-left duration-1000">
              <p className="text-emerald-600 text-[11px] font-bold text-spaced mb-6 uppercase tracking-[0.4em]">Get in Touch</p>
              <h2 className="text-4xl md:text-5xl font-light font-serif italic mb-12 text-black leading-tight">
                Plan Your Visit to <br />
                the Diamond Quarter
              </h2>
              
              <div className="space-y-12">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#F9F9F9] rounded-full flex items-center justify-center shrink-0 border border-platinum">
                    <MapPin size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Our Address</h4>
                    <p className="text-xl font-light text-black/80 leading-relaxed">
                      Suite 34, 33 Hatton Garden <br />
                      London EC1N 8DL <br />
                      United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#F9F9F9] rounded-full flex items-center justify-center shrink-0 border border-platinum">
                    <Phone size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Phone Number</h4>
                    <p className="text-xl font-light text-black/80">
                      +44 7566 7564 99
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#F9F9F9] rounded-full flex items-center justify-center shrink-0 border border-platinum">
                    <Mail size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Email Address</h4>
                    <p className="text-xl font-light text-black/80 border-b border-platinum hover:border-emerald-600 transition-colors cursor-pointer">
                      londonhattongarden@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-[#F9F9F9] rounded-full flex items-center justify-center shrink-0 border border-platinum">
                    <Clock size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-3">Opening Hours</h4>
                    <p className="text-xl font-light text-black/80">
                      Monday - Saturday: 10:30 AM - 5:30 PM <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-16 pt-16 border-t border-platinum">
                <h4 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.3em] mb-8">Follow Our Story</h4>
                <div className="flex space-x-6">
                  {[Facebook, Instagram, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full border border-platinum flex items-center justify-center text-black/40 hover:bg-black hover:text-white hover:border-black transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-[#F9F9F9] p-8 md:p-16 border border-platinum shadow-2xl animate-in slide-in-from-right duration-1000 delay-200">
               <p className="text-emerald-600 text-[10px] font-bold text-spaced mb-6 uppercase tracking-[0.4em]">Inquiry Form</p>
               <h3 className="text-3xl font-light font-serif mb-12 italic">Send Us a Message</h3>
               
               <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Full Name</label>
                       <input 
                         type="text" 
                         placeholder="John Doe" 
                         className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Email Address</label>
                       <input 
                         type="email" 
                         placeholder="john@example.com" 
                         className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Subject</label>
                     <input 
                        type="text" 
                        placeholder="Inquiry about..." 
                        className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Your Message</label>
                     <textarea 
                        rows={6} 
                        placeholder="Write your message here..." 
                        className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light resize-none"
                     ></textarea>
                  </div>

                  <button className="w-full py-5 bg-black text-white text-[11px] font-bold text-spaced uppercase tracking-[0.2em] flex items-center justify-center space-x-3 group hover:bg-emerald-600 transition-all shadow-xl mt-12">
                     <span>Send Message</span>
                     <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[600px] w-full bg-[#EEE] relative overflow-hidden">
         <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent("33 Hatton Garden London EC1N 8DL")}&output=embed`}
            title="Hatton Garden Office Location"
            className="grayscale hover:grayscale-0 transition-all duration-1000"
          ></iframe>
          <div className="absolute bottom-12 left-12 bg-white p-8 shadow-2xl border border-platinum max-w-sm hidden md:block">
             <MapPin className="text-emerald-600 mb-4" />
             <h4 className="text-xl font-bold mb-2">Visit Our Office</h4>
             <p className="text-black/60 text-sm font-light leading-relaxed">
               Drop by our suite in the heart of the Garden for a consultation or to meet the BID team.
             </p>
          </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactPage;
