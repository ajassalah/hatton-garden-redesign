"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, ChevronRight, X, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const SuccessModal = ({ isOpen, onClose, name }: { isOpen: boolean; onClose: () => void; name: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        <div className="bg-emerald-600 h-1.5 w-full"></div>
        <div className="p-10 text-center">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-black/20 hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 relative">
              <CheckCircle2 size={40} />
              <div className="absolute -top-1 -right-1">
                <Sparkles className="text-emerald-400 animate-pulse" size={20} />
              </div>
            </div>
          </div>

          <h3 className="text-[10px] text-spaced font-bold text-emerald-600 mb-2 uppercase tracking-[0.3em]">Message Sent</h3>
          <h2 className="text-3xl font-light font-serif text-black mb-6 italic">Thank You, {name}</h2>
          
          <div className="bg-platinum/20 p-6 rounded-sm mb-8 text-left border border-platinum/50">
            <p className="text-black/60 text-sm leading-relaxed">
              We have received your inquiry. Our team will review your message and get back to you as soon as possible.
            </p>
          </div>

          <p className="text-xs text-black/40 mb-10 italic">
            A confirmation has been sent to your email address.
          </p>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-black text-white text-[11px] font-bold text-spaced hover:bg-black/90 transition-all uppercase tracking-[0.2em] shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'Inquiry'
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ firstName: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error("Failed to send inquiry:", error);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        name={formData.firstName} 
      />
      
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
          <div className="flex items-center justify-center space-x-2 text-white/60 text-xs md:text-sm text-spaced mb-6 font-bold">
            <Link href="/" className="hover:text-white transition-colors uppercase">Home</Link>
            <ChevronRight size={14} />
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
                      <a href="tel:+447566756499" className="hover:opacity-70 transition-opacity">
                        +44 7566 7564 99
                      </a>
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
            </div>

            {/* Right Column: Form */}
            <div className="bg-[#F9F9F9] p-8 md:p-16 border border-platinum shadow-2xl animate-in slide-in-from-right duration-1000 delay-200">
               <p className="text-emerald-600 text-[10px] font-bold text-spaced mb-6 uppercase tracking-[0.4em]">Inquiry Form</p>
               <h3 className="text-3xl font-light font-serif mb-12 italic">Send Us a Message</h3>
               
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">First Name</label>
                       <input 
                         type="text" 
                         required
                         value={formData.firstName}
                         onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                         placeholder="John" 
                         className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Email Address</label>
                       <input 
                         type="email" 
                         required
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                         placeholder="john@example.com" 
                         className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light"
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Subject</label>
                     <input 
                        type="text" 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="Inquiry about..." 
                        className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light"
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-1">Your Message</label>
                     <textarea 
                        rows={6} 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Write your message here..." 
                        className="w-full bg-white border-b border-platinum p-4 focus:border-emerald-600 outline-none transition-all text-sm font-light resize-none"
                     ></textarea>
                  </div>

                  <button type="submit" className="w-full py-5 bg-black text-white text-[11px] font-bold text-spaced uppercase tracking-[0.2em] flex items-center justify-center space-x-3 group hover:bg-emerald-600 transition-all shadow-xl mt-12">
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
