import { useState } from 'react'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import Dirham from '../../components/Dirham'
import { useNano, type CartItem } from '../../state'

function Line({ it }: { it: CartItem }) {
  return (
    <div className="flex gap-3 px-4 py-3.5">
      <div className="relative h-[72px] w-[72px] shrink-0 rounded-xl bg-[#eef1f5]">
        <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-1.5 py-0.5 text-[11px] shadow-chip">
          <span className="text-[#9aa3b8]">–</span>
          <span className="font-semibold text-ink">1</span>
          <span className="text-[#9aa3b8]">+</span>
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold leading-snug text-ink">{it.name}</p>
        <p className="mt-1 text-[14px] font-bold text-ink">
          <Dirham />
          {it.price}
          {it.was && <span className="ml-1 text-[12px] font-medium text-[#9aa3b8] line-through">{it.was}</span>}
          {it.off && <span className="ml-1 text-[12px] font-semibold text-[#1f9d57]">{it.off}</span>}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="rounded-md bg-[#eef4ff] px-1.5 py-0.5 text-[11.5px] font-medium text-[#2563eb]">
            {it.eta.includes('Tomorrow') ? 'Get it by ' : 'Get in '}
            <span className="font-bold">{it.eta}</span>
          </span>
          {it.via === 'supermall' ? (
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

export default function Cart({ onBack, onSend }: { onBack: () => void; onSend: () => void }) {
  const { balance, cart, cartTotal, sendForApproval } = useNano()
  const [note, setNote] = useState('')
  const short = Math.max(0, +(cartTotal - balance).toFixed(2))
  const needsApproval = short > 0
  const pct = Math.min(100, Math.round((balance / cartTotal) * 100))

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader
        title="Cart"
        onBack={onBack}
        right={
          <span className="flex items-center gap-1 rounded-full bg-[#f1f3f6] px-3 py-1.5 text-[13px] font-semibold text-ink">
            Deliver to: Home
            <svg width="9" height="6" viewBox="0 0 9 6" fill="none">
              <path d="m1 1 3.5 3.5L8 1" stroke="#16181d" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
        }
      />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4 pt-1">
        {/* wallet meter */}
        <div className="rounded-2xl bg-[#f7f8fa] p-4">
          <div className="flex items-center justify-between text-[13px] text-[#7d8aa0]">
            <span>Wallet balance</span>
            {needsApproval && <span>Short by</span>}
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-0.5 text-[18px] font-bold text-ink">
              <Dirham />
              {balance.toFixed(2)}
            </span>
            {needsApproval && (
              <span className="flex items-center gap-0.5 text-[16px] font-bold text-[#f15a24]">
                <Dirham />
                {short}
              </span>
            )}
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#fad9c4]">
            <div className="h-full rounded-full bg-gradient-to-r from-[#7db3f5] to-[#2563eb]" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {needsApproval && (
          <p className="mt-4 flex items-center justify-center gap-1.5 rounded-t-2xl bg-[#f6f9ff] py-2.5 text-[14px] font-semibold text-[#2563eb]">
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none">
              <rect x="1.5" y="6" width="10" height="7" rx="1.5" stroke="#2563eb" strokeWidth="1.3" />
              <path d="M3.5 6V4a3 3 0 0 1 6 0v2" stroke="#2563eb" strokeWidth="1.3" />
            </svg>
            Need parent’s approval
          </p>
        )}
        <div className={`divide-y divide-[#f1f3f6] overflow-hidden ${needsApproval ? 'rounded-b-2xl bg-[#fbfdff]' : 'mt-4 rounded-2xl'} ring-1 ring-[#f1f3f6]`}>
          {cart.map((it) => (
            <Line key={it.id} it={it} />
          ))}
        </div>

        {needsApproval && (
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for mom or dad…"
            className="mt-4 w-full rounded-xl bg-[#f4f5f8] px-4 py-3.5 text-[14px] text-ink outline-none placeholder:text-[#aab3c5]"
          />
        )}
      </div>

      <div className="px-5 pb-9 pt-3">
        <button
          onClick={() => {
            if (needsApproval) sendForApproval(note || 'Dad I need it to make perfect summer outfit.')
            onSend()
          }}
          className="h-14 w-full rounded-full text-[16px] font-semibold text-white"
          style={{
            backgroundImage: needsApproval
              ? 'linear-gradient(180deg, #2d3750 0%, #232b3e 100%)'
              : 'linear-gradient(180deg, #2f6df0 0%, #2563eb 100%)',
          }}
        >
          {needsApproval ? 'Send for approval' : 'Place order'}
        </button>
      </div>
    </div>
  )
}
