"use client";

import { useState } from "react";
import {
  CalendarIcon,
  ChatIcon,
  EndCallIcon,
  LanguageIcon,
  TagIcon,
} from "./demo-icons";
import { FeedbackDialog } from "./feedback-dialog";
import { HeroCallSection } from "./hero-call-section";
import { StatusBadge } from "./status-badge";

const CONVERSATION_STEPS = [
  {
    title: "Confirm your identity",
    body: "The agent confirms that it's speaking to the right customer.",
  },
  {
    title: "Understand what happened",
    body: "It asks why you didn't complete your purchase and listens to your concerns.",
  },
  {
    title: "Address your concerns",
    body:
      "It answers questions, handles objections and tries to remove any friction standing between you and the purchase.",
  },
  {
    title: "Close the sale",
    body:
      "If you're ready to buy, the agent offers a 10% discount and asks if you'd like a WhatsApp checkout link.",
  },
] as const;

const CAPABILITIES = [
  {
    title: "Speak in Hindi or English",
    body: "Switch between languages naturally, even mid-conversation.",
    Icon: LanguageIcon,
  },
  {
    title: "Offer a 10% discount",
    body: "When it makes sense to help close the sale.",
    Icon: TagIcon,
  },
  {
    title: "Send a WhatsApp checkout link",
    body: "Asks for confirmation; no link is sent in this demo.",
    Icon: ChatIcon,
  },
  {
    title: "Reschedule the call",
    body: "Call back at another time — no follow-up in this demo.",
    Icon: CalendarIcon,
  },
  {
    title: "End unproductive calls",
    body: "Ends the call if the conversation isn't moving forward.",
    Icon: EndCallIcon,
  },
] as const;

export function DemoPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [agentActive, setAgentActive] = useState(true);

  return (
    <div className="demo-shell flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 shrink-0 border-b border-beige-deep/60 bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-olive-deep text-xs font-bold tracking-wide text-white"
              aria-hidden
            >
              V
            </span>
            <p className="text-sm font-semibold text-ink">Voice AI Agent Demo</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setFeedbackOpen(true)}
              className="rounded-full bg-olive-deep px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4d5a42] sm:px-5 sm:py-2.5"
            >
              Give your feedback
            </button>
            <StatusBadge onStatusChange={setAgentActive} />
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* Content */}
        <div className="order-2 min-h-0 flex-1 overflow-y-auto lg:order-1">
          <div className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-10 lg:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-olive-soft bg-olive-soft/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-olive-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" aria-hidden />
              Live voice demo
            </div>

            <h1 className="font-display mt-5 text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
              Abandoned Cart Recovery Agent
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted sm:text-xl">
              See how an AI agent can recover an abandoned cart over a phone call.
            </p>

            <div className="mt-8 rounded-2xl border border-beige-deep bg-surface p-6 shadow-sm sm:p-7">
              <p className="text-base leading-relaxed text-ink">
                <strong className="font-semibold">Imagine you&apos;re Rahul.</strong>{" "}
                <span className="text-ink-muted">
                  You were browsing body trimmers on Beardo, added the Beardo Trimmer to your cart,
                  and then forgot about it.
                </span>
              </p>
              <p className="mt-4 border-l-2 border-salmon-strong pl-4 text-base leading-relaxed text-ink-muted">
                A little while later, you receive a call from an AI agent on behalf of Beardo. It
                understands why you didn&apos;t complete your purchase, answers your questions,
                addresses your concerns and tries to help you complete the order.
              </p>
            </div>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-[1.65rem]">
                How the conversation works
              </h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {CONVERSATION_STEPS.map((step, index) => (
                  <li
                    key={step.title}
                    className="relative rounded-2xl border border-beige-deep/80 bg-surface/90 p-4 sm:p-5"
                  >
                    <span
                      className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-olive-soft text-sm font-bold text-olive-deep"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-10 pb-4 lg:pb-8">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-[1.65rem]">
                What can the agent do?
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {CAPABILITIES.map(({ title, body, Icon }) => (
                  <li
                    key={title}
                    className="flex gap-3 rounded-2xl border border-olive-soft/70 bg-olive-soft/25 p-4"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface shadow-sm"
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-snug text-ink">{title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        {/* Call panel — first on mobile, fixed column on desktop */}
        <aside
          className="relative z-20 order-1 shrink-0 border-b border-beige-deep/60 bg-beige/40 lg:order-2 lg:w-[min(100%,440px)] lg:border-b-0 lg:border-l lg:border-beige-deep/50"
        >
          <div className="lg:sticky lg:top-16 lg:z-20 lg:max-h-[calc(100dvh-4rem)] lg:overflow-y-auto lg:py-6">
            <div className="scroll-mt-20 px-5 py-8 sm:px-6 lg:px-8">
              <HeroCallSection agentActive={agentActive} />
            </div>
          </div>
        </aside>
      </div>

      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
