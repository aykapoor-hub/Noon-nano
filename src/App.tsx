import { AnimatePresence, LayoutGroup, motion, MotionGlobalConfig } from 'framer-motion'
import { useState } from 'react'
import { useNano } from './state'

// child onboarding
import Splash from './screens/Splash'
import Intro from './screens/Intro'
import CheckMail from './screens/CheckMail'
import Welcome from './screens/Welcome'
import SkinPicker from './screens/SkinPicker'
import Interests from './screens/Interests'
import Home from './screens/Home'
// child commerce
import Cart from './screens/child/Cart'
import SentToDad from './screens/child/SentToDad'
import Arriving from './screens/child/Arriving'
// parent
import ParentAccount from './screens/parent/ParentAccount'
import ChildDetails from './screens/parent/ChildDetails'
import ChildSignIn from './screens/parent/ChildSignIn'
import ChildPin from './screens/parent/ChildPin'
import ScanAndGo from './screens/parent/ScanAndGo'
import AllDone from './screens/parent/AllDone'
import FamilyDashboard from './screens/parent/FamilyDashboard'
import ApprovalRequired from './screens/parent/ApprovalRequired'
import OrderApproved from './screens/parent/OrderApproved'
import TopUpSheet from './screens/parent/TopUpSheet'
import AssignTaskSheet from './screens/parent/AssignTaskSheet'

const params = new URLSearchParams(window.location.search)
if (params.has('nomotion')) MotionGlobalConfig.skipAnimations = true

type Mode = 'parent' | 'child'
type ParentStep =
  | 'account'
  | 'details'
  | 'signin'
  | 'pin'
  | 'qr'
  | 'done'
  | 'family'
  | 'approval'
  | 'approved'
type ChildStep =
  | 'splash'
  | 'intro'
  | 'mail'
  | 'welcome'
  | 'skin'
  | 'interests'
  | 'home'
  | 'cart'
  | 'sent'
  | 'arriving'

// consume QA params so a plain refresh starts the journey at the top
const qpMode = params.get('persona') as Mode | null
const qpParent = params.get('p') as ParentStep | null
const qpChild = params.get('step') as ChildStep | null
if (params.has('persona') || params.has('p') || params.has('step') || params.has('nomotion')) {
  ;['persona', 'p', 'step', 'nomotion'].forEach((k) => params.delete(k))
  const rest = params.toString()
  window.history.replaceState(null, '', rest ? `?${rest}` : window.location.pathname)
}

export default function App() {
  const { setSkin, approveAsk, rejectAsk, hasFamily, setHasFamily } = useNano()
  const [mode, setMode] = useState<Mode>(qpMode ?? 'parent')
  const [parentStep, setParentStep] = useState<ParentStep>(qpParent ?? 'account')
  const [childStep, setChildStep] = useState<ChildStep>(qpChild ?? 'splash')
  const [sheet, setSheet] = useState<'none' | 'topup' | 'assign'>('none')

  const goChild = (s: ChildStep) => {
    setMode('child')
    setChildStep(s)
  }

  const parentScreens: Record<ParentStep, React.ReactNode> = {
    account: (
      <ParentAccount
        hasFamily={hasFamily}
        onSetupNano={() => setParentStep('details')}
        onOpenFamily={() => setParentStep('family')}
      />
    ),
    details: <ChildDetails onBack={() => setParentStep('account')} onNext={() => setParentStep('signin')} />,
    signin: <ChildSignIn onBack={() => setParentStep('details')} onNext={() => setParentStep('pin')} />,
    pin: <ChildPin onBack={() => setParentStep('signin')} onNext={() => setParentStep('qr')} />,
    qr: (
      <ScanAndGo
        onBack={() => setParentStep('pin')}
        onScan={() => goChild('splash')}
        onNext={() => setParentStep('done')}
      />
    ),
    done: (
      <AllDone
        onBack={() => setParentStep('qr')}
        onDone={() => {
          setHasFamily(true)
          setParentStep('family')
        }}
      />
    ),
    family: (
      <FamilyDashboard
        onBack={() => setParentStep('account')}
        onAssign={() => setSheet('assign')}
        onTopUp={() => setSheet('topup')}
        onApprovals={() => setParentStep('approval')}
      />
    ),
    approval: (
      <ApprovalRequired
        onBack={() => setParentStep('family')}
        onApprove={() => {
          approveAsk()
          setChildStep('arriving')
          setParentStep('approved')
        }}
        onReject={() => {
          rejectAsk()
          setParentStep('family')
        }}
      />
    ),
    approved: <OrderApproved onDone={() => setParentStep('family')} />,
  }

  const childScreens: Record<ChildStep, React.ReactNode> = {
    splash: <Splash onDone={() => setChildStep('intro')} />,
    intro: <Intro onNext={() => setChildStep('mail')} />,
    mail: <CheckMail onNext={() => setChildStep('welcome')} />,
    welcome: <Welcome onNext={() => setChildStep('skin')} />,
    skin: (
      <SkinPicker
        onConfirm={(s) => {
          setSkin(s)
          setChildStep('interests')
        }}
        onSkip={() => setChildStep('interests')}
      />
    ),
    interests: <Interests onDone={() => setChildStep('home')} />,
    home: <Home onCart={() => setChildStep('cart')} />,
    cart: <Cart onBack={() => setChildStep('home')} onSend={() => setChildStep('sent')} />,
    sent: <SentToDad onBack={() => setChildStep('home')} onExplore={() => setChildStep('home')} />,
    arriving: <Arriving onBack={() => setChildStep('home')} onExplore={() => setChildStep('home')} />,
  }

  const key = mode === 'parent' ? `p-${parentStep}` : `c-${childStep}`
  const screen = mode === 'parent' ? parentScreens[parentStep] : childScreens[childStep]

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 sm:p-6">
      <PersonaSwitch mode={mode} onChange={setMode} />

      <div className="relative h-full w-full overflow-hidden bg-white sm:h-[812px] sm:w-[375px] sm:rounded-[44px] sm:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.65)] sm:ring-[10px] sm:ring-[#0d111c]">
        <LayoutGroup>
          <AnimatePresence initial={false}>
            <motion.div
              key={key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {screen}
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>

        {mode === 'parent' && (
          <>
            <TopUpSheet open={sheet === 'topup'} onClose={() => setSheet('none')} />
            <AssignTaskSheet open={sheet === 'assign'} onClose={() => setSheet('none')} />
          </>
        )}
      </div>
    </div>
  )
}

function PersonaSwitch({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  // compact toggle that lives in the empty centre of the status-bar row on
  // mobile (between the clock and the signal icons); sits above the frame on desktop
  return (
    <div className="fixed left-1/2 top-1.5 z-[80] flex -translate-x-1/2 gap-0.5 rounded-full bg-black/35 p-0.5 shadow backdrop-blur sm:static sm:top-0 sm:translate-x-0 sm:gap-1 sm:bg-white/10 sm:p-1">
      {(['parent', 'child'] as const).map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize transition-colors sm:px-4 sm:py-1.5 sm:text-[13px] ${
            mode === m ? 'bg-white text-ink' : 'text-white/75'
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
