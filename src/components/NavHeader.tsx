export default function NavHeader({
  title,
  onBack,
  right,
  light = false,
}: {
  title?: string
  onBack?: () => void
  right?: React.ReactNode
  light?: boolean
}) {
  const c = light ? '#fff' : '#16181d'
  return (
    // mt clears the absolutely-positioned StatusBar (h-12) that sits above it
    <div className="mt-[42px] flex h-12 items-center gap-3 px-5" style={{ color: c }}>
      {onBack && (
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: light ? 'rgba(255,255,255,0.12)' : '#f1f3f6' }}
          aria-label="Back"
        >
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M8 1 1 8l7 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {title && <h2 className="text-[19px] font-bold tracking-tight">{title}</h2>}
      {right && <div className="ml-auto">{right}</div>}
    </div>
  )
}
