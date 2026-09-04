import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { IslandSimulator } from "../components/IslandSimulator";
import { PricingSection } from "../components/PricingSection";

describe("IslandSimulator Component", () => {
  it("renders the playable hardware simulator", () => {
    render(<IslandSimulator />);
    expect(screen.getByText("PLAYABLE HARDWARE SIMULATOR")).toBeInTheDocument();
    expect(screen.getByText(/Touch the notch/i)).toBeInTheDocument();
  });

  it("switches surface modes cleanly", () => {
    render(<IslandSimulator />);

    const menubarBtn = screen.getByRole("button", { name: "Menu Bar Hub" });
    fireEvent.click(menubarBtn);
    expect(screen.getByText("Beacon Hub")).toBeInTheDocument();

    const commandBtn = screen.getByRole("button", { name: /Command Engine/i });
    fireEvent.click(commandBtn);
    expect(screen.getByPlaceholderText(/search goals/i)).toBeInTheDocument();

    const islandBtn = screen.getByRole("button", { name: "Dynamic Island Notch" });
    fireEvent.click(islandBtn);
    expect(screen.getByText("Dynamic Island Notch")).toBeInTheDocument();
  });

  it("increments progress in Island Notch when [+10] is clicked", () => {
    render(<IslandSimulator />);

    // Initial value in default Island Notch mode
    expect(screen.getByText(/61 \/ 100 problems/i)).toBeInTheDocument();

    // Click [+10] button
    const plusTenBtn = screen.getByRole("button", { name: "+10" });
    fireEvent.click(plusTenBtn);

    // Increment check
    expect(screen.getByText(/71 \/ 100 problems/i)).toBeInTheDocument();
  });

  it("automatically unpins the notch on first hover so it collapses on mouse leave", () => {
    render(<IslandSimulator />);

    // Starts pinned and expanded
    const pinBtn = screen.getByRole("button", { name: /unpin dynamic island notch/i });
    expect(pinBtn).toBeInTheDocument();
    expect(screen.getByText(/Launch SaaS App/i)).toBeInTheDocument();

    const notchContainer = pinBtn.closest("div[style*='position: relative']")?.firstElementChild as HTMLElement;
    expect(notchContainer).not.toBeNull();

    // Hover into the notch for the first time
    fireEvent.mouseEnter(notchContainer);

    // Mouse leaves: it should collapse because first hover auto-unpinned it
    fireEvent.mouseLeave(notchContainer);

    // Compact pill is now displayed with "Hover to expand"
    expect(screen.getByText("Hover to expand")).toBeInTheDocument();

    // Hovering again expands it
    fireEvent.mouseEnter(notchContainer);
    expect(screen.getByText(/Launch SaaS App/i)).toBeInTheDocument();
  });
});

describe("PricingSection Component", () => {
  it("renders the $18 Pioneer Lifetime offer and money-back guarantee", () => {
    render(<PricingSection onSelectPlan={() => {}} />);

    expect(screen.getByText("$18")).toBeInTheDocument();
    expect(screen.getByText(/pioneer lifetime edition/i)).toBeInTheDocument();
    expect(screen.getByText(/30-day money-back guarantee/i)).toBeInTheDocument();
  });

  it("has functional CTA button", () => {
    render(<PricingSection onSelectPlan={() => {}} />);

    const ctaButtons = screen.getAllByRole("button", { name: /claim pioneer lifetime license/i });
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
  });
});
