import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowRight, Play, Pause, Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';

// 1. Native Custom Cursor Component
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current && dotRef.current) {
        // Smooth follow for outer circle
        cursorRef.current.style.transform = `translate3d(${e.clientX - 20}px, ${e.clientY - 20}px, 0)`;
        // Instant follow for inner dot
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || e.target.closest('a')) {
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
const MagneticButton = ({ children, className = '', variant = 'primary', onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
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
const useScrollReveal = (options = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(currentRef);
      }
    }, options);

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
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
        <button className="md:hidden text-[#0f2a4a] z-50 relative" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#0f2a4a] z-40 transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] flex flex-col justify-center items-center ${isOpen ? 'clip-path-full opacity-100 pointer-events-auto' : 'clip-path-zero opacity-0 pointer-events-none'}`}
           style={{ clipPath: isOpen ? 'circle(150% at 100% 0)' : 'circle(0% at 100% 0)' }}>
        <div className="flex flex-col items-center gap-8">
          {['Expertise', 'Collections', 'Process', 'Contact'].map((item, i) => (
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

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-white flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-5 relative z-10 flex flex-col justify-center order-2 lg:order-1">
          <div className={`flex items-center gap-4 mb-8 transition-all duration-1000 delay-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="w-12 h-[1px] bg-[#1e81b0]"></span>
            <span className="text-[#1e81b0] uppercase tracking-[0.3em] text-[10px] font-bold">Premium Interiors</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#0f2a4a] leading-[1.05] mb-8">
            <div className="overflow-hidden pb-2">
              <div className={`origin-left transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[600ms] ${loaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-[120%] opacity-0 rotate-3'}`}>Elevating</div>
            </div>
            <div className="overflow-hidden pb-2">
              <div className={`origin-left transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[750ms] ${loaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-[120%] opacity-0 rotate-3'}`}>Spaces with</div>
            </div>
            <div className="overflow-hidden pb-2">
              <div className={`origin-left font-medium text-[#1e81b0] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-[900ms] ${loaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-[120%] opacity-0 rotate-3'}`}>Precision.</div>
            </div>
          </h1>
          
          <p className={`text-lg text-slate-500 font-light max-w-md mb-12 leading-relaxed transition-all duration-1000 delay-[1100ms] transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            International standard bespoke window treatments engineered for the finest residences and commercial environments across the UAE.
          </p>
          
          <div className={`flex flex-wrap gap-6 transition-all duration-1000 delay-[1300ms] transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <MagneticButton variant="primary">
              Discover Our Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </div>

        {/* Right Image (Hero Showcase) */}
        <div className="lg:col-span-7 relative h-[60vh] lg:h-[85vh] w-full order-1 lg:order-2">
          <div className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-[1500ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${loaded ? 'clip-path-full scale-100' : 'clip-path-bottom scale-95'}`} style={{ clipPath: loaded ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}>
            <img 
              src="WhatsApp Image 2026-07-04 at 5.43.56 PM.jpeg" 
              alt="Luxury High Ceiling Curtains" 
              className={`w-full h-[120%] object-cover object-center transition-transform duration-[2500ms] ease-out ${loaded ? 'scale-100' : 'scale-125'}`}
              style={{ transform: `translate3d(0, ${scrollY * 0.15 - 50}px, 0) scale(${loaded ? 1 : 1.25})` }}
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2a4a]/40 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating Element */}
          <div className={`absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl hidden md:flex items-center gap-4 z-20 border border-slate-100 transition-all duration-1000 delay-[1600ms] transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-12 h-12 rounded-full bg-[#1e81b0]/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e81b0" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0f2a4a]">Master Craftsmanship</p>
              <p className="text-sm text-slate-500 font-light">International Quality</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const VideoShowcase = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
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
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  // Calculate width expansion based on scroll (max-w-5xl to full width)
  const expandedWidth = 100 + (scrollProgress * 20); // Just a visual scale
  const borderRadius = Math.max(0, 24 - (scrollProgress * 24));

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className={`max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">
          The Experience
        </h2>
        <h3 className="text-4xl md:text-5xl font-light text-[#0f2a4a] mb-6">
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
          <h2 className="text-4xl md:text-6xl font-light text-[#0f2a4a]">Our <span className="font-medium text-[#1e81b0]">Expertise</span></h2>
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
            <div className="text-[100px] md:text-[140px] font-bold text-[#1e81b0]/10 leading-none absolute -z-10 -ml-10 -mt-10 pointer-events-none select-none">01</div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">Residential Sancturaries</h4>
            <h3 className="text-3xl md:text-4xl font-light text-[#0f2a4a] mb-6">Master Bedrooms & Living</h3>
            <p className="text-slate-500 font-light leading-relaxed mb-8 text-lg">
              We craft perfect rest environments. Our premium blackout solutions, layered with elegant sheer drapes, offer ultimate light control and privacy, transforming intimate spaces into serene escapes.
            </p>
            <MagneticButton variant="secondary" className="!px-6 !py-3">View Residential</MagneticButton>
          </div>
        </div>

        {/* Commercial Block */}
        <div ref={ref2} className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className={`w-full md:w-1/2 order-2 md:order-1 text-left md:text-right flex flex-col items-start md:items-end relative transition-all duration-1000 delay-300 transform ${isVis2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="text-[100px] md:text-[140px] font-bold text-[#1e81b0]/10 leading-none absolute -z-10 md:-mr-10 -mt-10 right-0 md:right-auto pointer-events-none select-none">02</div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1e81b0] mb-4">Corporate & Hospitality</h4>
            <h3 className="text-3xl md:text-4xl font-light text-[#0f2a4a] mb-6">Executive Environments</h3>
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
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1e81b0] hover:border-[#1e81b0] transition-all"><Instagram size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1e81b0] hover:border-[#1e81b0] transition-all"><Linkedin size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#1e81b0] hover:border-[#1e81b0] transition-all"><Facebook size={16} /></a>
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

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#1e81b0] selection:text-white cursor-none overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <VideoShowcase />
        <Expertise />
      </main>
      <Footer />
    </div>
  );
}