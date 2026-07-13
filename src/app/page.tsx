'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Play, Pause, Phone, Mail, MapPin, Instagram, Linkedin, Facebook, Eye } from 'lucide-react';

// 1. Native Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        // Smooth follow for outer circle
        cursorRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
        // Instant follow for inner dot
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-10 h-10 border rounded-full pointer-events-none z-[100] hidden lg:block transition-all duration-300 ease-out will-change-transform ${isHovering ? 'scale-[2.5] bg-[#1e81b0]/10 border-[#1e81b0]/50' : 'scale-100 bg-transparent border-[#0f2a4a]/30'}`} 
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#1e81b0] rounded-full pointer-events-none z-[100] hidden lg:block will-change-transform" 
      />
    </>
  );
};

// 2. Native Magnetic Button
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const MagneticButton = ({ children, className = '', variant = 'primary', onClick }: MagneticButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-[#0f2a4a] text-white hover:bg-[#1e81b0]",
    secondary: "bg-white text-[#0f2a4a] border border-[#0f2a4a]/20 hover:border-[#1e81b0] hover:text-[#1e81b0]"
  };

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative px-8 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-colors duration-500 overflow-hidden ${variants[variant]} ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
      }}
    >
      <span 
        className="relative z-10 flex items-center justify-center gap-2"
        style={{
          transform: `translate3d(${position.x * 0.3}px, ${position.y * 0.3}px, 0)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
        }}
      >
        {children}
      </span>
    </button>
  );
};

// 3. Scroll Reveal Hook
interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

const useScrollReveal = (options: ScrollRevealOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(currentRef);
      }
    }, options);

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Initial reveal
    setTimeout(() => setNavVisible(true), 100);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-out transform ${navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} ${scrolled ? 'bg-white/95 backdrop-blur-xl py-3 shadow-sm border-b border-[#0f2a4a]/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center cursor-pointer relative z-50 group">
          <img 
            src="Burj_LOGO_2026-removebg-preview.png" 
            alt="Burj Al Wasl" 
            className={`transition-all duration-700 ${scrolled ? 'h-10' : 'h-14'} group-hover:scale-105`} 
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['Expertise', 'Collections', 'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0f2a4a] hover:text-[#1e81b0] transition-colors relative group overflow-hidden"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#1e81b0] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </a>
          ))}
          <MagneticButton className="ml-4 px-6 py-3">Book Consultation</MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#0f2a4a] z-50 relative" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0f2a4a] z-40 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] flex flex-col justify-center items-center ${isOpen ? 'clip-path-full opacity-100 pointer-events-auto' : 'clip-path-zero opacity-0 pointer-events-none'}`}
           style={{ clipPath: isOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}>
        <div className="flex flex-col items-center gap-8">
          {['Expertise', 'Collections', 'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-3xl font-light text-white uppercase tracking-widest hover:text-[#1e81b0] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

import { Hero } from '@/components/organisms/Hero';

const VideoShowcase = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Calculate progress from 0 to 1 as element moves through viewport
        let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        progress = Math.min(Math.max(progress, 0), 1);
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className={`max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">
          The Experience
        </h2>
        <h3 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a] mb-6">
          Light, Controlled.
        </h3>
        <p className="text-slate-500 font-light max-w-2xl mx-auto">
          Watch our seamless motorized tracks and premium sheer fabrics transform environments. Smooth, silent, and beautifully orchestrated.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <div 
          className="relative h-[50vh] md:h-[70vh] overflow-hidden shadow-2xl group transition-all duration-700 ease-out w-full"
          style={{ 
            maxWidth: scrollProgress > 0.5 ? '100%' : '1024px', 
            borderRadius: `${scrollProgress > 0.5 ? 0 : 24}px`,
            padding: scrollProgress > 0.5 ? '0' : '0 1rem'
          }}
        >
          <div className="w-full h-full relative rounded-[inherit] overflow-hidden">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
            >
              <source src="WhatsApp Video 2026-07-04 at 5.43.52 PM.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-[#0f2a4a]/20 transition-opacity duration-500 group-hover:opacity-0"></div>
            
            <button 
              onClick={toggleVideo}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 hover:bg-white hover:text-[#0f2a4a] transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              aria-label={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-8 h-8" strokeWidth={1} /> : <Play className="w-8 h-8 pl-2" strokeWidth={1} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const [ref1, isVis1] = useScrollReveal({ threshold: 0.3 });
  const [ref2, isVis2] = useScrollReveal({ threshold: 0.3 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="expertise" className="py-32 bg-[#f8f9fa] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="mb-24 text-center md:text-left">
          <h2 className="font-heading text-4xl md:text-6xl font-light text-[#0f2a4a]">Our <span className="font-medium text-[#1e81b0]">Expertise</span></h2>
        </div>

        {/* Residential Block */}
        <div ref={ref1} className="flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-32">
          <div className={`w-full md:w-1/2 relative h-[60vh] overflow-hidden rounded-2xl shadow-xl order-1 md:order-1 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVis1 ? 'clip-path-full scale-100 opacity-100' : 'clip-path-inset scale-95 opacity-0'}`} style={{ clipPath: isVis1 ? 'inset(0% 0% 0% 0%)' : 'inset(10% 10% 10% 10%)' }}>
            <img 
              src="WhatsApp Image 2026-07-04 at 5.43.51 PM.jpeg" 
              alt="Residential Elegance Bedroom" 
              className="absolute top-0 left-0 w-full h-[120%] object-cover transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(0, ${(scrollY * -0.05) + 50}px, 0)` }}
            />
          </div>
          
          <div className={`w-full md:w-1/2 order-2 md:order-2 relative transition-all duration-1000 delay-300 transform ${isVis1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="font-heading text-[100px] md:text-[140px] font-bold text-[#1e81b0]/10 leading-none absolute -z-10 -ml-10 -mt-10 pointer-events-none select-none">01</div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">Residential Sancturaries</h4>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-6">Master Bedrooms & Living</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-8 text-lg">
              We craft perfect rest environments. Our premium blackout solutions, layered with elegant sheer drapes, offer ultimate light control and privacy, transforming intimate spaces into serene escapes.
            </p>
            <MagneticButton variant="secondary" className="!px-6 !py-3">View Residential</MagneticButton>
          </div>
        </div>

        {/* Commercial Block */}
        <div ref={ref2} className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className={`w-full md:w-1/2 order-2 md:order-1 text-left md:text-right flex flex-col items-start md:items-end relative transition-all duration-1000 delay-300 transform ${isVis2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="font-heading text-[100px] md:text-[140px] font-bold text-[#1e81b0]/10 leading-none absolute -z-10 md:-mr-10 -mt-10 right-0 md:right-auto pointer-events-none select-none">02</div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">Corporate & Hospitality</h4>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-[#0f2a4a] mb-6">Executive Environments</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-8 text-lg md:text-right">
              Elevating boardrooms and commercial spaces with sophisticated, fire-retardant sheer tracks. We provide professional aesthetics that inspire productivity while effectively managing glare and temperature.
            </p>
            <MagneticButton variant="secondary" className="!px-6 !py-3">View Commercial</MagneticButton>
          </div>

          <div className={`w-full md:w-1/2 relative h-[60vh] overflow-hidden rounded-2xl shadow-xl order-1 md:order-2 transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVis2 ? 'clip-path-full scale-100 opacity-100' : 'clip-path-inset scale-95 opacity-0'}`} style={{ clipPath: isVis2 ? 'inset(0% 0% 0% 0%)' : 'inset(10% 10% 10% 10%)' }}>
            <img 
              src="WhatsApp Image 2026-07-04 at 5.43.39 PM.jpeg" 
              alt="Corporate Excellence" 
              className="absolute top-0 left-0 w-full h-[120%] object-cover transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(0, ${(scrollY * -0.05) + 150}px, 0)` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

// 4. Custom Showcase/Collections Gallery Section using copied profile-pics
const Collections = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'curtains' | 'motorized' | 'interiors'>('all');

  const galleryItems = [
    {
      title: "Luxury Villa Living",
      category: "interiors",
      img: "home-hall-interiro.jpeg",
      desc: "Bespoke high ceiling drape integration"
    },
    {
      title: "Hospitality Suite",
      category: "curtains",
      img: "curtain-hotel.jpeg",
      desc: "Flame-retardant luxury hotel sheer system"
    },
    {
      title: "Dual Layer Control",
      category: "motorized",
      img: "daytime-nightime-screen.jpeg",
      desc: "Smart sheer & blackout motorization"
    },
    {
      title: "Master Bedroom Sancturary",
      category: "interiors",
      img: "room-interior.jpeg",
      desc: "Integrated light-blocking drapes"
    },
    {
      title: "Modern Wave Curtains",
      category: "curtains",
      img: "curtain.jpeg",
      desc: "Elegant custom fold drapery"
    },
    {
      title: "Intelligent Automation screen",
      category: "motorized",
      img: "automation-screen-img.jpeg",
      desc: "Silent motor controls & schedules"
    }
  ];

  const filteredItems = selectedFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedFilter);

  return (
    <section id="collections" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className={`mb-16 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">Our Gallery</h2>
          <h3 className="font-heading text-4xl md:text-5xl font-light text-[#0f2a4a] mb-6">Bespoke Collections</h3>
          <p className="text-slate-500 font-light max-w-2xl mx-auto">
            Explore our curated projects, fabrics, and intelligent systems, manufactured to international standards.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {(['all', 'curtains', 'motorized', 'interiors'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 ${selectedFilter === filter ? 'bg-[#0f2a4a] text-white shadow-md' : 'bg-[#f8f9fa] text-[#0f2a4a] hover:bg-slate-200'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Dynamic Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, i) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm border border-slate-100 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${200 + (i * 100)}ms` }}
            >
              {/* Image Container with Zoom effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0f2a4a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Eye size={20} />
                  </div>
                </div>
              </div>

              {/* Text Description Container */}
              <div className="p-6 bg-white">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1e81b0]">{item.category}</span>
                <h4 className="text-base font-semibold text-[#0f2a4a] mt-1 group-hover:text-[#1e81b0] transition-colors">{item.title}</h4>
                <p className="text-xs text-slate-500 font-light mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#0f2a4a] text-white pt-24 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0f2a4a] via-[#1e81b0] to-[#0f2a4a]"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 relative z-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-1">
            <div className="bg-white p-4 inline-block mb-8 rounded-lg shadow-lg">
              <img src="Burj_LOGO_2026-removebg-preview.png" alt="Burj Al Wasl" className="h-12 w-auto" />
            </div>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
              International standard window treatments, crafted for the most discerning clients across the UAE.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1e81b0] hover:border-[#1e81b0] transition-all" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1e81b0] hover:border-[#1e81b0] transition-all" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1e81b0] hover:border-[#1e81b0] transition-all" aria-label="Facebook"><Facebook size={16} /></a>
            </div>
        </div>

        {/* Location */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e81b0] mb-8">Headquarters</h4>
          <ul className="space-y-6 font-light text-slate-300 text-sm">
            <li className="flex items-start group">
              <MapPin className="w-5 h-5 mr-4 text-[#1e81b0] mt-0.5" strokeWidth={1.5} />
              <span>Burj Al Wasl Trading L.L.C<br/>Business Bay, Dubai<br/>United Arab Emirates</span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e81b0] mb-8">Direct Contact</h4>
          <ul className="space-y-6 font-light text-slate-300 text-sm">
            <li>
              <a href="tel:+971501234567" className="flex items-center hover:text-white transition-colors">
                <Phone className="w-5 h-5 mr-4 text-[#1e81b0]" strokeWidth={1.5} />
                +971 50 123 4567
              </a>
            </li>
            <li>
              <a href="mailto:info@burjdubaicurtains.ae" className="flex items-center hover:text-white transition-colors">
                <Mail className="w-5 h-5 mr-4 text-[#1e81b0]" strokeWidth={1.5} />
                info@burjdubaicurtains.ae
              </a>
            </li>
          </ul>
        </div>

        {/* Action */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1e81b0] mb-8">Start a Project</h4>
          <p className="text-slate-300 text-sm font-light mb-6 leading-relaxed">Schedule a private consultation with our interior specialists.</p>
          <MagneticButton variant="secondary" className="w-full !bg-transparent text-white border-white/30 hover:!bg-white hover:text-[#0f2a4a]">
            Book Consultation
          </MagneticButton>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
        <p>© 2026 Burj Al Wasl L.L.C. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#1e81b0] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#1e81b0] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#1e81b0] selection:text-white lg:cursor-none overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <Expertise />
        <Collections />
      </main>
      <Footer />
    </div>
  );
}
