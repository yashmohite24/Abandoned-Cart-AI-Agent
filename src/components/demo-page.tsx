"use client";

import { useState } from "react";
import { CallForm } from "./call-form";
import { FeedbackDialog } from "./feedback-dialog";
import { StatusBadge } from "./status-badge";

export function DemoPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [agentActive, setAgentActive] = useState(true);

  return (
    <div className="min-h-full bg-beige">
      <header className="border-b border-beige-deep/80 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
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

      {/* Instructions */}
      <section className="border-b border-beige-deep/60 bg-surface">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Abandoned Cart Recovery Agent
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Read how this demo works, then enter your number below to receive a live call from our
            AI agent.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <article className="rounded-2xl border border-beige-deep bg-beige/60 p-6 lg:col-span-2">
              <h2 className="text-sm font-bold uppercase tracking-wide text-olive">Scenario</h2>
              <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-ink">
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

            <article className="rounded-2xl border border-salmon/40 bg-salmon-soft p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-[#9b5a4d]">Product</h2>
              <p className="font-display mt-3 text-xl font-semibold text-ink">Beardo Fullbody Trimmer</p>
              <p className="mt-2 text-lg font-medium text-ink-muted">Rs 2,999</p>
            </article>
          </div>

          <article className="mt-6 rounded-2xl border border-olive-soft bg-olive-soft/40 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-olive-deep">
              What the agent can do
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3 sm:gap-4">
              <li className="rounded-xl bg-surface/70 px-4 py-3 text-sm leading-relaxed text-ink">
                You can ask to <strong>reschedule</strong> the call (the agent won&apos;t call again
                at the new time in this demo).
              </li>
              <li className="rounded-xl bg-surface/70 px-4 py-3 text-sm leading-relaxed text-ink">
                The agent may offer a <strong>10% discount</strong> to help close the sale.
              </li>
              <li className="rounded-xl bg-surface/70 px-4 py-3 text-sm leading-relaxed text-ink">
                Speak in <strong>Hindi or English</strong>, and switch language mid-conversation.
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* Hero + form */}
      <section className="bg-gradient-to-b from-salmon-soft via-salmon/30 to-beige">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Try it yourself
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Enter the number where you want to receive the call. You&apos;ll be addressed as Rahul
              for this demo.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-white/60 bg-surface p-6 shadow-lg shadow-salmon-strong/10 sm:p-8">
            <CallForm agentActive={agentActive} />
            {!agentActive && (
              <p className="mt-4 text-center text-sm font-medium text-[#9b4f42]">
                Limit exhausted — new calls are paused until credits are restored.
              </p>
            )}
          </div>
        </div>
      </section>

      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
