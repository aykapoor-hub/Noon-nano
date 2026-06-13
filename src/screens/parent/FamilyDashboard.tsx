import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import Dirham from '../../components/Dirham'
import { useNano, type Child, type Activity } from '../../state'

function Donut() {
  const r = 54
  const c = 2 * Math.PI * r
  return (
    <svg width="190" height="190" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#14532d" strokeWidth="14" />
      <motion.circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#2f9e63"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * 0.42 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        transform="rotate(-90 70 70)"
      />
    </svg>
  )
}

const Trash = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6.5 4V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5 4l.5 9a1 1 0 0 0 1 .9h3a1 1 0 0 0 1-.9L12 4" stroke="#aab1c0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function KidRow({
  child,
  asks,
  onAssign,
  onTopUp,
  onRemove,
  onAsks,
  removable,
}: {
  child: Child
  asks: number
  onAssign: () => void
  onTopUp: () => void
  onRemove: () => void
  onAsks?: () => void
  removable: boolean
}) {
  const openTasks = child.tasks.filter((t) => !t.done).length
  return (
    <div className="border-t border-[#f1f3f6] pt-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full text-[16px] font-extrabold text-white" style={{ background: child.tone }}>
          {child.name[0]}
        </span>
        <div className="min-w-0">
          <p className="text-[16px] font-bold text-ink">{child.name}</p>
          <p className="text-[12.5px] text-[#7d8aa0]">{child.age} • On nano since {child.since}</p>
        </div>
        {removable && (
          <button onClick={onRemove} aria-label={`Remove ${child.name}`} className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f6f9]">
            <Trash />
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-3 rounded-xl bg-[#f7f8fa] py-3 text-center">
        <div className="border-r border-[#e7eaf0]">
          <p className="text-[11.5px] text-[#7d8aa0]">Balance</p>
          <p className="mt-0.5 flex items-center justify-center gap-0.5 text-[15px] font-bold text-ink">
            <Dirham />
            {child.balance}
          </p>
        </div>
        <button onClick={onAsks} className="border-r border-[#e7eaf0]">
          <p className="text-[11.5px] text-[#7d8aa0]">Asks pending</p>
          <p className="mt-0.5 text-[15px] font-bold text-ink">{asks}</p>
        </button>
        <div>
          <p className="text-[11.5px] text-[#7d8aa0]">Open tasks</p>
          <p className="mt-0.5 text-[15px] font-bold text-ink">{openTasks}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2.5">
        <button onClick={onAssign} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white py-3 text-[13.5px] font-semibold text-ink shadow-chip ring-1 ring-[#eceef2]">
          ✦ Assign tasks
        </button>
        <button onClick={onTopUp} className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy py-3 text-[13.5px] font-semibold text-white">
          ✦ Top up wallet
        </button>
      </div>
      {asks > 0 && (
        <button onClick={onAsks} className="mt-2.5 w-full rounded-full bg-[#fff3ec] py-2.5 text-[13px] font-semibold text-[#f15a24]">
          {asks} purchase {asks === 1 ? 'request needs' : 'requests need'} your approval →
        </button>
      )}
    </div>
  )
}

const ACTIVITY_STYLE: Record<Activity['kind'], { bg: string; fg: string; glyph: string }> = {
  earn: { bg: '#fff3ec', fg: '#f15a24', glyph: '✦' },
  topup: { bg: '#eaf6ef', fg: '#1aa251', glyph: '↑' },
  spend: { bg: '#eef2fb', fg: '#2563eb', glyph: '↓' },
  task: { bg: '#f1f3f6', fg: '#5b6678', glyph: '✓' },
  add: { bg: '#f1f3f6', fg: '#5b6678', glyph: '+' },
}

function ActivityRow({ a }: { a: Activity }) {
  const s = ACTIVITY_STYLE[a.kind]
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold" style={{ background: s.bg, color: s.fg }}>
        {s.glyph}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-medium text-ink">{a.text}</p>
        <p className="text-[11.5px] text-[#9aa3b8]">{a.when}</p>
      </div>
      {a.amount != null && (
        <p className={`flex items-center gap-0.5 text-[14px] font-bold ${a.sign === '-' ? 'text-[#1d2539]' : 'text-[#1aa251]'}`}>
          {a.sign}
          <Dirham />
          {a.amount}
        </p>
      )}
    </div>
  )
}

export default function FamilyDashboard({
  onBack,
  onAssign,
  onTopUp,
  onApprovals,
  onAddChild,
}: {
  onBack: () => void
  onAssign: (childId: string) => void
  onTopUp: (childId: string) => void
  onApprovals: () => void
  onAddChild: () => void
}) {
  const { children, activities, askStatus, activeChildId, removeChild } = useNano()

  return (
    <div className="relative h-full w-full overflow-y-auto no-scrollbar bg-[#f4f6f9]">
      <StatusBar />
      <div className="px-4 pb-16 pt-[52px]">
        <button onClick={onBack} className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-chip">
          <svg width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M8 1 1 8l7 7" stroke="#16181d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-chip">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef1f5] text-[18px] font-extrabold text-[#5b6678]">A</span>
            <div>
              <p className="text-[18px] font-bold text-ink">Anmol’s Family</p>
              <p className="text-[12.5px] text-[#7d8aa0]">{children.length} {children.length === 1 ? 'kid' : 'kids'}</p>
            </div>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[#f4f6f9] px-3 py-1.5 text-[13px] font-semibold text-ink">
              February
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="m1 1 3.5 3.5L8 1" stroke="#16181d" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {children.map((c) => (
              <span key={c.id} className="flex items-center gap-1.5 rounded-full bg-[#f4f6f9] px-3.5 py-1.5 text-[13px] font-medium text-ink">
                {c.name}
                <span className="h-2 w-2 rounded-full" style={{ background: c.tone }} />
              </span>
            ))}
          </div>

          <div className="relative mt-3 flex items-center justify-center">
            <Donut />
            <div className="absolute flex flex-col items-center">
              <p className="flex items-center gap-0.5 font-display text-[24px] font-extrabold text-ink">
                <Dirham />1410
              </p>
              <p className="text-[11px] text-[#7d8aa0]">spent this month</p>
            </div>
          </div>

          <div className="mt-3 flex justify-center gap-2 rounded-full bg-[#f4f6f9] p-1">
            <span className="flex-1 rounded-full bg-white py-2 text-center text-[13px] font-semibold text-ink shadow-chip">♟ Spend per child</span>
            <span className="flex-1 py-2 text-center text-[13px] font-medium text-[#7d8aa0]">Per Category</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-chip">
          <p className="text-[18px] font-bold text-ink">Kids</p>
          {children.map((c) => (
            <motion.div key={c.id} layout className="mt-2">
              <KidRow
                child={c}
                asks={c.id === activeChildId && askStatus === 'pending' ? 1 : 0}
                onAssign={() => onAssign(c.id)}
                onTopUp={() => onTopUp(c.id)}
                onAsks={onApprovals}
                onRemove={() => removeChild(c.id)}
                removable={c.id !== activeChildId}
              />
            </motion.div>
          ))}
          <button
            onClick={onAddChild}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#cdd3dd] py-3 text-[14px] font-semibold text-[#5b6678]"
          >
            <span className="text-[16px] leading-none">+</span> Add a child
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-chip">
          <p className="text-[18px] font-bold text-ink">Recent activity</p>
          <div className="mt-1 divide-y divide-[#f4f5f8]">
            {activities.slice(0, 6).map((a) => (
              <ActivityRow key={a.id} a={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
