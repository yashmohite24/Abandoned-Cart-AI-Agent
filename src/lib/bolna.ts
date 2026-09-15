import { getBolnaApiKey } from "./env";

const BOLNA_BASE = "https://api.bolna.ai";

export type BolnaUser = {
  wallet?: number;
  name?: string;
  email?: string;
};

export type MakeCallResponse = {
  message?: string;
  status?: string;
  execution_id?: string;
};

export type BolnaErrorBody = {
  message?: string;
  error?: number;
};

let walletCache: { wallet: number; fetchedAt: number } | null = null;
const WALLET_CACHE_MS = 60_000;

export async function fetchBolnaUser(): Promise<BolnaUser> {
  const res = await fetch(`${BOLNA_BASE}/user/me`, {
    headers: {
      Authorization: `Bearer ${getBolnaApiKey()}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as BolnaErrorBody;
    throw new Error(body.message ?? `Bolna user lookup failed (${res.status})`);
  }

  return (await res.json()) as BolnaUser;
}

export async function getWalletBalanceCached(): Promise<number> {
  const now = Date.now();
  if (walletCache && now - walletCache.fetchedAt < WALLET_CACHE_MS) {
    return walletCache.wallet;
  }

  const user = await fetchBolnaUser();
  const wallet = typeof user.wallet === "number" ? user.wallet : 0;
  walletCache = { wallet, fetchedAt: now };
  return wallet;
}

export function invalidateWalletCache(): void {
  walletCache = null;
}

export function isWalletExhausted(wallet: number): boolean {
  return wallet <= 0;
}

export async function makeOutboundCall(payload: {
  agentId: string;
  recipientPhone: string;
  fromPhone?: string;
  userData?: Record<string, string>;
}): Promise<{ ok: true; data: MakeCallResponse } | { ok: false; status: number; message: string; data?: unknown }> {
  const body: Record<string, unknown> = {
    agent_id: payload.agentId,
    recipient_phone_number: payload.recipientPhone,
    user_data: payload.userData ?? { customer_name: "Rahul" },
  };

  if (payload.fromPhone) {
    body.from_phone_number = payload.fromPhone;
  }

  const res = await fetch(`${BOLNA_BASE}/call`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getBolnaApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      (data as BolnaErrorBody).message ??
      (typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : `Call request failed (${res.status})`);

    const lower = message.toLowerCase();
    if (lower.includes("balance") || lower.includes("wallet") || lower.includes("credit")) {
      invalidateWalletCache();
    }

    return { ok: false, status: res.status, message, data };
  }

  invalidateWalletCache();
  return { ok: true, data: data as MakeCallResponse };
}

export function isBalanceExhaustedMessage(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("balance") ||
    lower.includes("wallet") ||
    lower.includes("credit") ||
    lower.includes("balance-low")
  );
}
