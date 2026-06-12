export default function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? '#ffffff' : '#16181d'
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-12 items-center justify-between px-7 pt-2"
      style={{ color: c }}
    >
      <span className="font-body text-[15px] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-1.5">
        {/* cellular */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="4" rx="0.8" fill={c} />
          <rect x="4.5" y="5" width="3" height="6" rx="0.8" fill={c} />
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.8" fill={c} />
          <rect x="13.5" y="0" width="3" height="11" rx="0.8" fill={c} />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path
            d="M8.5 10.9 6.2 8.6a3.4 3.4 0 0 1 4.6 0L8.5 10.9Z"
            fill={c}
          />
          <path
            d="M4.4 6.8a6.2 6.2 0 0 1 8.2 0l-1.5 1.5a4.1 4.1 0 0 0-5.2 0L4.4 6.8Z"
            fill={c}
          />
          <path
            d="M2.3 4.7a9 9 0 0 1 12.4 0l-1.5 1.5a7 7 0 0 0-9.4 0L2.3 4.7Z"
            fill={c}
          />
        </svg>
        {/* battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} strokeOpacity="0.4" />
          <rect x="2" y="2" width="18" height="8" rx="1.8" fill={c} />
          <path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill={c} fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  )
}
