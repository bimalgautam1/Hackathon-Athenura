import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { hackathons } from "../../data/hackathons";

const statusConfig = {
  upcoming: { label: "Upcoming", color: "#0077B6", bg: "rgba(0,119,182,0.18)" },
  ongoing: {
    label: "🔴 Live Now",
    color: "#00B4D8",
    bg: "rgba(0,180,216,0.18)",
  },
  past: { label: "Ended", color: "#90E0EF", bg: "rgba(144,224,239,0.12)" },
};

const TAB_ICONS = {
  overview: "◎",
  rules: "⬡",
  timeline: "◈",
  prizes: "◇",
  judging: "◉",
};

export default function HackathonDetail() {
  const { id } = useParams();
  const routerNavigate = useNavigate();
  const h = hackathons.find((hk) => String(hk.id) === String(id));
  if (!h)
    return (
      <div style={{ color: "#CAF0F8", padding: 40 }}>Hackathon not found.</div>
    );
  const [activeTab, setActiveTab] = useState("overview");
  const s = statusConfig[h.status];
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(h.deadline) - new Date()) / 86400000),
  );
  const tabs = ["overview", "rules", "timeline", "prizes", "judging"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #0a1f6e 0%, #0e3a7a 50%, #0a2d6b 100%)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      

      {/* ── HERO ── */}
      <div
        style={{
          position: "relative",
          height: 280,
          marginTop: 56,
          overflow: "hidden",
        }}
      >
        <img
          src={h.image}
          alt={h.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(10,31,110,0.05) 0%, rgba(10,31,110,0.55) 55%, rgba(10,31,110,0.95) 100%)",
          }}
        />

        <button
          onClick={() => routerNavigate("/hackathons")}
          style={{
            position: "absolute",
            top: 16,
            left: 24,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 16px",
            borderRadius: 10,
            background: "rgba(14, 100, 160, 0.85)",
            border: "1px solid rgba(0,180,216,0.4)",
            color: "#CAF0F8",
            fontSize: 13,
            cursor: "pointer",
            backdropFilter: "blur(10px)",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 32px 28px",
            maxWidth: 1152,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 10,
            }}
          >
            <Pill bg={s.bg} border={s.color} color="#fff">
              {s.label}
            </Pill>
            <Pill bg="rgba(0,180,216,0.18)" border="#00B4D8" color="#CAF0F8">
              {h.domain}
            </Pill>
            <Pill
              bg="rgba(202,240,248,0.08)"
              border="rgba(202,240,248,0.2)"
              color="#CAF0F8"
            >
              {h.mode === "solo"
                ? "👤 Solo"
                : `👥 Team (${h.teamSize.min}–${h.teamSize.max})`}
            </Pill>
          </div>
          <h1
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: 34,
              color: "#fff",
              margin: "0 0 4px",
              lineHeight: 1.2,
            }}
          >
            {h.title}
          </h1>
          <p style={{ margin: 0, color: "#90E0EF", fontSize: 15 }}>
            {h.tagline}
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 300px",
          gap: 24,
        }}
      >
        {/* LEFT */}
        <div style={{ minWidth: 0 }}>
          {/* Tab Bar */}
          <div
            style={{
              display: "flex",
              marginBottom: 20,
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(0,180,216,0.15)",
              border: "1px solid rgba(0,180,216,0.35)",
            }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: "10px 4px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    background: active
                      ? "linear-gradient(135deg, #0077B6, #00B4D8)"
                      : "transparent",
                    color: active ? "#fff" : "rgba(202,240,248,0.75)",
                    border: "none",
                    borderRight: "1px solid rgba(0,180,216,0.15)",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "capitalize",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{TAB_ICONS[tab]}</span>
                  <span>{tab}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Card */}
          <div
            style={{
              borderRadius: 24,
              padding: 32,
              background:
                "linear-gradient(145deg, rgba(0,150,210,0.22) 0%, rgba(10,40,110,0.5) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,180,216,0.22)",
              boxShadow: "0 8px 40px rgba(0,119,182,0.12)",
            }}
          >
            {activeTab === "overview" && (
              <div>
                <SectionHeading>About This Hackathon</SectionHeading>
                <p
                  style={{
                    color: "#CAF0F8",
                    opacity: 0.92,
                    fontSize: 14,
                    lineHeight: 1.75,
                    marginBottom: 28,
                    marginTop: 0,
                  }}
                >
                  {h.description}
                </p>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#fff",
                    fontSize: 14,
                    marginBottom: 12,
                    marginTop: 0,
                  }}
                >
                  Sponsors & Partners
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {h.sponsors.map((sp) => (
                    <div
                      key={sp}
                      style={{
                        padding: "7px 16px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        background: "rgba(0,180,216,0.12)",
                        border: "1px solid rgba(0,180,216,0.3)",
                        color: "#90E0EF",
                      }}
                    >
                      {sp}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "rules" && (
              <div>
                <SectionHeading>Rules & Guidelines</SectionHeading>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {h.rules.map((rule, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                        padding: "14px 16px",
                        borderRadius: 16,
                        background: "rgba(0,180,216,0.13)",
                        border: "1px solid rgba(0,180,216,0.28)",
                      }}
                    >
                      <span
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #0077B6, #00B4D8)",
                          color: "#fff",
                          fontSize: 12,
                          fontWeight: 900,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <p
                        style={{
                          margin: 0,
                          color: "#CAF0F8",
                          opacity: 0.95,
                          fontSize: 14,
                          lineHeight: 1.6,
                          paddingTop: 4,
                        }}
                      >
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div>
                <SectionHeading>Event Timeline</SectionHeading>
                <div style={{ position: "relative", paddingLeft: 36 }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 8,
                      top: 6,
                      bottom: 6,
                      width: 2,
                      background:
                        "linear-gradient(to bottom, #0077B6, #00B4D8, rgba(144,224,239,0.15))",
                      borderRadius: 2,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 28,
                    }}
                  >
                    {h.timeline.map((item, i) => {
                      const isPast = new Date(item.date) < new Date();
                      return (
                        <div key={i} style={{ position: "relative" }}>
                          <div
                            style={{
                              position: "absolute",
                              left: -32,
                              top: 3,
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              background: isPast ? "#0077B6" : "#00B4D8",
                              border: `2px solid ${isPast ? "rgba(202,240,248,0.4)" : "#CAF0F8"}`,
                              boxShadow: `0 0 10px ${isPast ? "rgba(0,119,182,0.5)" : "rgba(0,180,216,0.8)"}`,
                            }}
                          />
                          <span
                            style={{
                              display: "inline-block",
                              padding: "2px 10px",
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 600,
                              marginBottom: 4,
                              background: "rgba(0,180,216,0.15)",
                              color: "#00B4D8",
                              border: "1px solid rgba(0,180,216,0.3)",
                            }}
                          >
                            {item.date}
                          </span>
                          <div
                            style={{
                              fontFamily: "'Nunito', sans-serif",
                              fontWeight: 700,
                              fontSize: 15,
                              color: isPast
                                ? "rgba(202,240,248,0.5)"
                                : "#CAF0F8",
                            }}
                          >
                            {item.event}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "prizes" && (
              <div>
                <SectionHeading>Prizes & Rewards</SectionHeading>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {h.prizes.map((prize, i) => {
                    const c = [
                      {
                        bg: "rgba(251,191,36,0.09)",
                        border: "rgba(251,191,36,0.35)",
                        accent: "#FBBF24",
                        icon: "🥇",
                      },
                      {
                        bg: "rgba(202,240,248,0.06)",
                        border: "rgba(202,240,248,0.22)",
                        accent: "#CAF0F8",
                        icon: "🥈",
                      },
                      {
                        bg: "rgba(0,180,216,0.09)",
                        border: "rgba(0,180,216,0.28)",
                        accent: "#00B4D8",
                        icon: "🥉",
                      },
                    ][i] || {
                      bg: "rgba(0,180,216,0.09)",
                      border: "rgba(0,180,216,0.28)",
                      accent: "#00B4D8",
                      icon: "🏅",
                    };
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 18,
                          padding: "18px 20px",
                          borderRadius: 18,
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                        }}
                      >
                        <span style={{ fontSize: 36 }}>{c.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontFamily: "'Nunito', sans-serif",
                              fontWeight: 900,
                              fontSize: 24,
                              color: c.accent,
                            }}
                          >
                            {prize.amount}
                          </div>
                          <div
                            style={{
                              fontSize: 12,
                              color: "rgba(202,240,248,0.78)",
                            }}
                          >
                            {prize.place} Place
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: 12,
                            color: "rgba(202,240,248,0.82)",
                            textAlign: "right",
                          }}
                        >
                          {prize.perks}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "judging" && (
              <div>
                <SectionHeading>Judging Criteria</SectionHeading>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  {h.judging.map((j, i) => (
                    <div key={i}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            color: "#CAF0F8",
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {j.criterion}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Nunito', sans-serif",
                            fontWeight: 900,
                            fontSize: 14,
                            color: "#7fdef1",
                          }}
                        >
                          {j.weight}%
                        </span>
                      </div>
                      <div
                        style={{
                          height: 8,
                          borderRadius: 8,
                          background: "rgba(202,240,248,0.14)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: 8,
                            width: `${j.weight}%`,
                            background:
                              "linear-gradient(90deg, #0077B6, #00B4D8)",
                            boxShadow: "0 0 8px rgba(0,180,216,0.4)",
                            transition: "width 0.8s ease",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* CTA Card */}
          <div
            style={{
              borderRadius: 24,
              padding: 24,
              background:
                "linear-gradient(145deg, rgba(0,150,210,0.32), rgba(10,40,110,0.65))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,180,216,0.32)",
              boxShadow: "0 8px 40px rgba(0,119,182,0.2)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 900,
                  fontSize: 38,
                  color: "#00B4D8",
                }}
              >
                ${h.prize.toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(202,240,248,0.75)",
                  marginTop: 2,
                }}
              >
                Total Prize Pool
              </div>
            </div>

            {h.status !== "past" && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: "rgba(202,240,248,0.75)" }}
                  >
                    Registration closes in
                  </span>
                  <span
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 900,
                      fontSize: 14,
                      color: daysLeft <= 3 ? "#F87171" : "#CAF0F8",
                    }}
                  >
                    {daysLeft}d
                  </span>
                </div>
                <div
                  style={{
                    height: 6,
                    borderRadius: 6,
                    background: "rgba(202,240,248,0.14)",
                    marginBottom: 20,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 6,
                      width: `${Math.max(5, 100 - daysLeft * 3)}%`,
                      background:
                        daysLeft <= 3
                          ? "#F87171"
                          : "linear-gradient(90deg, #0077B6, #00B4D8)",
                    }}
                  />
                </div>
              </>
            )}

            <button
              onClick={() =>
                h.status !== "past" && routerNavigate(`/hackathons/${id}/join`)
              }
              onMouseEnter={(e) => {
                if (h.status !== "past")
                  e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 14,
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 900,
                fontSize: 16,
                border: "none",
                cursor: h.status === "past" ? "default" : "pointer",
                transition: "transform 0.15s",
                background:
                  h.status === "past"
                    ? "rgba(144,224,239,0.12)"
                    : "linear-gradient(135deg, #0077B6, #00B4D8)",
                color: h.status === "past" ? "#90E0EF" : "#fff",
                boxShadow:
                  h.status !== "past"
                    ? "0 8px 24px rgba(0,119,182,0.5)"
                    : "none",
              }}
            >
              {h.status === "past"
                ? "View Past Results"
                : h.status === "ongoing"
                  ? "Join Now 🚀"
                  : "Register Free →"}
            </button>

            {h.fee > 0 && h.status !== "past" && (
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(202,240,248,0.6)",
                  margin: "10px 0 0",
                }}
              >
                Registration fee:{" "}
                <span style={{ color: "#FBBF24" }}>${h.fee}</span> per{" "}
                {h.mode === "solo" ? "person" : "team"}
              </p>
            )}
          </div>

          {/* Quick Info Card */}
          <div
            style={{
              borderRadius: 24,
              padding: "8px 20px",
              background: "rgba(0,150,210,0.16)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,180,216,0.18)",
            }}
          >
            {[
              { icon: "📅", label: "Start Date", value: h.startDate },
              { icon: "🏁", label: "End Date", value: h.endDate },
              {
                icon: "👥",
                label: "Participants",
                value: h.participants.toLocaleString() + "+",
              },
              {
                icon: "💰",
                label: "Entry Fee",
                value: h.fee === 0 ? "Free" : `$${h.fee}`,
              },
              {
                icon: "🎯",
                label: "Mode",
                value:
                  h.mode === "solo"
                    ? "Solo"
                    : `Team (${h.teamSize.min}–${h.teamSize.max})`,
              },
            ].map((item, i, arr) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 0",
                  borderBottom:
                    i < arr.length - 1
                      ? "1px solid rgba(0,180,216,0.1)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    width: 28,
                    flexShrink: 0,
                    textAlign: "center",
                  }}
                >
                  {item.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(202,240,248,0.65)",
                      marginBottom: 1,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 600, color: "#CAF0F8" }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2
      style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 900,
        fontSize: 22,
        color: "#fff",
        margin: "0 0 20px",
        letterSpacing: "-0.3px",
      }}
    >
      {children}
    </h2>
  );
}

function Pill({ bg, border, color, children }) {
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: bg,
        border: `1px solid ${border}`,
        color,
      }}
    >
      {children}
    </span>
  );
}
