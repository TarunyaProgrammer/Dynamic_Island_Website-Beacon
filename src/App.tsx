import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { WaitlistPage } from "./components/Waitlist/WaitlistPage";

export const App: React.FC = () => {
  return (
    <>
      <WaitlistPage />
      <Analytics />
    </>
  );
};
