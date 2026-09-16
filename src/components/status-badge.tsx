"use client";

import { useCallback, useEffect, useState } from "react";

type StatusResponse = {
  active: boolean;
  message: string;
};

export function StatusBadge({
  onStatusChange,
}: {
  onStatusChange?: (active: boolean) => void;
}) {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/status");
      const data = (await res.json()) as StatusResponse;
      setStatus(data);
      onStatusChange?.(data.active);
    } catch {
      setStatus({ active: false, message: "Limit exhausted" });
      onStatusChange?.(false);
    } finally {
      setLoading(false);
    }
  }, [onStatusChange]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 60_000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const active = status?.active ?? false;
  const label = loading ? "Checking…" : status?.message ?? "Limit exhausted";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium sm:text-sm ${
        active
          ? "border-beige-deep bg-surface/90 text-ink-muted"
          : "border-salmon/40 bg-salmon-soft/50 text-[#9b4f42]"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 shrink-0 rounded-full shadow-sm ${
          active ? "bg-[#22c55e] ring-2 ring-[#22c55e]/30" : "bg-salmon-strong"
        }`}
        aria-hidden
      />
      <span className="text-ink-muted">
        Status: <span className={active ? "text-ink" : ""}>{label}</span>
      </span>
    </div>
  );
}
