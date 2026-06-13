import { useState } from 'react'
import SetupShell, { SetupFooter } from '../../components/SetupShell'
import { asset } from '../../lib/asset'

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 rounded-[16px] bg-white p-[18px] shadow-[0_2px_10px_rgba(39,48,69,0.04)]">{children}</div>
)

const Input = ({ label, value }: { label: string; value: string }) => (
  <div className="flex-1 rounded-[12px] bg-[#f5f7fa] px-3.5 pb-2.5 pt-2">
    <p className="text-[11px] font-medium text-[#9aa3b8]">{label}</p>
    <p className="mt-0.5 text-[15px] font-semibold text-[#1d2539]">{value}</p>
  </div>
)

const Chevron = ({ up }: { up?: boolean }) => (
  <svg className={up ? '' : 'rotate-180'} width="12" height="7" viewBox="0 0 12 7" fill="none">
    <path d="m1 6 5-5 5 5" stroke="#b3bacb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Stepper = ({ value }: { value: string }) => (
  <div className="flex flex-1 flex-col items-center gap-1.5 rounded-[12px] bg-[#f5f7fa] py-3">
    <Chevron up />
    <p className="text-[20px] font-bold text-[#1d2539]">{value}</p>
    <Chevron />
  </div>
)

function GenderOption({
  symbol,
  label,
  selected,
  onClick,
}: {
  symbol: string
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center gap-2 rounded-[12px] border px-3.5 py-3 transition-colors ${
        selected ? 'border-transparent bg-[#f5f7fa]' : 'border-[#eef0f4] bg-[#f5f7fa]'
      }`}
    >
      <span className="text-[16px] text-[#1d2539]">{symbol}</span>
      <span className="text-[15px] font-semibold text-[#1d2539]">{label}</span>
      <span className="ml-auto">
        {selected ? (
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#1d2539]">
            <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
              <path d="m1 4.5 3 3L10 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : (
          <span className="h-[22px] w-[22px] rounded-full border-[1.5px] border-[#d6dae2]" />
        )}
      </span>
    </button>
  )
}

export default function ChildDetails({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [gender, setGender] = useState<'boy' | 'girl'>('boy')
  return (
    <SetupShell title="Tell us about your child" onBack={onBack} footer={<SetupFooter label="Next" onClick={onNext} />}>
      <Card>
        <p className="text-[17px] font-bold text-[#1d2539]">Child’s name</p>
        <div className="mt-3 flex gap-3">
          <Input label="First name*" value="Kiaan" />
          <Input label="Last name*" value="Khalid" />
        </div>
      </Card>

      <Card>
        <p className="text-[17px] font-bold text-[#1d2539]">Birthday</p>
        <p className="mt-1 text-[13.5px] text-[#9aa3b8]">We’ll remind you when its time for a surprise gift</p>
        <div className="mt-3.5 flex gap-3">
          <Stepper value="26" />
          <Stepper value="Nov" />
          <Stepper value="2016" />
        </div>
        <img src={asset('setup/sun_arc.png')} alt="Kiaan is 10 years old" className="mx-auto mt-3 w-[170px]" />
      </Card>

      <Card>
        <p className="text-[17px] font-bold text-[#1d2539]">Gender</p>
        <div className="mt-3 flex gap-3">
          <GenderOption symbol="♂" label="Boy" selected={gender === 'boy'} onClick={() => setGender('boy')} />
          <GenderOption symbol="♀" label="Girl" selected={gender === 'girl'} onClick={() => setGender('girl')} />
        </div>
      </Card>
    </SetupShell>
  )
}
