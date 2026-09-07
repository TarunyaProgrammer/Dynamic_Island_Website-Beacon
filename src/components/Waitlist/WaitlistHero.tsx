import React, { useState } from "react";

interface WaitlistHeroProps {
  onJoinClick: () => void;
}

export const WaitlistHero: React.FC<WaitlistHeroProps> = ({ onJoinClick }) => {
  const [hudMode, setHudMode] = useState<"focus" | "streak" | "music" | "specs">("focus");

  return (
    <section id="hardware" className="beacon-hero-section">
      <div className="beacon-hero-glow"></div>

      <div className="beacon-hero-grid">
        {/* Left Column: Solid Impeccable Typography */}
        <div>
          <h1 className="beacon-hero-headline">
            Awaken your <br />
            physical Mac notch with{" "}
            <span className="headline-brand">BEACON</span>
          </h1>

          <p className="beacon-hero-subhead">
            The intentional Dynamic Island & hardware companion workspace for macOS.
            Engineered in pure native Swift with 0.1% idle CPU. Pay $18 once, own forever.
          </p>

          <div className="beacon-stats-cluster">
            <div className="beacon-stat-block">
              <div className="beacon-stat-num">0.1%</div>
              <div className="beacon-stat-lbl">IDLE CPU LOAD</div>
            </div>
            <div className="beacon-stat-sep"></div>
            <div className="beacon-stat-block">
              <div className="beacon-stat-num">45 MB</div>
              <div className="beacon-stat-lbl">RAM FOOTPRINT</div>
            </div>
            <div className="beacon-stat-sep"></div>
            <div className="beacon-stat-block">
              <div className="beacon-stat-num" style={{ color: "#38BDF8" }}>$18</div>
              <div className="beacon-stat-lbl">LIFETIME PIONEER</div>
            </div>
          </div>

          <button onClick={onJoinClick} className="beacon-nav-cta" style={{ fontSize: "14px", padding: "13px 32px" }}>
            CLAIM PIONEER ACCESS ↓
          </button>
        </div>

        {/* Right Column: Unboxed 3D Hardware Render */}
        <div className="beacon-mockup-frame">
          <div className="macbook-render-wrapper">
            <img
              src="/assets/beacon-cobalt-hero.jpg"
              alt="MacBook Pro Space Black with Beacon Dynamic Island in Electric Cobalt"
              className="macbook-render-img"
            />
          </div>

          {/* Interactive HUD Switchers (Real authored SVGs, zero emojis) */}
          <div className="hero-hud-switcher">
            <button
              onClick={() => setHudMode("focus")}
              className={`hud-mode-pill ${hudMode === "focus" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Focus Sprint (24:18)</span>
            </button>
            <button
              onClick={() => setHudMode("streak")}
              className={`hud-mode-pill ${hudMode === "streak" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Habit Streaks (18 Days)</span>
            </button>
            <button
              onClick={() => setHudMode("music")}
              className={`hud-mode-pill ${hudMode === "music" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              <span>Media HUD</span>
            </button>
            <button
              onClick={() => setHudMode("specs")}
              className={`hud-mode-pill ${hudMode === "specs" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>0.1% CPU · SQLite</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
