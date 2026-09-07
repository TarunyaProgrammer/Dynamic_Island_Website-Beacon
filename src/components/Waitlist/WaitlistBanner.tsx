import React from "react";

interface WaitlistBannerProps {
  slotsRemaining: number;
}

export const WaitlistBanner: React.FC<WaitlistBannerProps> = ({ slotsRemaining }) => {
  return (
    <div className="beacon-top-banner" role="region" aria-label="Batch Announcement">
      <span>
        BATCH 01 · {slotsRemaining} / 500 PIONEER LICENSES REMAIN · $29 ONCE · LIFETIME CORE UPDATES
      </span>
    </div>
  );
};
