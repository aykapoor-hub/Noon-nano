import { useState } from 'react'
import { motion } from 'framer-motion'
import SetupShell from '../../components/SetupShell'

const Backspace = () => (
  <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
    <path
      d="M8.7 1.5h13.1A2.7 2.7 0 0 1 24.5 4.2v11.6a2.7 2.7 0 0 1-2.7 2.7H8.7a2.7 2.7 0 0 1-2-.9L1.6 12a2.7 2.7 0 0 1 0-3.8L6.7 2.4a2.7 2.7 0 0 1 2-.9Z"
      stroke="#1d2539"
      strokeWidth="1.5"
    />
    <path d="m12 6.7 6.6 6.6m0-6.6L12 13.3" stroke="#1d2539" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default function ChildPin({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [pin, setPin] = useState<string[]>([])
  const complete = pin.length === 4
  const press = (k: string) =>
    k === 'back' ? setPin((p) => p.slice(0, -1)) : setPin((p) => (p.length < 4 ? [...p, k] : p))
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back']

  const footer = (
    <div>
      <div className="px-5 pb-3 pt-1">
        <button
          onClick={complete ? onNext : undefined}
          className="h-14 w-full rounded-full text-[16px] font-semibold text-white transition-colors"
          style={
            complete
              ? { backgroundImage: 'linear-gradient(180deg, #2d3750 0%, #232b3e 100%)' }
              : { background: '#9a9ea9' }
          }
        >
          Set PIN
        </button>
      </div>
      <div className="bg-[#dfe2e8] px-1.5 pb-7 pt-2">
        <div className="grid grid-cols-3 gap-x-1.5 gap-y-2">
          {keys.map((k, i) =>
            k === '' ? (
              <span key={i} />
            ) : (
              <button
                key={i}
                onClick={() => press(k)}
                className={`flex h-11 items-center justify-center rounded-[6px] text-[24px] text-[#1d2539] active:bg-[#c9cdd3] ${
                  k === 'back' ? '' : 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.3)]'
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

  return (
    <SetupShell title="One last thing" onBack={onBack} footer={footer}>
      <div className="rounded-[16px] bg-white px-5 py-6 shadow-[0_2px_10px_rgba(39,48,69,0.04)]">
        <h1 className="text-center text-[26px] font-extrabold tracking-[-0.3px] text-[#1d2539]">Set up a PIN</h1>
        <p className="mx-auto mt-2 max-w-[280px] text-center text-[14px] leading-[20px] text-[#9aa3b8]">
          Kiaan will use this to switch into their nano profile when they’re using your phone.
        </p>
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#eceef2]" />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 0 5 3l3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" fill="#d6dae2" />
          </svg>
          <span className="h-px flex-1 bg-[#eceef2]" />
        </div>
        <div className="flex justify-center gap-3.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex h-[72px] w-[68px] items-center justify-center rounded-[18px] transition-all ${
                pin.length === i ? 'border-[1.5px] border-[#1d2539] bg-white' : 'bg-[#f5f7fa]'
              }`}
            >
              {pin[i] && (
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-[30px] font-extrabold text-[#1d2539]"
                >
                  {pin[i]}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SetupShell>
  )
}
