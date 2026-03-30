import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Spinners from './Spinners'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Spinners/>
  </StrictMode>,
)
