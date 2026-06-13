import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function Sheet({
  open,
  onClose,
  children,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[60] bg-black/40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="absolute inset-x-0 bottom-0 z-[61] rounded-t-[26px] bg-white px-5 pb-9 pt-3"
          >
            <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-[#dfe3ea]" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
