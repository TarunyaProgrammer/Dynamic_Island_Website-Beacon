import React, { useState, useEffect } from "react";
import { exportWaitlistCSV } from "../../services/waitlistService";

export const WaitlistFooter: React.FC = () => {
  const [showAdminExport, setShowAdminExport] = useState(false);
  const [footerEmail, setFooterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
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

  const handleFooterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || !footerEmail.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
    setFooterEmail("");
  };

  return (
    <footer className="whoop-footer-root">
      <div className="whoop-footer-container">
        {/* Tier 1: Multi-column Navigation Matrix */}
        <div className="whoop-footer-columns-grid">
          <div className="whoop-footer-col">
            <span className="whoop-col-heading">Product</span>
            <a href="#hardware">Dynamic Island HUD</a>
            <a href="#paradigms">Behavioral Paradigms</a>
            <a href="#hardware">Focus Sprint Timer</a>
            <a href="#hardware">Habit Streak Engine</a>
            <a href="#hardware">Media Equalizer HUD</a>
            <a href="#paradigms">Offline SQLite WAL</a>
          </div>

          <div className="whoop-footer-col">
            <span className="whoop-col-heading">Architecture</span>
            <a href="#hardware">Pure Native Swift</a>
            <a href="#hardware">0.1% Idle CPU Load</a>
            <a href="#hardware">45MB Resident RAM</a>
            <a href="#paradigms">Air-Gapped Privacy</a>
            <a href="#hardware">Apple Silicon arm64</a>
          </div>

          <div className="whoop-footer-col">
            <span className="whoop-col-heading">Pioneer Access</span>
            <a href="#hardware">Pioneer Lifetime License ($18)</a>
            <a href="#hardware">Batch 01 Key Allocation</a>
            <a href="#hardware">Private TestFlight / DMG</a>
            <a href="#hardware">Zero Recurring Subscriptions</a>
            <a href="#hardware">14-Day Money-Back Guarantee</a>
          </div>

          <div className="whoop-footer-col">
            <span className="whoop-col-heading">Founder</span>
            <a href="https://tarunya.me" target="_blank" rel="noopener noreferrer">
              Portfolio — tarunya.me
            </a>
            <a href="https://x.com/tarunyakesh" target="_blank" rel="noopener noreferrer">
              X — @tarunyakesh
            </a>
            <a
              href="https://www.linkedin.com/in/tarunyakesharwani/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn — Tarunya Kesharwani
            </a>
            <a
              href="https://github.com/TarunyaProgrammer/Dynamic_Island_Website-Beacon"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
            <a href="mailto:tarunya@tarunya.me">Direct Contact</a>
          </div>

          <div className="whoop-footer-col">
            <span className="whoop-col-heading">Philosophy</span>
            <span className="whoop-col-text">Pay Once, Own Forever</span>
            <span className="whoop-col-text">Zero Cloud Telemetry</span>
            <span className="whoop-col-text">Hardware Notches Reborn</span>
            <span className="whoop-col-text">Anti-Electron Bloat</span>
          </div>
        </div>

        {/* Tier 2: Large Wordmark + Inline Email Capture */}
        <div className="whoop-footer-brand-row">
          <div className="whoop-brand-mission-block">
            <div className="whoop-footer-wordmark">BEACON</div>
            <p className="whoop-footer-mission-text">
              Our mission at Beacon is to awaken idle Mac hardware for uninterrupted deep work.
            </p>
          </div>

          <div className="whoop-footer-signup-block">
            <aside className="student-rate" aria-label="Student discount">
              <span className="student-rate-value">88% off for students</span>
              <a href="https://x.com/tarunyakesh" target="_blank" rel="noopener noreferrer">
                DM @tarunyakesh on X for a student code ↗
              </a>
            </aside>
            <form onSubmit={handleFooterSubmit} className="whoop-footer-input-line">
              <input
                type="email"
                placeholder={subscribed ? "✓ You're on the list!" : "Enter your email"}
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="whoop-footer-input"
                disabled={subscribed}
              />
              <button type="submit" className="whoop-footer-submit-btn">
                {subscribed ? "Subscribed" : "Submit"}
              </button>
            </form>
            <span className="whoop-footer-consent">
              By submitting, you agree with the zero-telemetry local data policy.
            </span>
          </div>
        </div>

        {/* Tier 3: Bottom Copyright & Region */}
        <div className="whoop-footer-bottom-bar">
          <div className="whoop-footer-copyright">
            © {new Date().getFullYear()} BEACON · The Intentional Dynamic Island for macOS
          </div>

          <div className="whoop-footer-region-bar">
            {showAdminExport && (
              <button onClick={exportWaitlistCSV} className="whoop-admin-export-btn">
                ↓ Export CSV
              </button>
            )}
            <div className="whoop-region-pill">
              <span className="whoop-region-flag">🇮🇳</span>
              <span>Global / EN</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

