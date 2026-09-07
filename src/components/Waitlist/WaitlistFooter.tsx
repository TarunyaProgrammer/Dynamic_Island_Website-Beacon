import React, { useState } from "react";
import { exportWaitlistCSV } from "../../services/waitlistService";

export const WaitlistFooter: React.FC = () => {
  const [showAdminExport, setShowAdminExport] = useState(false);

  // Quick keyboard toggle or query param to reveal export
  React.useEffect(() => {
    if (window.location.search.includes("admin=export")) {
      setShowAdminExport(true);
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "E") {
        setShowAdminExport((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer className="w-full max-w-5xl mx-auto px-4 py-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-[10px] font-bold">
          B
        </div>
        <span>
          Beacon · Conceived & Crafted by{" "}
          <a
            href="https://tarunya.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-amber-400 underline underline-offset-4 transition-colors"
          >
            Tarunya Kesharwani
          </a>
        </span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://x.com/tarunyakesh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Twitter / X
        </a>
        <a
          href="https://github.com/TarunyaProgrammer/Dynamic_Island_Website-Beacon"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          GitHub
        </a>

        {/* Hidden / Subtle Admin CSV Download link */}
        {showAdminExport && (
          <button
            onClick={exportWaitlistCSV}
            className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 transition-all font-bold"
            title="Download all waitlist submissions saved in this browser"
          >
            ↓ Export CSV
          </button>
        )}
      </div>
    </footer>
  );
};
