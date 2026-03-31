/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  Hammer, 
  Layout, 
  Home, 
  Briefcase,
  Instagram,
  Facebook,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  Settings,
  Users,
  Edit3,
  Save,
  LogOut,
  Plus,
  Trash2,
  ShieldCheck,
  Bot
} from 'lucide-react';

import { ContainerScroll } from './components/ui/container-scroll-animation';
import { BackgroundPaths } from './components/ui/background-paths';

// --- Error Boundary ---

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Došlo je do neočekivane greške.";
      try {
        const parsedError = JSON.parse(this.state.error?.message || "");
        if (parsedError.error) {
          errorMessage = `Greška u bazi: ${parsedError.error}`;
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light p-6">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-red-100">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-4">Ups! Nešto nije u redu</h2>
            <p className="text-brand-muted mb-6">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-brand-dark text-white px-8 py-3 rounded-full font-bold hover:bg-brand-accent transition-all"
            >
              Pokušaj ponovo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- Types ---

interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'client';
  createdAt: any;
}

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  contactInfoText: string;
  galleryImages: string[];
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const DEFAULT_CONTENT: SiteContent = {
  heroTitle: "VAŠ DOM,\nNAŠA MJERA.",
  heroSubtitle: "Specijalizovani za proizvodnju namještaja po mjeri i kompletno opremanje enterijera. Od ideje do savršene realizacije.",
  aboutText: `Dizajn, izrada i opremanje enterijera.
Farbani medijapan, kantovani medijapan i univer.
CNC obrada.

HP Line d.o.o. iz Bijelog Polja je kompanija specijalizovana za proizvodnju namještaja po mjeri i kompletno opremanje enterijera. Osnovana 2018. godine od strane Hivza Hadžibegovića, firma je brzo postala sinonim za kvalitet i moderan dizajn.

Naš fokus je na korišćenju vrhunskih materijala poput medijapana, prirodnog drveta i stakla, uz primjenu najmodernijih tehnika izrade. Svaki komad namještaja koji izađe iz naše radionice je unikatan i prilagođen viziji klijenta.`,
  contactInfoText: `Interior Design Studio
📈 Dizajn i izrada enterijera
🇲🇪 Crna Gora, Montenegro`,
  galleryImages: [
    "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
  ],
  contactEmail: "hplinebp@gmail.com",
  contactPhone: "069/371-371, 069/172-806",
  contactAddress: "Crna Gora, Montenegro"
};

// --- Components ---

const HomePage = ({ content }: { content: SiteContent }) => (
  <>
    <Hero content={content} />
    
    <About content={content} />
    
    <Services />
    
    <Projects content={content} />
    
    <section className="section-padding bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Materijali</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">SAMO NAJBOLJE ZA VAS.</h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          {['Medijapan (MDF)', 'Iverica', 'Prirodno drvo', 'Staklo', 'Metal', 'Aluminijum', 'Laminat'].map((m, i) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.05, backgroundColor: '#E6A100', color: '#fff' }}
              className="px-8 py-4 bg-white rounded-full text-lg font-medium shadow-sm border border-brand-accent/10 transition-colors"
            >
              {m}
            </motion.span>
          ))}
        </div>
      </div>
    </section>

    <Contact content={content} />
  </>
);

const About = ({ content }: { content: SiteContent }) => (
  <section id="o-nama" className="bg-brand-light">
    <ContainerScroll
      titleComponent={
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">O Nama</h2>
          <h3 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.95]">TRADICIJA KVALITETA OD 2018.</h3>
        </div>
      }
    >
      <div className="relative h-full w-full">
        <img 
          src="/images/animacija.jpg" 
          alt="Tradicija kvaliteta" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-32 h-32 md:w-40 md:h-40 bg-brand-accent rounded-full flex items-center justify-center text-center p-4 rotate-12 shadow-lg z-20">
          <p className="text-white font-bold text-xs md:text-sm leading-tight uppercase tracking-tighter">Kvalitet bez kompromisa</p>
        </div>
      </div>
    </ContainerScroll>
    
    <div className="max-w-4xl mx-auto px-6 pb-24 -mt-20 relative z-30 text-center">
      <p className="text-lg md:text-xl text-brand-muted mb-10 leading-relaxed whitespace-pre-line">
        {content.aboutText}
      </p>
      <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
        <div>
          <p className="text-4xl font-bold mb-1 text-brand-accent">500+</p>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Realizovanih projekata</p>
        </div>
        <div>
          <p className="text-4xl font-bold mb-1 text-brand-accent">100%</p>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Zadovoljnih klijenata</p>
        </div>
      </div>
    </div>
  </section>
);

const AboutPage = ({ content }: { content: SiteContent }) => (
  <div className="pt-24 min-h-screen">
    <About content={content} />
  </div>
);

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-baseline font-bold tracking-tighter text-sm">
        <span className="text-brand-accent">hp</span>
        <span className="text-brand-gray">line</span>
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <div className="flex font-bold tracking-tighter text-xl">
        <span className="text-brand-accent">hp</span>
        <span className="text-brand-gray">line</span>
      </div>
      <div className="h-[1px] w-full bg-brand-gray/30 mt-0.5"></div>
    </div>
  </div>
);

import { Link, useLocation, Routes, Route } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Početna', href: '/' },
    { name: 'O nama', href: '/o-nama' },
    { name: 'Usluge', href: '/usluge' },
    { name: 'Projekti', href: '/projekti' },
    { name: 'Kontakt', href: '/kontakt' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={`text-sm font-medium hover:text-brand-accent transition-colors uppercase tracking-widest ${location.pathname === link.href ? 'text-brand-accent' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium border-b border-gray-100 pb-2 hover:text-brand-accent transition-colors ${location.pathname === link.href ? 'text-brand-accent' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ content }: { content: SiteContent }) => {
  return (
    <BackgroundPaths title={content.heroTitle} />
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    { 
      title: "Kuhinje po mjeri", 
      desc: "Funkcionalne i moderne kuhinje prilagođene vašem prostoru i potrebama.",
      icon: <Layout className="text-brand-accent" size={32} />,
      img: "/images/kuhinje/IMG_6255.jpg",
      fullDesc: "Naše kuhinje po mjeri predstavljaju savršen spoj funkcionalnosti i vrhunskog dizajna. Svaki element je pažljivo osmišljen kako bi maksimalno iskoristio prostor i pružio vam užitak u pripremi hrane. Koristimo najkvalitetnije materijale, od farbanog medijapana do univera, uz preciznu CNC obradu za besprijekorne detalje.",
      gallery: [
        { src: "/images/kuhinje/IMG_6254.jpg" },
        { src: "/images/kuhinje/IMG_6255.jpg" },
        { src: "/images/kuhinje/IMG_6258.jpg" },
        { src: "/images/kuhinje/IMG_6263_kuhinje_po_mjeri.jpg" },
        { src: "/images/kuhinje/IMG_6265_kuhinje_po_mjeri.jpg" },
        { src: "/images/kuhinje/IMG_6270.jpg" }
      ]
    },
    { 
      title: "Spavaće sobe", 
      desc: "Oaza mira dizajnirana za maksimalnu udobnost i optimalno korišćenje prostora.",
      icon: <Home className="text-brand-accent" size={32} />,
      img: "/images/spavace_sobe/IMG_6262_spavace_sobe.jpg",
      fullDesc: "Pretvorite svoju spavaću sobu u pravu oazu mira. Naši ugradni plakari, kreveti i noćni ormarići dizajnirani su da pruže maksimalnu udobnost i optimalno iskoriste svaki centimetar prostora. Nudimo širok izbor dekora i materijala koji će se savršeno uklopiti u vaš stil.",
      gallery: [
        { src: "/images/spavace_sobe/IMG_6262_spavace_sobe.jpg" },
        { src: "/images/spavace_sobe/IMG_6268_spavace_sobe.jpg" },
        { src: "/images/spavace_sobe/IMG_6269_spavace_sobe.jpg" },
        { src: "/images/spavace_sobe/IMG_6276.jpg" },
        { src: "/images/spavace_sobe/IMG_6277.jpg" }
      ]
    },
    { 
      title: "Dnevne sobe", 
      desc: "Centralni dio vašeg doma koji odiše stilom i toplinom prirodnih materijala.",
      icon: <Layout className="text-brand-accent" size={32} />,
      img: "/images/dnevne_sobe/IMG_6261_dnevne_sobe.jpg",
      fullDesc: "Dnevna soba je srce svakog doma. Naše TV komode, klub stolovi i zidne obloge od medijapana i drveta unose toplinu i eleganciju u vaš prostor. Dizajniramo namještaj koji je istovremeno estetski privlačan i praktičan za svakodnevni život.",
      gallery: [
        { src: "/images/dnevne_sobe/IMG_6261_dnevne_sobe.jpg" },
        { src: "/images/dnevne_sobe/IMG_6264_dnevne_sobe.jpg" }
      ]
    },
    { 
      title: "Kancelarijski namještaj", 
      desc: "Profesionalna rješenja za produktivno i inspirativno radno okruženje.",
      icon: <Briefcase className="text-brand-accent" size={32} />,
      img: "/images/kancelarijski_namjestaj/IMG_6260_kancelarijski_namjestaj.jpg",
      fullDesc: "Opremite svoj radni prostor namještajem koji inspiriše produktivnost. Izrađujemo ergonomske radne stolove, prostrane police i ormare za dokumentaciju koji će vašu kancelariju učiniti funkcionalnom i profesionalnom. Kvalitetni materijali garantuju dugotrajnost i otpornost na habanje.",
      gallery: [
        { src: "/images/kancelarijski_namjestaj/IMG_6260_kancelarijski_namjestaj.jpg" },
        { src: "/images/kancelarijski_namjestaj/IMG_6267_kancelarijski_namjestaj.jpg" }
      ]
    },
  ];

  return (
    <section id="usluge" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Naše Usluge</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">SVE ŠTO VAŠ <br />ENTERIJER TREBA.</h3>
          </div>
          <p className="max-w-md text-brand-muted text-lg">
            Od dizajna do montaže, pružamo kompletnu uslugu opremanja vašeg stambenog ili poslovnog prostora.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedService(s)}
              className="group bg-brand-light rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl border border-transparent hover:border-brand-accent/20 cursor-pointer flex flex-col h-full"
            >
              <div className="mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-colors">
                {s.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{s.title}</h4>
              <p className="text-brand-muted mb-6 leading-relaxed flex-grow">{s.desc}</p>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 mt-auto">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="mt-6 flex items-center text-brand-accent font-semibold group-hover:translate-x-2 transition-transform">
                <span>Pogledaj radove</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl my-auto"
            >
              <div className="p-6 md:p-10 border-b border-gray-100 flex justify-between items-start sticky top-0 bg-white/90 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{selectedService.title}</h3>
                  <p className="text-brand-muted text-lg max-w-3xl leading-relaxed">{selectedService.fullDesc}</p>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-colors shrink-0 ml-4"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-10 bg-brand-light">
                <h4 className="text-xl font-bold mb-8 flex items-center">
                  <span className="w-8 h-1 bg-brand-accent mr-4"></span>
                  Galerija radova
                </h4>
                <div className="grid md:grid-cols-2 gap-8">
                  {selectedService.gallery.map((img: any, idx: number) => (
                    <div key={idx} className="group">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-white shadow-sm">
                        <img 
                          src={img.src} 
                          alt={selectedService.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Projects = ({ content }: { content: SiteContent }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const imageItems = [
    { type: 'image', src: "/images/kuhinje/IMG_6254.jpg" },
    { type: 'image', src: "/images/kuhinje/IMG_6255.jpg" },
    { type: 'image', src: "/images/kuhinje/IMG_6258.jpg" },
    { type: 'image', src: "/images/kuhinje/IMG_6263_kuhinje_po_mjeri.jpg" },
    { type: 'image', src: "/images/kuhinje/IMG_6265_kuhinje_po_mjeri.jpg" },
    { type: 'image', src: "/images/kuhinje/IMG_6270.jpg" },
    { type: 'image', src: "/images/spavace_sobe/IMG_6262_spavace_sobe.jpg" },
    { type: 'image', src: "/images/spavace_sobe/IMG_6268_spavace_sobe.jpg" },
    { type: 'image', src: "/images/spavace_sobe/IMG_6269_spavace_sobe.jpg" },
    { type: 'image', src: "/images/spavace_sobe/IMG_6276.jpg" },
    { type: 'image', src: "/images/spavace_sobe/IMG_6277.jpg" },
    { type: 'image', src: "/images/dnevne_sobe/IMG_6261_dnevne_sobe.jpg" },
    { type: 'image', src: "/images/dnevne_sobe/IMG_6264_dnevne_sobe.jpg" },
    { type: 'image', src: "/images/kancelarijski_namjestaj/IMG_6260_kancelarijski_namjestaj.jpg" },
    { type: 'image', src: "/images/kancelarijski_namjestaj/IMG_6267_kancelarijski_namjestaj.jpg" },
  ];

  const videoItems = [
    { type: 'video', src: "/images/IMG_6256.mp4" },
    { type: 'video', src: "/images/IMG_6257.mp4" },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoItems.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videoItems.length) % videoItems.length);
  };

  return (
    <section id="projekti" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">Portfolio</h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">NAŠI POSLJEDNJI RADOVI.</h3>
        </div>
      </div>

      <div className="flex flex-col gap-16">
        {/* Prvi red: Slike */}
        <div className="relative w-full flex overflow-x-hidden">
          <motion.div
            className="flex gap-8 px-4"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {[...imageItems, ...imageItems].map((item, i) => (
              <div 
                key={`img-${i}`}
                className="relative w-[300px] md:w-[400px] lg:w-[500px] aspect-[4/3] rounded-[2rem] overflow-hidden shrink-0 group"
              >
                <img 
                  src={item.src} 
                  alt={`Portfolio slika ${i + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                    <ArrowUpRight className="text-white" size={24} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Drugi red: Snimci (Carousel) */}
        <div className="relative w-full max-w-5xl mx-auto px-4">
          <div className="relative aspect-[4/3] md:aspect-video rounded-[2rem] overflow-hidden group bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.video
                key={currentVideoIndex}
                src={videoItems[currentVideoIndex].src}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-between p-4 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={prevVideo}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-brand-accent transition-colors backdrop-blur-md"
                aria-label="Prethodni snimak"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextVideo}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-brand-accent transition-colors backdrop-blur-md"
                aria-label="Sljedeći snimak"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            {videoItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentVideoIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentVideoIndex 
                    ? 'bg-brand-accent w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Idi na snimak ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ content }: { content: SiteContent }) => {
  return (
    <section id="kontakt" className="section-padding bg-brand-dark text-white rounded-[3rem] mx-4 md:mx-8 my-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-accent mb-6">Kontakt</h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">ZAPOČNIMO <br />PROJEKAT.</h3>
          
          <div className="mb-12 text-brand-muted whitespace-pre-line text-lg leading-relaxed">
            {content.contactInfoText}
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-brand-accent/40 flex items-center justify-center shrink-0">
                <MapPin className="text-brand-accent" size={20} />
              </div>
              <div>
                <p className="text-sm text-brand-muted uppercase tracking-widest mb-1">Adresa</p>
                <p className="text-xl font-medium">{content.contactAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-brand-accent/40 flex items-center justify-center shrink-0">
                <Phone className="text-brand-accent" size={20} />
              </div>
              <div>
                <p className="text-sm text-brand-muted uppercase tracking-widest mb-1">Telefon</p>
                <p className="text-xl font-medium">{content.contactPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full border border-brand-accent/40 flex items-center justify-center shrink-0">
                <Mail className="text-brand-accent" size={20} />
              </div>
              <div>
                <p className="text-sm text-brand-muted uppercase tracking-widest mb-1">Email</p>
                <p className="text-xl font-medium">{content.contactEmail}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm border border-white/10">
          <form action="https://formsubmit.co/hplinebp@gmail.com" method="POST" className="space-y-6">
            <input type="hidden" name="_subject" value="Novi upit sa sajta HP Line" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Ime i prezime</label>
                <input type="text" name="name" required className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand-accent outline-none transition-colors" placeholder="Vaše ime" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Email</label>
                <input type="email" name="email" required className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand-accent outline-none transition-colors" placeholder="Vaš email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Usluga</label>
              <select name="service" className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand-accent outline-none transition-colors appearance-none">
                <option className="bg-brand-dark">Kuhinja po mjeri</option>
                <option className="bg-brand-dark">Opremanje stana</option>
                <option className="bg-brand-dark">Kancelarijski namještaj</option>
                <option className="bg-brand-dark">Dizajn enterijera</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-muted">Poruka</label>
              <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand-accent outline-none transition-colors resize-none" placeholder="Opišite vaš projekat"></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-accent text-white py-5 rounded-full font-bold hover:bg-white hover:text-brand-dark transition-all flex items-center justify-center gap-2">
              Pošaljite upit <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="section-padding pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-brand-muted max-w-sm mb-8">
              Specijalizovana kompanija za proizvodnju namještaja po mjeri i kompletno opremanje enterijera širom Crne Gore.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/hp.line_enterijeri?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/share/1CeykwiqdL/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center hover:bg-brand-accent hover:text-white transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm">Navigacija</h4>
            <ul className="space-y-4 text-brand-muted">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Početna</a></li>
              <li><a href="#o-nama" className="hover:text-brand-accent transition-colors">O nama</a></li>
              <li><a href="#usluge" className="hover:text-brand-accent transition-colors">Usluge</a></li>
              <li><a href="#projekti" className="hover:text-brand-accent transition-colors">Projekti</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-brand-dark">Legalno</h4>
            <ul className="space-y-4 text-brand-muted">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Politika privatnosti</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Uslovi korišćenja</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Impressum</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-dark/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-brand-muted">© 2026 HP Line d.o.o. Sva prava zadržana.</p>
          <div className="text-[12vw] font-bold tracking-tighter text-brand-accent/5 leading-none select-none pointer-events-none">
            HP LINE
          </div>
        </div>
      </div>
    </footer>
  );
};


export default function App() {
  const content = DEFAULT_CONTENT;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-brand-light flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage content={content} />} />
            <Route path="/o-nama" element={<AboutPage content={content} />} />
            <Route path="/usluge" element={<div className="pt-24"><Services /></div>} />
            <Route path="/projekti" element={<div className="pt-24"><Projects content={content} /></div>} />
            <Route path="/kontakt" element={<div className="pt-24"><Contact content={content} /></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
