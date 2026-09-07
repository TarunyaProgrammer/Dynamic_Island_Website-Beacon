import React, { useState, useRef } from "react";

interface FeatureCard {
  id: string;
  title: string;
  eyebrow: string;
  image: string;
  badge: string;
  metric: string;
  metricLabel: string;
  summary: string;
  details: string[];
  hudGraphicType: "graph" | "bars" | "gauge" | "grid";
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    id: "hardware",
    title: "Awaken Idle Hardware",
    eyebrow: "PHYSICAL INTEGRATION",
    image: "/assets/macbook-notch-mockup.jpg",
    badge: "0.00 MS POP-OVER",
    metric: "0.00 ms",
    metricLabel: "POPOVER LATENCY",
    summary: "Transforms dead camera notch glass into an active, glanceable Dynamic Island workspace without stealing screen real estate.",
    details: [
      "Zero window-switching: lives at the physical top margin of your screen.",
      "Hardware-calibrated: perfectly hugs the 14\" and 16\" MacBook Pro camera housing.",
      "Global hotkey trigger: ⌘⇧B instantly expands or contracts the island HUD.",
      "Supports external Studio Displays & Pro Display XDRs via seamless multi-monitor mirroring.",
    ],
    hudGraphicType: "graph",
  },
  {
    id: "paradigms",
    title: "6 Goal Paradigms",
    eyebrow: "MOMENTUM ENGINE",
    image: "/assets/dashboard-clean.png",
    badge: "6 PARADIGMS",
    metric: "6 MODES",
    metricLabel: "TRACKING ENGINES",
    summary: "One unified companion HUD for habit streaks, deadline burn-downs, milestone accumulation, and deep work sprints.",
    details: [
      "Habit Streaks: Visual chain tracking with flame momentum and loss prevention reminders.",
      "Deadline Burn-Downs: Live countdown pacing bars showing exact days remaining.",
      "Accumulative Targets: Track pages written, commits pushed, or ARR targets achieved.",
      "Deep Focus Sprints: 25/5 or 50/10 intervals that lock out notifications and play ambient binaural audio.",
    ],
    hudGraphicType: "bars",
  },
  {
    id: "performance",
    title: "0.1% Idle CPU & Swift",
    eyebrow: "NATIVE ARCHITECTURE",
    image: "/assets/menubar-hub-clean.png",
    badge: "45 MB RESIDENT",
    metric: "0.1%",
    metricLabel: "IDLE CPU LOAD",
    summary: "Built from scratch in pure Swift and AppKit. Zero Electron memory hogs, zero battery drain, completely silent fans.",
    details: [
      "Pure Native Swift: compiled directly to Apple Silicon arm64 machine instructions.",
      "Battery-kind: consumes under 0.1% CPU during background operation.",
      "Instant launch: cold starts in under 120 milliseconds.",
      "Menubar companion: quick-peek telemetry dock accessible from any macOS full-screen space.",
    ],
    hudGraphicType: "gauge",
  },
  {
    id: "privacy",
    title: "Local SQLite WAL",
    eyebrow: "SOVEREIGN PRIVACY",
    image: "/assets/notch-island-clean.png",
    badge: "ZERO TELEMETRY",
    metric: "100%",
    metricLabel: "OFFLINE STORAGE",
    summary: "All habits, focus logs, and goals are stored in a local SQLite database directly on your Mac NVMe drive. No cloud lock-in.",
    details: [
      "Strictly air-gapped: zero analytical beacons, zero tracking pixels, zero phone-home scripts.",
      "SQLite WAL mode: crash-resilient ACID storage with sub-millisecond query execution.",
      "One-click data export: export your entire history as JSON or CSV anytime.",
      "Pay once ($18), own forever: zero recurring renewal anxiety.",
    ],
    hudGraphicType: "grid",
  },
];

export const WaitlistCards: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<FeatureCard | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  return (
    <section id="paradigms" className="beacon-whoop-section">
      <div className="whoop-section-container">
        {/* Editorial WHOOP-Style Typography Header */}
        <div className="whoop-section-header">
          <h2 className="whoop-section-title">
            The workspace proven to build unbreakable focus
          </h2>
          <p className="whoop-section-desc">
            Beacon combines physical hardware notch integration with 6 behavioral paradigms to help
            you execute deep work, track compounding habits, and protect flow — starting day one.
          </p>
        </div>

        {/* Carousel Container with Scroll Arrow */}
        <div className="whoop-carousel-wrapper">
          <div ref={scrollContainerRef} className="whoop-cards-track">
            {FEATURE_CARDS.map((card) => (
              <div key={card.id} className="whoop-card">
                {/* Full-bleed Visual Image Frame */}
                <div className="whoop-card-image-bg">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="whoop-card-img"
                    loading="lazy"
                  />
                  <div className="whoop-card-scrim"></div>
                </div>

                {/* Top Card Content: Clean Bold Title on Image */}
                <div className="whoop-card-content">
                  <h3 className="whoop-card-title">{card.title}</h3>
                </div>

                {/* Card Visual Graphic HUD Overlay (WHOOP aesthetic) */}
                <div className="whoop-card-hud-overlay">
                  {card.hudGraphicType === "graph" && (
                    <div className="whoop-hud-pill">
                      <span className="hud-pill-dot green"></span>
                      <span>0.00 MS POP-OVER</span>
                    </div>
                  )}
                  {card.hudGraphicType === "bars" && (
                    <div className="whoop-hud-pill">
                      <span className="hud-pill-dot amber"></span>
                      <span>6 PARADIGMS ACTIVE</span>
                    </div>
                  )}
                  {card.hudGraphicType === "gauge" && (
                    <div className="whoop-hud-pill">
                      <span className="hud-pill-dot cyan"></span>
                      <span>0.1% CPU · 45MB RAM</span>
                    </div>
                  )}
                  {card.hudGraphicType === "grid" && (
                    <div className="whoop-hud-pill">
                      <span className="hud-pill-dot purple"></span>
                      <span>AIR-GAPPED SQLITE</span>
                    </div>
                  )}
                </div>

                {/* Minimalist Floating Plus (+) Button */}
                <button
                  onClick={() => setSelectedCard(card)}
                  className="whoop-card-plus-btn"
                  aria-label={`View details for ${card.title}`}
                  title="Expand specifications"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Carousel Next Arrow Button */}
          <button
            onClick={scrollNext}
            className="whoop-carousel-arrow-btn"
            aria-label="Next cards"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Bottom CTA / Scarcity Link */}
        <div className="whoop-bottom-cta">
          <a href="#hardware" className="whoop-cta-link">
            JOIN PIONEER WAITLIST
          </a>
          <div className="whoop-carousel-dots">
            <span className="whoop-dot active"></span>
            <span className="whoop-dot"></span>
            <span className="whoop-dot"></span>
            <span className="whoop-dot"></span>
          </div>
        </div>
      </div>

      {/* Pop-up Feature Detail Window (When + is clicked) */}
      {selectedCard && (
        <div className="whoop-modal-backdrop" onClick={() => setSelectedCard(null)}>
          <div className="whoop-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="whoop-modal-header">
              <div className="whoop-modal-eyebrow">{selectedCard.eyebrow}</div>
              <button
                onClick={() => setSelectedCard(null)}
                className="whoop-modal-close"
                aria-label="Close details"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <h3 className="whoop-modal-title">{selectedCard.title}</h3>
            <p className="whoop-modal-summary">{selectedCard.summary}</p>

            <div className="whoop-modal-metric-box">
              <div>
                <div className="modal-metric-num">{selectedCard.metric}</div>
                <div className="modal-metric-lbl">{selectedCard.metricLabel}</div>
              </div>
              <div className="modal-metric-badge">{selectedCard.badge}</div>
            </div>

            <div className="whoop-modal-specs">
              <div className="modal-specs-title">ENGINEERING SPECIFICATIONS</div>
              <ul className="modal-specs-list">
                {selectedCard.details.map((item, idx) => (
                  <li key={idx}>
                    <span className="spec-check">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedCard(null)}
              className="whoop-modal-done-btn"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

