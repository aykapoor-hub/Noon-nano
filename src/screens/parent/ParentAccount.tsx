import { motion } from 'framer-motion'
import StatusBar from '../../components/StatusBar'
import Dirham from '../../components/Dirham'
import { asset } from '../../lib/asset'

const Row = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) => (
  <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left">
    <span className="text-[#5b6678]">{icon}</span>
    <span className="text-[15px] font-medium text-ink">{label}</span>
    <svg className="ml-auto" width="7" height="12" viewBox="0 0 7 12" fill="none">
      <path d="m1 1 5 5-5 5" stroke="#b8c0cf" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </button>
)

export default function ParentAccount({
  hasFamily,
  onSetupNano,
  onOpenFamily,
}: {
  hasFamily: boolean
  onSetupNano: () => void
  onOpenFamily: () => void
}) {
  return (
    <div className="relative h-full w-full overflow-y-auto no-scrollbar bg-[#f4f6f9]">
      <StatusBar />
      <div className="px-4 pb-16 pt-[52px]">
        {/* profile */}
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-chip">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4c245] text-[20px] font-extrabold text-[#6b5212]">
            A
          </span>
          <div>
            <p className="text-[17px] font-bold text-ink">Anmol Jain</p>
            <p className="text-[13px] text-[#7d8aa0]">ajain@gmail.com</p>
          </div>
          <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f3f6]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9.5 1.5 12.5 4.5 5 12H2v-3l7.5-7.5Z" stroke="#5b6678" strokeWidth="1.3" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* noon One */}
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[#fdf4e0] px-4 py-3">
          <span className="rounded-full bg-[#f4c245] px-2 py-0.5 text-[11px] font-extrabold italic text-ink">one</span>
          <span className="text-[14px] font-semibold text-ink">Free delivery, yours to enjoy!</span>
          <svg className="ml-auto" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="m1 1 5 5-5 5" stroke="#b8a05a" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>

        {/* orders / wishlist */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          {['My Orders', 'My Wishlist'].map((t) => (
            <div key={t} className="rounded-2xl bg-white p-3.5 shadow-chip">
              <p className="text-[14px] font-bold text-ink">{t}</p>
              <div className="mt-2.5 flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-9 flex-1 rounded-lg bg-[#eef1f5]" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* noon credits */}
        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-chip">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef1f5] text-[13px] font-bold text-navy">
            <Dirham />
          </span>
          <span className="text-[15px] font-medium text-ink">noon Credits</span>
          <span className="ml-auto flex items-center gap-1 text-[15px] font-bold text-ink">
            <Dirham />320.21
          </span>
          <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="m1 1 5 5-5 5" stroke="#b8c0cf" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>

        {/* noon nano — the entry point */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={hasFamily ? onOpenFamily : onSetupNano}
          className="mt-3 flex w-full items-center gap-3 overflow-hidden rounded-2xl bg-white p-4 text-left shadow-chip"
        >
          <img src={asset('logo.png')} alt="" className="h-10 w-10 rounded-xl bg-[#92bffc] object-contain p-1" />
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[15px] font-bold text-ink">
              {hasFamily ? 'Manage your family' : 'Introducing noon nano'}
              {!hasFamily && (
                <span className="rounded-md bg-[#e5004e] px-1.5 py-0.5 text-[9px] font-extrabold text-white">NEW</span>
              )}
            </p>
            <p className="truncate text-[12.5px] text-[#7d8aa0]">Let your kids shop on their own</p>
          </div>
          <svg className="ml-auto shrink-0" width="7" height="12" viewBox="0 0 7 12" fill="none">
            <path d="m1 1 5 5-5 5" stroke="#b8c0cf" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.button>

        {/* settings list */}
        <div className="mt-3 divide-y divide-[#f1f3f6] overflow-hidden rounded-2xl bg-white shadow-chip">
          <Row icon={<Pin />} label="Addresses" />
          <Row icon={<Card />} label="Manage Cards" />
          <Row icon={<Box />} label="Returns" />
          <Row icon={<Shield />} label="Warranty claims" />
        </div>
      </div>
    </div>
  )
}

const Pin = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 16s6-5 6-9A6 6 0 0 0 3 7c0 4 6 9 6 9Z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)
const Card = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="4" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M1.5 7.5h15" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)
const Box = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1.5 16 5v8l-7 3.5L2 13V5l7-3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)
const Shield = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1.5 15 4v5c0 4-6 7.5-6 7.5S3 13 3 9V4l6-2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
)
