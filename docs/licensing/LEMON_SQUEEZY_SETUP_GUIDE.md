# Lemon Squeezy (Stripe) Complete Setup Guide for Beacon

This guide walks you through setting up **payments and licensing** using Lemon Squeezy (acquired by Stripe).

---

## 1. Create Your Store on Lemon Squeezy

1. Go to [https://app.lemonsqueezy.com](https://app.lemonsqueezy.com) and create an account.
2. Under **Store Settings**:
   - **Business Name**: `Tarunya Kesharwani` (or `Tarunya Labs`).
   - **Store URL**: e.g., `tarunya.lemonsqueezy.com`.
   - **Website**: `https://beacon.tarunya.me` (subdomains are 100% accepted).
   - **Currency**: USD ($).

---

## 2. Create the Beacon Product

1. Navigate to **Products** → **+ New Product**.
2. Fill in the details:
   - **Name**: `Beacon Pioneer Lifetime License`
   - **Pricing Model**: **Single payment** (One-time)
   - **Price**: `$18.00 USD`
   - **Tax Category**: Software (SaaS / Downloadable)
3. Under **Files & License Keys**:
   - **Generate license keys**: Turn this toggle **ON** ✅
   - **Activation limit**: Set to `3` (allows buyers to activate on up to 3 personal Macs).
   - **File download**: Attach your `Beacon-mac-universal.dmg` installer so buyers can download it immediately upon payment.
4. Click **Publish Product**.

---

## 3. Connect to the Website

1. On your product page, click **Share** → **Copy Checkout Link**.
   - Example: `https://tarunya.lemonsqueezy.com/checkout/buy/123456`
2. Open [`src/config/lemonsqueezy.ts`](file:///Users/tarunyakesh/Desktop/Beacon%20-%20WebBranding/src/config/lemonsqueezy.ts) and update:
   ```ts
   export const LS_CONFIG = {
     storeSlug: "tarunya",
     checkoutUrl: "https://tarunya.lemonsqueezy.com/checkout/buy/YOUR_VARIANT_ID",
     productId: 123456,
     licenseApiUrl: "https://api.lemonsqueezy.com/v1/licenses",
   };
   ```
3. That's it! When users click **Claim Pioneer Lifetime License — $18** on `beacon.tarunya.me`, the official Lemon Squeezy overlay opens smoothly without leaving your website.

---

## 4. Setting up Discount Codes / Coupons

1. Go to **Discounts** in the Lemon Squeezy Dashboard → **+ Add Discount**.
2. **Code**: e.g. `LAUNCH20` or `FRIEND50`
3. **Amount / Percentage**: e.g. 20% off
4. **Applies to**: Select `Beacon Pioneer Lifetime License`
5. On the website, users can type their coupon in the checkout modal. The website appends `?discount=CODE` to the checkout URL and applies it automatically!

---

## 5. Integrating Licensing into the Beacon macOS App

We have provided ready-to-use licensing clients for both Electron and Swift:

### Option A: Electron / TypeScript App
Copy [`src/licensing/BeaconLicenseClient.ts`](file:///Users/tarunyakesh/Desktop/Beacon%20-%20WebBranding/src/licensing/BeaconLicenseClient.ts) into your desktop app.

When the user enters their license key:
```ts
import { BeaconLicenseClient } from "./BeaconLicenseClient";

const result = await BeaconLicenseClient.activate(
  userEnteredKey,
  "Tarunya's MacBook Pro"
);

if (result.valid) {
  // Save result.instanceId in local storage
  // Beacon is now unlocked forever!
} else {
  alert(result.error);
}
```

### Option B: Native Swift App
Copy [`docs/licensing/BeaconLicenseClient.swift`](file:///Users/tarunyakesh/Desktop/Beacon%20-%20WebBranding/docs/licensing/BeaconLicenseClient.swift) into your Xcode project.

```swift
let result = await BeaconLicenseClient.shared.activate(key: userEnteredKey)
switch result {
case .success(let instanceId):
    print("Beacon unlocked on instance: \(instanceId)")
case .failure(let error):
    print("Activation failed: \(error.localizedDescription)")
}
```

---

## 6. How Test Mode Works

Lemon Squeezy has a **Test Mode** toggle in the top-left corner of the dashboard:
- When Test Mode is ON, checkouts use test cards (`4242 4242 4242 4242`).
- Test orders generate real test license keys.
- You can activate test license keys using the API to verify everything works before flipping the switch to live payments!
