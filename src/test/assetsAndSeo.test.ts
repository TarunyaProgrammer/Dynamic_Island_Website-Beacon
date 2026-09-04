import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

const ROOT_DIR = path.resolve(__dirname, "../../");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");

describe("Asset & SEO Integrity Guard", () => {
  it("all images referenced in src/ and index.html must exist in public/", () => {
    const srcDir = path.join(ROOT_DIR, "src");
    const codeFiles: string[] = [];

    function findCodeFiles(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          findCodeFiles(fullPath);
        } else if (/\.(tsx|ts|html|css)$/.test(entry.name)) {
          codeFiles.push(fullPath);
        }
      }
    }

    findCodeFiles(srcDir);
    codeFiles.push(path.join(ROOT_DIR, "index.html"));

    const assetRegex = /["'`]((\/(assets\/|logo\.png|favicon|apple-touch|og-image)[^"'`\s>]+))["'`]/g;
    const foundPaths = new Set<string>();

    for (const file of codeFiles) {
      const content = fs.readFileSync(file, "utf-8");
      let match;
      while ((match = assetRegex.exec(content)) !== null) {
        let cleanPath = match[1];
        // Strip query params or hash if any
        cleanPath = cleanPath.split("?")[0].split("#")[0];
        foundPaths.add(cleanPath);
      }
    }

    expect(foundPaths.size).toBeGreaterThan(0);

    for (const relPath of foundPaths) {
      // Remove leading slash
      const localRel = relPath.startsWith("/") ? relPath.slice(1) : relPath;
      const fullDiskPath = path.join(PUBLIC_DIR, localRel);
      const exists = fs.existsSync(fullDiskPath);
      expect(exists, `Referenced asset does not exist on disk: ${relPath} (expected at ${fullDiskPath})`).toBe(true);

      if (exists) {
        const stats = fs.statSync(fullDiskPath);
        expect(stats.size, `Asset ${relPath} is 0 bytes`).toBeGreaterThan(0);
      }
    }
  });

  it("essential branding and social assets exist and have valid sizes", () => {
    const essentialAssets = [
      "logo.png",
      "favicon.png",
      "favicon.ico",
      "apple-touch-icon.png",
      "og-image.png",
      "og-image-square.png",
      "site.webmanifest",
      "robots.txt",
      "sitemap.xml",
      "assets/macbook-dashboard-mockup.jpg",
      "assets/macbook-notch-mockup.jpg",
      "assets/macbook-menubar-mockup.jpg",
      "assets/macbook-command-mockup.jpg",
      "assets/macbook-spirit-mockup.jpg"
    ];

    for (const asset of essentialAssets) {
      const p = path.join(PUBLIC_DIR, asset);
      expect(fs.existsSync(p), `Missing required asset: ${asset}`).toBe(true);
      expect(fs.statSync(p).size, `Asset ${asset} is empty`).toBeGreaterThan(0);
    }

    // Specific WhatsApp constraint: og-image-square and og-image should be under 300KB
    const ogImg = path.join(PUBLIC_DIR, "og-image.png");
    const ogSquareImg = path.join(PUBLIC_DIR, "og-image-square.png");
    expect(fs.statSync(ogImg).size, "og-image.png must be under 300KB for WhatsApp").toBeLessThan(300 * 1024);
    expect(fs.statSync(ogSquareImg).size, "og-image-square.png must be under 300KB for WhatsApp").toBeLessThan(300 * 1024);
  });

  it("site.webmanifest is valid JSON with valid icons", () => {
    const manifestPath = path.join(PUBLIC_DIR, "site.webmanifest");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const content = fs.readFileSync(manifestPath, "utf-8");
    const json = JSON.parse(content);

    expect(json.name).toBeTruthy();
    expect(json.short_name).toBe("Beacon");
    expect(json.start_url).toBe("/");
    expect(json.theme_color).toBe("#07080B");
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons.length).toBeGreaterThanOrEqual(1);

    for (const icon of json.icons) {
      const iconPath = path.join(PUBLIC_DIR, icon.src.startsWith("/") ? icon.src.slice(1) : icon.src);
      expect(fs.existsSync(iconPath), `Manifest icon ${icon.src} does not exist`).toBe(true);
    }
  });

  it("sitemap.xml and robots.txt point to beacon.tarunya.me", () => {
    const sitemapPath = path.join(PUBLIC_DIR, "sitemap.xml");
    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    expect(sitemapContent).toContain("https://beacon.tarunya.me/");

    const robotsPath = path.join(PUBLIC_DIR, "robots.txt");
    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    expect(robotsContent).toContain("https://beacon.tarunya.me/sitemap.xml");
  });

  it("index.html contains valid SEO metadata, OpenGraph tags, and Schema.org JSON-LD", () => {
    const htmlPath = path.join(ROOT_DIR, "index.html");
    const html = fs.readFileSync(htmlPath, "utf-8");

    // Title, canonical URL and description
    expect(html).toMatch(/<title>Beacon.*<\/title>/);
    expect(html).toContain('content="https://beacon.tarunya.me/"');
    expect(html).toContain('href="https://beacon.tarunya.me/"');

    // OpenGraph namespace and core tags
    expect(html).toContain('prefix="og: https://ogp.me/ns#"');
    expect(html).toContain('property="og:image" content="https://beacon.tarunya.me/og-image.png"');
    expect(html).toContain('property="og:image:secure_url" content="https://beacon.tarunya.me/og-image.png"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('property="og:locale" content="en_US"');

    // WhatsApp / iMessage fallback tags
    expect(html).toContain('rel="image_src" href="https://beacon.tarunya.me/og-image.png"');
    expect(html).toContain('property="og:image" content="https://beacon.tarunya.me/og-image-square.png"');

    // Twitter / X card tags
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('name="twitter:site" content="@tarunyakesh"');
    expect(html).toContain('name="twitter:creator" content="@tarunyakesh"');
    expect(html).toContain('name="twitter:image" content="https://beacon.tarunya.me/og-image.png"');
    expect(html).toContain('name="twitter:image:alt"');

    // Parse JSON-LD script blocks
    const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let match;
    let parsedCount = 0;
    while ((match = jsonLdRegex.exec(html)) !== null) {
      const rawJson = match[1].trim();
      expect(() => JSON.parse(rawJson), "index.html JSON-LD is invalid JSON").not.toThrow();
      const parsed = JSON.parse(rawJson);
      expect(parsed["@context"]).toBe("https://schema.org");
      parsedCount++;
    }
    expect(parsedCount).toBeGreaterThanOrEqual(1);
  });
});
