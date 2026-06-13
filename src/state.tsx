import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Skin } from './screens/SkinPicker'

export type Task = {
  id: string
  label: string
  reward: number
  cadence: string
  done: boolean
  kind?: 'chore' | 'game'
}

export type CartItem = {
  id: string
  name: string
  price: number
  was?: number
  off?: string
  eta: string
  via: 'supermall' | 'noon'
}

export type AskStatus = 'none' | 'pending' | 'approved' | 'rejected'

const CART: CartItem[] = [
  {
    id: 'cam',
    name: 'FUJIFILM Polaroid Camera, colour pink with film',
    price: 129,
    was: 159,
    off: '18%',
    eta: '1 hour 12 mins',
    via: 'supermall',
  },
  {
    id: 'ps',
    name: 'Sony PlayStation Portal Remote Player',
    price: 48,
    was: 69,
    off: '10%',
    eta: 'Tomorrow',
    via: 'noon',
  },
]

type Nano = {
  childName: string
  skin: Skin
  setSkin: (s: Skin) => void

  balance: number
  addBalance: (n: number) => void
  spend: (n: number) => void

  tasks: Task[]
  completeTask: (id: string) => void
  assignTask: (label: string, reward: number, cadence: string) => void

  cart: CartItem[]
  cartTotal: number

  askStatus: AskStatus
  askNote: string
  sendForApproval: (note: string) => void
  approveAsk: () => void
  rejectAsk: () => void

  hasFamily: boolean
  setHasFamily: (v: boolean) => void
}

const Ctx = createContext<Nano | null>(null)

export function NanoProvider({ children }: { children: ReactNode }) {
  const childName = 'Kiaan'
  const [skin, setSkin] = useState<Skin>('blue')
  const [balance, setBalance] = useState(5)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'wordle', label: 'Wordle • Level 5', reward: 5, cadence: 'Daily', done: false, kind: 'game' },
    { id: 'room', label: 'Clean up room', reward: 3, cadence: 'Daily', done: false, kind: 'chore' },
    { id: 'golf', label: 'Golf lesson', reward: 5, cadence: 'Mon', done: false, kind: 'chore' },
  ])
  const [askStatus, setAskStatus] = useState<AskStatus>('none')
  const [askNote, setAskNote] = useState('')
  const [hasFamily, setHasFamily] = useState(false)

  const cartTotal = useMemo(() => CART.reduce((s, i) => s + i.price, 0), [])

  const value: Nano = {
    childName,
    skin,
    setSkin,
    balance,
    addBalance: (n) => setBalance((b) => +(b + n).toFixed(2)),
    spend: (n) => setBalance((b) => +(b - n).toFixed(2)),
    tasks,
    completeTask: (id) => {
      // read from the current render's tasks; update the two states separately
      // so we never run a side effect inside a state updater (StrictMode-safe)
      const t = tasks.find((x) => x.id === id)
      if (!t || t.done) return
      setTasks((ts) => ts.map((x) => (x.id === id ? { ...x, done: true } : x)))
      setBalance((b) => +(b + t.reward).toFixed(2))
    },
    assignTask: (label, reward, cadence) =>
      setTasks((ts) => [...ts, { id: `t${ts.length}-${label}`, label, reward, cadence, done: false, kind: 'chore' }]),
    cart: CART,
    cartTotal,
    askStatus,
    askNote,
    sendForApproval: (note) => {
      setAskNote(note)
      setAskStatus('pending')
    },
    approveAsk: () => setAskStatus('approved'),
    rejectAsk: () => setAskStatus('rejected'),
    hasFamily,
    setHasFamily,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useNano() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useNano must be used within NanoProvider')
  return c
}
