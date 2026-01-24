"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react";

const BlogPostPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const blogPosts: Record<string, any> = {
    "hatton-garden-best-jewellers": {
      title: "Hatton Garden's Best Jewellers: Discover London's Top Jewellery Shops",
      image: "/jewellery-shops-in-hatton-garden-london.webp",
      date: "Jan 24, 2025",
      author: "Hatton Garden Staff",
      category: "Guides",
      content: (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-black mb-6">Why Hatton Garden Is London's Jewellery Hub</h2>
          <p>Hatton Garden has been the heart of London's jewellery trade for over a century. With more than 300 jewellery businesses and 55+ specialist shops, it's the UK's largest cluster of jewellery retailers. Whether you're looking for engagement rings, bespoke pieces, or investment diamonds, Hatton Garden offers unmatched expertise and competitive pricing.</p>

          <h3 className="text-2xl font-bold text-black mt-12 mb-4">Top 5 Best Jewellers in Hatton Garden</h3>
          <p className="mb-6">Here are five highly rated jewellers offering a mix of quality, service, and value:</p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-600 pl-6">
              <h4 className="text-xl font-bold mb-2">1. Prestige Diamonds</h4>
              <p className="text-black/60"><strong>Known for:</strong> GIA-certified loose diamonds and custom engagement rings</p>
              <p className="text-black/60"><strong>Why visit:</strong> Transparent pricing, private consultations, and excellent aftercare</p>
            </div>

            <div className="border-l-4 border-emerald-600 pl-6">
              <h4 className="text-xl font-bold mb-2">2. Daniel Christopher Jewellery</h4>
              <p className="text-black/60"><strong>Known for:</strong> Luxury bespoke engagement rings</p>
              <p className="text-black/60"><strong>Why visit:</strong> In-house manufacturing and a strong reputation for craftsmanship</p>
            </div>

            <div className="border-l-4 border-emerald-600 pl-6">
              <h4 className="text-xl font-bold mb-2">3. Queensmith</h4>
              <p className="text-black/60"><strong>Known for:</strong> Lab-grown and natural diamond rings</p>
              <p className="text-black/60"><strong>Why visit:</strong> Exceptional customer service and 3D ring design tech</p>
            </div>

            <div className="border-l-4 border-emerald-600 pl-6">
              <h4 className="text-xl font-bold mb-2">4. Smith Green Jewellers</h4>
              <p className="text-black/60"><strong>Known for:</strong> Affordable bespoke jewellery</p>
              <p className="text-black/60"><strong>Why visit:</strong> Ideal for budget-conscious buyers who want something unique</p>
            </div>

            <div className="border-l-4 border-emerald-600 pl-6">
              <h4 className="text-xl font-bold mb-2">5. Holts Gems</h4>
              <p className="text-black/60"><strong>Known for:</strong> Gemstone engagement rings and modern designs</p>
              <p className="text-black/60"><strong>Why visit:</strong> Award-winning designs and strong ethical sourcing</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-black mt-12 mb-4">How to Choose the Best Jeweller in Hatton Garden</h3>
          <p>When choosing a jeweller, consider the following:</p>
          <ul className="list-disc pl-6 space-y-2 text-black/70">
            <li><strong>GIA Certification:</strong> Always ask for GIA or equivalent certification for diamonds.</li>
            <li><strong>Bespoke Capabilities:</strong> Look for jewellers that offer in-house design and manufacturing.</li>
            <li><strong>Customer Reviews:</strong> Check Google and Trustpilot ratings before visiting.</li>
            <li><strong>Aftercare:</strong> Ensure they offer resizing, cleaning, and valuation services.</li>
          </ul>

          <h3 className="text-2xl font-bold text-black mt-12 mb-4">GIA-Certified Diamonds: What You Need to Know</h3>
          <p>Buying a diamond is an investment. The best Hatton Garden jewellers offer GIA-certified diamonds, which means your stone has been graded for cut, clarity, colour, and carat weight by the world's most trusted authority.</p>
          <p className="italic text-emerald-600 mt-4">Tip: Ask to see the certificate and ensure the diamond matches its grade.</p>

          <h3 className="text-2xl font-bold text-black mt-12 mb-4">Is Hatton Garden More Affordable Than the High Street?</h3>
          <p>Yes—because many of the shops are both wholesalers and retailers, you're often getting better prices than you would at branded high street jewellers. Plus, there's usually room for negotiation.</p>

          <h3 className="text-2xl font-bold text-black mt-12 mb-4">Final Thoughts: Why Hatton Garden Is Worth Visiting</h3>
          <p>If you're serious about buying quality jewellery—especially engagement rings or diamonds—then Hatton Garden is your best destination in London. With so many trusted jewellers, affordable options, and expert guidance, it's a shopping experience that combines tradition, trust, and value.</p>
        </div>
      )
    },
    "engagement-ring-trends-2025": {
      title: "Engagement Ring Trends 2025: What's Hot in Hatton Garden",
      image: "/buying-an-engagement-ring-in-hatton-harden.webp",
      date: "Jan 20, 2025",
      author: "Diamond Expert",
      category: "Trends",
      content: (
        <div className="space-y-8">
          <p className="text-xl text-black/70 leading-relaxed">Hatton Garden remains the ultimate destination for engagement rings in London, and 2025 is set to be a year of bold statements and personal touches. The biggest engagement ring trends for 2025 include dazzling 3 carat diamond rings, timeless solitaire settings, and a resurgence of vintage-inspired designs with a modern twist.</p>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">Top Engagement Ring Trends for 2025</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">The Rise of the 3 Carat Diamond Ring</h3>
              <p>Bold, statement-making 3 carat diamond rings are leading the way in 2025, offering luxury and photogenic brilliance for proposals in Hatton Garden.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Classic 1 Carat Solitaire and Minimalist Designs</h3>
              <p>Timeless solitaire settings, pavé bands, and minimalist details remain popular, especially with the growing demand for lab-grown diamonds and hidden halos.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Vintage Revival with a Modern Twist</h3>
              <p>Art Deco cuts, milgrain detailing, and ornate settings inspired by Edwardian and Victorian eras are making a comeback, especially in yellow gold.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Unique Stones: Black Diamonds and Colour Accents</h3>
              <p>Black diamond rings and coloured gemstones like sapphires and emeralds are trending for couples seeking individuality and symbolism.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">The Return of Gold Diamond Rings</h3>
              <p>Yellow, white, and rose gold bands are in demand, with mixed metal and textured gold rings adding character to classic designs.</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-4">Customisation and Personalisation</h3>
              <p>Engraved messages, birthstone accents, and bespoke layouts are now essential for couples wanting a unique engagement ring experience in Hatton Garden.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-black mt-12 mb-6">How to Choose Your Perfect Engagement Ring in Hatton Garden</h2>
          <ul className="list-disc pl-6 space-y-2 text-black/70">
            <li>Visit local Hatton Garden jewellers for bespoke consultations</li>
            <li>Compare lab-grown vs. natural diamonds for value and sustainability</li>
            <li>Explore vintage-inspired and custom designs to reflect your story</li>
            <li>Consider gold, platinum, and mixed metals for durability and style</li>
          </ul>

          <div className="bg-emerald-50 p-8 mt-12 border-l-4 border-emerald-600">
            <h3 className="text-2xl font-bold text-black mb-4">Why Shop Engagement Rings in Hatton Garden?</h3>
            <ul className="space-y-2 text-black/70">
              <li>✓ Largest selection of engagement rings in London</li>
              <li>✓ Expert jewellers for custom and vintage designs</li>
              <li>✓ Competitive pricing and ethical sourcing</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  const post = blogPosts[slug];

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar solid />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-emerald-600 hover:underline">← Back to Blog</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar solid />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-end overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 pb-12">
          <div className="flex items-center space-x-2 text-white/60 text-[10px] text-spaced mb-4">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
            <ChevronRight size={10} />
            <span className="text-white">ARTICLE</span>
          </div>
          <div className="inline-block bg-emerald-600 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-widest mb-4">
            {post.category}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-black transition-colors mb-12 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" />
            Back to Journal
          </Link>

          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-[11px] text-black/40 font-bold uppercase tracking-widest mb-12 pb-8 border-b border-platinum">
            <div className="flex items-center">
              <Calendar size={14} className="mr-2 text-emerald-600" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-2 text-emerald-600" />
              {post.author}
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-black/70 leading-relaxed">
            {post.content}
          </div>

          <div className="mt-16 pt-16 border-t border-platinum">
            <Link href="/blog" className="inline-flex items-center text-emerald-600 hover:text-black transition-colors text-sm font-bold uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2" />
              View All Articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPostPage;
