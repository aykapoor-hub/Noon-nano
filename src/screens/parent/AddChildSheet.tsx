import { useState } from 'react'
import Sheet from '../../components/Sheet'
import PrimaryButton from '../../components/PrimaryButton'
import { useNano } from '../../state'

export default function AddChildSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addChild } = useNano()
  const [name, setName] = useState('')
  const [age, setAge] = useState(10)
  const valid = name.trim().length > 0

  const reset = () => {
    setName('')
    setAge(10)
  }

  return (
    <Sheet open={open} onClose={onClose}>
      <p className="text-[19px] font-bold text-ink">Add a child</p>
      <p className="mt-1 text-[13.5px] text-[#7d8aa0]">They’ll get their own wallet and nano profile</p>

      <label className="mt-5 block rounded-[12px] bg-[#f5f7fa] px-3.5 pb-2.5 pt-2">
        <span className="block text-[11px] font-medium text-[#9aa3b8]">Name</span>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Maya"
          className="mt-0.5 w-full bg-transparent text-[15px] font-semibold text-[#1d2539] outline-none placeholder:text-[#c2c8d2]"
        />
      </label>

      <p className="mt-4 text-[13px] font-semibold text-[#6b7488]">Age</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {[8, 9, 10, 11, 12, 13, 14].map((a) => (
          <button
            key={a}
            onClick={() => setAge(a)}
            className={`h-10 w-10 rounded-full text-[15px] font-bold transition-colors ${
              age === a ? 'bg-navy text-white' : 'bg-[#f4f5f8] text-ink'
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <PrimaryButton
          label={valid ? `Add ${name.trim()}` : 'Add child'}
          disabled={!valid}
          onClick={() => {
            addChild(name.trim(), age)
            reset()
            onClose()
          }}
        />
      </div>
    </Sheet>
  )
}
