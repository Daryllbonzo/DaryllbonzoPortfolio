export default function App() {
  const services = [
    'Email & Calendar Management',
    'Data Entry & File Organization',
    'Online Research & Lead Generation',
    'Reports, Documents & Admin Support',
  ];

  const strengths = [
    'Detail-oriented and highly organized',
    'Fast learner with strong initiative',
    'Reliable communication and timely updates',
    'Analytical background with research experience',
  ];

  const samples = [
    {
      title: 'Data Entry Project',
      desc: 'Accurate data organization, spreadsheet cleanup, and record tracking for smooth day-to-day operations.',
    },
    {
      title: 'Online Research Report',
      desc: 'Structured research summaries with clear findings, competitor insights, and organized source details.',
    },
    {
      title: 'Email Organization System',
      desc: 'Inbox labeling, follow-up tracking, and simple workflow setup to help clients stay on top of communication.',
    },
  ];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Inter, Segoe UI, Arial, sans-serif;
          background: linear-gradient(135deg, #eef4ff 0%, #f8fbff 45%, #eef7f5 100%);
          color: #122033;
        }
        a { text-decoration: none; }
        .page {
          min-height: 100vh;
          padding: 32px 20px 60px;
        }
        .container {
          max-width: 1120px;
          margin: 0 auto;
        }
        .hero {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          padding: 72px 28px;
          background: linear-gradient(135deg, #0f172a 0%, #162447 45%, #1d4ed8 100%);
          color: #ffffff;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22);
          animation: fadeUp 0.8s ease both;
        }
        .hero::before,
        .hero::after {
          content: '';
          position: absolute;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          filter: blur(2px);
        }
        .hero::before {
          width: 260px;
          height: 260px;
          right: -80px;
          top: -80px;
        }
        .hero::after {
          width: 220px;
          height: 220px;
          left: -70px;
          bottom: -90px;
        }
        .badge {
          display: inline-block;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.18);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .hero h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.05;
          max-width: 760px;
        }
        .hero p {
          margin: 18px 0 0;
          font-size: 18px;
          line-height: 1.7;
          max-width: 720px;
          color: rgba(255,255,255,0.88);
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 28px;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 700;
          font-size: 15px;
          transition: transform 0.18s ease, opacity 0.18s ease, box-shadow 0.18s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
          opacity: 0.96;
        }
        .btn-primary {
          background: #22c55e;
          color: #fff;
          box-shadow: 0 10px 24px rgba(34, 197, 94, 0.28);
        }
        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.18);
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 34px;
        }
        .stat {
          padding: 18px;
          border-radius: 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.14);
        }
        .stat strong {
          display: block;
          font-size: 22px;
          margin-bottom: 4px;
        }
        .section {
          margin-top: 28px;
          animation: fadeUp 0.8s ease both;
        }
        .section-card {
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(15, 23, 42, 0.06);
          backdrop-filter: blur(8px);
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
        }
        .section-title {
          margin: 0 0 10px;
          font-size: 30px;
          color: #0f172a;
        }
        .section-sub {
          margin: 0;
          color: #475569;
          line-height: 1.7;
          font-size: 16px;
        }
        .grid {
          display: grid;
          gap: 18px;
          margin-top: 22px;
        }
        .grid-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .grid-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .mini-card {
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.06);
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .mini-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 34px rgba(15, 23, 42, 0.1);
        }
        .mini-card h3 {
          margin: 0 0 10px;
          font-size: 20px;
          color: #0f172a;
        }
        .mini-card p {
          margin: 0;
          color: #475569;
          line-height: 1.7;
          font-size: 15px;
        }
        .list {
          display: grid;
          gap: 14px;
          margin-top: 20px;
        }
        .list-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 18px 20px;
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
        }
        .check {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: linear-gradient(135deg, #1d4ed8, #22c55e);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 30px;
          font-weight: 700;
          margin-top: 2px;
        }
        .cta {
          margin-top: 28px;
          border-radius: 24px;
          padding: 34px 28px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #0f766e 100%);
          color: white;
          text-align: center;
          box-shadow: 0 22px 50px rgba(15, 23, 42, 0.18);
        }
        .cta h2 {
          margin: 0 0 10px;
          font-size: 34px;
        }
        .cta p {
          margin: 0;
          color: rgba(255,255,255,0.86);
          line-height: 1.7;
        }
        .footer-note {
          text-align: center;
          color: #64748b;
          margin-top: 18px;
          font-size: 14px;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 860px) {
          .stats,
          .grid-2,
          .grid-3 {
            grid-template-columns: 1fr;
          }
          .hero {
            padding: 54px 22px;
          }
          .section-card,
          .cta {
            padding: 24px 20px;
          }
        }
      `}</style>

      <div className="page">
        <div className="container">
          <section className="hero">
            <div className="badge">General Virtual Assistant</div>
            <h1>Helping Business Owners Stay Organized, Responsive, and Focused on Growth.</h1>
            <p>
              I am Daryll John L. Bonzo, a detail-oriented professional transitioning from data and research work into General Virtual Assistance. I help with admin support, research, reporting, data entry, and organized day-to-day operations.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="https://wa.me/639241232790" target="_blank" rel="noreferrer">
                Hire Me on WhatsApp
              </a>
              <a className="btn btn-secondary" href="mailto:bonzodarylljohn@gmail.com">
                Email Me
              </a>
              <a className="btn btn-secondary" href="https://ph.linkedin.com/in/daryll-bonzo-02a0632b0" target="_blank" rel="noreferrer">
                View LinkedIn
              </a>
            </div>

            <div className="stats">
              <div className="stat">
                <strong>Admin Support</strong>
                <span>Email handling, scheduling, and organized workflows.</span>
              </div>
              <div className="stat">
                <strong>Research & Reports</strong>
                <span>Structured findings, summaries, and accurate documentation.</span>
              </div>
              <div className="stat">
                <strong>Detail & Accuracy</strong>
                <span>Strong eye for clean data, clear systems, and reliable output.</span>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-card">
              <h2 className="section-title">About Me</h2>
              <p className="section-sub">
                My background in data analysis, research, and reporting helped me build the core strengths that matter in virtual assistance: organization, accuracy, time management, clear communication, and dependable support. I am now focused on helping clients manage repetitive and time-consuming tasks so they can concentrate on higher-value work.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-card">
              <h2 className="section-title">What I Can Help You With</h2>
              <p className="section-sub">
                Practical support designed to make your business easier to manage every day.
              </p>
              <div className="grid grid-2">
                {services.map((service) => (
                  <div className="mini-card" key={service}>
                    <h3>{service}</h3>
                    <p>I provide organized, efficient, and dependable assistance tailored to your workflow.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-card">
              <h2 className="section-title">Why Clients Can Count on Me</h2>
              <div className="list">
                {strengths.map((item) => (
                  <div className="list-item" key={item}>
                    <div className="check">✓</div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-card">
              <h2 className="section-title">Sample Work Areas</h2>
              <p className="section-sub">
                These reflect the kind of support I can provide as a General Virtual Assistant.
              </p>
              <div className="grid grid-3">
                {samples.map((sample) => (
                  <div className="mini-card" key={sample.title}>
                    <h3>{sample.title}</h3>
                    <p>{sample.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cta section">
            <h2>Ready to make your workload lighter?</h2>
            <p>
              Let’s work together to keep your business organized, efficient, and moving forward.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <a className="btn btn-primary" href="https://wa.me/639241232790" target="_blank" rel="noreferrer">
                Message Me on WhatsApp
              </a>
            </div>
          </section>

          <div className="footer-note">Daryll John L. Bonzo • General Virtual Assistant • Manila, Philippines</div>
        </div>
      </div>
    </>
  );
}
