import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { hackathons, domains, statuses, modes } from "../../data/hackathons";
import HackathonCard from "./HackathonCard";
import HackathonFilters from "./HackathonFilters";
import Navbar from "./Navbar";

export default function HackathonList() {
  // ✅ Use react-router-dom's navigate so the URL actually changes to /hackathons/:id
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: "all",
    mode: "all",
    domain: "All",
    prizeMax: 100000,
    feeType: "all",
    search: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return hackathons.filter((h) => {
      if (filters.status !== "all" && h.status !== filters.status) return false;
      if (filters.mode !== "all" && h.mode !== filters.mode) return false;
      if (filters.domain !== "All" && h.domain !== filters.domain) return false;
      if (h.prize > filters.prizeMax) return false;
      if (filters.feeType === "free" && h.fee > 0) return false;
      if (filters.feeType === "paid" && h.fee === 0) return false;
      if (
        filters.search &&
        !h.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !h.domain.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters]);

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  // White pill button style for the dropdown filter panel
  const whitePill = (active) => ({
    padding: "7px 16px",
    borderRadius: 999,
    fontSize: 12,
    fontFamily: "Poppins,sans-serif",
    fontWeight: 600,
    cursor: "pointer",
    border: active ? "none" : "1.5px solid #e5e7eb",
    background: active ? "#6c63ff" : "#fff",
    color: active ? "#fff" : "#374151",
    transition: "all 0.15s",
  });
  const filterLabelStyle = {
    fontFamily: "Poppins,sans-serif",
    fontSize: 10,
    fontWeight: 700,
    color: "#9ca3af",
    letterSpacing: "0.07em",
    marginBottom: 8,
  };

  const statusColor = {
    upcoming: "#0077B6",
    ongoing: "#00B4D8",
    past: "#90E0EF",
  };
  const statusCounts = {
    all: hackathons.length,
    upcoming: hackathons.filter((h) => h.status === "upcoming").length,
    ongoing: hackathons.filter((h) => h.status === "ongoing").length,
    past: hackathons.filter((h) => h.status === "past").length,
  };

  const pill = (active, onClick, children, activeColor = "#0077B6") => ({
    onClick,
    style: {
      padding: "6px 14px",
      borderRadius: 999,
      fontSize: 12,
      fontFamily: "Poppins, sans-serif",
      fontWeight: 600,
      cursor: "pointer",
      border: active ? "none" : "1px solid rgba(202,240,248,0.15)",
      background: active ? activeColor : "rgba(202,240,248,0.06)",
      color: active ? "white" : "rgba(202,240,248,0.55)",
      transition: "all 0.2s",
    },
    children,
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          background: "#03045E",
          paddingTop: 68,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle dot grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px 40px 70px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Live badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 16px",
                borderRadius: 999,
                marginBottom: 24,
                background: "rgba(202,240,248,0.08)",
                border: "1px solid rgba(202,240,248,0.2)",
                color: "#CAF0F8",
                fontFamily: "Poppins,sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#34D399",
                  display: "inline-block",
                  animation: "heroPulse 1.8s ease-in-out infinite",
                }}
              />
              {statusCounts.ongoing} Hackathon
              {statusCounts.ongoing !== 1 ? "s" : ""} Live Now
            </span>

            <h1
              style={{
                fontFamily: "Nunito,sans-serif",
                fontWeight: 900,
                color: "white",
                lineHeight: 1.08,
                fontSize: "clamp(2rem,4vw,3.4rem)",
                margin: "0 0 10px",
                letterSpacing: "-1px",
              }}
            >
              Build, Compete and
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#CAF0F8,#00B4D8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Change the World.
              </span>
            </h1>

            <p
              style={{
                fontFamily: "Poppins,sans-serif",
                fontSize: 15,
                color: "rgba(202,240,248,0.65)",
                margin: "0 0 32px",
                lineHeight: 1.75,
                maxWidth: 460,
              }}
            >
              Discover world-class hackathons, compete with the best minds, and
              turn your ideas into reality.
            </p>

            {/* Search */}
            <div
              style={{ position: "relative", maxWidth: 460, marginBottom: 40 }}
            >
              <svg
                style={{
                  position: "absolute",
                  left: 15,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
                width="16"
                height="16"
                fill="none"
                stroke="#b4d2d7"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search hackathons, domains..."
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  paddingLeft: 44,
                  paddingRight: 16,
                  paddingTop: 13,
                  paddingBottom: 13,
                  borderRadius: 14,
                  fontFamily: "Poppins,sans-serif",
                  fontSize: 13,
                  outline: "none",
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                }}
              />
            </div>

            {/* Stats row */}
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "12px 36px" }}
            >
              {[
                ["Hackathons", hackathons.length + "+"],
                ["Prize Pool", "$120K+"],
                ["Participants", "4,660+"],
                ["Countries", "60+"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "Nunito,sans-serif",
                      fontWeight: 900,
                      fontSize: 24,
                      color: "#ffffff",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Poppins,sans-serif",
                      fontSize: 10,
                      color: "rgba(202,240,248,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginTop: 3,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div style={{ position: "relative" }}>
            {/* Image */}
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "4/3",
                position: "relative",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.legFa7fmUsOx22F-QNJ-kwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Hackathon in progress"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Overlay tint */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg,rgba(3,4,94,0.25) 0%,transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes heroPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.75); }
          }
        `}</style>
      </section>

      {/* ── Sticky filter bar ── */}
      <div
        style={{
          position: "sticky",
          top: 56,
          zIndex: 40,
          padding: "10px 24px",
          overflow: "visible",
          background: "rgba(3,4,94,0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(202,240,248,0.09)",
        }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            {/* Status */}
            <div style={{ display: "flex", gap: 5 }}>
              {statuses.map((s) => (
                <button
                  key={s}
                  {...pill(
                    filters.status === s,
                    () => setFilter("status", s),
                    <>
                      {s}{" "}
                      {s !== "all" && (
                        <span style={{ opacity: 0.65 }}>
                          ({statusCounts[s]})
                        </span>
                      )}
                    </>,
                    statusColor[s] || "#0077B6",
                  )}
                />
              ))}
            </div>

            <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
              {/* Mode */}
              {modes.map((m) => (
                <button
                  key={m}
                  {...pill(
                    filters.mode === m,
                    () => setFilter("mode", m),
                    m === "all" ? "All" : m === "solo" ? "👤 Solo" : "👥 Team",
                    "#00B4D8",
                  )}
                />
              ))}
              {/* More filters toggle */}
              <button
                {...pill(
                  showFilters,
                  () => setShowFilters(!showFilters),
                  `⚙️ Filters ${showFilters ? "▲" : "▼"}`,
                  "#0077B6",
                )}
              />
            </div>
          </div>

          {/* Click-outside overlay */}
          {showFilters && (
            <div
              onClick={() => setShowFilters(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 49,
              }}
            />
          )}
          {/* Extended filters – white card panel */}
          {showFilters && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                right: 0,
                zIndex: 50,
                margin: "0 24px",
                borderRadius: 16,
                background: "#ffffff",
                boxShadow:
                  "0 8px 40px rgba(3,4,94,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                padding: "24px 28px 20px",
              }}
            >
              {/* Row 1: STATUS · MODE · ENTRY FEE · PRIZE POOL */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "24px 40px",
                  alignItems: "flex-start",
                  marginBottom: 22,
                }}
              >
                {/* STATUS */}
                <div>
                  <div style={filterLabelStyle}>STATUS</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {statuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilter("status", s)}
                        style={whitePill(filters.status === s)}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        {s !== "all" && (
                          <span style={{ opacity: 0.55, marginLeft: 3 }}>
                            ({statusCounts[s]})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MODE */}
                <div>
                  <div style={filterLabelStyle}>MODE</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {modes.map((m) => (
                      <button
                        key={m}
                        onClick={() => setFilter("mode", m)}
                        style={whitePill(filters.mode === m)}
                      >
                        {m === "all"
                          ? "All"
                          : m === "solo"
                            ? "👤 Solo"
                            : "👥 Team"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ENTRY FEE */}
                <div>
                  <div style={filterLabelStyle}>ENTRY FEE</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[
                      ["all", "All"],
                      ["free", "🎁 Free"],
                      ["paid", "💳 Paid"],
                    ].map(([val, label]) => (
                      <button
                        key={val}
                        onClick={() => setFilter("feeType", val)}
                        style={whitePill(filters.feeType === val)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PRIZE POOL */}
                <div style={{ minWidth: 200 }}>
                  <div style={filterLabelStyle}>
                    PRIZE POOL ·{" "}
                    <span style={{ color: "#6c63ff", fontWeight: 700 }}>
                      ${filters.prizeMax.toLocaleString()}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#9ca3af",
                        fontFamily: "Poppins,sans-serif",
                      }}
                    >
                      $5K
                    </span>
                    <input
                      type="range"
                      min="5000"
                      max="100000"
                      step="5000"
                      value={filters.prizeMax}
                      onChange={(e) =>
                        setFilter("prizeMax", Number(e.target.value))
                      }
                      style={{
                        flex: 1,
                        accentColor: "#6c63ff",
                        cursor: "pointer",
                        height: 4,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        color: "#9ca3af",
                        fontFamily: "Poppins,sans-serif",
                      }}
                    >
                      $100K
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{ height: 1, background: "#f0f0f5", margin: "0 0 18px" }}
              />

              {/* Row 2: TECHNOLOGY DOMAIN */}
              <div>
                <div style={filterLabelStyle}>TECHNOLOGY DOMAIN</div>
                <div
                  style={{
                    display: "flex",
                    gap: 7,
                    flexWrap: "wrap",
                    marginTop: 2,
                  }}
                >
                  {domains.map((d) => (
                    <button
                      key={d}
                      onClick={() => setFilter("domain", d)}
                      style={{
                        padding: "7px 16px",
                        borderRadius: 999,
                        fontSize: 12,
                        fontFamily: "Poppins,sans-serif",
                        fontWeight: 600,
                        cursor: "pointer",
                        border:
                          filters.domain === d
                            ? "2px solid #6c63ff"
                            : "1.5px solid #e5e7eb",
                        background:
                          filters.domain === d
                            ? "rgba(108,99,255,0.08)"
                            : "#fff",
                        color: filters.domain === d ? "#6c63ff" : "#374151",
                        transition: "all 0.15s",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div
        style={{ maxWidth: 1152, margin: "0 auto", padding: "36px 24px 60px" }}
      >
        <p
          style={{
            fontFamily: "Poppins,sans-serif",
            fontSize: 13,
            color: "rgba(202,240,248,0.55)",
            marginBottom: 20,
          }}
        >
          Showing <strong style={{ color: "white" }}>{filtered.length}</strong>{" "}
          hackathon{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🌊</div>
            <h3
              style={{
                fontFamily: "Nunito,sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: "white",
                margin: "0 0 8px",
              }}
            >
              No hackathons found
            </h3>
            <p
              style={{
                fontFamily: "Poppins,sans-serif",
                fontSize: 13,
                color: "rgba(202,240,248,0.45)",
              }}
            >
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%,340px),1fr))",
              gap: 22,
            }}
          >
            {filtered.map((h, i) => (
              <HackathonCard
                key={h.id}
                hackathon={h}
                navigate={navigate}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
