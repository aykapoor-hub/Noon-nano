// crisp "<name> is <age> years old" sun + arc-text mark (replaces the 1x slice)
const Sparkle = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <path
    d={`M${x} ${y - 6 * s}C${x + 1.2 * s} ${y - 1.6 * s} ${x + 1.6 * s} ${y - 1.2 * s} ${x + 6 * s} ${y}C${x + 1.6 * s} ${y + 1.2 * s} ${x + 1.2 * s} ${y + 1.6 * s} ${x} ${y + 6 * s}C${x - 1.2 * s} ${y + 1.6 * s} ${x - 1.6 * s} ${y + 1.2 * s} ${x - 6 * s} ${y}C${x - 1.6 * s} ${y - 1.2 * s} ${x - 1.2 * s} ${y - 1.6 * s} ${x} ${y - 6 * s}Z`}
    fill="#ffcf3f"
  />
)

export default function SunArc({
  name = 'Kiaan',
  age = 10,
  className = '',
}: {
  name?: string
  age?: number
  className?: string
}) {
  return (
    <svg viewBox="0 0 220 116" className={className} fill="none">
      <defs>
        <linearGradient id="sun-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0bd" />
          <stop offset="55%" stopColor="#ffdf7e" />
          <stop offset="100%" stopColor="#ffcc46" />
        </linearGradient>
        <clipPath id="sun-clip">
          <rect x="60" y="58" width="100" height="58" />
        </clipPath>
        <path id="sun-arc" d="M28 104 A95 86 0 0 1 192 104" />
      </defs>

      {/* rising sun (bottom half disc) */}
      <g clipPath="url(#sun-clip)">
        <circle cx="110" cy="104" r="50" fill="url(#sun-face)" />
        <circle cx="110" cy="104" r="50" fill="none" stroke="#ffe9a8" strokeWidth="6" opacity="0.6" />
      </g>

      {/* arc text */}
      <text
        fill="#3a4763"
        fontFamily="Figtree, sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="0.3"
      >
        <textPath href="#sun-arc" startOffset="50%" textAnchor="middle">
          {`${name} is ${age} years old`}
        </textPath>
      </text>

      <Sparkle x={28} y={86} s={1.1} />
      <Sparkle x={194} y={80} s={1.3} />
      <Sparkle x={176} y={100} s={0.9} />
    </svg>
  )
}
