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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Country</span>
          <select
            value={dialCode}
            onChange={(e) => {
              setDialCode(e.target.value);
              setPhone("");
            }}
            disabled={!agentActive || loading}
            className="w-full rounded-xl border border-beige-deep bg-white px-4 py-3 text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive-soft disabled:opacity-50"
          >
            {COUNTRIES.map((country) => (
              <option key={`${country.name}-${country.dialCode}`} value={country.dialCode}>
                {country.name} ({country.dialCode})
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-ink">Phone number</span>
          <input
            inputMode="numeric"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={isIndia ? "10-digit mobile number" : "Number without country code"}
            disabled={!agentActive || loading}
            className="w-full rounded-xl border border-beige-deep bg-white px-4 py-3 text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-olive focus:ring-2 focus:ring-olive-soft disabled:opacity-50"
            required
          />
        </label>
      </div>

      {result && (
        <div
          role="status"
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            result.type === "success"
              ? "bg-olive-soft text-olive-deep"
              : "bg-salmon-soft text-[#8b3d32]"
          }`}
        >
          {result.text}
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!agentActive || loading}
          className="w-full rounded-xl bg-salmon-strong px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#df8878] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[220px]"
        >
          {loading ? "Requesting call…" : "Receive the call!"}
        </button>
      </div>
    </form>
  );
}
