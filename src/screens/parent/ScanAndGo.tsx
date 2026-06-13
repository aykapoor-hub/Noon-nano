import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import QRBlock from '../../components/QRBlock'

export default function ScanAndGo({
  onBack,
  onScan,
  onNext,
}: {
  onBack: () => void
  onScan: () => void
  onNext: () => void
}) {
  return (
    <div className="relative flex h-full w-full flex-col bg-navy-deep text-white">
      <StatusBar light />
      <NavHeader title="Send them invite" onBack={onBack} light />

      <div className="flex flex-1 flex-col items-center px-8 pt-6">
        <h1 className="font-display text-[32px] font-extrabold tracking-tight">Scan and Go!</h1>
        <p className="mt-2 text-center text-[14px] text-[#aab3c5]">
          Kiaan can join noon nano by scanning<br />this QR code with their phone
        </p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="mt-10 rounded-[28px] bg-white p-6 shadow-card"
        >
          <QRBlock size={188} />
        </motion.div>

        <p className="mt-6 rounded-full bg-white/10 px-4 py-2 text-[13.5px] font-medium tracking-wide">
          invite.noon.com/Kiaan
        </p>

        {/* prototype affordance: jump to the child's device as if they scanned */}
        <button
          onClick={onScan}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-white/10 py-3.5 text-[14px] font-semibold text-white ring-1 ring-white/20"
        >
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
            <path d="M2 5V3a1 1 0 0 1 1-1h2M15 5V3a1 1 0 0 0-1-1h-2M2 12v2a1 1 0 0 0 1 1h2M15 12v2a1 1 0 0 1-1 1h-2M5 8.5h7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Simulate scan on Kiaan’s phone
        </button>

        <button
          onClick={onNext}
          className="mb-9 mt-3 w-full rounded-full bg-white py-4 text-[15px] font-semibold text-ink"
        >
          Next
        </button>
      </div>
    </div>
  )
}
