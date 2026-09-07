import React from "react";

export const WaitlistBento: React.FC = () => {
  return (
    <section className="waitlist-bento-section">
      <div className="waitlist-bento-header">
        <span className="bento-eyebrow">ARCHITECTURAL CREDIBILITY</span>
        <h2 className="bento-title">Why Mac Builders Refuse Standard Productivity Tools</h2>
      </div>

      <div className="waitlist-bento-grid">
        {/* Card 1: 0.1% CPU */}
        <div className="bento-outer-card">
          <div className="bento-inner-card">
            <div>
              <div
                className="bento-icon-box"
                style={{
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#F59E0B",
                  border: "1px solid rgba(245, 158, 11, 0.3)",
                }}
              >
                0.1%
              </div>
              <h3 className="bento-card-title">0.1% Idle CPU Target</h3>
              <p className="bento-card-body">
                Built around macOS with a React and Electron interface, aiming for a restrained 45MB
                memory footprint and quiet background operation.
              </p>
            </div>
            <div className="bento-card-meta">
              <span>LATENCY: 0MS</span>
              <span style={{ color: "#34D399" }}>● 45MB RESIDENT</span>
            </div>
          </div>
        </div>

        {/* Card 2: Local-first SQLite */}
        <div className="bento-outer-card">
          <div className="bento-inner-card">
            <div>
              <div
                className="bento-icon-box"
                style={{
                  background: "rgba(56, 189, 248, 0.15)",
                  color: "#38BDF8",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                }}
              >
                🛡️
              </div>
              <h3 className="bento-card-title">Local SQLite WAL Storage</h3>
              <p className="bento-card-body">
                Every focus block, habit streak, and goal is written to local SQLite WAL tables on
                your Mac by default. Cloud AI is optional and only used when you explicitly invoke it.
              </p>
            </div>
            <div className="bento-card-meta">
              <span>DATA LOCALE: NVME</span>
              <span style={{ color: "#38BDF8" }}>LOCAL-FIRST</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pioneer Ownership */}
        <div className="bento-outer-card">
          <div className="bento-inner-card">
            <div>
              <div
                className="bento-icon-box"
                style={{
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  color: "#07080B",
                  boxShadow: "0 0 16px rgba(245, 158, 11, 0.4)",
                }}
              >
                $29
              </div>
              <h3 className="bento-card-title">Pioneer Lifetime Ownership</h3>
              <p className="bento-card-body">
                Pay $29 once, own Beacon forever. Core desktop app updates are included, with no
                recurring renewal anxiety.
              </p>
            </div>
            <div className="bento-card-meta">
              <span>LICENSE: PERPETUAL</span>
              <span style={{ color: "#F59E0B" }}>● ZERO RENEWALS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
