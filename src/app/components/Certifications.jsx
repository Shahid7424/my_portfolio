"use client"
import { useState, useEffect, useRef } from 'react';
import { Award, Code, Trophy, Calendar, CheckCircle, ExternalLink, Zap, Shield, Star } from 'lucide-react';

const CERTS = [
  {
    title: "Full Stack Web Development",
    provider: "AccioJob",
    year: "2023",
    description: "Comprehensive full-stack development program covering modern web technologies and real-world application deployment.",
    achievements: [
      "Built 5+ full-stack applications from scratch",
      "Solved 70+ Data Structures & Algorithms problems",
      "Mastered React, Node.js, and database management",
    ],
    stats: [{ label: "Full-Stack Apps", value: "5+" }, { label: "DSA Problems", value: "70+" }],
    icon: Code,
    accent: "#00f5ff",
    glow: "rgba(0,245,255,0.3)",
    tag: "DEV",
  },
];

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,220,255,${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(100,200,255,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }} />;
}

function AuroraOrb({ style }) {
  return (
    <div style={{
      position: 'absolute', borderRadius: '50%', filter: 'blur(80px)',
      animation: 'drift 12s ease-in-out infinite alternate',
      ...style,
    }} />
  );
}

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -12;
    const ry = ((e.clientX - cx) / rect.width) * 12;
    setTilt({ rx, ry });
  };
  const reset = () => { setTilt({ rx: 0, ry: 0 }); setHovered(false); };
  const Icon = cert.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{
        perspective: '1200px',
        animationDelay: `${index * 0.15}s`,
        animation: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <div style={{
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) ${hovered ? 'translateY(-8px)' : 'translateY(0)'}`,
        transition: 'transform 0.2s ease',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        border: `1px solid ${hovered ? cert.accent + '60' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: hovered
          ? `0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px ${cert.accent}30, inset 0 1px 0 rgba(255,255,255,0.1), 0 0 80px ${cert.glow}`
          : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Shimmer on hover */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: `linear-gradient(105deg, transparent 40%, ${cert.accent}15 50%, transparent 60%)`,
            animation: 'shimmer 1.5s ease infinite',
          }} />
        )}

        {/* Top accent bar */}
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)`,
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s',
        }} />

        <div style={{ padding: '36px 40px', position: 'relative', zIndex: 2 }}>
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Icon hexagon */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: `linear-gradient(135deg, ${cert.accent}30, ${cert.accent}10)`,
                border: `1px solid ${cert.accent}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 20px ${cert.glow}`,
                flexShrink: 0,
              }}>
                <Icon size={24} color={cert.accent} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '22px', fontWeight: '700', color: '#f0f8ff',
                  fontFamily: "'Syne', sans-serif", letterSpacing: '-0.02em',
                  marginBottom: '6px', lineHeight: 1.2,
                }}>{cert.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: cert.accent, fontWeight: '600', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>{cert.provider}</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} /> {cert.year}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <div style={{
                padding: '6px 14px', borderRadius: '50px',
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s ease infinite' }} />
                <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: '600', fontFamily: 'monospace' }}>VERIFIED</span>
              </div>
              <div style={{
                padding: '6px 14px', borderRadius: '50px',
                background: `${cert.accent}15`, border: `1px solid ${cert.accent}30`,
              }}>
                <span style={{ color: cert.accent, fontSize: '11px', fontWeight: '700', fontFamily: 'monospace' }}>{cert.tag}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{
            color: 'rgba(200,220,240,0.7)', fontSize: '15px', lineHeight: '1.7',
            marginBottom: '28px', fontFamily: "'DM Sans', sans-serif",
          }}>{cert.description}</p>

          {/* Achievements */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Trophy size={15} color="#f59e0b" />
              <span style={{ color: '#f59e0b', fontSize: '12px', fontWeight: '700', fontFamily: 'monospace', letterSpacing: '0.1em' }}>KEY ACHIEVEMENTS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cert.achievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: `${cert.accent}20`, border: `1px solid ${cert.accent}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px',
                  }}>
                    <CheckCircle size={10} color={cert.accent} />
                  </div>
                  <span style={{ color: 'rgba(210,230,250,0.85)', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {cert.stats.map((s, i) => (
              <div key={i} style={{
                borderRadius: '14px', padding: '18px 20px', textAlign: 'center',
                background: `linear-gradient(135deg, ${cert.accent}12, ${cert.accent}05)`,
                border: `1px solid ${cert.accent}25`,
              }}>
                <div style={{ fontSize: '28px', fontWeight: '800', color: cert.accent, fontFamily: "'Syne', sans-serif", letterSpacing: '-0.03em', marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: 'rgba(200,220,240,0.5)', fontFamily: 'monospace', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: hovered
                  ? `linear-gradient(135deg, ${cert.accent}, ${cert.accent}aa)`
                  : `linear-gradient(135deg, ${cert.accent}30, ${cert.accent}15)`,
                color: hovered ? '#000' : cert.accent,
                fontWeight: '700', fontSize: '13px', fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.03em',
                boxShadow: hovered ? `0 0 30px ${cert.glow}` : 'none',
                transition: 'all 0.25s ease',
                border: `1px solid ${cert.accent}40`,
              }}
            >
              View Certificate <ExternalLink size={13} />
            </button>
          </div>
        </div>

        {/* Bottom glow line */}
        <div style={{
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${cert.accent}50, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');
        @keyframes drift {
          0% { transform: translate(0,0) scale(1); }
          50% { transform: translate(30px,-20px) scale(1.05); }
          100% { transform: translate(-20px,30px) scale(0.95); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #020817 0%, #060e1a 40%, #030c17 70%, #050f1c 100%)',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
      }}>
        {/* Particle network */}
        <ParticleCanvas />

        {/* Aurora orbs */}
        <AuroraOrb style={{ width: 500, height: 500, top: -150, left: -100, background: 'radial-gradient(circle, rgba(0,120,255,0.18), transparent 70%)', animationDuration: '15s' }} />
        <AuroraOrb style={{ width: 400, height: 400, top: 200, right: -100, background: 'radial-gradient(circle, rgba(0,245,255,0.12), transparent 70%)', animationDuration: '12s', animationDirection: 'alternate-reverse' }} />
        <AuroraOrb style={{ width: 350, height: 350, bottom: 100, left: '30%', background: 'radial-gradient(circle, rgba(120,0,255,0.1), transparent 70%)', animationDuration: '18s' }} />

        {/* Scan line */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)',
          zIndex: 1, animation: 'scanLine 8s linear infinite', pointerEvents: 'none',
        }} />

        {/* Grid overlay */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.6,
        }} />

        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '70px', animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
            {/* Floating badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px', borderRadius: '50px', marginBottom: '24px',
              background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.25)',
              animation: 'floatBadge 4s ease-in-out infinite',
            }}>
              <Zap size={13} color="#00f5ff" />
              <span style={{ color: '#00f5ff', fontSize: '11px', fontWeight: '700', fontFamily: 'monospace', letterSpacing: '0.15em' }}>CREDENTIALS // VERIFIED</span>
              <Shield size={13} color="#00f5ff" />
            </div>

            <h2 style={{
              fontSize: 'clamp(38px, 6vw, 64px)', fontWeight: '800',
              fontFamily: "'Syne', sans-serif", letterSpacing: '-0.04em',
              lineHeight: 1.05, marginBottom: '20px',
              background: 'linear-gradient(135deg, #ffffff 0%, #a0d4ff 50%, #00f5ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Certifications
            </h2>

            <p style={{
              color: 'rgba(160,200,230,0.6)', fontSize: '16px', lineHeight: 1.7,
              maxWidth: '480px', margin: '0 auto',
              fontFamily: "'DM Sans', sans-serif",
            }}>
              Professional credentials & achievements — proof of mastery, not just participation.
            </p>

            {/* Decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
              <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.4))' }} />
              <Star size={14} color="rgba(0,245,255,0.5)" />
              <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, rgba(0,245,255,0.4), transparent)' }} />
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {CERTS.map((cert, i) => <CertCard key={i} cert={cert} index={i} />)}
          </div>

          {/* Coming soon */}
          <div style={{
            marginTop: '40px',
            borderRadius: '20px',
            border: '1px dashed rgba(0,245,255,0.15)',
            padding: '40px',
            textAlign: 'center',
            background: 'rgba(0,245,255,0.02)',
            animation: 'slideUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px', margin: '0 auto 16px',
              background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'rotateSlow 10s linear infinite',
            }}>
              <Award size={22} color="rgba(0,245,255,0.4)" />
            </div>
            <h3 style={{ color: 'rgba(180,220,240,0.5)', fontSize: '16px', fontWeight: '600', fontFamily: "'Syne', sans-serif", marginBottom: '8px' }}>
              More Incoming
            </h3>
            <p style={{ color: 'rgba(140,180,210,0.35)', fontSize: '13px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              // continuously learning & leveling up
            </p>
          </div>
        </div>
      </section>
    </>
  );
}