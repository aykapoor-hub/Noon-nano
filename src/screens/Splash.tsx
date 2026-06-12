import { motion } from 'framer-motion'
import { useEffect } from 'react'
import StatusBar from '../components/StatusBar'

export default function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="beams relative h-full w-full"
      style={{
        background:
          'radial-gradient(120% 60% at 50% 42%, #fbfdff 0%, #f3f8fe 55%, #e2edf9 100%)',
      }}
    >
      <StatusBar />
      <motion.img
        src="/assets/logo.png"
        alt="noon nano"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.15 }}
        className="absolute left-1/2 top-[41%] w-[235px] -translate-x-1/2 -translate-y-1/2"
        draggable={false}
      />
    </div>
  )
}
