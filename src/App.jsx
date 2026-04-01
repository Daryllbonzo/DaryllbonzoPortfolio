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

const platforms = [
  { id: "workspace", label: "Google Workspace" },
  { id: "excel", label: "Microsoft Excel" },
  { id: "calendar", label: "Google Calendar" },
  { id: "zoom", label: "Zoom" },
  { id: "slack", label: "Slack" },
  { id: "notion", label: "Notion" },
  { id: "canva", label: "Canva" },
  { id: "docs", label: "Google Docs" },
  { id: "gmail", label: "Gmail" },
];

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

const timeZoneCountryMap = {
  "Asia/Manila": { code: "PH", name: "Philippines" },
  "Asia/Singapore": { code: "SG", name: "Singapore" },
  "Asia/Tokyo": { code: "JP", name: "Japan" },
  "Asia/Seoul": { code: "KR", name: "South Korea" },
  "Asia/Dubai": { code: "AE", name: "United Arab Emirates" },
  "Asia/Kuala_Lumpur": { code: "MY", name: "Malaysia" },
  "Asia/Bangkok": { code: "TH", name: "Thailand" },
  "Asia/Jakarta": { code: "ID", name: "Indonesia" },
  "Asia/Hong_Kong": { code: "HK", name: "Hong Kong" },
  "Asia/Shanghai": { code: "CN", name: "China" },
  "Asia/Kolkata": { code: "IN", name: "India" },
  "Europe/London": { code: "GB", name: "United Kingdom" },
  "Europe/Paris": { code: "FR", name: "France" },
  "Europe/Berlin": { code: "DE", name: "Germany" },
  "Europe/Madrid": { code: "ES", name: "Spain" },
  "Europe/Rome": { code: "IT", name: "Italy" },
  "Europe/Amsterdam": { code: "NL", name: "Netherlands" },
  "Europe/Dublin": { code: "IE", name: "Ireland" },
  "Australia/Sydney": { code: "AU", name: "Australia" },
  "Australia/Melbourne": { code: "AU", name: "Australia" },
  "Pacific/Auckland": { code: "NZ", name: "New Zealand" },
  "America/New_York": { code: "US", name: "United States" },
  "America/Chicago": { code: "US", name: "United States" },
  "America/Denver": { code: "US", name: "United States" },
  "America/Los_Angeles": { code: "US", name: "United States" },
  "America/Toronto": { code: "CA", name: "Canada" },
  "America/Vancouver": { code: "CA", name: "Canada" },
};

function clampValue(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function animatePercent(base, phase, amplitude, min, max) {
  return clampValue(Math.round(base + Math.sin(phase) * amplitude), min, max);
}

function getLocaleRegion(locale) {
  if (!locale) return "";
  try {
    if (typeof Intl !== "undefined" && typeof Intl.Locale === "function") {
      return new Intl.Locale(locale).maximize().region || "";
    }
  } catch {}
  const match = locale.match(/-([A-Za-z]{2})\b/);
  return match ? match[1].toUpperCase() : "";
}

function getRegionName(code) {
  if (!code) return "Your region";
  try {
    if (typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function") {
      const names = new Intl.DisplayNames(["en"], { type: "region" });
      return names.of(code) || "Your region";
    }
  } catch {}
  return code;
}

function getFlagEmoji(code) {
  if (!/^[A-Z]{2}$/.test(code)) return "GL";
  return String.fromCodePoint(...[...code].map((char) => 127397 + char.charCodeAt(0)));
}

function resolveVisitorZone() {
  const locale = typeof navigator !== "undefined" ? navigator.language : "en-US";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  const mapped = timeZoneCountryMap[timeZone];
  const regionCode = mapped?.code || getLocaleRegion(locale) || "PH";
  const regionName = mapped?.name || getRegionName(regionCode);
  return { locale, timeZone, regionCode, regionName, flag: getFlagEmoji(regionCode) };
}

function formatZoneTime(date, locale, timeZone) {
  return new Intl.DateTimeFormat(locale || "en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

function formatZoneDate(date, locale, timeZone) {
  return new Intl.DateTimeFormat(locale || "en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatOffsetLabel(date, timeZone) {
  try {
    const zoneName = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "shortOffset",
    }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "GMT";
    const gmt = zoneName.startsWith("GMT") ? zoneName : `GMT${zoneName.replace(/^[A-Z]+/, "")}`;
    const utc = gmt.replace("GMT", "UTC");
    return `${utc} • ${gmt}`;
  } catch {
    return "UTC • GMT";
  }
}

function formatZoneLabel(timeZone) {
  return timeZone.replace(/_/g, " ");
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

function PlatformIcon({ id }) {
  switch (id) {
    case "workspace":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <rect x="8" y="18" width="14" height="28" rx="7" fill="#34A853" />
          <rect x="22" y="10" width="14" height="44" rx="7" fill="#4285F4" opacity="0.96" />
          <rect x="28" y="22" width="14" height="22" rx="7" fill="#FBBC05" />
          <rect x="42" y="18" width="14" height="28" rx="7" fill="#EA4335" />
        </svg>
      );
    case "excel":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <path d="M18 12h22a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H18z" fill="#107C41" />
          <path d="M40 12h6a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6h-6z" fill="#21A366" />
          <rect x="10" y="18" width="22" height="28" rx="4" fill="#185C37" />
          <path d="m16 26 5 6-5 6h4.8l2.7-3.8 2.7 3.8H31l-5.2-6 5-6h-4.7l-2.5 3.5-2.4-3.5z" fill="#fff" />
        </svg>
      );
    case "calendar":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <rect x="10" y="14" width="44" height="40" rx="10" fill="#fff" />
          <path d="M10 24a10 10 0 0 1 10-10h24a10 10 0 0 1 10 10v4H10z" fill="#4285F4" />
          <rect x="18" y="10" width="4" height="10" rx="2" fill="#4285F4" />
          <rect x="42" y="10" width="4" height="10" rx="2" fill="#4285F4" />
          <path d="M24 43V30h5.5l2.4 3.4 2.4-3.4H40v13h-4.5v-6.7l-3.5 4.8-3.5-4.8V43z" fill="#34A853" />
        </svg>
      );
    case "zoom":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <rect x="10" y="18" width="32" height="28" rx="12" fill="#2D8CFF" />
          <path d="M42 26.5 54 21v22l-12-5.5a4 4 0 0 1-2-3.5v-4a4 4 0 0 1 2-3.5Z" fill="#54A5FF" />
        </svg>
      );
    case "slack":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <rect x="14" y="8" width="10" height="24" rx="5" fill="#36C5F0" />
          <rect x="20" y="14" width="24" height="10" rx="5" fill="#2EB67D" />
          <rect x="40" y="14" width="10" height="24" rx="5" fill="#ECB22E" />
          <rect x="14" y="40" width="24" height="10" rx="5" fill="#E01E5A" />
        </svg>
      );
    case "notion":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <rect x="12" y="12" width="40" height="40" rx="8" fill="#fff" />
          <rect x="12" y="12" width="40" height="40" rx="8" fill="none" stroke="#111" strokeWidth="4" />
          <path d="M23 42V22h4.5l13.5 12.8V22H46v20h-4L28 28.6V42z" fill="#111" />
        </svg>
      );
    case "canva":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="canvaGlow" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#5B6CFF" />
              <stop offset="100%" stopColor="#00C4CC" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="22" fill="url(#canvaGlow)" />
          <path d="M39.2 40.3c-1.8 2.1-4.4 3.2-7.2 3.2-5.9 0-10.3-4.3-10.3-10.7S26.1 22 32 22c2.8 0 5.2.8 7.1 2.5l-2.6 3.1c-1.1-1-2.6-1.6-4.3-1.6-3.4 0-5.8 2.8-5.8 6.7s2.3 6.8 5.8 6.8c1.8 0 3.3-.7 4.4-1.9z" fill="#fff" />
        </svg>
      );
    case "docs":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <path d="M20 10h18l10 10v30a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V14a4 4 0 0 1 4-4Z" fill="#4285F4" />
          <path d="M38 10v10h10z" fill="#AECBFA" />
          <rect x="24" y="28" width="16" height="3.5" rx="1.75" fill="#fff" />
          <rect x="24" y="35" width="16" height="3.5" rx="1.75" fill="#fff" />
          <rect x="24" y="42" width="12" height="3.5" rx="1.75" fill="#fff" />
        </svg>
      );
    case "gmail":
      return (
        <svg aria-hidden="true" className="platform-logo" viewBox="0 0 64 64">
          <rect x="10" y="16" width="44" height="32" rx="8" fill="#fff" />
          <path d="M16 22 32 34 48 22" fill="none" stroke="#EA4335" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 44V24l8 6v14z" fill="#34A853" />
          <path d="M48 44V24l-8 6v14z" fill="#4285F4" />
          <path d="M16 22h4l12 9.2L44 22h4" fill="#FBBC05" />
        </svg>
      );
    default:
      return null;
  }
}

function TimezoneBubble({ now, visitorZone }) {
  const [flagError, setFlagError] = useState(false);
  const time = formatZoneTime(now, visitorZone.locale, visitorZone.timeZone);
  const date = formatZoneDate(now, visitorZone.locale, visitorZone.timeZone);
  const offset = formatOffsetLabel(now, visitorZone.timeZone);
  const flagUrl = visitorZone.regionCode ? `https://flagcdn.com/w80/${visitorZone.regionCode.toLowerCase()}.png` : "";

  return (
    <aside className="timezone-bubble" aria-label={`Visitor timezone ${visitorZone.regionName}`}>
      <div className="timezone-avatar">
        {!flagError && flagUrl ? (
          <img
            alt={`${visitorZone.regionName} flag`}
            className="timezone-flag"
            height="24"
            onError={() => setFlagError(true)}
            src={flagUrl}
            width="32"
          />
        ) : (
          <span className="timezone-code">{visitorZone.regionCode}</span>
        )}
        <i />
      </div>
      <div className="timezone-card">
        <small>Visitor local time</small>
        <strong>{visitorZone.regionName}</strong>
        <div className="timezone-time"><b>{time}</b><span>{date}</span></div>
        <p>{offset}</p>
        <em>{formatZoneLabel(visitorZone.timeZone)}</em>
      </div>
    </aside>
  );
}

export default function App() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [liveTick, setLiveTick] = useState(0);
  const [visitorZone] = useState(() => resolveVisitorZone());

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
  const now = liveTick ? new Date(liveTick * 1000) : new Date();
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

        <TimezoneBubble now={now} visitorZone={visitorZone} />
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
            <div className="platform-cloud">
              {platforms.map((tool, index) => (
                <article className={`platform-chip is-${tool.id}`} key={tool.id} style={{ "--float-delay": `${index * -0.8}s`, "--float-duration": `${7.2 + (index % 3) * 1.2}s` }}>
                  <div className="platform-mark">
                    <PlatformIcon id={tool.id} />
                  </div>
                  <strong>{tool.label}</strong>
                </article>
              ))}
            </div>
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
