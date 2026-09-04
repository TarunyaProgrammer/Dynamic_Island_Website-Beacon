//
//  BeaconLicenseClient.swift
//  Beacon for macOS
//  ──────────────────────────────────────────────────────────
//  Native Swift client for Lemon Squeezy (Stripe) License API
//  Handles hardware activation, Keychain storage, and offline tolerance.
//

import Foundation
import Security

public struct LicenseActivationResponse: Codable {
    public let activated: Bool?
    public let valid: Bool?
    public let error: String?
    public let instance: LicenseInstance?
    public let meta: LicenseMeta?
}

public struct LicenseInstance: Codable {
    public let id: String
    public let name: String?
}

public struct LicenseMeta: Codable {
    public let customerName: String?
    public let customerEmail: String?

    enum CodingKeys: String, CodingKey {
        case customerName = "customer_name"
        case customerEmail = "customer_email"
    }
}

public final class BeaconLicenseClient {
    public static let shared = BeaconLicenseClient()
    private let apiBase = "https://api.lemonsqueezy.com/v1/licenses"

    private init() {}

    /// Activate a newly entered license key on this Mac
    public func activate(key: String) async -> Result<String, Error> {
        let deviceName = Host.current().localizedName ?? "MacBook"
        guard let url = URL(string: "\(apiBase)/activate") else {
            return .failure(NSError(domain: "Beacon", code: 400, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"]))
        }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        let postData = "license_key=\(key.trimmingCharacters(in: .whitespacesAndNewlines))&instance_name=\(deviceName)"
        request.httpBody = postData.data(using: .utf8)

        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
                return .failure(NSError(domain: "Beacon", code: 401, userInfo: [NSLocalizedDescriptionKey: "Activation rejected. Check your license key."]))
            }

            let result = try JSONDecoder().decode(LicenseActivationResponse.self, from: data)
            if result.activated == true, let instanceId = result.instance?.id {
                // Save instance ID and license key securely to macOS Keychain or UserDefaults
                UserDefaults.standard.set(key, forKey: "beacon_license_key")
                UserDefaults.standard.set(instanceId, forKey: "beacon_instance_id")
                UserDefaults.standard.set(true, forKey: "beacon_is_licensed")
                return .success(instanceId)
            } else {
                let msg = result.error ?? "Activation limit reached (3 Macs max)."
                return .failure(NSError(domain: "Beacon", code: 403, userInfo: [NSLocalizedDescriptionKey: msg]))
            }
        } catch {
            return .failure(error)
        }
    }

    /// Check whether Beacon is activated. Allows offline usage if previously activated.
    public func isActivated() -> Bool {
        return UserDefaults.standard.bool(forKey: "beacon_is_licensed")
    }
}
