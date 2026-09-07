/**
 * Beacon Pioneer Waitlist Intake Service
 * Dispatches to Google Sheets Webhook with offline localStorage fallback and CSV export.
 */

export interface WaitlistSubmission {
  email: string;
  macModel: string;
  batch?: string;
  source?: string;
  timestamp?: string;
  queuePosition?: number;
}

const GOOGLE_SCRIPT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbz0St01Dq2o2tjv-NQcP4I0MN8NKJmcOiWxuTZM4w-QnoSzfRnq-JlzbQ2ny1oyvcxH/exec";

const STORAGE_KEY = "beacon_waitlist_subscribers";
const BASE_CLAIMED_COUNT = 387; // Batch 01 allocation social proof baseline

export const getStoredSubscribers = (): WaitlistSubmission[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getLiveClaimedCount = (): number => {
  const localList = getStoredSubscribers();
  return BASE_CLAIMED_COUNT + localList.length;
};

export const submitToWaitlist = async (
  email: string,
  macModel: string
): Promise<{ success: boolean; queuePosition: number; message?: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  const queuePosition = getLiveClaimedCount() + 1;
  const timestamp = new Date().toISOString();

  const submission: WaitlistSubmission = {
    email: cleanEmail,
    macModel,
    batch: "Batch 01 (Pioneer)",
    source: window.location.href,
    timestamp,
    queuePosition,
  };

  // 1. Save locally immediately to guarantee zero lost leads
  try {
    const current = getStoredSubscribers();
    const exists = current.find((item) => item.email === cleanEmail);
    if (!exists) {
      current.push(submission);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch (err) {
    console.warn("[Waitlist] Local storage failed:", err);
  }

  // 2. Dispatch to the public Google Apps Script webhook and verify its response.
  try {
    const response = await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned HTTP ${response.status}`);
    }

    const result = (await response.json()) as {
      result?: string;
      success?: boolean;
      queuePosition?: number;
      message?: string;
    };

    if (result.result !== "success" && result.success !== true) {
      throw new Error(result.message || "Webhook did not confirm the submission");
    }

    return {
      success: true,
      queuePosition: result.queuePosition ?? queuePosition,
    };
  } catch (netErr) {
    console.warn("[Waitlist] Google Sheets dispatch failed; saved to local backup:", netErr);
    return {
      success: false,
      queuePosition,
      message: "We saved a local backup, but couldn’t confirm delivery to the waitlist. Please try again.",
    };
  }
};

export const exportWaitlistCSV = () => {
  const subs = getStoredSubscribers();
  if (subs.length === 0) {
    alert("No local waitlist submissions found yet on this browser.");
    return;
  }

  const headers = ["Timestamp", "Email", "Mac Model", "Batch", "Queue Position", "Source"];
  const rows = subs.map((s) => [
    `"${s.timestamp || ""}"`,
    `"${s.email}"`,
    `"${s.macModel}"`,
    `"${s.batch || ""}"`,
    `"${s.queuePosition || ""}"`,
    `"${s.source || ""}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `beacon-waitlist-${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
