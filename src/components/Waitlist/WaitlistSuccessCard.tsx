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
    <div className="w-full max-w-xl mx-auto p-2 rounded-[28px] bg-gradient-to-b from-amber-500/30 via-white/10 to-transparent border border-amber-500/30 shadow-[0_20px_60px_rgba(245,158,11,0.15)] backdrop-blur-2xl animate-fade-in">
      <div className="rounded-[22px] bg-[#0A0C11] p-6 sm:p-8 border border-white/10 text-left relative overflow-hidden">
        {/* Holographic Watermark Badge */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Status */}
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              PIONEER ACCESS CONFIRMED
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
            BATCH 01
          </span>
        </div>

        {/* Queue Pass Ticket Header */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-white/50 tracking-wider">
              YOUR QUEUE ALLOCATION
            </div>
            <div className="text-3xl sm:text-4xl font-mono font-black text-amber-400">
              #{queuePosition}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-white/50 tracking-wider">
              REGISTERED RECIPIENT
            </div>
            <div className="text-xs font-mono text-white/90 truncate max-w-[180px]">
              {email}
            </div>
            <div className="text-[10px] font-mono text-white/40">{macModel}</div>
          </div>
        </div>

        {/* Guaranteed Perks List */}
        <div className="space-y-2.5 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
            YOUR PIONEER PRIVILEGES:
          </div>
          <div className="flex items-center gap-2.5 text-xs text-white/80 font-sans">
            <span className="text-amber-400 font-mono font-bold">✓</span>
            <span>
              <strong>$18 Lifetime Price Locked</strong> — immune to future subscription tiers.
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-white/80 font-sans">
            <span className="text-amber-400 font-mono font-bold">✓</span>
            <span>
              <strong>Private DMG / TestFlight Build</strong> dispatched to your email before public launch.
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-white/80 font-sans">
            <span className="text-amber-400 font-mono font-bold">✓</span>
            <span>
              <strong>Direct Founder Priority</strong> for custom notch feature requests.
            </span>
          </div>
        </div>

        {/* Viral Share Actions */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="text-[11px] font-mono text-white/60">
            Bump your queue placement by sharing your pass with fellow Mac builders:
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleTwitterShare}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-white/90 font-mono text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <span>Post Pass to X / Twitter</span>
              <span>↗</span>
            </button>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-xs border border-white/15 transition-all active:scale-95"
            >
              <span>{copied ? "Pass Copied!" : "Copy Invite Link"}</span>
            </button>
          </div>
        </div>

        {/* Register another email button */}
        <div className="mt-4 text-center">
          <button
            onClick={onReset}
            className="text-[11px] font-mono text-white/40 hover:text-white/70 transition-colors"
          >
            ← Register another email or Mac device
          </button>
        </div>
      </div>
    </div>
  );
};
