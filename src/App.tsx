import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { IslandSimulator } from "./components/IslandSimulator";
import { AppScreenshotsGallery } from "./components/AppScreenshotsGallery";
import { FeatureGrid } from "./components/FeatureGrid";
import { SpiritShowcase } from "./components/SpiritShowcase";
import { TechSpecs } from "./components/TechSpecs";
import { EditorialManifestoStatement } from "./components/EditorialManifestoStatement";
import { SoftwareOwnership } from "./components/SoftwareOwnership";
import { PricingSection } from "./components/PricingSection";
import { FounderLetter } from "./components/FounderLetter";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { BeaconSpiritCinematic } from "./components/BeaconSpiritCinematic";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import { CheckoutModal } from "./components/CheckoutModal";
import { FeedbackModal } from "./components/FeedbackModal";
import { HelpCornerButton } from "./components/HelpCornerButton";

export const App: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleOpenPricing = () => {
    const pricingEl = document.getElementById("pricing");
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOpenFeedback = () => {
    setIsFeedbackOpen(true);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-canvas)", color: "var(--text-ink)", position: "relative" }}>
      {/* Navigation */}
      <Navbar
        currency="USD"
        onOpenPricing={handleOpenCheckout}
      />

      {/* Hero */}
      <HeroSection
        onOpenPricing={handleOpenCheckout}
        onDownloadTrial={handleOpenCheckout}
        currency="USD"
      />

      {/* Interactive Dynamic Island Hardware Simulator */}
      <IslandSimulator />

      {/* Real macOS Screenshots on Photorealistic MacBook Retina Displays */}
      <AppScreenshotsGallery />

      {/* 6 Behavioral Goal Paradigms (Editorial Cards) */}
      <FeatureGrid />

      {/* Beacon Spirit AI Companion Showcase */}
      <SpiritShowcase />

      {/* Performance & Hardware Specs */}
      <TechSpecs />

      {/* Custom Editorial Typographic Lockup with Dynamic Island Pills */}
      <EditorialManifestoStatement />

      {/* Software Ownership Manifesto (Rental vs. Ownership) */}
      <SoftwareOwnership />

      {/* Pricing & Checkout Trigger */}
      <PricingSection
        currency="USD"
        onSelectPlan={handleOpenCheckout}
      />

      {/* Founder's Personal Letter & Craft Manifesto */}
      <FounderLetter />

      {/* FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer onOpenFeedback={handleOpenFeedback} />

      {/* Floating Scroll-Reactive Spirit Mascot Companion */}
      <BeaconSpiritCinematic />

      {/* Floating Help Corner & Bug Reporting Desk */}
      <HelpCornerButton onOpenFeedback={handleOpenFeedback} />

      {/* Help & Bug Reporting Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* Lemon Squeezy Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Conversion: Sticky Mobile Bottom CTA */}
      <StickyMobileCTA onOpenPricing={handleOpenCheckout} currency="USD" />
    </div>
  );
};
