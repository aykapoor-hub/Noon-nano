import { useState } from 'react'
import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import Dirham from '../../components/Dirham'
import { asset } from '../../lib/asset'
import { useNano, type Child, type Activity } from '../../state'

/* ── small inline icons ──────────────────────────────────────────── */
const ChevDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m4 5.5 3 3 3-3" stroke="#475067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const ChevRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="m5.5 3.5 3.5 3.5-3.5 3.5" stroke="#9aa3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const UserGroup = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.2" stroke="#1d2539" strokeWidth="1.3" />
    <path d="M2.2 12.5c0-2.1 1.7-3.5 3.8-3.5s3.8 1.4 3.8 3.5" stroke="#1d2539" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M10.5 3.2a2 2 0 0 1 0 3.8M11.5 12.5c0-1.6-.6-2.8-1.7-3.4" stroke="#1d2539" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
const Squares = ({ c = '#666d85' }: { c?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke={c} strokeWidth="1.3" />
    <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke={c} strokeWidth="1.3" />
    <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" stroke={c} strokeWidth="1.3" />
    <rect x="9" y="9" width="4.5" height="4.5" rx="1" stroke={c} strokeWidth="1.3" />
  </svg>
)
const AssignIcon = ({ c = '#475067' }: { c?: string }) => (
  <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
    <rect x="3" y="1.5" width="8" height="10.5" rx="1.5" stroke={c} strokeWidth="1.2" />
    <path d="M5.5 1.5V1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.5" stroke={c} strokeWidth="1.2" />
    <path d="m5 6.5 1.3 1.3L9 5" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const TopUpIcon = ({ c = '#fff' }: { c?: string }) => (
  <svg width="14" height="13" viewBox="0 0 14 13" fill="none">
    <rect x="1.5" y="3" width="11" height="7.5" rx="1.5" stroke={c} strokeWidth="1.2" />
    <path d="M7 5.5v3M5.5 7h3" stroke={c} strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
const Plus = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="#5b6678" strokeWidth="1.6" strokeLinecap="round" /></svg>
)
const Trash = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6.5 4V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5 4l.5 9a1 1 0 0 0 1 .9h3a1 1 0 0 0 1-.9L12 4" stroke="#d2453b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function Donut() {
  // outer Ø ~182px / stroke ~20px, measured 1:1 off the Figma frame
  const r = 54
  const c = 2 * Math.PI * r
  return (
    <svg width="206" height="206" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#14532d" strokeWidth="14" />
      <motion.circle cx="70" cy="70" r={r} fill="none" stroke="#2f9e63" strokeWidth="14" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * 0.42 }} transition={{ duration: 0.9, ease: 'easeOut' }} transform="rotate(-90 70 70)" />
    </svg>
  )
}

function Avatar({ child, size }: { child: Child; size: number }) {
  if (child.avatar)
    return <img src={asset(`family/${child.avatar}.png`)} alt={child.name} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />
  return (
    <span className="flex shrink-0 items-center justify-center rounded-full font-extrabold text-white" style={{ width: size, height: size, background: child.tone, fontSize: size * 0.4 }}>
      {child.name[0]}
    </span>
  )
}

/* ── kid card ────────────────────────────────────────────────────── */
function KidRow({ child, asks, onAssign, onTopUp, onRemove, onAsks, removable }: {
  child: Child; asks: number; onAssign: () => void; onTopUp: () => void; onRemove: () => void; onAsks?: () => void; removable: boolean
}) {
  const [open, setOpen] = useState(false)
  const openTasks = child.tasks.filter((t) => !t.done).length
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Avatar child={child} size={50} />
        <div className="min-w-0 flex-1">
          <p className="text-[16px] font-bold tracking-[-0.15px] text-[#1d2539]">{child.name}</p>
          <p className="text-[12px] text-[#666d85]">{child.age} • On nano since {child.since}</p>
        </div>
        <button onClick={() => setOpen((o) => !o)} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f2f3f7] bg-[#fcfcfd]">
          <span className={open ? 'rotate-90 transition-transform' : 'transition-transform'}>
            <ChevRight />
          </span>
        </button>
      </div>

      <div className="flex flex-col gap-3 rounded-[12px] bg-[#f9f9fb] px-2 py-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex-1">
            <p className="text-[11px] text-[#666d85]">Balance</p>
            <p className="mt-0.5 flex items-center gap-0.5 text-[14px] font-bold text-[#1d2539]"><Dirham />{child.balance}</p>
          </div>
          <span className="h-[30px] w-px bg-[#e7eaf0]" />
          <div className="flex flex-1 flex-col items-center">
            <p className="text-[11px] text-[#666d85]">Asks pending</p>
            <button onClick={onAsks} className="mt-0.5 text-[14px] font-bold text-[#1d2539]">{asks}</button>
          </div>
          <span className="h-[30px] w-px bg-[#e7eaf0]" />
          <div className="flex flex-1 flex-col items-end">
            <p className="text-[11px] text-[#666d85]">Open tasks</p>
            <p className="mt-0.5 text-[14px] font-bold text-[#1d2539]">{openTasks}</p>
          </div>
        </div>
        <div className="h-px w-full bg-[#eceef2]" />
        <div className="flex gap-3">
          <button onClick={onAssign} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[#f2f3f7] bg-white/70 py-2.5 text-[12px] font-semibold text-[#475067]">
            <AssignIcon /> Assign tasks
          </button>
          <button onClick={onTopUp} className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[12px] font-semibold text-white" style={{ backgroundImage: 'linear-gradient(180deg,#343d54,#1d2539)' }}>
            <TopUpIcon /> Top up wallet
          </button>
        </div>
        {asks > 0 && (
          <button onClick={onAsks} className="rounded-full bg-[#fff3ec] py-2.5 text-[12.5px] font-semibold text-[#f15a24]">
            {asks} purchase {asks === 1 ? 'request needs' : 'requests need'} your approval →
          </button>
        )}
        {open && removable && (
          <button onClick={onRemove} className="flex items-center justify-center gap-1.5 rounded-full border border-[#f5d6d3] bg-white py-2.5 text-[12.5px] font-semibold text-[#d2453b]">
            <Trash /> Remove {child.name} from family
          </button>
        )}
      </div>
    </div>
  )
}

/* ── activity row ────────────────────────────────────────────────── */
const CheckCircle = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#1aa251" />
    <path d="m7.5 12.2 3 3 6-6.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="13" rx="2.5" fill="#2563eb" />
    <rect x="3" y="9.5" width="18" height="2.5" fill="#1e49b8" />
    <rect x="6" y="15" width="5" height="1.8" rx="0.9" fill="#fff" />
  </svg>
)

function ActivityRow({ a }: { a: Activity }) {
  const isMoney = a.kind === 'topup' || a.kind === 'spend'
  const sub = a.kind === 'earn' || a.kind === 'task' ? `${a.when} · approved by you` : a.when
  return (
    <div className="flex items-center gap-2 py-3">
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-[#f2f3f7] bg-[#f9f9fb]">
        {isMoney ? <CardIcon /> : <CheckCircle />}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[14px] font-semibold text-[#475067]">{a.text}</p>
          {a.amount != null && (
            <span className="shrink-0 rounded-full bg-[#f2f3f7] px-2 py-1 text-[13px] font-semibold text-[#475067]">
              {a.sign} <Dirham />
              {a.amount}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[12px] text-[#666d85]">{sub}</p>
      </div>
    </div>
  )
}

export default function FamilyDashboard({ onBack, onAssign, onTopUp, onApprovals, onAddChild }: {
  onBack: () => void; onAssign: (childId: string) => void; onTopUp: (childId: string) => void; onApprovals: () => void; onAddChild: () => void
}) {
  const { children, activities, askStatus, activeChildId, removeChild } = useNano()

  return (
    <div className="relative h-full w-full overflow-y-auto no-scrollbar bg-[#f9f9fb] font-noon">
      <StatusBar />
      <div className="flex items-center gap-3 px-4 pb-1 pt-[52px]">
        <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(39,48,69,0.10)]">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1 1 7l6 6" stroke="#1d2539" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#1d2539]">Manage your family</h2>
      </div>

      <div className="flex flex-col gap-4 px-3 pb-16 pt-3">
        {/* family info */}
        <div className="overflow-hidden rounded-[16px] bg-white">
          <div className="flex items-center justify-between border-b border-[#eaecf0] px-3 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef1f5] text-[20px] font-extrabold text-[#5b6678]">A</span>
              <div>
                <p className="text-[18px] font-bold tracking-[-0.15px] text-[#1d2539]">Anmol’s Family</p>
                <p className="text-[12px] text-[#475067]">{children.length} {children.length === 1 ? 'kid' : 'kids'}</p>
              </div>
            </div>
            <button className="flex h-9 items-center gap-1 rounded-full border border-[#f2f3f7] bg-[#fcfcfd] px-2.5 text-[13px] font-semibold text-[#475067]">
              February <ChevDown />
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 px-4 pt-3">
            {children.map((c) => (
              <span key={c.id} className="flex h-9 items-center gap-1.5 rounded-full border border-[#f2f3f7] bg-[#fcfcfd] px-3 text-[12px] font-medium text-[#475067]">
                <Avatar child={c} size={16} />
                {c.name}
                <span className="h-2 w-2 rounded-full" style={{ background: c.tone }} />
              </span>
            ))}
          </div>

          <div className="relative flex items-center justify-center py-1">
            <Donut />
            <div className="absolute flex flex-col items-center">
              <p className="flex items-center gap-0.5 font-display text-[20px] font-extrabold text-[#1d2539]"><Dirham />1410</p>
              <p className="text-[11px] text-[#666d85]">spent this month</p>
            </div>
          </div>

          <div className="flex justify-center px-4 pb-3">
            <div className="flex gap-1 rounded-full bg-[#f9f9fb] p-1">
              <span className="flex items-center gap-1.5 rounded-[16px] border border-[#fcfcfd] bg-white px-2.5 py-2 text-[12px] font-semibold text-[#1d2539] shadow-[inset_0px_1px_4px_rgba(36,36,36,0.04)]">
                <UserGroup /> Spend per child
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-2 text-[12px] font-medium text-[#666d85]">
                <Squares /> Per Category
              </span>
            </div>
          </div>
        </div>

        {/* kids */}
        <div className="flex flex-col gap-3 rounded-[16px] bg-white p-3">
          <p className="text-[16px] font-semibold tracking-[-0.15px] text-[#101628]">Kids</p>
          <div className="h-px w-full bg-[#f2f3f7]" />
          {children.map((c) => (
            <motion.div key={c.id} layout>
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
          <div className="flex items-center gap-2">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-dashed border-[#cdd3dd]">
              <Plus />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[16px] font-bold tracking-[-0.15px] text-[#1d2539]">Add your child</p>
              <p className="text-[12px] text-[#666d85]">Give them access to noon nano</p>
            </div>
            <button onClick={onAddChild} className="rounded-full border border-[#f2f3f7] bg-[#f9f9fb] px-4 py-2.5 text-[12px] font-semibold text-[#475067]">
              Invite
            </button>
          </div>
        </div>

        {/* recent activity */}
        <div className="rounded-[16px] bg-white p-3">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-semibold tracking-[-0.15px] text-[#101628]">Recent activity</p>
            <button className="rounded-full px-1.5 text-[12px] font-semibold text-[#1d2539]">View all</button>
          </div>
          <div className="mt-1 divide-y divide-[#f2f3f7]">
            {activities.slice(0, 6).map((a) => (
              <ActivityRow key={a.id} a={a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
