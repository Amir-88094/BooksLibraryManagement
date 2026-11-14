import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  // strict mode a tool for highlighting potential problems in application
  // it activates additiona checks and warnings 
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
