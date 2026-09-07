import React, { useState } from "react";

interface WaitlistSuccessCardProps {
  email: string;
  queuePosition: number;
  macModel: string;
  onReset: () => void;
}

export const WaitlistSuccessCard: React.FC<WaitlistSuccessCardProps> = ({
  email,
  queuePosition,
  macModel,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const shareText = `Just secured my Pioneer Slot (#${queuePosition}) for Beacon — an intentional Dynamic Island & hardware companion for macOS. 0.1% CPU, local SQLite, no subscriptions. Lock in your $18 key before Batch 01 closes:`;
  const shareUrl = "https://beacon.tarunya.me";

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="ticket-wrapper">
      <div className="ticket-inner">
        {/* Top Status */}
        <div className="ticket-header">
          <div className="ticket-status-pill">
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#34D399",
                boxShadow: "0 0 8px #34D399",
              }}
            ></span>
            <span>PIONEER ACCESS CONFIRMED</span>
          </div>
          <span className="ticket-batch-pill">BATCH 01</span>
        </div>

        {/* Queue Pass Box */}
        <div className="ticket-queue-box">
          <div>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              YOUR QUEUE ALLOCATION
            </div>
            <div className="queue-number">#{queuePosition}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
              REGISTERED RECIPIENT
            </div>
            <div style={{ fontSize: "13px", fontFamily: "monospace", color: "#FFFFFF" }}>{email}</div>
            <div style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>
              {macModel}
            </div>
          </div>
        </div>

        {/* Privileges */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", fontFamily: "monospace", color: "rgba(255,255,255,0.5)", marginBottom: "12px", textTransform: "uppercase" }}>
            YOUR PIONEER PRIVILEGES:
          </div>
          <div className="privilege-row">
            <span className="privilege-check">✓</span>
            <span>
              <strong>$18 Lifetime Price Locked</strong> — zero subscription renewals.
            </span>
          </div>
          <div className="privilege-row">
            <span className="privilege-check">✓</span>
            <span>
              <strong>Private DMG / TestFlight Build</strong> dispatched to your email before public launch.
            </span>
          </div>
          <div className="privilege-row">
            <span className="privilege-check">✓</span>
            <span>
              <strong>Direct Founder Priority</strong> for custom notch feature requests.
            </span>
          </div>
        </div>

        {/* Share actions */}
        <div className="ticket-share-actions">
          <button onClick={handleTwitterShare} className="share-x-btn">
            Post Pass to X / Twitter ↗
          </button>
          <button onClick={handleCopy} className="share-copy-btn">
            {copied ? "Link Copied!" : "Copy Invite Link"}
          </button>
        </div>

        <div style={{ marginTop: "16px", textAlign: "center" }}>
          <button
            onClick={onReset}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              fontFamily: "monospace",
              fontSize: "11px",
              cursor: "pointer",
            }}
          >
            ← Register another email or Mac device
          </button>
        </div>
      </div>
    </div>
  );
};
