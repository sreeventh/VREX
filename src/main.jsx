import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Trial from './Trial.jsx'
import Aud from './Audbug.jsx'
import World from './Bf.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <World />
  </StrictMode>,

)
