# noon nano

Working prototype of the **noon nano** (kids) onboarding flow, built from the
[Figma design](https://www.figma.com/design/ugyIDYJklLkgwDAqcsLku8/noon-Kids--nano-?node-id=831-8848).

A place to shop, save & earn — splash → intro → email OTP → welcome →
card-skin picker → interests → home.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173 — best viewed at 375×812 (the app renders inside a
phone frame on desktop).

## Dev shortcuts

- `?step=<name>` jumps straight to a screen:
  `splash | intro | mail | welcome | skin | interests | home`
- `?nomotion=1` skips all animations (handy for screenshots/QA)

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 3
- framer-motion for the flow choreography

## How it was built

Illustration assets (logo, product collage, envelope, card art, interest
icons, home chips) are sliced from the Figma frame export into
`public/assets/`; all UI chrome, text, and motion are rebuilt in code so the
flow is fully interactive (live OTP keypad, skin carousel with five skins,
interest picking with a 3-minimum gate, dynamic wallet balance).
