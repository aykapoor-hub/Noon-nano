import StatusBar from './StatusBar'

/* shared chrome for the parent setup flow (Figma "Jun 4 • Flow" band 1):
   light-gray page, white circular back button + title, scrollable card
   area, and a pinned white footer. */
export default function SetupShell({
  title,
  onBack,
  children,
  footer,
}: {
  title: string
  onBack?: () => void
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#f9f9fb] font-noon">
      <StatusBar />
      <div className="flex items-center gap-3 px-5 pb-2 pt-[52px]">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Back"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(39,48,69,0.10)]"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
              <path d="M7 1 1 7l6 6" stroke="#1d2539" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#1d2539]">{title}</h2>
      </div>
      <div className="no-scrollbar flex-1 overflow-y-auto px-3 pb-[150px] pt-1">{children}</div>
      {footer}
    </div>
  )
}

/* pinned bottom footer with an optional note and the primary CTA */
export function SetupFooter({
  label,
  onClick,
  disabled = false,
  note,
}: {
  label: string
  onClick?: () => void
  disabled?: boolean
  note?: string
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 rounded-t-[22px] bg-white px-5 pb-[10px] pt-4 shadow-[0_-4px_24px_rgba(39,48,69,0.06)]">
      {note && <p className="mb-3 text-center text-[12px] leading-[16px] text-[#98a1b3]">{note}</p>}
      <button
        onClick={disabled ? undefined : onClick}
        className="h-14 w-full rounded-full text-[16px] font-semibold text-white transition-colors"
        style={
          disabled
            ? { background: '#9a9ea9' }
            : { backgroundImage: 'linear-gradient(180deg, #2d3750 0%, #232b3e 100%)' }
        }
      >
        {label}
      </button>
      <div className="mx-auto mt-3 h-[5px] w-[134px] rounded-full bg-[#1d2539]" />
    </div>
  )
}
