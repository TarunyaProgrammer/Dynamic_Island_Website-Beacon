import React from "react";
import { HelpCircle } from "lucide-react";

interface HelpCornerButtonProps {
  onOpenFeedback: () => void;
}

export const HelpCornerButton: React.FC<HelpCornerButtonProps> = ({ onOpenFeedback }) => {
  return (
    <aside
      aria-label="Help & Feedback Assistant"
      className="help-corner-container"
    >
      <button
        type="button"
        onClick={onOpenFeedback}
        aria-label="Open Help & Bug Reporting Desk"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderRadius: "100px",
          backgroundColor: "rgba(18, 20, 28, 0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid var(--border-subtle)",
          color: "var(--text-ink)",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-solar)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 28px rgba(249, 115, 22, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border-subtle)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.4)";
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-solar)",
            boxShadow: "0 0 8px var(--accent-solar)",
          }}
        />
        <HelpCircle size={14} color="var(--accent-solar)" />
        <span className="help-corner-text">Help & Feedback</span>
      </button>
    </aside>
  );
};
