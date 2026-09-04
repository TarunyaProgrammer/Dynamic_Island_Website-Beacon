import React, { useState } from "react";
import { ArrowRight, Check, ArrowUpRight, Sparkles } from "lucide-react";

// Crisp inline SVG brand icons for Retina displays
const GithubIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const XIcon: React.FC<{ size?: number }> = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-canvas-subtle)",
        color: "var(--text-body)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Monolithic Brand Wordmark & Horological Hardware Readout */}
      <div
        style={{
          padding: "clamp(28px, 5vw, 64px) clamp(16px, 4vw, 48px) clamp(16px, 3vw, 36px)",
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "var(--bg-canvas)",
        }}
      >
        {/* Hardware Status Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "16px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-subtle)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-emerald)",
                boxShadow: "0 0 8px rgba(5, 150, 105, 0.6)",
              }}
            />
            <span style={{ color: "var(--text-ink)", fontWeight: 700 }}>Universal Binary M1–M4</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>0.1% Idle CPU</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Local SQLite WAL</span>
          </div>
          <span style={{ color: "var(--text-amber-contrast)", fontWeight: 700 }}>
            Pay Once, Own Forever
          </span>
        </div>

        {/* Monolithic Brand Lockup with Solar Amber Period */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            className="footer-wordmark"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(56px, 16vw, 220px)",
              fontWeight: 900,
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
              color: "var(--text-ink)",
              margin: 0,
              padding: 0,
              userSelect: "none",
              display: "inline-block",
              transform: "translateX(-2px)",
            }}
          >
            beacon<span style={{ color: "var(--accent-solar)" }}>.</span>
          </h2>

          <p
            style={{
              maxWidth: "360px",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--text-body)",
              margin: 0,
              paddingBottom: "8px",
            }}
          >
            The intentional Dynamic Island & companion workspace for macOS. Crafted for deep work, uninterrupted momentum, and zero subscriptions.
          </p>
        </div>
      </div>

      {/* 2. Main Two-Panel Grid (Titanium Dispatch Box + 4-Column Directory) */}
      <div className="footer-main-grid">
        {/* Left Column: Dispatch & Community */}
        <div className="footer-dispatch-col">
          {/* Dispatch Titanium Card */}
          <div
            style={{
              backgroundColor: "var(--bg-card)",
              borderRadius: "18px",
              padding: "clamp(20px, 3vw, 28px)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent-solar)",
                  boxShadow: "0 0 10px rgba(217, 119, 6, 0.7)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--text-ink)",
                }}
              >
                Beacon Dispatch
              </span>
            </div>

            <p style={{ fontSize: "13px", lineHeight: 1.55, color: "var(--text-body)", marginBottom: "16px" }}>
              Zero-latency release notifications, hardware craft notes, and workflow blueprints. No marketing fluff.
            </p>

            {/* Newsletter Input Form with Obsidian Submit Button */}
            <form onSubmit={handleSubmit} style={{ position: "relative", marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--bg-canvas)",
                  borderRadius: "var(--radius-pill)",
                  padding: "4px 4px 4px 14px",
                  border: "1px solid var(--border-strong)",
                  transition: "all 0.2s ease",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@work.com"
                  aria-label="Email for Beacon updates"
                  required
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "var(--text-ink)",
                    width: "100%",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to updates"
                  style={{
                    backgroundColor: "var(--accent-obsidian)",
                    border: "none",
                    borderRadius: "var(--radius-pill)",
                    color: "#FFFFFF",
                    padding: "7px 12px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    fontWeight: 700,
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent-solar)";
                    e.currentTarget.style.color = "#000000";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent-obsidian)";
                    e.currentTarget.style.color = "#FFFFFF";
                  }}
                >
                  {submitted ? (
                    <Check size={14} color="#10b981" />
                  ) : (
                    <>
                      <span>Join</span>
                      <ArrowRight size={12} />
                    </>
                  )}
                </button>
              </div>

              {submitted && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--accent-emerald)",
                    marginTop: "6px",
                  }}
                >
                  ✓ Subscribed to local dispatch
                </span>
              )}
            </form>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-subtle)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <span>🔒 100% Private</span>
              <span>·</span>
              <span>Air-Gapped macOS Sync</span>
            </div>
          </div>

          {/* Social & Creator Section */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 700,
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Connect & Contribute
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <a
                href="https://github.com/tarunyaprogrammer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tarunya Kesharwani GitHub"
                style={{
                  color: "var(--text-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "var(--border-amber)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <GithubIcon size={16} />
              </a>

              <a
                href="https://x.com/tarunyakesh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tarunya Kesharwani on X"
                style={{
                  color: "var(--text-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "var(--border-amber)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <XIcon size={14} />
              </a>

              <a
                href="https://www.linkedin.com/in/tarunyakesharwani/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tarunya Kesharwani on LinkedIn"
                style={{
                  color: "var(--text-ink)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "var(--border-amber)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                }}
              >
                <LinkedinIcon size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Columns: 4 Categorized Columns with Beacon Badges */}
        <div className="footer-links-grid">
          {/* Column 1: Surfaces */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Surfaces
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#simulator" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Dynamic Island HUD
                </a>
              </li>
              <li>
                <a href="#gallery" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Obsidian Dashboard
                </a>
              </li>
              <li>
                <a href="#gallery" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Menu Bar Popover
                </a>
              </li>
              <li>
                <a href="#simulator" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <span>Spotlight Engine</span>
                  <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", padding: "1px 5px", borderRadius: "4px", backgroundColor: "rgba(217, 119, 6, 0.12)", border: "1px solid rgba(217, 119, 6, 0.3)", color: "var(--accent-solar)", fontWeight: 700 }}>⌘⇧B</span>
                </a>
              </li>
              <li>
                <a href="#spirit" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-flex", alignItems: "center", gap: "5px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <span>Spirit Companion</span>
                  <Sparkles size={11} color="var(--accent-solar)" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Paradigms */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Paradigms
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Accumulative Targets
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Streak Habits
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Deadline Burn-downs
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Deep Work Sprints
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Weekly Rhythm Spline
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Engineering */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Engineering
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  0.1% Idle CPU
                </a>
              </li>
              <li>
                <a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  SQLite WAL Storage
                </a>
              </li>
              <li>
                <a href="#manifesto" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Software Ownership
                </a>
              </li>
              <li>
                <a href="#anti-slop" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Zero Cloud Rent
                </a>
              </li>
              <li>
                <a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Universal Apple Binary
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Assistance */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Assistance
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#pricing" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <span>Pioneer License</span>
                  <span style={{ fontSize: "10px", fontFamily: "var(--font-mono)", padding: "1px 5px", borderRadius: "4px", backgroundColor: "rgba(5, 150, 105, 0.12)", border: "1px solid rgba(5, 150, 105, 0.3)", color: "var(--accent-emerald)", fontWeight: 800 }}>$18</span>
                </a>
              </li>
              <li>
                <a href="#pricing" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  14-Day Guarantee
                </a>
              </li>
              <li>
                <a href="#faq" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Documentation & FAQ
                </a>
              </li>
              <li>
                <a href="#founder" style={{ color: "var(--text-body)", textDecoration: "none", transition: "all 0.15s ease", display: "inline-block" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  Founder's Letter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tarunyaprogrammer"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-body)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", transition: "all 0.15s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-ink)"; e.currentTarget.style.transform = "translateX(2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-body)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span>Changelog & Source</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Sub-Footer Bar */}
      <div className="footer-sub-bar">
        <span>BEACON © 2026 · ALL RIGHTS RESERVED</span>
        <span style={{ color: "var(--text-body)" }}>
          CRAFTED BY <strong>TARUNYA KESHARWANI</strong> · BEACON.TARUNYA.ME
        </span>
      </div>
    </footer>
  );
};
