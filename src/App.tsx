import { AnimatePresence, motion, MotionGlobalConfig } from 'framer-motion'
import { useState } from 'react'

// ?nomotion=1 jumps all animations to their final state (for QA screenshots)
if (new URLSearchParams(window.location.search).has('nomotion')) {
  MotionGlobalConfig.skipAnimations = true
}
import Splash from './screens/Splash'
import Intro from './screens/Intro'
import CheckMail from './screens/CheckMail'
import Welcome from './screens/Welcome'
import SkinPicker, { type Skin } from './screens/SkinPicker'
import Interests from './screens/Interests'
import Home from './screens/Home'

type Step = 'splash' | 'intro' | 'mail' | 'welcome' | 'skin' | 'interests' | 'home'

const STEPS: Step[] = ['splash', 'intro', 'mail', 'welcome', 'skin', 'interests', 'home']

const initialStep = (): Step => {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('step')
  if (q !== null) {
    // consume the param so a plain refresh always restarts from the splash
    params.delete('step')
    const rest = params.toString()
    window.history.replaceState(null, '', rest ? `?${rest}` : window.location.pathname)
  }
  return STEPS.includes(q as Step) ? (q as Step) : 'splash'
}

export default function App() {
  const [step, setStep] = useState<Step>(initialStep)
  const [skin, setSkin] = useState<Skin>('blue')

  const screen = {
    splash: <Splash onDone={() => setStep('intro')} />,
    intro: <Intro onNext={() => setStep('mail')} />,
    mail: <CheckMail onNext={() => setStep('welcome')} />,
    welcome: <Welcome onNext={() => setStep('skin')} />,
    skin: (
      <SkinPicker
        onConfirm={(s) => {
          setSkin(s)
          setStep('interests')
        }}
        onSkip={() => setStep('interests')}
      />
    ),
    interests: <Interests onDone={() => setStep('home')} />,
    home: <Home skin={skin} />,
  }[step]

  return (
    <div className="flex h-full items-center justify-center sm:p-6">
      {/* phone frame on desktop, full-bleed on mobile */}
      <div className="relative h-full w-full overflow-hidden bg-white sm:h-[812px] sm:w-[375px] sm:rounded-[44px] sm:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.65)] sm:ring-[10px] sm:ring-[#0d111c]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            {screen}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
