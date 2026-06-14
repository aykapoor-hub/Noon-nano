import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './loadFonts'
import './index.css'
import App from './App'
import { NanoProvider } from './state'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NanoProvider>
      <App />
    </NanoProvider>
  </StrictMode>,
)
