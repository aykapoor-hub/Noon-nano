const Check = () => (
  <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
    <path d="M1 3.5 3.4 6 8 1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Dot({ state }: { state: 'done' | 'active' | 'idle' }) {
  if (state === 'done')
    return (
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-navy">
        <Check />
      </span>
    )
  if (state === 'active')
    return (
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] border-navy bg-white">
        <span className="h-[7px] w-[7px] rounded-full bg-navy" />
      </span>
    )
  return <span className="h-[18px] w-[18px] rounded-full bg-[#dadde4]" />
}

export default function Stepper({ step }: { step: 1 | 2 | 3 }) {
  // step 1 = card skin, step 2 = interests, step 3 = all done
  return (
    <div className="flex items-center justify-center gap-1.5">
      <Dot state={step === 1 ? 'active' : 'done'} />
      <span className={`h-[2.5px] w-6 rounded-full ${step >= 2 ? 'bg-navy' : 'bg-[#dadde4]'}`} />
      <Dot state={step === 1 ? 'idle' : step === 2 ? 'active' : 'done'} />
    </div>
  )
}
