"use client";

import { useState } from "react";
import { CallForm } from "./call-form";
import { FeedbackDialog } from "./feedback-dialog";
import { StatusBadge } from "./status-badge";

export function DemoPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [agentActive, setAgentActive] = useState(true);

  return (
    <div className="flex min-h-dvh flex-col bg-beige">
      <header className="shrink-0 border-b border-beige-deep/80 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <p className="text-sm font-semibold text-olive-deep">Beardo · Voice demo</p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              className="rounded-xl bg-olive-deep px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-olive-deep/25 transition hover:bg-[#4d5a42] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-deep"
            >
              Give your feedback
            </button>
            <StatusBadge onStatusChange={setAgentActive} />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Instructions — 70% */}
        <section
          className="min-h-0 border-b border-beige-deep/60 bg-surface lg:w-[70%] lg:border-b-0 lg:border-r lg:overflow-y-auto"
        >
          <div className="mx-auto max-w-4xl px-5 py-6 sm:px-8 sm:py-8">
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Abandoned Cart Recovery Agent
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-muted">
              Read how this demo works, then use the panel on the right to receive a live call from
              our AI agent.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-5">
              <article className="rounded-2xl border border-beige-deep bg-beige/60 p-5 md:col-span-3">
                <h2 className="text-xs font-bold uppercase tracking-wide text-olive">Scenario</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink">
                  <li>
                    Imagine Rahul was looking for body trimmers and abandoned the cart after adding{" "}
                    <strong>Beardo Full Body Trimmer</strong> to cart.
                  </li>
                  <li>
                    You (as Rahul) will get a call from our AI agent on behalf of Beardo — it will
                    understand your concerns and address them.
                  </li>
                  <li>
                    Conversation flow: <strong>Understand → Solve → Close</strong>.
                  </li>
                </ul>
              </article>

              <article className="rounded-2xl border border-salmon/40 bg-salmon-soft p-5 md:col-span-2">
                <h2 className="text-xs font-bold uppercase tracking-wide text-[#9b5a4d]">
                  Product
                </h2>
                <p className="font-display mt-2 text-lg font-semibold text-ink">
                  Beardo Fullbody Trimmer
                </p>
                <p className="mt-1 text-base font-medium text-ink-muted">Rs 2,999</p>
              </article>
            </div>

            <article className="mt-4 rounded-2xl border border-olive-soft bg-olive-soft/40 p-5">
              <h2 className="text-xs font-bold uppercase tracking-wide text-olive-deep">
                What the agent can do
              </h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                <li className="rounded-xl bg-surface/70 px-3 py-2.5 text-sm leading-snug text-ink">
                  Ask to <strong>reschedule</strong> (no follow-up call in this demo).
                </li>
                <li className="rounded-xl bg-surface/70 px-3 py-2.5 text-sm leading-snug text-ink">
                  Agent may offer a <strong>10% discount</strong> to close the sale.
                </li>
                <li className="rounded-xl bg-surface/70 px-3 py-2.5 text-sm leading-snug text-ink">
                  <strong>Hindi or English</strong>, switch mid-conversation.
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Hero + form — 30% */}
        <section
          className="flex min-h-[32dvh] shrink-0 flex-col justify-center bg-gradient-to-b from-salmon-soft via-salmon/30 to-beige lg:min-h-0 lg:w-[30%] lg:overflow-y-auto"
        >
          <div className="px-5 py-8 sm:px-6 lg:py-6">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-2xl font-semibold text-ink">Try it yourself</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Enter the number for your call. You&apos;ll be addressed as Rahul for this demo.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/60 bg-surface p-5 shadow-lg shadow-salmon-strong/10 sm:p-6">
              <CallForm agentActive={agentActive} />
              {!agentActive && (
                <p className="mt-4 text-center text-sm font-medium text-[#9b4f42]">
                  Limit exhausted — new calls are paused until credits are restored.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
