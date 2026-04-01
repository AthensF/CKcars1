import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CameraKit } from './contexts/CameraKitContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CameraKit>
      <App />
    </CameraKit>
  </StrictMode>,
)
