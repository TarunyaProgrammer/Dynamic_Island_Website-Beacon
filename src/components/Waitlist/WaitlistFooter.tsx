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

  return (
    <footer className="whoop-footer-root">
      <div className="footer-compact">
        {/* Col 1: Brand & Creator Attribution */}
        <div className="footer-brand-col">
          <a href="#hardware" className="footer-brand">
            <img src="/logo.png" alt="Beacon" />
            <span>BEACON</span>
          </a>
          <p className="footer-mission">
            The intentional dynamic island & companion workspace for macOS.
          </p>
          <div className="footer-creator-line">
            <span>Crafted by</span>
            <a
              href="https://x.com/tarunyakesh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-creator-link"
            >
              Tarunya Kesharwani
              <span className="footer-handle">(@tarunyakesh) ↗</span>
            </a>
          </div>
        </div>

        {/* Col 2: Navigation & Build in Public */}
        <nav aria-label="Footer navigation" className="footer-links">
          <div className="footer-col-header">PRODUCT</div>
          <a href="#surfaces">Five surfaces</a>
          <a href="#models">Progress models</a>
          <a href="#engineering">Local-first engineering</a>
          <a href="https://x.com/tarunyakesh" target="_blank" rel="noopener noreferrer">
            Building in public on X ↗
          </a>
        </nav>

        {/* Col 3: Pioneer Access & Student Discount */}
        <div className="footer-action">
          <div className="footer-col-header">PIONEER ACCESS</div>
          <p>Batch 01 eligibility is open. $29 one-time lifetime license.</p>
          <div className="footer-student-callout">
            <span className="footer-student-label">Student or educator?</span>
            <a
              href="https://x.com/tarunyakesh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-student-link"
            >
              DM @tarunyakesh on X for student pricing ↗
            </a>
          </div>
          <button type="button" onClick={onJoinClick} className="footer-reserve-btn">
            Reserve Pioneer License
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <span>© {new Date().getFullYear()} Beacon. All rights reserved.</span>
          <span className="footer-bottom-sep">·</span>
          <span>
            Crafted by{" "}
            <a
              href="https://x.com/tarunyakesh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-bottom-creator"
            >
              Tarunya Kesharwani
            </a>
          </span>
        </div>
        <div className="footer-bottom-right">
          <span>Local-first SQLite · 0.1% CPU · Universal macOS</span>
          {showAdminExport && (
            <button onClick={exportWaitlistCSV} className="whoop-admin-export-btn">
              Export local CSV
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
