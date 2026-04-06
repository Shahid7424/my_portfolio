"use client";
import { useEffect, useRef, useState } from "react";

// ── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "2+",   label: "Years XP",      icon: "⚡" },
  { value: "15+",  label: "Projects",      icon: "🚀" },
  { value: "99.5", label: "% Uptime",      icon: "🔗" },
  { value: "30",   label: "% Perf Gain",   icon: "📈" },
];

const EXPERTISE = [
  { cat: "Frontend",    tags: ["React.js", "Next.js", "TypeScript", "JavaScript", "Redux"],                color: "#6366f1" },
  { cat: "Styling/UI",  tags: ["TailwindCSS", "Bootstrap", "Shadcn/ui", "Aceternity/ui"],                 color: "#06b6d4" },
  { cat: "Backend/DB",  tags: ["Node.js", "MongoDB", "MySQL", "REST APIs"],                               color: "#10b981" },
  { cat: "Cloud",       tags: ["AWS EC2", "AWS S3", "Vercel", "Hostinger", "CI/CD"],                      color: "#f59e0b" },
  { cat: "Tools",       tags: ["GitHub", "Figma", "Postman", "Docker", "VS Code"],                        color: "#ec4899" },
];

const FREELANCE = [
  { icon: "💼", title: "Custom Web Apps",       desc: "Full-stack React / Next.js applications tailored to your business logic." },
  { icon: "🎨", title: "UI/UX Implementation",  desc: "Pixel-perfect, responsive interfaces from Figma designs to production." },
  { icon: "⚙️", title: "Performance Audits",    desc: "Lighthouse-driven optimisations — lazy loading, code-splitting, caching." },
  { icon: "☁️", title: "Deployment & DevOps",   desc: "AWS + Vercel pipelines with CI/CD so you ship faster and safer." },
];

// ── Tiny helpers ─────────────────────────────────────────────────────────────
function Orb({ style }) {
  return (
    <div style={{ position:"absolute", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none", ...style }} />
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export default function About() {
  const canvasRef  = useRef(null);
  const [vis, setVis] = useState(false);
  const [hovStat, setHovStat]   = useState(null);
  const [hovFreel, setHovFreel] = useState(null);

  // particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const N = 45;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35, r: Math.random()*1.4+.4,
    }));
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (let i=0;i<N;i++){
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle="rgba(99,102,241,0.45)"; ctx.fill();
        for(let j=i+1;j<N;j++){
          const q=pts[j], dx=p.x-q.x, dy=p.y-q.y, d=Math.sqrt(dx*dx+dy*dy);
          if(d<100){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=`rgba(99,102,241,${.1*(1-d/100)})`; ctx.lineWidth=.5; ctx.stroke(); }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    setTimeout(()=>setVis(true),80);
    return ()=>{ cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  },[]);

  return (
    <section style={{
      minHeight:"100vh", background:"#05080f", position:"relative",
      overflow:"hidden", padding:"64px 16px",
      fontFamily:"'Rajdhani','Orbitron',sans-serif",
    }}>
      {/* ── fonts & keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes orbDrift { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(25px,-18px) scale(1.08)} 70%{transform:translate(-15px,12px) scale(.95)} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:.25} }
        @keyframes scanMove { 0%{transform:translateY(-100%)} 100%{transform:translateY(120vh)} }
        @keyframes tagFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .stat-card:hover  { transform:translateY(-6px) scale(1.04); box-shadow:0 0 30px rgba(99,102,241,.35),0 16px 40px rgba(0,0,0,.5)!important; }
        .freel-card:hover { transform:translateY(-5px); border-color:rgba(99,102,241,.45)!important; box-shadow:0 0 24px rgba(99,102,241,.2)!important; }
        .skill-tag:hover  { border-color:rgba(255,255,255,.4)!important; color:#fff!important; transform:translateY(-2px); }
        .stat-card,.freel-card,.skill-tag { transition:all .28s cubic-bezier(.23,1,.32,1); }
      `}</style>

      {/* ── background orbs ── */}
      <Orb style={{width:520,height:520,background:"radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 70%)",top:-130,left:-160,animation:"orbDrift 14s ease-in-out infinite"}}/>
      <Orb style={{width:380,height:380,background:"radial-gradient(circle,rgba(6,182,212,.1) 0%,transparent 70%)",bottom:-80,right:-100,animation:"orbDrift 18s ease-in-out infinite reverse"}}/>
      <Orb style={{width:260,height:260,background:"radial-gradient(circle,rgba(16,185,129,.08) 0%,transparent 70%)",top:"45%",left:"55%",animation:"orbDrift 22s ease-in-out infinite 5s"}}/>

      {/* ── particles ── */}
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>

      {/* ── scan line ── */}
      <div style={{position:"absolute",left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(99,102,241,.3),transparent)",animation:"scanMove 7s linear infinite",pointerEvents:"none",zIndex:1}}/>

      {/* ── grid lines ── */}
      {[...Array(9)].map((_,i)=>(
        <div key={i} style={{position:"absolute",left:0,right:0,top:`${(i+1)*10}%`,height:1,background:"rgba(99,102,241,.035)",pointerEvents:"none"}}/>
      ))}

      {/* ── content ── */}
      <div style={{position:"relative",zIndex:2,maxWidth:920,margin:"0 auto"}}>

        {/* Section header */}
        <div style={{textAlign:"center",marginBottom:52,opacity:vis?1:0,animation:vis?"fadeUp .7s ease both":"none"}}>
          <div style={{display:"inline-block",border:"1px solid rgba(99,102,241,.35)",borderRadius:3,padding:"4px 18px",marginBottom:16,background:"rgba(99,102,241,.07)"}}>
            <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:10,color:"#818cf8",letterSpacing:4,textTransform:"uppercase"}}>SYS://IDENTITY</span>
          </div>
          <h2 style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:900,margin:"0 0 14px",lineHeight:1.1}}>
            <span style={{background:"linear-gradient(90deg,#fff 0%,#818cf8 35%,#06b6d4 65%,#fff 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"shimmer 4s linear infinite"}}>ABOUT ME</span>
          </h2>
          <div style={{display:"flex",justifyContent:"center",gap:6,alignItems:"center"}}>
            <div style={{width:36,height:1,background:"rgba(99,102,241,.5)"}}/>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#818cf8",boxShadow:"0 0 10px #818cf8",animation:"blink 1.6s ease-in-out infinite"}}/>
            <div style={{width:36,height:1,background:"rgba(99,102,241,.5)"}}/>
          </div>
        </div>

        {/* ── Bio + Stats ── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr",gap:24,marginBottom:24}}>

          {/* Bio card */}
          <div style={{
            background:"linear-gradient(135deg,rgba(10,14,40,.96),rgba(6,10,28,.99))",
            borderRadius:16,border:"1px solid rgba(99,102,241,.22)",
            boxShadow:"0 0 50px rgba(99,102,241,.08),0 24px 64px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.04)",
            overflow:"hidden",
            opacity:vis?1:0,animation:vis?"fadeUp .8s ease .15s both":"none",
          }}>
            <div style={{height:3,background:"linear-gradient(90deg,#6366f1,#06b6d4,#10b981,#6366f1)",backgroundSize:"200% 100%",animation:"shimmer 3s linear infinite"}}/>
            <div style={{padding:"clamp(24px,4vw,40px)"}}>

              {/* avatar row */}
              <div style={{display:"flex",flexWrap:"wrap",gap:20,alignItems:"center",marginBottom:28}}>
                {/* avatar placeholder */}
                <div style={{width:72,height:72,borderRadius:14,background:"linear-gradient(135deg,rgba(99,102,241,.25),rgba(6,182,212,.15))",border:"1px solid rgba(99,102,241,.35)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:32,boxShadow:"0 0 20px rgba(99,102,241,.2)"}}>
                  👨‍💻
                </div>
                <div>
                  <p style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(.75rem,2vw,.9rem)",color:"rgba(99,102,241,.8)",letterSpacing:2,margin:"0 0 4px",textTransform:"uppercase"}}>Software Developer &amp; Freelancer</p>
                  <h3 style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(1.1rem,3vw,1.5rem)",fontWeight:700,color:"#fff",margin:0,letterSpacing:1}}>
                    Full-Stack Frontend Engineer
                  </h3>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:"#00ff88",boxShadow:"0 0 8px #00ff88",animation:"blink 1.2s ease-in-out infinite"}}/>
                    <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:10,color:"#00ff88",letterSpacing:2}}>AVAILABLE FOR FREELANCE</span>
                  </div>
                </div>
              </div>

              {/* bio text */}
              <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(.95rem,2vw,1.08rem)",color:"rgba(255,255,255,.62)",lineHeight:1.75,margin:"0 0 18px",fontWeight:400}}>
                I'm a passionate <span style={{color:"#818cf8",fontWeight:600}}>Software Developer</span> based in Pune, India, currently building production-grade applications at <span style={{color:"#06b6d4",fontWeight:600}}>AIN Software Solution</span>. I craft immersive, performant web experiences using React, Next.js and modern UI libraries — turning complex problems into clean, intuitive interfaces.
              </p>
              <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(.9rem,2vw,1.02rem)",color:"rgba(255,255,255,.5)",lineHeight:1.75,margin:0}}>
                Beyond my day job I take on <span style={{color:"#10b981",fontWeight:600}}>freelance projects</span> — from MVPs for startups to performance audits and AWS deployments. If you have an idea, let's build it together.
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,opacity:vis?1:0,animation:vis?"fadeUp .8s ease .3s both":"none"}}>
            {STATS.map((s,i)=>(
              <div
                key={i}
                className="stat-card" id="about"
                onMouseEnter={()=>setHovStat(i)}
                onMouseLeave={()=>setHovStat(null)}
                style={{
                  background:hovStat===i?"linear-gradient(135deg,rgba(99,102,241,.18),rgba(6,182,212,.1))":"linear-gradient(135deg,rgba(10,14,40,.95),rgba(6,10,28,.98))",
                  borderRadius:14,border:`1px solid ${hovStat===i?"rgba(99,102,241,.45)":"rgba(99,102,241,.18)"}`,
                  padding:"20px 18px",textAlign:"center",cursor:"default",
                  boxShadow:"0 8px 32px rgba(0,0,0,.4)",
                }}
              >
                <div style={{fontSize:24,marginBottom:6}}>{s.icon}</div>
                <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(1.4rem,4vw,2rem)",fontWeight:900,color:hovStat===i?"#818cf8":"#fff",marginBottom:4}}>
                  {s.value}{s.label.includes("%")?"":""} 
                </div>
                <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:12,color:"rgba(255,255,255,.4)",letterSpacing:2,textTransform:"uppercase"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skill Constellation ── */}
        <div style={{
          background:"linear-gradient(135deg,rgba(10,14,40,.96),rgba(6,10,28,.99))",
          borderRadius:16,border:"1px solid rgba(6,182,212,.2)",
          boxShadow:"0 0 40px rgba(6,182,212,.06),0 20px 60px rgba(0,0,0,.6)",
          overflow:"hidden",marginBottom:24,
          opacity:vis?1:0,animation:vis?"fadeUp .8s ease .45s both":"none",
        }}>
          <div style={{height:3,background:"linear-gradient(90deg,#06b6d4,#6366f1,#10b981,#06b6d4)",backgroundSize:"200% 100%",animation:"shimmer 3.5s linear infinite"}}/>
          <div style={{padding:"clamp(22px,4vw,38px)"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:24}}>
              <div style={{width:3,height:24,background:"linear-gradient(180deg,#06b6d4,#6366f1)",borderRadius:2}}/>
              <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(.8rem,2vw,.95rem)",fontWeight:700,color:"#fff",letterSpacing:2,textTransform:"uppercase"}}>Skill Matrix</span>
              <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:9,color:"rgba(6,182,212,.6)",letterSpacing:2,marginLeft:4}}>// ALL SYSTEMS</span>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {EXPERTISE.map((cat,ci)=>(
                <div key={ci} style={{display:"flex",flexWrap:"wrap",gap:10,alignItems:"center"}}>
                  <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:9,color:cat.color,letterSpacing:2,textTransform:"uppercase",minWidth:72,opacity:.8}}>{cat.cat}</span>
                  <div style={{width:1,height:16,background:"rgba(255,255,255,.1)"}}/>
                  <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                    {cat.tags.map((t,ti)=>(
                      <span key={ti} className="skill-tag" style={{
                        fontFamily:"'Rajdhani',sans-serif",fontWeight:600,
                        fontSize:"clamp(.78rem,1.8vw,.88rem)",
                        color:`${cat.color}cc`,
                        background:`${cat.color}12`,
                        border:`1px solid ${cat.color}30`,
                        borderRadius:5,padding:"4px 12px",
                        letterSpacing:.8,cursor:"default",
                        animation:`tagFloat ${2.5+ti*.3}s ease-in-out infinite`,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Freelance Services ── */}
        <div style={{opacity:vis?1:0,animation:vis?"fadeUp .8s ease .6s both":"none"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <div style={{height:1,flex:1,background:"rgba(16,185,129,.2)"}}/>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:10,color:"#10b981",letterSpacing:3,textTransform:"uppercase"}}>Freelance Services</div>
            <div style={{width:7,height:7,borderRadius:"50%",background:"#10b981",boxShadow:"0 0 8px #10b981",animation:"blink 1.4s ease-in-out infinite"}}/>
            <div style={{height:1,flex:1,background:"rgba(16,185,129,.2)"}}/>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
            {FREELANCE.map((f,i)=>(
              <div
                key={i}
                className="freel-card"
                onMouseEnter={()=>setHovFreel(i)}
                onMouseLeave={()=>setHovFreel(null)}
                style={{
                  background:"linear-gradient(135deg,rgba(10,14,40,.96),rgba(6,10,28,.99))",
                  borderRadius:14,border:`1px solid ${hovFreel===i?"rgba(16,185,129,.4)":"rgba(16,185,129,.15)"}`,
                  padding:"22px 20px",cursor:"default",
                  boxShadow:"0 8px 28px rgba(0,0,0,.45)",
                  opacity:vis?1:0,
                  animation:vis?`fadeUp .6s ease ${.7+i*.1}s both`:"none",
                }}
              >
                <div style={{fontSize:26,marginBottom:10}}>{f.icon}</div>
                <h4 style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(.75rem,2vw,.85rem)",fontWeight:700,color:hovFreel===i?"#6ee7b7":"#fff",margin:"0 0 8px",letterSpacing:.8,textTransform:"uppercase"}}>{f.title}</h4>
                <p style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"clamp(.85rem,1.8vw,.95rem)",color:"rgba(255,255,255,.45)",margin:0,lineHeight:1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── bottom HUD bar ── */}
        <div style={{marginTop:28,display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap",opacity:vis?1:0,animation:vis?"fadeUp .7s ease 1.1s both":"none"}}>
          {[["LOCATION","PUNE, IN"],["STATUS","OPEN TO WORK"],["MODE","FULL-TIME + FREELANCE"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:9,color:"rgba(255,255,255,.22)",letterSpacing:2}}>{k}:</span>
              <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:9,color:"rgba(16,185,129,.7)",letterSpacing:2}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}