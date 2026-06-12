import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import PrimaryButton from '../components/PrimaryButton'
import { asset } from '../lib/asset'

export default function Intro({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #dbeafb 0%, #cfe2f8 35%, #c9dff7 60%, #c9dff7 100%)',
      }}
    >
      {/* spotlight from top centre — corners stay blue like the design */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 52% at 50% -6%, rgba(255,255,255,0.95) 35%, rgba(255,255,255,0) 100%)',
        }}
      />
      <StatusBar />

      <motion.img
        src={asset('logo.png')}
        alt="noon nano"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative mx-auto mt-[112px] w-[182px]"
        draggable={false}
      />

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
        className="relative mt-4 text-center font-display text-[33px] font-extrabold leading-[1.2] tracking-tight text-ink"
      >
        A place to shop,
        <br />
        save &amp; earn!
      </motion.h1>

      <motion.img
        src={asset('intro_collage.png')}
        alt=""
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.2 }}
        className="absolute left-[30px] top-[344px] w-[322px]"
        draggable={false}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
        className="absolute inset-x-6 bottom-9"
      >
        <PrimaryButton label="Let’s go" onClick={onNext} />
      </motion.div>
    </div>
  )
}
