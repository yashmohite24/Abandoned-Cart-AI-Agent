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
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-beige-deep bg-surface p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-olive">We&apos;d love to hear from you</p>
            <h2 id="feedback-title" className="font-display mt-1 text-2xl font-semibold text-ink">
              Give your feedback
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm font-medium text-ink-muted hover:bg-beige hover:text-ink"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-beige-deep bg-beige/50 px-4 py-2.5 outline-none focus:border-olive focus:ring-2 focus:ring-olive-soft"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-beige-deep bg-beige/50 px-4 py-2.5 outline-none focus:border-olive focus:ring-2 focus:ring-olive-soft"
              required
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-ink">Feedback</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-beige-deep bg-beige/50 px-4 py-2.5 outline-none focus:border-olive focus:ring-2 focus:ring-olive-soft"
              required
            />
          </label>

          {feedback && (
            <p
              className={`text-sm font-medium ${feedback.type === "success" ? "text-olive-deep" : "text-[#9b4f42]"}`}
            >
              {feedback.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-olive py-3 font-semibold text-white transition hover:bg-olive-deep disabled:opacity-60"
          >
            {loading ? "Sending…" : "Submit feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
