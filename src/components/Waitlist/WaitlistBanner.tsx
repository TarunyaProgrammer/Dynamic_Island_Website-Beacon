import React from "react";

interface WaitlistBannerProps {
  slotsRemaining: number;
}

export const WaitlistBanner: React.FC<WaitlistBannerProps> = ({ slotsRemaining }) => {
  return (
    <div className="beacon-top-banner" role="region" aria-label="Batch Announcement">
      <span>
        BATCH 01 ALLOCATION LIVE · ONLY {slotsRemaining} PIONEER SLOTS REMAINING BEFORE PUBLIC LAUNCH ($49/YR)
      </span>
    </div>
  );
};
