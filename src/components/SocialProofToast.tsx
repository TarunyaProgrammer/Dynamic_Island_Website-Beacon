import React, { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";

const NAMES = [
  "Arjun from Bangalore",
  "Sarah from Austin",
  "Kenta from Tokyo",
  "Priya from Mumbai",
  "Lucas from Berlin",
  "Mei from Singapore",
  "Rahul from Delhi",
  "Emma from London",
  "Carlos from São Paulo",
  "Aisha from Dubai",
  "James from Sydney",
  "Yuki from Osaka",
  "Ananya from Pune",
  "Max from Amsterdam",
  "Fatima from Toronto",
];

const TIMES = ["2 minutes ago", "5 minutes ago", "12 minutes ago", "18 minutes ago", "23 minutes ago", "31 minutes ago", "1 hour ago", "2 hours ago"];

export const SocialProofToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({ name: NAMES[0], time: TIMES[0] });
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // First toast after 8 seconds
    const initialDelay = setTimeout(() => showToast(), 18000);
    return () => clearTimeout(initialDelay);
  }, []);

  const showToast = () => {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const time = TIMES[Math.floor(Math.random() * TIMES.length)];
    setCurrent({ name, time });
    setExiting(false);
    setVisible(true);

    // Hide after 4.5 seconds
    setTimeout(() => {
      setExiting(true);
      setTimeout(() => {
        setVisible(false);
        // Next toast in 15-35 seconds (random)
        setTimeout(() => showToast(), 40000 + Math.random() * 30000);
      }, 400);
    }, 4500);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 80,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 18px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(217, 119, 6, 0.2)",
        boxShadow: "0 12px 40px rgba(15, 17, 23, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.8) inset",
        maxWidth: "340px",
        animation: exiting ? "toastSlideOut 0.4s ease forwards" : "toastSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 400);
      }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          backgroundColor: "rgba(217, 119, 6, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <ShieldCheck size={18} color="#D97706" />
      </div>
      <div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#0F1117", lineHeight: 1.3 }}>
          {current.name}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: 1.4 }}>
          claimed Pioneer Lifetime · <span style={{ color: "#D97706", fontWeight: 600 }}>{current.time}</span>
        </div>
      </div>
    </div>
  );
};
