import { useEffect, useState } from "react";
import "./app.css";

const services = [
  { label: "Inbox control", title: "Email and inbox management", desc: "I organize messages, priorities, and follow-ups so important conversations do not get buried.", bullets: ["Priority filtering", "Reply drafting", "Follow-up reminders"], bars: [92, 86, 80] },
  { label: "Calendar support", title: "Calendar scheduling and follow-ups", desc: "I keep appointments, reminders, and schedule changes organized so your day runs cleaner.", bullets: ["Time-block setup", "Meeting reminders", "Schedule updates"], bars: [88, 83, 79] },
  { label: "Data accuracy", title: "Data entry and spreadsheet organization", desc: "I keep tracking sheets clear, structured, and accurate for easier reporting and decisions.", bullets: ["Clean data entry", "Sheet organization", "Consistent formatting"], bars: [94, 89, 84] },
  { label: "Research support", title: "Online research and lead generation", desc: "I gather useful information and turn it into clear summaries, lists, and lead inputs.", bullets: ["Lead sourcing", "Research summaries", "Actionable findings"], bars: [85, 82, 78] },
  { label: "Reporting", title: "Document formatting and report creation", desc: "I create polished documents and reports that are easier to scan, review, and share.", bullets: ["Report cleanup", "Document layout", "Readable summaries"], bars: [90, 84, 81] },
  { label: "Daily operations", title: "Admin support for busy founders and teams", desc: "I handle repeatable admin work so clients can focus on growth, strategy, and relationships.", bullets: ["Task tracking", "Routine admin support", "Consistent execution"], bars: [91, 86, 82] },
];

const strengths = [
  { title: "Fast learner", text: "I adapt quickly to new tools, systems, and workflows." },
  { title: "Attention to detail", text: "My research and data background helps me stay accurate." },
  { title: "Organized and reliable", text: "I keep work structured, clear, and easy to track." },
  { title: "Consistent execution", text: "I can handle repetitive admin tasks with focus and care." },
];

const workflow = [
  { step: "01", title: "Organize requests", text: "Messages, schedules, files, and tasks are sorted by priority." },
  { step: "02", title: "Handle recurring work", text: "Admin tasks move through a clean repeatable routine." },
  { step: "03", title: "Track the details", text: "Sheets, notes, and reports stay structured and visible." },
  { step: "04", title: "Keep things moving", text: "Clients get more time for strategy and growth." },
];

const platforms = ["Google Workspace", "Microsoft Excel", "Google Calendar", "Zoom", "Slack", "Notion", "Canva", "Google Docs", "Gmail"];

const supportSignals = [
  { title: "Inbox clarity", stat: "Priority handling", text: "Important conversations stay visible, cleaner to sort, and easier to follow through.", level: 88 },
  { title: "Schedule control", stat: "Daily coordination", text: "Appointments, reminders, and timing changes stay more structured across the day.", level: 84 },
  { title: "Research readiness", stat: "Decision support", text: "Scattered information becomes cleaner notes, summaries, and action-friendly references.", level: 91 },
];

const positioning = [
  {
    title: "Transferable strengths clients can use now",
    text: "Even while I continue growing under the General Virtual Assistant title, I already bring the habits clients actually pay for: organization, research discipline, data accuracy, reporting, responsiveness, and dependable follow-through.",
  },
  {
    title: "Fast onboarding with clear instructions",
    text: "Give me your preferred tools, process, and priorities, and I can adapt quickly without adding unnecessary confusion, missed details, or rework.",
  },
  {
    title: "Reliable support for recurring operations",
    text: "I am especially well-suited for inboxes, calendars, spreadsheets, research, documentation, and repeatable admin tasks that need patience, structure, and attention to detail.",
  },
];

const expectations = [
  {
    title: "Calm communication",
    text: "Updates stay clear, respectful, and easy to act on.",
  },
  {
    title: "Organized execution",
    text: "Tasks are handled with structure, not guesswork.",
  },
  {
    title: "Reliable follow-through",
    text: "The details stay protected, especially in routine admin work.",
  },
];

const socials = [
  { label: "WhatsApp", short: "WA", href: "https://wa.me/639241232790", note: "Best for quick hiring conversations and project discussions." },
  { label: "LinkedIn", short: "LI", href: "https://ph.linkedin.com/in/daryll-bonzo-02a0632b0", note: "Professional background, strengths, and profile details." },
  { label: "Facebook", short: "FB", href: "https://www.facebook.com/daryll.l.bonzo", note: "Easy backup contact for inquiries and follow-ups." },
];

function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function animatePercent(base, phase, amplitude, min, max) {
  return clampValue(Math.round(base + Math.sin(phase) * amplitude), min, max);
}

function CursorGlow() {
  const [cursor, setCursor] = useState({ x: 0, y: 0, hidden: true, down: false });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;
    let frame = 0;
    const next = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const paint = () => {
      setCursor((current) => ({ ...current, x: next.x, y: next.y, hidden: false }));
      frame = 0;
    };
    const move = (event) => {
      next.x = event.clientX;
      next.y = event.clientY;
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    const leave = () => setCursor((current) => ({ ...current, hidden: true, down: false }));
    const down = () => setCursor((current) => ({ ...current, down: true, hidden: false }));
    const up = () => setCursor((current) => ({ ...current, down: false }));
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const style = { "--cursor-x": `${cursor.x}px`, "--cursor-y": `${cursor.y}px` };
  return (
    <>
      <div className={`cursor-ring${cursor.hidden ? " is-hidden" : ""}${cursor.down ? " is-down" : ""}`} style={style} />
      <div className={`cursor-core${cursor.hidden ? " is-hidden" : ""}${cursor.down ? " is-down" : ""}`} style={style} />
    </>
  );
}

function LinkButton({ href, className = "", children }) {
  const [ripples, setRipples] = useState([]);
  const external = href && !href.startsWith("#") && !href.startsWith("/");
  const onClick = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    const size = Math.max(box.width, box.height);
    const item = { id: `${Date.now()}-${Math.random()}`, x: event.clientX - box.left - size / 2, y: event.clientY - box.top - size / 2, size };
    setRipples((current) => [...current, item]);
    window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== item.id)), 650);
  };

  return (
    <a className={`button ${className}`.trim()} href={href} onClick={onClick} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>
      <span>{children}</span>
      {ripples.map((ripple) => <i className="ripple" key={ripple.id} style={{ width: ripple.size, height: ripple.size, left: ripple.x, top: ripple.y }} />)}
    </a>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [liveTick, setLiveTick] = useState(0);

  useEffect(() => {
    const scroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(window.scrollY / max);
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.18, rootMargin: "0px 0px -64px 0px" });
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const updateTick = () => setLiveTick(Date.now() / 1000);
    updateTick();
    const intervalId = window.setInterval(updateTick, 180);
    return () => window.clearInterval(intervalId);
  }, []);

  const current = services[active];
  const liveBars = current.bars.map((bar, index) => animatePercent(bar, liveTick * 1.6 + active * 0.8 + index * 0.95, 3.2, 72, 99));
  const liveSignals = supportSignals.map((item, index) => ({
    ...item,
    liveLevel: animatePercent(item.level, liveTick * 1.35 + index * 0.9, 4.4, 68, 98),
  }));

  return (
    <>
      <CursorGlow />
      <div className="shell">
        <div className="progress"><span style={{ transform: `scaleX(${progress})` }} /></div>
        <div className="cosmic-layer" aria-hidden="true">
          <video autoPlay loop muted playsInline preload="metadata">
            <source src="/videos/blackhole.webm" type="video/webm" />
          </video>
        </div>
        <div className="cosmic-vignette" />
        <div className="bg-grid" />
        <div className="orb orb-a" />
        <div className="orb orb-b" />
        <div className="orb orb-c" />
        <div className="ambient-lines" aria-hidden="true"><span /><span /><span /></div>
        <div className="ambient-rings" aria-hidden="true"><span /><span /></div>

        <header className="header">
          <div className="wrap">
            <a className="brand" href="#top"><b>DB</b><span><strong>Daryll John L. Bonzo</strong><small>General Virtual Assistant</small></span></a>
            <nav className="nav"><a href="#services">Services</a><a href="#strengths">Strengths</a><a href="#platforms">Platforms</a><a href="#connect">Connect</a></nav>
            <LinkButton className="primary compact" href="https://wa.me/639241232790">Start a conversation</LinkButton>
          </div>
        </header>

        <aside className="dock">{socials.map((item) => <a aria-label={item.label} href={item.href} key={item.label} rel="noreferrer" target="_blank"><span>{item.short}</span><small>{item.label}</small></a>)}</aside>

        <main className="page" id="top">
          <section className="hero is-visible" data-reveal>
            <div className="copy">
              <div className="badges"><em>General Virtual Assistant</em><em className="warm">Available for remote support</em></div>
              <h1>Polished <span className="gradient-word">virtual assistance</span> for founders and teams who need more order behind the scenes.</h1>
              <p>I help business owners protect their time, reduce clutter, and keep important work moving. From inbox and calendar support to research, spreadsheets, reports, and daily admin tasks, I provide structured remote assistance backed by a strong research and data-focused background.</p>
              <div className="hero-callout">Built for clients who want a calm, organized, detail-conscious assistant they can keep growing with.</div>
              <div className="actions"><LinkButton className="primary" href="https://wa.me/639241232790">Hire me on WhatsApp</LinkButton><LinkButton className="secondary" href="https://ph.linkedin.com/in/daryll-bonzo-02a0632b0">View LinkedIn</LinkButton></div>
              <div className="chips"><span>Fast learner</span><span>Highly organized</span><span>Research-driven</span><span>Detail-oriented</span></div>
              <div className="stats"><article><strong>Manila, Philippines</strong><p>Remote-ready support for clients who need dependable day-to-day assistance.</p></article><article><strong>6 support lanes</strong><p>Focused on recurring work that quietly keeps operations cleaner.</p></article><article><strong>Client-first workflow</strong><p>Built around clarity, consistency, and reliable follow-through.</p></article></div>
            </div>

            <div className="panel">
              <span className="tag">Assistant Workflow View</span>
              <h2>Support flow aligned to <span className="gradient-word">General Virtual Assistant</span> work.</h2>
              <div className="panel-grid">
                <article className="focus"><small>Selected service</small><h3>{current.title}</h3><p>{current.desc}</p>{current.bullets.map((item, index) => <div className="metric" key={item}><div><span>{item}</span><strong>{liveBars[index]}%</strong></div><i><b style={{ width: `${liveBars[index]}%` }} /></i></div>)}</article>
                <article className="mini"><small>Inbox support</small><strong>Priority-based message flow</strong><p>Important requests stay visible instead of getting buried.</p></article>
                <article className="mini"><small>Scheduling rhythm</small><strong>Cleaner calendar coordination</strong><p>Appointments and reminders are handled with structure.</p></article>
                <article className="mini"><small>Research support</small><strong>Clear summaries for action</strong><p>Scattered information becomes output a client can review faster.</p></article>
              </div>
            </div>
          </section>

          <section className="section" data-reveal id="services">
            <div className="heading"><small>Support Areas</small><h2>How I can support your day-to-day workflow as a General Virtual Assistant</h2><p>My role is to remove repetitive, time-consuming work from your plate so you can protect your energy for clients, decisions, strategy, and growth.</p></div>
            <div className="services">
              <div className="service-grid">{services.map((item, index) => <button aria-pressed={active === index} className={`service-card${active === index ? " active" : ""}`} key={item.title} onClick={() => setActive(index)} onFocus={() => setActive(index)} onMouseEnter={() => setActive(index)} type="button"><small>{item.label}</small><strong>{item.title}</strong><p>{item.desc}</p></button>)}</div>
              <div className="preview"><small>Selected service</small><h3>{current.title}</h3><p>{current.desc}</p><div className="preview-tags">{current.bullets.map((item) => <span key={item}>{item}</span>)}</div><LinkButton className="primary" href="https://wa.me/639241232790">Discuss this support area</LinkButton></div>
            </div>
          </section>

          <section className="section" data-reveal id="strengths">
            <div className="heading"><small>Why Work With Me</small><h2>The qualities clients actually need from a dependable General Virtual Assistant</h2><p>I may still be growing into the title, but the work itself already matches my strengths: organization, research, data accuracy, reporting, communication, and quick adaptation.</p></div>
            <div className="insights">
              <div className="strength-grid">{strengths.map((item) => <article className="card" key={item.title}><small>{item.title}</small><p>{item.text}</p></article>)}</div>
              <div className="timeline">{workflow.map((item) => <div className="step" key={item.step}><b>{item.step}</b><div><strong>{item.title}</strong><p>{item.text}</p></div></div>)}</div>
            </div>
          </section>

          <section className="section" data-reveal id="confidence">
            <div className="heading"><small>Client Confidence</small><h2>Why hiring me can still make sense for a client who needs reliable support now</h2><p>I do not need to overclaim experience to be valuable. What matters most is whether the person you hire can learn fast, protect details, stay organized, communicate clearly, and execute consistently. Those strengths are already part of how I work.</p></div>
            <div className="proof-layout">
              <div className="proof-grid">{positioning.map((item) => <article className="card proof-card" key={item.title}><small>{item.title}</small><p>{item.text}</p></article>)}</div>
              <div className="promise-panel">
                <small>What you can expect from me</small>
                <h3>Support that feels polished, structured, and easy to trust.</h3>
                <p>I aim to become the kind of assistant who reduces friction for the client, keeps the workflow organized, and makes daily operations feel lighter instead of heavier.</p>
                <div className="promise-list">{expectations.map((item) => <div className="promise-item" key={item.title}><strong>{item.title}</strong><p>{item.text}</p></div>)}</div>
                <LinkButton className="primary" href="https://wa.me/639241232790">Talk about your workflow</LinkButton>
              </div>
            </div>
          </section>

          <section className="section" data-reveal id="platforms">
            <div className="heading"><small>Platforms and Workflow</small><h2>Comfortable with the everyday platforms remote clients already use</h2><p>I can work inside the tools commonly used for scheduling, communication, spreadsheets, documentation, task coordination, and research support.</p></div>
            <div className="tool-box">{platforms.map((tool) => <span key={tool}>{tool}</span>)}</div>
            <div className="note">My background strengthened my ability to work with information-heavy tasks, organize details clearly, build clean reports, monitor updates, and stay accurate inside recurring workflows. Those habits translate naturally into dependable virtual assistance.</div>
            <div className="result-grid">{liveSignals.map((item) => <article className="card result" key={item.title}><div className="result-head"><small>{item.stat}</small><strong className="result-percent">{item.liveLevel}%</strong></div><h3>{item.title}</h3><p>{item.text}</p><i><b style={{ width: `${item.liveLevel}%` }} /></i></article>)}</div>
          </section>

          <section className="section contact" data-reveal id="connect">
            <div className="heading"><small>Let's Work Together</small><h2>If you need a General Virtual Assistant who can learn fast, stay organized, and protect the <span className="gradient-word">details</span> of your business, I am ready to help.</h2><p>I may still be growing into the title, but I already bring the mindset clients need from day one: structure, professionalism, clear communication, and careful execution. If you want dependable support that can grow with your workflow, reach out through any of the channels below.</p></div>
            <div className="contact-highlights">{expectations.map((item) => <span key={item.title}>{item.title}</span>)}</div>
            <div className="contact-grid">{socials.map((item) => <a aria-label={item.label} className="card contact-card" href={item.href} key={item.label} rel="noreferrer" target="_blank"><span>{item.short}</span><strong>{item.label}</strong><p>{item.note}</p></a>)}</div>
            <div className="actions"><LinkButton className="primary" href="https://wa.me/639241232790">Message me on WhatsApp</LinkButton><LinkButton className="secondary" href="https://www.facebook.com/daryll.l.bonzo">View Facebook</LinkButton></div>
          </section>
        </main>

        <footer className="footer"><div className="wrap"><div className="footer-identity"><strong>Daryll John L. Bonzo</strong><small>General Virtual Assistant | Manila, Philippines</small></div><p>Reliable support for admin, research, reporting, and smoother day-to-day remote operations.</p></div></footer>
      </div>
    </>
  );
}
