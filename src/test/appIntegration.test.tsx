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
});
