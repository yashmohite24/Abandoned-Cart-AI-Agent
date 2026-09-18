type IconProps = { className?: string };

export function PhoneWaveIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="14" y="6" width="20" height="36" rx="4" className="stroke-olive-deep" strokeWidth="2" />
      <circle cx="24" cy="36" r="2" className="fill-olive" />
      <path
        d="M32 16c2 2 2 6 0 8M36 12c4 4 4 12 0 16M40 8c6 6 6 18 0 24"
        className="stroke-salmon-strong"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LanguageIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
        className="stroke-olive-deep"
        strokeWidth="1.5"
      />
      <path d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.2-4 9s1.5 6.2 4 9" className="stroke-olive" strokeWidth="1.5" />
    </svg>
  );
}

export function TagIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20 12V6.5A2.5 2.5 0 0 0 17.5 4H12L4 12l8 8 8-8Z"
        className="stroke-olive-deep"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="8.5" r="1.5" className="fill-salmon-strong" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 18.5 4 21v-4.5A7.5 7.5 0 0 1 4.5 9 7.5 7.5 0 0 1 12 4.5h0A7.5 7.5 0 0 1 19.5 12 7.5 7.5 0 0 1 12 19.5H9"
        className="stroke-olive-deep"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" className="stroke-olive-deep" strokeWidth="1.5" />
      <path d="M8 3v4M16 3v4M4 10h16" className="stroke-olive" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EndCallIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5l14 14M12 3a9 9 0 1 0 9 9"
        className="stroke-olive-deep"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
