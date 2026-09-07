import React from "react";

export const WaitlistCards: React.FC = () => {
  return (
    <section id="paradigms" className="beacon-white-section">
      <div className="white-section-container">
        <div className="white-section-header">
          <span className="white-section-eyebrow">ARCHITECTURAL PHILOSOPHY</span>
          <h2 className="white-section-title">
            The hardware companion engineered to build unbreakable focus.
          </h2>
          <p className="white-section-desc">
            Modern productivity apps have devolved into 400MB browser-based subscriptions that
            fight for your attention. Beacon rejects this. It turns your physical Mac notch into an
            intentional workspace.
          </p>
        </div>

        <div className="editorial-cards-grid">
          {/* Card 1: Real Hardware Notch Screenshot */}
          <div className="editorial-card">
            <div>
              <div className="card-media-frame">
                <img
                  src="/assets/macbook-notch-mockup.jpg"
                  alt="Real MacBook Notch HUD running Beacon"
                  className="card-media-img"
                  loading="lazy"
                />
              </div>
              <div className="card-badge">HARDWARE INTEGRATION</div>
              <h3 className="card-title">Awaken Idle Hardware</h3>
              <p className="card-body">
                Transforms dead camera notch glass into an active, glanceable Dynamic Island HUD.
                Zero window-switching required.
              </p>
            </div>
            <div className="card-footer">
              <span>POP-OVER DELAY</span>
              <span className="card-footer-metric">0.00 MS</span>
            </div>
          </div>

          {/* Card 2: Real Dashboard & 6 Paradigms */}
          <div className="editorial-card">
            <div>
              <div className="card-media-frame">
                <img
                  src="/assets/dashboard-clean.png"
                  alt="Beacon 6 Goal Paradigms Workspace"
                  className="card-media-img"
                  loading="lazy"
                />
              </div>
              <div className="card-badge" style={{ color: "#34D399", borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.1)" }}>
                BEHAVIORAL ENGINE
              </div>
              <h3 className="card-title">6 Goal Paradigms</h3>
              <p className="card-body">
                Habit streaks, deadline burn-downs, and accumulative targets all unified in a
                single tactile HUD built for real humans.
              </p>
            </div>
            <div className="card-footer">
              <span>TRACKING MODES</span>
              <span className="card-footer-metric" style={{ color: "#34D399" }}>6 PARADIGMS</span>
            </div>
          </div>

          {/* Card 3: Menubar Hub & 0.1% CPU */}
          <div className="editorial-card">
            <div>
              <div className="card-media-frame">
                <img
                  src="/assets/menubar-hub-clean.png"
                  alt="Beacon Native Swift Menubar Telemetry"
                  className="card-media-img"
                  loading="lazy"
                />
              </div>
              <div className="card-badge" style={{ color: "#38BDF8", borderColor: "rgba(56,189,248,0.3)", background: "rgba(56,189,248,0.1)" }}>
                NATIVE PERFORMANCE
              </div>
              <h3 className="card-title">0.1% Idle CPU & Swift</h3>
              <p className="card-body">
                Zero Electron memory bloat. 45MB RAM resident. Keeps your MacBook icy cold,
                completely silent, and preserves all-day battery.
              </p>
            </div>
            <div className="card-footer">
              <span>MEMORY FOOTPRINT</span>
              <span className="card-footer-metric" style={{ color: "#38BDF8" }}>45 MB RESIDENT</span>
            </div>
          </div>

          {/* Card 4: Clean Dynamic Island Notch & SQLite WAL */}
          <div className="editorial-card">
            <div>
              <div className="card-media-frame">
                <img
                  src="/assets/notch-island-clean.png"
                  alt="Beacon Local SQLite Air-Gapped HUD"
                  className="card-media-img"
                  loading="lazy"
                />
              </div>
              <div className="card-badge" style={{ color: "#818CF8", borderColor: "rgba(129,140,248,0.3)", background: "rgba(129,140,248,0.1)" }}>
                AIR-GAPPED PRIVACY
              </div>
              <h3 className="card-title">Local SQLite WAL</h3>
              <p className="card-body">
                Your focus history, habits, and goals stay strictly on your Mac's NVMe drive. No
                cloud lock-in, zero third-party telemetry.
              </p>
            </div>
            <div className="card-footer">
              <span>TELEMETRY</span>
              <span className="card-footer-metric" style={{ color: "#818CF8" }}>ZERO (AIR-GAPPED)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
