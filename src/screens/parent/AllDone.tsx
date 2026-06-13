import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import PrimaryButton from '../../components/PrimaryButton'
import SuccessCheck from '../../components/SuccessCheck'
import Dirham from '../../components/Dirham'

export default function AllDone({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader title="All done!" onBack={onBack} />

      <div className="flex flex-1 flex-col items-center justify-center px-8 pb-20">
        <SuccessCheck tone="gold" size={104} />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-7 font-display text-[28px] font-extrabold tracking-tight text-ink"
        >
          Kiaan is all set!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-3 text-center text-[14.5px] leading-relaxed text-[#9aa3b8]"
        >
          You’ll get a notification when Kiaan signs in
          <br />
          and earns their first{' '}
          <span className="font-semibold text-ink">
            <Dirham />50
          </span>
        </motion.p>
      </div>

      <div className="px-5 pb-9">
        <PrimaryButton label="Done" onClick={onDone} />
      </div>
    </div>
  )
}
