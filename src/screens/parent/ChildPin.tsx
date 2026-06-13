import { useState } from 'react'
import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import PrimaryButton from '../../components/PrimaryButton'

const Backspace = () => (
  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
    <path
      d="M8.7 1.5h13.1A2.7 2.7 0 0 1 24.5 4.2v11.6a2.7 2.7 0 0 1-2.7 2.7H8.7a2.7 2.7 0 0 1-2-.9L1.6 12a2.7 2.7 0 0 1 0-3.8L6.7 2.4a2.7 2.7 0 0 1 2-.9Z"
      stroke="#16181d"
      strokeWidth="1.5"
    />
    <path d="m12 6.7 6.6 6.6m0-6.6L12 13.3" stroke="#16181d" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function ChildPin({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [pin, setPin] = useState<string[]>([])
  const complete = pin.length === 4
  const press = (k: string) =>
    k === 'back' ? setPin((p) => p.slice(0, -1)) : setPin((p) => (p.length < 4 ? [...p, k] : p))
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader title="One last thing" onBack={onBack} />

      <div className="flex flex-1 flex-col items-center px-6 pt-6">
        <h1 className="font-display text-[30px] font-extrabold tracking-tight text-ink">Set up a PIN</h1>
        <p className="mt-2 text-center text-[14px] text-[#9aa3b8]">
          Kiaan will use this to login and<br />confirm purchases on noon nano
        </p>

        <div className="mt-9 flex gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex h-[72px] w-16 items-center justify-center rounded-2xl ${
                pin.length === i ? 'border-[1.5px] border-navy bg-white' : 'bg-[#f4f5f8]'
              }`}
            >
              {pin[i] && (
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-[30px] font-extrabold text-navy"
                >
                  {pin[i]}
                </motion.span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto w-full pb-4 pt-6">
          <PrimaryButton label="Set PIN" disabled={!complete} onClick={onNext} />
        </div>
      </div>

      <div className="bg-key-bg px-1.5 pb-7 pt-2">
        <div className="grid grid-cols-3 gap-x-1.5 gap-y-2">
          {keys.map((k, i) =>
            k === '' ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                onClick={() => press(k)}
                className={`flex h-11 items-center justify-center rounded-[6px] text-[24px] text-ink active:bg-[#c9cdd3] ${
                  k === 'back' ? '' : 'bg-white shadow-key'
                }`}
              >
                {k === 'back' ? <Backspace /> : k}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
