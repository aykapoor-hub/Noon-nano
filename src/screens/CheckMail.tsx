import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import StatusBar from '../components/StatusBar'
import PrimaryButton from '../components/PrimaryButton'
import { asset } from '../lib/asset'

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

function Keypad({ onKey }: { onKey: (k: string) => void }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']
  return (
    <div className="bg-key-bg px-1.5 pb-7 pt-2">
      <div className="grid grid-cols-3 gap-x-1.5 gap-y-2">
        {keys.map((k, i) =>
          k === '' ? (
            <span key={i} />
          ) : (
            <button
              key={i}
              onClick={() => onKey(k)}
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
  )
}

export default function CheckMail({ onNext }: { onNext: () => void }) {
  const [digits, setDigits] = useState<string[]>([])
  const [keypadOpen, setKeypadOpen] = useState(false)
  const complete = digits.length === 4

  useEffect(() => {
    const t = setTimeout(() => setKeypadOpen(true), 1100)
    return () => clearTimeout(t)
  }, [])

  const press = (k: string) => {
    if (k === 'back') setDigits((d) => d.slice(0, -1))
    else if (digits.length < 4) setDigits((d) => [...d, k])
  }

  const activeIdx = Math.min(digits.length, 3)

  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />

      {/* envelope hero — collapses when the keypad rises */}
      <motion.div
        initial={false}
        animate={{ height: keypadOpen ? 46 : 240, opacity: keypadOpen ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        className="relative w-full overflow-hidden"
      >
        <motion.img
          src={asset('envelope_band.png')}
          alt=""
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mt-[46px] w-full"
          draggable={false}
        />
      </motion.div>

      <div className={`flex flex-1 flex-col items-center px-6 ${keypadOpen ? 'pt-4' : ''}`}>
        <h1 className="headline-gradient font-display text-[34px] font-extrabold tracking-tight">
          Check your mail
        </h1>
        <p className="mt-3 text-[15px] font-medium text-[#aab3c5]">
          We have sent a 4 digit code to
        </p>
        <span className="mt-2.5 rounded-full bg-[#f1f3f6] px-4 py-2 text-[14px] font-medium text-ink">
          Kia******na@gmail.com
        </span>

        {/* OTP boxes */}
        <div className="mt-9 flex gap-4" onClick={() => setKeypadOpen(true)}>
          {[0, 1, 2, 3].map((i) => {
            const active = keypadOpen && i === activeIdx
            return (
              <div
                key={i}
                className={`flex h-[72px] w-16 items-center justify-center rounded-2xl transition-all duration-200 ${
                  active
                    ? 'border-[1.5px] border-navy bg-white'
                    : 'border border-transparent bg-[#f4f5f8]'
                }`}
              >
                <AnimatePresence>
                  {digits[i] && (
                    <motion.span
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-display text-[30px] font-extrabold text-navy"
                    >
                      {digits[i]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <p className="mt-7 text-[14px] font-medium text-[#aab3c5]">
          Didn’t get it?{' '}
          <span className="cursor-pointer font-semibold text-ink underline underline-offset-2">
            Resend
          </span>
        </p>

        <div className="mt-auto w-full pb-5 pt-4">
          <PrimaryButton label="Verify OTP" disabled={!complete} onClick={onNext} />
        </div>
      </div>

      <AnimatePresence>
        {keypadOpen && (
          <motion.div
            initial={{ y: 260 }}
            animate={{ y: 0 }}
            exit={{ y: 260 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >
            <Keypad onKey={press} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
