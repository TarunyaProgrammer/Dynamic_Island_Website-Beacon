import React, { useState } from "react";
import { submitToWaitlist } from "../../services/waitlistService";

interface WaitlistFloatingDockProps {
  slotsRemaining: number;
  totalAllocation: number;
  claimedCount: number;
  onSuccess: (data: { email: string; queuePosition: number; macModel: string }) => void;
}

export const WaitlistFloatingDock: React.FC<WaitlistFloatingDockProps> = ({
  slotsRemaining,
  onSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    try {
      const res = await submitToWaitlist(email, "MacBook Pro / Universal");
      onSuccess({
        email,
        queuePosition: res.queuePosition,
        macModel: "MacBook Pro / Universal",
      });
      setEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="beacon-dock-wrapper">
      <div className="beacon-dock-capsule">
        <div className="beacon-dock-left">
          <span className="banner-pulse-dot" style={{ backgroundColor: "#38BDF8", boxShadow: "0 0 8px #38BDF8" }}></span>
          <span className="beacon-dock-status">
            <strong>BATCH 01</strong> · {slotsRemaining} SLOTS LEFT · <span style={{ color: "#38BDF8", fontWeight: 800 }}>$18 LIFETIME</span>
          </span>
        </div>

        <form onSubmit={handleSubmit} className="beacon-dock-form">
          <input
            id="waitlist-email-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter work email..."
            className="beacon-dock-input"
          />
          <button type="submit" disabled={isSubmitting} className="beacon-dock-submit">
            {isSubmitting ? "Securing..." : "Claim $18 Key ↗"}
          </button>
        </form>
      </div>
    </div>
  );
};
