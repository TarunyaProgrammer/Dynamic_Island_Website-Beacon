import React, { useState, useEffect } from "react";
import { exportWaitlistCSV } from "../../services/waitlistService";

export const WaitlistFooter: React.FC = () => {
  const [showAdminExport, setShowAdminExport] = useState(false);

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

  return (
    <footer className="waitlist-footer">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "5px",
            background: "rgba(245, 158, 11, 0.2)",
            border: "1px solid rgba(245, 158, 11, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F59E0B",
            fontWeight: 800,
            fontSize: "10px",
          }}
        >
          B
        </div>
        <span>
          Beacon · Conceived & Crafted by{" "}
          <a
            href="https://tarunya.me"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#FFFFFF", textDecoration: "underline" }}
          >
            Tarunya Kesharwani
          </a>
        </span>
      </div>

      <div className="footer-links-group">
        <a href="https://x.com/tarunyakesh" target="_blank" rel="noopener noreferrer">
          Twitter / X
        </a>
        <a
          href="https://github.com/TarunyaProgrammer/Dynamic_Island_Website-Beacon"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>

        {showAdminExport && (
          <button onClick={exportWaitlistCSV} className="footer-export-btn">
            ↓ Export CSV
          </button>
        )}
      </div>
    </footer>
  );
};
