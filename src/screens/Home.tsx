import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import WalletCard from '../components/WalletCard'
import type { Skin } from './SkinPicker'

const Sparkle = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M6 0c.5 3.2 2.8 5.5 6 6-3.2.5-5.5 2.8-6 6-.5-3.2-2.8-5.5-6-6 3.2-.5 5.5-2.8 6-6Z"
      fill={color}
    />
  </svg>
)

const block = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 160, damping: 20 } },
} as const

const WEEK = [
  { d: 'Mo', state: 'flame' },
  { d: 'Tu', state: 'flame' },
  { d: 'We', state: 'flame' },
  { d: 'Th', state: 'flame' },
  { d: 'Fr', state: 'reward' },
  { d: 'Sa', state: 'empty' },
  { d: 'Su', state: 'empty' },
] as const

export default function Home({ skin }: { skin: Skin }) {
  return (
    <div
      className="relative h-full w-full overflow-y-auto no-scrollbar"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #ebf3fe 16%, #f3f7fd 40%, #f3f7fd 100%)',
      }}
    >
      <StatusBar />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
        className="pb-12 pt-[54px]"
      >
        {/* brand switcher */}
        <motion.div variants={block} className="flex items-center gap-2 overflow-hidden pl-4">
          <img src="/assets/chip_nano.png" className="h-[64px] shrink-0" alt="noon nano" draggable={false} />
          <img src="/assets/chip_noon.png" className="h-[58px] shrink-0" alt="noon" draggable={false} />
          <img src="/assets/chip_mall.png" className="h-[58px] shrink-0" alt="supermall" draggable={false} />
          <img src="/assets/chip_food.png" className="h-[58px] shrink-0" alt="noon food" draggable={false} />
          <img src="/assets/chip_15.png" className="h-[58px] shrink-0" alt="15 minutes" draggable={false} />
        </motion.div>

        {/* greeting row */}
        <motion.div variants={block} className="mt-4 flex items-center px-4">
          <img src="/assets/avatar.png" className="h-11 w-11 rounded-full" alt="Kiaan" draggable={false} />
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-[16px] font-bold leading-tight text-ink">Hey Kiaan</p>
            <p className="truncate text-[12.5px] font-medium text-[#7d8aa0]">
              Deliver to Home - BDA Com...{' '}
              <svg className="inline" width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="m1 1.3 3.5 3.4L8 1.3" stroke="#7d8aa0" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </p>
          </div>
          <span className="flex h-10 w-7 items-center justify-center rounded-full bg-white shadow-chip">
            <svg width="3" height="13" viewBox="0 0 3 13" fill="none">
              <circle cx="1.5" cy="1.5" r="1.4" fill="#273045" />
              <circle cx="1.5" cy="6.5" r="1.4" fill="#273045" />
              <circle cx="1.5" cy="11.5" r="1.4" fill="#273045" />
            </svg>
          </span>
        </motion.div>

        {/* wallet */}
        <motion.div variants={block} className="mt-4 flex justify-center">
          <WalletCard skin={skin} balance="Đ5.00" />
        </motion.div>

        <motion.div variants={block} className="mt-4 flex items-center justify-center gap-2.5">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-chip">
            <Sparkle color="#273045" /> Your savings
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-2 text-[13px] font-semibold text-white">
            <Sparkle color="#ffffff" /> Top up wallet
          </span>
        </motion.div>

        {/* first-task banner */}
        <motion.div
          variants={block}
          className="mx-4 mt-5 flex items-center justify-between rounded-2xl bg-white p-4 shadow-chip"
        >
          <div>
            <p className="w-[180px] text-[16px] font-bold leading-snug text-ink">
              <span className="text-[#16a34a]">Earn Đ5</span> by completing your first task!
            </p>
            <button className="mt-3 rounded-full bg-navy px-4 py-2 text-[13px] font-semibold text-white">
              Let’s go
            </button>
          </div>
          <img src="/assets/banner_wallet.png" className="w-[92px]" alt="" draggable={false} />
        </motion.div>

        {/* earning streak */}
        <motion.div variants={block} className="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-chip">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold text-ink">Earning streak</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f4f8]">
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M1 6h11M8 1.5 12.5 6 8 10.5" stroke="#273045" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[17px] font-extrabold text-[#f15a24]">
            <img src="/assets/flame.png" className="h-5" alt="" draggable={false} /> 4 Days
          </p>
          <div className="mt-3 grid grid-cols-7 gap-1 border-t border-[#f1f3f6] pt-3">
            {WEEK.map((w) => (
              <div key={w.d} className="flex flex-col items-center gap-2">
                <span className="text-[12px] font-semibold text-[#7d8aa0]">{w.d}</span>
                {w.state === 'flame' ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#f15a24] bg-[#fff3ec]">
                    <img src="/assets/flame.png" className="h-5" alt="" draggable={false} />
                  </span>
                ) : w.state === 'reward' ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#bfd9f6] bg-[#eef6ff] font-display text-[12px] font-extrabold text-[#2563eb]">
                    Đ13
                  </span>
                ) : (
                  <span className="h-10 w-10 rounded-full bg-[#f1f3f6]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
