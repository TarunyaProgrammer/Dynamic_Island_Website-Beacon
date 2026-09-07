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
    <section className="relative pt-24 sm:pt-32 pb-16 px-4 flex flex-col items-center text-center overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-48 left-1/4 w-[300px] h-[200px] bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-mono tracking-widest text-amber-500 uppercase font-semibold mb-6 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
        macOS Hardware Companion · Batch 01 Private Allocation
      </div>

      {/* Main Luxury Typography */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-white leading-[1.08] mb-6">
        The Physical Mac Notch. <br />
        <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
          Finally Awoken.
        </span>
      </h1>

      {/* Understated Value Proposition */}
      <p className="max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed font-sans mb-8">
        Beacon breathes life into idle MacBook camera glass, turning it into an intentional,
        air-gapped Dynamic Island workspace. 0.1% CPU. Zero subscriptions.
      </p>

      {/* Interactive Hardware Simulator */}
      <div className="w-full mb-10">
        <WaitlistInteractiveNotch />
      </div>

      {/* High-Converting Form Card (Double-Bezel Architecture) */}
      <div id="waitlist-form" className="w-full max-w-xl scroll-mt-24">
        <div className="rounded-[28px] p-2 bg-gradient-to-b from-white/15 to-white/5 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="rounded-[22px] bg-[#0C0E14] p-5 sm:p-7 border border-white/5 text-left">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <h3 className="text-sm font-mono font-semibold tracking-wider text-white uppercase">
                  Claim Pioneer Priority Access
                </h3>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                Lock in $18 Lifetime
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase mb-1.5">
                  Work Email (Where your private beta key arrives)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-sans focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  />
                </div>
              </div>

              {/* Hardware Selection (Optional Context) */}
              <div>
                <label className="block text-[11px] font-mono text-white/50 uppercase mb-1.5">
                  Your Primary Mac Hardware
                </label>
                <select
                  value={selectedMac}
                  onChange={(e) => setSelectedMac(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/80 text-xs font-mono focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
                >
                  {MAC_MODELS.map((m) => (
                    <option key={m} value={m} className="bg-[#11131A] text-white">
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage && (
                <div className="text-xs text-red-400 font-mono py-1">{errorMessage}</div>
              )}

              {/* Submit CTA Button (Nested Button-in-Button Architecture) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.35)] transition-all duration-300 active:scale-[0.99] disabled:opacity-50"
              >
                <span className="font-sans">
                  {isSubmitting ? "Securing Pioneer Slot..." : "Secure Pioneer Slot — Reserve $18 Key"}
                </span>
                <span className="w-7 h-7 rounded-lg bg-black/10 flex items-center justify-center font-mono text-sm text-black group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </button>
            </form>

            {/* Live Scarcity & Progress Indicator */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                <span className="text-white/60">
                  <span className="font-semibold text-white">{claimedCount}</span> / {totalAllocation} Claimed
                </span>
                <span className="text-amber-400 font-semibold">{percentFull}% Allocation Filled</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000 ease-out"
                  style={{ width: `${percentFull}%` }}
                ></div>
              </div>
              <p className="mt-2 text-[11px] font-mono text-white/40 leading-relaxed">
                ⚡ Once Batch 01 closes, the $18 Pioneer tier is permanently retired. Public launch will be $49/year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
