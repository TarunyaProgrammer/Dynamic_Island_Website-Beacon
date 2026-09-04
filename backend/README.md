# Beacon × Lemon Squeezy — Backend Architecture & Licensing

This directory contains the serverless backend architecture that bridges **Lemon Squeezy**, your **Supabase Database**, and the **Beacon macOS App**:

1. **`ls-webhook`**: Receives order webhooks from Lemon Squeezy after every successful purchase, verifies the HMAC-SHA256 signature, and stores the license key, customer details, and order info in Supabase.
2. **`ls-validate`**: Exposes a secure API endpoint called by the Beacon macOS client on startup or initial activation to verify license validity and bind the license to the Mac hardware UUID (supports up to 3 personal devices).

---

## Architecture Flow

```
┌─────────────────┐       1. Purchase ($18)       ┌────────────────────────┐
│ Customer on Web │ ────────────────────────────> │ Lemon Squeezy Checkout │
└─────────────────┘                               └────────────────────────┘
                                                              │
                                            2. order_created  │ (Signed HMAC-SHA256)
                                                              ▼
                                                  ┌────────────────────────┐
                                                  │ Edge Fn: `ls-webhook`  │
                                                  └────────────────────────┘
                                                              │
                                            3. Upsert license │
                                                              ▼
                                                  ┌────────────────────────┐
                                                  │ Supabase: `licenses`   │
                                                  └────────────────────────┘
                                                              ▲
                                            4. Verify key &   │
                                               bind hardware  │
                                                              │
┌───────────────────────┐                                     │
│ Beacon macOS App      │ ────────────────────────────────────┘
│ (Calls `/ls-validate`)│
└───────────────────────┘
```

---

## 1. Supabase Database Schema

Open the **SQL Editor** in your [Supabase Dashboard](https://supabase.com) and run:

```sql
create table licenses (
  id              bigserial primary key,
  license_key     text        not null unique,
  order_id        text        not null unique,
  customer_email  text        not null,
  customer_name   text,
  product_id      int,
  status          text        not null default 'active',  -- active | revoked | expired
  device_id       text,                                    -- comma-separated hardware UUIDs
  activated_at    timestamptz,
  created_at      timestamptz not null default now()
);

-- Fast indexed lookup by key (queried on app activation)
create index idx_licenses_key on licenses(license_key);
create index idx_licenses_email on licenses(customer_email);
```

---

## 2. Environment Variables & Secrets

In your Supabase project dashboard (or via Supabase CLI):

```bash
# Set secrets for the Edge Functions
npx supabase secrets set LS_WEBHOOK_SECRET="your_webhook_signing_secret_here"
```

> Note: `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are automatically injected into Edge Functions by the Supabase runtime.

---

## 3. Deployment Commands

Deploy both edge functions:

```bash
# 1. Deploy the Lemon Squeezy Webhook Receiver
npx supabase functions deploy ls-webhook --no-verify-jwt

# 2. Deploy the macOS App License Validation Endpoint
npx supabase functions deploy ls-validate --no-verify-jwt
```

---

## 4. Lemon Squeezy Webhook Configuration

1. Log into [Lemon Squeezy Dashboard](https://app.lemonsqueezy.com)
2. Go to **Settings** → **Webhooks** → **Add Webhook**
3. **URL**: `https://<YOUR_PROJECT_ID>.supabase.co/functions/v1/ls-webhook`
4. **Events**: Check `order_created` (and optionally `order_refunded`)
5. **Signing Secret**: Generate a secure secret string, save it, and run `npx supabase secrets set LS_WEBHOOK_SECRET="..."`

---

## 5. Testing the Endpoints

### Test License Validation (`ls-validate`):

```bash
curl -X POST "https://<YOUR_PROJECT_ID>.supabase.co/functions/v1/ls-validate" \
  -H "Content-Type: application/json" \
  -d '{
    "licenseKey": "BCN-TEST-1234-5678",
    "deviceId": "MAC-HW-UUID-TEST-001",
    "deviceName": "MacBook Pro"
  }'
```

**Expected Success Response (HTTP 200)**:
```json
{
  "valid": true,
  "licenseKey": "BCN-TEST-1234-5678",
  "customerEmail": "user@example.com",
  "customerName": "Jane Doe",
  "plan": "Pioneer Lifetime",
  "activeDevices": 1,
  "maxDevices": 3,
  "activatedAt": "2026-09-04T12:00:00.000Z"
}
```

---

## 6. Calling from Beacon macOS App (Swift / Electron)

In your macOS app, store the returned activation status securely in macOS Keychain or an encrypted local preference:

```swift
// Swift Example
func activateLicense(key: String, deviceId: String) async throws -> Bool {
    let url = URL(string: "https://<YOUR_PROJECT_ID>.supabase.co/functions/v1/ls-validate")!
    var request = URLRequest(url: url)
    request.httpMethod = "POST"
    request.setValue("application/json", forHTTPHeaderField: "Content-Type")
    
    let body: [String: String] = [
        "licenseKey": key,
        "deviceId": deviceId
    ]
    request.httpBody = try JSONSerialization.data(withJSONObject: body)
    
    let (data, response) = try await URLSession.shared.data(for: request)
    guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
        return false
    }
    
    // Save to Keychain: user is verified forever
    KeychainHelper.save(key: "beacon_license_active", value: "true")
    return true
}
```
