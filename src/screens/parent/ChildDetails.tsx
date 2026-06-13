import { useState } from 'react'
import SetupShell, { SetupFooter } from '../../components/SetupShell'
import SunArc from '../../components/SunArc'

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-3 rounded-[16px] bg-white p-[18px] shadow-[0_2px_10px_rgba(39,48,69,0.04)]">{children}</div>
)

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="flex-1 rounded-[12px] bg-[#f5f7fa] px-3.5 pb-2.5 pt-2">
      <span className="block text-[11px] font-medium text-[#9aa3b8]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full bg-transparent text-[15px] font-semibold text-[#1d2539] outline-none"
      />
    </label>
  )
}

const Chevron = ({ up, onClick }: { up?: boolean; onClick: () => void }) => (
  <button onClick={onClick} className="flex h-5 w-full items-center justify-center">
    <svg className={up ? '' : 'rotate-180'} width="12" height="7" viewBox="0 0 12 7" fill="none">
      <path d="m1 6 5-5 5 5" stroke="#b3bacb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>
)
function Stepper({ value, onUp, onDown }: { value: string; onUp: () => void; onDown: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-[12px] bg-[#f5f7fa] py-2.5">
      <Chevron up onClick={onUp} />
      <p className="text-[20px] font-bold text-[#1d2539]">{value}</p>
      <Chevron onClick={onDown} />
    </div>
  )
}

function GenderOption({ symbol, label, selected, onClick }: { symbol: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center gap-2 rounded-[12px] border px-3 py-3 transition-colors ${
        selected ? 'border-[#cdd3dd] bg-[#f5f7fa]' : 'border-[#eef0f4] bg-[#f5f7fa]'
      }`}
    >
      <span className="text-[16px] text-[#1d2539]">{symbol}</span>
      <span className="text-[15px] font-semibold text-[#1d2539]">{label}</span>
      {selected ? (
        <span className="ml-auto flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#1d2539]">
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="m1 4.5 3 3L10 1" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : (
        <span className="ml-auto h-[22px] w-[22px] shrink-0 rounded-full border-[1.5px] border-[#d6dae2]" />
      )}
    </button>
  )
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function ChildDetails({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [first, setFirst] = useState('Kiaan')
  const [last, setLast] = useState('Khalid')
  const [gender, setGender] = useState<'boy' | 'girl'>('boy')
  const [day, setDay] = useState(26)
  const [month, setMonth] = useState(10) // Nov
  const [year, setYear] = useState(2016)
  const age = 2026 - year

  const wrap = (v: number, lo: number, hi: number) => (v < lo ? hi : v > hi ? lo : v)

  return (
    <SetupShell title="Tell us about your child" onBack={onBack} footer={<SetupFooter label="Next" onClick={onNext} />}>
      <Card>
        <p className="text-[17px] font-bold text-[#1d2539]">Child’s name</p>
        <div className="mt-3 flex gap-3">
          <Field label="First name*" value={first} onChange={setFirst} />
          <Field label="Last name*" value={last} onChange={setLast} />
        </div>
      </Card>

      <Card>
        <p className="text-[17px] font-bold text-[#1d2539]">Birthday</p>
        <p className="mt-1 text-[13.5px] text-[#9aa3b8]">We’ll remind you when its time for a surprise gift</p>
        <div className="mt-3.5 flex gap-3">
          <Stepper value={String(day)} onUp={() => setDay((d) => wrap(d + 1, 1, 31))} onDown={() => setDay((d) => wrap(d - 1, 1, 31))} />
          <Stepper value={MONTHS[month]} onUp={() => setMonth((m) => wrap(m + 1, 0, 11))} onDown={() => setMonth((m) => wrap(m - 1, 0, 11))} />
          <Stepper value={String(year)} onUp={() => setYear((y) => wrap(y + 1, 2008, 2020))} onDown={() => setYear((y) => wrap(y - 1, 2008, 2020))} />
        </div>
        <SunArc name={first || 'Your child'} age={age} className="mx-auto mt-2 w-[190px]" />
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
