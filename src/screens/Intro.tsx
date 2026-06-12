import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import PrimaryButton from '../components/PrimaryButton'

export default function Intro({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative flex h-full w-full flex-col"
      style={{
        background: 'linear-gradient(180deg, #fbfdff 0%, #eef5fd 70%, #e2edf9 100%)',
      }}
    >
      <StatusBar />
      <motion.img
        src="/assets/intro_hero.png"
        alt="A place to shop, save & earn!"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-[45px] w-full"
        draggable={false}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: 'easeOut' }}
        className="absolute inset-x-6 bottom-9"
      >
        <PrimaryButton label="Let’s go" onClick={onNext} />
      </motion.div>
    </div>
  )
}
