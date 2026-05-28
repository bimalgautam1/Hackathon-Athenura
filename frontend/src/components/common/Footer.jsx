import { Zap } from "lucide-react";

// Branded SVG icons for social platforms
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  </svg>
);

export default function Footer() {
  const NAV_COLS = [
    {
      heading: "Platform",
      links: ["Explore Hackathons", "Results", "For Organizers"],
    },
    {
      heading: "Company",
      links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"],
    },
    {
      heading: "Resources",
      links: ["Documentation", "API", "Community", "Support"],
    },
  ];

  const SOCIALS = [
    {
      Icon: LinkedInIcon,
      href: "https://www.linkedin.com/company/athenura/posts/?feedView=all",
      label: "LinkedIn",
    },
    {
      Icon: InstagramIcon,
      href: "https://www.instagram.com/athenura.in",
      label: "Instagram",
    },
    {
      Icon: TwitterXIcon,
      href: "https://x.com/athenura_in",
      label: "Twitter / X",
    },
    { Icon: MediumIcon, href: "https://athenura.medium.com", label: "Medium" },
  ];

  return (
    <footer
      style={{
        background: "#03045E",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        margin: 0,
      }}
    >
      {/* Top border shimmer */}

      {/* Dot pattern */}

      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,180,216,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -60,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(144,224,239,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Stats bar ── */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "28px 24px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        ></div>
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "52px 24px 44px",
          display: "grid",
          gridTemplateColumns: "1.6fr 2.4fr",
          gap: 80,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand col */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.3px",
              cursor: "default",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(0,180,216,0.18)",
                border: "1px solid rgba(0,180,216,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={18} color="#90E0EF" />
            </div>
            <span>Hackathon-Athenura</span>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              lineHeight: 1.8,
              maxWidth: 290,
              marginBottom: 24,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            The world's leading platform for discovering and joining hackathons.
            Build, compete, and launch your next big idea.
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: 8 }}>
            {SOCIALS.map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,180,216,0.2)";
                  e.currentTarget.style.borderColor = "rgba(0,180,216,0.5)";
                  e.currentTarget.style.color = "#90E0EF";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links grid — pushed to the far right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            justifyContent: "end",
          }}
        >
          {NAV_COLS.map(({ heading, links }) => (
            <div key={heading}>
              <h5
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  color: "rgba(0,180,216,0.7)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 18,
                  marginTop: 0,
                }}
              >
                {heading}
              </h5>
              {links.map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    display: "block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 12,
                    textDecoration: "none",
                    paddingLeft: 0,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.paddingLeft = "8px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.paddingLeft = "0";
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            © 2026 Hackathon-Athenura. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
        footer input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </footer>
  );
}
