import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import PrimaryButton from '../../components/PrimaryButton'

export default function ChildSignIn({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader title="How will Kiaan sign in?" onBack={onBack} />

      <div className="flex-1 px-5 pt-4">
        <p className="text-[17px] font-bold text-ink">Kiaan’s Email Address</p>
        <p className="mt-1 text-[13.5px] text-[#9aa3b8]">We’ll send the login code here</p>

        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#f4f5f8] px-4 py-3.5">
          <div className="flex-1">
            <p className="text-[11px] font-medium text-[#9aa3b8]">Email address</p>
            <p className="mt-0.5 text-[15px] font-semibold text-ink">kk@noon.com</p>
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1f9d57]">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="m1 4.5 3 3L10 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#f7f8fa] px-4 py-3.5">
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink">Don’t have the email?</p>
            <p className="text-[12.5px] text-[#9aa3b8]">Set up login with username</p>
          </div>
          <button className="rounded-full bg-white px-3 py-2 text-[12.5px] font-semibold text-ink shadow-chip">
            Create username
          </button>
        </div>
      </div>

      <div className="px-5 pb-9 pt-3">
        <PrimaryButton label="Next" onClick={onNext} />
      </div>
    </div>
  )
}
