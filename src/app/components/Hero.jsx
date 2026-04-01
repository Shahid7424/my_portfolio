"use client";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Globe, Mail, Phone, ArrowRight, Download, Code2, Terminal } from "lucide-react";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      color: [`#6366f1`,`#06b6d4`,`#f472b6`,`#10b981`][Math.floor(Math.random() * 4)],
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.color + "99";
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

function MagneticBtn({ children, className, style, href, onClick, download }) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = btnRef.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });
  const Tag = href ? "a" : "button";
  return (
    <Tag
      ref={btnRef} href={href} onClick={onClick} download={download}
      target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined}
      onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
      style={{ ...style, transform: `translate(${pos.x}px, ${pos.y}px)`, transition: "transform 0.2s ease" }}
    >
      {children}
    </Tag>
  );
}

function FloatingBadge({ label, icon, style }) {
  return (
    <div
      className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md text-xs font-semibold text-white/80 hr-float-badge"
      style={{ background: "rgba(15,15,35,0.8)", ...style }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span> {label}
    </div>
  );
}

/* ── All CSS scoped with "hr-" prefix (hr = hero) ── */
const HERO_STYLES = `
  .hr-bg {
    background:
      radial-gradient(ellipse 80% 60% at 20% 50%, rgba(99,102,241,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 80% 30%, rgba(6,182,212,0.14) 0%, transparent 55%),
      radial-gradient(ellipse 50% 60% at 60% 80%, rgba(244,114,182,0.10) 0%, transparent 50%),
      linear-gradient(135deg, #020817 0%, #060d1f 50%, #020817 100%);
  }
  .hr-scanlines::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px
    );
    pointer-events: none; z-index: 1;
  }
  .hr-noise::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 2; opacity: 0.04;
  }
  .hr-glitch {
    position: relative;
    animation: hr-glitchMain 5s infinite;
  }
  .hr-glitch::before, .hr-glitch::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0; width: 100%;
    font-family: inherit; font-size: inherit; font-weight: inherit;
    background: inherit; -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hr-glitch::before {
    animation: hr-glitchTop 5s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
    transform: translate(-2px, -1px);
  }
  .hr-glitch::after {
    animation: hr-glitchBot 5s infinite;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
    transform: translate(2px, 1px);
  }
  @keyframes hr-glitchMain {
    0%,90%,100% { filter: none; }
    92% { filter: hue-rotate(10deg) saturate(1.5); }
    94% { filter: hue-rotate(-10deg); }
  }
  @keyframes hr-glitchTop {
    0%,89%,95%,100% { opacity:0; transform:translate(-2px,-1px); }
    90% { opacity:0.8; transform:translate(-4px,-1px); }
    93% { opacity:0.6; transform:translate(3px,-2px); }
  }
  @keyframes hr-glitchBot {
    0%,89%,95%,100% { opacity:0; transform:translate(2px,1px); }
    91% { opacity:0.7; transform:translate(4px,2px); }
    94% { opacity:0.5; transform:translate(-3px,1px); }
  }
  .hr-reveal { opacity:0; transform: translateY(30px); }
  .hr-revealed { animation: hr-revealUp 0.7s cubic-bezier(.22,1,.36,1) forwards; }
  @keyframes hr-revealUp {
    to { opacity:1; transform: translateY(0); }
  }
  .hr-ring-pulse { animation: hr-ringPulse 3s ease-in-out infinite; }
  .hr-ring-pulse-2 { animation: hr-ringPulse 3s ease-in-out infinite 1s; }
  .hr-ring-pulse-3 { animation: hr-ringPulse 3s ease-in-out infinite 2s; }
  @keyframes hr-ringPulse {
    0%,100% { opacity:0.4; transform:scale(1); }
    50%     { opacity:0.9; transform:scale(1.06); }
  }
  .hr-float-badge { animation: hr-floatBadge 4s ease-in-out infinite alternate; }
  @keyframes hr-floatBadge {
    from { transform: translateY(0px) rotate(-1deg); }
    to   { transform: translateY(-10px) rotate(1deg); }
  }
  .hr-cursor {
    display: inline-block; width: 2px; height: 1.1em;
    background: #06b6d4; margin-left: 2px; vertical-align: text-bottom;
    animation: hr-blink 1s step-end infinite;
  }
  @keyframes hr-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .hr-social-icon { transition: transform 0.2s ease, box-shadow 0.2s ease; }
  .hr-social-icon:hover { transform: translateY(-3px) scale(1.12); }
  .hr-grad-btn {
    position: relative; overflow: hidden;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
  }
  .hr-grad-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0; transition: opacity 0.3s;
  }
  .hr-grad-btn:hover::before { opacity: 1; }
  .hr-grad-btn:hover { box-shadow: 0 8px 30px rgba(99,102,241,0.4); transform: translateY(-2px); }
  .hr-corner-tl, .hr-corner-br {
    position: absolute; width: 60px; height: 60px; pointer-events: none;
  }
  .hr-corner-tl { top:24px; left:24px; border-top:2px solid rgba(99,102,241,0.5); border-left:2px solid rgba(99,102,241,0.5); }
  .hr-corner-br { bottom:24px; right:24px; border-bottom:2px solid rgba(6,182,212,0.5); border-right:2px solid rgba(6,182,212,0.5); }
  @keyframes hr-dotPulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
  .hr-dot-pulse { animation: hr-dotPulse 2s ease-in-out infinite; }
  .hr-orbit-ring  { animation: hr-orbit 12s linear infinite; }
  .hr-orbit-ring-2 { animation: hr-orbit 18s linear infinite reverse; }
  @keyframes hr-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
`;

export default function Hero() {
  const role = useTypewriter(
    ["Software Developer", "React.js Expert", "Next.js Engineer", "Full-Stack Builder"],
    75, 2000
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />

      <section
        className="hr-bg hr-scanlines hr-noise relative min-h-screen flex items-center overflow-hidden"
        style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
      >
        <ParticleCanvas />
        <div className="hr-corner-tl" style={{ zIndex: 3 }} />
        <div className="hr-corner-br" style={{ zIndex: 3 }} />

        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent)", zIndex: 0 }} />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.18), transparent)", zIndex: 0 }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8`}
                style={{ animationDelay: "0.1s" }}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 hr-dot-pulse" />
                <span className="text-sm text-slate-300 font-medium tracking-wide" style={{ fontFamily: "var(--font-dm-sans), monospace" }}>
                  &gt; Available for hire
                </span>
              </div>

              <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} mb-3`} style={{ animationDelay: "0.2s" }}>
                <h1
                  data-text="SHAHID SHAH"
                  className="hr-glitch text-6xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tighter"
                  style={{
                    fontFamily: "var(--font-syne), 'Syne', sans-serif",
                    backgroundImage: "linear-gradient(135deg, #f9fafb 0%, #818cf8 35%, #06b6d4 65%, #f472b6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Shahid Shah
                </h1>
              </div>

              <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} flex items-center gap-3 mb-6`} style={{ animationDelay: "0.35s" }}>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/30"
                  style={{ background: "rgba(6,182,212,0.08)", fontFamily: "var(--font-dm-sans), monospace" }}
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300 text-sm font-semibold">{role}</span>
                  <span className="hr-cursor" />
                </div>
                <span className="text-slate-600 text-xs tracking-widest uppercase">
                  JavaScript · React · Next.js · Node.js
                </span>
              </div>

              <p className={`hr-reveal ${mounted ? "hr-revealed" : ""} text-slate-400 text-base leading-relaxed mb-8 max-w-lg`}
                style={{ animationDelay: "0.45s" }}>
                Crafting high-performance web applications with pixel-perfect UI and scalable architecture.
                Passionate about clean code, modern DX, and delivering exceptional digital experiences.
              </p>

              <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} flex flex-wrap items-center gap-4 mb-8`}
                style={{ animationDelay: "0.55s" }}>
                <a href="mailto:shahshahid121212@gmail.com"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200 group">
                  <Mail className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
                  shahshahid121212@gmail.com
                </a>
                <span className="w-px h-4 bg-white/10" />
                <a href="tel:+918948681079"
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors duration-200 group">
                  <Phone className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                  +91 89486 81079
                </a>
              </div>

              <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} flex flex-wrap gap-4 mb-10`}
                style={{ animationDelay: "0.65s" }}>
                <MagneticBtn
                  href="#projects"
                  className="hr-grad-btn flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.35)" }}
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </MagneticBtn>
                <MagneticBtn
                  href="https://drive.google.com/file/d/10ouKeD7y-WK96vUo0u5crU9aaURlHF-D/view?usp=sharing"
                  download
                  className="hr-grad-btn flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white border border-white/10"
                  style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
                >
                  <Download className="w-4 h-4" /> Download CV
                </MagneticBtn>
              </div>

              <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} flex items-center gap-4`}
                style={{ animationDelay: "0.75s" }}>
                <span className="text-xs text-slate-600 uppercase tracking-widest font-semibold">Find me on</span>
                <div className="flex gap-3">
                  {[
                    { icon: <Github className="w-4 h-4" />, label: "GitHub",    href: "https://github.com/shahid7424",        color: "#6366f1" },
                    { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn", href: "https://www.linkedin.com/in/shahid-shah-416b3b198/", color: "#06b6d4" },
                    { icon: <Globe className="w-4 h-4" />,    label: "Portfolio",href: "https://my-portfolio-one-xi-46.vercel.app/", color: "#10b981" },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="hr-social-icon flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/10 text-xs font-semibold text-slate-300"
                      style={{ background: `${s.color}15`, borderColor: `${s.color}30` }} title={s.label}>
                      <span style={{ color: s.color }}>{s.icon}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className={`hr-reveal ${mounted ? "hr-revealed" : ""} relative flex items-center justify-center`}
              style={{ animationDelay: "0.3s" }}>
              <FloatingBadge label="Next.js"    icon="⚡" style={{ top: "8%",   right: "0%",  animationDelay: "0s" }} />
              <FloatingBadge label="React.js"   icon="⚛️" style={{ top: "32%",  left: "-4%",  animationDelay: "1.2s" }} />
              <FloatingBadge label="Node.js"    icon="🟢" style={{ bottom: "20%", right: "2%", animationDelay: "0.6s" }} />
              <FloatingBadge label="TypeScript" icon="🔷" style={{ bottom: "6%", left: "8%",  animationDelay: "1.8s" }} />

              <div className="absolute w-[320px] h-[320px] rounded-full pointer-events-none hr-orbit-ring"
                style={{ border: "1px dashed rgba(99,102,241,0.25)" }} />
              <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none hr-orbit-ring-2"
                style={{ border: "1px dashed rgba(6,182,212,0.15)" }} />

              <div className="absolute w-[270px] h-[270px] rounded-full hr-ring-pulse pointer-events-none"
                style={{ border: "2px solid rgba(99,102,241,0.4)", boxShadow: "0 0 40px rgba(99,102,241,0.2)" }} />
              <div className="absolute w-[290px] h-[290px] rounded-full hr-ring-pulse-2 pointer-events-none"
                style={{ border: "1px solid rgba(6,182,212,0.3)" }} />
              <div className="absolute w-[310px] h-[310px] rounded-full hr-ring-pulse-3 pointer-events-none"
                style={{ border: "1px solid rgba(244,114,182,0.2)" }} />

              <div className="relative w-[250px] h-[250px] rounded-full overflow-hidden"
                style={{
                  border: "3px solid rgba(99,102,241,0.5)",
                  boxShadow: "0 0 0 6px rgba(99,102,241,0.1), 0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(6,182,212,0.15)",
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.1))",
                }}>
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-transparent to-cyan-900/30 z-10 pointer-events-none rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="w-20 h-20 text-indigo-400/60" />
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {[
                  { val: "2+", label: "Years Exp" },
                  { val: "15+", label: "Projects" },
                  { val: "10+", label: "Clients" },
                ].map((s, i) => (
                  <div key={i} className="text-center px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md"
                    style={{ background: "rgba(10,10,30,0.85)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animationDelay: `${i * 0.2}s` }}>
                    <div className="text-lg font-black leading-none"
                      style={{
                        fontFamily: "var(--font-syne), 'Syne', sans-serif",
                        backgroundImage: "linear-gradient(135deg,#818cf8,#06b6d4)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}>{s.val}</div>
                    <div className="text-xs text-slate-500 mt-0.5 tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
            <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-indigo-400 to-transparent"
              style={{ animation: "hr-revealUp 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </section>
    </>
  );
}