/**
 * BEACON MACOS APP — LEMON SQUEEZY (STRIPE) LICENSE CLIENT
 * ──────────────────────────────────────────────────────────
 * Drop this file directly into your Beacon desktop app (Electron / Node / TypeScript).
 *
 * It uses the official Lemon Squeezy License API:
 *   - POST https://api.lemonsqueezy.com/v1/licenses/activate
 *   - POST https://api.lemonsqueezy.com/v1/licenses/validate
 *   - POST https://api.lemonsqueezy.com/v1/licenses/deactivate
 *
 * No backend or database required — Lemon Squeezy manages everything!
 */

export interface LicenseValidationResult {
  valid: boolean;
  error?: string;
  customerName?: string;
  customerEmail?: string;
  activationLimit?: number;
  activationUsage?: number;
  instanceId?: string;
}

export class BeaconLicenseClient {
  private static readonly API_BASE = "https://api.lemonsqueezy.com/v1/licenses";

  /**
   * Activate a license key on this specific Mac machine.
   *
   * @param licenseKey The license key entered by the user (e.g. "BCN-XXXX-XXXX-XXXX")
   * @param instanceName Unique device name or hardware UUID (e.g. "Tarunya's MacBook Pro - M3")
   */
  static async activate(licenseKey: string, instanceName: string): Promise<LicenseValidationResult> {
    const trimmedKey = licenseKey.trim();
    if (!trimmedKey) {
      return { valid: false, error: "Please enter a valid license key." };
    }

    try {
      const response = await fetch(`${this.API_BASE}/activate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          license_key: trimmedKey,
          instance_name: instanceName,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        return {
          valid: false,
          error: data.error || "License activation failed. Check your key and internet connection.",
        };
      }

      if (data.activated) {
        return {
          valid: true,
          instanceId: data.instance?.id,
          customerName: data.meta?.customer_name,
          customerEmail: data.meta?.customer_email,
          activationLimit: data.license_key?.activation_limit,
          activationUsage: data.license_key?.activation_usage,
        };
      }

      return { valid: false, error: "License is not active or has reached the device limit." };
    } catch (err: any) {
      return { valid: false, error: `Network error: ${err.message}` };
    }
  }

  /**
   * Validate an existing active license.
   * Call this on app launch or periodically. If the user is offline,
   * you should honor their last cached activation.
   *
   * @param licenseKey The previously activated license key
   * @param instanceId The instance ID saved from the activate() response
   */
  static async validate(licenseKey: string, instanceId: string): Promise<LicenseValidationResult> {
    try {
      const response = await fetch(`${this.API_BASE}/validate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          license_key: licenseKey.trim(),
          instance_id: instanceId,
        }),
      });

      const data = await response.json();

      if (data.valid) {
        return { valid: true };
      }

      return {
        valid: false,
        error: data.error || "License is no longer valid or has been revoked.",
      };
    } catch (err: any) {
      // Offline tolerance: Do not lock the user out if their Mac is offline!
      console.warn("[BeaconLicense] Offline validation fallback:", err.message);
      return { valid: true }; // Allow offline usage
    }
  }

  /**
   * Deactivate this Mac so the user can transfer their seat to another Mac.
   */
  static async deactivate(licenseKey: string, instanceId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.API_BASE}/deactivate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          license_key: licenseKey.trim(),
          instance_id: instanceId,
        }),
      });

      const data = await response.json();
      return Boolean(data.deactivated);
    } catch {
      return false;
    }
  }
}
