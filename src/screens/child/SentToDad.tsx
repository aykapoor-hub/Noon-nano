import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import PrimaryButton from '../../components/PrimaryButton'
import SuccessCheck from '../../components/SuccessCheck'

export default function SentToDad({ onBack, onExplore }: { onBack: () => void; onExplore: () => void }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader onBack={onBack} />

      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-20">
        <span className="mb-6 rounded-full bg-[#fff3ec] px-3 py-1.5 text-[12.5px] font-semibold text-[#f15a24]">
          Approval pending
        </span>
        <SuccessCheck tone="green" size={104} />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-7 font-display text-[30px] font-extrabold tracking-tight text-ink"
        >
          Sent to Dad
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 text-center text-[14.5px] leading-relaxed text-[#9aa3b8]"
        >
          We’ll let you know the moment your
          <br />
          order is approved.
        </motion.p>
      </div>

      <div className="px-5 pb-9">
        <PrimaryButton label="Back to exploring" onClick={onExplore} />
      </div>
    </div>
  )
}
