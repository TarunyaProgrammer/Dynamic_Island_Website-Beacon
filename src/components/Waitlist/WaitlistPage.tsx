import React, { useState } from "react";
import { WaitlistNavbar } from "./WaitlistNavbar";
import { WaitlistHero } from "./WaitlistHero";
import { WaitlistBento } from "./WaitlistBento";
import { WaitlistSuccessCard } from "./WaitlistSuccessCard";
import { WaitlistFooter } from "./WaitlistFooter";
import { getLiveClaimedCount } from "../../services/waitlistService";

const TOTAL_ALLOCATION = 500;

export const WaitlistPage: React.FC = () => {
  const [claimedCount, setClaimedCount] = useState<number>(() => getLiveClaimedCount());
  const [successData, setSuccessData] = useState<{
    email: string;
    queuePosition: number;
    macModel: string;
  } | null>(null);

  const slotsRemaining = Math.max(TOTAL_ALLOCATION - claimedCount, 0);

  const handleScrollToForm = () => {
    const el = document.getElementById("waitlist-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSuccess = (data: { email: string; queuePosition: number; macModel: string }) => {
    setSuccessData(data);
    setClaimedCount(data.queuePosition);
    // Smooth scroll to card
    const el = document.getElementById("waitlist-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080B] text-white selection:bg-amber-500 selection:text-black font-sans relative overflow-x-hidden antialiased">
      {/* Precision Ambient Grid Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] -z-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Navigation */}
      <WaitlistNavbar
        onScrollToForm={handleScrollToForm}
        slotsRemaining={slotsRemaining}
      />

      {/* Main Content Area (Strictly compact ~150-180vh) */}
      <main className="relative z-10">
        {!successData ? (
          <WaitlistHero
            claimedCount={claimedCount}
            totalAllocation={TOTAL_ALLOCATION}
            onSuccess={handleSuccess}
          />
        ) : (
          <div className="pt-28 pb-12 px-4">
            <WaitlistSuccessCard
              email={successData.email}
              queuePosition={successData.queuePosition}
              macModel={successData.macModel}
              onReset={() => setSuccessData(null)}
            />
          </div>
        )}

        {/* 3-Card Architectural Bento Grid */}
        <WaitlistBento />
      </main>

      {/* Swiss Precision Minimalist Footer */}
      <WaitlistFooter />
    </div>
  );
};
