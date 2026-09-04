import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { App } from "../App";

describe("Navigation Anchor Integrity", () => {
  it("ensures every hash anchor link in the page resolves to a real DOM element ID", () => {
    const { container } = render(<App />);

    const anchorElements = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    expect(anchorElements.length).toBeGreaterThan(0);

    for (const a of anchorElements) {
      const href = a.getAttribute("href");
      if (!href || href === "#") continue; // Skip home / top scroll

      const targetId = href.replace(/^#/, "");
      const targetElement = container.querySelector(`#${targetId}`);

      expect(
        targetElement,
        `Anchor link "${href}" in ${a.textContent?.trim() || "anchor"} must point to an element with id="${targetId}"`
      ).not.toBeNull();
    }
  });
});
