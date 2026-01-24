"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Target, Lightbulb, ShieldCheck, Users, Briefcase, Mail, X } from "lucide-react";

const AboutPage = () => {
  const [selectedGuide, setSelectedGuide] = React.useState<null | {
    title: string;
    content: React.ReactNode;
    image: string;
    date?: string;
  }>(null);

  const guides = [
    {
      title: "HATTON GARDEN HISTORY: GROWTH OF THE GARDEN",
      excerpt: "In the first instalment of...",
      image: "/greatfiremap-BritishLibrary.jpg",
      date: "August 2025",
      content: (
        <div className="space-y-6">
          <p>The evolution of Hatton Garden from the Bishop of Ely's gardens to the UK's premier jewellery quarter is a story spanning centuries. Once an open green space outside the city boundary, the area was even mentioned by Shakespeare in Richard III for its famous strawberries.</p>
          <p>During the rule of Elizabeth I, Sir Christopher Hatton was granted the area in 1581. By the mid-17th century, the demand for stylish urban housing led to the development of what we now know as Hatton Garden. The lush gardens were gradually replaced by elegant houses along Hatton Street, Charles Street, and Cross Street.</p>
          <p>By 1720, the transformation was complete. The once pastoral estate had become a bustling commercial hub, eventually attracting the skilled watchmakers and diamond merchants that would define its global legacy. Today, the street layout still mirrors the original 17th-century development, holding pieces of history in every corner.</p>
        </div>
      )
    },
    {
      title: "HATTON GARDEN HISTORY: WHAT'S IN A NAME?",
      excerpt: "We had such a fantastic response to our Hatton Garden Easter Quiz that we've decided to start a blog series...",
      image: "/Sir_Christopher_Hatton_from_NPG_(2)_cropped.jpg",
      date: "September 2025",
      content: (
        <div className="space-y-6">
          <p>Have you ever wondered why our district bears the name 'Hatton Garden'? The name is directly linked to Sir Christopher Hatton, a prominent figure in the Tudor court and a favourite of Queen Elizabeth I.</p>
          <p>Hatton, who served as Lord Chancellor, was granted the land by the Queen, much to the chagrin of the Bishop of Ely who previously owned the estate. The 'Garden' part of the name is a literal reference to the lush orchards and saffron fields that once covered the area.</p>
          <p>Saffron Hill, which runs alongside the district, was named for the saffron crops grown there. This transition from Tudor royal favour to the commercial heart of London is etched into every street name in the quarter, from Ely Place to Kirby Street.</p>
        </div>
      )
    },
    {
      title: "HATTON GARDEN'S BEST BRUNCHES",
      excerpt: "Hatton Garden may be most famed historically for its diamonds, but nowadays you'd be...",
      image: "/catalyst_cafe_and_coffee_roasters.jpg",
      date: "October 2025",
      content: (
        <div className="space-y-6">
          <p>While the diamonds are the main attraction, the culinary scene in Hatton Garden is a hidden gem. From artisan coffee at Prufrock to the industrial-chic roasting at Catalyst, the district offers some of the best brunch spots in Clerkenwell.</p>
          <p>Whether you're looking for a quick sourdough snack between shop visits or a slow-poured single-origin coffee, the local cafes have evolved into social hubs for both the trade and visitors alike.</p>
          <p>Our top recommendations include the seasonal menus at The Attendant, located in a beautifully repurposed Victorian lavatory, or the vibrant street food at Leather Lane Market which brings a world of flavours right to our doorstep every weekday.</p>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop"
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
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase tracking-widest">Industry Specialists</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">90+</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase tracking-widest">Retail Boutiques</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">1581</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase tracking-widest">Year Established</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-5xl font-bold mb-4">£5B+</span>
                    <span className="text-[10px] text-spaced text-black/40 font-bold uppercase tracking-widest">Trade Value</span>
                </div>
            </div>
        </div>
      </section>

      {/* Intro Section - "The Legacy" */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-black/40 text-[11px] text-spaced font-bold mb-6 uppercase tracking-widest">The Legacy</p>
              <h2 className="text-4xl md:text-6xl font-light leading-[1.1] mb-8">
                The Heart of London’s <br />
                <span className="font-semibold italic font-serif">Diamond District</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8 text-black/70 font-light leading-relaxed text-xl font-serif">
                <p>
                  Named after Sir Christopher Hatton—a favourite of Queen Elizabeth I who was granted the area in 1581—Hatton Garden is London’s legendary jewellery quarter and the global pulse of the UK’s diamond trade.
                </p>
                <p>
                  Originally a residential district for the city’s elite, its proximity to the historic Clerkenwell priory saw an influx of skilled craftsmen over centuries. By the late 1800s, the area had transformed into a bustling commercial hub, home to over 60 merchants specializing in precious stones.
                </p>
                <p>
                  The district’s reputation reached its pinnacle when De Beers, the world’s leading diamond company, established its headquarters here, selling diamonds exclusively through a syndicate of local merchants. Today, that legacy of excellence continues through nearly 300 jewellery-related businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hatton Garden Section */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
               <p className="text-white/40 text-[11px] text-spaced font-bold mb-6 uppercase tracking-widest">Beyond the Window</p>
               <h2 className="text-4xl md:text-5xl font-light mb-12 font-serif italic">What makes the Garden <span className="text-emerald-500 font-sans not-italic font-bold tracking-tighter">—</span> unique?</h2>
               <div className="space-y-12">
                  <div className="group">
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-emerald-500">Unrivalled Expertise</h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      Hatton Garden is unique for its concentration of talent. From master setters to hand-engravers, you are direct-to-source with the world's finest artisans.
                    </p>
                  </div>
                  <div className="group">
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-emerald-500">Bespoke Transparency</h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      Many jewellers operate directly from their workshops, allowing you to engage with the creators and witness the craftsmanship behind your perfect piece.
                    </p>
                  </div>
                  <div className="group">
                    <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-emerald-500">Global Sourcing</h3>
                    <p className="text-white/60 font-light leading-relaxed">
                      If a gemstone exists, it can be found here. The district is renowned for its ability to source any gemstone or metal at globally competitive prices.
                    </p>
                  </div>
               </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1598209279122-8541213a03a7?q=80&w=800"
                alt="Workshop View"
                fill
                className="object-cover brightness-75 hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
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

      {/* Team & Board Section */}
      <section className="py-32 bg-white border-t border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <p className="text-emerald-600 text-[11px] font-bold text-spaced mb-6 uppercase tracking-[0.4em]">Leadership</p>
              <h2 className="text-4xl md:text-6xl font-light font-serif">Meet the <span className="italic">Team & Board</span></h2>
            </div>
          </div>

          <div className="relative w-full h-[400px] mb-20 overflow-hidden shadow-2xl group">
            <Image 
              src="/hatton_garden_team_professional_1769237757607.png"
              alt="Hatton Garden Leadership Team"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[3s]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            {[
              { 
                name: "Alexander Jan", 
                role: "Chair", 
                bio: "Alexander serves as the Chair of the Hatton Garden BID. An expert on London infrastructure and transport, he is also the chair of the Central District Alliance and chief economic adviser to the London Property Alliance. Previously the chief economist at Arup, he is currently authoring a biography of Lord Ashfield, the creator of London Transport." 
              },
              { 
                name: "Debbie Akehurst", 
                role: "Chief Executive", 
                bio: "With over 25 years of experience in social and economic regeneration, Debbie leads both the Hatton Garden BID and Central District Alliance. A pioneer in social mobility, she launched the 'Your Future Talent' apprenticeship program and was recently honoured with the National Outstanding Achievement Award for her community-led strategies." 
              },
              { 
                name: "Alex Butt", 
                role: "BID Director", 
                bio: "Alex is responsible for the BID's strategic vision and the 2026 renewal ballot. Bringing extensive experience from his tenure as CEO of the Waterloo BID, he is a specialist in placemaking and public realm improvements, focused on building effective partnerships to drive the district's future growth." 
              }
            ].map((member, i) => (
              <div key={i} className="group p-8 bg-[#F9F9F9] border border-platinum hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-emerald-600/10 rounded-full flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Users size={24} />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-[10px] font-bold text-spaced text-emerald-600 uppercase tracking-widest mb-6">{member.role}</p>
                <p className="text-black/60 font-light leading-relaxed text-sm">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="mb-20">
            <h3 className="text-[10px] font-bold text-spaced text-black/40 uppercase tracking-[0.3em] mb-12 border-b border-platinum pb-4">Board of Directors</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
              {[
                { name: "Bradley Hartstone", role: "Vice Chair", org: "Beverley Hill Jewellers" },
                { name: "Nick Byers", role: "Director", org: "De Beers UK London" },
                { name: "David Kaiser", role: "Director", org: "WeWork (UK & Ireland)" },
                { name: "Katherine Heath", role: "Director", org: "HUG London" },
                { name: "Jonny Nelson", role: "Director", org: "Remark! Ltd" },
                { name: "Matthew Douglas", role: "Director", org: "Julius Baer" },
                { name: "Daniel Hanscombe", role: "Director", org: "Ten Health & Fitness" },
                { name: "Peter King", role: "Director", org: "Usborne Publishing" },
                { name: "Roy McGowan", role: "Director", org: "Momentum Transport" },
                { name: "Oleg Kolisnitsenko", role: "Director", org: "The Bryson Hotel" },
                { name: "Tyler Goodwin", role: "Director", org: "Seaforth Land" }
              ].map((board, i) => (
                <div key={i} className="border-l border-platinum pl-6 hover:border-emerald-600 transition-colors">
                  <h4 className="text-sm font-bold text-black mb-1">{board.name}</h4>
                  <p className="text-[9px] text-black/40 uppercase tracking-widest font-bold mb-2">{board.role}</p>
                  <p className="text-[10px] text-emerald-600 font-medium italic font-serif">{board.org}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black text-white p-12 md:p-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 blur-[100px] rounded-full" />
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-xl">
                   <div className="flex items-center space-x-3 text-emerald-500 mb-6">
                      <Briefcase size={16} />
                      <span className="text-[11px] font-bold text-spaced uppercase tracking-widest">The BID Board</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-light font-serif italic mb-8">Guided by Industry Legends</h3>
                   <p className="text-white/60 font-light leading-relaxed text-lg">
                      The Hatton Garden BID Board is comprised of business leaders from across the jewellery, creative, and professional services sectors. Their collective expertise ensures that the Garden remains the most vibrant and secure business district in London.
                   </p>
                </div>
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                   <ul className="space-y-3">
                      <li className="text-sm font-bold text-white/40 uppercase tracking-widest">Retail Leaders</li>
                      <li className="text-sm font-bold text-white/40 uppercase tracking-widest">Trade Experts</li>
                   </ul>
                   <ul className="space-y-3">
                      <li className="text-sm font-bold text-white/40 uppercase tracking-widest">Artisans</li>
                      <li className="text-sm font-bold text-white/40 uppercase tracking-widest">Innovation Partners</li>
                   </ul>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Discover Our Guides Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
             <h2 className="text-[24px] font-bold text-black tracking-[0.1em] uppercase">Discover Our Guides</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setSelectedGuide(guide)}>
                <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#F5F5F5]">
                  <Image 
                    src={guide.image} 
                    alt={guide.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-[14px] font-bold text-black leading-snug mb-4 h-12 line-clamp-2 uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-[13px] text-black/60 leading-relaxed mb-4 line-clamp-3">
                  {guide.excerpt} <span className="text-emerald-600 hover:underline">Read more</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setSelectedGuide(null)} />
          <div className="bg-white w-full max-w-5xl h-fit max-h-[90vh] rounded-sm shadow-2xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-500">
            {/* Close Button Mobile */}
            <button 
              onClick={() => setSelectedGuide(null)} 
              className="absolute top-4 right-4 text-white md:text-black bg-black/20 md:bg-transparent p-2 rounded-full md:rounded-none z-30 hover:scale-110 transition-transform"
            >
              <X size={24} />
            </button>

            {/* Left: Image Side */}
            <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden shrink-0">
              <Image 
                src={selectedGuide.image} 
                alt={selectedGuide.title} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Right: Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar bg-white">
              <div className="max-w-md mx-auto">
                <p className="text-emerald-600 text-[10px] font-bold text-spaced mb-4 uppercase tracking-[0.4em]">
                  {selectedGuide.date || "Feature Guide"}
                </p>
                <h2 className="text-3xl md:text-4xl font-light font-serif mb-8 text-black leading-tight italic">
                  {selectedGuide.title}
                </h2>
                <div className="text-black/70 font-light leading-relaxed text-lg mb-12">
                  {selectedGuide.content}
                </div>
                
                <div className="pt-8 border-t border-platinum">
                  <button 
                    onClick={() => setSelectedGuide(null)}
                    className="px-10 py-4 bg-black text-white text-[11px] font-bold text-spaced uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl"
                  >
                    Close Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visitor Information Section */}
      <section className="py-32 bg-[#F9F9F9] border-t border-platinum">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative aspect-video lg:aspect-square group overflow-hidden shadow-2xl">
               <iframe
                 width="100%"
                 height="100%"
                 style={{ border: 0 }}
                 loading="lazy"
                 allowFullScreen
                 referrerPolicy="no-referrer-when-downgrade"
                 src={`https://www.google.com/maps?q=${encodeURIComponent("Hatton Garden London")}&output=embed`}
                 title="Map of Hatton Garden"
                 className="grayscale hover:grayscale-0 transition-all duration-700"
               ></iframe>
            </div>
            <div className="order-1 lg:order-2">
               <p className="text-black/40 text-[11px] text-spaced font-bold mb-6 uppercase tracking-widest text-emerald-600">PLAN YOUR VISIT</p>
               <h2 className="text-4xl md:text-5xl font-light mb-12 font-serif">Getting to <span className="italic">the Garden</span></h2>
               
               <div className="space-y-12">
                  <div>
                    <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.3em] mb-4">Location</h3>
                    <p className="text-2xl font-light text-black/80 leading-snug">
                      Located in the heart of London, within the Borough of Camden, close to Clerkenwell and Holborn.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-[10px] font-bold text-black/40 uppercase tracking-[0.3em] mb-4">Nearest Tube</h3>
                    <ul className="space-y-6">
                      <li className="flex items-center space-x-6">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold shadow-lg" title="Central Line">CL</div>
                        <span className="text-xl font-light">Chancery Lane (3 min walk)</span>
                      </li>
                      <li className="flex items-center space-x-6">
                        <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center text-white text-[10px] font-bold shadow-lg" title="Elizabeth Line">EL</div>
                        <span className="text-xl font-light">Farringdon (5 min walk)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-8 border-t border-platinum">
                    <p className="text-sm text-black/40 italic font-serif">
                      "Whether you are seeking a bespoke commission or exploring historic boutiques, 
                      Farringdon and Chancery Lane offer the swiftest access to our district."
                    </p>
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

export default AboutPage;
