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

  const shareText = `I just joined Beacon’s Pioneer Batch.

It keeps goals, streaks and focus sessions close to the work with local-first storage and no subscription.

$18 launch license with 14-day trial (raises to $29 later). Core updates included.`;
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
    <div className="ticket-wrapper" onClick={(event) => event.stopPropagation()}>
      <div className="ticket-inner">
        {/* Top Status */}
        <div className="ticket-header">
          <div className="ticket-status-pill">
            <span>PIONEER ACCESS CONFIRMED</span>
          </div>
          <span className="ticket-batch-pill">BATCH 01</span>
        </div>

        {/* Queue Pass Box */}
        <div className="ticket-queue-box">
          <div>
            <div style={{ fontSize: "10.5px", fontFamily: "var(--font-body)", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontWeight: 700 }}>
              YOUR QUEUE ALLOCATION
            </div>
            <div className="queue-number">#{queuePosition}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "10.5px", fontFamily: "var(--font-body)", letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontWeight: 700 }}>
              REGISTERED RECIPIENT
            </div>
            <div style={{ fontSize: "13px", fontFamily: "var(--font-body)", fontWeight: 700, color: "#FFFFFF" }}>{email}</div>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
              {macModel}
            </div>
          </div>
        </div>

        {/* Privileges */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "11px", fontFamily: "var(--font-body)", letterSpacing: "0.12em", fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: "12px", textTransform: "uppercase" }}>
            YOUR PIONEER PRIVILEGES:
          </div>
          <div className="privilege-row">
            <span className="privilege-check">✓</span>
            <span>
              <strong>$18 Launch Price Locked</strong> with 14-day trial (raises to $29 later).
            </span>
          </div>
          <div className="privilege-row">
            <span className="privilege-check">✓</span>
            <span>
              <strong>Private release build</strong> dispatched to your email before public launch.
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
            Share on X ↗
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
              color: "rgba(255,255,255,0.45)",
              fontFamily: "var(--font-body)",
              fontSize: "11.5px",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
          >
            ← Register another email or Mac device
          </button>
        </div>
      </div>
    </div>
  );
};
