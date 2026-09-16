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
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
        active ? "bg-olive-soft text-olive-deep" : "bg-salmon-soft text-[#9b4f42]"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${active ? "bg-olive" : "bg-salmon-strong"}`}
        aria-hidden
      />
      <span>Status: {label}</span>
    </div>
  );
}
