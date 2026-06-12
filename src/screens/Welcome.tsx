import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'
import PrimaryButton from '../components/PrimaryButton'
import WalletCard from '../components/WalletCard'

// circle collage positions lifted from the Figma frame (375x812 space)
const CIRCLES = [
  { src: 'c_speaker', x: 26, y: 26, s: 78 },
  { src: 'c_sneaker', x: 193, y: 70, s: 78 },
  { src: 'c_headphone', x: 42, y: 194, s: 76 },
  { src: 'c_figurine', x: 302, y: 205, s: 66 },
  { src: 'c_gamepad', x: 92, y: 512, s: 72 },
  { src: 'c_car', x: 246, y: 642, s: 84 },
  { src: 'c_backpack', x: 82, y: 704, s: 84 },
]

export default function Welcome({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<'burst' | 'wallet'>('burst')

  useEffect(() => {
    const t = setTimeout(() => setPhase('wallet'), 2300)
    return () => clearTimeout(t)
  }, [])

  const burst = phase === 'burst'

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* yellow gradient + orbits + circles, fades away after the burst */}
      <AnimatePresence>
        {burst && (
          <motion.div
            key="burst"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #fff5d0 0%, #fffae5 18%, #ffffff 42%, #ffffff 62%, #fff9e7 100%)',
            }}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 375 812" fill="none">
              <ellipse
                cx="187"
                cy="235"
                rx="235"
                ry="150"
                stroke="#dcd5bd"
                strokeWidth="1.2"
                strokeDasharray="5 7"
                transform="rotate(-7 187 235)"
              />
              <ellipse
                cx="187"
                cy="620"
                rx="245"
                ry="160"
                stroke="#dcd5bd"
                strokeWidth="1.2"
                strokeDasharray="5 7"
                transform="rotate(5 187 620)"
              />
            </svg>
            {CIRCLES.map((c, i) => (
              <motion.img
                key={c.src}
                src={`/assets/${c.src}.png`}
                alt=""
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 17,
                  delay: 0.25 + i * 0.09,
                }}
                className="absolute rounded-full shadow-[0_10px_26px_rgba(120,100,40,0.16)]"
                style={{ left: c.x, top: c.y, width: c.s, height: c.s }}
                draggable={false}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* grid paper backdrop for the wallet reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: burst ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="grid-paper absolute inset-0"
        style={{
          maskImage: 'linear-gradient(180deg, black 0%, transparent 55%)',
          WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 55%)',
        }}
      />

      <StatusBar />

      {/* welcome text: big & centered during burst, small & top after */}
      <motion.h1
        layout
        initial={false}
        animate={
          burst
            ? { top: '50%', y: '-50%', scale: 1 }
            : { top: 108, y: 0, scale: 0.62 }
        }
        transition={{ type: 'spring', stiffness: 130, damping: 19 }}
        className="headline-gradient absolute inset-x-0 z-10 text-center font-display text-[46px] font-extrabold leading-[1.06] tracking-tight"
      >
        Welcome,
        <br />
        Kiaan!
      </motion.h1>

      {/* wallet reveal */}
      <AnimatePresence>
        {!burst && (
          <motion.div
            key="wallet"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }}
            className="absolute inset-0 flex flex-col items-center px-6 pt-[252px]"
          >
            <motion.span
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[#b9c0d4]"
            >
              Your wallet
            </motion.span>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
              className="headline-gradient mt-2 font-display text-[26px] font-extrabold tracking-tight"
            >
              this one’s yours
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.82, y: 30, rotate: -2 },
                show: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotate: 0,
                  transition: { type: 'spring', stiffness: 200, damping: 19 },
                },
              }}
              className="mt-6"
            >
              <WalletCard skin="blue" balance="Đ0.00" />
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="mt-6 text-[14px] font-medium text-[#aab3c5]"
            >
              Empty for now. Lets change that
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
              className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#eceef1] font-display text-[20px] font-extrabold text-[#c2c7d0] shadow-inner"
            >
              Đ
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="mt-auto w-full pb-9"
            >
              <PrimaryButton label="Continue" onClick={onNext} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
