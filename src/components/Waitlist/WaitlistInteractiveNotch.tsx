import React, { useState } from "react";

export const WaitlistInteractiveNotch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"focus" | "streak" | "music" | "specs">("focus");

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Top Camera Notch Housing */}
      <div className="relative flex flex-col items-center">
        {/* Outer Aluminum Display Rim */}
        <div className="w-72 sm:w-88 h-3 rounded-b-xl bg-[#14171F] border-x border-b border-white/10 flex items-center justify-center">
          {/* Green Camera Indicator LED */}
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] mr-3 animate-pulse"></div>
          {/* Glass Lens Reflection */}
          <div className="w-2 h-2 rounded-full bg-black/60 border border-white/20"></div>
        </div>

        {/* Dynamic Island Expandable Capsule */}
        <div
          className="relative -mt-0.5 rounded-3xl bg-[#07080B] border border-white/15 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_24px_rgba(245,158,11,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            width: activeTab === "focus" ? "340px" : activeTab === "music" ? "360px" : "330px",
          }}
        >
          <div className="rounded-[18px] bg-gradient-to-b from-[#11131A] to-[#0A0C11] p-3 border border-white/5 flex items-center justify-between gap-3 select-none">
            {activeTab === "focus" && (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <span className="text-amber-400 text-xs font-mono font-bold">⌘B</span>
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono tracking-wider text-amber-400 uppercase font-semibold">
                      DEEP WORK SPRINT
                    </div>
                    <div className="text-xs font-medium text-white/90">Refactoring Kernel</div>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-bold text-amber-400">
                  24:18
                </div>
              </>
            )}

            {activeTab === "streak" && (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs">
                    ⚡
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
                      HABIT MOMENTUM
                    </div>
                    <div className="text-xs font-medium text-white/90">Deep Work Protocol</div>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400">
                  18 DAYS
                </div>
              </>
            )}

            {activeTab === "music" && (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs">
                    ♬
                  </div>
                  <div className="text-left truncate max-w-[170px]">
                    <div className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase font-semibold">
                      APPLE MUSIC
                    </div>
                    <div className="text-xs font-medium text-white/90 truncate">Solar Echoes · Ólafur</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span className="w-1 h-4 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              </>
            )}

            {activeTab === "specs" && (
              <>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs">
                    
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-mono tracking-wider text-white/60 uppercase font-semibold">
                      HARDWARE HUD
                    </div>
                    <div className="text-xs font-medium text-white/90">0.1% CPU · SQLite WAL</div>
                  </div>
                </div>
                <div className="px-2 py-1 rounded-lg bg-white/10 text-[10px] font-mono text-white/80">
                  45 MB
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interactive HUD Switchers (Clickable Pills) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab("focus")}
          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
            activeTab === "focus"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
              : "bg-white/5 text-white/50 border border-white/5 hover:text-white/80 hover:bg-white/10"
          }`}
        >
          ⌘ Focus Sprint
        </button>
        <button
          onClick={() => setActiveTab("streak")}
          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
            activeTab === "streak"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : "bg-white/5 text-white/50 border border-white/5 hover:text-white/80 hover:bg-white/10"
          }`}
        >
          ⚡ Habit Streaks
        </button>
        <button
          onClick={() => setActiveTab("music")}
          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
            activeTab === "music"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
              : "bg-white/5 text-white/50 border border-white/5 hover:text-white/80 hover:bg-white/10"
          }`}
        >
          ♬ Media HUD
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-300 ${
            activeTab === "specs"
              ? "bg-white/20 text-white border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
              : "bg-white/5 text-white/50 border border-white/5 hover:text-white/80 hover:bg-white/10"
          }`}
        >
           Hardware HUD
        </button>
      </div>
    </div>
  );
};
