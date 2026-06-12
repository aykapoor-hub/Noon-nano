import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import PrimaryButton from '../components/PrimaryButton'
import Stepper from '../components/Stepper'

const ITEMS = [
  { id: 'art', label: 'Art' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'sports', label: 'Sports' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'lego', label: 'Lego' },
  { id: 'pets', label: 'Pets' },
  { id: 'science', label: 'Science' },
  { id: 'anime', label: 'Anime' },
]

export default function Interests({ onDone }: { onDone: (picked: string[]) => void }) {
  const [picked, setPicked] = useState<string[]>([])
  const ready = picked.length >= 3

  const toggle = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />

      <div className="mt-[74px] flex flex-col items-center">
        <Stepper step={ready ? 3 : 2} />
        <h1 className="headline-gradient mt-5 font-display text-[32px] font-extrabold tracking-tight">
          your interests
        </h1>
        <p className="mt-2 text-[15px] font-medium text-[#aab3c5]">
          Pick at least 3 interests
        </p>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3.5 px-6">
        {ITEMS.map((item) => {
          const sel = picked.includes(item.id)
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(item.id)}
              className={`relative h-[88px] overflow-hidden rounded-2xl text-left transition-colors duration-200 ${
                sel ? 'border-[1.5px] border-navy bg-white' : 'bg-[#f6f7f9]'
              }`}
            >
              <span className="absolute left-3.5 top-3 text-[16px] font-semibold text-navy">
                {item.label}
              </span>
              <img
                src={`/assets/i_${item.id}.png`}
                alt=""
                className="absolute bottom-0 right-0 w-[68px]"
                draggable={false}
              />
              <AnimatePresence>
                {sel && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                    className="absolute right-2.5 top-2.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-navy"
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4 3.7 6.7 9 1.2"
                        stroke="#fff"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-auto">
        <button
          onClick={() => onDone([])}
          className="mx-auto block text-center text-[14px] font-medium text-[#aab3c5] underline underline-offset-2"
        >
          Skip for now
        </button>
        <div className="px-6 pb-9 pt-5">
          <PrimaryButton
            label="Start exploring"
            disabled={!ready}
            onClick={() => onDone(picked)}
          />
        </div>
      </div>
    </div>
  )
}
