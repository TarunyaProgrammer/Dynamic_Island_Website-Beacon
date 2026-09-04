import React, { useState } from "react";
import { ArrowUpRight, ArrowRight, Check, MessageSquare } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer
      id="footer"
      style={{
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "var(--bg-canvas)",
        padding: "70px 0 32px 0",
        fontSize: "13px",
        color: "var(--text-muted)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* 1. Monumental Swiss Typographic Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "36px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(68px, 15vw, 195px)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 0.85,
              color: "var(--text-ink)",
              margin: 0,
              userSelect: "none",
            }}
          >
            beacon
          </h2>

          <div style={{ paddingBottom: "clamp(8px, 2vw, 24px)" }}>
            <img
              src="/logo.png"
              alt="Beacon"
              style={{
                width: "clamp(56px, 7.5vw, 108px)",
                height: "clamp(56px, 7.5vw, 108px)",
                objectFit: "contain",
                borderRadius: "24%",
                boxShadow: "0 12px 36px rgba(249, 115, 22, 0.2), 0 2px 8px rgba(15, 17, 23, 0.08)",
              }}
            />
          </div>
        </div>

        {/* 2. Edge-to-Edge Dividing Hairline */}
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "var(--border-subtle)",
            marginBottom: "36px",
          }}
        />

        {/* 3. Swiss Architectural Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(24px, 4vw, 48px)",
            paddingBottom: "48px",
          }}
        >
          {/* Left Block: Newsletter / Dispatch */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingRight: "clamp(0px, 3vw, 32px)",
              borderRight: "1px solid var(--border-subtle)",
            }}
          >
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
              Newsletter
            </span>

            {subscribed ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#059669",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <Check size={14} />
                <span>You are on the list for Mac releases.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                style={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "320px",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "8px",
                  backgroundColor: "var(--bg-card)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.mac@domain.com"
                  aria-label="Email for Beacon updates"
                  required
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "var(--text-ink)",
                    backgroundColor: "transparent",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe to releases"
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0 14px",
                    cursor: "pointer",
                    color: "var(--text-ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateX(2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateX(0)";
                  }}
                >
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-muted)",
                letterSpacing: "0.05em",
              }}
            >
              LOCAL-FIRST MAC DISPATCHES · ZERO SPAM
            </span>

            {/* Creator Socials */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px" }}>
              <a
                href="https://github.com/tarunyaprogrammer"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "var(--bg-card)",
                }}
              >
                GH
              </a>
              <a
                href="https://x.com/tarunyakesh"
                target="_blank"
                rel="noopener noreferrer"
                title="X (@tarunyakesh)"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "var(--bg-card)",
                }}
              >
                𝕏
              </a>
              <a
                href="https://www.linkedin.com/in/tarunyakesharwani/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-body)",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: "var(--bg-card)",
                }}
              >
                in
              </a>
            </div>
          </div>

          {/* Right Block: 4 Structured Categorized Columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "28px",
              flex: 2,
            }}
          >
            {/* Col 1 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-ink)",
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Paradigms
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                <li><a href="#simulator" style={{ color: "var(--text-body)", textDecoration: "none" }}>Dynamic Island</a></li>
                <li><a href="#gallery" style={{ color: "var(--text-body)", textDecoration: "none" }}>macOS Surfaces</a></li>
                <li><a href="#features" style={{ color: "var(--text-body)", textDecoration: "none" }}>6 Paradigms</a></li>
                <li><a href="#specs" style={{ color: "var(--text-body)", textDecoration: "none" }}>Hardware Specs</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-ink)",
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Architecture
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px", color: "var(--text-body)" }}>
                <li>SQLite WAL Local</li>
                <li>0.1% CPU Idle</li>
                <li>Zero Cloud Rent</li>
                <li><a href="#spirit" style={{ color: "var(--text-body)", textDecoration: "none" }}>Gemini Spirit</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-ink)",
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Philosophy
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                <li><a href="#anti-slop" style={{ color: "var(--text-body)", textDecoration: "none" }}>Anti-Slop Creed</a></li>
                <li><a href="#manifesto" style={{ color: "var(--text-body)", textDecoration: "none" }}>Ownership Manifesto</a></li>
                <li><a href="#founder" style={{ color: "var(--text-body)", textDecoration: "none" }}>Founder's Letter</a></li>
                <li>14-Day Guarantee</li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--text-ink)",
                  display: "block",
                  marginBottom: "14px",
                }}
              >
                Edition
              </span>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                <li><a href="#pricing" style={{ color: "var(--text-body)", textDecoration: "none" }}>Pioneer Lifetime</a></li>
                <li><span style={{ color: "var(--accent-solar)", fontWeight: 700 }}>$18 USD One-Time</span></li>
                <li>Universal M1–M4</li>
                <li>
                  <a
                    href="https://github.com/tarunyaprogrammer"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--text-body)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px" }}
                  >
                    <span>Developer</span>
                    <ArrowUpRight size={10} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Bottom Metadata Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--text-muted)",
          }}
        >
          <span>COPYRIGHT BEACON 2026 · CLARITY CREATES PROGRESS</span>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: "var(--text-subtle)" }}>beacon.tarunya.me</span>
            <a
              href="#spirit"
              title="Beacon Spirit Companion"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid var(--border-subtle)",
                backgroundColor: "var(--bg-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-ink)",
                textDecoration: "none",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
              }}
            >
              <MessageSquare size={13} color="var(--accent-solar)" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
