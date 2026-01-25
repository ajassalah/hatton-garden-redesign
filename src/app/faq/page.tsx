"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, ChevronDown, HelpCircle, Gem, Clock, ShieldCheck, MapPin } from "lucide-react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What types of jewellery can I find in Hatton Garden?",
      answer: "Hatton Garden jewellers provide a comprehensive range of fine jewellery, including engagement rings, wedding bands, eternity rings, necklaces, bracelets, earrings, and completely bespoke custom designs tailored to your vision."
    },
    {
      question: "Where do the diamonds come from?",
      answer: "Diamonds in Hatton Garden are sourced from reputable, conflict-free suppliers worldwide. All diamonds comply strictly with the Kimberley Process and are independently certified to ensure both quality and ethical sourcing."
    },
    {
      question: "What is the difference between natural and lab-grown diamonds?",
      answer: "Natural diamonds are mined from the earth over billions of years, while lab-grown diamonds are created in a controlled laboratory environment. Both are chemically, physically, and optically identical real diamonds, though lab-grown options are often more affordable and considered more environmentally friendly."
    },
    {
      question: "How do I know the quality of the diamonds?",
      answer: "Always look for diamonds with certificates from internationally recognized laboratories such as GIA, IGI, or HRD. Hatton Garden jewellers provide independent certification for all major diamonds and gemstones to guarantee their value and characteristics."
    },
    {
      question: "Why should I buy jewellery in Hatton Garden?",
      answer: "As the UK's premier jewellery district, Hatton Garden jewellers benefit from direct partnerships with manufacturers and global suppliers. This proximity reduces middleman costs, allowing them to offer customers exceptional value and expertise that you won't find on the high street."
    },
    {
      question: "Can I view the jewellery in person?",
      answer: "Yes, almost all jewellers have showrooms in Hatton Garden where you can view and try on pieces. We highly recommend booking an appointment in advance to ensure your desired items are available and to receive dedicated, personalized service from a specialist."
    },
    {
      question: "How long does it take to create a bespoke piece?",
      answer: "Bespoke jewellery typically takes 3–5 weeks to create, depending on the complexity of the design and the artisan's current workload. Many jewellers offer express options if you have an urgent timeline for a proposal or special occasion."
    },
    {
      question: "Do jewellers in Hatton Garden offer repairs?",
      answer: "Yes, the district is home to world-class workshops. Many jewellers offer comprehensive repair, resizing, restoration, and cleaning services for all types of jewellery, often performed by master craftsmen on-site."
    },
    {
      question: "What metals are available for rings and jewellery?",
      answer: "Popular metals include Platinum (renowned for its durability), 18k Yellow Gold, 18k White Gold, and 18k Rose Gold. Each metal offers unique benefits in terms of color, maintenance, and long-term wearability."
    },
    {
      question: "How do I choose the right jeweller in Hatton Garden?",
      answer: "Look for established jewellers with a long-standing reputation and positive reviews. Prioritize those with in-house craftsmanship, transparent pricing, and independent certification for stones. Don't hesitate to ask about their warranties and after-sales service to ensure peace of mind."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/jewellers/Hatton Garden Diamonds.jpg"
            alt="Hatton Garden FAQs"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-center space-x-2 text-white/50 text-[10px] text-spaced mb-12">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-white uppercase">Frequently Asked Questions</span>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
              Expert <span className="font-semibold italic font-serif">Guidance</span>
            </h1>
            <p className="text-white/60 font-light text-lg md:text-xl leading-relaxed italic font-serif border-l border-emerald-500/30 pl-6">
              Your jewellery questions answered. Browse our comprehensive guide to shopping, diamonds, and bespoke design in London's historic quarter.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border border-platinum transition-all duration-500 overflow-hidden ${openIndex === index ? "shadow-xl border-emerald-500/30" : "hover:border-black/20"}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <div className="flex items-center space-x-6">
                      <span className={`text-[10px] font-bold transition-colors ${openIndex === index ? "text-emerald-600" : "text-black/30"}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`text-lg md:text-xl font-bold transition-colors ${openIndex === index ? "text-emerald-700" : "text-black"}`}>
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-500 ${openIndex === index ? "rotate-180 text-emerald-600" : "text-black/30"}`} 
                    />
                  </button>
                  
                  <div 
                    className={`transition-all duration-500 ease-in-out ${openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-8 pb-8 ml-12 lg:ml-16">
                      <p className="text-black/60 font-light leading-relaxed text-lg pb-4 border-l-2 border-emerald-500/10 pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Highlights Section */}
      <section className="py-24 bg-[#F9F9F9] border-t border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 bg-white border border-platinum hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-600/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-500">
                <Gem size={28} className="text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">Certified Quality</h4>
              <p className="text-black/60 font-light text-sm leading-relaxed">
                Every major diamond in Hatton Garden comes with GIA or IGI certification, guaranteeing its authenticity and market value.
              </p>
            </div>

            <div className="p-10 bg-white border border-platinum hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-600/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-500">
                <ShieldCheck size={28} className="text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">Ethical Sourcing</h4>
              <p className="text-black/60 font-light text-sm leading-relaxed">
                Commitment to the Kimberley Process ensures that every stone is conflict-free and sourced with absolute integrity.
              </p>
            </div>

            <div className="p-10 bg-white border border-platinum hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-emerald-600/5 rounded-full flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-500">
                <Clock size={28} className="text-emerald-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">Expert Craft</h4>
              <p className="text-black/60 font-light text-sm leading-relaxed">
                Bespoke designs are handcrafted by master bench jewellers, typically taking 3-5 weeks from concept to completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/footer bg.jpg" 
            alt="Background" 
            fill 
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light font-serif italic mb-8">
              Still Have Questions?
            </h2>
            <p className="text-white/70 font-light leading-relaxed text-lg mb-12">
              Our expert local team is here to help you navigate the Garden and find the perfect piece or artisan for your needs.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link 
                href="/contact" 
                className="inline-block px-12 py-5 bg-emerald-600 text-white text-[11px] font-bold text-spaced uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl"
              >
                Contact Us
              </Link>
              <Link 
                href="/book-appointment" 
                className="inline-block px-12 py-5 border border-white/30 text-white text-[11px] font-bold text-spaced uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FAQPage;
