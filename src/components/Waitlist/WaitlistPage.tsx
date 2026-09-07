import React, { useState } from "react";
import { WaitlistBanner } from "./WaitlistBanner";
import { WaitlistNavbar } from "./WaitlistNavbar";
import { WaitlistHero } from "./WaitlistHero";
import { WaitlistCards } from "./WaitlistCards";
import { WaitlistFloatingDock } from "./WaitlistFloatingDock";
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

  const handleFocusInput = () => {
    const inputEl = document.getElementById("waitlist-email-input");
    if (inputEl) {
      inputEl.focus();
      inputEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSuccess = (data: { email: string; queuePosition: number; macModel: string }) => {
    setSuccessData(data);
    setClaimedCount(data.queuePosition);
  };

  return (
    <div className="beacon-page-root">
      {/* 1. Top Solar Amber Announcement Bar */}
      <WaitlistBanner slotsRemaining={slotsRemaining} />

      {/* 2. Minimalist Sticky Navbar */}
      <WaitlistNavbar onJoinClick={handleFocusInput} />

      {/* 3. Section 1: Pitch Black Hero (Side-by-Side Typography & Angled 3D MacBook) */}
      <main>
        <WaitlistHero onJoinClick={handleFocusInput} />

        {/* 4. Section 2: Crisp White Editorial Proof Section with 4 Tall Cards */}
        <WaitlistCards />
      </main>

      {/* 5. Minimalist Swiss Footer */}
      <WaitlistFooter />

      {/* 6. Persistent Floating Bottom Dock */}
      <WaitlistFloatingDock
        slotsRemaining={slotsRemaining}
        totalAllocation={TOTAL_ALLOCATION}
        claimedCount={claimedCount}
        onSuccess={handleSuccess}
      />

      {/* 7. Success Ticket Overlay Modal */}
      {successData && (
        <div className="beacon-modal-overlay">
          <WaitlistSuccessCard
            email={successData.email}
            queuePosition={successData.queuePosition}
            macModel={successData.macModel}
            onReset={() => setSuccessData(null)}
          />
        </div>
      )}
    </div>
  );
};
