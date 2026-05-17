import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (path) => {
    window.location.href = path;
  };

  const NAV_LINKS = [
    { label: "Home", path: "/" },
    { label: "Hackathons", path: "/hackathons", badge: true },
    { label: "Result", path: "/result" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cabinet+Grotesk:wght@700;800&display=swap');

        /* Palette:
           #03045E  deep navy
           #0077B6  ocean blue
           #00B4D8  sky blue
           #90E0EF  light cyan
           #CAF0F8  pale ice
        */

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hw-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .hw-nav-inner {
          padding: 0 40px;
          height: 68px;
          display: flex;
          align-items: center;
          background: rgba(202, 240, 248, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 180, 216, 0.18);
          transition: all 0.3s ease;
        }

        .hw-nav-inner.scrolled {
          height: 60px;
          background: rgba(202, 240, 248, 0.96);
          border-bottom-color: rgba(0, 119, 182, 0.2);
          box-shadow: 0 4px 24px rgba(3, 4, 94, 0.08), 0 1px 0 rgba(0, 180, 216, 0.25);
        }

        .hw-container {
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        /* ── Logo ── */
        .hw-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
        }

        .hw-logo-mark {
          width: 38px; height: 38px;
          border-radius: 12px;
          background: linear-gradient(140deg, #03045E 0%, #0077B6 55%, #00B4D8 100%);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 14px rgba(0, 119, 182, 0.35);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .hw-logo-mark::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
        }

        .hw-logo:hover .hw-logo-mark {
          transform: scale(1.07) rotate(-3deg);
          box-shadow: 0 4px 20px rgba(0, 119, 182, 0.5);
        }

        .hw-logo-mark svg { position: relative; z-index: 1; }

        .hw-logo-name {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #03045E;
          letter-spacing: -0.4px;
        }

        .hw-logo-name em {
          font-style: normal;
          color: #0077B6;
        }

        /* ── Nav links ── */
        .hw-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }

        .hw-link-wrap { position: relative; }

        .hw-link {
          position: relative;
          padding: 7px 15px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #03045E;
          cursor: pointer;
          transition: all 0.18s ease;
          background: transparent;
          border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          letter-spacing: -0.1px;
          opacity: 0.65;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hw-link.active {
          opacity: 1;
          color: #0077B6;
          background: rgba(0, 119, 182, 0.08);
        }

        .hw-link:hover {
          opacity: 1;
          background: rgba(0, 180, 216, 0.1);
          color: #03045E;
        }

        .hw-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 50%; transform: translateX(-50%);
          width: 16px; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #0077B6, #00B4D8);
        }

        /* Live badge */
        .hw-badge {
          display: inline-flex; align-items: center; gap: 3px;
          padding: 2px 6px;
          border-radius: 20px;
          background: rgba(0, 180, 216, 0.14);
          border: 1px solid rgba(0, 180, 216, 0.35);
          font-size: 10px; font-weight: 700;
          color: #0077B6;
          text-transform: uppercase; letter-spacing: 0.05em;
        }

        .hw-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #00B4D8;
          animation: hw-pulse 1.6s ease-in-out infinite;
        }

        @keyframes hw-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.8); }
        }

        /* ── Actions ── */
        .hw-actions {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }

        .hw-btn-ghost {
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 13.5px; font-weight: 600;
          color: #0077B6;
          background: transparent;
          border: 1.5px solid rgba(0, 119, 182, 0.3);
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.18s ease;
          letter-spacing: -0.1px;
        }

        .hw-btn-ghost:hover {
          border-color: #0077B6;
          background: rgba(0, 119, 182, 0.06);
          transform: translateY(-1px);
        }

        .hw-btn-primary {
          padding: 9px 22px;
          border-radius: 10px;
          font-size: 13.5px; font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, #03045E 0%, #0077B6 60%, #00B4D8 100%);
          border: none;
          cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif;
          transition: all 0.18s ease;
          letter-spacing: -0.1px;
          box-shadow: 0 3px 14px rgba(0, 119, 182, 0.38);
          position: relative; overflow: hidden;
        }

        .hw-btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.08);
          opacity: 0;
          transition: opacity 0.18s ease;
        }

        .hw-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(0, 119, 182, 0.48);
        }

        .hw-btn-primary:hover::before { opacity: 1; }

        /* ── Hamburger ── */
        .hw-hamburger {
          display: none;
          flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }

        .hw-hamburger span {
          display: block; width: 22px; height: 2px;
          background: #03045E; border-radius: 2px;
          transition: all 0.25s ease;
        }

        .hw-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hw-hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
        .hw-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .hw-mobile-menu {
          display: none; flex-direction: column; gap: 2px;
          padding: 12px 20px 20px;
          background: rgba(202, 240, 248, 0.98);
          border-top: 1px solid rgba(0, 180, 216, 0.15);
          animation: hw-slide-down 0.2s ease;
        }

        @keyframes hw-slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hw-mobile-menu.open { display: flex; }

        .hw-mobile-link {
          padding: 11px 14px; font-size: 14px; font-weight: 600;
          color: #03045E; border-radius: 10px;
          cursor: pointer; transition: all 0.15s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: none; border: none; text-align: left;
          opacity: 0.7; display: flex; align-items: center; gap: 8px;
        }

        .hw-mobile-link:hover, .hw-mobile-link.active {
          opacity: 1; background: rgba(0, 119, 182, 0.08); color: #0077B6;
        }

        .hw-mobile-divider {
          height: 1px; background: rgba(0, 180, 216, 0.18); margin: 8px 0;
        }

        .hw-mobile-row {
          display: flex; gap: 8px; padding-top: 4px;
        }

        .hw-mobile-row button {
          flex: 1; padding: 11px 12px; font-size: 14px; font-weight: 600;
          border-radius: 10px; cursor: pointer;
          font-family: 'Plus Jakarta Sans', sans-serif; transition: all 0.15s ease;
        }

        .hw-m-ghost {
          color: #0077B6; background: transparent;
          border: 1.5px solid rgba(0, 119, 182, 0.3);
        }

        .hw-m-primary {
          color: #fff;
          background: linear-gradient(135deg, #03045E, #0077B6 70%, #00B4D8);
          border: none;
          box-shadow: 0 3px 12px rgba(0, 119, 182, 0.3);
        }

        @media (max-width: 840px) {
          .hw-links { display: none; }
          .hw-actions { display: none; }
          .hw-hamburger { display: flex; }
          .hw-nav-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className="hw-nav">
        <div className={`hw-nav-inner${scrolled ? " scrolled" : ""}`}>
          <div className="hw-container">
            {/* Logo */}
            <a className="hw-logo" onClick={() => navigate("/")}>
              <div className="hw-logo-mark">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2L13 8H17L14 12L15.5 18L10 15L4.5 18L6 12L3 8H7L10 2Z"
                    fill="#CAF0F8"
                    fillOpacity="0.95"
                  />
                </svg>
              </div>
              <span className="hw-logo-name">
                Hack<em>Wave</em>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hw-links">
              {NAV_LINKS.map((link) => (
                <div className="hw-link-wrap" key={link.label}>
                  <button
                    className={`hw-link${activeLink === link.label ? " active" : ""}`}
                    onClick={() => {
                      setActiveLink(link.label);
                      navigate(link.path);
                    }}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="hw-badge">
                        <span className="hw-badge-dot" />
                        Live
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="hw-actions">
              <button
                className="hw-btn-ghost"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="hw-btn-primary"
                onClick={() => navigate("/signup")}
              >
                Sign up free
              </button>
            </div>

            {/* Hamburger */}
            <button
              className={`hw-hamburger${menuOpen ? " open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`hw-mobile-menu${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              className={`hw-mobile-link${activeLink === link.label ? " active" : ""}`}
              onClick={() => {
                setActiveLink(link.label);
                navigate(link.path);
                setMenuOpen(false);
              }}
            >
              {link.label}
              {link.badge && (
                <span className="hw-badge">
                  <span className="hw-badge-dot" />
                  Live
                </span>
              )}
            </button>
          ))}
          <div className="hw-mobile-divider" />
          <div className="hw-mobile-row">
            <button
              className="hw-m-ghost"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              Log in
            </button>
            <button
              className="hw-m-primary"
              onClick={() => {
                navigate("/signup");
                setMenuOpen(false);
              }}
            >
              Sign up free
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
