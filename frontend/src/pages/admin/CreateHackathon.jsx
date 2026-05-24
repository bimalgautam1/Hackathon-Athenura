import { useState, useRef, useEffect } from "react";
const Icon = ({ d, size = 18, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const Icons = {
  LayoutDashboard: (p) => <Icon {...p} d={["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"]} />,
  Trophy: (p) => <Icon {...p} d={["M6 9H4.5a2.5 2.5 0 0 1 0-5H6", "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", "M4 22h16", "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", "M18 2H6v7a6 6 0 0 0 12 0V2z"]} />,
  Users: (p) => <Icon {...p} d={["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]} />,
  Gavel: (p) => <Icon {...p} d={["m14.5 12.5-8 8a2.119 2.119 0 0 1-3-3l8-8", "m16 16 6-6", "m8 8 6-6", "m9 7 8 8", "m21 11-8-8"]} />,
  FileBarChart: (p) => <Icon {...p} d={["M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z", "M10 12v4", "M14 10v6", "M18 14v2", "M3 2 1 4"]} />,
  Award: (p) => <Icon {...p} d={["m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526", "M8.589 8.053a3.5 3.5 0 1 0 6.82 0"]} />,
  GraduationCap: (p) => <Icon {...p} d={["M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z", "M22 10v6", "M6 12.5V16a6 3 0 0 0 12 0v-3.5"]} />,
  PlusCircle: (p) => <Icon {...p} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 8v8", "M8 12h8"]} />,
  Bell: (p) => <Icon {...p} d={["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"]} />,
  Settings: (p) => <Icon {...p} d={["M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"]} />,
  Activity: (p) => <Icon {...p} d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  Search: (p) => <Icon {...p} d={["M21 21l-4.35-4.35", "M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z"]} />,
  Save: (p) => <Icon {...p} d={["M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", "M17 21v-8H7v8", "M7 3v5h8"]} />,
  Plus: (p) => <Icon {...p} d={["M12 5v14", "M5 12h14"]} />,
  Trash2: (p) => <Icon {...p} d={["M3 6h18", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", "M10 11v6", "M14 11v6"]} />,
  Calendar: (p) => <Icon {...p} d={["M8 2v4", "M16 2v4", "M3 10h18", "M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6z"]} />,
  UploadCloud: (p) => <Icon {...p} d={["M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", "M12 12v9", "M8 17l4-4 4 4"]} />,
  Lightbulb: (p) => <Icon {...p} d={["M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5", "M9 18h6", "M10 22h4"]} />,
  ChevronDown: (p) => <Icon {...p} d="M6 9l6 6 6-6" />,
  X: (p) => <Icon {...p} d={["M18 6 6 18", "M6 6l12 12"]} />,
};
const globalStyles = `
  :root {
    --color-primary: #3b82f6;
    --color-primary-foreground: #ffffff;
    --color-background: #f8fafc;
    --color-foreground: #0f172a;
    --color-muted: #f1f5f9;
    --color-muted-foreground: #64748b;
    --color-border: #e2e8f0;
    --color-card: #ffffff;
    --color-accent: #eff6ff;
    --color-accent-foreground: #1d4ed8;
    --color-destructive: #ef4444;
    --gradient-primary: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
    --gradient-sidebar: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
    --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-elevated: 0 4px 24px rgba(59,130,246,0.12), 0 2px 8px rgba(0,0,0,0.06);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--color-background); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: var(--color-foreground); }

  /* Custom themed select dropdown */
  .themed-select {
    width: 100%;
    border-radius: 12px;
    border: 1px solid var(--color-border);
    background: white;
    padding: 10px 36px 10px 14px;
    font-size: 14px;
    color: var(--color-foreground);
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
    transition: all 0.15s;
    outline: none;
    background-image: none;
  }
  .themed-select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(59,130,246,0.15);
  }
  .themed-select:hover {
    border-color: #94a3b8;
  }
  .themed-select option {
    background: white;
    color: var(--color-foreground);
    padding: 8px 12px;
  }
  .themed-select option:checked,
  .themed-select option:hover {
    background: var(--color-accent);
    color: var(--color-accent-foreground);
  }

  /* Custom scrollbar for sidebar */
  .sidebar-nav::-webkit-scrollbar { width: 4px; }
  .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
  .sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

  /* Animations */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in-up {
    animation: fadeInUp 0.35s ease forwards;
  }
  @keyframes slideIn {
    from { transform: translateX(-280px); }
    to { transform: translateX(0); }
  }
  .sidebar-enter { animation: slideIn 0.3s cubic-bezier(0.32,0.72,0,1) forwards; }
  @keyframes slideOut {
    from { transform: translateX(0); }
    to { transform: translateX(-280px); }
  }
  .sidebar-exit { animation: slideOut 0.3s cubic-bezier(0.32,0.72,0,1) forwards; }

  /* Checkbox accent */
  input[type="checkbox"] { accent-color: var(--color-primary); }

  /* File input hidden */
  input[type="file"].hidden-file { display: none; }

  /* Dropdown select arrow wrapper */
  .select-wrap { position: relative; }
  .select-wrap .chevron-icon {
    pointer-events: none;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-muted-foreground);
  }
`;
const inputStyle = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid var(--color-border)",
  background: "white",
  padding: "10px 14px",
  fontSize: 14,
  color: "var(--color-foreground)",
  transition: "all 0.15s",
  outline: "none",
};

const inputFocusHandlers = {
  onFocus: (e) => {
    e.target.style.borderColor = "var(--color-primary)";
    e.target.style.boxShadow = "0 0 0 4px rgba(59,130,246,0.15)";
  },
  onBlur: (e) => {
    e.target.style.borderColor = "var(--color-border)";
    e.target.style.boxShadow = "none";
  },
};
function Chip({ label, onRemove }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      borderRadius: 8, background: "var(--color-accent)",
      padding: "4px 10px", fontSize: 12, fontWeight: 500,
      color: "var(--color-accent-foreground)",
    }}>
      {label}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "grid", placeItems: "center", padding: 2,
            borderRadius: 4, color: "inherit",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "none"}
        >
          <Icons.X size={12} />
        </button>
      )}
    </span>
  );
}

function Field({ label, required, children, helper }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 14, fontWeight: 600, color: "var(--color-foreground)" }}>
        {label}{" "}
        {required && <span style={{ color: "var(--color-destructive)" }}>*</span>}
      </label>
      {children}
      {helper && <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>{helper}</p>}
    </div>
  );
}

function Card({ title, children, style = {} }) {
  return (
    <div className="fade-in-up" style={{
      borderRadius: 16,
      border: "1px solid var(--color-border)",
      background: "var(--color-card)",
      padding: 24,
      boxShadow: "var(--shadow-card)",
      transition: "box-shadow 0.2s",
      ...style,
    }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--shadow-elevated)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card)"}
    >
      <h3 style={{ marginBottom: 20, fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-foreground)" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {children}
      </div>
    </div>
  );
}

function ThemedSelect({ value, onChange, options, placeholder }) {
  return (
    <div className="select-wrap">
      <select
        className="themed-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      <span className="chevron-icon">
        <Icons.ChevronDown size={16} />
      </span>
    </div>
  );
}
const navItems = [
  { icon: Icons.LayoutDashboard, label: "Analytics Dashboard" },
  { icon: Icons.Trophy, label: "Hackathon Management" },
  { icon: Icons.Users, label: "User Management" },
  { icon: Icons.Gavel, label: "Judge Management" },
  { icon: Icons.FileBarChart, label: "Reports & Export" },
  { icon: Icons.Award, label: "Result Declaration" },
  { icon: Icons.GraduationCap, label: "University Dashboard" },
  { icon: Icons.PlusCircle, label: "Create Hackathon", active: true },
  { icon: Icons.Bell, label: "Real-time Notifications" },
  { icon: Icons.Settings, label: "Settings" },
  { icon: Icons.Activity, label: "Activity Log" },
];
export default function CreateHackathonPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("");
  const [allowedModes, setAllowedModes] = useState([]);
  const [minTeam, setMinTeam] = useState(1);
  const [maxTeam, setMaxTeam] = useState(4);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [regDeadline, setRegDeadline] = useState("");
  const [subDeadline, setSubDeadline] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [regFee, setRegFee] = useState("");
  const [currency, setCurrency] = useState("");
  const [domains, setDomains] = useState([]);
  const [domainInput, setDomainInput] = useState("");
  const [problem, setProblem] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [rules, setRules] = useState([]);
  const [studentOnly, setStudentOnly] = useState(false);
  const [years, setYears] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const fileRef = useRef();

  // Load saved draft on mount
  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem("hackathonDraft") || "null");
      if (!draft) return;
      if (draft.title) setTitle(draft.title);
      if (draft.slug) setSlug(draft.slug);
      if (draft.desc) setDesc(draft.desc);
      if (draft.status) setStatus(draft.status);
      if (draft.mode) setMode(draft.mode);
      if (draft.allowedModes) setAllowedModes(draft.allowedModes);
      if (draft.minTeam) setMinTeam(draft.minTeam);
      if (draft.maxTeam) setMaxTeam(draft.maxTeam);
      if (draft.startDate) setStartDate(draft.startDate);
      if (draft.endDate) setEndDate(draft.endDate);
      if (draft.regDeadline) setRegDeadline(draft.regDeadline);
      if (draft.subDeadline) setSubDeadline(draft.subDeadline);
      if (draft.prizePool) setPrizePool(draft.prizePool);
      if (draft.regFee) setRegFee(draft.regFee);
      if (draft.currency) setCurrency(draft.currency);
      if (draft.domains) setDomains(draft.domains);
      if (draft.problem) setProblem(draft.problem);
      if (draft.criteria) setCriteria(draft.criteria);
      if (draft.rules) setRules(draft.rules);
      if (draft.studentOnly !== undefined) setStudentOnly(draft.studentOnly);
      if (draft.years) setYears(draft.years);
    } catch { }
  }, []);
  const toggleMode = (m) =>
    setAllowedModes((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );

  const totalWeight = criteria.reduce((s, c) => s + Number(c.weight || 0), 0);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) setUploadedFile(f.name);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type === "application/pdf") setUploadedFile(f.name);
  };

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const handleSaveDraft = () => {
    const draft = {
      title, slug, desc, status, mode, allowedModes,
      minTeam, maxTeam, startDate, endDate, regDeadline,
      subDeadline, prizePool, regFee, currency, domains,
      problem, criteria, rules, studentOnly, years,
    };
    localStorage.setItem("hackathonDraft", JSON.stringify(draft));
    alert("Draft saved! It will be here when you come back.");
  };
  const handleCreate = () => {
    if (!title || !status || !mode) {
      alert("Please fill in all required fields.");
      return;
    }
    const newHackathon = {
      id: crypto.randomUUID(),
      name: title,
      subtitle: desc || slug,
      status: status || "Upcoming",
      regFrom: regDeadline || "",
      regTo: regDeadline || "",
      eventFrom: startDate || "",
      eventTo: endDate || "",
      submissionDeadline: subDeadline || "",
      resultsDate: "",
      prize: Number(prizePool) || 0,
      mode: mode || "Online",
      teamSize: `${minTeam} - ${maxTeam} Members`,
      eligibility: studentOnly ? "Students Only" : "All Students",
      organizedBy: "",
      description: desc || "",
      iconKey: "ai",
      iconBg: "from-blue-500 to-indigo-600",
      settings: {
        publiclyVisible: true, registrationOpen: true,
        allowTeamChanges: false, requireApproval: false,
        sendEmailUpdates: true, showLeaderboard: true,
      },
    };
    const existing = JSON.parse(localStorage.getItem("tempHackathons") || "[]");
    localStorage.setItem("tempHackathons", JSON.stringify([newHackathon, ...existing]));
    alert("Hackathon created successfully!");
  };

  return (
    <>
      <style>{globalStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-[#ecfcff] via-[#f8ffff] to-[#dff7ff] text-slate-800">

        <div>
          <nav className="border-b border-white/40">
            <div className="px-6 lg:px-10 py-4 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-2xl font-bold text-[#0b1b52]">Create Hackathon</p>
                  <p className="text-xs text-slate-400">Fill in the details below to create a new hackathon</p>
                </div>
              </div>
              <div className="flex-1" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <button
                  onClick={handleSaveDraft}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    borderRadius: 12, border: "1px solid var(--color-border)",
                    background: "white", padding: "10px 16px", fontSize: 14,
                    fontWeight: 600, color: "var(--color-foreground)", cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-muted)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Icons.Save size={16} /> Save as Draft
                </button>
                <button
                  onClick={handleCreate}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    borderRadius: 12, border: "none",
                    background: "var(--gradient-primary)", padding: "10px 16px", fontSize: 14,
                    fontWeight: 600, color: "white", cursor: "pointer",
                    transition: "transform 0.15s", boxShadow: "var(--shadow-elevated)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                  onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
                  onMouseUp={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                >
                  <Icons.PlusCircle size={16} /> Create Hackathon
                </button>
              </div>
              <button type="button" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-white/80 shadow-md hover:ring-blue-300 transition">
                <img src="https://i.pravatar.cc/80" alt="Account" className="h-full w-full object-cover" />
              </button>
            </div>
          </nav>

          <main style={{ padding: "32px 24px" }}>
            <div style={{ marginBottom: 32, display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
              <div>

              </div>

            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}>

              <Card title="1. Basic Information">
                <Field label="Title" required>
                  <input
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Enter hackathon title"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </Field>
                <Field label="Slug" required helper="This will be used in the URL">
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="enter-hackathon-slug"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </Field>
                <Field label="Description" required>
                  <div style={{ position: "relative" }}>
                    <textarea
                      rows={4}
                      maxLength={1000}
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Enter detailed description about the hackathon"
                      style={{ ...inputStyle, resize: "none" }}
                      {...inputFocusHandlers}
                    />
                    <span style={{
                      position: "absolute", bottom: 8, right: 12,
                      fontSize: 10, color: "var(--color-muted-foreground)", pointerEvents: "none",
                    }}>{desc.length} / 1000</span>
                  </div>
                </Field>
                <Field label="Status" required helper="Draft, Upcoming, Ongoing, Completed, Cancelled">
                  <ThemedSelect
                    value={status}
                    onChange={setStatus}
                    placeholder="Select status"
                    options={["Draft", "Upcoming", "Ongoing", "Completed", "Cancelled"]}
                  />
                </Field>
              </Card>
              <Card title="2. Participation">
                <Field label="Mode" required helper="Select the primary mode of the hackathon">
                  <ThemedSelect
                    value={mode}
                    onChange={setMode}
                    placeholder="Select mode"
                    options={["Online", "Offline", "Hybrid"]}
                  />
                </Field>
                <Field label="Allowed Modes" required helper="Select all allowed participation modes">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {["Solo", "Team", "Solo & Team"].map((m) => (
                      <label
                        key={m}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          borderRadius: 8, border: `1px solid ${allowedModes.includes(m) ? "rgba(59,130,246,0.4)" : "var(--color-border)"}`,
                          background: allowedModes.includes(m) ? "var(--color-accent)" : "white",
                          padding: "8px 12px", fontSize: 14, cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={allowedModes.includes(m)}
                          onChange={() => toggleMode(m)}
                          style={{ width: 16, height: 16 }}
                        />
                        {m}
                      </label>
                    ))}
                  </div>
                </Field>
                <div>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Team Size</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Min Team Size" required>
                      <input
                        type="number"
                        min={1}
                        value={minTeam}
                        onChange={(e) => setMinTeam(e.target.value)}
                        style={inputStyle}
                        {...inputFocusHandlers}
                      />
                    </Field>
                    <Field label="Max Team Size" required>
                      <input
                        type="number"
                        min={1}
                        value={maxTeam}
                        onChange={(e) => setMaxTeam(e.target.value)}
                        style={inputStyle}
                        {...inputFocusHandlers}
                      />
                    </Field>
                  </div>
                  <p style={{ marginTop: 8, fontSize: 12, color: "var(--color-muted-foreground)" }}>
                    Define the minimum and maximum team size
                  </p>
                </div>
              </Card>

              <Card title="3. Timeline">
                {[
                  { label: "Start Date", val: startDate, set: setStartDate },
                  { label: "End Date", val: endDate, set: setEndDate },
                  { label: "Registration Deadline", val: regDeadline, set: setRegDeadline },
                  { label: "Submission Deadline", val: subDeadline, set: setSubDeadline },
                ].map(({ label, val, set }) => (
                  <Field key={label} label={label} required>
                    <div style={{ position: "relative" }}>
                      <input
                        type="datetime-local"
                        value={val}
                        onChange={(e) => set(e.target.value)}
                        style={{ ...inputStyle, paddingRight: 40 }}
                        {...inputFocusHandlers}
                      />
                      <span style={{
                        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                        color: "var(--color-muted-foreground)", pointerEvents: "none",
                      }}>
                        <Icons.Calendar size={16} />
                      </span>
                    </div>
                  </Field>
                ))}
                <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
                  All dates should be in your local timezone
                </p>
              </Card>
              <Card title="4. Prize & Fees">
                <Field label="Prize Pool (₹)" required>
                  <input
                    value={prizePool}
                    onChange={(e) => setPrizePool(e.target.value)}
                    placeholder="Enter prize pool amount"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </Field>
                <Field label="Registration Fee (₹)" required>
                  <input
                    value={regFee}
                    onChange={(e) => setRegFee(e.target.value)}
                    placeholder="Enter registration fee"
                    style={inputStyle}
                    {...inputFocusHandlers}
                  />
                </Field>
                <Field label="Currency" required>
                  <ThemedSelect
                    value={currency}
                    onChange={setCurrency}
                    options={["INR", "USD", "EUR"]}
                  />
                </Field>
                <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
                  Total prize money and registration fee for participants
                </p>
              </Card>
              <Card title="5. Technical Details" style={{ gridColumn: "span 2" }}>
                <Field label="Technology Domains" required helper="Add relevant technology domains (e.g., AI, Web, Mobile)">
                  <div style={{
                    display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8,
                    borderRadius: 12, border: "1px solid var(--color-border)",
                    background: "white", padding: 8, minHeight: 48,
                  }}>
                    {domains.map((d) => (
                      <Chip key={d} label={d} onRemove={() => setDomains(domains.filter((x) => x !== d))} />
                    ))}
                    <input
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && domainInput.trim()) {
                          e.preventDefault();
                          if (!domains.includes(domainInput.trim())) {
                            setDomains([...domains, domainInput.trim()]);
                          }
                          setDomainInput("");
                        }
                      }}
                      placeholder="Type and press Enter"
                      style={{
                        flex: 1, minWidth: 140, background: "transparent",
                        border: "none", outline: "none", fontSize: 14, padding: "4px 8px",
                      }}
                    />
                  </div>
                </Field>

                <Field label="Problem Statement" required>
                  <div style={{ position: "relative" }}>
                    <textarea
                      rows={4}
                      maxLength={1500}
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      placeholder="Enter the problem statement"
                      style={{ ...inputStyle, resize: "none" }}
                      {...inputFocusHandlers}
                    />
                    <span style={{
                      position: "absolute", bottom: 8, right: 12,
                      fontSize: 10, color: "var(--color-muted-foreground)", pointerEvents: "none",
                    }}>{problem.length} / 1500</span>
                  </div>
                </Field>

                <Field label="Judging Criteria" required>
                  <div style={{ overflow: "hidden", borderRadius: 12, border: "1px solid var(--color-border)" }}>
                    {/* Header row */}
                    <div style={{
                      display: "grid", gridTemplateColumns: "2.5rem 1fr 8rem 2.5rem",
                      background: "rgba(241,245,249,0.7)", padding: "8px 12px",
                      fontSize: 12, fontWeight: 600, color: "var(--color-muted-foreground)",
                    }}>
                      <span></span><span>Criterion</span><span>Weight (%)</span><span></span>
                    </div>
                    {criteria.map((c, i) => (
                      <div key={i} style={{
                        display: "grid", gridTemplateColumns: "2.5rem 1fr 8rem 2.5rem",
                        alignItems: "center", gap: 8,
                        borderTop: "1px solid var(--color-border)", padding: "8px 12px",
                      }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-muted-foreground)" }}>{i + 1}</span>
                        <input
                          value={c.name}
                          onChange={(e) => {
                            const n = [...criteria];
                            n[i] = { ...n[i], name: e.target.value };
                            setCriteria(n);
                          }}
                          style={{ ...inputStyle, padding: "8px 14px" }}
                          {...inputFocusHandlers}
                        />
                        <input
                          type="number"
                          value={c.weight}
                          onChange={(e) => {
                            const n = [...criteria];
                            n[i] = { ...n[i], weight: Number(e.target.value) };
                            setCriteria(n);
                          }}
                          style={{ ...inputStyle, padding: "8px 14px" }}
                          {...inputFocusHandlers}
                        />
                        <button
                          onClick={() => setCriteria(criteria.filter((_, idx) => idx !== i))}
                          style={{
                            width: 36, height: 36, display: "grid", placeItems: "center",
                            borderRadius: 8, border: "none", background: "transparent",
                            cursor: "pointer", color: "var(--color-destructive)", transition: "all 0.15s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <Icons.Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button
                      onClick={() => setCriteria([...criteria, { name: "", weight: 0 }])}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        borderRadius: 8, border: "1px dashed rgba(59,130,246,0.4)",
                        background: "rgba(59,130,246,0.05)", padding: "6px 12px",
                        fontSize: 12, fontWeight: 600, color: "var(--color-primary)",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.05)"}
                    >
                      <Icons.Plus size={14} /> Add Criterion
                    </button>
                    <span style={{
                      fontSize: 12, fontWeight: 500,
                      color: totalWeight === 100 ? "#059669" : "var(--color-muted-foreground)",
                    }}>
                      Total weight must be 100% ({totalWeight}%)
                    </span>
                  </div>
                </Field>
              </Card>
              <Card title="6. Rules & Eligibility">
                <Field label="Rules">
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {rules.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{
                          width: 36, height: 36, display: "grid", placeItems: "center",
                          borderRadius: 8, background: "var(--color-muted)",
                          fontSize: 12, fontWeight: 600, color: "var(--color-muted-foreground)", flexShrink: 0,
                        }}>{i + 1}</span>
                        <input
                          value={r}
                          onChange={(e) => {
                            const n = [...rules];
                            n[i] = e.target.value;
                            setRules(n);
                          }}
                          style={{ ...inputStyle, flex: 1 }}
                          {...inputFocusHandlers}
                        />
                        <button
                          onClick={() => setRules(rules.filter((_, idx) => idx !== i))}
                          style={{
                            width: 36, height: 36, display: "grid", placeItems: "center",
                            borderRadius: 8, border: "none", background: "transparent",
                            cursor: "pointer", color: "var(--color-destructive)", transition: "all 0.15s", flexShrink: 0,
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                          <Icons.Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setRules([...rules, ""])}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6, alignSelf: "flex-start",
                        borderRadius: 8, border: "1px dashed rgba(59,130,246,0.4)",
                        background: "rgba(59,130,246,0.05)", padding: "6px 12px",
                        fontSize: 12, fontWeight: 600, color: "var(--color-primary)",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.1)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(59,130,246,0.05)"}
                    >
                      <Icons.Plus size={14} /> Add Rule
                    </button>
                  </div>
                </Field>

                <div style={{ paddingTop: 8 }}>
                  <label style={{ display: "block", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Eligibility</label>
                  <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={studentOnly}
                      onChange={(e) => setStudentOnly(e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    Student Only
                  </label>
                  <p style={{ marginTop: 4, fontSize: 12, color: "var(--color-muted-foreground)" }}>
                    Restrict participation to students only
                  </p>
                </div>

                <Field label="Allowed Graduation Years" helper="Select allowed graduation years">
                  <div style={{
                    display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8,
                    borderRadius: 12, border: "1px solid var(--color-border)",
                    background: "white", padding: 8, minHeight: 48,
                  }}>
                    {years.map((y) => (
                      <Chip key={y} label={y} onRemove={() => setYears(years.filter((x) => x !== y))} />
                    ))}
                    <input
                      placeholder="Add year..."
                      style={{
                        flex: 1, minWidth: 80, background: "transparent",
                        border: "none", outline: "none", fontSize: 14, padding: "4px 8px",
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          if (!years.includes(e.target.value.trim())) {
                            setYears([...years, e.target.value.trim()]);
                          }
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </Field>
              </Card>

              <Card title="7. Attachments" style={{ gridColumn: "span 2" }}>
                <Field label="Details PDF" required>
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center",
                      justifyContent: "center", gap: 8,
                      borderRadius: 12, border: "2px dashed rgba(59,130,246,0.3)",
                      background: "rgba(59,130,246,0.03)", padding: "40px 24px",
                      textAlign: "center", cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.6)"; e.currentTarget.style.background = "rgba(59,130,246,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"; e.currentTarget.style.background = "rgba(59,130,246,0.03)"; }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: "50%", display: "grid", placeItems: "center",
                      background: "rgba(59,130,246,0.1)", color: "var(--color-primary)",
                    }}>
                      <Icons.UploadCloud size={24} />
                    </div>
                    {uploadedFile ? (
                      <div style={{ fontSize: 14 }}>
                        <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>✓ {uploadedFile}</span>
                        <p style={{ fontSize: 12, color: "var(--color-muted-foreground)", marginTop: 4 }}>Click to replace</p>
                      </div>
                    ) : (
                      <div style={{ fontSize: 14 }}>
                        <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>Click to upload</span>
                        <span style={{ color: "var(--color-muted-foreground)" }}> or drag & drop</span>
                        <p style={{ fontSize: 12, color: "var(--color-muted-foreground)", marginTop: 4 }}>PDF files only (Max 10MB)</p>
                      </div>
                    )}
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden-file"
                      onChange={handleFileChange}
                    />
                  </div>
                </Field>
                <p style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
                  Upload detailed information about the hackathon
                </p>
              </Card>
              <div className="fade-in-up" style={{
                borderRadius: 16, border: "1px solid rgba(59,130,246,0.2)",
                background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(239,246,255,0.6))",
                padding: 24,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, display: "grid", placeItems: "center",
                    background: "rgba(59,130,246,0.15)", color: "var(--color-primary)",
                  }}>
                    <Icons.Lightbulb size={16} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--color-foreground)" }}>Important Notes</h3>
                </div>
                <ul style={{ marginLeft: 20, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "var(--color-muted-foreground)" }}>
                  <li>All fields marked with <span style={{ fontWeight: 600, color: "var(--color-destructive)" }}>*</span> are required.</li>
                  <li>Please review all information before creating the hackathon.</li>
                  <li>You can save as draft and edit later.</li>
                  <li>Once published, participants will be able to see this hackathon.</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}