import { useState } from "react";

const DOMAINS = [
  { label: "All", icon: "✦" },
  { label: "AI/ML", icon: "🤖" },
  { label: "Web3", icon: "🔗" },
  { label: "HealthTech", icon: "❤️" },
  { label: "FinTech", icon: "💰" },
  { label: "EdTech", icon: "📚" },
  { label: "GreenTech", icon: "🌱" },
  { label: "Open Innovation", icon: "💡" },
];

const PRIZE_RANGES = [
  { label: "Any Prize", value: "" },
  { label: "< $1K", value: "0-1000" },
  { label: "$1K – $5K", value: "1000-5000" },
  { label: "$5K – $20K", value: "5000-20000" },
  { label: "$20K+", value: "20000-999999" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  .hf-root * {
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
  }

  .hf-root {
    --white: #ffffff;
    --glass-bg: rgba(255, 255, 255, 0.97);
    --glass-border: rgba(255, 255, 255, 0.6);
    --accent: #6366f1;
    --accent-2: #8b5cf6;
    --accent-light: #ede9fe;
    --accent-mid: #c4b5fd;
    --text-primary: #1e1b4b;
    --text-secondary: #6b7280;
    --text-muted: #9ca3af;
    --surface: #f5f3ff;
    --border: #e5e7eb;
    --pill-active-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
    --card-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
  }

  .hf-card {
    background: var(--glass-bg);
    border: 1.5px solid var(--glass-border);
    border-radius: 24px;
    padding: 28px 28px 22px;
    margin-bottom: 32px;
    box-shadow: var(--card-shadow);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .hf-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa, #6366f1);
    background-size: 200% 100%;
    animation: hf-shimmer 3s linear infinite;
  }

  @keyframes hf-shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .hf-search-wrap {
    position: relative;
    margin-bottom: 24px;
  }

  .hf-search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--accent);
    font-size: 16px;
    pointer-events: none;
  }

  .hf-search-input {
    width: 100%;
    padding: 13px 16px 13px 44px;
    border-radius: 14px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    color: var(--text-primary);
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .hf-search-input::placeholder {
    color: var(--text-muted);
  }

  .hf-search-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  .hf-filters-row {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .hf-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .hf-label {
    font-family: 'Syne', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .hf-pills {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .hf-pill {
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 1.5px solid var(--border);
    background: white;
    color: var(--text-secondary);
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }

  .hf-pill:hover {
    border-color: var(--accent-mid);
    color: var(--accent);
    background: var(--accent-light);
    transform: translateY(-1px);
  }

  .hf-pill.active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-color: transparent;
    box-shadow: var(--pill-active-shadow);
    transform: translateY(-1px);
  }

  .hf-select {
    padding: 8px 36px 8px 14px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid var(--border);
    background: white;
    color: var(--text-secondary);
    font-family: 'DM Sans', sans-serif;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    transition: all 0.18s;
  }

  .hf-select:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
    color: var(--accent);
  }

  .hf-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border), transparent);
    margin: 20px 0 18px;
  }

  .hf-domain-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .hf-domain-chip {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 7px 14px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
    border: 1.5px solid var(--border);
    background: white;
    color: var(--text-secondary);
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
  }

  .hf-domain-chip:hover {
    border-color: var(--accent-mid);
    color: var(--accent);
    background: var(--accent-light);
    transform: translateY(-1px);
  }

  .hf-domain-chip.active {
    background: var(--accent-light);
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99,102,241,0.15);
  }

  .hf-active-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px dashed var(--border);
    margin-top: 6px;
  }

  .hf-active-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .hf-active-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    animation: hf-pulse 1.8s ease-in-out infinite;
  }

  @keyframes hf-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
  }

  .hf-clear-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    background: var(--accent-light);
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }

  .hf-clear-btn:hover {
    background: var(--accent);
    color: white;
  }
`;

export default function HackathonFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    status: "all",
    mode: "all",
    fee: "all",
    prize: "",
    domain: "All",
    search: "",
  });

  const update = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange?.(next);
  };

  const isFiltered =
    filters.status !== "all" ||
    filters.mode !== "all" ||
    filters.fee !== "all" ||
    filters.prize ||
    filters.domain !== "All" ||
    filters.search;

  const reset = () => {
    const r = {
      status: "all",
      mode: "all",
      fee: "all",
      prize: "",
      domain: "All",
      search: "",
    };
    setFilters(r);
    onFilterChange?.(r);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="hf-root">
        <div className="hf-card">
          {/* Search */}
          <div className="hf-search-wrap">
            <span className="hf-search-icon">🔍</span>
            <input
              type="text"
              className="hf-search-input"
              placeholder="Search hackathons by name or keyword..."
              value={filters.search}
              onChange={(e) => update("search", e.target.value)}
            />
          </div>

          <div className="hf-filters-row">
            {/* Status */}
            <div className="hf-group">
              <p className="hf-label">Status</p>
              <div className="hf-pills">
                {["all", "upcoming", "ongoing", "past"].map((s) => (
                  <button
                    key={s}
                    onClick={() => update("status", s)}
                    className={`hf-pill${filters.status === s ? " active" : ""}`}
                  >
                    {s === "all"
                      ? "All"
                      : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="hf-group">
              <p className="hf-label">Mode</p>
              <div className="hf-pills">
                {[
                  { val: "all", label: "All" },
                  { val: "solo", label: "👤 Solo" },
                  { val: "team", label: "👥 Team" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    onClick={() => update("mode", val)}
                    className={`hf-pill${filters.mode === val ? " active" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fee */}
            <div className="hf-group">
              <p className="hf-label">Entry Fee</p>
              <div className="hf-pills">
                {[
                  { val: "all", label: "All" },
                  { val: "free", label: "🎁 Free" },
                  { val: "paid", label: "💳 Paid" },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    onClick={() => update("fee", val)}
                    className={`hf-pill${filters.fee === val ? " active" : ""}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prize */}
            <div className="hf-group">
              <p className="hf-label">Prize Pool</p>
              <select
                value={filters.prize}
                onChange={(e) => update("prize", e.target.value)}
                className="hf-select"
              >
                {PRIZE_RANGES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hf-divider" />

          {/* Domains */}
          <div className="hf-group">
            <p className="hf-label">Technology Domain</p>
            <div className="hf-domain-row">
              {DOMAINS.map(({ label, icon }) => (
                <button
                  key={label}
                  onClick={() => update("domain", label)}
                  className={`hf-domain-chip${filters.domain === label ? " active" : ""}`}
                >
                  <span>{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters */}
          {isFiltered && (
            <div className="hf-active-bar">
              <span className="hf-active-label">
                <span className="hf-active-dot" />
                Filters active
              </span>
              <button className="hf-clear-btn" onClick={reset}>
                ✕ Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
