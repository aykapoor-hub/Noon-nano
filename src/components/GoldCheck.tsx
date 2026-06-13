// crisp gold medallion (replaces the cropped 1x slice)
export default function GoldCheck({ size = 104 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 104 104" fill="none">
      <defs>
        <radialGradient id="gc-face" cx="36%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#fdeeb0" />
          <stop offset="48%" stopColor="#e6b647" />
          <stop offset="100%" stopColor="#a87f2a" />
        </radialGradient>
      </defs>
      <circle cx="52" cy="52" r="51" fill="url(#gc-face)" />
      <circle cx="52" cy="52" r="44.5" fill="none" stroke="#5c441480" strokeWidth="1.5" />
      <path
        d="M34 53.5 46 65.5 71 39"
        stroke="#fffdf2"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
