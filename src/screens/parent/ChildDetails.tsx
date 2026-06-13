import { useState } from 'react'
import StatusBar from '../../components/StatusBar'
import NavHeader from '../../components/NavHeader'
import PrimaryButton from '../../components/PrimaryButton'

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex-1 rounded-xl bg-[#f4f5f8] px-3.5 py-2.5">
    <p className="text-[11px] font-medium text-[#9aa3b8]">{label}</p>
    <p className="mt-0.5 text-[15px] font-semibold text-ink">{value}</p>
  </div>
)

const Spin = ({ value }: { value: string }) => (
  <div className="flex-1 rounded-xl bg-[#f4f5f8] py-2.5 text-center">
    <svg className="mx-auto" width="12" height="7" viewBox="0 0 12 7" fill="none">
      <path d="m1 6 5-5 5 5" stroke="#9aa3b8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <p className="my-1 text-[18px] font-bold text-ink">{value}</p>
    <svg className="mx-auto rotate-180" width="12" height="7" viewBox="0 0 12 7" fill="none">
      <path d="m1 6 5-5 5 5" stroke="#9aa3b8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
)

export default function ChildDetails({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [gender, setGender] = useState<'boy' | 'girl'>('boy')
  return (
    <div className="relative flex h-full w-full flex-col bg-white">
      <StatusBar />
      <NavHeader title="Tell us about your child" onBack={onBack} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pt-4">
        <p className="text-[17px] font-bold text-ink">Child’s name</p>
        <div className="mt-3 flex gap-3">
          <Field label="First name*" value="Kiaan" />
          <Field label="Last name*" value="Khalid" />
        </div>

        <p className="mt-7 text-[17px] font-bold text-ink">Birthday</p>
        <p className="mt-1 text-[13.5px] text-[#9aa3b8]">
          We’ll remind you when its time for a surprise gift
        </p>
        <div className="mt-3 flex gap-3">
          <Spin value="26" />
          <Spin value="Nov" />
          <Spin value="2016" />
        </div>

        <p className="mt-7 text-[17px] font-bold text-ink">Gender</p>
        <div className="mt-3 flex gap-3">
          {(['boy', 'girl'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`flex-1 rounded-xl py-3 text-[15px] font-semibold capitalize transition-colors ${
                gender === g ? 'bg-navy text-white' : 'bg-[#f4f5f8] text-[#6b7488]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-9 pt-3">
        <PrimaryButton label="Next" onClick={onNext} />
      </div>
    </div>
  )
}
