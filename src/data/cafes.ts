export interface Cafe {
  slug: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  rating: number;
  reviewsCount: number;
  openingTimes: string;
  image: string;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  longDescription: string;
}

export const cafes: Cafe[] = [
  {
    slug: "leather-lane-market",
    name: "Leather Lane Market",
    category: "Street Food Market",
    description: "Enjoy a diverse selection of street food from around the world, perfect for a quick lunch or casual bite.",
    phone: "N/A",
    email: "info@leatherlanemarket.com",
    website: "https://www.leatherlanemarket.co.uk/",
    address: "Leather Lane, London EC1N 7TE",
    rating: 4.8,
    reviewsCount: 3500,
    openingTimes: "Weekdays: 10:00 - 14:00",
    image: "/Cafes/leather-lane-street-market-hatton-garden.webp",
    socials: { 
      twitter: "https://twitter.com/leatherlanemkt",
      instagram: "https://www.instagram.com/leatherlanemarket/" 
    },
    longDescription: "Leather Lane Market is one of London's oldest and most vibrant food markets. Every weekday, it transforms into a global culinary hub where you can find everything from authentic Thai curries and Brazilian BBQ to artisanal falafel and gourmet burgers.",
  },
  {
    slug: "tongue-and-brisket",
    name: "Tongue & Brisket",
    category: "Jewish Deli",
    description: "Famous for their salt beef sandwiches and deli classics, located at the bottom of Leather Lane.",
    phone: "020 7242 3051",
    email: "info@tongueandbrisket.com",
    website: "https://www.tongueandbrisket.com/",
    address: "19 Leather Ln, London EC1N 7TE",
    rating: 4.6,
    reviewsCount: 350,
    openingTimes: "Mon-Fri: 08:30 - 16:30",
    image: "/Cafes/tongue&brisket.jpg",
    socials: { 
      facebook: "https://www.facebook.com/tongueandbrisket/",
      instagram: "https://www.instagram.com/tongueandbrisket/" 
    },
    longDescription: "Tongue & Brisket brings the classic London deli experience to Leather Lane, serving legendary salt beef, brisket, and chopped liver sandwiches sliced to order.",
  },
  {
    slug: "the-bleeding-heart-bistro",
    name: "The Bleeding Heart Bistro",
    category: "French Bistro",
    description: "Choose from a fine dining restaurant, a French bistro, or the laid-back Tavern—all offering delicious food and drinks in a unique setting.",
    phone: "020 7242 2056",
    email: "bistro@bleedingheart.com",
    website: "https://bleedingheart.co.uk/bistro/",
    address: "Bleeding Heart Yard, London EC1N 8SJ",
    rating: 4.6,
    reviewsCount: 450,
    openingTimes: "Mon-Fri: 12:00 - 22:30",
    image: "/Cafes/The Bleeding Heart Bistro.jpg",
    socials: { 
      facebook: "https://www.facebook.com/BleedingHeartRestaurant/",
      instagram: "https://www.instagram.com/bleedingheartgroup/" 
    },
    longDescription: "The Bleeding Heart Bistro is a quintessential French dining experience, offering a warm atmosphere and classic dishes in the historic Bleeding Heart Yard.",
  },
  {
    slug: "kin",
    name: "Kin",
    category: "Pan-Asian",
    description: "A favourite for authentic Thai and pan-Asian street food in a relaxed atmosphere.",
    phone: "020 7831 2244",
    email: "info@kin-restaurants.com",
    website: "https://kinlondon.com/",
    address: "88 Clerkenwell Rd, London EC1M 5RJ",
    rating: 4.5,
    reviewsCount: 580,
    openingTimes: "Mon-Fri: 11:30 - 22:30",
    image: "/Cafes/kin.jpg",
    socials: { 
      instagram: "https://www.instagram.com/kin_london/" 
    },
    longDescription: "Kin serves bold flavors from across Asia, from spicy laksa to fresh sushi, in a contemporary space that's perfect for both quick lunches and relaxed dinners.",
  },
  {
    slug: "the-craft-beer-co",
    name: "The Craft Beer Co.",
    category: "Pub / Craft Beer",
    description: "Craft beer lovers will appreciate the extensive selection of local and international brews, paired with classic pub fare.",
    phone: "020 7404 7054",
    email: "hatton.garden@thecraftbeerco.com",
    website: "https://www.thecraftbeerco.com/clerkenwell",
    address: "82 Hatton Garden, London EC1N 8PN",
    rating: 4.6,
    reviewsCount: 1200,
    openingTimes: "Mon-Sat: 12:00 - 23:00, Sun: 12:00 - 22:30",
    image: "/Cafes/The Craft Beer CO.jpg",
    socials: { 
      twitter: "https://twitter.com/thecraftbeerco", 
      facebook: "https://www.facebook.com/TheCraftBeerCo/",
      instagram: "https://www.instagram.com/thecraftbeerco/" 
    },
    longDescription: "The Craft Beer Co. in Hatton Garden is a destination for beer lovers, boasting an incredible array of cask ales, keg beers, and bottled selections from around the world.",
  },
  {
    slug: "the-one-tun",
    name: "The One Tun",
    category: "Pub",
    description: "A traditional pub with Thai-inspired cuisine, cocktails, and boutique hotel rooms above.",
    phone: "020 7405 1521",
    email: "info@theonetun.co.uk",
    website: "https://theonetun.com/",
    address: "54-55 Saffron Hill, London EC1N 8QL",
    rating: 4.4,
    reviewsCount: 156,
    openingTimes: "Mon-Sat: 11:00 - 23:00",
    image: "/Cafes/The One Tune pub.jpg",
    socials: { 
      facebook: "https://www.facebook.com/theonetun/",
      instagram: "https://www.instagram.com/theonetun/" 
    },
    longDescription: "The One Tun is a classic London pub providing a great spot for post-work drinks and casual dining in the Saffron Hill area.",
  },
  {
    slug: "prufrock-coffee",
    name: "Prufrock Coffee",
    category: "Café",
    description: "World-class specialty coffee and artisanal brunch on Leather Lane.",
    phone: "020 7242 0467",
    email: "info@prufrockcoffee.com",
    website: "https://www.prufrockcoffee.com/",
    address: "23-25 Leather Ln, London EC1N 7TE",
    rating: 4.7,
    reviewsCount: 1450,
    openingTimes: "Mon-Fri: 07:30-16:30, Sat-Sun: 08:00-17:00",
    image: "/Cafes/prufrock.jpg",
    socials: { 
      instagram: "https://www.instagram.com/prufrockcoffee/" 
    },
    longDescription: "Prufrock Coffee is a legendary destination for coffee enthusiasts, featuring beans from Square Mile Coffee Roasters and some of the best barista talent in London.",
  },
  {
    slug: "the-argyle",
    name: "The Argyle",
    category: "Pub",
    description: "Modern British pub with three floors and a fantastic roof terrace.",
    phone: "020 7405 0999",
    email: "info@theargyle-hatton-garden.co.uk",
    website: "https://www.pubsmiths.co.uk/pubs/the-argyle/",
    address: "1 Greville St, London EC1N 8PQ",
    rating: 4.3,
    reviewsCount: 890,
    openingTimes: "Mon-Fri: 11:00-23:00, Sat: 12:00-20:00",
    image: "/Cafes/the argyle.jpg",
    socials: { 
      facebook: "https://www.facebook.com/TheArgyleLondon/" 
    },
    longDescription: "The Argyle is a vibrant meeting spot in the heart of the district, offering a wide selection of gins, craft beers, and refined pub dining across its multi-level space.",
  },
  {
    slug: "ye-olde-mitre",
    name: "Ye Olde Mitre",
    category: "Historic Pub",
    description: "One of London's narrowest and most historic hidden gems, dating back to 1546.",
    phone: "020 7405 4751",
    email: "yeoldemitre@fullers.co.uk",
    website: "https://www.yeoldemitreholborn.co.uk/",
    address: "1 Ely Ct, Ely Pl, London EC1N 6SJ",
    rating: 4.8,
    reviewsCount: 2200,
    openingTimes: "Mon-Fri: 11:00-23:00",
    image: "/Cafes/ye olde mitre.jpg",
    socials: { 
      twitter: "https://twitter.com/yeoldemitre" 
    },
    longDescription: "Tucked away in a secret alleyway, Ye Olde Mitre is a piece of living history. Famous for its real ales and traditional toasties, it remains one of London's most cherished traditional pubs.",
  },
  {
    slug: "the-sir-christopher-hatton",
    name: "The Sir Christopher Hatton",
    category: "Pub",
    description: "Traditional British pub known for quality ales and classic pies.",
    phone: "020 7404 9436",
    email: "info@nicholsonspubs.co.uk",
    website: "https://www.nicholsonspubs.co.uk/thesirchristopherhatton",
    address: "4 Leather Ln, London EC1N 7RA",
    rating: 4.2,
    reviewsCount: 650,
    openingTimes: "Mon-Fri: 11:30-23:00, Sat: 12:00-18:00",
    image: "/Cafes/the sir christopher hatton.jpg",
    socials: { 
      facebook: "https://www.facebook.com/TheSirChristopherHatton/" 
    },
    longDescription: "Named after the district's original patron, this Nicholson's pub offers a warm, traditional atmosphere with an impressive selection of cask ales and a menu of hearty British classics.",
  },
  {
    slug: "bleeding-heart-wine-bar",
    name: "The Bleeding Heart Wine Bar",
    category: "Wine Bar",
    description: "Atmospheric underground wine bar with an exceptional global list.",
    phone: "020 7242 8238",
    email: "winebar@bleedingheart.com",
    website: "https://bleedingheart.co.uk/wine-bar/",
    address: "Bleeding Heart Yard, Greville St, London EC1N 8SJ",
    rating: 4.6,
    reviewsCount: 310,
    openingTimes: "Mon-Fri: 12:00-23:00",
    image: "/Cafes/The Bleeding Heart Wine Bar.jpg",
    socials: { 
      instagram: "https://www.instagram.com/bleedingheartgroup/" 
    },
    longDescription: "The Wine Bar at Bleeding Heart Yard offers over 350 bottles and a variety of rare vintages by the glass, served in a stunning historic setting with traditional French bar food.",
  },
  {
    slug: "the-bleeding-heart-restaurant",
    name: "The Bleeding Heart Restaurant",
    category: "Restaurant",
    description: "The flagship French restaurant offering award-winning fine dining.",
    phone: "020 7242 8238",
    email: "restaurant@bleedingheart.com",
    website: "https://bleedingheart.co.uk/",
    address: "Bleeding Heart Yard, London EC1N 8SJ",
    rating: 4.7,
    reviewsCount: 750,
    openingTimes: "Mon-Fri: 12:00-15:00, 18:00-22:00",
    image: "/Cafes/The Bleeding Heart Resturant.jpg",
    socials: { 
      facebook: "https://www.facebook.com/BleedingHeartRestaurant/" 
    },
    longDescription: "For over 35 years, the Bleeding Heart Restaurant has been a Hatton Garden institution, celebrated for its romantic ambiance and sophisticated French cuisine.",
  }
];
