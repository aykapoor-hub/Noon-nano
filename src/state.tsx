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

export type Child = {
  id: string
  name: string
  age: number
  tone: string // accent dot colour
  avatar?: string // photo asset name under /assets/family/
  balance: number
  tasks: Task[]
  since: string
}

export type Activity = {
  id: string
  childId: string
  kind: 'earn' | 'topup' | 'spend' | 'task' | 'add'
  text: string
  amount?: number
  sign?: '+' | '-'
  when: string
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
  { id: 'cam', name: 'FUJIFILM Polaroid Camera, colour pink with film', price: 129, was: 159, off: '18%', eta: '1 hour 12 mins', via: 'supermall' },
  { id: 'ps', name: 'Sony PlayStation Portal Remote Player', price: 48, was: 69, off: '10%', eta: 'Tomorrow', via: 'noon' },
]

const INITIAL_CHILDREN: Child[] = [
  {
    id: 'kiaan',
    name: 'Kiaan',
    age: 13,
    tone: '#2f9e63',
    avatar: 'kiaan',
    balance: 5,
    since: 'Jun ’26',
    tasks: [
      { id: 'wordle', label: 'Wordle • Level 5', reward: 5, cadence: 'Daily', done: false, kind: 'game' },
      { id: 'room', label: 'Clean up room', reward: 3, cadence: 'Daily', done: false, kind: 'chore' },
      { id: 'golf', label: 'Golf lesson', reward: 5, cadence: 'Mon', done: false, kind: 'chore' },
    ],
  },
  {
    id: 'sara',
    name: 'Sara',
    age: 11,
    tone: '#14532d',
    avatar: 'sara',
    balance: 53,
    since: 'Mar ’26',
    tasks: [
      { id: 's-desk', label: 'Tidy your desk', reward: 3, cadence: 'Daily', done: false, kind: 'chore' },
      { id: 's-read', label: 'Read for 20 mins', reward: 4, cadence: 'Daily', done: false, kind: 'chore' },
    ],
  },
]

const INITIAL_ACTIVITY: Activity[] = [
  { id: 'a1', childId: 'kiaan', kind: 'earn', text: 'Kiaan earned from Wordle', amount: 5, sign: '+', when: '2h ago' },
  { id: 'a2', childId: 'sara', kind: 'topup', text: 'You topped up Sara', amount: 20, sign: '+', when: 'Yesterday' },
  { id: 'a3', childId: 'sara', kind: 'spend', text: 'Sara bought Lego Botanicals', amount: 41, sign: '-', when: '2 days ago' },
]

type Nano = {
  // active child (the nano profile shown in the child journey)
  activeChildId: string
  childName: string
  skin: Skin
  setSkin: (s: Skin) => void

  // active-child conveniences (used by the child-side screens)
  balance: number
  addBalance: (n: number) => void
  spend: (n: number) => void
  tasks: Task[]
  completeTask: (taskId: string) => void

  // family / multi-child API (used by the parent dashboard + sheets)
  children: Child[]
  childById: (id: string) => Child | undefined
  topUpChild: (id: string, n: number) => void
  assignTaskToChild: (id: string, label: string, reward: number, cadence: string) => void
  addChild: (name: string, age: number) => void
  removeChild: (id: string) => void
  activities: Activity[]

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
let aSeq = 100

export function NanoProvider({ children: kids }: { children: ReactNode }) {
  const activeChildId = 'kiaan'
  const [skin, setSkin] = useState<Skin>('blue')
  const [children, setChildren] = useState<Child[]>(INITIAL_CHILDREN)
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITY)
  const [askStatus, setAskStatus] = useState<AskStatus>('none')
  const [askNote, setAskNote] = useState('')
  const [hasFamily, setHasFamily] = useState(false)

  const active = children.find((c) => c.id === activeChildId)!
  const cartTotal = useMemo(() => CART.reduce((s, i) => s + i.price, 0), [])

  const logActivity = (a: Omit<Activity, 'id' | 'when'>) =>
    setActivities((xs) => [{ ...a, id: `a${aSeq++}`, when: 'Just now' }, ...xs])

  const adjustBalance = (id: string, delta: number) =>
    setChildren((cs) => cs.map((c) => (c.id === id ? { ...c, balance: +(c.balance + delta).toFixed(2) } : c)))

  const topUpChild: Nano['topUpChild'] = (id, n) => {
    adjustBalance(id, n)
    const c = children.find((x) => x.id === id)
    if (c) logActivity({ childId: id, kind: 'topup', text: `You topped up ${c.name}`, amount: n, sign: '+' })
  }

  const assignTaskToChild: Nano['assignTaskToChild'] = (id, label, reward, cadence) => {
    setChildren((cs) =>
      cs.map((c) =>
        c.id === id
          ? { ...c, tasks: [...c.tasks, { id: `t${aSeq++}`, label, reward, cadence, done: false, kind: 'chore' }] }
          : c,
      ),
    )
    const c = children.find((x) => x.id === id)
    if (c) logActivity({ childId: id, kind: 'task', text: `Assigned “${label}” to ${c.name}` })
  }

  const completeTask: Nano['completeTask'] = (taskId) => {
    const t = active.tasks.find((x) => x.id === taskId)
    if (!t || t.done) return
    setChildren((cs) =>
      cs.map((c) =>
        c.id === activeChildId
          ? {
              ...c,
              balance: +(c.balance + t.reward).toFixed(2),
              tasks: c.tasks.map((x) => (x.id === taskId ? { ...x, done: true } : x)),
            }
          : c,
      ),
    )
    logActivity({ childId: activeChildId, kind: 'earn', text: `${active.name} earned from ${t.label}`, amount: t.reward, sign: '+' })
  }

  const addChild: Nano['addChild'] = (name, age) => {
    const id = `c${aSeq++}`
    const tones = ['#2563eb', '#d97706', '#7c3aed', '#db2777']
    setChildren((cs) => [
      ...cs,
      { id, name, age, tone: tones[cs.length % tones.length], balance: 0, since: 'Jun ’26', tasks: [] },
    ])
    logActivity({ childId: id, kind: 'add', text: `Added ${name} to your family` })
  }

  const removeChild: Nano['removeChild'] = (id) => setChildren((cs) => cs.filter((c) => c.id !== id))

  const value: Nano = {
    activeChildId,
    childName: active.name,
    skin,
    setSkin,
    balance: active.balance,
    addBalance: (n) => adjustBalance(activeChildId, n),
    spend: (n) => adjustBalance(activeChildId, -n),
    tasks: active.tasks,
    completeTask,
    children,
    childById: (id) => children.find((c) => c.id === id),
    topUpChild,
    assignTaskToChild,
    addChild,
    removeChild,
    activities,
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

  return <Ctx.Provider value={value}>{kids}</Ctx.Provider>
}

export function useNano() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useNano must be used within NanoProvider')
  return c
}
