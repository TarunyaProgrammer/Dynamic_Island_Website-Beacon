import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { App } from "../App";

describe("App End-to-End Integration", () => {
  it("renders all major landing page sections without crashing", () => {
    const { container } = render(<App />);

    // Check core semantic sections exist
    expect(container.querySelector("#hero")).toBeInTheDocument();
    expect(container.querySelector("#simulator")).toBeInTheDocument();
    expect(container.querySelector("#gallery")).toBeInTheDocument();
    expect(container.querySelector("#features")).toBeInTheDocument();
    expect(container.querySelector("#spirit")).toBeInTheDocument();
    expect(container.querySelector("#specs")).toBeInTheDocument();
    expect(container.querySelector("#anti-slop")).toBeInTheDocument();
    expect(container.querySelector("#manifesto")).toBeInTheDocument();
    expect(container.querySelector("#pricing")).toBeInTheDocument();
    expect(container.querySelector("#founder")).toBeInTheDocument();
    expect(container.querySelector("#faq")).toBeInTheDocument();
    expect(container.querySelector("#footer")).toBeInTheDocument();
  });

  it("opens and closes the Lemon Squeezy checkout modal from the navigation CTA", () => {
    render(<App />);

    // Initially modal is not open
    expect(screen.queryByTitle("Close checkout")).not.toBeInTheDocument();

    // Click navigation CTA
    const navCta = screen.getByRole("button", { name: /get started on macos/i });
    fireEvent.click(navCta);

    // Modal is now open
    expect(screen.getByText("Pioneer Lifetime License")).toBeInTheDocument();
    expect(screen.getByText(/Universal \(M1–M4 & Intel\)/i)).toBeInTheDocument();

    // Click close button
    const closeBtn = screen.getByTitle("Close checkout");
    fireEvent.click(closeBtn);

    // Modal is closed
    expect(screen.queryByTitle("Close checkout")).not.toBeInTheDocument();
  });

  it("opens and closes the Beacon Help Desk & Feedback modal from the floating help corner", () => {
    render(<App />);

    // Initially feedback modal is not open
    expect(screen.queryByRole("dialog", { name: /beacon help desk/i })).not.toBeInTheDocument();

    // Click floating help corner button
    const helpBtn = screen.getByRole("button", { name: /open help & bug reporting desk/i });
    fireEvent.click(helpBtn);

    // Modal is now open
    expect(screen.getByText("Direct Conduit to Architect")).toBeInTheDocument();
    expect(screen.getByText(/tarunya\.programmer@gmail\.com/i)).toBeInTheDocument();

    // Close button works
    const closeBtn = screen.getByLabelText("Close Help Desk");
    fireEvent.click(closeBtn);

    expect(screen.queryByText("Direct Conduit to Architect")).not.toBeInTheDocument();
  });

  it("opens the Help Desk modal from the Footer Bug Reports link", () => {
    render(<App />);

    const footerHelpBtn = screen.getByRole("button", { name: /bug reports & help desk/i });
    fireEvent.click(footerHelpBtn);

    expect(screen.getByText("Direct Conduit to Architect")).toBeInTheDocument();

    // Escape key closes modal
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByText("Direct Conduit to Architect")).not.toBeInTheDocument();
  });

  it("handles footer dispatch form email input and ensures no emojis in footer", () => {
    const { container } = render(<App />);

    const footer = container.querySelector("#footer");
    expect(footer).toBeInTheDocument();

    // Lock icon text has no emoji
    expect(screen.getByText("100% Private")).toBeInTheDocument();
    expect(footer?.textContent).not.toContain("🔒");

    // Form input
    const emailInput = screen.getByPlaceholderText(/your\.email@work\.com/i);
    expect(emailInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "tester@example.com" } });
    expect((emailInput as HTMLInputElement).value).toBe("tester@example.com");
  });
});

