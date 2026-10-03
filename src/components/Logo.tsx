import Link from "next/link";

interface LogoMarkProps {
  className?: string;
}

interface LogoProps {
  className?: string;
  markClassName?: string;
}

export function LogoMark({ className = "" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 31C14 29 16 18 24 15C31 12 36 17 40 25C34 24 30 25 26 29C21 33 16 36 8 31Z"
        fill="currentColor"
      />

      <path
        d="M15 32C20 27 25 23 33 20"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="30"
        cy="16"
        r="2"
        fill="white"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "",
}: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Ember & Grain — Bakehouse"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-coffee text-orange shadow-lg transition-transform duration-200 group-hover:scale-[1.03] ${markClassName}`}
      >
        <LogoMark className="h-7 w-7" />
      </span>

      <span className="min-w-0">
        <span className="block whitespace-nowrap text-[15px] font-bold leading-tight tracking-[-0.04em]">
          EMBER &amp; GRAIN
        </span>

        <span className="mt-0.5 block whitespace-nowrap text-[8px] font-bold uppercase leading-none tracking-[0.3em] text-muted">
          Bakehouse
        </span>
      </span>
    </Link>
  );
}