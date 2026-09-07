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

  it("renders the Beacon launch headline and Pioneer allocation", () => {
    render(<WaitlistPage />);

    // Verify main headline
    expect(screen.getByText(/Make the notch/i)).toBeInTheDocument();
    expect(screen.getAllByText(/BEACON/i).length).toBeGreaterThan(0);

    // Verify scarcity banner
    expect(screen.getByText(/PIONEER LICENSES REMAIN/i)).toBeInTheDocument();

    expect(screen.getByText(/Don't break flow. Just glance./i)).toBeInTheDocument();
  });

  it("validates email input in floating dock and submits to waitlist service", async () => {
    const submitSpy = vi.spyOn(waitlistService, "submitToWaitlist").mockResolvedValue({
      success: true,
      queuePosition: 388,
    });

    render(<WaitlistPage />);

    const emailInput = screen.getByLabelText(/Email address/i);
    const submitBtn = screen.getByRole("button", {
      name: /Reserve access/i,
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

  it("progressively reveals the five product surfaces and six progress models", () => {
    render(<WaitlistPage />);

    expect(screen.getByText("Five surfaces. One state.")).toBeInTheDocument();
    expect(screen.getByText("Command Engine")).toBeInTheDocument();
    expect(screen.getByText("Spirit")).toBeInTheDocument();
    expect(screen.getByText("Not every goal should be tracked the same way.")).toBeInTheDocument();
    expect(screen.getByText("Avoidance")).toBeInTheDocument();
  });

  it("closes the pioneer ticket when its backdrop is clicked", async () => {
    vi.spyOn(waitlistService, "submitToWaitlist").mockResolvedValue({
      success: true,
      queuePosition: 388,
    });
    render(<WaitlistPage />);

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "pioneer@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Reserve access/i }));

    await waitFor(() => expect(screen.getByText("PIONEER ACCESS CONFIRMED")).toBeInTheDocument());
    fireEvent.click(document.querySelector(".beacon-modal-overlay")!);

    expect(screen.queryByText("PIONEER ACCESS CONFIRMED")).not.toBeInTheDocument();
  });

  it("displays modern custom error badge on invalid email without submitting", async () => {
    const submitSpy = vi.spyOn(waitlistService, "submitToWaitlist");
    render(<WaitlistPage />);

    const emailInput = screen.getByLabelText(/Email address/i);
    const submitBtn = screen.getByRole("button", { name: /Reserve access/i });

    // Submit invalid email format
    fireEvent.change(emailInput, { target: { value: "fdsf" } });
    fireEvent.click(submitBtn);

    // Custom badge appears, submit is NOT called
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a valid email address"
    );
    expect(submitSpy).not.toHaveBeenCalled();

    // Typing clears the error
    fireEvent.change(emailInput, { target: { value: "fdsf@" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    // Submitting empty also displays helpful message
    fireEvent.change(emailInput, { target: { value: "   " } });
    fireEvent.click(submitBtn);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter your email address"
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });
});
