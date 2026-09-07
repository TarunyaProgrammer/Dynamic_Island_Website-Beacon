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
        {/* Left Column: Massive Editorial Typography */}
        <div>
          <h1 className="beacon-hero-headline">
            Awaken your <br />
            physical Mac notch with{" "}
            <span className="highlight-cyan">BEACON.</span>
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

        {/* Right Column: 3D Hardware Render with Fluid Float & Interactive Modes */}
        <div className="beacon-mockup-frame">
          <div className="macbook-render-wrapper">
            <img
              src="/assets/beacon-cobalt-hero.jpg"
              alt="MacBook Pro Space Black with Beacon Dynamic Island in Electric Cobalt"
              className="macbook-render-img"
            />
          </div>

          {/* Interactive HUD Switchers */}
          <div className="hero-hud-switcher">
            <button
              onClick={() => setHudMode("focus")}
              className={`hud-mode-pill ${hudMode === "focus" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              ⌘ Focus Sprint (24:18)
            </button>
            <button
              onClick={() => setHudMode("streak")}
              className={`hud-mode-pill ${hudMode === "streak" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              ⚡ Habit Streaks (18 Days)
            </button>
            <button
              onClick={() => setHudMode("music")}
              className={`hud-mode-pill ${hudMode === "music" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
              ♬ Apple Music HUD
            </button>
            <button
              onClick={() => setHudMode("specs")}
              className={`hud-mode-pill ${hudMode === "specs" ? "hud-mode-active" : "hud-mode-inactive"}`}
            >
               0.1% CPU · SQLite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
