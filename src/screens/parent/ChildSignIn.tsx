import SetupShell, { SetupFooter } from '../../components/SetupShell'

export default function ChildSignIn({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <SetupShell title="How will Kiaan sign in?" onBack={onBack} footer={<SetupFooter label="Next" onClick={onNext} />}>
      <div className="mb-3 rounded-[16px] bg-white p-[18px] shadow-[0_2px_10px_rgba(39,48,69,0.04)]">
        <p className="text-[17px] font-bold text-[#1d2539]">Kiaan’s Email Address</p>
        <p className="mt-1 text-[13.5px] text-[#9aa3b8]">We’ll send the login code here</p>
        <div className="mt-3.5 flex items-center gap-3 rounded-[12px] bg-[#f5f7fa] px-3.5 pb-2.5 pt-2">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-[#9aa3b8]">Email address</p>
            <p className="mt-0.5 truncate text-[15px] font-semibold text-[#1d2539]">kk@noon.com</p>
          </div>
          <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#1aa251]">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="m1 4.5 3 3L10 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[16px] bg-[#eef0f4] p-[18px]">
        <div>
          <p className="text-[15px] font-bold text-[#1d2539]">Don’t have the email?</p>
          <p className="mt-0.5 text-[13px] text-[#9aa3b8]">Set up login with username</p>
        </div>
        <button className="shrink-0 rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-[#1d2539] shadow-[0_1px_4px_rgba(39,48,69,0.06)]">
          Create username
        </button>
      </div>
    </SetupShell>
  )
}
