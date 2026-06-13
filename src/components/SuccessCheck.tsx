import { motion } from 'framer-motion'

/** Animated success ring + check, used on Sent / All done / Approved screens. */
export default function SuccessCheck({
  size = 96,
  tone = 'green',
}: {
  size?: number
  tone?: 'green' | 'gold'
}) {
  const ring = tone === 'gold' ? '#e9b949' : '#1f9d57'
  const fill = tone === 'gold' ? '#f4c245' : '#1f9d57'
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 240, damping: 16 }}
      className="relative flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          tone === 'gold'
            ? 'radial-gradient(circle at 50% 35%, #fbe6a8, #f4c245)'
            : 'radial-gradient(circle at 50% 35%, #d9f5e4, #b8ebcc)',
      }}
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{ width: size * 0.66, height: size * 0.66, background: fill }}
      >
        <motion.svg
          width={size * 0.32}
          height={size * 0.32}
          viewBox="0 0 24 18"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.path
            d="M2 9.5 9 16 22 2"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
          />
        </motion.svg>
      </span>
      <span className="pointer-events-none absolute inset-0 rounded-full" style={{ boxShadow: `0 0 0 1px ${ring}22` }} />
    </motion.div>
  )
}
