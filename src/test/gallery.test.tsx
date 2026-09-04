import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { AppScreenshotsGallery } from "../components/AppScreenshotsGallery";

describe("AppScreenshotsGallery Component", () => {
  it("renders all 5 surface tab buttons", () => {
    render(<AppScreenshotsGallery />);

    expect(screen.getByRole("button", { name: /main dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hardware dynamic island/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /menu bar hub/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /command engine/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /spirit ai companion/i })).toBeInTheDocument();
  });

  it("defaults to Main Dashboard with authentic title and highlights", () => {
    render(<AppScreenshotsGallery />);

    expect(screen.getByText("Obsidian Command Center on MacBook Pro")).toBeInTheDocument();
    expect(screen.getByText("✓ 6 Goal Paradigms")).toBeInTheDocument();
    expect(screen.getByText("✓ Weekly Rhythm Spline")).toBeInTheDocument();
    expect(screen.getByText("✓ Compounding Momentum")).toBeInTheDocument();

    const img = screen.getByRole("img", { name: "Obsidian Command Center on MacBook Pro" });
    expect(img).toHaveAttribute("src", "/assets/macbook-dashboard-mockup.jpg");
  });

  it("switches correctly between all 5 surfaces on click", () => {
    render(<AppScreenshotsGallery />);

    // 1. Dynamic Island Notch
    const notchBtn = screen.getByRole("button", { name: /hardware dynamic island/i });
    fireEvent.click(notchBtn);
    expect(screen.getByText("MacBook Camera Notch HUD")).toBeInTheDocument();
    expect(screen.getByText("✓ Zero Pixel Waste")).toBeInTheDocument();
    const notchImg = screen.getByRole("img", { name: "MacBook Camera Notch HUD" });
    expect(notchImg).toHaveAttribute("src", "/assets/macbook-notch-mockup.jpg");

    // 2. Menu Bar Hub
    const menubarBtn = screen.getByRole("button", { name: /menu bar hub/i });
    fireEvent.click(menubarBtn);
    expect(screen.getByText("macOS System Tray Popover")).toBeInTheDocument();
    expect(screen.getByText("✓ One-Click Quick Log")).toBeInTheDocument();
    const menubarImg = screen.getByRole("img", { name: "macOS System Tray Popover" });
    expect(menubarImg).toHaveAttribute("src", "/assets/macbook-menubar-mockup.jpg");

    // 3. Command Engine
    const cmdBtn = screen.getByRole("button", { name: /command engine/i });
    fireEvent.click(cmdBtn);
    expect(screen.getByText("Spotlight / Raycast Keyboard HUD")).toBeInTheDocument();
    expect(screen.getByText("✓ ⌘⇧B Global Hotkey")).toBeInTheDocument();
    const cmdImg = screen.getByRole("img", { name: "Spotlight / Raycast Keyboard HUD" });
    expect(cmdImg).toHaveAttribute("src", "/assets/macbook-command-mockup.jpg");

    // 4. Spirit AI Companion
    const spiritBtn = screen.getByRole("button", { name: /spirit ai companion/i });
    fireEvent.click(spiritBtn);
    expect(screen.getByText("Private Offline Gemini Intelligence")).toBeInTheDocument();
    expect(screen.getByText("✓ On-Device Gemini AI")).toBeInTheDocument();
    const spiritImg = screen.getByRole("img", { name: "Private Offline Gemini Intelligence" });
    expect(spiritImg).toHaveAttribute("src", "/assets/macbook-spirit-mockup.jpg");

    // 5. Back to Dashboard
    const dashBtn = screen.getByRole("button", { name: /main dashboard/i });
    fireEvent.click(dashBtn);
    expect(screen.getByText("Obsidian Command Center on MacBook Pro")).toBeInTheDocument();
  });
});
