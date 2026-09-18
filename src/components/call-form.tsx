"use client";

import { FormEvent, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY_DIAL } from "@/lib/countries";
import { countryByDial, countryFlag } from "@/lib/country-flags";

type Props = {
  agentActive: boolean;
  variant?: "default" | "hero";
};

function PhoneHandsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5c.5 2.5 1.8 4.8 3.7 6.7s4.2 3.2 6.7 3.7l1.8-1.8c.3-.3.8-.4 1.2-.2 1.3.5 2.7.8 4.1.8.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.1 21.2 2.8 13.9 2.8 4.2 2.8 3.5 3.3 3 4 3h2.5c.7 0 1.2.5 1.2 1.2 0 1.4.3 2.8.8 4.1.1.4 0 .9-.2 1.2l-1.8 1.8Z"
        fill="currentColor"
      />
      <path
        d="M14 3c2 1 3.5 2.5 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M16 3c3 1.5 5 3.5 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function CallForm({ agentActive, variant = "default" }: Props) {
  const [dialCode, setDialCode] = useState(DEFAULT_COUNTRY_DIAL);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const isIndia = dialCode === DEFAULT_COUNTRY_DIAL;
  const isHero = variant === "hero";
  const selectedCountry = countryByDial(dialCode);

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

  const labelClass = isHero
    ? "mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted"
    : "mb-2 block text-sm font-semibold text-ink";

  const fieldClass = isHero
    ? "w-full rounded-full border border-beige-deep/90 bg-white px-4 py-3.5 text-sm text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive-soft/80 disabled:opacity-50"
    : "w-full rounded-xl border border-beige-deep bg-white px-4 py-3 text-ink outline-none transition focus:border-olive focus:ring-2 focus:ring-olive-soft disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className={isHero ? "mt-6 space-y-4" : "space-y-5"}>
      <label className="block">
        <span className={labelClass}>Country</span>
        <div className="relative">
          {isHero && selectedCountry && (
            <span
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base"
              aria-hidden
            >
              {countryFlag(selectedCountry.name)}
            </span>
          )}
          <select
            value={dialCode}
            onChange={(e) => {
              setDialCode(e.target.value);
              setPhone("");
            }}
            disabled={!agentActive || loading}
            className={`${fieldClass} ${isHero ? "appearance-none pl-11 pr-10" : ""}`}
          >
            {COUNTRIES.map((country) => (
              <option key={`${country.name}-${country.dialCode}`} value={country.dialCode}>
                {isHero
                  ? `${country.name} (${country.dialCode})`
                  : `${country.name} (${country.dialCode})`}
              </option>
            ))}
          </select>
          {isHero && (
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted"
              aria-hidden
            >
              ▾
            </span>
          )}
        </div>
      </label>

      <label className="block">
        <span className={labelClass}>Phone number</span>
        {isHero ? (
          <div
            className={`flex overflow-hidden rounded-full border border-beige-deep/90 bg-white focus-within:border-olive focus-within:ring-2 focus-within:ring-olive-soft/80 ${!agentActive || loading ? "opacity-50" : ""}`}
          >
            <span className="flex shrink-0 items-center border-r border-beige-deep/80 px-4 py-3.5 text-sm font-medium text-ink-muted">
              {dialCode}
            </span>
            <input
              inputMode="numeric"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder={
                isIndia ? "Enter your 10-digit mobile number" : "Number without country code"
              }
              disabled={!agentActive || loading}
              className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-ink outline-none placeholder:text-ink-muted/55"
              required
            />
          </div>
        ) : (
          <input
            inputMode="numeric"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder={
              isIndia ? "Enter your 10-digit mobile number" : "Number without country code"
            }
            disabled={!agentActive || loading}
            className={fieldClass}
            required
          />
        )}
      </label>

      {result && (
        <div
          role="status"
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            result.type === "success"
              ? "bg-white/70 text-olive-deep"
              : "bg-salmon-soft text-[#8b3d32]"
          }`}
        >
          {result.text}
        </div>
      )}

      <button
        type="submit"
        disabled={!agentActive || loading}
        className={
          isHero
            ? "flex w-full items-center justify-center gap-2.5 rounded-full bg-olive px-6 py-4 text-base font-semibold text-white shadow-md shadow-olive-deep/25 transition hover:bg-[#7d8f6c] disabled:cursor-not-allowed disabled:opacity-50"
            : "w-full rounded-xl bg-olive-deep px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-olive-deep/20 transition hover:bg-[#4d5a42] disabled:cursor-not-allowed disabled:opacity-50"
        }
      >
        {isHero && <PhoneHandsetIcon className="h-5 w-5 shrink-0" />}
        {loading ? "Requesting call…" : "Receive the call!"}
      </button>
    </form>
  );
}
