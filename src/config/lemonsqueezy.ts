/**
 * BEACON × LEMON SQUEEZY (STRIPE) CONFIGURATION
 * ─────────────────────────────────────────────
 * Lemon Squeezy (a Stripe company) handles both:
 *   1. Global Payments (Apple Pay, Credit/Debit cards, local currencies, VAT/taxes)
 *   2. License Key Generation & Device Activation API
 *
 * Quick Setup Guide:
 *   1. Go to https://app.lemonsqueezy.com → Products → New Product
 *   2. Name: "Beacon Pioneer Lifetime License", Price: $18 USD (One-time)
 *   3. Under "Files & License Keys":
 *      - Enable "Generate License Keys"
 *      - Set Activation limit to: 3 (allows users to run Beacon on 3 personal Macs)
 *   4. Click "Share" on the product → Copy the Checkout Link
 *   5. Paste the URL or Variant ID below.
 */

export const LS_CONFIG = {
  /** Your Lemon Squeezy store slug (subdomain). e.g. "tarunya" */
  storeSlug: "tarunya",

  /**
   * The checkout URL for the Pioneer Lifetime License product.
   * Format: https://{storeSlug}.lemonsqueezy.com/checkout/buy/{variantId}
   * Find it in: LS Dashboard → Products → Your Product → Share → Copy Link
   */
  checkoutUrl: "https://tarunya.lemonsqueezy.com/checkout/buy/REPLACE_WITH_VARIANT_ID",

  /**
   * Your Lemon Squeezy Product ID (number).
   * Find it in: LS Dashboard → Products → click product → URL bar shows /products/{id}
   */
  productId: 0,

  /**
   * Official Lemon Squeezy License API base URL.
   * Used by the Beacon macOS desktop app to activate and validate keys.
   */
  licenseApiUrl: "https://api.lemonsqueezy.com/v1/licenses",
};

/**
 * Check if the live checkout URL has been configured by the owner.
 */
export function isCheckoutConfigured(): boolean {
  return (
    Boolean(LS_CONFIG.checkoutUrl) &&
    !LS_CONFIG.checkoutUrl.includes("REPLACE_WITH_VARIANT_ID")
  );
}

/**
 * Build a Lemon Squeezy overlay checkout URL.
 * - Appends embed=1 to trigger the modal overlay (keeps user on beacon.tarunya.me)
 * - Optionally appends discount=CODE to apply coupon codes automatically
 */
export function buildCheckoutUrl(discountCode?: string): string {
  try {
    const url = new URL(LS_CONFIG.checkoutUrl);
    url.searchParams.set("embed", "1");
    url.searchParams.set("media", "0");
    url.searchParams.set("logo", "1");
    if (discountCode && discountCode.trim()) {
      url.searchParams.set("discount", discountCode.trim().toUpperCase());
    }
    return url.toString();
  } catch {
    return LS_CONFIG.checkoutUrl;
  }
}
