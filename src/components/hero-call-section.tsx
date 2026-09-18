"use client";

import { CallForm } from "./call-form";

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path
        d="M8 1.5 2.5 3.5v4c0 3.1 2.2 5.9 5.5 6.5 3.3-.6 5.5-3.4 5.5-6.5v-4L8 1.5Zm0 1.2 4.5 1.6v3.4c0 2.4-1.7 4.6-4.5 5.1-2.8-.5-4.5-2.7-4.5-5.1V4.3L8 2.7Z"
      />
    </svg>
  );
}

export function HeroCallSection({ agentActive }: { agentActive: boolean }) {
  return (
    <div className="mx-auto w-full max-w-md space-y-5">
      <div className="relative z-10 overflow-hidden rounded-[1.75rem] border border-olive/25 bg-olive-soft/90 shadow-[0_12px_40px_-16px_rgba(92,107,79,0.35)]">
        <div className="px-6 pb-2 pt-6 sm:px-7 sm:pt-7">
          <span
            className="inline-block rounded-full bg-[#c5d4b8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-olive-deep"
          >
            Instant interactive demo
          </span>
          <h2 className="font-display mt-5 text-[1.65rem] font-semibold leading-tight text-ink sm:text-3xl">
            Want to try it yourself?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[15px]">
            Enter your phone number below and receive a call from the agent.
          </p>
        </div>

        <div className="px-6 pb-5 sm:px-7">
          <CallForm agentActive={agentActive} variant="hero" />
          {!agentActive && (
            <p className="mt-3 text-center text-sm font-medium text-[#9b4f42]">
              Limit exhausted — new calls are paused until credits are restored.
            </p>
          )}
        </div>

        <div className="border-t border-olive/15 px-6 py-3.5 text-[11px] text-ink-muted sm:px-7">
          <span className="inline-flex items-center gap-1.5">
            <ShieldIcon className="h-3.5 w-3.5 shrink-0 opacity-70" />
            Demo purposes only · No spam calls
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-beige-deep bg-surface px-5 py-5 shadow-sm sm:px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-muted">
          Sample conversation snippet
        </p>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border-l-4 border-salmon-strong bg-salmon-soft/70 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#9b5a4d]">
              AI Agent
            </p>
            <p className="mt-1.5 text-sm italic leading-relaxed text-ink">
              &ldquo;Hey Rahul! I saw you were checking out the Beardo Fullbody Trimmer today. Did
              you have any quick questions about blade safety?&rdquo;
            </p>
          </div>
          <div className="rounded-xl border border-beige-deep bg-surface px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink-muted">Rahul</p>
            <p className="mt-1.5 text-sm italic leading-relaxed text-ink">
              &ldquo;Yeah, is it fully waterproof for shower use?&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
