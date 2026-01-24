"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Car, Train, Bus, Plane, MapPin, Clock, ParkingCircle } from "lucide-react";

const GettingHerePage = () => {
  const [activeTab, setActiveTab] = useState("tube");

  const parkingLocations = [
    {
      name: "NCP London Saffron Hill",
      address: "Saffron Hill, St Cross Street, London EC1N 8XA",
      distance: "2 min walk"
    },
    {
      name: "NCP London Farringdon",
      address: "1 Bowling Green Lane, Clerkenwell, London EC1R 0BD",
      distance: "5 min walk"
    },
    {
      name: "NCP London Aldersgate",
      address: "158-170 Aldersgate Street, London EC1A 4HY",
      distance: "8 min walk"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[450px] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hatton-garden-location.webp"
            alt="Getting to Hatton Garden"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center pt-20">
          <div className="flex items-center justify-center space-x-2 text-white/60 text-[10px] text-spaced mb-6">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-white">GETTING HERE</span>
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-8 leading-[1.1]">
            Getting to <br className="hidden md:block" />
            <span className="font-semibold italic font-serif">Hatton Garden</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-xl">
            Located in the heart of London, Hatton Garden is easily accessible by tube, bus, car, or plane.
          </p>
        </div>
      </section>

      {/* Transport Tabs */}
      <section className="py-24 bg-white border-b border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {[
              { id: "tube", label: "Tube", icon: Train },
              { id: "bus", label: "Bus", icon: Bus },
              { id: "car", label: "Car", icon: Car },
              { id: "plane", label: "Plane", icon: Plane }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-8 py-4 border-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-platinum bg-white text-black/70 hover:border-emerald-600"
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "tube" && (
              <div className="space-y-12 animate-in fade-in duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light font-serif italic mb-4">By Underground</h2>
                  <p className="text-black/60 font-light leading-relaxed">Hatton Garden is served by several tube stations within walking distance</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-[#F9F9F9] border border-platinum">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">
                        CL
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">Chancery Lane</h3>
                        <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold">Central Line</p>
                      </div>
                    </div>
                    <div className="flex items-center text-emerald-600 mb-2">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm font-bold">3 minute walk</span>
                    </div>
                    <p className="text-black/60 text-sm font-light">The closest station to Hatton Garden, exit onto High Holborn and walk north</p>
                  </div>

                  <div className="p-8 bg-[#F9F9F9] border border-platinum">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-purple-800 flex items-center justify-center text-white text-[10px] font-bold">
                        EL
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">Farringdon</h3>
                        <p className="text-[10px] text-black/40 uppercase tracking-widest font-bold">Elizabeth Line</p>
                      </div>
                    </div>
                    <div className="flex items-center text-emerald-600 mb-2">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm font-bold">5 minute walk</span>
                    </div>
                    <p className="text-black/60 text-sm font-light">Direct access from Heathrow and major rail terminals via the Elizabeth Line</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bus" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light font-serif italic mb-4">By Bus</h2>
                  <p className="text-black/60 font-light leading-relaxed">Several bus routes serve the Hatton Garden area</p>
                </div>

                <div className="bg-[#F9F9F9] p-12 border border-platinum">
                  <h3 className="text-xl font-bold mb-6">Bus Routes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["8", "17", "25", "45", "46", "63", "242", "341"].map((route) => (
                      <div key={route} className="bg-red-600 text-white p-4 text-center">
                        <span className="text-2xl font-bold">{route}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-black/60 text-sm font-light mt-8">
                    All routes stop within a 5-minute walk of Hatton Garden on Holborn, Farringdon Road, or Clerkenwell Road
                  </p>
                </div>
              </div>
            )}

            {activeTab === "car" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light font-serif italic mb-4">By Car</h2>
                  <p className="text-black/60 font-light leading-relaxed">Parking options near Hatton Garden</p>
                </div>

                <div className="space-y-6">
                  {parkingLocations.map((location, i) => (
                    <div key={i} className="p-8 bg-[#F9F9F9] border border-platinum hover:bg-white hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <ParkingCircle size={24} className="text-emerald-600 mt-1" />
                          <div>
                            <h3 className="text-xl font-bold text-black mb-2">{location.name}</h3>
                            <p className="text-black/60 text-sm mb-3">{location.address}</p>
                            <div className="flex items-center text-emerald-600">
                              <MapPin size={14} className="mr-2" />
                              <span className="text-sm font-bold">{location.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-600 p-6 mt-8">
                  <p className="text-sm text-black/70">
                    <strong>Note:</strong> Hatton Garden is located within the London Congestion Charge Zone. Please check TfL for current charges and times.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "plane" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-light font-serif italic mb-4">By Plane</h2>
                  <p className="text-black/60 font-light leading-relaxed">Arriving from London's major airports</p>
                </div>

                <div className="space-y-6">
                  <div className="p-8 bg-[#F9F9F9] border border-platinum">
                    <h3 className="text-xl font-bold text-black mb-4">Heathrow Airport</h3>
                    <p className="text-black/60 mb-4">Take the Elizabeth Line direct to Farringdon (5 min walk to Hatton Garden)</p>
                    <div className="flex items-center text-emerald-600">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm font-bold">Approximately 45 minutes</span>
                    </div>
                  </div>

                  <div className="p-8 bg-[#F9F9F9] border border-platinum">
                    <h3 className="text-xl font-bold text-black mb-4">Gatwick Airport</h3>
                    <p className="text-black/60 mb-4">Take the Gatwick Express to Victoria, then tube to Chancery Lane</p>
                    <div className="flex items-center text-emerald-600">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm font-bold">Approximately 60 minutes</span>
                    </div>
                  </div>

                  <div className="p-8 bg-[#F9F9F9] border border-platinum">
                    <h3 className="text-xl font-bold text-black mb-4">City Airport</h3>
                    <p className="text-black/60 mb-4">Take the DLR to Bank, then Central Line to Chancery Lane</p>
                    <div className="flex items-center text-emerald-600">
                      <Clock size={16} className="mr-2" />
                      <span className="text-sm font-bold">Approximately 40 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full bg-[#EEE] relative overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent("Hatton Garden London")}&output=embed`}
          title="Hatton Garden Location"
          className="grayscale hover:grayscale-0 transition-all duration-1000"
        ></iframe>
      </section>

      <Footer />
    </main>
  );
};

export default GettingHerePage;
