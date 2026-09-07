import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { WaitlistPage } from "../components/Waitlist/WaitlistPage";
import * as waitlistService from "../services/waitlistService";

describe("Waitlist Marketing Page", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("renders the luxury typography and interactive notch switcher", () => {
    render(<WaitlistPage />);

    // Verify main headline
    expect(screen.getByText(/Awaken your/i)).toBeInTheDocument();
    expect(screen.getAllByText(/BEACON/i).length).toBeGreaterThan(0);

    // Verify scarcity banner
    expect(screen.getByText(/BATCH 01 ALLOCATION LIVE/i)).toBeInTheDocument();

    // Verify interactive HUD mode buttons
    const streakBtn = screen.getByRole("button", { name: /⚡ Habit Streaks/i });
    expect(streakBtn).toBeInTheDocument();
  });

  it("validates email input in floating dock and submits to waitlist service", async () => {
    const submitSpy = vi.spyOn(waitlistService, "submitToWaitlist").mockResolvedValue({
      success: true,
      queuePosition: 388,
    });

    render(<WaitlistPage />);

    const emailInput = screen.getByPlaceholderText(/Enter work email.../i);
    const submitBtn = screen.getByRole("button", {
      name: /Claim \$18 Key ↗/i,
    });

    // Enter email
    fireEvent.change(emailInput, { target: { value: "developer@apple.com" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(submitSpy).toHaveBeenCalledWith(
        "developer@apple.com",
        expect.stringContaining("MacBook Pro")
      );
    });

    // Verify VIP confirmation pass appears
    await waitFor(() => {
      expect(screen.getByText("PIONEER ACCESS CONFIRMED")).toBeInTheDocument();
      expect(screen.getByText("#388")).toBeInTheDocument();
      expect(screen.getByText("developer@apple.com")).toBeInTheDocument();
    });
  });

  it("renders the 4 tall editorial cards in the proof section", () => {
    render(<WaitlistPage />);

    expect(screen.getByText("Awaken Idle Hardware")).toBeInTheDocument();
    expect(screen.getByText("6 Goal Paradigms")).toBeInTheDocument();
    expect(screen.getByText("0.1% Idle CPU & Swift")).toBeInTheDocument();
    expect(screen.getByText("Local SQLite WAL")).toBeInTheDocument();
  });
});
