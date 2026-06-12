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
      {/* centering lives on this static wrapper — framer-motion owns the inner
          element's transform, so translate classes there would be overwritten */}
      <div className="absolute inset-x-0 top-[41%] flex -translate-y-1/2 justify-center">
        <motion.img
          src="/assets/logo.png"
          alt="noon nano"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.15 }}
          className="w-[235px]"
          draggable={false}
        />
      </div>
    </div>
  )
}
