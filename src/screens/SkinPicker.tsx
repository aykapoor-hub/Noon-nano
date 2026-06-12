import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import PrimaryButton from '../components/PrimaryButton'
import Stepper from '../components/Stepper'
import WalletCard from '../components/WalletCard'

export type Skin = 'purple' | 'silver' | 'blue' | 'green' | 'dark'

const SKINS: Skin[] = ['purple', 'silver', 'blue', 'green', 'dark']

const THUMB_W = 74
const THUMB_GAP = 14

export default function SkinPicker({
  onConfirm,
  onSkip,
}: {
  onConfirm: (skin: Skin) => void
  onSkip: () => void
}) {
  const [idx, setIdx] = useState(2) // blue is the default
  const skin: Skin = SKINS[idx]

  // translate strip so the selected thumb sits at screen centre
  const offset = ((SKINS.length - 1) / 2 - idx) * (THUMB_W + THUMB_GAP)

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-white">
      <div
        className="grid-paper absolute inset-0"
        style={{
          maskImage: 'linear-gradient(180deg, black 0%, transparent 40%)',
          WebkitMaskImage: 'linear-gradient(180deg, black 0%, transparent 40%)',
        }}
      />
      <StatusBar />

      <div className="relative z-10 mt-[74px] flex flex-col items-center">
        <Stepper step={1} />
        <h1 className="headline-gradient mt-5 font-display text-[30px] font-extrabold tracking-tight">
          Pick your card skin
        </h1>
        <p className="mt-2 text-[15px] font-medium text-[#aab3c5]">
          make your card uniquely yours
        </p>
      </div>

      {/* big card */}
      <div className="relative z-10 mt-9 flex h-[210px] items-center justify-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={skin}
            initial={{ opacity: 0, scale: 0.86, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <WalletCard skin={skin} balance="0.00" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* carousel */}
      <div className="relative z-10 mt-auto">
        <div className="relative flex justify-center">
          <motion.div
            animate={{ x: offset }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="flex items-center"
            style={{ gap: THUMB_GAP }}
          >
            {SKINS.map((s, i) => (
              <button
                key={s}
                onClick={() => setIdx(i)}
                className={`shrink-0 rounded-[10px] transition-all duration-200 ${
                  i === idx ? 'border-[1.5px] border-ink bg-white p-1' : 'p-[2.5px]'
                }`}
                style={{ width: i === idx ? THUMB_W + 14 : THUMB_W }}
              >
                <img
                  src={`/assets/thumb_${s}.png`}
                  alt={s}
                  className="w-full rounded-[7px]"
                  draggable={false}
                />
              </button>
            ))}
          </motion.div>
        </div>

        <button
          onClick={onSkip}
          className="mx-auto mt-7 block text-center text-[14px] font-medium text-[#aab3c5] underline underline-offset-2"
        >
          Skip for now
        </button>

        <div className="px-6 pb-9 pt-5">
          <PrimaryButton label="Confirm skin" onClick={() => onConfirm(skin)} />
        </div>
      </div>
    </div>
  )
}
