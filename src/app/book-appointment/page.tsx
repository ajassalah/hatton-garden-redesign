"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, CheckCircle2, Calendar, Clock as ClockIcon, Sparkles } from "lucide-react";

const SuccessModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: any }) => {
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

          <h3 className="text-[10px] text-spaced font-bold text-emerald-600 mb-2 uppercase tracking-[0.3em]">Request Confirmed</h3>
          <h2 className="text-3xl font-light font-serif text-black mb-6 italic">Appointment Scheduled</h2>
          
          <div className="bg-platinum/20 p-6 rounded-sm mb-8 text-left border border-platinum/50">
            <p className="text-black/60 text-sm mb-4 leading-relaxed">
              Thank you, <span className="font-bold text-black">{data.firstName}</span>. Your appointment request for an <span className="font-bold text-black">{data.appointmentType}</span> has been received.
            </p>
            <div className="space-y-3 pt-4 border-t border-platinum/50">
              <div className="flex items-center text-sm">
                <Calendar size={16} className="text-emerald-600 mr-3" />
                <span className="font-medium">{new Date(data.appointmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center text-sm">
                <ClockIcon size={16} className="text-emerald-600 mr-3" />
                <span className="font-medium">{data.appointmentTime}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-black/40 mb-10 italic">
            A confirmation email has been sent to {data.email}. Our team will contact you shortly to confirm the details.
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

export default function BookAppointmentPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentType: "",
    productInterest: "",
    customProduct: "",
    budget: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the Email API
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'Appointment'
        }),
      });

      if (response.ok) {
        console.log("Appointment email sent successfully");
      }
    } catch (error) {
      console.error("Failed to send appointment email:", error);
    }

    setSubmittedData({...formData});
    setShowSuccess(true);
    
    // Reset form after submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      appointmentType: "",
      productInterest: "",
      customProduct: "",
      budget: "",
      appointmentDate: "",
      appointmentTime: "",
    });
  };

  return (
    <>
      <Navbar solid />
      <main className="min-h-screen bg-[#FBFBFB]">
        {/* Success Modal */}
        <SuccessModal 
          isOpen={showSuccess} 
          onClose={() => setShowSuccess(false)} 
          data={submittedData} 
        />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 -skew-x-12 translate-x-1/2 -z-10"></div>
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-emerald-600 text-[10px] font-bold text-spaced mb-6 uppercase tracking-[0.4em]">Bespoke Experience</p>
              <h1 className="text-5xl md:text-7xl font-light font-serif text-black mb-8 leading-tight">
                Schedule a <span className="italic">Consultation</span>
              </h1>
              <p className="text-lg text-black/50 leading-relaxed max-w-3xl mx-auto font-light">
                Secure your private consultation with Hatton Garden's master jewellers. Whether in-store or virtually, we are here to guide you through your journey.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white shadow-2xl border border-platinum relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 border-l border-t border-platinum -z-10 hidden md:block"></div>
              <div className="absolute -bottom-10 -right-10 w-20 h-20 border-r border-b border-platinum -z-10 hidden md:block"></div>
              
              <form onSubmit={handleSubmit} className="px-8 md:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* First Name */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      First Name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light"
                      placeholder="e.g. James"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Last Name <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light"
                      placeholder="e.g. Hatton"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Email Address <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Phone Number <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light"
                      placeholder="+44"
                    />
                  </div>

                  {/* Appointment Type */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Consultation Type <span className="text-emerald-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.appointmentType}
                      onChange={(e) => setFormData({...formData, appointmentType: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light cursor-pointer appearance-none"
                    >
                      <option value="">Select preference</option>
                      <option value="In Store Appointment">Private In-Store Visit</option>
                      <option value="Online Appointment">Virtual Video Call</option>
                    </select>
                  </div>

                  {/* Product Interest */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Primary Interest
                    </label>
                    <select
                      value={formData.productInterest}
                      onChange={(e) => setFormData({...formData, productInterest: e.target.value, customProduct: ""})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light cursor-pointer appearance-none"
                    >
                      <option value="">Select interest</option>
                      <option value="Engagement Rings">Engagement Rings</option>
                      <option value="Wedding Rings">Wedding Bands</option>
                      <option value="Bespoke Design">Bespoke Jewelry</option>
                      <option value="Luxury Watches">Luxury Watches</option>
                      <option value="Others">Something Else</option>
                    </select>
                  </div>

                  {/* Appointment Date */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Preferred Date <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Appointment Time */}
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 group-focus-within:text-emerald-600 transition-colors">
                      Preferred Time <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                      className="w-full bg-white border-b border-platinum px-0 py-3 text-black focus:border-emerald-600 outline-none transition-all font-light"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-16 text-center">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center px-16 py-5 bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] overflow-hidden transition-all duration-500 hover:shadow-2xl active:scale-95"
                  >
                    <span className="relative z-10">Confirm My Request</span>
                    <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  </button>
                  <p className="text-[9px] text-black/30 mt-6 font-bold uppercase tracking-widest">No obligation. Complete privacy guaranteed.</p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="bg-white py-24 border-t border-platinum">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-6 font-serif italic text-xl">1</div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Master Craftsmanship</h4>
                        <p className="text-sm text-black/50 leading-relaxed font-light">Direct consultation with artisans who have decades of experience in the Garden.</p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-6 font-serif italic text-xl">2</div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Curated Selection</h4>
                        <p className="text-sm text-black/50 leading-relaxed font-light">Access to our private vault of GIA certified diamonds and rare gemstones.</p>
                    </div>
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-6 font-serif italic text-xl">3</div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4">Tailored Timeline</h4>
                        <p className="text-sm text-black/50 leading-relaxed font-light">We work around your schedule to ensure your vision is realized on time.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
