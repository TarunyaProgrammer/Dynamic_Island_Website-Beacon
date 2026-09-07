import React, { useState } from "react";
import { submitToWaitlist } from "../../services/waitlistService";

interface WaitlistFloatingDockProps {
  onSuccess: (data: { email: string; queuePosition: number; macModel: string }) => void;
}

export const WaitlistFloatingDock: React.FC<WaitlistFloatingDockProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const validateEmail = (val: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 450);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setValidationError("Please enter your email address");
      triggerShake();
      return;
    }

    if (!validateEmail(trimmed)) {
      setValidationError("Please enter a valid email address (e.g. name@domain.com)");
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);
    try {
      const res = await submitToWaitlist(trimmed, "MacBook Pro / Universal");
      if (!res.success) {
        setValidationError(res.message || "We couldn’t confirm your waitlist entry. Please try again.");
        triggerShake();
        return;
      }
      onSuccess({
        email: trimmed,
        queuePosition: res.queuePosition,
        macModel: "MacBook Pro / Universal",
      });
      setEmail("");
    } catch (err) {
      console.error(err);
      setValidationError("We couldn’t confirm your waitlist entry. Please try again.");
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validationError) {
      setValidationError(null);
    }
  };

  return (
    <aside className="beacon-dock-wrapper" aria-label="Pioneer access reservation">
      <div className={`beacon-dock-capsule ${isShaking ? "beacon-dock-shake" : ""}`}>
        <div className="beacon-dock-context">
          <div className="beacon-dock-badge">
            <strong>Pioneer access</strong>
          </div>
          <span>$29 once · core updates included</span>
        </div>

        <div className="beacon-dock-divider" aria-hidden="true" />

        <form onSubmit={handleSubmit} noValidate className="beacon-dock-form">
          <div className={`beacon-dock-field ${validationError ? "beacon-dock-field-error" : ""}`}>
            <label htmlFor="waitlist-email-input" className="beacon-dock-sr-label">
              Email address
            </label>
            <input
              id="waitlist-email-input"
              type="email"
              value={email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="beacon-dock-input"
              autoComplete="email"
              spellCheck={false}
              autoCapitalize="off"
              aria-invalid={!!validationError}
              aria-describedby={validationError ? "dock-validation-error" : undefined}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="beacon-dock-submit"
            aria-label="Reserve access"
          >
            <span>{isSubmitting ? "Reserving…" : "Reserve access"}</span>
          </button>

          {validationError && (
            <div id="dock-validation-error" className="beacon-dock-error-badge" role="alert">
              <svg
                className="beacon-dock-error-icon"
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="8" y1="4.5" x2="8" y2="8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="11.5" r="0.85" fill="currentColor" />
              </svg>
              <span>{validationError}</span>
              <div className="beacon-dock-error-arrow" aria-hidden="true" />
            </div>
          )}
        </form>
      </div>
    </aside>
  );
};
