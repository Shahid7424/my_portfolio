"use client";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Globe, Mail, Phone, MapPin, ArrowUpRight, Zap, Heart } from "lucide-react";

/* ── Particle Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.2 + 0.4,
      color: ["#6366f1","#06b6d4","#f472b6","#8b5cf6"][Math.floor(Math.random()*4)],
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "80"; ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx*dx+dy*dy);
          if (d < 90) { ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.strokeStyle=`rgba(99,102,241,${0.12*(1-d/90)})`; ctx.lineWidth=0.5; ctx.stroke(); }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

const socials = [
  { icon: <Github className="w-4 h-4" />,   label: "GitHub",    href: "https://github.com/shahid7424",         color: "#6366f1" },
  { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn",  href: "https://www.linkedin.com/in/shahid-shah-416b3b198/", color: "#06b6d4" },
  { icon: <Globe className="w-4 h-4" />,    label: "Portfolio", href: "https://my-portfolio-one-xi-46.vercel.app/", color: "#10b981" },
];

const navLinks = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "/contact" },
  { label: "Freelancer", href: "/freelancer" },
];

const services = [
  { label: "Web Development",  href: "#" },
  { label: "React / Next.js",  href: "#" },
  { label: "Full Stack Apps",  href: "#" },
  { label: "UI/UX Design",     href: "#" },
  { label: "API Integration",  href: "#" },
];

/* ── All CSS scoped with "ft-" prefix (ft = footer) ── */
const FOOTER_STYLES = `
  .ft-section {
    background: #030712;
    position: relative;
    overflow: hidden;
    font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
  }

  /* Top border glow */
  .ft-top-border {
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent, #6366f1, #06b6d4, #f472b6, transparent);
    position: relative;
  }
  .ft-top-border::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, #6366f1, #06b6d4, #f472b6, transparent);
    filter: blur(8px);
    opacity: 0.5;
  }

  /* Brand name shimmer */
  @keyframes ft-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  .ft-brand-name {
    font-family: var(--font-syne), 'Syne', sans-serif;
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(90deg, #fff 0%, #818cf8 25%, #06b6d4 50%, #f472b6 75%, #fff 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ft-shimmer 5s linear infinite;
    line-height: 1;
  }

  /* Availability badge pulse */
  @keyframes ft-avail-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
    50%     { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
  }
  .ft-avail-dot {
    animation: ft-avail-pulse 2s ease-in-out infinite;
  }

  /* Nav links */
  .ft-nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #94a3b8;
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    padding: 6px 0;
    transition: color 0.2s ease, padding-left 0.25s ease;
    position: relative;
  }
  .ft-nav-link::before {
    content: '';
    width: 0;
    height: 1px;
    background: linear-gradient(90deg, #6366f1, #06b6d4);
    transition: width 0.3s ease;
    flex-shrink: 0;
  }
  .ft-nav-link:hover {
    color: #fff;
    padding-left: 4px;
  }
  .ft-nav-link:hover::before { width: 16px; }

  /* Social buttons */
  .ft-social {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.08);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 600;
    color: #cbd5e1;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    background: rgba(255,255,255,0.03);
  }
  .ft-social:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,0.07);
  }

  /* Contact row */
  .ft-contact-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #94a3b8;
    font-size: 0.875rem;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid transparent;
    transition: all 0.25s ease;
  }
  .ft-contact-link:hover {
    color: #fff;
    background: rgba(99,102,241,0.08);
    border-color: rgba(99,102,241,0.25);
  }

  /* CTA Button */
  .ft-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    box-shadow: 0 4px 24px rgba(99,102,241,0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .ft-cta-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .ft-cta-btn:hover::before { opacity: 1; }
  .ft-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(99,102,241,0.5);
  }

  /* Section title */
  .ft-section-title {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #475569;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ft-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(99,102,241,0.3), transparent);
  }

  /* Scan line */
  @keyframes ft-scan {
    0%   { transform: translateY(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(600px); opacity: 0; }
  }
  .ft-scan-line {
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent);
    animation: ft-scan 8s linear infinite;
    pointer-events: none;
    z-index: 1;
  }

  /* Reveal animation */
  @keyframes ft-fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ft-revealed { animation: ft-fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }

  /* Stat card */
  .ft-stat {
    padding: 16px 20px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    text-align: center;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .ft-stat:hover {
    border-color: rgba(99,102,241,0.3);
    background: rgba(99,102,241,0.06);
  }

  /* Bottom copyright */
  @keyframes ft-blink {
    0%,100% { opacity: 1; }
    50%     { opacity: 0.3; }
  }
  .ft-blink { animation: ft-blink 2s ease-in-out infinite; }

  /* WhatsApp btn */
  .ft-wa-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    border-radius: 14px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    background: linear-gradient(135deg, #16a34a, #22c55e);
    box-shadow: 0 4px 24px rgba(34,197,94,0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .ft-wa-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(34,197,94,0.5);
  }

  /* Grid divider */
  .ft-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    margin: 40px 0;
  }
`;

const WAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097"/>
  </svg>
);

export default function Footer() {
  const [vis, setVis] = useState(false);
  useEffect(() => { setTimeout(() => setVis(true), 100); }, []);

  return (
    <footer className="ft-section">
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />

      {/* Top glow border */}
      <div className="ft-top-border" />

      {/* Scan line */}
      <div className="ft-scan-line" />

      {/* Particle bg */}
      <ParticleCanvas />

      {/* Ambient orbs */}
      <div className="absolute -top-32 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="absolute -bottom-20 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1), transparent)", filter: "blur(70px)", zIndex: 0 }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-8">

        {/* ── TOP HERO ROW ── */}
        <div className={`ft-revealed flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-12`}
          style={{ animationDelay: "0.1s" }}>

          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="ft-brand-name">Shahid Shah</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Full-Stack Developer crafting high-performance web applications with pixel-perfect UI and scalable architecture.
            </p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 ft-avail-dot" />
              <span className="text-emerald-400 text-xs font-semibold tracking-wide">Available for hire</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a href="mailto:shahshahid121212@gmail.com" className="ft-cta-btn">
              <Mail className="w-4 h-4" />
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a href="https://wa.me/918948681079" target="_blank" rel="noopener noreferrer" className="ft-wa-btn">
              <WAIcon />
              WhatsApp
            </a>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className={`ft-revealed grid grid-cols-3 sm:grid-cols-3 gap-4 mb-12`}
          style={{ animationDelay: "0.2s" }}>
          {[
            { val: "2+",  label: "Years Exp",    color: "#818cf8" },
            { val: "15+", label: "Projects",     color: "#06b6d4" },
            { val: "10+", label: "Happy Clients", color: "#f472b6" },
          ].map((s, i) => (
            <div key={i} className="ft-stat">
              <div className="text-2xl font-black leading-none mb-1"
                style={{
                  fontFamily: "var(--font-syne), 'Syne', sans-serif",
                  backgroundImage: `linear-gradient(135deg, ${s.color}, #fff)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                {s.val}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="ft-divider" />

        {/* ── LINKS GRID ── */}
        <div className={`ft-revealed grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12`}
          style={{ animationDelay: "0.3s" }}>

          {/* Navigation */}
          <div>
            <p className="ft-section-title">Navigation</p>
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <a key={i} href={link.href} className="ft-nav-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="ft-section-title">Services</p>
            <div className="flex flex-col">
              {services.map((s, i) => (
                <a key={i} href={s.href} className="ft-nav-link">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="ft-section-title">Contact</p>
            <div className="flex flex-col gap-1">
              <a href="mailto:shahshahid121212@gmail.com" className="ft-contact-link">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="truncate text-xs">shahshahid121212@gmail.com</span>
              </a>
              <a href="tel:+918948681079" className="ft-contact-link">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                +91 89486 81079
              </a>
              <div className="ft-contact-link cursor-default">
                <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0" />
                India 🇮🇳
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="ft-section-title">Find Me On</p>
            <div className="flex flex-col gap-2">
              {socials.map((s, i) => (
                <a
                  key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ft-social"
                  style={{ "--hover-color": s.color }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = s.color + "50";
                    e.currentTarget.style.boxShadow = `0 4px 20px ${s.color}25`;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.color = "#cbd5e1";
                  }}
                >
                  <span style={{ color: s.color }}>{s.icon}</span>
                  {s.label}
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-40" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ft-divider" />

        {/* ── BOTTOM BAR ── */}
        <div className={`ft-revealed flex flex-col sm:flex-row items-center justify-between gap-4`}
          style={{ animationDelay: "0.4s" }}>
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Shahid Shah. Built with{" "}
            <Heart className="w-3 h-3 inline text-pink-500 mx-0.5" />
            using Next.js &amp; TailwindCSS
          </p>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ft-blink" />
            <span className="text-emerald-500 text-xs font-semibold tracking-widest uppercase">
              System Active
            </span>
          </div>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors duration-200 group"
          >
            Back to top
            <span className="w-6 h-6 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-indigo-500/50 transition-colors">
              <ArrowUpRight className="w-3 h-3 -rotate-45" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}