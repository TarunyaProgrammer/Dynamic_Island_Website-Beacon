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
    const el = document.getElementById("waitlist-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="waitlist-page-root">
      {/* Precision Grid Pattern */}
      <div className="waitlist-grid-bg" />

      {/* Navigation */}
      <WaitlistNavbar
        onScrollToForm={handleScrollToForm}
        slotsRemaining={slotsRemaining}
      />

      {/* Main Content Area (Compact ~150-180vh) */}
      <main style={{ position: "relative", zIndex: 10 }}>
        {!successData ? (
          <WaitlistHero
            claimedCount={claimedCount}
            totalAllocation={TOTAL_ALLOCATION}
            onSuccess={handleSuccess}
          />
        ) : (
          <div style={{ paddingTop: "140px", paddingBottom: "48px", paddingLeft: "16px", paddingRight: "16px" }}>
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
