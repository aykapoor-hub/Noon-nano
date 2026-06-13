import SetupShell, { SetupFooter } from '../../components/SetupShell'
import { asset } from '../../lib/asset'

export default function ScanAndGo({
  onBack,
  onScan,
  onNext,
}: {
  onBack: () => void
  onScan: () => void
  onNext: () => void
}) {
  return (
    <SetupShell title="Send them invite" onBack={onBack} footer={<SetupFooter label="Next" onClick={onNext} />}>
      <div className="mb-3 overflow-hidden rounded-[16px] bg-white shadow-[0_2px_10px_rgba(39,48,69,0.04)]">
        <div className="flex flex-col items-center px-5 pb-2 pt-5">
          <h1 className="text-[28px] font-extrabold tracking-[-0.4px] text-[#1d2539]">Scan and Go!</h1>
          <p className="mt-1.5 text-center text-[14px] leading-[20px] text-[#9aa3b8]">
            Kiaan can access the noon nano app
            <br />
            using this QR code and PIN
          </p>
        </div>
        {/* QR — tap to simulate the child scanning on their phone */}
        <button onClick={onScan} className="flex w-full flex-col items-center pb-3">
          <img src={asset('setup/qr.png')} alt="invite QR" className="h-[176px] w-[176px]" />
        </button>
        <p className="pb-4 text-center text-[12px] text-[#aab1c0]">QR expires in 7 days</p>
      </div>

      <div className="mb-3 flex items-center gap-3 px-2">
        <span className="h-px flex-1 bg-[#e6e9ef]" />
        <span className="text-[12px] font-medium text-[#aab1c0]">OR</span>
        <span className="h-px flex-1 bg-[#e6e9ef]" />
      </div>

      <div className="flex items-center justify-between rounded-[14px] bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(39,48,69,0.04)]">
        <p className="text-[15px] font-medium text-[#1d2539]">invite.noon.com/Faraz</p>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="5.5" y="5.5" width="9" height="10" rx="2" stroke="#1d2539" strokeWidth="1.4" />
          <path d="M12.5 5.5V3.5a2 2 0 0 0-2-2H4.5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h1" stroke="#1d2539" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    </SetupShell>
  )
}
