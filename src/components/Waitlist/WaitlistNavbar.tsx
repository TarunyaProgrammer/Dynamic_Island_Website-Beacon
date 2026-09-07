import React from "react";

interface WaitlistNavbarProps {
  onScrollToForm: () => void;
  slotsRemaining: number;
}

export const WaitlistNavbar: React.FC<WaitlistNavbarProps> = ({
  onScrollToForm,
  slotsRemaining,
}) => {
  return (
    <header className="waitlist-nav-wrapper">
      <nav className="waitlist-nav-pill">
        {/* Brand Lockup */}
        <div className="waitlist-brand-lockup">
          <div className="waitlist-logo-badge">
            <span>B</span>
          </div>
          <span className="waitlist-brand-name">BEACON</span>
        </div>

        {/* Live Scarcity Telemetry Badge */}
        <div className="waitlist-telemetry-badge">
          <span className="pulse-dot-wrapper">
            <span className="pulse-dot-ring"></span>
            <span className="pulse-dot-core"></span>
          </span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>BATCH 01 ·</span>
          <span style={{ color: "#F59E0B", fontWeight: 700 }}>
            {slotsRemaining} SLOTS LEFT
          </span>
        </div>

        {/* Quick CTA */}
        <button onClick={onScrollToForm} className="waitlist-nav-btn">
          <span>Claim Key</span>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>↗</span>
        </button>
      </nav>
    </header>
  );
};
