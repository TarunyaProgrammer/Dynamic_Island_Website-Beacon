import React, { useState, useEffect } from "react";
import { Apple, ArrowRight } from "lucide-react";

interface Props {
  onOpenPricing: () => void;
  currency: "INR" | "USD";
}

export const StickyMobileCTA: React.FC<Props> = ({ onOpenPricing, currency }) => {
  const [show, setShow] = useState(false);
  const price = "$18";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="sticky-mobile-cta" style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 85,
      padding: "12px 16px", paddingBottom: "calc(12px + env(safe-area-inset-bottom))",
      backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)", borderTop: "1px solid rgba(15,17,23,0.08)",
      boxShadow: "0 -4px 24px rgba(15,17,23,0.08)",
      animation: "stickySlideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
    }}>
      <button type="button" onClick={onOpenPricing} className="btn-obsidian"
        style={{ width: "100%", padding: "14px", fontSize: "14px", borderRadius: "12px", gap: "8px" }}>
        <Apple size={15} />
        <span>Get Pioneer Lifetime — {price}</span>
        <ArrowRight size={14} />
      </button>
      <div style={{ textAlign: "center", marginTop: "6px", fontSize: "11px", color: "#6B7280" }}>
        One-time payment · 30-day money-back guarantee
      </div>
    </div>
  );
};
