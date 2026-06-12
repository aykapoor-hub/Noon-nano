/**
 * UAE dirham symbol (2025) — a capital D crossed by two horizontal bars.
 * No Unicode codepoint / font support yet, so rendered as an inline SVG that
 * scales with font-size and inherits currentColor.
 */
export default function Dirham({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 76 72"
      className={`inline-block h-[0.72em] w-[0.78em] ${className}`}
      style={{ verticalAlign: '0.015em' }}
      fill="currentColor"
      aria-label="AED"
    >
      <path
        fillRule="evenodd"
        d="M8 0 H36 C62 0 76 14 76 36 C76 58 62 72 36 72 H8 Z
           M21 13 H35 C52 13 62 21 62 36 C62 51 52 59 35 59 H21 Z"
      />
      <rect x="0" y="22" width="50" height="9" />
      <rect x="0" y="41" width="50" height="9" />
    </svg>
  )
}
