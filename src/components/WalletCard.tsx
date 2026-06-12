import Dirham from './Dirham'
import type { Skin } from '../screens/SkinPicker'
import { asset } from '../lib/asset'

const SKIN_STYLE: Record<
  Skin,
  { header: string; body: string; filter?: string; label: string }
> = {
  blue: { header: '#a3d5fc', body: 'body_blue', label: '#37536f' },
  silver: { header: '#ebeff2', body: 'body_silver', label: '#5d6470' },
  green: { header: '#a0e7b9', body: 'body_green', label: '#2f6547' },
  purple: {
    header: '#d3c4f5',
    body: 'body_blue',
    filter: 'hue-rotate(65deg) saturate(0.9) brightness(0.95)',
    label: '#4f3f72',
  },
  dark: {
    header: '#c3c9d4',
    body: 'body_blue',
    filter: 'saturate(0.7) brightness(0.6)',
    label: '#39404e',
  },
}

export default function WalletCard({
  skin = 'blue',
  balance = '0.00',
  className = '',
}: {
  skin?: Skin
  /** numeric part only — the dirham symbol is rendered alongside */
  balance?: string
  className?: string
}) {
  const s = SKIN_STYLE[skin]
  return (
    <div className={`w-[325px] overflow-hidden rounded-[14px] shadow-card ${className}`}>
      <div
        className="flex h-[57px] items-center justify-between px-4"
        style={{ background: s.header }}
      >
        <span className="text-[15px] font-semibold" style={{ color: s.label }}>
          Kiaan’s wallet
        </span>
        <span className="font-display text-[19px] font-extrabold tracking-tight text-ink">
          <Dirham className="mr-[2px]" />
          {balance}
        </span>
      </div>
      <img
        src={asset(`${s.body}.png`)}
        alt=""
        className="block max-w-none"
        style={{
          // overscan 2px to hide crop-edge slivers; clipped by overflow-hidden
          width: 'calc(100% + 2px)',
          marginLeft: -1,
          ...(s.filter ? { filter: s.filter } : {}),
        }}
        draggable={false}
      />
    </div>
  )
}
