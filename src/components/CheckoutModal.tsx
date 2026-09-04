import React, { useState, useEffect } from "react";
import { X, Tag, ArrowRight, Shield, Key, Sparkles, Apple, AlertCircle, ExternalLink, CheckCircle2 } from "lucide-react";
import { buildCheckoutUrl, isCheckoutConfigured, LS_CONFIG } from "../config/lemonsqueezy";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const configured = isCheckoutConfigured();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      if (win.createLemonSqueezy) {
        win.createLemonSqueezy();
      }
      if (win.LemonSqueezy?.Setup) {
        win.LemonSqueezy.Setup({
          eventHandler: (event: any) => {
            if (event?.event === "Checkout.Success") {
              onClose();
            }
          },
        });
      }
    }
  }, [onClose]);

  if (!isOpen) return null;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handleOpenCheckout = () => {
    setIsOpening(true);
    const url = buildCheckoutUrl(discountApplied ? discountCode : undefined);

    // Close local modal so Lemon Squeezy overlay appears cleanly on top
    setTimeout(() => {
      onClose();
      setIsOpening(false);
    }, 150);

    const win = window as any;
    if (typeof win !== "undefined" && win.LemonSqueezy?.Url?.Open) {
      try {
        if (typeof win.createLemonSqueezy === "function") {
          win.createLemonSqueezy();
        }
        win.LemonSqueezy.Url.Open(url);
        return;
      } catch (err) {
        console.warn("[CheckoutModal] LemonSqueezy overlay error, falling back to window:", err);
      }
    }

    // Direct window fallback
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        padding: "20px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          backgroundColor: "#0D0F17",
          border: "1px solid rgba(255, 122, 0, 0.28)",
          borderRadius: "24px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.92), 0 0 40px rgba(255,122,0,0.14)",
          padding: "clamp(24px, 5vw, 36px)",
          position: "relative",
          color: "#FFFFFF",
          animation: "modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          title="Close checkout"
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "none",
            border: "none",
            color: "#6B7280",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            transition: "color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#6B7280";
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
          }}
        >
          <X size={20} />
        </button>

        {/* Header with App Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
          <img
            src="/logo.png"
            alt="Beacon"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              boxShadow: "0 4px 14px rgba(255, 122, 0, 0.3)",
            }}
          />
          <div>
            <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em", margin: 0 }}>
              Pioneer Lifetime License
            </h3>
            <span style={{ fontSize: "12px", color: "#9EA5B6" }}>
              Secure checkout via Lemon Squeezy (Stripe)
            </span>
          </div>
        </div>

        {/* Price Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 18px",
            borderRadius: "14px",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "20px",
          }}
        >
          <div>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
              Beacon for macOS
            </span>
            <span style={{ fontSize: "12px", color: "#9EA5B6" }}>
              Universal (M1–M4 & Intel) · 3 Personal Macs
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "26px", fontWeight: 800, color: "#FF7A00" }}>
              $18
            </span>
            <span style={{ fontSize: "13px", color: "#6B7280", textDecoration: "line-through", marginLeft: "6px" }}>
              $39
            </span>
            <span style={{ display: "block", fontSize: "10px", color: "#10B981", fontWeight: 700, textTransform: "uppercase" }}>
              Pay once · Own forever
            </span>
          </div>
        </div>

        {/* Configuration notice if variant ID not set yet */}
        {!configured && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "12px 14px",
              borderRadius: "10px",
              backgroundColor: "rgba(255, 122, 0, 0.08)",
              border: "1px solid rgba(255, 122, 0, 0.25)",
              marginBottom: "18px",
              fontSize: "12px",
              color: "#E2E5EC",
              lineHeight: 1.45,
            }}
          >
            <AlertCircle size={16} color="#FF7A00" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong style={{ color: "#FF7A00" }}>Ready for your Lemon Squeezy link:</strong>
              <div style={{ marginTop: "2px", color: "#9EA5B6" }}>
                Create your product on Lemon Squeezy and paste your product link into{" "}
                <code style={{ color: "#FFFFFF", backgroundColor: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: "4px" }}>
                  src/config/lemonsqueezy.ts
                </code>.
              </div>
            </div>
          </div>
        )}

        {/* Discount Code Input */}
        <div style={{ marginBottom: "22px" }}>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "#E2E5EC",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Tag size={13} color="#FF7A00" />
            Have a discount code?
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="e.g. FRIEND20"
              value={discountCode}
              onChange={(e) => {
                setDiscountCode(e.target.value.toUpperCase());
                setDiscountApplied(false);
              }}
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.06)",
                border: `1px solid ${discountApplied ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.12)"}`,
                color: "#FFFFFF",
                fontSize: "14px",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleApplyDiscount();
              }}
            />
            <button
              type="button"
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim()}
              style={{
                padding: "11px 16px",
                borderRadius: "10px",
                backgroundColor: discountApplied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.08)",
                border: `1px solid ${discountApplied ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.12)"}`,
                color: discountApplied ? "#10B981" : "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
                cursor: discountCode.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {discountApplied ? (
                <>
                  <CheckCircle2 size={14} />
                  <span>Applied</span>
                </>
              ) : (
                "Apply"
              )}
            </button>
          </div>
          {discountApplied && (
            <p style={{ fontSize: "12px", color: "#10B981", marginTop: "6px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={13} />
              Code "{discountCode}" will be applied automatically at checkout
            </p>
          )}
        </div>

        {/* Master Checkout CTA Button */}
        <button
          type="button"
          onClick={handleOpenCheckout}
          disabled={isOpening}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "#0F1117",
            border: "1px solid rgba(255,122,0,0.55)",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 6px 24px rgba(15,17,23,0.5), 0 0 24px rgba(255,122,0,0.15)",
            transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "16px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1C1F29";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,122,0,0.85)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0F1117";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,122,0,0.55)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          <Apple size={18} />
          <span>Continue to Lemon Squeezy Checkout</span>
          <ArrowRight size={16} />
        </button>

        {/* Trust Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            fontSize: "11px",
            color: "#9EA5B6",
            flexWrap: "wrap",
            paddingTop: "4px",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Shield size={12} color="#10B981" />
            Stripe / Lemon Squeezy 256-bit SSL
          </span>
          <span>•</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Key size={12} color="#FF7A00" />
            Instant License Key
          </span>
          <span>•</span>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={12} color="#38BDF8" />
            Apple Pay & Cards
          </span>
        </div>

        <p style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: "#6B7280", lineHeight: 1.5 }}>
          Instant license key delivery via email. 30-day money-back guarantee. macOS 12+ required.
        </p>
      </div>
    </div>
  );
};
