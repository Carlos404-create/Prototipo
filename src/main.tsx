import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/Estilo.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
