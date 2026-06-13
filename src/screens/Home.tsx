import { motion } from 'framer-motion'
import StatusBar from '../components/StatusBar'
import WalletCard from '../components/WalletCard'
import Dirham from '../components/Dirham'
import { asset } from '../lib/asset'
import { useNano } from '../state'

const Sparkle = ({ color }: { color: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 0c.5 3.2 2.8 5.5 6 6-3.2.5-5.5 2.8-6 6-.5-3.2-2.8-5.5-6-6 3.2-.5 5.5-2.8 6-6Z" fill={color} />
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

export default function Home({ onCart }: { onCart: () => void }) {
  const { skin, balance, tasks, completeTask } = useNano()
  const chores = tasks.filter((t) => t.kind === 'chore')
  const game = tasks.find((t) => t.kind === 'game')
  const remaining = tasks.filter((t) => !t.done).reduce((s, t) => s + t.reward, 0)
  const choresEarn = chores.filter((t) => !t.done).reduce((s, t) => s + t.reward, 0)

  return (
    <div
      className="relative h-full w-full overflow-y-auto no-scrollbar"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #ebf3fe 16%, #f3f7fd 40%, #f3f7fd 100%)' }}
    >
      <StatusBar />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } } }}
        className="pb-12 pt-[54px]"
      >
        {/* brand switcher */}
        <motion.div variants={block} className="flex items-center gap-2 overflow-hidden pl-4">
          <img src={asset('chip_nano.png')} className="h-[64px] shrink-0" alt="noon nano" draggable={false} />
          <img src={asset('chip_noon.png')} className="h-[58px] shrink-0" alt="noon" draggable={false} />
          <img src={asset('chip_mall.png')} className="h-[58px] shrink-0" alt="supermall" draggable={false} />
          <img src={asset('chip_food.png')} className="h-[58px] shrink-0" alt="noon food" draggable={false} />
          <img src={asset('chip_15.png')} className="h-[58px] shrink-0" alt="15 minutes" draggable={false} />
        </motion.div>

        {/* greeting */}
        <motion.div variants={block} className="mt-4 flex items-center px-4">
          <img src={asset('avatar.png')} className="h-11 w-11 rounded-full" alt="Kiaan" draggable={false} />
          <div className="ml-3 min-w-0 flex-1">
            <p className="text-[16px] font-bold leading-tight text-ink">Hey Kiaan</p>
            <p className="truncate text-[12.5px] font-medium text-[#7d8aa0]">
              Deliver to Home - BDA Com...{' '}
              <svg className="inline" width="9" height="6" viewBox="0 0 9 6" fill="none">
                <path d="m1 1.3 3.5 3.4L8 1.3" stroke="#7d8aa0" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </p>
          </div>
          <button onClick={onCart} className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-chip">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M1 1h2l1.5 9.5h9L15.5 4H4" stroke="#273045" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6.5" cy="15" r="1.3" fill="#273045" />
              <circle cx="13" cy="15" r="1.3" fill="#273045" />
            </svg>
          </button>
        </motion.div>

        {/* wallet */}
        <motion.div variants={block} className="mt-4 flex justify-center">
          <WalletCard skin={skin} balance={balance.toFixed(2)} />
        </motion.div>

        <motion.div variants={block} className="mt-4 flex items-center justify-center gap-2.5">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-semibold text-ink shadow-chip">
            <Sparkle color="#273045" /> Your savings
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-2 text-[13px] font-semibold text-white">
            <Sparkle color="#ffffff" /> Top up wallet
          </span>
        </motion.div>

        {/* earning streak */}
        <motion.div variants={block} className="mx-4 mt-5 rounded-2xl bg-white p-4 shadow-chip">
          <div className="flex items-center justify-between">
            <p className="text-[16px] font-bold text-ink">Earning streak</p>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f4f8]">
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <path d="M1 6h11M8 1.5 12.5 6 8 10.5" stroke="#273045" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[17px] font-extrabold text-[#f15a24]">
            <img src={asset('flame.png')} className="h-5" alt="" draggable={false} /> 4 Days
          </p>
          <div className="mt-3 grid grid-cols-7 gap-1 border-t border-[#f1f3f6] pt-3">
            {WEEK.map((w) => (
              <div key={w.d} className="flex flex-col items-center gap-2">
                <span className="text-[12px] font-semibold text-[#7d8aa0]">{w.d}</span>
                {w.state === 'flame' ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#f15a24] bg-[#fff3ec]">
                    <img src={asset('flame.png')} className="h-5" alt="" draggable={false} />
                  </span>
                ) : w.state === 'reward' ? (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#bfd9f6] bg-[#eef6ff] font-display text-[12px] font-extrabold text-[#2563eb]">
                    <Dirham className="mr-px" />13
                  </span>
                ) : (
                  <span className="h-10 w-10 rounded-full bg-[#f1f3f6]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* earn today */}
        <motion.div variants={block} className="mx-4 mt-4 rounded-2xl bg-white p-4 shadow-chip">
          <p className="flex items-center gap-1 text-[16px] font-bold text-ink">
            Earn <Dirham />{remaining} today
          </p>

          {game && (
            <>
              <p className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-[#6b7488]">
                <Sparkle color="#2563eb" /> Daily
              </p>
              <button
                onClick={() => completeTask(game.id)}
                className="mt-1.5 flex w-full items-center gap-3 rounded-xl bg-[#f7f8fa] px-3.5 py-3 text-left"
              >
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-ink">{game.label}</p>
                  <p className="flex items-center gap-0.5 text-[12.5px] font-semibold text-[#1f9d57]">
                    <Dirham />{game.reward} {game.done ? 'earned' : '· Daily'}
                  </p>
                </div>
                {game.done ? (
                  <Check />
                ) : (
                  <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                    <path d="m1 1 6 5.5L1 12" stroke="#b8c0cf" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </>
          )}

          <p className="mt-4 flex items-center gap-1 text-[13px] font-semibold text-[#6b7488]">
            Daily tasks • Earn <Dirham />{choresEarn}
          </p>
          <div className="mt-1.5 space-y-2">
            {chores.map((t) => (
              <button
                key={t.id}
                onClick={() => completeTask(t.id)}
                className="flex w-full items-center gap-3 rounded-xl bg-[#f7f8fa] px-3.5 py-3 text-left"
              >
                <span
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-md border-[1.5px] transition-colors ${
                    t.done ? 'border-[#1f9d57] bg-[#1f9d57]' : 'border-[#c7cedb] bg-white'
                  }`}
                >
                  {t.done && (
                    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                      <path d="m1 4.5 3 3L10 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <div className="flex-1">
                  <p className={`text-[14px] font-semibold ${t.done ? 'text-[#aab3c5] line-through' : 'text-ink'}`}>
                    {t.label}
                  </p>
                  <p className="flex items-center gap-0.5 text-[12.5px] font-semibold text-[#1f9d57]">
                    <Dirham />{t.reward} • {t.cadence}
                  </p>
                </div>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                  <path d="m1 1 6 5.5L1 12" stroke="#b8c0cf" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </motion.div>

        {/* referral */}
        <motion.div variants={block} className="mx-4 mt-4 overflow-hidden rounded-2xl bg-white p-4 shadow-chip">
          <p className="text-[12.5px] text-[#7d8aa0]">Share the love</p>
          <p className="mt-0.5 flex items-center gap-1 text-[16px] font-bold text-ink">
            Earn <Dirham />10 for each referral you make
          </p>
          <button className="mt-3 flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[13px] font-semibold text-white">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 1 6.5 7.5M13 1 9 13l-2.5-5.5L1 5l12-4Z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
            Refer now
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

const Check = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1f9d57]">
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
      <path d="m1 4.5 3 3L10 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)
