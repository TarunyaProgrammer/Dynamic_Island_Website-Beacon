import React from "react";

export const WaitlistBento: React.FC = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <span className="text-[11px] font-mono tracking-widest uppercase text-amber-500 font-semibold">
          ARCHITECTURAL CREDIBILITY
        </span>
        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
          Why Mac Builders Refuse Standard Productivity Tools
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: Native Performance */}
        <div className="rounded-[24px] p-1.5 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-xl group hover:border-amber-500/30 transition-all duration-300">
          <div className="h-full rounded-[18px] bg-[#0A0C11] p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono text-sm font-bold mb-4">
                0.1%
              </div>
              <h3 className="text-base font-sans font-bold text-white mb-2">
                0.1% Idle CPU & Native Swift
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Engineered in pure native Swift with a 45MB RAM footprint. No Electron web bloat.
                Your MacBook runs cool, silent, and preserves all-day battery.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>LATENCY: 0MS</span>
              <span className="text-emerald-400">● 45MB RESIDENT</span>
            </div>
          </div>
        </div>

        {/* Card 2: Air-Gapped Privacy */}
        <div className="rounded-[24px] p-1.5 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-xl group hover:border-cyan-500/30 transition-all duration-300">
          <div className="h-full rounded-[18px] bg-[#0A0C11] p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono text-base font-bold mb-4">
                🛡️
              </div>
              <h3 className="text-base font-sans font-bold text-white mb-2">
                Local SQLite WAL Storage
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Every focus block, habit streak, and goal is written to local SQLite WAL tables
                on your Mac. Zero cloud lock-in, zero third-party telemetry, 100% air-gapped.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>DATA LOCALE: NVME</span>
              <span className="text-cyan-400">● AIR-GAPPED</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pioneer Ownership */}
        <div className="rounded-[24px] p-1.5 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-xl group hover:border-amber-500/30 transition-all duration-300">
          <div className="h-full rounded-[18px] bg-[#0A0C11] p-6 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-mono text-base font-bold mb-4 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                $18
              </div>
              <h3 className="text-base font-sans font-bold text-white mb-2">
                Pioneer Lifetime Ownership
              </h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Pay $18 once, own Beacon forever. No recurring credit card charges, no price
                hikes. Early access includes private beta drops and founder direct contact.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>LICENSE: PERPETUAL</span>
              <span className="text-amber-400">● ZERO RENEWALS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
