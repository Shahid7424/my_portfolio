"use client";
import { useState, useRef } from "react";
import { Code, Database, Cloud, GitBranch, Palette } from "lucide-react";

const categoryMeta = {
  "Frontend Development": { glow: "#6366f1", from: "#6366f1", to: "#8b5cf6", icon: Code },
  "Styling & UI":         { glow: "#06b6d4", from: "#06b6d4", to: "#3b82f6", icon: Palette },
  "Backend & Database":   { glow: "#10b981", from: "#10b981", to: "#14b8a6", icon: Database },
  "Cloud & Deployment":   { glow: "#f59e0b", from: "#f97316", to: "#f59e0b", icon: Cloud },
  "Development Tools":    { glow: "#ec4899", from: "#ec4899", to: "#f43f5e", icon: GitBranch },
};

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js",   level: 90 },
      { name: "Next.js",    level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 95 },
      { name: "Redux",      level: 75 },
    ],
  },
  {
    title: "Styling & UI",
    skills: [
      { name: "TailwindCSS",   level: 90 },
      { name: "Bootstrap",     level: 85 },
      { name: "Shadcn/ui",     level: 80 },
      { name: "Aceternity/ui", level: 70 },
      { name: "CSS Modules",   level: 85 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js",   level: 50 },
      { name: "Java",      level: 40 },
      { name: "MongoDB",   level: 80 },
      { name: "MySQL",     level: 70 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    title: "Cloud & Deployment",
    skills: [
      { name: "AWS EC2",   level: 70 },
      { name: "AWS S3",    level: 75 },
      { name: "Vercel",    level: 100 },
      { name: "Hostinger", level: 90 },
      { name: "CI/CD",     level: 65 },
    ],
  },
  {
    title: "Development Tools",
    skills: [
      { name: "GitHub",  level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Figma",   level: 70 },
      { name: "Docker",  level: 55 },
    ],
  },
];

/* ── All CSS scoped with "sk-" prefix (sk = skills) ── */
const SKILLS_STYLES = `
  @keyframes sk-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .sk-track {
    display: flex;
    gap: 22px;
    width: max-content;
    animation: sk-marquee 36s linear infinite;
  }
  .sk-track:hover { animation-play-state: paused; }
  .sk-wrapper {
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }
  .sk-bar-fill { animation: sk-barGrow 1.2s cubic-bezier(.22,1,.36,1) both; }
  @keyframes sk-barGrow { from { width: 0 !important; } }
  .sk-bar-shimmer {
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
    animation: sk-barSweep 2.8s linear infinite;
  }
  @keyframes sk-barSweep {
    from { transform: translateX(-100%); }
    to   { transform: translateX(200%); }
  }
  .sk-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    pointer-events: none;
    animation: sk-orbFloat 18s ease-in-out infinite alternate;
  }
  @keyframes sk-orbFloat {
    from { transform: translate(0,0) scale(1); }
    to   { transform: translate(-35px,25px) scale(1.15); }
  }
  @keyframes sk-pulse {
    0%,100% { opacity:.4; transform:scale(1); }
    50%     { opacity:1;  transform:scale(1.35); }
  }
  .sk-pulse { animation: sk-pulse 2s ease-in-out infinite; }
  .sk-count-badge {
    animation: sk-countPop 0.6s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes sk-countPop {
    from { opacity:0; transform:scale(0.6) translateY(8px); }
    to   { opacity:1; transform:scale(1) translateY(0); }
  }
`;

function SkillBar({ skill, glow, from, to }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-semibold text-slate-300">{skill.name}</span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: `${glow}22`, color: glow }}>
          {skill.level}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
        <div
          className="h-full rounded-full sk-bar-fill relative overflow-hidden"
          style={{
            width: `${skill.level}%`,
            background: `linear-gradient(90deg, ${from}, ${to})`,
            boxShadow: `0 0 8px ${glow}88`,
          }}
        >
          <div className="absolute inset-0 sk-bar-shimmer" />
        </div>
      </div>
    </div>
  );
}

function SkillCard({ category }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [shimmer, setShimmer] = useState({ x: 50, y: 50 });

  const meta = categoryMeta[category.title];
  const Icon = meta.icon;

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    setTilt({ x: -(dy / (r.height / 2)) * 13, y: (dx / (r.width / 2)) * 13 });
    setShimmer({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        width: 320, height: 420, flexShrink: 0,
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
          height: 420,
          background: "linear-gradient(145deg,rgba(14,14,30,0.95),rgba(8,8,22,0.98))",
          boxShadow: hovered
            ? `0 28px 56px -10px ${meta.glow}55, 0 0 0 1px ${meta.glow}44, inset 0 1px 0 rgba(255,255,255,0.08)`
            : "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0, transition: "opacity 0.3s",
            background: `radial-gradient(circle at ${shimmer.x}% ${shimmer.y}%, ${meta.glow}28 0%, transparent 65%)`,
          }} />
        <div className="h-1.5 w-full relative overflow-hidden flex-shrink-0"
          style={{ background: `linear-gradient(90deg, ${meta.from}, ${meta.to})` }}>
          <div className="absolute inset-0 sk-bar-shimmer" />
        </div>
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none"
          style={{
            background: `radial-gradient(circle,${meta.glow},transparent)`,
            opacity: hovered ? 0.28 : 0.1, transition: "opacity 0.4s",
          }} />
        <div className="p-6 flex flex-col relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 rounded-xl flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})`, boxShadow: `0 4px 16px ${meta.glow}55` }}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-black text-white text-base leading-tight"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
              {category.title}
            </h3>
          </div>
          <div>
            {category.skills.map((skill, i) => (
              <SkillBar key={i} skill={skill} glow={meta.glow} from={meta.from} to={meta.to} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const allCards = [...skillCategories, ...skillCategories];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SKILLS_STYLES }} />

      <section
        id="skills"
        className="relative py-20 overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#020817 0%,#080d1c 55%,#030a14 100%)",
          fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        }}
      >
        <div className="sk-orb" style={{ width: 420, height: 420, background: "#6366f130", top: "-10%", left: "-4%" }} />
        <div className="sk-orb" style={{ width: 360, height: 360, background: "#06b6d430", bottom: "-8%", right: "-4%", animationDelay: "5s" }} />
        <div className="sk-orb" style={{ width: 260, height: 260, background: "#f59e0b25", top: "35%", left: "50%", animationDelay: "10s" }} />

        <div className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        <div className="relative z-10">
          <div className="text-center mb-14 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 sk-pulse" />
              <span className="text-sm text-slate-400 font-medium tracking-wide">My Expertise</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-none tracking-tight"
              style={{ fontFamily: "var(--font-syne), 'Syne', sans-serif" }}>
              Technical{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg,#6366f1,#06b6d4,#10b981)" }}>
                Skills
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              My expertise across frontend, backend, cloud infrastructure &amp; dev tools.
            </p>
            <div className="flex justify-center gap-8 mt-8">
              {[
                { num: "5",   label: "Skill Areas" },
                { num: "20+", label: "Technologies" },
                { num: "95%", label: "Best Skill" },
              ].map((s, i) => (
                <div key={i} className="text-center sk-count-badge" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="text-2xl font-black"
                    style={{
                      fontFamily: "var(--font-syne), 'Syne', sans-serif",
                      backgroundImage: "linear-gradient(135deg,#6366f1,#06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    {s.num}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sk-wrapper overflow-hidden">
            <div className="sk-track py-6 px-3">
              {allCards.map((category, i) => (
                <SkillCard key={i} category={category} />
              ))}
            </div>
          </div>

          <p className="text-center text-slate-600 text-xs mt-8 tracking-widest uppercase">
            ✦ Hover any card to pause &nbsp;·&nbsp; 3D tilt on hover ✦
          </p>
        </div>
      </section>
    </>
  );
}