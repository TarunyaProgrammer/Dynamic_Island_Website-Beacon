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

  it("renders the luxury typography and interactive notch simulator", () => {
    const { container } = render(<WaitlistPage />);

    // Verify main headline
    expect(screen.getByText(/The Physical Mac Notch./i)).toBeInTheDocument();
    expect(screen.getByText(/Finally Awoken./i)).toBeInTheDocument();

    // Verify scarcity badges
    expect(screen.getByText(/BATCH 01 ·/i)).toBeInTheDocument();
    expect(screen.getByText(/113 SLOTS LEFT/i)).toBeInTheDocument();

    // Verify interactive HUD mode buttons
    const streakBtn = screen.getByRole("button", { name: /⚡ Habit Streaks/i });
    expect(streakBtn).toBeInTheDocument();

    // Click habit streak mode
    fireEvent.click(streakBtn);
    expect(screen.getByText("HABIT MOMENTUM")).toBeInTheDocument();
    expect(screen.getByText("18 DAYS")).toBeInTheDocument();
  });

  it("validates email input and submits to the waitlist service", async () => {
    const submitSpy = vi.spyOn(waitlistService, "submitToWaitlist").mockResolvedValue({
      success: true,
      queuePosition: 388,
    });

    render(<WaitlistPage />);

    const emailInput = screen.getByPlaceholderText(/architect@domain.com/i);
    const submitBtn = screen.getByRole("button", {
      name: /Secure Pioneer Slot — Reserve \$18 Key/i,
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

  it("renders the 3-card architectural bento grid", () => {
    render(<WaitlistPage />);

    expect(screen.getByText("0.1% Idle CPU & Native Swift")).toBeInTheDocument();
    expect(screen.getByText("Local SQLite WAL Storage")).toBeInTheDocument();
    expect(screen.getByText("Pioneer Lifetime Ownership")).toBeInTheDocument();
  });
});
