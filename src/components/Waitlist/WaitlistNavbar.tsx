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
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl transition-all duration-300 hover:border-amber-500/30"
        style={{
          backgroundColor: "rgba(15, 17, 23, 0.78)",
        }}
      >
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.35)]">
            <span className="font-mono font-black text-black text-xs">B</span>
          </div>
          <span className="font-mono text-xs tracking-[0.2em] font-semibold text-white/90 uppercase hidden xs:inline-block">
            BEACON
          </span>
        </div>

        {/* Live Scarcity Telemetry Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-white/70 hidden sm:inline">BATCH 01 ·</span>
          <span className="font-semibold text-amber-400">{slotsRemaining} SLOTS LEFT</span>
        </div>

        {/* Quick CTA */}
        <button
          onClick={onScrollToForm}
          className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-[0_2px_12px_rgba(245,158,11,0.3)] transition-all duration-300 active:scale-95"
        >
          <span>Claim Key</span>
          <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
            ↗
          </span>
        </button>
      </nav>
    </header>
  );
};
