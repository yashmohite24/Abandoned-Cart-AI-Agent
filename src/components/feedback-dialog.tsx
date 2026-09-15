"use client";

import { FormEvent, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FeedbackDialog({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  if (!open) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };

      if (!res.ok || !data.ok) {
        setFeedback({ type: "error", text: data.message ?? "Could not submit feedback." });
        return;
      }

      setFeedback({ type: "success", text: data.message });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setFeedback({ type: "error", text: "Could not submit feedback. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="w-full max-w-md border border-[#f5f0e6]/15 bg-[#121212] p-6 text-[#f5f0e6] shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f0e6]/50">
              Form · Feedback
            </p>
            <h2 id="feedback-title" className="mt-1 font-serif text-2xl lowercase">
              give your feedback
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider text-[#f5f0e6]/60 hover:text-[#f5f0e6]"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f5f0e6]/60">
              Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border-b border-[#f5f0e6]/25 bg-transparent py-2 outline-none focus:border-[#e85d2a]"
              required
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f5f0e6]/60">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border-b border-[#f5f0e6]/25 bg-transparent py-2 outline-none focus:border-[#e85d2a]"
              required
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f5f0e6]/60">
              Feedback
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 w-full resize-none border border-[#f5f0e6]/20 bg-[#0d0d0d] p-3 outline-none focus:border-[#e85d2a]"
              required
            />
          </label>

          {feedback && (
            <p
              className={`font-mono text-xs ${feedback.type === "success" ? "text-emerald-400" : "text-[#e85d2a]"}`}
            >
              {feedback.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e85d2a] py-3 font-mono text-xs uppercase tracking-[0.18em] text-[#0d0d0d] transition hover:bg-[#f06f3f] disabled:opacity-60"
          >
            {loading ? "Sending…" : "Submit feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
