/**
 * Beacon × Lemon Squeezy — Order Webhook Handler
 * Supabase Edge Function (Deno runtime)
 *
 * Fires on: order_created event from Lemon Squeezy
 * Action: stores license key + customer in `licenses` table
 *
 * Deploy: npx supabase functions deploy ls-webhook --no-verify-jwt
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.177.0/crypto/mod.ts";
import { encode as hexEncode } from "https://deno.land/std@0.177.0/encoding/hex.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LS_WEBHOOK_SECRET = Deno.env.get("LS_WEBHOOK_SECRET")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Verify Lemon Squeezy webhook signature.
 * LS signs every webhook with HMAC-SHA256 using your webhook secret.
 */
async function verifySignature(payload: string, signature: string): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(LS_WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  const hexMac = new TextDecoder().decode(hexEncode(new Uint8Array(mac)));
  return hexMac === signature;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  // Always verify — reject unauthenticated requests
  const valid = await verifySignature(rawBody, signature);
  if (!valid) {
    console.error("[ls-webhook] Invalid signature — rejected");
    return new Response("Unauthorized", { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventName: string = event?.meta?.event_name;

  // Only handle order_created
  if (eventName !== "order_created") {
    return new Response("Ignored", { status: 200 });
  }

  const order = event.data;
  const attrs = order?.attributes ?? {};
  const firstLicense = attrs?.license_keys?.[0];

  if (!firstLicense) {
    console.error("[ls-webhook] No license key in order — check LS product settings");
    return new Response("No license key found", { status: 422 });
  }

  const record = {
    license_key:    firstLicense.key,
    order_id:       String(order.id),
    customer_email: attrs.user_email ?? "",
    customer_name:  attrs.user_name  ?? "",
    product_id:     attrs.first_order_item?.product_id ?? 0,
    status:         "active",
  };

  const { error } = await supabase.from("licenses").upsert(record, { onConflict: "order_id" });

  if (error) {
    console.error("[ls-webhook] DB insert failed:", error.message);
    return new Response("DB error", { status: 500 });
  }

  console.log(`[ls-webhook] License stored: ${record.license_key} → ${record.customer_email}`);
  return new Response("OK", { status: 200 });
});
