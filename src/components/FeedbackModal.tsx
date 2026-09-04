import React, { useState, useEffect } from "react";
import { X, Send, Check, Bug, Sparkles, MessageSquare, AlertCircle, Mail, Terminal } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Category = "bug" | "feature" | "feedback";

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [category, setCategory] = useState<Category>("bug");
  const [email, setEmail] = useState("");
  const [hardware, setHardware] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    const categoryLabels: Record<Category, string> = {
      bug: "Bug Report",
      feature: "Feature Suggestion",
      feedback: "General Feedback",
    };

    const payload = {
      _subject: `[Beacon ${categoryLabels[category]}] from ${email}`,
      _template: "table",
      category: categoryLabels[category],
      sender_email: email,
      mac_hardware_spec: hardware || "Not specified",
      message: message,
      source_url: typeof window !== "undefined" ? window.location.href : "beacon.tarunya.me",
      submitted_at: new Date().toLocaleString("en-US", { timeZoneName: "short" }),
      notification: `New Beacon inquiry received from ${email} regarding ${categoryLabels[category]}.`,
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/tarunya.programmer@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        throw new Error("Transmission failed. Please use direct mail link.");
      }
    } catch {
      // Fallback: if network or ad-blocker interferes with ajax
      setStatus("error");
      setErrorMessage("Network relay interrupted. You can email tarunya.programmer@gmail.com directly.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setMessage("");
    setHardware("");
    onClose();
  };

  const mailtoSubject = encodeURIComponent(`[Beacon Feedback] User Inquiry`);
  const mailtoBody = encodeURIComponent(`Hi Tarunya,\n\nI am contacting you regarding Beacon.\n\nCategory: ${category}\nHardware: ${hardware}\n\nMessage:\n${message}`);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-desk-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(5, 6, 9, 0.82)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "var(--bg-card)",
          borderRadius: "20px",
          border: "1px solid var(--border-amber)",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.95)",
          padding: "clamp(20px, 4vw, 32px)",
          color: "var(--text-ink)",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Help Desk"
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "6px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--text-ink)";
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <X size={18} />
        </button>

        {/* Top Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-solar)",
              boxShadow: "0 0 10px rgba(249, 115, 22, 0.8)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--accent-solar)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Beacon Help Desk & Diagnostics
          </span>
        </div>

        <h3
          id="help-desk-title"
          style={{
            fontSize: "20px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 6px 0",
            color: "var(--text-ink)",
          }}
        >
          Direct Conduit to Architect
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            lineHeight: 1.5,
            margin: "0 0 20px 0",
          }}
        >
          Found a bug in the notch HUD, experiencing performance glitches, or have an idea? All inquiries route directly to{" "}
          <strong style={{ color: "var(--text-ink)" }}>tarunya.programmer@gmail.com</strong>.
        </p>

        {status === "success" ? (
          <div
            style={{
              padding: "24px",
              backgroundColor: "rgba(5, 150, 105, 0.08)",
              borderRadius: "14px",
              border: "1px solid rgba(5, 150, 105, 0.25)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "rgba(5, 150, 105, 0.18)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                color: "var(--accent-emerald)",
              }}
            >
              <Check size={22} />
            </div>
            <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 700, color: "var(--text-ink)" }}>
              Transmission Dispatched
            </h4>
            <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>
              Your report has been securely routed to Tarunya Kesharwani (<code style={{ color: "var(--accent-solar)" }}>tarunya.programmer@gmail.com</code>). You will receive an acknowledgment within 24 hours.
            </p>
            <button
              type="button"
              onClick={handleReset}
              style={{
                padding: "8px 18px",
                borderRadius: "10px",
                backgroundColor: "var(--accent-obsidian)",
                border: "1px solid var(--border-card)",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Category Selector */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Inquiry Topic
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setCategory("bug")}
                  style={{
                    padding: "8px 6px",
                    borderRadius: "10px",
                    border: category === "bug" ? "1px solid var(--accent-solar)" : "1px solid var(--border-subtle)",
                    backgroundColor: category === "bug" ? "rgba(249, 115, 22, 0.1)" : "var(--bg-canvas-subtle)",
                    color: category === "bug" ? "var(--accent-solar)" : "var(--text-body)",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Bug size={14} />
                  <span>Bug Report</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory("feature")}
                  style={{
                    padding: "8px 6px",
                    borderRadius: "10px",
                    border: category === "feature" ? "1px solid var(--accent-solar)" : "1px solid var(--border-subtle)",
                    backgroundColor: category === "feature" ? "rgba(249, 115, 22, 0.1)" : "var(--bg-canvas-subtle)",
                    color: category === "feature" ? "var(--accent-solar)" : "var(--text-body)",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Sparkles size={14} />
                  <span>Idea / Feature</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory("feedback")}
                  style={{
                    padding: "8px 6px",
                    borderRadius: "10px",
                    border: category === "feedback" ? "1px solid var(--accent-solar)" : "1px solid var(--border-subtle)",
                    backgroundColor: category === "feedback" ? "rgba(249, 115, 22, 0.1)" : "var(--bg-canvas-subtle)",
                    color: category === "feedback" ? "var(--accent-solar)" : "var(--text-body)",
                    cursor: "pointer",
                    fontSize: "11px",
                    fontWeight: 600,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.15s ease",
                  }}
                >
                  <MessageSquare size={14} />
                  <span>General Help</span>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="feedback-email"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Your Email Address *
              </label>
              <input
                id="feedback-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@work.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-canvas-subtle)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-ink)",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* macOS & Hardware Setup */}
            <div>
              <label
                htmlFor="feedback-hardware"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                <span>Hardware & OS (Optional)</span>
                <span style={{ opacity: 0.6, fontSize: "9px" }}>e.g. M3 Pro / macOS 15</span>
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="feedback-hardware"
                  type="text"
                  value={hardware}
                  onChange={(e) => setHardware(e.target.value)}
                  placeholder="MacBook Pro 16-inch M3, macOS Sequoia"
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 34px",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-canvas-subtle)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-ink)",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <Terminal
                  size={14}
                  color="var(--text-subtle)"
                  style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="feedback-message"
                style={{
                  display: "block",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Details / Notes *
              </label>
              <textarea
                id="feedback-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  category === "bug"
                    ? "Steps to reproduce the bug, notch display anomaly, or unexpected behavior..."
                    : "Share your workflow thoughts, requested paradigm, or general inquiry..."
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-canvas-subtle)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-ink)",
                  fontSize: "13px",
                  fontFamily: "inherit",
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  lineHeight: 1.5,
                }}
              />
            </div>

            {status === "error" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  fontSize: "11px",
                  color: "#ef4444",
                }}
              >
                <AlertCircle size={14} style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <span>{errorMessage}</span>{" "}
                  <a
                    href={`mailto:tarunya.programmer@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`}
                    style={{ color: "var(--accent-solar)", textDecoration: "underline", fontWeight: 600 }}
                  >
                    Open Mail Client
                  </a>
                </div>
              </div>
            )}

            {/* Action Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginTop: "4px" }}>
              <a
                href={`mailto:tarunya.programmer@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <Mail size={12} />
                <span>Or email directly</span>
              </a>

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  backgroundColor: "var(--accent-solar)",
                  border: "none",
                  color: "#000000",
                  fontSize: "12px",
                  fontWeight: 800,
                  cursor: status === "submitting" ? "wait" : "pointer",
                  opacity: status === "submitting" ? 0.7 : 1,
                  boxShadow: "0 2px 8px rgba(249, 115, 22, 0.3)",
                  transition: "all 0.15s ease",
                }}
              >
                <Send size={13} />
                <span>{status === "submitting" ? "Transmitting..." : "Send to Architect"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
