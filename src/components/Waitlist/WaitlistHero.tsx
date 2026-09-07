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
            <span>BUILT FOR MACOS · LOCAL-FIRST · BATCH 01</span>
          </div>

          <h1 className="beacon-hero-headline">
            <span className="headline-lead">Make the notch earn its place.</span>{" "}
            <span className="headline-brand">Don't break flow. Just glance.</span>
          </h1>

          <p className="beacon-hero-subhead">
            Beacon is an ambient execution workspace that keeps goals, streaks, focus sessions and
            momentum one interaction away.
          </p>

          <div className="beacon-stats-cluster">
            <div className="beacon-stat-block">
              <div className="beacon-stat-num">LOCAL</div>
              <div className="beacon-stat-lbl">FIRST BY DEFAULT</div>
            </div>
            <div className="beacon-stat-sep"></div>
            <div className="beacon-stat-block">
              <div className="beacon-stat-num">0.1%</div>
              <div className="beacon-stat-lbl">IDLE CPU</div>
            </div>
            <div className="beacon-stat-sep"></div>
            <div className="beacon-stat-block">
              <div className="beacon-stat-num">$29</div>
              <div className="beacon-stat-lbl">PIONEER LIFETIME</div>
            </div>
          </div>

          <div className="beacon-hero-actions-row">
            <button onClick={onJoinClick} className="beacon-hero-cta group">
              <span>RESERVE PIONEER LICENSE</span>
              <div className="cta-nested-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            </button>

            <button onClick={onJoinClick} className="hero-secondary-action">
              No payment today
            </button>
          </div>
        </div>

        {/* Right Column: Visual Spatial Anchor */}
        <div className="beacon-hero-empty-right-anchor"></div>
      </div>
    </section>
  );
};
