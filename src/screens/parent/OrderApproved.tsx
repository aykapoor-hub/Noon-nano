import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import PrimaryButton from '../../components/PrimaryButton'
import SuccessCheck from '../../components/SuccessCheck'

export default function OrderApproved({ onDone }: { onDone: () => void }) {
  return (
    <div
      className="relative flex h-full w-full flex-col"
      style={{ background: 'radial-gradient(120% 60% at 50% 30%, #eafaf0 0%, #f4f6f9 60%)' }}
    >
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-16">
        <SuccessCheck tone="green" size={108} />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-7 text-center font-display text-[26px] font-extrabold tracking-tight text-ink"
        >
          Order has been approved
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 text-center text-[14.5px] leading-relaxed text-[#7d8aa0]"
        >
          Kiaan’s order is on its way. We’ll let
          <br />
          them know the good news.
        </motion.p>
      </div>
      <div className="px-5 pb-9">
        <PrimaryButton label="Back to family" onClick={onDone} />
      </div>
    </div>
  )
}
