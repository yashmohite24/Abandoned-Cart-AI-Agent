"use client";

import { FormEvent, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY_DIAL } from "@/lib/countries";

type Props = {
  agentActive: boolean;
};

export function CallForm({ agentActive }: Props) {
  const [dialCode, setDialCode] = useState(DEFAULT_COUNTRY_DIAL);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isIndia = dialCode === DEFAULT_COUNTRY_DIAL;

  function handlePhoneChange(value: string) {
    const digits = value.replace(/\D/g, "");
    setPhone(isIndia ? digits.slice(0, 10) : digits.slice(0, 14));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!agentActive) {
      setResult({ type: "error", text: "Limit exhausted" });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dialCode, phone }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };

      if (res.ok && data.ok) {
        setResult({ type: "success", text: data.message });
        setPhone("");
      } else {
        setResult({ type: "error", text: data.message ?? "Something went wrong." });
      }
    } catch {
      setResult({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1a1a1a]/60">
            Country
          </span>
          <select
            value={dialCode}
            onChange={(e) => {
              setDialCode(e.target.value);
              setPhone("");
            }}
            disabled={!agentActive || loading}
            className="mt-1 w-full border-b border-[#1a1a1a]/25 bg-transparent py-2 outline-none focus:border-[#e85d2a] disabled:opacity-50"
          >
            {COUNTRIES.map((country) => (
              <option key={`${country.name}-${country.dialCode}`} value={country.dialCode}>
                {country.name} ({country.dialCode})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#1a1a1a]/60">
            Phone number
          </span>
          <input
            inputMode="numeric"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={isIndia ? "10-digit mobile" : "Without country code"}
            disabled={!agentActive || loading}
            className="mt-1 w-full border-b border-[#1a1a1a]/25 bg-transparent py-2 outline-none focus:border-[#e85d2a] disabled:opacity-50"
            required
          />
        </label>
      </div>

      {result && (
        <p
          className={`font-mono text-sm ${result.type === "success" ? "text-emerald-700" : "text-[#c0392b]"}`}
          role="status"
        >
          {result.text}
        </p>
      )}

      <button
        type="submit"
        disabled={!agentActive || loading}
        className="bg-[#e85d2a] px-8 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[#0d0d0d] transition hover:bg-[#f06f3f] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Requesting call…" : "Receive the call!"}
      </button>
    </form>
  );
}
