"use client";
import { useState, useRef } from "react";
import { ExternalLink, Github, Briefcase, Plane, ShoppingCart, Globe, BarChart2 } from "lucide-react";

const categoryMeta = {
  "Full Stack":      { gradient: "from-violet-600 via-purple-500 to-indigo-600",  glow: "#7c3aed", icon: Globe },
  "E-commerce":      { gradient: "from-rose-500 via-pink-500 to-orange-500",       glow: "#f43f5e", icon: ShoppingCart },
  "Productivity":    { gradient: "from-emerald-500 via-teal-500 to-cyan-500",      glow: "#10b981", icon: BarChart2 },
  "B2B Marketing":   { gradient: "from-amber-500 via-orange-500 to-yellow-500",    glow: "#f59e0b", icon: BarChart2 },
  "Job Consultancy": { gradient: "from-sky-500 via-blue-600 to-indigo-500",        glow: "#0ea5e9", icon: Briefcase },
  "Travel Tech":     { gradient: "from-fuchsia-500 via-purple-600 to-blue-600",    glow: "#d946ef", icon: Plane },
};

const projects = [
  {
    title: "ReservationKart.com",
    description: "A comprehensive full-stack airline booking system with advanced filtering and state management capabilities.",
    technologies: ["Next.js", "MongoDB", "TailwindCSS", "API Routes"],
    features: ["Full-stack booking system", "Dynamic routes & server-side API", "Advanced booking filters", "Responsive UX design"],
    githubUrl: "https://github.com/AINSoftwareSolution/airline-site.git",
    liveUrl: "http://reservationkart.com/",
    category: "Full Stack",
  },
  {
    title: "Vehicle Motors Buy & Sell",
    description: "A scalable vehicle marketplace platform with cloud infrastructure and SEO optimization.",
    technologies: ["Next.js", "AWS S3", "AWS EC2", "SSR"],
    features: ["Secure media on AWS S3", "Deployed on AWS EC2", "Server-side rendering for SEO", "Optimised loading speeds"],
    githubUrl: "https://github.com/AINSoftwareSolution/motors.git",
    liveUrl: "https://motors-mocha.vercel.app/",
    category: "E-commerce",
  },
  {
    title: "EarthconnTravels.com",
    description: "A modern travel portal with real-time collaboration features and intuitive design for seamless travel planning.",
    technologies: ["Next.js", "TailwindCSS", "MongoDB", "TypeScript", "Aceternity UI"],
    features: ["Product Development", "Digital Modernization", "Technology Consulting", "Advanced analytics"],
    githubUrl: "https://github.com/ainsoftware690/ain_software.git",
    liveUrl: "https://www.earthconntravels.com/",
    category: "Productivity",
  },
  {
    title: "DigitalMarketMart.com",
    description: "Your go-to online store for books, eBooks, healthcare items, and stylish clothing. Easy, affordable, quality-assured.",
    technologies: ["JavaScript", "Bootstrap", "MySQL", "PHP", "Hostinger"],
    features: ["Wide Product Range", "User-Friendly Interface", "Affordable Prices", "Quality Assurance"],
    githubUrl: "#",
    liveUrl: "https://digitalmarketmart.com/",
    category: "E-commerce",
  },
  {
    title: "Quantisys",
    description: "Cutting-edge B2B solutions empowering travel & tourism businesses in a dynamic, innovation-driven marketplace.",
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "Vercel", "GitHub"],
    features: ["Cutting-edge B2B Solutions", "Empowering Travel Businesses", "Modern Travel Technology", "Industry Growth"],
    githubUrl: "https://github.com/AINSoftwareSolution/quantisys-app.git",
    liveUrl: "https://quantisys-app.vercel.app/",
    category: "B2B Marketing",
  },
  {
    title: "ShadowRecruiter.com",
    description: "An intelligent job consultancy platform connecting top talent with leading companies via smart matching algorithms.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "TailwindCSS", "Prisma"],
    features: ["AI-powered talent matching", "Recruiter & candidate dashboards", "Smart job recommendations", "Real-time application tracking"],
    githubUrl: "#",
    liveUrl: "https://shadowrecruiter.com/",
    category: "Job Consultancy",
  },
  {
    title: "Travelocare.com",
    description: "Next-gen flight ticket booking app with real-time fare tracking, multi-city search, and personalized travel care.",
    technologies: ["Next.js", "React", "TailwindCSS", "Amadeus API", "Vercel"],
    features: ["Real-time flight search & booking", "Multi-city & round-trip planning", "Live fare alerts", "Personalised travel picks"],
    githubUrl: "#",
    liveUrl: "https://travelocare.com/",
    category: "Travel Tech",
  },
  {
  title: "ShopEase",
  description: "Next-gen e-commerce marketplace with multi-category shopping, advanced filters, wishlist management, and a seamless multi-gateway checkout experience.",
  technologies: ["Next.js", "React", "TailwindCSS", "Vercel"],
  features: ["Multi-category product catalog", "Advanced price & rating filters", "Cart & wishlist management", "Multi-gateway secure payments"],
  githubUrl: "https://github.com/Shahid7424/ecommerce-app.git",
  liveUrl: "https://ecommerce-app-zeta-ashen.vercel.app/",
  category: "E-Commerce",
},
];

/* ── All CSS scoped with "pj-" prefix (pj = projects) ── */
const PROJECTS_STYLES = `
  @keyframes pj-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .pj-track {
    display: flex;
    gap: 24px;
    width: max-content;
    animation: pj-marquee 42s linear infinite;
  }
  .pj-track:hover { animation-play-state: paused; }
  .pj-wrapper {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }
  .pj-shimmer-sweep {
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
    animation: pj-sweep 2.6s linear infinite;
  }
  @keyframes pj-sweep {
    from { transform: translateX(-100%); }
    to   { transform: translateX(200%); }
  }
  .pj-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    animation: pj-orbFloat 16s ease-in-out infinite alternate;
  }
  @keyframes pj-orbFloat {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(40px,-28px) scale(1.18); }
  }
  @keyframes pj-pulseDot {
    0%,100% { opacity:.4; transform:scale(1); }
    50%     { opacity:1;  transform:scale(1.35); }
  }
  .pj-pulse-dot { animation: pj-pulseDot 2s ease-in-out infinite; }
`;

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 });

  const meta = categoryMeta[project.category] || categoryMeta["Full Stack"];
  const Icon = meta.icon;

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setTilt({ x: -(dy / (r.height / 2)) * 14, y: (dx / (r.width / 2)) * 14 });
    setShimmer({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        width: 340, flexShrink: 0,
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05,1.05,1.05)`
          : "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)",
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.55s cubic-bezier(.03,.98,.52,.99)",
        willChange: "transform", zIndex: hovered ? 50 : 1, position: "relative",
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-white/10 flex flex-col"
        style={{
          height: 520,
          background: "linear-gradient(145deg,rgba(14,14,30,0.95),rgba(8,8,22,0.98))",
          boxShadow: hovered
            ? `0 32px 64px -12px ${meta.glow}55, 0 0 0 1px ${meta.glow}44, inset 0 1px 0 rgba(255,255,255,0.08)`
            : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
            background: `radial-gradient(circle at ${shimmer.x}% ${shimmer.y}%, ${meta.glow}28 0%, transparent 65%)`,
          }} />

        <div className={`h-1.5 w-full bg-gradient-to-r ${meta.gradient} relative overflow-hidden flex-shrink-0`}>
          <div className="absolute inset-0 pj-shimmer-sweep" />
        </div>

        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle,${meta.glow},transparent)`,
            opacity: hovered ? 0.3 : 0.12, transition: "opacity 0.4s",
          }} />

        <div className="p-6 flex flex-col flex-grow relative z-10 overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${meta.gradient}`}
              style={{ boxShadow: `0 4px 16px ${meta.glow}55` }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border"
              style={{ background: `${meta.glow}18`, borderColor: `${meta.glow}40`, color: meta.glow }}>
              {project.category}
            </span>
          </div>

          <h3 className="text-lg font-black text-white mb-2 leading-tight"
            style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
            {project.title}
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-4"
            style={{
              WebkitLineClamp: 2, display: "-webkit-box",
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
            {project.description}
          </p>

          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                  style={{ background: `${meta.glow}12`, borderColor: `${meta.glow}30`, color: "#cbd5e1" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-grow">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Features</p>
            <ul className="space-y-1.5">
              {project.features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: meta.glow, boxShadow: `0 0 6px ${meta.glow}` }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 mt-5">
            {project.githubUrl !== "#" && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-200">
                <Github className="w-4 h-4" /> Code
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white flex-1 justify-center transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg,${meta.glow}cc,${meta.glow}88)`,
                  boxShadow: hovered ? `0 4px 20px ${meta.glow}60` : "none",
                }}>
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const allCards = [...projects, ...projects];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PROJECTS_STYLES }} />

      <section
        id="projects"
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#020817 0%,#0a0f1e 55%,#050c1a 100%)",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        <div className="pj-orb" style={{ width: 460, height: 460, background: "#7c3aed30", top: "-12%", left: "-6%" }} />
        <div className="pj-orb" style={{ width: 380, height: 380, background: "#0ea5e930", top: "55%", right: "-6%", animationDelay: "4s" }} />
        <div className="pj-orb" style={{ width: 280, height: 280, background: "#d946ef25", top: "25%", left: "42%", animationDelay: "8s" }} />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        <div className="relative z-10">
          <div className="text-center mb-14 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pj-pulse-dot" />
              <span className="text-sm text-slate-400 font-medium tracking-wide">Portfolio Showcase</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-none tracking-tight"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
              Featured{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)" }}>
                Projects
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Innovative solutions crafted across full-stack, cloud infrastructure &amp; modern UX.
            </p>
          </div>

          <div className="pj-wrapper overflow-hidden">
            <div className="pj-track py-6 px-3">
              {allCards.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs mt-8 tracking-widest uppercase">
            ✦ Hover any card to pause &nbsp;·&nbsp; Click links to explore ✦
          </p>
        </div>
      </section>
    </>
  );
}