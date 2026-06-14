/**
 * iPhone 17 Pro presentation frame.
 *
 * On real mobile (< sm) it's full-bleed — the device supplies its own bezels.
 * On desktop (≥ sm) it renders the titanium rail, a thin uniform black bezel,
 * the Dynamic Island, and the side buttons (Action, Volume ±, Side, Camera
 * Control). The inner screen stays exactly 375×812 so the design size is
 * untouched.
 */
export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full sm:h-auto sm:w-auto">
      {/* titanium rail (outer body) */}
      <div
        className="relative h-full w-full bg-white sm:rounded-[62px] sm:p-[3px] sm:shadow-[0_50px_100px_-25px_rgba(0,0,0,0.7)]"
        style={{
          backgroundImage:
            'linear-gradient(150deg,#5b5f66 0%,#2b2d31 14%,#3c3f45 30%,#1d1f23 52%,#42454b 72%,#222428 88%,#54585f 100%)',
        }}
      >
        {/* side buttons — sit on the rail, desktop only */}
        <Button className="left-[-2px] top-[150px] h-[26px]" />
        <Button className="left-[-2px] top-[200px] h-[52px]" />
        <Button className="left-[-2px] top-[268px] h-[52px]" />
        <Button className="right-[-2px] top-[150px] h-[30px]" />
        <Button className="right-[-2px] top-[214px] h-[78px]" />

        {/* black bezel */}
        <div className="relative h-full w-full overflow-hidden bg-white sm:rounded-[59px] sm:bg-black sm:p-[11px]">
          {/* screen */}
          <div className="relative h-full w-full overflow-hidden bg-white sm:h-[812px] sm:w-[375px] sm:rounded-[48px]">
            {children}

            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[11px] z-[60] hidden h-[37px] w-[126px] -translate-x-1/2 items-center justify-end rounded-[19px] bg-black pr-3 sm:flex">
              <span className="h-[9px] w-[9px] rounded-full bg-[#0b0d18] ring-1 ring-[#1c2030]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Button({ className }: { className: string }) {
  return (
    <div
      className={`absolute hidden w-[3px] rounded-[2px] sm:block ${className}`}
      style={{ backgroundImage: 'linear-gradient(90deg,#16181c,#3a3d43)' }}
    />
  )
}
