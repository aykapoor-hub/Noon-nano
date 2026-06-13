import { useState } from 'react'
import Sheet from '../../components/Sheet'
import PrimaryButton from '../../components/PrimaryButton'
import Dirham from '../../components/Dirham'
import { useNano } from '../../state'

const PRESETS = ['Clean up room', 'Finish homework', 'Walk the dog', 'Help with dishes', 'Golf lesson']
const REWARDS = [3, 5, 10]
const CADENCES = ['Daily', 'Weekly', 'Once']

export default function AssignTaskSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { assignTask, childName } = useNano()
  const [label, setLabel] = useState('Clean up room')
  const [reward, setReward] = useState(5)
  const [cadence, setCadence] = useState('Daily')

  return (
    <Sheet open={open} onClose={onClose}>
      <p className="text-[19px] font-bold text-ink">Assign a task to {childName}</p>
      <p className="mt-1 text-[13.5px] text-[#7d8aa0]">They earn the reward when it’s done</p>

      <p className="mt-5 text-[13px] font-semibold text-[#6b7488]">Task</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => setLabel(p)}
            className={`rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
              label === p ? 'bg-navy text-white' : 'bg-[#f4f5f8] text-ink'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[13px] font-semibold text-[#6b7488]">Reward</p>
      <div className="mt-2 flex gap-2.5">
        {REWARDS.map((r) => (
          <button
            key={r}
            onClick={() => setReward(r)}
            className={`flex flex-1 items-center justify-center gap-0.5 rounded-xl py-3 text-[15px] font-bold transition-colors ${
              reward === r ? 'bg-navy text-white' : 'bg-[#f4f5f8] text-ink'
            }`}
          >
            <Dirham />
            {r}
          </button>
        ))}
      </div>

      <p className="mt-5 text-[13px] font-semibold text-[#6b7488]">Repeats</p>
      <div className="mt-2 flex gap-2.5">
        {CADENCES.map((c) => (
          <button
            key={c}
            onClick={() => setCadence(c)}
            className={`flex-1 rounded-xl py-3 text-[14px] font-semibold transition-colors ${
              cadence === c ? 'bg-navy text-white' : 'bg-[#f4f5f8] text-ink'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <PrimaryButton
          label="Assign task"
          onClick={() => {
            assignTask(label, reward, cadence)
            onClose()
          }}
        />
      </div>
    </Sheet>
  )
}
