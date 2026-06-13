/**
 * Decorative-but-believable QR code rendered from a fixed bit pattern
 * (deterministic, so it looks like a real code without encoding anything).
 */
const N = 21
// deterministic pseudo-pattern
function bit(x: number, y: number) {
  const v = (x * 73856093) ^ (y * 19349663) ^ ((x + 1) * (y + 3) * 83492791)
  return (v >>> 3) % 2 === 0
}
function isFinder(x: number, y: number) {
  const inEye = (ox: number, oy: number) => {
    const dx = x - ox
    const dy = y - oy
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null
    const ring = dx === 0 || dy === 0 || dx === 6 || dy === 6
    const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4
    return ring || core
  }
  return inEye(0, 0) ?? inEye(N - 7, 0) ?? inEye(0, N - 7) ?? false
}

export default function QRBlock({ size = 168 }: { size?: number }) {
  const cells = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const finder = isFinder(x, y)
      const nearFinder =
        (x <= 7 && y <= 7) || (x >= N - 8 && y <= 7) || (x <= 7 && y >= N - 8)
      const on = finder || (!nearFinder && bit(x, y))
      if (on)
        cells.push(
          <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} rx={0.18} fill="#16181d" />,
        )
    }
  }
  return (
    <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} width={size} height={size} shapeRendering="crispEdges">
      <rect x={-1} y={-1} width={N + 2} height={N + 2} fill="#fff" />
      {cells}
    </svg>
  )
}
