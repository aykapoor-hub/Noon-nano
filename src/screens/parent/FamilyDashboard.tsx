import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import Dirham from '../../components/Dirham'
import { useNano } from '../../state'

function Donut() {
  // simple two-segment donut: spent (green) vs remainder (dark)
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <svg width="170" height="170" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#14532d" strokeWidth="20" />
      <motion.circle
        cx="70"
        cy="70"
        r={r}
        fill="none"
        stroke="#2f9e63"
        strokeWidth="20"
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

function KidRow({
  name,
  age,
  balance,
  asks,
  tasks,
  onAssign,
  onTopUp,
  onAsks,
  primary,
}: {
  name: string
  age: number
  balance: number
  asks: number
  tasks: number
  onAssign: () => void
  onTopUp: () => void
  onAsks?: () => void
  primary?: boolean
}) {
  return (
    <div className="border-t border-[#f1f3f6] pt-4">
      <div className="flex items-center gap-3">
        <span className="h-11 w-11 rounded-full bg-[#eef1f5]" />
        <div>
          <p className="text-[16px] font-bold text-ink">{name}</p>
          <p className="text-[12.5px] text-[#7d8aa0]">{age} • On nano since Jun’26</p>
        </div>
        <svg className="ml-auto" width="7" height="12" viewBox="0 0 7 12" fill="none">
          <path d="m1 1 5 5-5 5" stroke="#b8c0cf" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-3 grid grid-cols-3 rounded-xl bg-[#f7f8fa] py-3 text-center">
        {[
          ['Balance', null],
          ['Asks pending', asks],
          ['Open tasks', tasks],
        ].map(([label], i) => (
          <div key={i} className={i < 2 ? 'border-r border-[#e7eaf0]' : ''}>
            <p className="text-[11.5px] text-[#7d8aa0]">{label as string}</p>
            {i === 0 ? (
              <p className="mt-0.5 flex items-center justify-center gap-0.5 text-[15px] font-bold text-ink">
                <Dirham />
                {balance}
              </p>
            ) : i === 1 ? (
              <button onClick={onAsks} className="mt-0.5 text-[15px] font-bold text-ink underline-offset-2 hover:underline">
                {asks}
              </button>
            ) : (
              <p className="mt-0.5 text-[15px] font-bold text-ink">{tasks}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2.5">
        <button
          onClick={onAssign}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white py-3 text-[13.5px] font-semibold text-ink shadow-chip ring-1 ring-[#eceef2]"
        >
          ✦ Assign tasks
        </button>
        <button
          onClick={onTopUp}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy py-3 text-[13.5px] font-semibold text-white"
        >
          ✦ Top up wallet
        </button>
      </div>
      {primary && asks > 0 && (
        <button
          onClick={onAsks}
          className="mt-2.5 w-full rounded-full bg-[#fff3ec] py-2.5 text-[13px] font-semibold text-[#f15a24]"
        >
          {asks} purchase {asks === 1 ? 'request needs' : 'requests need'} your approval →
        </button>
      )}
    </div>
  )
}

export default function FamilyDashboard({
  onBack,
  onAssign,
  onTopUp,
  onApprovals,
}: {
  onBack: () => void
  onAssign: () => void
  onTopUp: () => void
  onApprovals: () => void
}) {
  const { balance, askStatus } = useNano()
  const kiaanAsks = askStatus === 'pending' ? 1 : 0
  const openTasks = 3

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
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef1f5] text-[18px] font-extrabold text-[#5b6678]">
              A
            </span>
            <div>
              <p className="text-[18px] font-bold text-ink">Anmol’s Family</p>
              <p className="text-[12.5px] text-[#7d8aa0]">2 kids</p>
            </div>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[#f4f6f9] px-3 py-1.5 text-[13px] font-semibold text-ink">
              February
              <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="m1 1 3.5 3.5L8 1" stroke="#16181d" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {['Alex', 'Sara'].map((n, i) => (
              <span key={n} className="flex items-center gap-1.5 rounded-full bg-[#f4f6f9] px-3.5 py-1.5 text-[13px] font-medium text-ink">
                {n}
                <span className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-[#2f9e63]' : 'bg-[#14532d]'}`} />
              </span>
            ))}
          </div>

          <div className="relative mt-3 flex items-center justify-center">
            <Donut />
            <div className="absolute text-center">
              <p className="flex items-center justify-center gap-0.5 font-display text-[26px] font-extrabold text-ink">
                <Dirham />1410
              </p>
              <p className="text-[12px] text-[#7d8aa0]">spent this month</p>
            </div>
          </div>

          <div className="mt-3 flex justify-center gap-2 rounded-full bg-[#f4f6f9] p-1">
            <span className="flex-1 rounded-full bg-white py-2 text-center text-[13px] font-semibold text-ink shadow-chip">
              ♟ Spend per child
            </span>
            <span className="flex-1 py-2 text-center text-[13px] font-medium text-[#7d8aa0]">Per Category</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-chip">
          <p className="text-[18px] font-bold text-ink">Kids</p>
          <motion.div layout className="mt-2">
            <KidRow
              name="Kiaan"
              age={13}
              balance={balance}
              asks={kiaanAsks}
              tasks={openTasks}
              onAssign={onAssign}
              onTopUp={onTopUp}
              onAsks={onApprovals}
              primary
            />
          </motion.div>
          <div className="mt-4">
            <KidRow
              name="Sara"
              age={11}
              balance={53}
              asks={0}
              tasks={2}
              onAssign={onAssign}
              onTopUp={onTopUp}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
