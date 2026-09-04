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
        className="help-corner-btn"
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: "#F97316",
            boxShadow: "0 0 10px rgba(249, 115, 22, 0.85)",
            flexShrink: 0,
          }}
        />
        <HelpCircle size={15} color="#F97316" style={{ flexShrink: 0 }} />
        <span className="help-corner-text">Help & Feedback</span>
      </button>
    </aside>
  );
};
