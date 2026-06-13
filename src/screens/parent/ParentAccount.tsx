import { motion } from 'framer-motion'
import { asset } from '../../lib/asset'
import Dirham from '../../components/Dirham'

// account-page assets exported straight from Figma (node 1201:11025)
const a = (n: string) => asset(`account/${n}`)

/* ── iOS status bar (real exported glyphs) ─────────────────────────── */
function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-40 flex h-[62px] items-center justify-between px-[24px] pb-[19px] pt-[21px]">
      <p className="text-[17px] font-semibold tracking-[-0.3px] text-black">9:41</p>
      <div className="flex items-center gap-[7px]">
        <img src={a('imgCellularConnection.svg')} alt="" className="h-[12.226px] w-[19.2px]" />
        <img src={a('imgWifi.svg')} alt="" className="h-[12.328px] w-[17.142px]" />
        <img src={a('imgFrame.svg')} alt="" className="h-[13px] w-[27.328px]" />
      </div>
    </div>
  )
}

/* ── account list row ──────────────────────────────────────────────── */
function ListRow({
  icon,
  label,
  trailing,
  last = false,
}: {
  icon: string
  label: string
  trailing?: React.ReactNode
  last?: boolean
}) {
  return (
    <>
      <div className="flex h-[38px] w-full items-center justify-between">
        <div className="flex min-w-px flex-1 items-center gap-[8px]">
          <span className="flex items-center rounded-[8px] p-[4px]">
            <img src={a(icon)} alt="" className="h-[20px] w-[20px]" />
          </span>
          <p className="text-[14px] font-medium tracking-[-0.1px] text-[#1d2539]">{label}</p>
        </div>
        {trailing ?? <img src={a('imgFrame2147240641.svg')} alt="" className="h-[14px] w-[14px]" />}
      </div>
      {!last && <div className="h-px w-full" style={{ background: 'url(' + a('imgLine.png') + ') center/100% no-repeat' }} />}
    </>
  )
}

export default function ParentAccount({
  hasFamily,
  onSetupNano,
  onOpenFamily,
}: {
  hasFamily: boolean
  onSetupNano: () => void
  onOpenFamily: () => void
}) {
  const thumbs = ['imgImage.png', 'imgImage84139583.png', 'imgImage1.png', 'imgImage84139584.png']

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f2f3f7] font-noon">
      <StatusBar />
      {/* scrollable content */}
      <div className="no-scrollbar absolute inset-0 overflow-y-auto">
        <div className="mx-auto flex w-[351px] flex-col gap-[12px] pb-[150px] pt-[74px]">
          {/* ── header card: profile + One delivery banner ── */}
          <div
            className="flex w-[351px] flex-col items-center overflow-hidden rounded-[16px] border-2 border-white"
            style={{ background: '#fff3c0' }}
          >
            {/* profile */}
            <div className="flex w-full items-center gap-[12px] bg-white px-[12px] py-[16px]">
              <div
                className="flex size-[48px] shrink-0 items-center justify-center overflow-hidden rounded-full"
                style={{ background: '#ebebed' }}
              >
                <span className="text-[24.47px] font-bold leading-none tracking-[-0.305px] text-black">A</span>
              </div>
              <div className="flex min-w-px flex-1 flex-col justify-center gap-[2px]">
                <p className="truncate text-[18px] font-bold leading-[24px] tracking-[-0.15px] text-[#1d2539]">
                  Anmol Jain
                </p>
                <p className="truncate text-[12px] leading-[16px] tracking-[-0.1px] text-[#666d85]">
                  ajain@gmail.com
                </p>
              </div>
              <button className="flex shrink-0 items-center justify-center rounded-full border border-[#f2f3f7] p-[9px]">
                <img src={a('imgLIneRaw2.svg')} alt="edit" className="size-[18px]" />
              </button>
            </div>
            {/* One banner */}
            <button
              className="relative flex w-full items-center justify-between overflow-hidden pb-[12px] pl-[12px] pr-[12px] pt-[10px]"
              style={{
                background:
                  'radial-gradient(60% 180% at 12% 120%, rgba(255,168,45,0.45) 0%, rgba(255,168,45,0) 60%), #fef8ec',
              }}
            >
              <div className="flex items-center gap-[8px]">
                <span className="relative h-[24px] w-[40px] shrink-0">
                  <img src={a('imgGroup1.svg')} alt="noon One" className="absolute inset-0 size-full object-contain" />
                  <img
                    src={a('imgGroup2.svg')}
                    alt=""
                    className="absolute left-[6px] top-[7px] h-[8px] w-[26px] object-contain"
                  />
                </span>
                <p className="whitespace-nowrap text-[14px] font-bold leading-[20px] tracking-[-0.1px] text-[#1d2539]">
                  Get Free Delivery
                </p>
              </div>
              <div className="flex items-center">
                <p className="whitespace-nowrap text-[14px] font-bold leading-[20px] text-[#1d2539]">Join One</p>
                <img src={a('imgFrame2147240642.svg')} alt="" className="size-[18px]" />
              </div>
            </button>
          </div>

          {/* ── My Orders / My Wishlist ── */}
          <div className="flex w-full items-center gap-[12px]">
            {['My Orders', 'My Wishlist'].map((title) => (
              <div key={title} className="flex w-[170px] flex-col overflow-hidden rounded-[12px] bg-white">
                <div className="flex w-full items-center justify-center p-[12px]">
                  <p className="min-w-px flex-1 truncate text-[14px] font-bold leading-[18px] tracking-[-0.1px] text-[#1d2539]">
                    {title}
                  </p>
                </div>
                <div className="flex w-full items-start gap-[4px] px-[10px] pb-[10px]">
                  {thumbs.map((src) => (
                    <span
                      key={src}
                      className="h-[56.857px] w-[42.642px] overflow-hidden rounded-[8.122px]"
                      style={{ background: '#e8e8ea' }}
                    >
                      <img src={a(src)} alt="" className="size-full object-cover" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── noon Credits ── */}
          <div className="flex w-[351px] items-center rounded-[16px] bg-white py-[4px]">
            <span className="flex items-center justify-center pl-[12px]">
              <img src={a('imgVector1.svg')} alt="" className="size-[20px]" />
            </span>
            <div className="flex min-w-px flex-1 items-center justify-between">
              <p className="px-[12px] py-[16px] text-[14px] font-medium leading-[20px] tracking-[-0.1px] text-[#1d2539]">
                noon Credits
              </p>
              <div className="flex items-center py-[8px] pr-[12px]">
                <div className="flex items-center gap-[4px] rounded-full bg-[#f9f9fb] py-[8px] pl-[12px] pr-[8px]">
                  <p className="flex items-center whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[-0.1px] text-[#1d2539]">
                    <Dirham className="mr-[1px]" />320
                  </p>
                  <img src={a('imgFrame2147240643.svg')} alt="" className="size-[14px]" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Introducing noon nano ── */}
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={hasFamily ? onOpenFamily : onSetupNano}
            className="flex w-[351px] items-center justify-between overflow-hidden rounded-[16px] bg-white text-left"
          >
            <div className="flex flex-col items-start gap-[12px] py-[12px] pl-[12px]">
              <div className="flex flex-col items-start gap-[2px]">
                <div className="flex items-center gap-[4px]">
                  <p className="whitespace-nowrap text-[16px] font-bold leading-[22px] tracking-[-0.15px] text-[#1d2539]">
                    {hasFamily ? 'Manage your family' : 'Introducing noon nano'}
                  </p>
                  {!hasFamily && (
                    <span className="flex items-center justify-center rounded-[4px] bg-[#d62925] px-[2px]">
                      <span className="text-[11px] font-extrabold leading-[14px] tracking-[-0.12px] text-white">NEW</span>
                    </span>
                  )}
                </div>
                <p className="whitespace-nowrap text-[14px] font-medium leading-[20px] tracking-[-0.1px] text-[#666d85]">
                  Let your kids shop on their own
                </p>
              </div>
              <span
                className="flex w-[120px] items-center justify-center gap-[4px] rounded-[10px] px-[14px] py-[10px]"
                style={{ background: 'linear-gradient(180deg, #1d2539 0%, #343d54 100%)' }}
              >
                <span className="whitespace-nowrap text-[14px] font-semibold leading-[20px] tracking-[-0.1px] text-white">
                  {hasFamily ? 'Open dashboard' : 'Invite your child'}
                </span>
              </span>
            </div>
            {/* right-side 3D art cluster — exported as one image from Figma */}
            <div className="relative h-[120px] w-[132px] shrink-0 bg-white">
              <img src={a('nano_art.png')} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          </motion.button>

          {/* ── account list ── */}
          <div className="flex w-[351px] flex-col items-center justify-center gap-[14px] rounded-[16px] bg-white p-[12px]">
            <div className="flex w-[327px] flex-col gap-[8px]">
              <ListRow icon="imgFrame2147240061.svg" label="Addresses" />
              <ListRow icon="imgGroup2147226750.svg" label="Manage Cards" />
              <ListRow icon="imgGroup2147226750.svg" label="Returns" />
              <ListRow icon="imgGroup1686557794.svg" label="Warranty claims" />
              <ListRow
                icon="imgGroup1686557793.svg"
                label="Language"
                trailing={
                  <span className="flex h-[34px] items-center rounded-full bg-[#f9f9fb] p-[4px]">
                    <span className="rounded-[12px] bg-white px-[10px] py-[8px] text-[12px] font-semibold leading-[14px] tracking-[-0.12px] text-[#1d2539] shadow-[inset_0px_1px_4px_0px_rgba(36,36,36,0.04)]">
                      English
                    </span>
                    <span className="px-[10px] py-[8px] text-[14px] font-medium leading-[14px] text-[#666d85]" dir="rtl">
                      العربية
                    </span>
                  </span>
                }
              />
              <ListRow
                icon="imgGroup1686557289.svg"
                label="Country"
                last
                trailing={
                  <span className="flex items-center gap-[8px]">
                    <span className="h-[18px] w-[24px] overflow-hidden rounded-[2px] shadow-[0px_1.5px_1.125px_rgba(0,0,0,0.1)]">
                      <img src={a('imgContents.svg')} alt="UAE" className="size-full object-cover" />
                    </span>
                    <img src={a('imgFrame2147240641.svg')} alt="" className="size-[14px]" />
                  </span>
                }
              />
            </div>
          </div>

          {/* ── noon One Credit Card promo ── */}
          <div className="flex w-[351px] items-stretch justify-center overflow-hidden rounded-[16px] bg-white">
            <div className="flex min-w-px flex-1 flex-col items-start gap-[4px] pb-[14px] pl-[14px] pr-[8px] pt-[12px]">
              <p className="text-[14px] font-bold leading-[20px] tracking-[-0.1px] text-[#343d54]">noon One Credit Card</p>
              <div className="flex w-full flex-col gap-[10px]">
                <div className="flex flex-col gap-[2px]">
                  {['20% off + free 1 year noon One', 'dhm500* welcome bonus'].map((t) => (
                    <div key={t} className="flex items-center gap-[6px]">
                      <span className="size-[8px] shrink-0 rounded-full bg-[#ffa82d]" />
                      <p className="min-w-px flex-1 text-[12px] leading-[18px] tracking-[-0.1px] text-[#475067]">{t}</p>
                    </div>
                  ))}
                </div>
                <span className="flex min-h-[36px] items-center justify-center rounded-[8px] bg-[#101628] px-[16px] py-[10px]">
                  <span className="text-[12px] font-semibold leading-[16px] text-white">Apply now</span>
                </span>
              </div>
            </div>
            <div className="relative w-[138px] shrink-0 overflow-hidden">
              <img src={a('imgImage84139622.png')} alt="" className="absolute right-[-12px] top-[18px] w-[150px] -rotate-[8deg]" />
            </div>
          </div>

          {/* ── App & Settings ── */}
          <div className="flex w-[351px] flex-col gap-[14px] rounded-[16px] bg-white p-[12px]">
            <ListRow icon="imgGroup2147226751.svg" label="Preferences" />
            <ListRow icon="imgGroup1686557290.svg" label="Notifications" last />
          </div>

          {/* ── Support ── */}
          <div className="flex w-[351px] flex-col gap-[12px] rounded-[16px] bg-white px-[12px] pb-[16px] pt-[12px]">
            <ListRow icon="imgVector.svg" label="Account Security" />
            <ListRow icon="imgGroup.svg" label="Sign out" last />
          </div>

          <p className="w-full text-center text-[12px] leading-[20px] text-[#9aa1b3]">
            Version 4.63.0 designed with care in every detail.
          </p>
        </div>
      </div>

      {/* ── floating "Need help?" pill ── */}
      <div className="absolute bottom-[100px] right-[12px] z-30">
        <div className="flex items-center gap-[8px] rounded-[36px] border-2 border-[#bbdaff] bg-white p-[12px] shadow-[0px_-4px_32px_0px_rgba(34,34,34,0.12)]">
          <img src={a('imgNeedHelpProfileContainer.svg')} alt="" className="size-[20px]" />
          <p className="whitespace-nowrap text-[16px] font-semibold leading-[20px] tracking-[-0.16px] text-[#1d2539]">
            Need help?
          </p>
        </div>
      </div>

      {/* ── bottom navigation ── */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center bg-white drop-shadow-[0px_-4px_12.5px_rgba(0,0,0,0.06)]">
        <div className="flex w-full items-center justify-between px-[16px]">
          {[
            { icon: 'imgGroup1686557244.svg', label: 'Home', active: false },
            { icon: 'imgGroup1686557245.svg', label: 'Categories', active: false },
            { icon: 'imgVectors.svg', label: 'Deals', active: false },
            { icon: 'imgGroup1686557247.svg', label: 'Account', active: true },
            { icon: 'imgGroup1686557248.svg', label: 'Cart', active: false },
          ].map((t) => (
            <div key={t.label} className="flex h-[63px] w-[67px] flex-col items-center gap-[8px]">
              <span
                className={`h-[4px] w-[56px] rounded-b-[8px] ${t.active ? 'bg-[#1155cb]' : 'bg-white'}`}
              />
              <div className="flex min-h-px flex-1 w-[67px] flex-col items-center justify-center">
                <img src={a(t.icon)} alt="" className="size-[32px]" />
                <p
                  className={`whitespace-nowrap text-[12px] font-medium leading-[20px] tracking-[-0.16px] ${
                    t.label === 'Home' ? 'text-[#475067]' : 'text-[#666d85]'
                  }`}
                >
                  {t.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex h-[25px] w-full flex-col items-center justify-center pb-[8px] pt-[12px]">
          <span className="h-[5px] w-[124px] rounded-[8px] bg-[#343d54]" />
        </div>
      </div>
    </div>
  )
}
