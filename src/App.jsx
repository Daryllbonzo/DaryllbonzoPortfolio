import { useEffect, useMemo, useState } from "react";
const [cursor, setCursor] = useState({ x: 0, y: 0 });

useEffect(() => {
  const move = (e) => {
    setCursor({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
}, []);
export default function App() {
  const [progress, setProgress] = useState(0);
  const [dark, setDark] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrolled = window.scrollY / docHeight;
      setProgress(Math.max(0, Math.min(1, scrolled)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chartPath = useMemo(() => {
    const values = [28, 34, 31, 42, 48, 46, 58, 64, 71, 78];
    const animated = values.map((v, i) => {
      const wave = Math.sin(progress * Math.PI * 2 + i * 0.45) * 4;
      const growth = progress * (i * 2.2);
      return Math.max(14, Math.min(88, v + wave + growth));
    });

    return animated
      .map((v, i) => `${i === 0 ? "M" : "L"} ${6 + i * 9.8} ${100 - v}`)
      .join(" ");
  }, [progress]);

  const candles = useMemo(() => {
    return [
      { x: 8, o: 66, c: 58, h: 53, l: 74 },
      { x: 18, o: 62, c: 67, h: 55, l: 73 },
      { x: 28, o: 64, c: 61, h: 56, l: 76 },
      { x: 38, o: 60, c: 71, h: 50, l: 78 },
      { x: 48, o: 70, c: 73, h: 47, l: 79 },
      { x: 58, o: 72, c: 68, h: 52, l: 82 },
      { x: 68, o: 66, c: 79, h: 43, l: 84 },
      { x: 78, o: 78, c: 83, h: 38, l: 88 },
      { x: 88, o: 82, c: 86, h: 33, l: 91 },
    ].map((c, i) => {
      const nudge = Math.sin(progress * Math.PI * 2 + i * 0.55) * 1.8;
      return {
        ...c,
        o: c.o - nudge,
        c: c.c - nudge - progress * 4,
        h: c.h - nudge - progress * 5,
        l: c.l - nudge + progress * 3,
      };
    });
  }, [progress]);

  const offers = [
    "Email and inbox management",
    "Calendar scheduling and follow-ups",
    "Data entry and spreadsheet organization",
    "Online research and lead generation",
    "Document formatting and report creation",
    "Admin support for busy founders and teams",
  ];

  const tools = [
    "Google Sheets",
    "Excel",
    "Google Calendar",
    "Zoom",
    "Slack",
    "Notion",
    "Canva",
    "Google Docs",
    "Gmail",
  ];

  const strengths = [
    "Fast learner who adapts quickly to new tools and workflows",
    "Strong attention to detail from data and research work",
    "Organized, reliable, and responsive in day-to-day support tasks",
    "Comfortable handling repetitive admin work with accuracy and consistency",
  ];

  const results = [
    {
      title: "Lead Tracking Cleanup",
      stat: "+38% faster follow-ups",
      desc: "Organized client lead sheets, removed duplicate entries, and created a cleaner tracking flow for better visibility.",
    },
    {
      title: "Inbox Workflow Setup",
      stat: "Less missed messages",
      desc: "Built a category-based inbox process with priority labels and follow-up reminders to improve response handling.",
    },
    {
      title: "Research Summary Dashboard",
      stat: "Clearer decisions",
      desc: "Turned scattered research notes into one clean summary view to make insights easier to scan and act on.",
    },
  ];

  return (
    <>
      <style>{`
        :root {
          --bg: ${dark ? "#081225" : "#f4f8ff"};
          --bg2: ${dark ? "#0e1a33" : "#ffffff"};
          --text: ${dark ? "#f8fbff" : "#0f172a"};
          --muted: ${dark ? "#b7c3d9" : "#475569"};
          --card: ${dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.88)"};
          --border: ${dark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"};
          --green: #22c55e;
          --green-soft: rgba(34,197,94,0.18);
          --blue: #3b82f6;
          body {
  cursor: none; }
  .custom-cursor {
  width: 32px;
  height: 32px;
  background: black;

  /* triangle shape */
  clip-path: polygon(0% 0%, 100% 50%, 0% 100%);

  /* white border */
  border: 3px solid white;

  /* glow */
  box-shadow:
    0 0 10px rgba(34, 197, 94, 0.7),
    0 0 20px rgba(34, 197, 94, 0.5),
    0 0 35px rgba(34, 197, 94, 0.4);

  border-radius: 6px;

  transform: rotate(0deg);
}
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Inter, Segoe UI, Arial, sans-serif;
          background: radial-gradient(circle at top, ${dark ? "#112449" : "#d9ebff"} 0%, var(--bg) 42%, var(--bg) 100%);
          color: var(--text);
          transition: background 0.3s ease, color 0.3s ease;
        }
        a { text-decoration: none; color: inherit; }

        .page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .bg-chart {
          position: fixed;
          inset: 0;
          z-index: -2;
          opacity: ${dark ? 0.18 : 0.13};
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .bg-grid {
          position: fixed;
          inset: 0;
          z-index: -3;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.1));
          pointer-events: none;
        }

        .topbar {
          position: fixed;
          top: 18px;
          right: 18px;
          z-index: 20;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .toggle {
          border: 1px solid var(--border);
          background: ${dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)"};
          color: var(--text);
          padding: 12px 16px;
          border-radius: 999px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          font-weight: 700;
        }

        .container {
          max-width: 1180px;
          margin: 0 auto;
          padding: 32px 20px 100px;
        }

        .hero {
          min-height: 88vh;
          display: grid;
          grid-template-columns: 1.2fr 0.9fr;
          gap: 26px;
          align-items: center;
          padding-top: 30px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.22);
          color: #b8ffd0;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .hero h1 {
          font-size: clamp(40px, 6vw, 74px);
          line-height: 0.98;
          margin: 18px 0 14px;
          max-width: 780px;
        }

        .hero p {
          margin: 0;
          font-size: 18px;
          line-height: 1.8;
          color: var(--muted);
          max-width: 700px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 24px;
          border-radius: 14px;
          border: 1px solid transparent;
          font-weight: 800;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          cursor: pointer;
          position: relative;
        }

        .btn-primary {
          color: white;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          box-shadow: 0 0 0 rgba(34,197,94,0.0), 0 0 28px rgba(34,197,94,0.35);
          animation: glowPulse 2.1s ease-in-out infinite;
        }

        .btn-secondary {
          background: ${dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.86)"};
          color: var(--text);
          border-color: var(--border);
          backdrop-filter: blur(10px);
        }

        .btn:hover {
          transform: translateY(-2px) scale(1.03);
        }

        .btn-primary:hover {
          box-shadow: 0 0 22px rgba(34,197,94,0.48), 0 0 55px rgba(34,197,94,0.32);
        }

        @keyframes glowPulse {
          0% { box-shadow: 0 0 18px rgba(34,197,94,0.18), 0 0 35px rgba(34,197,94,0.22); }
          100% { box-shadow: 0 0 28px rgba(34,197,94,0.34), 0 0 70px rgba(34,197,94,0.28); }
        }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .meta-chip {
          padding: 12px 14px;
          border-radius: 14px;
          background: var(--card);
          border: 1px solid var(--border);
          color: var(--muted);
          backdrop-filter: blur(10px);
        }

        .hero-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03));
          border: 1px solid var(--border);
          border-radius: 26px;
          padding: 20px;
          box-shadow: 0 18px 50px rgba(0,0,0,0.18);
          backdrop-filter: blur(12px);
        }

        .mini-chart {
          width: 100%;
          height: 360px;
          display: block;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          color: var(--muted);
          font-size: 13px;
          margin-top: 10px;
        }

        .section {
          margin-top: 70px;
        }

        .section-title {
          font-size: 34px;
          margin: 0 0 12px;
        }

        .section-copy {
          color: var(--muted);
          line-height: 1.8;
          max-width: 830px;
          margin: 0 0 24px;
        }

        .grid-3, .grid-2 {
          display: grid;
          gap: 20px;
        }
        .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }

        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 22px;
          backdrop-filter: blur(12px);
          box-shadow: 0 16px 35px rgba(0,0,0,0.08);
          transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(0,0,0,0.12), 0 0 24px rgba(34,197,94,0.12);
          border-color: rgba(34,197,94,0.24);
        }

        .offer-card h3, .sample-card h3, .tool-card h3, .strength-card h3 {
          margin: 0 0 10px;
          font-size: 22px;
        }

        .offer-card p, .sample-card p, .tool-card p, .strength-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
        }

        .sample-visual {
          margin-top: 16px;
          height: 180px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(59,130,246,0.18), rgba(34,197,94,0.12));
          border: 1px solid rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }

        .sample-visual svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .sample-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          padding: 8px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          background: rgba(34,197,94,0.16);
          color: #b6ffd0;
          border: 1px solid rgba(34,197,94,0.2);
        }

        .tools-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .tool-pill {
          padding: 14px 16px;
          border-radius: 16px;
          background: var(--card);
          border: 1px solid var(--border);
          color: var(--text);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          box-shadow: 0 12px 28px rgba(0,0,0,0.06);
        }

        .tool-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(135deg, #22c55e, #3b82f6);
          box-shadow: 0 0 12px rgba(34,197,94,0.45);
        }

        .insight {
          margin-top: 24px;
          padding: 22px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(59,130,246,0.12), rgba(34,197,94,0.1));
          border: 1px solid var(--border);
          color: var(--muted);
          line-height: 1.85;
        }

        .footer {
          margin-top: 80px;
          padding: 32px 0 12px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          color: var(--muted);
        }

        .social {
          position: fixed;
          left: 18px;
          bottom: 18px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social a {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.9)"};
          border: 1px solid var(--border);
          color: var(--text);
          box-shadow: 0 14px 26px rgba(0,0,0,0.08);
          font-weight: 900;
          backdrop-filter: blur(10px);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .social a:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 0 20px rgba(34,197,94,0.18);
        }

        .chat {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 21;
          padding: 16px 18px;
          border-radius: 20px;
          border: 1px solid rgba(34,197,94,0.18);
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          font-weight: 800;
          cursor: pointer;
          animation: glowPulse 2.1s ease-in-out infinite;
          box-shadow: 0 0 24px rgba(34,197,94,0.2);
        }

        .about-popup {
          position: fixed;
          right: 18px;
          bottom: 84px;
          z-index: 21;
          width: 320px;
          padding: 20px;
          border-radius: 22px;
          background: ${dark ? "rgba(9,18,37,0.95)" : "rgba(255,255,255,0.98)"};
          border: 1px solid var(--border);
          color: var(--text);
          box-shadow: 0 20px 40px rgba(0,0,0,0.14);
          backdrop-filter: blur(12px);
        }

        .about-popup h4 {
          margin: 0 0 10px;
          font-size: 20px;
        }

        .about-popup p {
          margin: 0;
          color: var(--muted);
          line-height: 1.8;
        }

        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-top: 80px;
          }
          .grid-3, .grid-2 {
            grid-template-columns: 1fr;
          }
          .footer {
            flex-direction: column;
            align-items: flex-start;
          }
          .social {
            left: 12px;
            bottom: 12px;
          }
          .chat {
            right: 12px;
            bottom: 12px;
          }
          .about-popup {
            right: 12px;
            bottom: 78px;
            width: min(320px, calc(100vw - 24px));
          }
        }
      `}</style>

      <div className="page">
        <div
  style={{
    position: "fixed",
    left: cursor.x,
    top: cursor.y,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 9999,
    transition: "all 0.08s linear"
  }}
>
  <div className="custom-cursor" />
</div>
        <div className="bg-grid" />

        <svg className="bg-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20, 40, 60, 80].map((y) => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.2" />
          ))}
          {[15, 35, 55, 75, 95].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.15" />
          ))}

          {candles.map((c, i) => {
            const up = c.c < c.o;
            const top = Math.min(c.o, c.c);
            const body = Math.max(2.5, Math.abs(c.c - c.o));
            return (
              <g key={i}>
                <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={up ? "#22c55e" : "#ef4444"} strokeWidth="0.6" />
                <rect x={c.x - 1.5} y={top} width="3" height={body} rx="0.6" fill={up ? "#22c55e" : "#ef4444"} />
              </g>
            );
          })}

          <path d={chartPath} fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeLinecap="round" />
          <path d={`${chartPath} L 100 100 L 0 100 Z`} fill="url(#fadeFill)" opacity="0.5" />
          <defs>
            <linearGradient id="fadeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="2" y="18" fill="rgba(255,255,255,0.4)" fontSize="4">$12k</text>
          <text x="2" y="38" fill="rgba(255,255,255,0.4)" fontSize="4">$9k</text>
          <text x="2" y="58" fill="rgba(255,255,255,0.4)" fontSize="4">$6k</text>
          <text x="2" y="78" fill="rgba(255,255,255,0.4)" fontSize="4">$3k</text>
        </svg>

        <div className="topbar">
          <button className="toggle" onClick={() => setDark(!dark)}>
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="social">
          <a href="https://www.facebook.com/daryll.l.bonzo" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
          <a href="https://ph.linkedin.com/in/daryll-bonzo-02a0632b0" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
        </div>

        <div className="container">
          <section className="hero">
            <div>
              <div className="eyebrow">General Virtual Assistant • Manila, Philippines</div>
              <h1>Daryll John L. Bonzo</h1>
              <p>
                I help business owners stay organized, save time, and keep operations moving. From inbox and calendar support to research, spreadsheets, reports, and admin tasks, I provide reliable virtual assistance backed by a strong research and data-focused background.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="https://wa.me/639241232790" target="_blank" rel="noreferrer">Hire Me on WhatsApp</a>
                <a className="btn btn-secondary" href="https://ph.linkedin.com/in/daryll-bonzo-02a0632b0" target="_blank" rel="noreferrer">View LinkedIn</a>
              </div>

              <div className="hero-meta">
                <div className="meta-chip">Fast learner</div>
                <div className="meta-chip">Highly organized</div>
                <div className="meta-chip">Research-driven</div>
                <div className="meta-chip">Detail-oriented</div>
              </div>
            </div>

            <div className="hero-card">
              <svg className="mini-chart" viewBox="0 0 100 100" preserveAspectRatio="none">
                {[20, 40, 60, 80].map((y) => (
                  <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" />
                ))}
                <path d={chartPath} fill="none" stroke="#22c55e" strokeWidth="1.1" strokeLinecap="round" />
                <circle cx={88} cy={22 - progress * 10} r="2.2" fill="#22c55e">
                  <animate attributeName="r" values="2.2;3.4;2.2" dur="1.4s" repeatCount="indefinite" />
                </circle>
                {candles.slice(2, 8).map((c, i) => {
                  const up = c.c < c.o;
                  const top = Math.min(c.o, c.c);
                  const body = Math.max(2.5, Math.abs(c.c - c.o));
                  return (
                    <g key={i}>
                      <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={up ? "#22c55e" : "#ef4444"} strokeWidth="0.7" />
                      <rect x={c.x - 1.6} y={top} width="3.2" height={body} rx="0.6" fill={up ? "#22c55e" : "#ef4444"} />
                    </g>
                  );
                })}
                <text x="4" y="16" fill="rgba(255,255,255,0.52)" fontSize="4.2">Growth Trend</text>
                <text x="4" y="92" fill="rgba(255,255,255,0.45)" fontSize="4">Jan</text>
                <text x="88" y="92" fill="rgba(255,255,255,0.45)" fontSize="4">Now</text>
              </svg>
              <div className="chart-labels">
                <span>Client workflow efficiency</span>
                <span>{Math.round(progress * 100)}% tracked</span>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">What I Offer as a General Virtual Assistant</h2>
            <p className="section-copy">
              My goal is to take repetitive, time-consuming work off your plate so you can focus on sales, strategy, client relationships, and business growth.
            </p>
            <div className="grid-3">
              {offers.map((item) => (
                <div className="card offer-card" key={item}>
                  <h3>{item}</h3>
                  <p>I provide structured support, clean execution, and dependable follow-through for daily business operations.</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Why I’m a Strong Fit Even While Transitioning</h2>
            <p className="section-copy">
              I may be transitioning into the General Virtual Assistant role, but the skills behind great VA work are already part of my experience: organization, research, data accuracy, reporting, clear communication, and adapting quickly to systems.
            </p>
            <div className="grid-2">
              {strengths.map((item) => (
                <div className="card strength-card" key={item}>
                  <h3>Professional Strength</h3>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Tools I Can Use to Support Your Workflow</h2>
            <p className="section-copy">
              I’m comfortable working with common tools used in remote support, scheduling, communication, spreadsheets, research, and task organization.
            </p>
            <div className="tools-wrap">
              {tools.map((tool) => (
                <div className="tool-pill" key={tool}>
                  <span className="tool-dot" />
                  {tool}
                </div>
              ))}
            </div>
            <div className="insight">
              My previous role strengthened my ability to work with information-heavy tasks, organize data clearly, build reports, monitor details, and stay accurate under routine workflows — all of which translate well into high-quality virtual assistance.
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Sample Work and Business-Focused Results</h2>
            <p className="section-copy">
              These are portfolio-style sample outcomes that represent the type of support and organization I can bring to a client’s business.
            </p>
            <div className="grid-3">
              {results.map((item, idx) => (
                <div className="card sample-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="sample-visual">
                    <div className="sample-badge">{item.stat}</div>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                      {[22, 44, 66, 88].map((y) => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.45" />
                      ))}
                      <path
                        d={idx === 0
                          ? `M 0 ${78 - progress * 6} L 20 ${74 - progress * 8} L 40 ${61 - progress * 10} L 60 ${52 - progress * 13} L 80 ${40 - progress * 14} L 100 ${29 - progress * 15}`
                          : idx === 1
                          ? `M 0 ${82 - progress * 5} L 20 ${72 - progress * 7} L 40 ${69 - progress * 7} L 60 ${53 - progress * 12} L 80 ${48 - progress * 13} L 100 ${35 - progress * 15}`
                          : `M 0 ${80 - progress * 4} L 20 ${78 - progress * 6} L 40 ${64 - progress * 9} L 60 ${60 - progress * 11} L 80 ${44 - progress * 15} L 100 ${31 - progress * 16}`}
                        fill="none"
                        stroke={idx === 1 ? "#60a5fa" : "#22c55e"}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <circle cx="100" cy={idx === 0 ? 29 - progress * 15 : idx === 1 ? 35 - progress * 15 : 31 - progress * 16} r="2.2" fill={idx === 1 ? "#60a5fa" : "#22c55e"}>
                        <animate attributeName="r" values="2.2;3.3;2.2" dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">Let’s Work Together</h2>
            <p className="section-copy">
              If you need a General Virtual Assistant who can stay organized, adapt quickly, and support your workload with care and consistency, I’m ready to help.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="https://wa.me/639241232790" target="_blank" rel="noreferrer">Message Me on WhatsApp</a>
              <a className="btn btn-secondary" href="https://www.facebook.com/daryll.l.bonzo" target="_blank" rel="noreferrer">View Facebook</a>
            </div>
          </section>

          <footer className="footer">
            <div>
              <strong>Daryll John L. Bonzo</strong>
              <div>General Virtual Assistant • Manila, Philippines</div>
            </div>
            <div>Reliable support for admin, research, reporting, and organized remote workflows.</div>
          </footer>
        </div>

        <div className="chat" onClick={() => setShowAbout(!showAbout)}>
          Hi! I’m Daryll 👋
        </div>

        {showAbout && (
          <div className="about-popup">
            <h4>Why choose me?</h4>
            <p>
              I bring strong organization, quick adaptability, careful attention to detail, and a dependable work style. Even while transitioning into the VA role, I already have the habits clients value most: clear communication, research ability, accurate execution, and a mindset focused on making work easier for the business owner.
            </p>
            <div
  style={{
    position: "fixed",
    left: cursor.x,
    top: cursor.y,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 9999,
  }}
>
  <div className="custom-cursor" />
</div>
          </div>
        )}
      </div>
    </>
  );
}
