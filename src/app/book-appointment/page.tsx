"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookAppointmentPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Appointment request submitted! We will contact you shortly.");
    // Reset form
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-light font-serif text-black mb-6">
                Schedule a Consultation
              </h1>
              <p className="text-lg text-black/70 leading-relaxed max-w-3xl mx-auto">
                Fill in the form below to book an online or in-store appointment with one of our diamond and jewellery experts. We will walk you through our bespoke design process, guide you on our product range or help you explore your ideas to create the perfect piece.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white shadow-2xl border border-black/5">
              {/* Decorative Header */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 h-2"></div>
              
              <form onSubmit={handleSubmit} className="px-8 md:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                      placeholder="Enter your first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                      placeholder="Enter your last name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                      placeholder="+44 20 1234 5678"
                    />
                  </div>

                  {/* Appointment Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Appointment Type <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={formData.appointmentType}
                      onChange={(e) => setFormData({...formData, appointmentType: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all bg-white"
                    >
                      <option value="">Select appointment type</option>
                      <option value="In Store Appointment">In Store Appointment</option>
                      <option value="Online Appointment">Online Appointment</option>
                    </select>
                  </div>

                  {/* Product Interest */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Product Interested In?
                    </label>
                    <select
                      value={formData.productInterest}
                      onChange={(e) => setFormData({...formData, productInterest: e.target.value, customProduct: ""})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all bg-white"
                    >
                      <option value="">Select a product</option>
                      <option value="Wedding Rings">Wedding Rings</option>
                      <option value="Engagement Rings">Engagement Rings</option>
                      <option value="Eternity Rings">Eternity Rings</option>
                      <option value="Diamond Jewellery">Diamond Jewellery</option>
                      <option value="Bespoke Design">Bespoke Design</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  {/* Custom Product (shown when "Others" is selected) */}
                  {formData.productInterest === "Others" && (
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                        Please Specify Product
                      </label>
                      <input
                        type="text"
                        value={formData.customProduct}
                        onChange={(e) => setFormData({...formData, customProduct: e.target.value})}
                        className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                        placeholder="Describe the product you're interested in"
                      />
                    </div>
                  )}

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Budget
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                      placeholder="e.g., £5,000 - £10,000"
                    />
                  </div>

                  {/* Appointment Date */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Date of Appointment <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Appointment Time */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                      Appointment Time <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                      className="w-full border-2 border-black/10 px-4 py-3 text-black focus:border-emerald-600 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    className="px-12 py-4 bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Submit Appointment Request
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">Flexible Scheduling</h3>
                <p className="text-sm text-black/60">Choose a time that works best for you</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">Expert Guidance</h3>
                <p className="text-sm text-black/60">Consult with our diamond specialists</p>
              </div>

              <div className="p-6">
                <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/70 mb-2">No Obligation</h3>
                <p className="text-sm text-black/60">Free consultation with no commitment</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
