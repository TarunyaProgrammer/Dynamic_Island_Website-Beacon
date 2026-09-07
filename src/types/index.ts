export type NotchTab = "beacon" | "focus" | "media";

export interface PricingPlan {
  id: "lifetime" | "annual" | "team";
  name: string;
  tagline: string;
  priceUSD: number;
  priceINR: number;
  billingPeriod: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
}


export interface LicenseReceipt {
  licenseKey: string;
  planName: string;
  customerEmail: string;
  customerName: string;
  amountPaid: string;
  paymentId: string;
  purchaseDate: string;
}
