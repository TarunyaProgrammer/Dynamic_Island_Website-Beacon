import React from "react";

interface WaitlistHeroProps {
  onJoinClick: () => void;
}

export const WaitlistHero: React.FC<WaitlistHeroProps> = ({ onJoinClick }) => {
  return (
    <section id="hardware" className="beacon-hero-section">
      {/* Background Cinematic Studio Image Layer */}
      <div className="hero-cinematic-bg-wrapper">
        <img
          src="/assets/beacon-cinematic-bg.jpg"
          alt="MacBook Pro with Beacon Native Dynamic Island"
          className="hero-cinematic-bg-img"
        />
        <div className="hero-cinematic-vignette"></div>
      </div>

      {/* Atmospheric Anamorphic Light Accents */}
      <div className="cinematic-edge-light-left"></div>
      <div className="cinematic-anamorphic-flare"></div>

      <div className="beacon-hero-grid">
        {/* Left Column: Bold Titles, Telemetry & Action Button */}
        <div className="beacon-hero-text-col">
          <div className="cinematic-eyebrow-pill">
            <span className="eyebrow-pip"></span>
            <span>NEXT-GEN MACOS WORKSPACE</span>
          </div>

          <h1 className="beacon-hero-headline">
            Awaken your <br />
            physical Mac notch with{" "}
            <span className="headline-brand">BEACON</span>
          </h1>

          <p className="beacon-hero-subhead">
            The intentional Dynamic Island & companion workspace for macOS.
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

          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <button onClick={onJoinClick} className="beacon-hero-cta group">
              <span>CLAIM PIONEER ACCESS</span>
              <div className="cta-nested-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            </button>

            {/* Subtle Interactive Mode Switchers */}
            <div className="hero-hud-switcher" style={{ margin: 0 }}>
              <button
                onClick={onJoinClick}
                className="hud-mode-pill hud-mode-active"
                style={{ fontSize: "11px" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>Habit Streaks (18 Days)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Spatial Anchor */}
        <div className="beacon-hero-empty-right-anchor"></div>
      </div>
    </section>
  );
};


