import { useState } from "react";
import Navbar from "../../components/common/Navbar";

const STEPS = ["Check Eligibility", "Team Setup", "Payment", "Confirmation"];

export default function JoinWorkflow({ hackathon: h, navigate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    github: "",
    teamName: "",
    members: [""],
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alreadyRegistered] = useState(false);

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/))
        e.email = "Valid email required";
    }
    if (step === 1 && h.mode === "team") {
      if (!form.teamName.trim()) e.teamName = "Team name required";
      const total = form.members.filter(Boolean).length + 1;
      if (total < h.teamSize.min)
        e.members = `Minimum ${h.teamSize.min} members required`;
      if (total > h.teamSize.max)
        e.members = `Maximum ${h.teamSize.max} members allowed`;
    }
    if (step === 2 && h.fee > 0) {
      if (form.cardNumber.replace(/\s/g, "").length < 16)
        e.cardNumber = "Enter valid card number";
      if (!form.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Format: MM/YY";
      if (form.cvv.length < 3) e.cvv = "Enter valid CVV";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (alreadyRegistered) return;
    if (step === STEPS.length - 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(STEPS.length - 1);
      }, 1800);
    } else {
      setStep((s) => s + 1);
    }
  };

  // Skip payment step if free
  const visibleSteps =
    h.fee === 0 ? STEPS.filter((s) => s !== "Payment") : STEPS;

  // Skip team setup if solo
  const actualSteps =
    h.mode === "solo"
      ? visibleSteps.filter((s) => s !== "Team Setup")
      : visibleSteps;

  const actualStep = Math.min(step, actualSteps.length - 1);
  const currentStepLabel = actualSteps[actualStep];
  const isLast = actualStep === actualSteps.length - 1;

  const addMember = () => {
    if (form.members.length < h.teamSize.max - 1) {
      setForm((f) => ({ ...f, members: [...f.members, ""] }));
    }
  };

  const removeMember = (i) => {
    setForm((f) => ({
      ...f,
      members: f.members.filter((_, idx) => idx !== i),
    }));
  };

  return (
    <div className="min-h-screen">
      
      <div className="max-w-2xl mx-auto px-6 py-12 pt-28">
        {/* Header */}
        <button
          onClick={() => navigate("detail", h)}
          className="flex items-center gap-2 font-poppins text-sm mb-8 transition-all hover:gap-3"
          style={{ color: "rgba(202,240,248,0.6)" }}
        >
          ← Back to {h.title}
        </button>

        <h1 className="font-nunito font-black text-3xl text-white mb-2">
          Register for Hackathon
        </h1>
        <p
          className="font-poppins text-sm mb-8"
          style={{ color: "rgba(202,240,248,0.5)" }}
        >
          {h.title}
        </p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {actualSteps.map((stepLabel, i) => (
            <div key={stepLabel} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-nunito transition-all"
                  style={{
                    background:
                      i < actualStep
                        ? "#34D399"
                        : i === actualStep
                          ? "linear-gradient(135deg, #0077B6, #00B4D8)"
                          : "rgba(202,240,248,0.1)",
                    color: i <= actualStep ? "white" : "rgba(202,240,248,0.3)",
                    border: `2px solid ${i < actualStep ? "#34D399" : i === actualStep ? "#00B4D8" : "rgba(202,240,248,0.15)"}`,
                  }}
                >
                  {i < actualStep ? "✓" : i + 1}
                </div>
                <span
                  className="font-poppins text-xs hidden sm:block"
                  style={{
                    color:
                      i === actualStep ? "#CAF0F8" : "rgba(202,240,248,0.35)",
                  }}
                >
                  {stepLabel}
                </span>
              </div>
              {i < actualSteps.length - 1 && (
                <div
                  className="flex-1 h-0.5 mx-2"
                  style={{
                    background:
                      i < actualStep ? "#34D399" : "rgba(202,240,248,0.1)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Already Registered Warning */}
        {alreadyRegistered && (
          <div
            className="p-4 rounded-2xl mb-6 flex items-center gap-3"
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.4)",
            }}
          >
            <span className="text-2xl">⚠️</span>
            <div>
              <div className="font-nunito font-bold text-white">
                Already Registered
              </div>
              <div
                className="font-poppins text-sm"
                style={{ color: "rgba(202,240,248,0.6)" }}
              >
                You are already registered for this hackathon.
              </div>
            </div>
          </div>
        )}

        {/* Form Card */}
        {!isLast ? (
          <div
            className="rounded-3xl p-8"
            style={{
              background: "rgba(3,4,94,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(144,224,239,0.15)",
            }}
          >
            <h2 className="font-nunito font-black text-xl text-white mb-6">
              {currentStepLabel}
            </h2>

            {/* Step 0 / Eligibility */}
            {currentStepLabel === "Check Eligibility" && (
              <div className="space-y-5">
                {/* Deadline notice */}
                <div
                  className="p-4 rounded-2xl flex items-center gap-3"
                  style={{
                    background: "rgba(0,180,216,0.08)",
                    border: "1px solid rgba(0,180,216,0.2)",
                  }}
                >
                  <span className="text-2xl">📅</span>
                  <div>
                    <div className="font-poppins text-sm font-semibold text-white">
                      Registration Deadline
                    </div>
                    <div
                      className="font-poppins text-sm"
                      style={{ color: "rgba(202,240,248,0.6)" }}
                    >
                      {h.deadline} —{" "}
                      {Math.max(
                        0,
                        Math.ceil(
                          (new Date(h.deadline) - new Date()) / 86400000,
                        ),
                      )}{" "}
                      days remaining
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className="block font-poppins text-xs font-semibold mb-2"
                    style={{ color: "rgba(202,240,248,0.5)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none transition-all"
                    style={{
                      background: "rgba(202,240,248,0.05)",
                      border: `1px solid ${errors.name ? "#F87171" : "rgba(202,240,248,0.2)"}`,
                      color: "white",
                    }}
                  />
                  {errors.name && (
                    <p
                      className="text-xs mt-1 font-poppins"
                      style={{ color: "#F87171" }}
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block font-poppins text-xs font-semibold mb-2"
                    style={{ color: "rgba(202,240,248,0.5)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                    style={{
                      background: "rgba(202,240,248,0.05)",
                      border: `1px solid ${errors.email ? "#F87171" : "rgba(202,240,248,0.2)"}`,
                      color: "white",
                    }}
                  />
                  {errors.email && (
                    <p
                      className="text-xs mt-1 font-poppins"
                      style={{ color: "#F87171" }}
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block font-poppins text-xs font-semibold mb-2"
                    style={{ color: "rgba(202,240,248,0.5)" }}
                  >
                    GitHub Profile
                  </label>
                  <input
                    value={form.github}
                    onChange={(e) => setField("github", e.target.value)}
                    placeholder="github.com/username"
                    className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                    style={{
                      background: "rgba(202,240,248,0.05)",
                      border: "1px solid rgba(202,240,248,0.2)",
                      color: "white",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Team Setup */}
            {currentStepLabel === "Team Setup" && (
              <div className="space-y-5">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(0,180,216,0.08)",
                    border: "1px solid rgba(0,180,216,0.2)",
                  }}
                >
                  <p
                    className="font-poppins text-sm"
                    style={{ color: "rgba(202,240,248,0.7)" }}
                  >
                    Team size:{" "}
                    <strong className="text-white">
                      {h.teamSize.min}–{h.teamSize.max} members
                    </strong>
                    . You are the team leader.
                  </p>
                </div>

                <div>
                  <label
                    className="block font-poppins text-xs font-semibold mb-2"
                    style={{ color: "rgba(202,240,248,0.5)" }}
                  >
                    Team Name *
                  </label>
                  <input
                    value={form.teamName}
                    onChange={(e) => setField("teamName", e.target.value)}
                    placeholder="Team Innovators"
                    className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                    style={{
                      background: "rgba(202,240,248,0.05)",
                      border: `1px solid ${errors.teamName ? "#F87171" : "rgba(202,240,248,0.2)"}`,
                      color: "white",
                    }}
                  />
                  {errors.teamName && (
                    <p
                      className="text-xs mt-1 font-poppins"
                      style={{ color: "#F87171" }}
                    >
                      {errors.teamName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block font-poppins text-xs font-semibold mb-2"
                    style={{ color: "rgba(202,240,248,0.5)" }}
                  >
                    Team Members (Email)
                  </label>
                  {form.members.map((m, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                      <input
                        value={m}
                        onChange={(e) => {
                          const updated = [...form.members];
                          updated[i] = e.target.value;
                          setForm((f) => ({ ...f, members: updated }));
                        }}
                        placeholder={`Member ${i + 2} email`}
                        className="flex-1 px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                        style={{
                          background: "rgba(202,240,248,0.05)",
                          border: "1px solid rgba(202,240,248,0.2)",
                          color: "white",
                        }}
                      />
                      <button
                        onClick={() => removeMember(i)}
                        className="w-10 h-12 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-all"
                        style={{ border: "1px solid rgba(239,68,68,0.3)" }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {errors.members && (
                    <p
                      className="text-xs mt-1 font-poppins"
                      style={{ color: "#F87171" }}
                    >
                      {errors.members}
                    </p>
                  )}
                  {form.members.length < h.teamSize.max - 1 && (
                    <button
                      onClick={addMember}
                      className="mt-2 w-full py-3 rounded-xl font-poppins text-sm font-semibold transition-all hover:scale-[1.02]"
                      style={{
                        border: "1px dashed rgba(0,180,216,0.4)",
                        color: "#00B4D8",
                        background: "rgba(0,180,216,0.05)",
                      }}
                    >
                      + Add Member
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Payment */}
            {currentStepLabel === "Payment" && (
              <div className="space-y-5">
                <div
                  className="p-4 rounded-2xl flex items-center gap-4"
                  style={{
                    background: "rgba(251,191,36,0.1)",
                    border: "1px solid rgba(251,191,36,0.3)",
                  }}
                >
                  <span className="text-3xl">💳</span>
                  <div>
                    <div
                      className="font-nunito font-black text-2xl"
                      style={{ color: "#FBBF24" }}
                    >
                      ${h.fee}
                    </div>
                    <div
                      className="font-poppins text-sm"
                      style={{ color: "rgba(202,240,248,0.6)" }}
                    >
                      Registration fee — non-refundable
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className="block font-poppins text-xs font-semibold mb-2"
                    style={{ color: "rgba(202,240,248,0.5)" }}
                  >
                    Card Number *
                  </label>
                  <input
                    value={form.cardNumber}
                    onChange={(e) => {
                      const val = e.target.value
                        .replace(/\D/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                        .slice(0, 19);
                      setField("cardNumber", val);
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                    style={{
                      background: "rgba(202,240,248,0.05)",
                      border: `1px solid ${errors.cardNumber ? "#F87171" : "rgba(202,240,248,0.2)"}`,
                      color: "white",
                    }}
                  />
                  {errors.cardNumber && (
                    <p
                      className="text-xs mt-1 font-poppins"
                      style={{ color: "#F87171" }}
                    >
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block font-poppins text-xs font-semibold mb-2"
                      style={{ color: "rgba(202,240,248,0.5)" }}
                    >
                      Expiry *
                    </label>
                    <input
                      value={form.expiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.length >= 2)
                          val = val.slice(0, 2) + "/" + val.slice(2, 4);
                        setField("expiry", val);
                      }}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                      style={{
                        background: "rgba(202,240,248,0.05)",
                        border: `1px solid ${errors.expiry ? "#F87171" : "rgba(202,240,248,0.2)"}`,
                        color: "white",
                      }}
                    />
                    {errors.expiry && (
                      <p
                        className="text-xs mt-1 font-poppins"
                        style={{ color: "#F87171" }}
                      >
                        {errors.expiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block font-poppins text-xs font-semibold mb-2"
                      style={{ color: "rgba(202,240,248,0.5)" }}
                    >
                      CVV *
                    </label>
                    <input
                      value={form.cvv}
                      onChange={(e) =>
                        setField(
                          "cvv",
                          e.target.value.replace(/\D/g, "").slice(0, 4),
                        )
                      }
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-3 rounded-xl font-poppins text-sm outline-none"
                      style={{
                        background: "rgba(202,240,248,0.05)",
                        border: `1px solid ${errors.cvv ? "#F87171" : "rgba(202,240,248,0.2)"}`,
                        color: "white",
                      }}
                    />
                    {errors.cvv && (
                      <p
                        className="text-xs mt-1 font-poppins"
                        style={{ color: "#F87171" }}
                      >
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-400 text-lg">🔒</span>
                  <span
                    className="font-poppins text-xs"
                    style={{ color: "rgba(202,240,248,0.4)" }}
                  >
                    Secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div
              className="flex gap-3 mt-8 pt-6"
              style={{ borderTop: "1px solid rgba(202,240,248,0.08)" }}
            >
              {actualStep > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 py-3 rounded-xl font-poppins font-semibold text-sm transition-all hover:scale-[1.02]"
                  style={{
                    border: "1px solid rgba(202,240,248,0.2)",
                    color: "rgba(7, 45, 92, 0.7).7)",
                    background: "transparent",
                  }}
                >
                  ← Back
                </button>
              )}
              <button
                onClick={next}
                disabled={loading}
                className="flex-1 py-3 rounded-xl font-nunito font-black text-base transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  background: loading
                    ? "rgba(0,119,182,0.5)"
                    : "linear-gradient(135deg, #03045E, #0077B6, #00B4D8)",
                  color: "white",
                  boxShadow: loading
                    ? "none"
                    : "0 8px 25px rgba(0,119,182,0.4)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : currentStepLabel === "Payment" ? (
                  `Pay $${h.fee} & Register`
                ) : (
                  "Continue →"
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Confirmation */
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background: "rgba(3,4,94,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(52,211,153,0.3)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, #34D399, #059669)",
                boxShadow: "0 0 40px rgba(52,211,153,0.4)",
              }}
            >
              <span className="text-4xl">✓</span>
            </div>
            <h2 className="font-nunito font-black text-3xl text-white mb-3">
              You're In! 🎉
            </h2>
            <p
              className="font-poppins text-base mb-2"
              style={{ color: "rgba(202,240,248,0.7)" }}
            >
              Successfully registered for{" "}
              <span className="text-white font-semibold">{h.title}</span>
            </p>
            <p
              className="font-poppins text-sm mb-8"
              style={{ color: "rgba(202,240,248,0.5)" }}
            >
              A confirmation email has been sent to{" "}
              <span style={{ color: "#90E0EF" }}>
                {form.email || "your email"}
              </span>{" "}
              and real-time notifications have been enabled.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              {[
                { label: "Hackathon", value: h.title },
                { label: "Participant", value: form.name || "You" },
                {
                  label: "Mode",
                  value:
                    h.mode === "solo"
                      ? "Solo"
                      : `Team: ${form.teamName || "—"}`,
                },
                { label: "Start Date", value: h.startDate },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(52,211,153,0.05)",
                    border: "1px solid rgba(52,211,153,0.15)",
                  }}
                >
                  <div
                    className="font-poppins text-xs mb-1"
                    style={{ color: "rgba(202,240,248,0.4)" }}
                  >
                    {item.label}
                  </div>
                  <div className="font-poppins text-sm font-semibold text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("list")}
                className="flex-1 py-3 rounded-xl font-poppins font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{
                  border: "1px solid rgba(202,240,248,0.2)",
                  color: "#CAF0F8",
                  background: "transparent",
                }}
              >
                Browse More
              </button>
              <button
                onClick={() => navigate("detail", h)}
                className="flex-1 py-3 rounded-xl font-nunito font-black text-sm transition-all hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(135deg, #0077B6, #00B4D8)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(0,119,182,0.4)",
                }}
              >
                View Hackathon
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
