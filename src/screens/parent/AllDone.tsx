import { motion } from 'framer-motion'
import SetupShell, { SetupFooter } from '../../components/SetupShell'
import { asset } from '../../lib/asset'

const Divider = () => (
  <div className="my-4 flex items-center gap-3">
    <span className="h-px flex-1 bg-[#eceef2]" />
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
      <path d="M4 0 5 3l3 1-3 1-1 3-1-3-3-1 3-1 1-3Z" fill="#d6dae2" />
    </svg>
    <span className="h-px flex-1 bg-[#eceef2]" />
  </div>
)

export default function AllDone({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  return (
    <SetupShell
      title="All done!"
      onBack={onBack}
      footer={<SetupFooter label="Done" onClick={onDone} note="The invite link expires in 7 days. We’ll remind you." />}
    >
      <div className="rounded-[16px] bg-white px-6 py-7 shadow-[0_2px_10px_rgba(39,48,69,0.04)]">
        <motion.img
          src={asset('setup/gold_check.png')}
          alt=""
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="mx-auto h-[104px] w-[104px]"
        />
        <h1 className="mt-6 text-center text-[28px] font-extrabold tracking-[-0.4px] text-[#1d2539]">
          Kiaan is all set!
        </h1>
        <Divider />
        <p className="text-center text-[14.5px] leading-[21px] text-[#9aa3b8]">
          You’ll get a notification the moment Kiaan
          <br />
          signs in and earns their first AED
        </p>
      </div>
    </SetupShell>
  )
}
