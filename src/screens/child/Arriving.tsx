import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import PrimaryButton from '../../components/PrimaryButton'
import { useNano } from '../../state'

export default function Arriving({ onBack, onExplore }: { onBack: () => void; onExplore: () => void }) {
  const { cart } = useNano()
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader onBack={onBack} />

      <div className="flex flex-1 flex-col px-6 pt-2">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex w-fit items-center gap-1.5 rounded-full bg-[#eafaf0] px-3 py-1.5 text-[12.5px] font-semibold text-[#1f9d57]"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="6" fill="#1f9d57" />
            <path d="m3.5 6.7 2 2 4-4.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Order confirmed
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 font-display text-[32px] font-extrabold leading-tight tracking-tight text-ink"
        >
          Arriving in
          <br />
          1h 12min
        </motion.h1>

        <div className="mt-7 space-y-3">
          {cart.map((it) => (
            <div key={it.id} className="flex items-center gap-3 rounded-2xl bg-[#f7f8fa] p-3">
              <span className="h-14 w-14 shrink-0 rounded-xl bg-[#eef1f5]" />
              <p className="text-[13.5px] font-semibold leading-snug text-ink">{it.name}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-1 items-center">
              <span className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-[#1f9d57]' : 'bg-[#dfe3ea]'}`} />
              {i < 3 && <span className={`h-0.5 flex-1 ${i === 0 ? 'bg-[#1f9d57]' : 'bg-[#dfe3ea]'}`} />}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[11px] font-medium text-[#9aa3b8]">
          <span>Confirmed</span>
          <span>Packed</span>
          <span>On the way</span>
          <span>Delivered</span>
        </div>
      </div>

      <div className="px-5 pb-9 pt-3">
        <PrimaryButton label="Back to exploring" onClick={onExplore} />
      </div>
    </div>
  )
}
