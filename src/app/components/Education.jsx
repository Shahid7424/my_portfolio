"use client";
import { useEffect, useRef, useState } from "react";

const educationData = [
  {
    degree: "B.Tech",
    field: "Electronics & Communication Engineering",
    institution: "RR Institute Of Modern Technology",
    university: "AKTU",
    year: "2023",
    type: "Bachelor's",
    icon: "🎓",
    color: "#6366f1",
    colorB: "#8b5cf6",
    tags: ["Engineering Graduate", "Electronics Engineering"],
  },
  {
    degree: "Diploma",
    field: "Electronics Engineering",
    institution: "Ambalika Institute Of Management And Technology",
    university: "",
    year: "2020",
    type: "Diploma",
    icon: "🏅",
    color: "#10b981",
    colorB: "#14b8a6",
    tags: ["Technical Diploma", "Electronics Engineering"],
  },
];

const STATS = [
  { value: "4+",   label: "Years of Study",  icon: "📚", color: "#6366f1" },
  { value: "2",    label: "Degrees Earned",   icon: "🎓", color: "#8b5cf6" },
  { value: "100%", label: "Completion Rate",  icon: "✅", color: "#10b981" },
];

function Orb({ style }) {
  return <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none", ...style }} />;
}

export default function Education() {
  const canvasRef = useRef(null);
  const [vis, setVis]         = useState(false);
  const [hovCard, setHovCard] = useState(null);
  const [hovStat, setHovStat] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const N = 48;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .38,
      vy: (Math.random() - .5) * .38,
      r: Math.random() * 1.4 + .5,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < N; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99,102,241,0.42)"; ctx.fill();
        for (let j = i + 1; j < N; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx*dx + dy*dy);
          if (d < 105) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(99,102,241,${.11*(1-d/105)})`; ctx.lineWidth = .55; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    setTimeout(() => setVis(true), 80);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section style={{
      minHeight: "100vh", background: "#05080f", position: "relative",
      overflow: "hidden", padding: "64px 16px",
      // Use CSS variables set by layout.jsx — no @import needed
      fontFamily: "var(--font-rajdhani), var(--font-orbitron), sans-serif",
    }}>

      {/* 
        ✅ NO @import here — fonts come from layout.jsx via next/font
        Keyframes are prefixed with "edu-" to avoid conflicts with other components
      */}
      <style>{`
        .edu-wrap, .edu-wrap *, .edu-wrap *::before, .edu-wrap *::after { box-sizing: border-box; }
        @keyframes edu-fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes edu-shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes edu-orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(28px,-20px) scale(1.08)} 70%{transform:translate(-18px,14px) scale(.94)} }
        @keyframes edu-blink    { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes edu-scanMove { 0%{transform:translateY(-100%)} 100%{transform:translateY(120vh)} }
        @keyframes edu-barGrow  { from{width:0%} to{width:100%} }
        .edu-card  { transition:transform .32s cubic-bezier(.23,1,.32,1),box-shadow .32s ease,border-color .32s ease; }
        .edu-card:hover { transform:translateY(-7px) scale(1.012); }
        .edu-stat-pill { transition:transform .28s cubic-bezier(.23,1,.32,1),box-shadow .28s ease; }
        .edu-stat-pill:hover { transform:translateY(-5px) scale(1.05); }
        .edu-tag-chip  { transition:transform .22s ease,border-color .22s ease,color .22s ease; }
        .edu-tag-chip:hover { transform:translateY(-2px); }
      `}</style>

      <div className="edu-wrap" style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* orbs */}
        <Orb style={{width:500,height:500,background:"radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%)",top:-120,left:-160,animation:"edu-orbDrift 14s ease-in-out infinite"}}/>
        <Orb style={{width:360,height:360,background:"radial-gradient(circle,rgba(16,185,129,.1) 0%,transparent 70%)",bottom:-80,right:-90,animation:"edu-orbDrift 19s ease-in-out infinite reverse"}}/>
        <Orb style={{width:240,height:240,background:"radial-gradient(circle,rgba(139,92,246,.08) 0%,transparent 70%)",top:"42%",left:"52%",animation:"edu-orbDrift 23s ease-in-out infinite 4s"}}/>

        {/* particles */}
        <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>

        {/* scan line */}
        <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(99,102,241,.28),transparent)",animation:"edu-scanMove 7s linear infinite",pointerEvents:"none",zIndex:1}}/>

        {/* grid lines */}
        {[...Array(9)].map((_,i)=>(
          <div key={i} style={{position:"absolute",left:0,right:0,top:`${(i+1)*10}%`,height:1,background:"rgba(99,102,241,.032)",pointerEvents:"none"}}/>
        ))}

        {/* content */}
        <div style={{position:"relative",zIndex:2,maxWidth:860,margin:"0 auto"}}>

          {/* Header */}
          <div style={{textAlign:"center",marginBottom:52,opacity:vis?1:0,animation:vis?"edu-fadeUp .7s ease both":"none"}}>
            <div style={{display:"inline-block",border:"1px solid rgba(99,102,241,.35)",borderRadius:3,padding:"4px 18px",marginBottom:16,background:"rgba(99,102,241,.07)"}}>
              <span style={{fontFamily:"var(--font-orbitron), monospace",fontSize:10,color:"#818cf8",letterSpacing:4,textTransform:"uppercase"}}>SYS://ACADEMIC_LOG</span>
            </div>

            <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
              <div style={{width:64,height:64,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:"0 0 24px rgba(99,102,241,.45)"}}>🎓</div>
            </div>

            <h2 style={{fontFamily:"var(--font-orbitron), monospace",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,margin:"0 0 8px",lineHeight:1.1}}>
              <span style={{background:"linear-gradient(90deg,#fff 0%,#818cf8 35%,#06b6d4 65%,#fff 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"edu-shimmer 4s linear infinite"}}>EDUCATION</span>
            </h2>
            <p style={{fontFamily:"var(--font-rajdhani), sans-serif",fontSize:"clamp(.9rem,2vw,1.05rem)",color:"rgba(255,255,255,.4)",marginBottom:14,letterSpacing:1}}>Academic Journey &amp; Qualifications</p>

            <div style={{display:"flex",justifyContent:"center",gap:6,alignItems:"center"}}>
              <div style={{width:36,height:1,background:"rgba(99,102,241,.5)"}}/>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#818cf8",boxShadow:"0 0 10px #818cf8",animation:"edu-blink 1.6s ease-in-out infinite"}}/>
              <div style={{width:36,height:1,background:"rgba(99,102,241,.5)"}}/>
            </div>
          </div>

          {/* Cards */}
          <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:28}}>
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="edu-card"
                onMouseEnter={()=>setHovCard(index)}
                onMouseLeave={()=>setHovCard(null)}
                style={{
                  background:"linear-gradient(135deg,rgba(10,14,40,.97),rgba(6,10,28,.99))",
                  borderRadius:16,
                  border:`1px solid ${hovCard===index?`${edu.color}55`:"rgba(99,102,241,.18)"}`,
                  boxShadow: hovCard===index
                    ? `0 0 40px ${edu.color}22, 0 20px 60px rgba(0,0,0,.65), inset 0 1px 0 rgba(255,255,255,.04)`
                    : "0 0 40px rgba(99,102,241,.06), 0 20px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.03)",
                  overflow:"hidden", position:"relative",
                  opacity:vis?1:0,
                  animation:vis?`edu-fadeUp .8s ease ${.2+index*.18}s both`:"none",
                }}
              >
                <div style={{height:3,background:`linear-gradient(90deg,${edu.color},${edu.colorB},${edu.color})`,backgroundSize:"200% 100%",animation:"edu-shimmer 3s linear infinite"}}/>

                {[{top:10,left:10},{top:10,right:10},{bottom:10,left:10},{bottom:10,right:10}].map((pos,ci)=>(
                  <div key={ci} style={{
                    position:"absolute",width:11,height:11,
                    borderTop:ci<2?`1.5px solid ${edu.color}88`:"none",
                    borderBottom:ci>=2?`1.5px solid ${edu.color}88`:"none",
                    borderLeft:ci%2===0?`1.5px solid ${edu.color}88`:"none",
                    borderRight:ci%2===1?`1.5px solid ${edu.color}88`:"none",
                    animation:"edu-blink 2s ease-in-out infinite",animationDelay:`${ci*.3}s`,...pos,
                  }}/>
                ))}

                <div style={{padding:"clamp(22px,4vw,36px)"}}>
                  <div style={{display:"flex",flexWrap:"wrap",gap:16,alignItems:"flex-start"}}>
                    <div style={{width:60,height:60,borderRadius:12,flexShrink:0,background:`linear-gradient(135deg,${edu.color}33,${edu.colorB}22)`,border:`1px solid ${edu.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,boxShadow:`0 0 16px ${edu.color}30`,transition:"transform .3s ease",transform:hovCard===index?"scale(1.1)":"scale(1)"}}>
                      {edu.icon}
                    </div>

                    <div style={{flex:1,minWidth:200}}>
                      <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:10,marginBottom:12}}>
                        <span style={{fontFamily:"var(--font-orbitron), monospace",fontSize:10,letterSpacing:2,color:"#fff",background:`linear-gradient(90deg,${edu.color},${edu.colorB})`,borderRadius:20,padding:"4px 14px",boxShadow:`0 0 12px ${edu.color}44`,textTransform:"uppercase"}}>{edu.type}</span>
                        <div style={{display:"flex",alignItems:"center",gap:6}}>
                          <span style={{fontSize:13}}>📅</span>
                          <span style={{fontFamily:"var(--font-orbitron), monospace",fontSize:11,color:"rgba(255,255,255,.55)",letterSpacing:1}}>{edu.year}</span>
                        </div>
                      </div>

                      <h3 style={{fontFamily:"var(--font-orbitron), monospace",fontSize:"clamp(1rem,2.5vw,1.3rem)",fontWeight:700,color:"#fff",margin:"0 0 8px",letterSpacing:.8}}>
                        {edu.degree}
                        {edu.field && <span style={{color:"rgba(255,255,255,.55)",fontWeight:400,fontSize:"clamp(.85rem,2vw,1.05rem)"}}> in {edu.field}</span>}
                      </h3>

                      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
                        <span style={{fontSize:13}}>📍</span>
                        <span style={{fontFamily:"var(--font-rajdhani), sans-serif",fontSize:"clamp(.88rem,2vw,1rem)",color:`${edu.color}cc`,fontWeight:600,letterSpacing:.5}}>{edu.institution}</span>
                        {edu.university && <span style={{fontFamily:"var(--font-rajdhani), sans-serif",fontSize:13,color:"rgba(255,255,255,.35)",letterSpacing:.5}}>({edu.university})</span>}
                      </div>

                      <div style={{width:"100%",height:4,borderRadius:4,background:"rgba(255,255,255,.07)",marginBottom:14,overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:4,background:`linear-gradient(90deg,${edu.color},${edu.colorB})`,boxShadow:`0 0 8px ${edu.color}88`,animation:vis?`edu-barGrow 1.4s cubic-bezier(.23,1,.32,1) ${.6+index*.2}s forwards`:"none"}}/>
                      </div>

                      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                        {edu.tags.map((tag,ti)=>(
                          <span key={ti} className="edu-tag-chip" style={{fontFamily:"var(--font-rajdhani), sans-serif",fontWeight:600,fontSize:12,letterSpacing:.8,color:`${edu.color}cc`,background:`${edu.color}10`,border:`1px solid ${edu.color}28`,borderRadius:5,padding:"3px 12px",textTransform:"uppercase",cursor:"default"}}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18,opacity:vis?1:0,animation:vis?"edu-fadeUp .7s ease .6s both":"none"}}>
            <div style={{height:1,flex:1,background:"rgba(99,102,241,.2)"}}/>
            <span style={{fontFamily:"var(--font-orbitron), monospace",fontSize:9,color:"rgba(99,102,241,.7)",letterSpacing:3,textTransform:"uppercase"}}>Academic Stats</span>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#818cf8",boxShadow:"0 0 8px #818cf8",animation:"edu-blink 1.4s ease-in-out infinite"}}/>
            <div style={{height:1,flex:1,background:"rgba(99,102,241,.2)"}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,opacity:vis?1:0,animation:vis?"edu-fadeUp .8s ease .72s both":"none"}}>
            {STATS.map((s,i)=>(
              <div key={i} className="edu-stat-pill"
                onMouseEnter={()=>setHovStat(i)} onMouseLeave={()=>setHovStat(null)}
                style={{background:hovStat===i?"linear-gradient(135deg,rgba(99,102,241,.18),rgba(139,92,246,.1))":"linear-gradient(135deg,rgba(10,14,40,.96),rgba(6,10,28,.99))",borderRadius:14,border:`1px solid ${hovStat===i?`${s.color}55`:"rgba(99,102,241,.18)"}`,padding:"22px 14px",textAlign:"center",cursor:"default",boxShadow:hovStat===i?`0 0 24px ${s.color}25,0 14px 40px rgba(0,0,0,.5)`:"0 8px 28px rgba(0,0,0,.4)"}}>
                <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
                <div style={{fontFamily:"var(--font-orbitron), monospace",fontSize:"clamp(1.4rem,4vw,2rem)",fontWeight:900,color:hovStat===i?s.color:"#fff",marginBottom:4}}>{s.value}</div>
                <div style={{fontFamily:"var(--font-rajdhani), sans-serif",fontSize:12,color:"rgba(255,255,255,.38)",letterSpacing:2,textTransform:"uppercase"}}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* HUD footer */}
          <div style={{marginTop:26,display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap",opacity:vis?1:0,animation:vis?"edu-fadeUp .7s ease .9s both":"none"}}>
            {[["RECORDS","02"],["FIELD","ELECTRONICS"],["STATUS","CERTIFIED"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",gap:6,alignItems:"center"}}>
                <span style={{fontFamily:"var(--font-orbitron), monospace",fontSize:9,color:"rgba(255,255,255,.22)",letterSpacing:2}}>{k}:</span>
                <span style={{fontFamily:"var(--font-orbitron), monospace",fontSize:9,color:"rgba(99,102,241,.7)",letterSpacing:2}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}