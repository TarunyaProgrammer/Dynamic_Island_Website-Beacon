import React, { useState } from "react";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";

// Crisp inline SVG brand icons
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
        backgroundColor: "var(--bg-canvas)",
        color: "var(--text-body)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 1. Massive Editorial Brand Wordmark (Reference Style) */}
      <div
        style={{
          padding: "clamp(24px, 5vw, 64px) clamp(16px, 4vw, 48px) clamp(16px, 3.5vw, 40px)",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
          overflow: "hidden",
          borderBottom: "1px solid var(--border-subtle)",
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
          beacon
        </h2>
      </div>

      {/* 2. Main Two-Panel Grid (Newsletter on Left, 4 Link Columns on Right) */}
      <div className="footer-main-grid">
        {/* Left Column: Dispatch & Socials */}
        <div className="footer-dispatch-col">
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              Dispatch & Updates
            </span>

            <p style={{ fontSize: "13px", lineHeight: 1.6, color: "var(--text-body)", marginBottom: "18px" }}>
              Receive zero-latency releases, hardware updates, and macOS craft notes. No spam, ever.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubmit} style={{ position: "relative", marginBottom: "12px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid var(--text-ink)",
                  paddingBottom: "8px",
                  transition: "border-color 0.2s ease",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email for Beacon updates"
                  required
                  style={{
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "var(--text-ink)",
                    width: "100%",
                    paddingRight: "28px",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to updates"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-ink)",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
                >
                  {submitted ? <Check size={16} color="var(--accent-emerald)" /> : <ArrowRight size={16} />}
                </button>
              </div>

              {submitted && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--accent-emerald)",
                    marginTop: "8px",
                  }}
                >
                  ✓ Subscribed to Beacon dispatch
                </span>
              )}
            </form>

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                display: "block",
              }}
            >
              Air-Gapped macOS Releases · Unsubscribe Anytime
            </span>
          </div>

          {/* Social Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
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
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-canvas-subtle)",
                border: "1px solid var(--border-subtle)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "var(--bg-canvas-subtle)";
              }}
            >
              <GithubIcon size={15} />
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
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-canvas-subtle)",
                border: "1px solid var(--border-subtle)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "var(--bg-canvas-subtle)";
              }}
            >
              <XIcon size={13} />
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
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-canvas-subtle)",
                border: "1px solid var(--border-subtle)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.backgroundColor = "var(--bg-card)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "var(--bg-canvas-subtle)";
              }}
            >
              <LinkedinIcon size={14} />
            </a>
          </div>
        </div>

        {/* Right Columns: 4-Column Navigation Categories */}
        <div className="footer-links-grid">
          {/* Column 1: Surfaces */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Surfaces
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#simulator" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Dynamic Island HUD
                </a>
              </li>
              <li>
                <a href="#gallery" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Obsidian Dashboard
                </a>
              </li>
              <li>
                <a href="#gallery" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Menu Bar Popover
                </a>
              </li>
              <li>
                <a href="#simulator" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Spotlight Engine (⌘⇧B)
                </a>
              </li>
              <li>
                <a href="#spirit" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Spirit Companion
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
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Paradigms
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Accumulative Targets
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Streak Habits
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Deadline Burn-downs
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Deep Work Sprints
                </a>
              </li>
              <li>
                <a href="#features" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
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
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Engineering
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  0.1% Idle CPU
                </a>
              </li>
              <li>
                <a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  SQLite WAL Storage
                </a>
              </li>
              <li>
                <a href="#manifesto" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Software Ownership
                </a>
              </li>
              <li>
                <a href="#anti-slop" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Zero Cloud Rent
                </a>
              </li>
              <li>
                <a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
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
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--text-ink)",
                display: "block",
                marginBottom: "14px",
              }}
            >
              Assistance
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
              <li>
                <a href="#pricing" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Pioneer License ($18)
                </a>
              </li>
              <li>
                <a href="#pricing" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  14-Day Guarantee
                </a>
              </li>
              <li>
                <a href="#faq" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Documentation & FAQ
                </a>
              </li>
              <li>
                <a href="#founder" style={{ color: "var(--text-body)", textDecoration: "none", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}>
                  Founder's Letter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tarunyaprogrammer"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text-body)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-body)")}
                >
                  <span>Changelog & Source</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Sub-Footer Bar (Reference Style) */}
      <div className="footer-sub-bar">
        <span>COPYRIGHT BEACON © 2026 · ALL RIGHTS RESERVED</span>
        <span>CRAFTED FOR MACOS BY TARUNYA KESHARWANI · BEACON.TARUNYA.ME</span>
      </div>
    </footer>
  );
};
