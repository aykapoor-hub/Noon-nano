import { motion } from 'framer-motion'

export default function PrimaryButton({
  label,
  disabled = false,
  onClick,
}: {
  label: string
  disabled?: boolean
  onClick?: () => void
}) {
  return (
    <motion.button
      whileTap={disabled ? undefined : { scale: 0.97 }}
      onClick={disabled ? undefined : onClick}
      className={`h-14 w-full rounded-full font-body text-[16px] font-semibold text-white transition-colors duration-300 ${
        disabled ? 'bg-[#9a9ea9]' : 'bg-navy'
      }`}
      style={
        disabled
          ? undefined
          : { backgroundImage: 'linear-gradient(180deg, #2d3750 0%, #232b3e 100%)' }
      }
    >
      {label}
    </motion.button>
  )
}
