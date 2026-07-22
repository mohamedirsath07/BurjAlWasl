export type Category = 'Luxury Villas' | 'Apartments' | 'Hotels' | 'Restaurants' | 'Corporate Offices' | 'Commercial Spaces';

export interface ProjectStats {
  duration: string;
  sqft: string;
  materialsUsed: number;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: Category;
  location: string;
  propertyType: string;
  serviceCategory: string;
  coverImage: string;
  heroImage: string;
  
  // Story
  clientChallenge: string;
  designStrategy: string;
  
  // Details
  materials: string[];
  installationSteps: { title: string; description: string }[];
  
  // Media
  beforeImage: string;
  afterImage: string;
  gallery: { src: string; caption: string }[];
  
  // Stats & Testimonial
  stats: ProjectStats;
  testimonial: { quote: string; author: string; role: string };
}

export const portfolioData: CaseStudy[] = [
  {
    id: "1",
    slug: "palm-jumeirah-villa",
    title: "Palm Jumeirah Signature Villa",
    category: "Luxury Villas",
    location: "Palm Jumeirah, Dubai",
    propertyType: "Signature Villa",
    serviceCategory: "Motorized Curtains & Blackouts",
    coverImage: "/home-hall-interiro.jpeg",
    heroImage: "/home-hall-interiro.jpeg",
    clientChallenge: "The client required complete light control for a massive double-height living room featuring floor-to-ceiling glass, without compromising the architectural aesthetics of the space or the panoramic ocean views.",
    designStrategy: "We engineered a concealed dual-track motorized system, embedding the mechanism within the ceiling recess. We layered a sheer, light-filtering fabric for daytime privacy with a heavy-weight blackout drape for climate control and evening intimacy.",
    materials: ["Somfy Sonesse Ultra 50 Motor", "Belgian Linen Sheer", "Acoustic Blackout Fabric"],
    installationSteps: [
      { title: "Structural Assessment", description: "Evaluating the load-bearing capacity of the double-height ceiling." },
      { title: "Track Integration", description: "Recessing the custom curved motorized tracks into the architectural cove." },
      { title: "Fabric Dressing", description: "Precision steaming and wave-fold dressing of the 6-meter drapes." },
      { title: "Smart Calibration", description: "Integrating the motors with the villa's Crestron home automation system." }
    ],
    beforeImage: "/room-interior.jpeg", // Using dummy for before
    afterImage: "/home-hall-interiro.jpeg", // Using dummy for after
    gallery: [
      { src: "/home-hall-interiro.jpeg", caption: "Double-height living space with sheer drapes." },
      { src: "/curtain-hotel.jpeg", caption: "Detail of the wave fold." },
      { src: "/room-interior.jpeg", caption: "Master bedroom blackout solution." },
      { src: "/automation-screen-img.jpeg", caption: "Automated controls seamlessly integrated." }
    ],
    stats: {
      duration: "4 Weeks",
      sqft: "12,000",
      materialsUsed: 450
    },
    testimonial: {
      quote: "Burj Al Wasl transformed our living space. The motorized drapes move in absolute silence and integrate perfectly with our smart home system. A flawless execution.",
      author: "H. Al Maktoum",
      role: "Villa Owner"
    }
  },
  {
    id: "2",
    slug: "difc-corporate-headquarters",
    title: "DIFC Corporate Headquarters",
    category: "Corporate Offices",
    location: "DIFC, Dubai",
    propertyType: "Executive Office",
    serviceCategory: "Intelligent Blinds",
    coverImage: "/automation-screen-img.jpeg",
    heroImage: "/automation-screen-img.jpeg",
    clientChallenge: "A leading investment firm needed automated glare control for their boardroom and executive offices to optimize screen visibility during presentations without losing natural light.",
    designStrategy: "Implemented a network of intelligent screen roller blinds tied to solar sensors. The blinds automatically adjust their height based on the sun's position, maintaining a cool environment and reducing HVAC loads.",
    materials: ["Sunworker Open Screen 5%", "Silent Gliss Motorized Rollers", "Aluminum Fascia"],
    installationSteps: [
      { title: "Solar Analysis", description: "Mapping sun exposure across the entire glass facade." },
      { title: "Hardware Mounting", description: "Installing silent roller systems within the mullion frames." },
      { title: "Sensor Integration", description: "Connecting rooftop lux sensors to the blind control network." }
    ],
    beforeImage: "/room-interior.jpeg",
    afterImage: "/automation-screen-img.jpeg",
    gallery: [
      { src: "/automation-screen-img.jpeg", caption: "Executive boardroom with lowered screen blinds." },
      { src: "/daytime-nightime-screen.jpeg", caption: "Dual layer functionality in private offices." }
    ],
    stats: {
      duration: "6 Weeks",
      sqft: "24,000",
      materialsUsed: 80
    },
    testimonial: {
      quote: "The automated system completely changed how we use our boardroom. The glare is gone, yet the office feels brighter and more spacious.",
      author: "Sarah J.",
      role: "Operations Director"
    }
  },
  {
    id: "3",
    slug: "downtown-penthouse",
    title: "Downtown Boulevard Penthouse",
    category: "Apartments",
    location: "Downtown Dubai",
    propertyType: "Luxury Penthouse",
    serviceCategory: "Custom Upholstery & Drapes",
    coverImage: "/curtain.jpeg",
    heroImage: "/curtain.jpeg",
    clientChallenge: "The interior required a cohesive fabric language. The client wanted custom upholstery for their imported Italian furniture to perfectly match the texture and color palette of the window treatments.",
    designStrategy: "We sourced premium European silks and velvets, designing a master palette. We crafted custom wave curtains and reupholstered key furniture pieces to create a unified, high-end visual language throughout the penthouse.",
    materials: ["Italian Silk Blend", "Crushed Velvet", "Brass Hardware"],
    installationSteps: [
      { title: "Fabric Sourcing", description: "Curating a bespoke collection of European textiles." },
      { title: "Tailoring", description: "Hand-stitching wave folds for perfect symmetry." },
      { title: "Upholstery", description: "Refinishing imported furniture with matching textiles." }
    ],
    beforeImage: "/room-interior.jpeg",
    afterImage: "/curtain.jpeg",
    gallery: [
      { src: "/curtain.jpeg", caption: "Custom wave drapes in the main living area." },
      { src: "/room-interior.jpeg", caption: "Matching upholstery in the master suite." }
    ],
    stats: {
      duration: "3 Weeks",
      sqft: "4,500",
      materialsUsed: 120
    },
    testimonial: {
      quote: "The attention to detail is staggering. The way the curtains perfectly complement the sofa upholstery makes the entire apartment feel like a curated art piece.",
      author: "Michael T.",
      role: "Penthouse Owner"
    }
  }
];

export const getCaseStudyBySlug = (slug: string) => {
  return portfolioData.find(project => project.slug === slug);
};
