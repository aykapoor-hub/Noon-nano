import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import Dirham from '../../components/Dirham'
import { useNano } from '../../state'

function Item({
  name,
  price,
  was,
  off,
  eta,
  via,
}: {
  name: string
  price: number
  was?: number
  off?: string
  eta: string
  via: 'supermall' | 'noon'
}) {
  return (
    <div className="flex gap-3 px-4 py-3.5">
      <div className="relative h-[68px] w-[68px] shrink-0 rounded-xl bg-[#eef1f5]">
        <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-1.5 py-0.5 text-[11px] shadow-chip">
          <span className="text-[#9aa3b8]">–</span>
          <span className="font-semibold text-ink">1</span>
          <span className="text-[#9aa3b8]">+</span>
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <p className="flex-1 text-[14px] font-semibold leading-snug text-ink">{name}</p>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563eb]">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="m1 4 3 3 5-6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <p className="mt-1 text-[14px] font-bold text-ink">
          <Dirham />
          {price}
          {was && <span className="ml-1 text-[12px] font-medium text-[#9aa3b8] line-through">{was}</span>}
          {off && <span className="ml-1 text-[12px] font-semibold text-[#1f9d57]">{off}</span>}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="rounded-md bg-[#eef4ff] px-1.5 py-0.5 text-[11.5px] font-medium text-[#2563eb]">
            {eta.includes('Tomorrow') ? 'Get it by ' : 'Get in '}
            <span className="font-bold">{eta}</span>
          </span>
          {via === 'supermall' ? (
            <span className="rounded-md bg-[#1f20b7] px-1.5 py-0.5 text-[10px] font-extrabold italic text-[#ffd900]">
              supermall
            </span>
          ) : (
            <span className="rounded-md bg-[#ffd900] px-1.5 py-0.5 text-[10px] font-extrabold italic text-ink">express</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ApprovalRequired({
  onBack,
  onApprove,
  onReject,
}: {
  onBack: () => void
  onApprove: () => void
  onReject: () => void
}) {
  const { balance, cart, cartTotal, askNote } = useNano()
  const short = Math.max(0, +(cartTotal - balance).toFixed(2))
  const pct = Math.min(100, Math.round((balance / cartTotal) * 100))

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader title="Approval required" onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 pt-1">
        {/* wallet balance + short */}
        <div className="rounded-2xl bg-[#f7f8fa] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#7d8aa0]">Wallet balance</span>
            <span className="text-[13px] text-[#7d8aa0]">Short by</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-0.5 text-[18px] font-bold text-ink">
              <Dirham />
              {balance}
            </span>
            <span className="flex items-center gap-0.5 text-[16px] font-bold text-[#f15a24]">
              <Dirham />
              {short}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#fad9c4]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#7db3f5] to-[#2563eb]" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* request */}
        <div className="mt-4 rounded-2xl bg-[#f6f9ff] p-4">
          <div className="flex items-center gap-3">
            <span className="h-11 w-11 rounded-full bg-[#dbe6fb]" />
            <div>
              <p className="text-[15px] font-bold text-ink">Kiaan has sent an order request</p>
              <p className="text-[12.5px] text-[#7d8aa0]">{cart.length} items need approval</p>
            </div>
          </div>
          <div className="mt-3 w-fit max-w-full rounded-2xl rounded-tl-md bg-[#2563eb] px-3.5 py-2.5 text-[13.5px] font-medium text-white">
            {askNote || 'Dad I need it to make perfect summer outfit.'}
          </div>
        </div>

        {/* items */}
        <div className="mt-3 divide-y divide-[#f1f3f6] overflow-hidden rounded-2xl ring-1 ring-[#f1f3f6]">
          {cart.map((it) => (
            <Item key={it.id} {...it} />
          ))}
          <p className="bg-[#f6f9ff] py-2.5 text-center text-[13px] font-semibold text-[#2563eb]">
            {cart.length} items selected
          </p>
        </div>
      </div>

      {/* actions */}
      <div className="flex items-center gap-3 px-5 pb-9 pt-3">
        <button
          onClick={onReject}
          className="flex-1 rounded-full bg-[#f4f5f8] py-4 text-[15px] font-semibold text-[#6b7488]"
        >
          Reject order
        </button>
        <button
          onClick={onApprove}
          className="flex-1 rounded-full bg-navy py-4 text-[15px] font-semibold text-white"
          style={{ backgroundImage: 'linear-gradient(180deg, #2d3750 0%, #232b3e 100%)' }}
        >
          Approve order
        </button>
      </div>
    </div>
  )
}
