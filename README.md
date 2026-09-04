<div align="center">

  <img src="./public/logo.png" alt="Beacon Logo" width="108" style="border-radius: 24px; box-shadow: 0 12px 36px rgba(255, 122, 0, 0.35);" />

  # Beacon — Dynamic Island for macOS

  **Your MacBook notch is dead space. Beacon makes it the most useful pixel on your screen.**

  [![macOS 12+](https://img.shields.io/badge/macOS-12%2B-000?logo=apple&logoColor=white)](https://apple.com)
  [![Apple Silicon](https://img.shields.io/badge/Apple%20Silicon-M1--M4%20Native-ff7a00)](https://apple.com)
  [![SQLite WAL](https://img.shields.io/badge/Data-SQLite%20WAL-003B57?logo=sqlite)](https://sqlite.org)
  [![Offline-First](https://img.shields.io/badge/Privacy-100%25%20Offline-10B981)](https://beacon.tarunya.me)
  [![License: Proprietary](https://img.shields.io/badge/License-Proprietary%20%C2%A9%202026-ff7a00)](./LICENSE)
  [![License: Pioneer $18](https://img.shields.io/badge/Buy-Pioneer%20License%20%2418-0F1117)](https://beacon.tarunya.me/#pricing)

  [**Live Website →**](https://beacon.tarunya.me)&nbsp;&nbsp;•&nbsp;&nbsp;[**X (@tarunyakesh) →**](https://x.com/tarunyakesh)&nbsp;&nbsp;•&nbsp;&nbsp;[**GitHub →**](https://github.com/tarunyaprogrammer)

</div>

---

## Why This Exists

Every productivity app on Mac runs inside a browser engine, phones home to a cloud database, and charges you $15/month to count your pushups.

Beacon is the opposite:

| | SaaS Habit Trackers | Beacon |
|---|---|---|
| **Runtime** | Chromium web wrapper | Native Apple Silicon binary |
| **CPU idle** | 8–15% | 0.1% |
| **Data storage** | Their servers | Your SSD (SQLite WAL) |
| **Privacy** | Requires account + cloud sync | Zero network calls. Period. |
| **Cost** | $180/year recurring | $18 once. Forever. |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  macOS Display                                       │
│  ┌──────────────────────────────────────────────────┐│
│  │  ████████ Camera Notch ████████                 ││
│  │  │ Dynamic Island HUD (3-col)  │                ││
│  │  │ Left: Streak  Mid: Timer  Right: Quota │     ││
│  │  └─────────────────────────────────────────┘    ││
│  │                                                  ││
│  │  [Menu Bar Popover]  [Spotlight Command ⌘⇧B]    ││
│  │  [Full Dashboard]    [Spirit AI Companion]       ││
│  └──────────────────────────────────────────────────┘│
│                                                       │
│  Data Layer:  better-sqlite3 (WAL mode)               │
│  IPC:         Electron contextBridge (isolated)       │
│  Renderer:    React 19 + TypeScript                   │
│  AI:          Google Gemini (optional, on-demand)     │
└─────────────────────────────────────────────────────┘
```

### 5 Native macOS Surfaces

1. **Dynamic Island Notch HUD** — Snaps to the camera bezel. Hover to expand. 3-column glanceable layout.
2. **Menu Bar Popover** — System tray quick-access with daily summary.
3. **Spotlight Command Engine** — `⌘⇧B` launches a keyboard-first command palette.
4. **Full Dashboard** — Complete goal overview with deep-work waveforms.
5. **Spirit AI Companion** — Sub-second Gemini inference for natural-language goal queries.

### 6 Goal Paradigms

| Paradigm | Use Case | Example |
|---|---|---|
| **Habit** | Daily/weekly frequency | "Meditate every morning" |
| **Accumulative** | Volume targets with `[+N]` | "500 LeetCode problems" |
| **Deadline** | Ship-date countdowns | "Submit thesis by March 15" |
| **Milestone** | Multi-phase roadmaps | "Launch v1 → Beta → GA" |
| **Duration** | Deep-work hour tracking | "4hrs focused coding daily" |
| **Avoidance** | Clean-day counters | "No social media for 30 days" |

---

## Performance

| Metric | Value |
|---|---|
| Idle CPU | 0.1% (collapses to 0 FPS when hidden) |
| RAM | ~45 MB |
| HUD latency | <16ms (60fps springs, 120Hz ProMotion) |
| Cold start | <800ms to first paint |
| Bundle (website) | <80 kB gzipped |

---

## Tech Stack (Marketing Website)

This repository contains the **marketing + checkout website** deployed at [beacon.tarunya.me](https://beacon.tarunya.me).

| Layer | Technology |
|---|---|
| Framework | Vite 6.2 + React 19 |
| Language | TypeScript (strict) |
| Styling | Vanilla CSS with design tokens |
| Typography | EB Garamond (serif) + Figtree (sans) + JetBrains Mono |
| Payments | Lemon Squeezy Overlay Checkout (Merchant of Record) |
| Backend | Supabase Edge Functions (Deno / TypeScript) |
| Hosting | Vercel / Cloudflare Pages |

### Local Development

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # Production bundle (<800ms)
npm run preview    # Preview production build
```

---

## Lemon Squeezy Store & Product Setup

### 1. Store & Account Details
- **Business Name**: `Tarunya Kesharwani` (or `Tarunya Labs`). Plain personal/indie founder names are ideal and fast-tracked for approval.
- **Store Website**: `https://beacon.tarunya.me` — Subdomains are **100% accepted and supported** by Lemon Squeezy.
- **Product Name**: `Beacon Pioneer Lifetime License`
- **Price**: `$18 USD` (One-time payment)
- **License Keys**: Enable **Generate License Keys** in Product Settings (format: Single-use activation with 3 devices limit).

### 2. Website Checkout Configuration

Edit [`src/config/lemonsqueezy.ts`](file:///Users/tarunyakesh/Desktop/Beacon%20-%20WebBranding/src/config/lemonsqueezy.ts):

```ts
export const LS_CONFIG = {
  storeSlug: "tarunya", // Your Lemon Squeezy store slug
  checkoutUrl: "https://tarunya.lemonsqueezy.com/checkout/buy/YOUR_VARIANT_ID",
  productId: 123456,
  webhookSecret: "your_webhook_signing_secret",
};
```

### 3. Discount Codes & Coupons
Lemon Squeezy has built-in coupon support:
1. Go to **LS Dashboard** → **Discounts** → **Add Discount**.
2. Set your coupon code (e.g., `FRIEND20` for 20% off, or `LAUNCH5` for $5 off).
3. Specify valid products and maximum redemption count if desired.
4. On the Beacon website, users can enter their code in the checkout modal. The website appends `?discount=CODE` to the checkout URL, and the Lemon Squeezy overlay automatically applies the discount.

---

## App Distribution & Anti-Piracy Licensing Strategy

If you distribute a raw macOS `.dmg` without licensing, anyone who downloads it can share it with others. Beacon solves this without annoying online-only DRM:

1. **Purchased on Web**: Buyer pays $18 via Lemon Squeezy. Lemon Squeezy generates a unique cryptographic license key (`BCN-XXXX-XXXX-XXXX`) and emails it to the buyer with the DMG download link.
2. **First App Launch**: When the user opens Beacon on their Mac, a clean activation modal asks for their License Key.
3. **Hardware Binding**: The app sends `licenseKey` + Mac hardware UUID to your Supabase function (`/ls-validate`). The backend checks that the key exists, is active, and locks it to that machine (permitting up to 3 personal Macs per license).
4. **Offline Capability**: Once verified, the app writes an encrypted validation token to the macOS Keychain. The user never needs an internet connection again to use Beacon daily.
5. **Detailed Backend Implementation**: See [`backend/README.md`](file:///Users/tarunyakesh/Desktop/Beacon%20-%20WebBranding/backend/README.md) for full Supabase Edge Function code and deployment commands.

### SEO Configuration

| Config | File | Replace |
|---|---|---|
| Google Search Console | `index.html` | `GSC_VERIFICATION_TOKEN_BEACON` |
| Google Analytics 4 | `index.html` | `G-BEACONID` |
| OG Image | `public/og-image.png` | Your 1200×630 social preview |

---

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub, then:
# 1. Import repo in Vercel → select Vite preset
# 2. Add domain: beacon.tarunya.me
# 3. DNS: CNAME beacon → cname.vercel-dns.com
```

### Cloudflare Pages

```bash
# Build command: npm run build
# Output directory: dist
# Custom domain: beacon.tarunya.me
```

---

<div align="center">

**Built by [Tarunya Kesharwani](https://x.com/tarunyakesh)**

[Website](https://beacon.tarunya.me) · [X](https://x.com/tarunyakesh) · [GitHub](https://github.com/tarunyaprogrammer) · [LinkedIn](https://www.linkedin.com/in/tarunyakesharwani/)

</div>
