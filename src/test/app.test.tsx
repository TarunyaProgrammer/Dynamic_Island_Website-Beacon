import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import { App } from "../App";

// Mock @vercel/analytics/react to ensure clean unit testing without external calls
vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

describe("Root App Component", () => {
  it("renders WaitlistPage and includes Vercel Analytics", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("vercel-analytics")).toBeInTheDocument();
  });
});
