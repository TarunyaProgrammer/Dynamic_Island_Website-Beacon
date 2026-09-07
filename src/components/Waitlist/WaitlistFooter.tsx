import React, { useEffect, useState } from "react";
import { exportWaitlistCSV } from "../../services/waitlistService";

interface WaitlistFooterProps { onJoinClick: () => void; }

export const WaitlistFooter: React.FC<WaitlistFooterProps> = ({ onJoinClick }) => {
  const [showAdminExport, setShowAdminExport] = useState(false);
  useEffect(() => {
    if (window.location.search.includes("admin=export")) setShowAdminExport(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "E") setShowAdminExport((shown) => !shown);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <footer className="whoop-footer-root">
    <div className="footer-compact">
      <div><a href="#hardware" className="footer-brand"><img src="/logo.png" alt="Beacon" /> <span>BEACON</span></a><p>The intentional dynamic island and companion workspace for macOS.</p></div>
      <nav aria-label="Footer navigation" className="footer-links"><a href="#surfaces">Five surfaces</a><a href="#models">Progress models</a><a href="#engineering">Local-first engineering</a><a href="https://x.com/tarunyakesh" target="_blank" rel="noopener noreferrer">Follow the build</a></nav>
      <div className="footer-action"><p>One reservation form. Every entry is sent to the Beacon waitlist.</p><button type="button" onClick={onJoinClick}>Reserve Pioneer License</button></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Beacon</span><span>Local-first by default. Cloud AI is optional and explicitly invoked.</span>{showAdminExport && <button onClick={exportWaitlistCSV} className="whoop-admin-export-btn">Export local CSV</button>}</div>
  </footer>;
};
