/**
 * Beacon × Lemon Squeezy — License Validation & Machine Activation Endpoint
 * Supabase Edge Function (Deno runtime)
 *
 * Route: POST /ls-validate
 * Headers: Content-Type: application/json
 * Body:
 *   {
 *     "licenseKey": "BCN-XXXX-XXXX-XXXX",
 *     "deviceId": "macOS-Hardware-UUID",
 *     "deviceName": "MacBook Pro (optional)"
 *   }
 *
 * Action:
 *   1. Verifies license key exists in `licenses` table.
 *   2. Verifies license is active (not refunded/revoked).
 *   3. Enforces device limit (default: 3 personal Macs).
 *   4. Returns validation status to macOS client.
 *
 * Deploy:
 *   npx supabase functions deploy ls-validate --no-verify-jwt
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const MAX_ACTIVATIONS_PER_LICENSE = 3;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ValidateRequest {
  licenseKey: string;
  deviceId: string;
  deviceName?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ valid: false, error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: ValidateRequest = await req.json();
    const { licenseKey, deviceId, deviceName } = body;

    if (!licenseKey || !deviceId) {
      return new Response(
        JSON.stringify({ valid: false, error: "licenseKey and deviceId are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const normalizedKey = licenseKey.trim().toUpperCase();

    // 1. Query the license record
    const { data: license, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("license_key", normalizedKey)
      .maybeSingle();

    if (error) {
      console.error("[ls-validate] DB lookup error:", error.message);
      return new Response(
        JSON.stringify({ valid: false, error: "Internal database error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 2. Not found
    if (!license) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid license key. Please check your purchase receipt." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 3. Status check
    if (license.status !== "active") {
      return new Response(
        JSON.stringify({
          valid: false,
          error: `License is ${license.status}. Please contact support if you believe this is an error.`,
        }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 4. Device Activation Check
    // Devices are stored as a JSON array of device IDs or comma-separated string
    const existingDevices: string[] = license.device_id
      ? license.device_id.split(",").map((d: string) => d.trim()).filter(Boolean)
      : [];

    const isAlreadyActivatedOnDevice = existingDevices.includes(deviceId);

    if (!isAlreadyActivatedOnDevice) {
      if (existingDevices.length >= MAX_ACTIVATIONS_PER_LICENSE) {
        return new Response(
          JSON.stringify({
            valid: false,
            error: `Activation limit reached (${MAX_ACTIVATIONS_PER_LICENSE} Macs). Deactivate an old device to activate this Mac.`,
          }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      // Add this new device
      const updatedDevices = [...existingDevices, deviceId].join(",");
      const { error: updateError } = await supabase
        .from("licenses")
        .update({
          device_id: updatedDevices,
          activated_at: new Date().toISOString(),
        })
        .eq("license_key", normalizedKey);

      if (updateError) {
        console.error("[ls-validate] Update error:", updateError.message);
        return new Response(
          JSON.stringify({ valid: false, error: "Failed to record activation" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }

    // 5. Success
    return new Response(
      JSON.stringify({
        valid: true,
        licenseKey: normalizedKey,
        customerEmail: license.customer_email,
        customerName: license.customer_name,
        plan: "Pioneer Lifetime",
        activeDevices: isAlreadyActivatedOnDevice ? existingDevices.length : existingDevices.length + 1,
        maxDevices: MAX_ACTIVATIONS_PER_LICENSE,
        activatedAt: license.activated_at || new Date().toISOString(),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err: any) {
    console.error("[ls-validate] Unexpected error:", err);
    return new Response(
      JSON.stringify({ valid: false, error: "Invalid request payload" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
