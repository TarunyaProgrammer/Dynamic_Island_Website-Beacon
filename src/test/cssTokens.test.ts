import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("CSS Tokens & Brand Palette Integrity", () => {
  it("defines all critical brand variables and tokens in tokens.css", () => {
    const cssPath = path.resolve(__dirname, "../styles/tokens.css");
    expect(fs.existsSync(cssPath), "tokens.css must exist").toBe(true);

    const cssContent = fs.readFileSync(cssPath, "utf-8");

    const requiredTokens = [
      "--bg-canvas",
      "--bg-card",
      "--text-ink",
      "--text-body",
      "--accent-solar",
      "--border-subtle",
      "--font-sans",
      "--font-serif",
      "--font-mono",
      "--radius-pill",
    ];

    for (const token of requiredTokens) {
      expect(
        cssContent.includes(token),
        `tokens.css must declare CSS variable ${token}`
      ).toBe(true);
    }
  });
});
