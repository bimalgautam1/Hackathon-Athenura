import { useEffect, useRef, useState, Fragment } from "react";

/* ── Animated particle canvas ── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId, W, H;
    const COUNT = 70;
    const pts = [];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    function rand(a, b) {
      return a + Math.random() * (b - a);
    }

    function init() {
      pts.length = 0;
      for (let i = 0; i < COUNT; i++) {
        pts.push({
          x: rand(0, W),
          y: rand(0, H),
          r: rand(0.8, 2.4),
          vx: rand(-0.15, 0.15),
          vy: rand(-0.25, -0.05),
          alpha: rand(0.1, 0.5),
          da: rand(-0.004, 0.004),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0.04, Math.min(0.55, p.alpha + p.da));
        if (p.y < -4) {
          p.y = H + 4;
          p.x = rand(0, W);
        }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,216,${p.alpha})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,180,216,${0.1 * (1 - d / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();
    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * num));
      if (p < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  const fmt = target.includes(".")
    ? val.toLocaleString()
    : val.toLocaleString();
  return (
    <>
      {fmt}
      {suffix}
    </>
  );
}

const STATS = [
  { value: "250", suffix: "K+", label: "Participants" },
  { value: "50", suffix: "+", label: "Countries" },
  { value: "2", suffix: "M+", label: "Prize Pool $" },
  { value: "1200", suffix: "+", label: "Projects Built" },
];

const FEATURES = [
  {
    icon: "🚀",
    title: "Find Hackathons",
    desc: "Filter by domain, prize, mode & more",
    color: "#0077B6",
  },
  {
    icon: "👥",
    title: "Build Your Team",
    desc: "Solo or team up with brilliant minds",
    color: "#00B4D8",
  },
  {
    icon: "⚡",
    title: "Live Updates",
    desc: "Real-time notifications for every milestone",
    color: "#0077B6",
  },
  {
    icon: "🏅",
    title: "Win Big Prizes",
    desc: "Cash, swag, and career opportunities",
    color: "#00B4D8",
  },
];

const TAGS = [
  "#AI",
  "#Web3",
  "#FinTech",
  "#HealthTech",
  "#Sustainability",
  "#Gaming",
  "#OpenSource",
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [tagIdx, setTagIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setTagIdx((i) => (i + 1) % TAGS.length), 2000);
    return () => clearInterval(iv);
  }, []);

  const anim = (delay = 0, axis = "Y") => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translate(0,0)"
      : axis === "Y"
        ? "translateY(22px)"
        : "translateX(28px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        /* ── Palette ──
           #03045E  deep navy
           #0077B6  ocean blue
           #00B4D8  sky blue
           #90E0EF  light cyan
           #CAF0F8  pale ice
        */

        .hero-root {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding-top: 68px;
          font-family: 'Poppins', sans-serif;
          background: #020338;
        }

        /* ── Multi-layer background ── */
        .hero-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }

        /* deep gradient base */
        .hero-bg-grad {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 70% 0%, rgba(0,119,182,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 10% 90%, rgba(0,180,216,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(3,4,94,0.4) 0%, transparent 70%),
            linear-gradient(160deg, #020338 0%, #030557 40%, #021630 100%);
        }

        /* animated aurora strips */
        .hero-aurora {
          position: absolute; inset: 0;
          background:
            linear-gradient(105deg, transparent 30%, rgba(0,119,182,0.07) 50%, transparent 70%),
            linear-gradient(250deg, transparent 40%, rgba(0,180,216,0.06) 55%, transparent 75%);
          animation: aurora-shift 8s ease-in-out infinite alternate;
        }
        @keyframes aurora-shift {
          from { transform: skewX(-2deg) scaleX(1); opacity: 0.7; }
          to   { transform: skewX(2deg) scaleX(1.06); opacity: 1; }
        }

        /* dot grid */
        .hero-dots {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(144,224,239,0.07) 1px, transparent 1px);
          background-size: 38px 38px;
        }

        /* glowing orbs */
        .hero-orb {
          position: absolute; border-radius: 50%; filter: blur(60px);
        }
        .hero-orb-1 {
          top: -120px; right: -60px;
          width: 600px; height: 600px;
          background: radial-gradient(circle at 40% 40%, rgba(0,119,182,0.3) 0%, transparent 65%);
          animation: orb-drift 12s ease-in-out infinite alternate;
        }
        .hero-orb-2 {
          bottom: -80px; left: -80px;
          width: 480px; height: 480px;
          background: radial-gradient(circle at 55% 55%, rgba(0,180,216,0.2) 0%, transparent 65%);
          animation: orb-drift 15s ease-in-out infinite alternate-reverse;
        }
        .hero-orb-3 {
          top: 35%; left: 40%;
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(0,150,200,0.12) 0%, transparent 70%);
          filter: blur(40px);
          animation: orb-drift 9s ease-in-out infinite alternate;
        }
        @keyframes orb-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(20px, 30px) scale(1.08); }
        }

        /* horizontal glow line */
        .hero-glow-line {
          position: absolute; top: 42%; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent 0%, rgba(0,119,182,0.25) 25%,
            rgba(0,180,216,0.55) 50%, rgba(0,119,182,0.25) 75%, transparent 100%);
        }

        /* ── Layout ── */
        .hero-content {
          position: relative; z-index: 2;
          max-width: 1240px; margin: 0 auto;
          padding: 80px 48px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 72px;
          align-items: center;
          width: 100%;
        }

        /* ── Eyebrow tag ── */
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(0,119,182,0.15);
          border: 1px solid rgba(0,180,216,0.3);
          border-radius: 100px;
          padding: 6px 16px 6px 10px;
          margin-bottom: 28px;
          width: fit-content;
        }

        .hero-eyebrow-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #00B4D8;
          box-shadow: 0 0 0 3px rgba(0,180,216,0.22), 0 0 12px rgba(0,180,216,0.5);
          animation: live-ring 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes live-ring {
          0%,100% { box-shadow: 0 0 0 3px rgba(0,180,216,0.22), 0 0 8px rgba(0,180,216,0.4); }
          50%      { box-shadow: 0 0 0 7px rgba(0,180,216,0.06), 0 0 18px rgba(0,180,216,0.25); }
        }

        .hero-eyebrow-text {
          font-size: 12px; font-weight: 700;
          color: #90E0EF; letter-spacing: 0.08em; text-transform: uppercase;
        }

        /* ── Headline ── */
        .hero-h1 {
          font-family: 'Nunito', sans-serif;
          font-size: clamp(44px, 5.5vw, 72px);
          font-weight: 800;
          line-height: 1.03;
          letter-spacing: -2px;
          color: #ffffff;
          margin: 0 0 24px;
        }

        .hero-h1-line2 {
          display: block;
          background: linear-gradient(135deg, #90E0EF 0%, #00B4D8 40%, #0077B6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .hero-h1-line2::after {
          content: '';
          position: absolute; bottom: -6px; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, #0077B6, #00B4D8, transparent);
          border-radius: 2px;
          opacity: 0.5;
        }

        /* rotating tag chip */
        .hero-tag-chip {
          display: inline-flex; align-items: center;
          background: rgba(0,180,216,0.12);
          border: 1px solid rgba(0,180,216,0.25);
          border-radius: 8px;
          padding: 2px 10px;
          font-size: clamp(28px, 3.5vw, 46px);
          font-family: 'Nunito', sans-serif; font-weight: 800;
          letter-spacing: -1px;
          color: #00B4D8;
          transition: all 0.35s ease;
          margin: 0 6px;
          vertical-align: middle;
        }

        /* ── Sub-headline ── */
        .hero-sub {
          font-size: 16px; font-weight: 400;
          color: rgba(144,224,239,0.65);
          line-height: 1.75;
          max-width: 480px;
          margin: 0 0 36px;
        }

        .hero-sub strong { color: #90E0EF; font-weight: 600; }

        /* ── CTA buttons ── */
        .hero-ctas {
          display: flex; align-items: center; gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 52px;
        }

        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 30px; border-radius: 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px; font-weight: 700;
          color: #ffffff;
          background: linear-gradient(135deg, #0077B6 0%, #00B4D8 100%);
          border: none; cursor: pointer; text-decoration: none;
          letter-spacing: -0.2px;
          box-shadow: 0 4px 24px rgba(0,180,216,0.35), 0 0 0 1px rgba(0,180,216,0.2);
          position: relative; overflow: hidden;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .hero-btn-primary::before {
          content: '';
          position: absolute; top: 0; left: -100%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.4s ease;
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,180,216,0.5), 0 0 0 1px rgba(0,180,216,0.3);
        }

        .hero-btn-primary:hover::before { left: 150%; }

        .hero-btn-arrow {
          font-size: 18px;
          transition: transform 0.18s ease;
        }
        .hero-btn-primary:hover .hero-btn-arrow { transform: translateX(4px); }

        .hero-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 14px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px; font-weight: 600;
          color: rgba(202,240,248,0.8);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(144,224,239,0.2);
          cursor: pointer; text-decoration: none;
          letter-spacing: -0.2px;
          transition: all 0.18s ease;
        }

        .hero-btn-secondary:hover {
          color: #CAF0F8;
          border-color: rgba(0,180,216,0.45);
          background: rgba(0,119,182,0.1);
          transform: translateY(-2px);
        }

        /* ── Stats row ── */
        .hero-stats {
          display: flex; flex-wrap: wrap; gap: 0;
          border-top: 1px solid rgba(0,180,216,0.1);
          padding-top: 0;
        }

        .hero-stat {
          display: flex; flex-direction: column; gap: 3px;
          padding: 20px 28px 20px 0;
          position: relative;
        }

        .hero-stat + .hero-stat {
          padding-left: 28px;
          border-left: 1px solid rgba(0,180,216,0.12);
        }

        .hero-stat-val {
          font-family: 'Nunito', sans-serif;
          font-size: 26px; font-weight: 800;
          color: #ffffff;
          letter-spacing: -1px; line-height: 1;
          background: linear-gradient(135deg, #fff 0%, #90E0EF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-stat-label {
          font-size: 11.5px; font-weight: 600;
          color: rgba(144,224,239,0.45);
          text-transform: uppercase; letter-spacing: 0.1em;
        }

        /* ── RIGHT PANEL ── */
        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* featured card */
        .hero-featured {
          position: relative;
          background: linear-gradient(135deg, rgba(0,119,182,0.18) 0%, rgba(0,180,216,0.1) 100%);
          border: 1px solid rgba(0,180,216,0.22);
          border-radius: 20px;
          padding: 24px 26px;
          overflow: hidden;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .hero-featured:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 50px rgba(0,119,182,0.3);
        }

        .hero-featured-shine {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,180,216,0.6), transparent);
        }

        .hero-featured-glow {
          position: absolute; top: -40px; right: -40px;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(0,180,216,0.08);
          filter: blur(30px);
          pointer-events: none;
        }

        .hero-featured-head {
          display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
        }

        .hero-featured-icon {
          font-size: 36px;
          filter: drop-shadow(0 4px 12px rgba(0,180,216,0.5));
          flex-shrink: 0;
        }

        .hero-featured-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: rgba(0,180,216,0.15);
          border: 1px solid rgba(0,180,216,0.3);
          border-radius: 20px; padding: 3px 10px;
          font-size: 11px; font-weight: 700; color: #00B4D8;
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .hero-featured-title {
          font-family: 'Nunito', sans-serif;
          font-size: 20px; font-weight: 800;
          color: #ffffff; letter-spacing: -0.5px;
          margin: 4px 0 4px;
        }

        .hero-featured-meta {
          font-size: 13px; color: rgba(144,224,239,0.6);
        }

        .hero-progress-wrap {
          margin-top: 14px;
        }

        .hero-progress-info {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
        }

        .hero-progress-info span {
          font-size: 12px; font-weight: 600; color: rgba(144,224,239,0.55);
          text-transform: uppercase; letter-spacing: 0.06em;
        }

        .hero-progress-pct {
          font-size: 13px !important; font-weight: 700 !important;
          color: #00B4D8 !important; letter-spacing: 0 !important;
          text-transform: none !important;
        }

        .hero-progress-track {
          height: 5px; border-radius: 4px;
          background: rgba(144,224,239,0.1);
          overflow: hidden;
        }

        .hero-progress-fill {
          height: 100%; border-radius: 4px;
          background: linear-gradient(90deg, #03045E, #0077B6, #00B4D8, #90E0EF);
          background-size: 200% 100%;
          animation: hw-prog 2.8s ease-in-out infinite alternate, hw-shimmer 2s linear infinite;
          width: 72%;
        }

        @keyframes hw-prog {
          from { width: 58%; }
          to   { width: 80%; }
        }

        @keyframes hw-shimmer {
          from { background-position: 100% 0; }
          to   { background-position: 0% 0; }
        }

        /* feature mini-cards grid */
        .hero-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .hero-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(0,180,216,0.1);
          border-radius: 16px;
          padding: 20px 18px;
          overflow: hidden;
          transition: all 0.22s ease;
          cursor: default;
        }

        .hero-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,180,216,0.3), transparent);
          opacity: 0; transition: opacity 0.22s ease;
        }

        .hero-card:hover {
          background: rgba(0,119,182,0.08);
          border-color: rgba(0,180,216,0.28);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,119,182,0.2);
        }

        .hero-card:hover::before { opacity: 1; }

        .hero-card-icon {
          font-size: 26px; margin-bottom: 12px; display: block;
          filter: drop-shadow(0 2px 8px rgba(0,180,216,0.45));
        }

        .hero-card-title {
          font-family: 'Nunito', sans-serif;
          font-size: 13.5px; font-weight: 700; color: #CAF0F8;
          margin: 0 0 5px; letter-spacing: -0.2px;
        }

        .hero-card-desc {
          font-size: 12px; color: rgba(144,224,239,0.5);
          line-height: 1.55; margin: 0;
        }

        /* ── Scroll indicator ── */
        .hero-scroll {
          position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
          z-index: 3;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0.4;
        }

        .hero-scroll span {
          font-size: 11px; color: #90E0EF; letter-spacing: 0.12em;
          text-transform: uppercase; font-weight: 600;
        }

        .hero-scroll-line {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, rgba(0,180,216,0.6), transparent);
          animation: scroll-pulse 1.8s ease-in-out infinite;
        }

        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .hero-content {
            grid-template-columns: 1fr;
            padding: 60px 32px;
            gap: 56px;
          }
          .hero-h1 { font-size: clamp(40px, 9vw, 60px); }
        }

        @media (max-width: 540px) {
          .hero-content { padding: 48px 20px; }
          .hero-ctas { flex-direction: column; }
          .hero-btn-primary, .hero-btn-secondary { justify-content: center; }
          .hero-cards { grid-template-columns: 1fr; }
          .hero-stat + .hero-stat { border-left: none; padding-left: 0; }
        }
      `}</style>

      <section className="hero-root">
        {/* Background */}
        <div className="hero-bg">
          <div className="hero-bg-grad" />
          <div className="hero-aurora" />
          <div className="hero-dots" />
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
          <div className="hero-glow-line" />
        </div>

        <ParticleField />

        <div className="hero-content">
          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Eyebrow */}
            <div className="hero-eyebrow" style={anim(0)}>
              <div className="hero-eyebrow-dot" />
              <span className="hero-eyebrow-text">
                12 Hackathons Live Right Now
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-h1" style={anim(0.1)}>
              Compete, Build &amp;
              <br />
              <span className="hero-h1-line2">Win Together</span>
            </h1>

            {/* Animated tag */}
            <div
              style={{
                ...anim(0.15),
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(144,224,239,0.5)",
                  fontWeight: 600,
                }}
              >
                Trending now:
              </span>
              <span className="hero-tag-chip" key={tagIdx}>
                {TAGS[tagIdx]}
              </span>
            </div>

            {/* Sub */}
            <p className="hero-sub" style={anim(0.2)}>
              Discover world-class hackathons, form your dream team, and turn
              ideas into products. Join <strong>250K+ innovators</strong>{" "}
              already competing on HackWave — the world's fastest-growing
              hackathon platform.
            </p>

            {/* CTAs */}
            <div className="hero-ctas" style={anim(0.28)}>
              <a href="/hackathons" className="hero-btn-primary">
                <span>Explore Hackathons</span>
                <span className="hero-btn-arrow">→</span>
              </a>
              <a href="/host" className="hero-btn-secondary">
                🎯 Host a Hackathon
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats" style={anim(0.38)}>
              {STATS.map((s, i) => (
                <div className="hero-stat" key={s.label}>
                  <span className="hero-stat-val">
                    {visible && <Counter target={s.value} suffix={s.suffix} />}
                  </span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            className="hero-right"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.65s ease 0.3s, transform 0.65s ease 0.3s",
            }}
          >
            {/* Featured hackathon card */}
            <div className="hero-featured">
              <div className="hero-featured-shine" />
              <div className="hero-featured-glow" />
              <div className="hero-featured-head">
                <span className="hero-featured-icon">🔥</span>
                <div>
                  <span className="hero-featured-badge">
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#00B4D8",
                        display: "inline-block",
                        animation: "live-ring 1.8s ease-in-out infinite",
                      }}
                    />
                    Featured · Ends in 14h
                  </span>
                  <h3 className="hero-featured-title">
                    Global AI Challenge 2025
                  </h3>
                  <p className="hero-featured-meta">
                    $50K prize pool · 4,200 participants joined
                  </p>
                </div>
              </div>
              <div className="hero-progress-wrap">
                <div className="hero-progress-info">
                  <span>Spots filled</span>
                  <span className="hero-progress-pct">72%</span>
                </div>
                <div className="hero-progress-track">
                  <div className="hero-progress-fill" />
                </div>
              </div>
            </div>

            {/* Feature mini-cards */}
            <div className="hero-cards">
              {FEATURES.map((f) => (
                <div className="hero-card" key={f.title}>
                  <span className="hero-card-icon">{f.icon}</span>
                  <h4 className="hero-card-title">{f.title}</h4>
                  <p className="hero-card-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}
