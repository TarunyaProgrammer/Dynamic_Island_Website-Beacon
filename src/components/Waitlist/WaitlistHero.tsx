import React, { useState } from "react";
import { WaitlistInteractiveNotch } from "./WaitlistInteractiveNotch";
import { submitToWaitlist } from "../../services/waitlistService";

interface WaitlistHeroProps {
  claimedCount: number;
  totalAllocation: number;
  onSuccess: (data: { email: string; queuePosition: number; macModel: string }) => void;
}

const MAC_MODELS = [
  "MacBook Pro 14\" / 16\" (M-Series Notch)",
  "MacBook Air 13\" / 15\" (M-Series Notch)",
  "Mac Studio / Mac mini / iMac (External Display)",
  "Intel Mac / Other",
];

export const WaitlistHero: React.FC<WaitlistHeroProps> = ({
  claimedCount,
  totalAllocation,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [selectedMac, setSelectedMac] = useState(MAC_MODELS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const percentFull = Math.min(Math.round((claimedCount / totalAllocation) * 100), 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitToWaitlist(email, selectedMac);
      onSuccess({
        email,
        queuePosition: res.queuePosition,
        macModel: selectedMac,
      });
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="waitlist-hero-section">
      <div className="waitlist-glow-primary"></div>
      <div className="waitlist-glow-secondary"></div>

      {/* Eyebrow Pill */}
      <div className="waitlist-eyebrow">
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#F59E0B",
            boxShadow: "0 0 8px #F59E0B",
          }}
        ></span>
        macOS Hardware Companion · Batch 01 Private Allocation
      </div>

      {/* Headline */}
      <h1 className="waitlist-title">
        The Physical Mac Notch. <br />
        <span className="waitlist-title-serif">Finally Awoken.</span>
      </h1>

      {/* Subhead */}
      <p className="waitlist-subtitle">
        Beacon transforms idle MacBook camera glass into an intentional, air-gapped Dynamic Island
        workspace. 0.1% CPU. Zero subscriptions.
      </p>

      {/* Interactive Simulator */}
      <WaitlistInteractiveNotch />

      {/* High-Converting Form Card (Double-Bezel Architecture) */}
      <div id="waitlist-form" className="waitlist-card-wrapper">
        <div className="waitlist-outer-bezel">
          <div className="waitlist-inner-card">
            <div className="waitlist-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#F59E0B",
                  }}
                ></span>
                <span className="waitlist-card-headline">Claim Pioneer Priority Access</span>
              </div>
              <span className="waitlist-price-lock">Lock in $18 Lifetime</span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="waitlist-input-group">
                <label className="waitlist-label">Work Email (Where private beta key arrives)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="architect@domain.com"
                  className="waitlist-input"
                />
              </div>

              <div className="waitlist-input-group">
                <label className="waitlist-label">Your Primary Mac Hardware</label>
                <select
                  value={selectedMac}
                  onChange={(e) => setSelectedMac(e.target.value)}
                  className="waitlist-select"
                >
                  {MAC_MODELS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage && (
                <div style={{ color: "#F87171", fontSize: "12px", fontFamily: "monospace", margin: "6px 0" }}>
                  {errorMessage}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="waitlist-submit-btn">
                <span>{isSubmitting ? "Securing Pioneer Slot..." : "Secure Pioneer Slot — Reserve $18 Key"}</span>
                <span className="btn-trailing-icon">↗</span>
              </button>
            </form>

            <div className="waitlist-scarcity-box">
              <div className="scarcity-status-row">
                <span style={{ color: "rgba(255,255,255,0.7)" }}>
                  <strong style={{ color: "#FFFFFF" }}>{claimedCount}</strong> / {totalAllocation} Claimed
                </span>
                <span style={{ color: "#F59E0B", fontWeight: 700 }}>{percentFull}% Allocation Filled</span>
              </div>
              <div className="scarcity-bar-track">
                <div className="scarcity-bar-fill" style={{ width: `${percentFull}%` }}></div>
              </div>
              <p className="scarcity-note">
                ⚡ Once Batch 01 closes, the $18 Pioneer tier is permanently retired. Public launch will be $49/year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
