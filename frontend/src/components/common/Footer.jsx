import { Zap, ExternalLink, GitBranch, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="mt-20 relative overflow-hidden"
      style={{
        /* Gradient using full palette: #CAF0F8 → #90E0EF */
        background: "linear-gradient(160deg, #CAF0F8 0%, #90E0EF 100%)",
        color: "#03045E",
      }}
    >
      {/* Top border shimmer — uses #00B4D8 accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background:
            "linear-gradient(to right, transparent, #00B4D8, #0077B6, #00B4D8, transparent)",
        }}
      />

      {/* Subtle dot pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(rgba(0,119,182,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative glow blob */}
      <div
        style={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "60px 24px 40px",
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: 60,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#03045E",
              letterSpacing: "-0.3px",
              cursor: "default",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, #03045E, #0077B6 60%, #00B4D8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 18px rgba(0,119,182,0.35), 0 0 6px rgba(0,180,216,0.25)",
              }}
            >
              <Zap size={18} color="#CAF0F8" />
            </div>
            <span>Hackathon-Athenura</span>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.75,
              maxWidth: 280,
              marginTop: 16,
              marginBottom: 20,
              color: "rgba(3,4,94,0.6)",
            }}
          >
            The world's leading platform for discovering and joining hackathons.
            Build, compete, and launch your next big idea.
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            {[ExternalLink, GitBranch, Briefcase].map((Icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: 36,
                  height: 36,
                  background: "rgba(202, 240, 248, 0.6)" /* #CAF0F8 */,
                  border: "1px solid rgba(0, 180, 216, 0.3)",
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0077B6",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0, 180, 216, 0.2)";
                  e.currentTarget.style.borderColor = "#00B4D8";
                  e.currentTarget.style.color = "#03045E";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,119,182,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(202, 240, 248, 0.6)";
                  e.currentTarget.style.borderColor = "rgba(0, 180, 216, 0.3)";
                  e.currentTarget.style.color = "#0077B6";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Links grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
            position: "relative",
            zIndex: 1,
          }}
        >
          {[
            {
              heading: "Platform",
              links: [
                "Explore Hackathons",
                "Results",
                "Blog",
                "For Organizers",
              ],
            },

            {
              heading: "Company",
              links: [
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms of Service",
              ],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h5
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  color: "#0077B6" /* #0077B6 for headings */,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
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
                    fontWeight: 400,
                    color: "rgba(3,4,94,0.6)",
                    marginBottom: 11,
                    textDecoration: "none",
                    paddingLeft: 0,
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#0077B6";
                    e.currentTarget.style.paddingLeft = "10px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(3,4,94,0.6)";
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

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(0, 180, 216, 0.2)",
          padding: "18px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 400,
              color: "rgba(3,4,94,0.45)",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            © 2025 HackVerse. All rights reserved.
          </p>
          {/* Accent pill using #00B4D8 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              borderRadius: 20,
              background: "rgba(0, 180, 216, 0.12)",
              border: "1px solid rgba(0, 180, 216, 0.3)",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#00B4D8",
                animation: "footerPulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#0077B6",
                letterSpacing: "0.04em",
              }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes footerPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </footer>
  );
}
