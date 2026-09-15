"use client";

import { useState } from "react";
import { CallForm } from "./call-form";
import { FeedbackDialog } from "./feedback-dialog";
import { StatusBadge } from "./status-badge";

const RULES = [
  "Imagine Rahul was looking for body trimmers and abandoned the cart after adding Beardo Full Body Trimmer to cart.",
  "You (Rahul) will now get a call from our AI Agent on behalf of Beardo, understanding the concerns and addressing them.",
  "Broad flow of the conversation — Understand → Solve → Close.",
];

const CAPABILITIES = [
  "You can ask for the call to be rescheduled; the agent will handle this (it will not actually call you at the rescheduled time).",
  "The agent is authorized to offer a 10% discount in order to close the deal.",
  "You can converse in Hindi or English, and change language mid-conversation.",
];

export function DemoPage() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [agentActive, setAgentActive] = useState(true);

  return (
    <div className="min-h-full bg-[#0d0d0d] text-[#f5f0e6]">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f5f0e6]/45">
          Beardo · Demo
        </p>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f5f0e6]/70 underline-offset-4 hover:text-[#f5f0e6] hover:underline"
          >
            Give your feedback
          </button>
          <StatusBadge onStatusChange={setAgentActive} />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-20">
        <section className="border-t border-[#f5f0e6]/15 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
            Form 1 · Scenario
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight lowercase sm:text-5xl">
            abandoned cart recovery agent
          </h1>
          <ol className="mt-8 space-y-4">
            {RULES.map((rule, index) => (
              <li key={rule} className="flex gap-4 text-[#f5f0e6]/85 leading-relaxed">
                <span className="font-mono text-sm text-[#e85d2a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border-t border-[#f5f0e6]/15 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
            Form 2 · Product
          </p>
          <div className="mt-4 bg-[#f5f0e6] p-6 text-[#1a1a1a]">
            <h2 className="font-serif text-2xl lowercase">beardo fullbody trimmer</h2>
            <p className="mt-2 font-mono text-sm tracking-wide">Cost: Rs 2999</p>
          </div>
        </section>

        <section className="mt-14 border-t border-[#f5f0e6]/15 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
            Form 3 · Capabilities
          </p>
          <ol className="mt-6 space-y-4">
            {CAPABILITIES.map((item, index) => (
              <li key={item} className="flex gap-4 text-[#f5f0e6]/85 leading-relaxed">
                <span className="font-mono text-sm text-[#e85d2a]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 border-t border-[#f5f0e6]/15 pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5f0e6]/45">
            Form 4 · Request a call
          </p>
          <p className="mt-3 max-w-xl text-[#f5f0e6]/70 leading-relaxed">
            Enter the number you want to receive the call on. You will be called as Rahul for this
            demo scenario.
          </p>
          <div className="mt-6 bg-[#f5f0e6] p-6 text-[#1a1a1a]">
            <CallForm agentActive={agentActive} />
          </div>
          {!agentActive && (
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-[#e85d2a]">
              Limit exhausted — calls are paused until credits are restored.
            </p>
          )}
        </section>
      </main>

      <FeedbackDialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  );
}
