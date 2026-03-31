"use client";
import { useEffect, useRef, useState } from "react";

const achievements = [
  {
    icon: "⚡",
    text: "Developed scalable React/Next.js apps with 30% performance gains.",
    metric: "+30%",
    label: "Performance",
  },
  {
    icon: "📱",
    text: "Built mobile-friendly UIs using TailwindCSS & Bootstrap.",
    metric: "100%",
    label: "Responsive",
  },
  {
    icon: "🔗",
    text: "Integrated REST APIs ensuring 99.5% uptime.",
    metric: "99.5%",
    label: "Uptime",
  },
  {
    icon: "☁️",
    text: "Deployed to AWS (S3, EC2) and Vercel with CI/CD setup.",
    metric: "AWS",
    label: "Cloud",
  },
  {
    icon: "🚀",
    text: "Optimized Next.js apps via lazy loading & code splitting.",
    metric: "3x",
    label: "Faster",
  },
];

// Floating orb component
function Orb({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(60px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

// Animated digit counter
function Counter({ value, suffix = "" }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setDisplay(value);
      return;
    }
    let start = 0;
    const duration = 1400;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((eased * num).toFixed(num % 1 !== 0 ? 1 : 0) + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, suffix]);

  return <span>{display}</span>;
}

export default function Experience() {
  const canvasRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 55;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,220,255,0.5)";
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(99,220,255,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    setTimeout(() => setVisible(true), 100);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#060914",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
        padding: "60px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(3deg); }
        }
        @keyframes glitchX {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translateX(0); }
          10% { clip-path: inset(10% 0 60% 0); transform: translateX(-4px); }
          20% { clip-path: inset(50% 0 20% 0); transform: translateX(4px); }
          30% { clip-path: inset(80% 0 5% 0); transform: translateX(-2px); }
          40%, 90% { clip-path: inset(0 0 100% 0); }
        }
        @keyframes scanMove {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes borderPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes metricPop {
          0% { transform: scale(0.8); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes cornerBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .card-hover {
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.012);
          box-shadow: 0 0 40px rgba(0,220,255,0.18), 0 20px 60px rgba(0,0,0,0.6) !important;
        }
        .row-hover {
          transition: background 0.25s ease, transform 0.25s ease;
          cursor: default;
        }
        .row-hover:hover {
          background: rgba(0,220,255,0.06) !important;
          transform: translateX(6px);
        }
        .metric-badge {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .metric-badge:hover {
          transform: scale(1.12) rotate(-2deg);
          box-shadow: 0 0 20px rgba(0,220,255,0.5);
        }
      `}</style>

      {/* Ambient orbs */}
      <Orb style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(0,100,255,0.15) 0%, transparent 70%)", top: -100, left: -150, animation: "orbDrift 12s ease-in-out infinite" }} />
      <Orb style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(120,0,255,0.12) 0%, transparent 70%)", bottom: -80, right: -100, animation: "orbDrift 16s ease-in-out infinite reverse" }} />
      <Orb style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(0,220,255,0.08) 0%, transparent 70%)", top: "40%", left: "50%", animation: "orbDrift 20s ease-in-out infinite 4s" }} />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      />

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, rgba(0,220,255,0.3), transparent)",
        animation: "scanMove 6s linear infinite",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Horizontal grid lines */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", left: 0, right: 0,
          top: `${(i + 1) * 12.5}%`, height: 1,
          background: "rgba(0,220,255,0.04)", pointerEvents: "none",
        }} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 860 }}>

        {/* Section Label */}
        <div style={{
          textAlign: "center", marginBottom: 48,
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeSlideUp 0.7s ease forwards" : "none",
        }}>
          <div style={{
            display: "inline-block",
            border: "1px solid rgba(0,220,255,0.3)",
            borderRadius: 3,
            padding: "4px 16px",
            marginBottom: 16,
            background: "rgba(0,220,255,0.05)",
          }}>
            <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, color: "#00dcff", letterSpacing: 4, textTransform: "uppercase" }}>
              SYS://WORK_HISTORY
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "#fff",
            margin: 0,
            lineHeight: 1.1,
            position: "relative",
            display: "inline-block",
          }}>
            <span style={{
              background: "linear-gradient(90deg, #fff 0%, #00dcff 40%, #a855f7 70%, #fff 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 4s linear infinite",
            }}>EXPERIENCE</span>
          </h2>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
            <div style={{ width: 40, height: 1, background: "rgba(0,220,255,0.4)" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00dcff", boxShadow: "0 0 10px #00dcff", animation: "cornerBlink 1.5s ease-in-out infinite" }} />
            <div style={{ width: 40, height: 1, background: "rgba(0,220,255,0.4)" }} />
          </div>
        </div>

        {/* Main Card */}
        <div
          className="card-hover"
          style={{
            background: "linear-gradient(135deg, rgba(10,16,40,0.95) 0%, rgba(6,12,30,0.98) 100%)",
            borderRadius: 16,
            border: "1px solid rgba(0,220,255,0.2)",
            boxShadow: "0 0 60px rgba(0,100,255,0.1), 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            animation: visible ? "fadeSlideUp 0.9s ease 0.2s both" : "none",
          }}
        >
          {/* Top gradient bar */}
          <div style={{
            height: 3,
            background: "linear-gradient(90deg, #00dcff, #7c3aed, #ec4899, #00dcff)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }} />

          {/* Corner decorations */}
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: 12, height: 12,
              borderTop: i < 2 ? "1.5px solid rgba(0,220,255,0.6)" : "none",
              borderBottom: i >= 2 ? "1.5px solid rgba(0,220,255,0.6)" : "none",
              borderLeft: i % 2 === 0 ? "1.5px solid rgba(0,220,255,0.6)" : "none",
              borderRight: i % 2 === 1 ? "1.5px solid rgba(0,220,255,0.6)" : "none",
              animation: "cornerBlink 2s ease-in-out infinite",
              animationDelay: `${i * 0.3}s`,
              ...pos,
            }} />
          ))}

          <div style={{ padding: "clamp(24px, 5vw, 44px)" }}>

            {/* Job Header */}
            <div style={{ marginBottom: 28, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 3, height: 28, background: "linear-gradient(180deg, #00dcff, #7c3aed)", borderRadius: 2 }} />
                  <h3 style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(1.1rem, 3vw, 1.55rem)",
                    fontWeight: 700,
                    color: "#fff",
                    margin: 0,
                    letterSpacing: 1,
                  }}>
                    SOFTWARE DEVELOPER
                  </h3>
                </div>
                <div style={{ paddingLeft: 13 }}>
                  <span style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                    fontWeight: 600,
                    background: "linear-gradient(90deg, #00dcff, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: 1,
                  }}>
                    AIN SOFTWARE SOLUTION
                  </span>
                </div>
              </div>

              {/* Status badge */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8,
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(0,220,255,0.07)",
                  border: "1px solid rgba(0,220,255,0.2)",
                  borderRadius: 20, padding: "6px 14px",
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 8px #00ff88", animation: "cornerBlink 1.2s ease-in-out infinite" }} />
                  <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 10, color: "#00ff88", letterSpacing: 2 }}>ACTIVE</span>
                </div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
                  FEB 2024 — PRESENT &nbsp;·&nbsp; PUNE, IND
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,220,255,0.2), transparent)", marginBottom: 28 }} />

            {/* Achievements */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {achievements.map((item, i) => (
                <div
                  key={i}
                  className="row-hover"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: hovered === i ? "1px solid rgba(0,220,255,0.2)" : "1px solid transparent",
                    background: hovered === i ? "rgba(0,220,255,0.06)" : "transparent",
                    opacity: visible ? 1 : 0,
                    animation: visible ? `fadeSlideUp 0.6s ease ${0.4 + i * 0.1}s both` : "none",
                  }}
                >
                  {/* Metric badge */}
                  <div
                    className="metric-badge"
                    style={{
                      minWidth: 56, height: 56,
                      borderRadius: 10,
                      background: "linear-gradient(135deg, rgba(0,220,255,0.12), rgba(124,58,237,0.12))",
                      border: "1px solid rgba(0,220,255,0.25)",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 8, color: "rgba(0,220,255,0.7)", letterSpacing: 0.5, marginTop: 2 }}>
                      {item.label.toUpperCase()}
                    </span>
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "clamp(0.88rem, 2vw, 1.02rem)",
                      color: hovered === i ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.5,
                      transition: "color 0.25s ease",
                    }}>
                      {item.text}
                    </p>
                  </div>

                  {/* Right metric */}
                  <div style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    fontWeight: 700,
                    color: hovered === i ? "#00dcff" : "rgba(0,220,255,0.4)",
                    transition: "color 0.25s ease",
                    minWidth: 40,
                    textAlign: "right",
                    letterSpacing: 1,
                  }}>
                    {item.metric}
                  </div>

                  {/* Arrow */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: hovered === i ? 0.8 : 0.2, transition: "opacity 0.25s ease, transform 0.25s ease", transform: hovered === i ? "translateX(3px)" : "none", flexShrink: 0 }}>
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="#00dcff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{
              marginTop: 28,
              padding: "16px 0 0",
              borderTop: "1px solid rgba(0,220,255,0.1)",
              display: "flex", flexWrap: "wrap", gap: 8,
              opacity: visible ? 1 : 0,
              animation: visible ? "fadeSlideUp 0.7s ease 1.1s both" : "none",
            }}>
              {["React", "Next.js", "TailwindCSS", "AWS", "CI/CD", "REST API"].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(0,220,255,0.7)",
                  background: "rgba(0,220,255,0.06)",
                  border: "1px solid rgba(0,220,255,0.15)",
                  borderRadius: 4,
                  padding: "3px 10px",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div style={{
          marginTop: 20, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
          opacity: visible ? 1 : 0,
          animation: visible ? "fadeSlideUp 0.7s ease 1.2s both" : "none",
        }}>
          {[["RECORDS", "01"], ["STATUS", "ONLINE"], ["CLEARANCE", "LVL-3"]].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>{k}:</span>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 9, color: "rgba(0,220,255,0.6)", letterSpacing: 2 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}