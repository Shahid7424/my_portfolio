"use client";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "#about" },
  {
    name: "Services",
    href: "#services",
    submenu: [
      { name: "Freelancer", href: "/freelancer" },
      { name: "Contact",    href: "/contact" },
    ],
  },
  { name: "Skills",   href: "#skills" },
  { name: "Projects", href: "#projects" },
];

/* ── Logo ──────────────────────────────────────────────────────────────────── */
const Logo = () => (
  <a href="/" className="flex items-center gap-3 group" aria-label="Home">
    <div className="relative w-11 h-11 flex items-center justify-center rounded-xl overflow-hidden nb-logo-box">
      <div className="absolute inset-0 rounded-xl nb-logo-border-anim" />
      <div
        className="absolute inset-[2px] rounded-[10px] flex items-center justify-center z-10"
        style={{ background: "linear-gradient(135deg,#0f0f20,#1a1a35)" }}
      >
        <span className="text-xl nb-logo-bolt">⚡</span>
      </div>
    </div>
    <div className="hidden sm:block">
      <span
        className="text-lg font-black tracking-tight leading-none block"
        style={{
          fontFamily: "'Syne', sans-serif",
          backgroundImage: "linear-gradient(135deg,#818cf8,#06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shahid
      </span>
      <span className="text-[10px] text-slate-500 tracking-[0.2em] uppercase font-semibold">
        Developer
      </span>
    </div>
  </a>
);

const WAIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.097"/>
  </svg>
);

const Chevron = ({ open }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

const scrollTo = (href) => {
  if (href.startsWith("#")) {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.location.href = href;
  }
};

/* ── Scoped styles — all prefixed with "nb-" to avoid conflicts ────────────── */
const NAVBAR_STYLES = `
  /* nb = navbar — prefix prevents conflicts with other components */

  .nb-logo-border-anim {
    background: linear-gradient(135deg,#6366f1,#06b6d4,#f472b6,#6366f1);
    background-size: 300% 300%;
    animation: nb-borderSpin 3s linear infinite;
  }
  @keyframes nb-borderSpin {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .nb-logo-bolt {
    display: inline-block;
    animation: nb-boltPulse 2s ease-in-out infinite;
  }
  @keyframes nb-boltPulse {
    0%,100% { filter: drop-shadow(0 0 4px #818cf8); }
    50%     { filter: drop-shadow(0 0 10px #06b6d4); }
  }

  .nb-top-bar {
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg,#6366f1,#06b6d4,#f472b6,#6366f1);
    background-size: 200% 100%;
    animation: nb-borderSpin 3s linear infinite;
  }

  .nb-link {
    position: relative;
    transition: color 0.2s ease;
  }
  .nb-link::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 2px;
    background: linear-gradient(90deg,#6366f1,#06b6d4);
    border-radius: 2px;
    transition: width 0.3s cubic-bezier(.22,1,.36,1);
  }
  .nb-link:hover::after,
  .nb-link.nb-active::after { width: 100%; }

  .nb-active-dot {
    position: absolute;
    bottom: -6px; left: 50%;
    transform: translateX(-50%);
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #06b6d4;
    box-shadow: 0 0 6px #06b6d4;
    animation: nb-dotPop 0.3s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes nb-dotPop {
    from { opacity:0; transform: translateX(-50%) scale(0); }
    to   { opacity:1; transform: translateX(-50%) scale(1); }
  }

  .nb-dropdown {
    animation: nb-dropDown 0.25s cubic-bezier(.22,1,.36,1) both;
    transform-origin: top center;
  }
  @keyframes nb-dropDown {
    from { opacity:0; transform: scaleY(0.85) translateY(-8px); }
    to   { opacity:1; transform: scaleY(1) translateY(0); }
  }
  .nb-dropdown-item {
    transition: background 0.15s, padding-left 0.2s;
  }
  .nb-dropdown-item:hover { padding-left: 20px; }

  .nb-mobile-menu {
    animation: nb-slideDown 0.3s cubic-bezier(.22,1,.36,1) both;
  }
  @keyframes nb-slideDown {
    from { opacity:0; transform: translateY(-12px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .nb-wa-btn {
    position: relative;
    overflow: hidden;
    transition: box-shadow 0.3s, transform 0.2s;
  }
  .nb-wa-btn::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .nb-wa-btn:hover::before { opacity: 1; }
  .nb-wa-btn:hover {
    box-shadow: 0 6px 24px rgba(34,197,94,0.45);
    transform: translateY(-2px);
  }
  .nb-wa-btn:active { transform: translateY(0); }

  .nb-ham span {
    display: block;
    width: 22px; height: 2px;
    border-radius: 2px;
    background: white;
    transition: all 0.3s ease;
  }
  .nb-ham.nb-open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
  .nb-ham.nb-open span:nth-child(2) { opacity:0; transform: scaleX(0); }
  .nb-ham.nb-open span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }

  .nb-glass {
    transition: background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .nb-glass.nb-scrolled {
    background: rgba(5,8,20,0.85) !important;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4);
    border-bottom: 1px solid rgba(99,102,241,0.15);
  }
`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown]     = useState(null);
  const [scrolled, setScrolled]     = useState(false);
  const [activeSection, setActive]  = useState("Home");
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "skills", "projects"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        });
      },
      { threshold: 0.4 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (href) => {
    scrollTo(href);
    setMobileOpen(false);
    setDropdown(null);
  };

  const isActive = (name) =>
    activeSection === name || (name === "Home" && activeSection === "Home");

  return (
    <>
      {/*
        ✅ FIX 1: @import REMOVED from here — add fonts in layout.js instead (see below)
        ✅ FIX 2: All class names prefixed with "nb-" — no more global conflicts
        ✅ FIX 3: No margin/padding/box-sizing reset here — Tailwind Preflight handles it
      */}
      <style dangerouslySetInnerHTML={{ __html: NAVBAR_STYLES }} />

      <nav
        className={`nb-glass sticky top-0 z-50 w-full ${scrolled ? "nb-scrolled" : ""}`}
        style={{
          background: "rgba(2,8,23,0.6)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Animated top accent line */}
        <div className="nb-top-bar" />

        {/* ── Desktop ── */}
        <div className="hidden lg:flex items-center justify-between w-full px-6 sm:px-10 lg:px-16 py-4">
          <Logo />

          <div ref={dropRef} className="flex items-center gap-1">
            {navItems.map((item) =>
              item.submenu ? (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setDropdown((d) => (d === item.name ? null : item.name))}
                    className={`nb-link ${isActive(item.name) ? "nb-active" : ""} flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                      isActive(item.name) ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <Chevron open={dropdown === item.name} />
                    {isActive(item.name) && <span className="nb-active-dot" />}
                  </button>

                  {dropdown === item.name && (
                    <div
                      className="nb-dropdown absolute top-full left-0 mt-3 w-52 rounded-xl border border-white/10 overflow-hidden"
                      style={{
                        background: "rgba(8,10,28,0.95)",
                        backdropFilter: "blur(20px)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.2)",
                      }}
                    >
                      <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg,#6366f1,#06b6d4)" }} />
                      {item.submenu.map((sub, i) => (
                        <button
                          key={sub.name}
                          onClick={() => handleNav(sub.href)}
                          className="nb-dropdown-item w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-2 group"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 group-hover:scale-125"
                            style={{
                              background: i % 2 === 0 ? "#6366f1" : "#06b6d4",
                              boxShadow: `0 0 6px ${i % 2 === 0 ? "#6366f1" : "#06b6d4"}`,
                            }}
                          />
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.href)}
                  className={`nb-link relative ${isActive(item.name) ? "nb-active" : ""} px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    item.name === "Projects"
                      ? "text-indigo-300 hover:text-white"
                      : isActive(item.name)
                      ? "text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.name === "Projects" && (
                    <span
                      className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.25)",
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                  {isActive(item.name) && <span className="nb-active-dot" />}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => window.open(`https://wa.me/918948681079`, "_blank")}
            className="nb-wa-btn flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#16a34a,#22c55e)",
              boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
            }}
          >
            <WAIcon size={18} />
            WhatsApp
          </button>
        </div>

        {/* ── Mobile ── */}
        <div className="lg:hidden px-4 py-3.5">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className={`nb-ham ${mobileOpen ? "nb-open" : ""} p-2 rounded-lg border border-white/10`}
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <span /><span /><span />
            </button>
          </div>

          {mobileOpen && (
            <div
              className="nb-mobile-menu mt-3 rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(5,8,20,0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <div className="h-[2px]" style={{ background: "linear-gradient(90deg,#6366f1,#06b6d4,#f472b6)" }} />

              <div className="px-3 py-3 flex flex-col gap-1">
                {navItems.map((item, idx) =>
                  item.submenu ? (
                    <div key={item.name}>
                      <button
                        onClick={() => setDropdown((d) => (d === item.name ? null : item.name))}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        {item.name}
                        <Chevron open={dropdown === item.name} />
                      </button>
                      {dropdown === item.name && (
                        <div className="ml-4 mt-1 flex flex-col gap-1">
                          {item.submenu.map((sub) => (
                            <button
                              key={sub.name}
                              onClick={() => handleNav(sub.href)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => handleNav(item.href)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                        item.name === "Projects"
                          ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background:
                            item.name === "Projects" ? "#818cf8" :
                            item.name === "Skills"   ? "#06b6d4" :
                            item.name === "Home"     ? "#f472b6" : "#94a3b8",
                          boxShadow: item.name === "Projects" ? "0 0 6px #818cf8" : "none",
                        }}
                      />
                      {item.name}
                    </button>
                  )
                )}

                <button
                  onClick={() => window.open(`https://wa.me/918948681079`, "_blank")}
                  className="nb-wa-btn mt-2 flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#16a34a,#22c55e)",
                    boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
                  }}
                >
                  <WAIcon size={18} />
                  Chat on WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}