import { useState } from 'react'
import Sheet from '../../components/Sheet'
import PrimaryButton from '../../components/PrimaryButton'
import Dirham from '../../components/Dirham'
import { useNano } from '../../state'

const AMOUNTS = [10, 20, 50, 100]

export default function TopUpSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addBalance, childName } = useNano()
  const [amt, setAmt] = useState(20)
  return (
    <Sheet open={open} onClose={onClose}>
      <p className="text-[19px] font-bold text-ink">Top up {childName}’s wallet</p>
      <p className="mt-1 text-[13.5px] text-[#7d8aa0]">Money lands in their wallet instantly</p>

      <div className="mt-5 flex items-center justify-center gap-1 py-2">
        <Dirham className="text-[#9aa3b8]" />
        <span className="font-display text-[44px] font-extrabold text-ink">{amt}</span>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2.5">
        {AMOUNTS.map((a) => (
          <button
            key={a}
            onClick={() => setAmt(a)}
            className={`flex items-center justify-center gap-0.5 rounded-xl py-3 text-[15px] font-bold transition-colors ${
              amt === a ? 'bg-navy text-white' : 'bg-[#f4f5f8] text-ink'
            }`}
          >
            <Dirham />
            {a}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <PrimaryButton
          label="Add money"
          onClick={() => {
            addBalance(amt)
            onClose()
          }}
        />
      </div>
    </Sheet>
  )
}
