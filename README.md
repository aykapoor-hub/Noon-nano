# noon nano

Working prototype of **noon nano** — a kids' money + commerce experience inside
noon for ages ~9–14. Kids **earn** (chores & tasks set by a parent), **save**,
and **spend** on a child-safe catalogue where every purchase is **approved by a
parent**. Built from the
[Figma design](https://www.figma.com/design/ugyIDYJklLkgwDAqcsLku8/noon-Kids--nano-?node-id=806-8847).

**Live:** https://aykapoor-hub.github.io/Noon-nano/

## Two journeys, one switchable demo

A floating **Parent / Child** switch (top-centre) flips between the two
personas, which share one live state (wallet balance, tasks, the pending order).

**Parent** — `My Account → Introducing noon nano`
→ tell us about your child → how they sign in → set a PIN → **Scan & Go (QR)**
→ all done → **family dashboard** (balances, spend, *Assign tasks*, *Top up wallet*)
→ **approval required** (review the child's order + note) → approved.

**Child** — scanned in from the parent's QR
→ splash → intro → email OTP → welcome → card-skin picker → interests
→ **home** (wallet, earning streak, **daily tasks with checkboxes**, games, referral)
→ cart (*Need parent's approval*) → **Send for approval** → Sent to Dad
→ (once the parent approves) → **Arriving in 1h 12min**.

The loops connect: completing tasks grows the wallet; the child's *Send for
approval* surfaces on the parent's dashboard; the parent's *Approve* drops the
child straight onto the Arriving screen.

## Run

```bash
npm install
npm run dev
```

Best viewed at 375×812 (renders inside a phone frame on desktop).

## Dev shortcuts

- `?persona=parent|child` — open a specific journey
- `?p=<step>` — parent step: `account | details | signin | pin | qr | done | family | approval | approved`
- `?step=<step>` — child step: `splash | intro | mail | welcome | skin | interests | home | cart | sent | arriving`
- `?nomotion=1` — skip animations (for screenshots/QA)

All QA params are consumed on load, so a plain refresh starts the journey at the
parent's account page.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 3
- framer-motion for the choreography (incl. a splash→intro shared-element logo)
- A small React context (`src/state.tsx`) is the single source of truth shared
  by both personas

## Scope

Per the brief: complete end-to-end journeys for **both** parent and child. The
parent journey starts from the Account page (the rest of noon isn't rebuilt);
the child journey covers the nano experience only — the shopping/search
catalogue is intentionally out of scope, but cart → approval → arriving (the
approval mechanic) is included.

## How it was built

Illustration assets (logo, product collage, envelope, card art, interest icons,
home chips) are sliced from the Figma frame export into `public/assets/`; all UI
chrome, text, motion, and the QR/dirham marks are rebuilt in code. Currency uses
the official UAE dirham symbol (`src/components/Dirham.tsx`).
