import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicSite from './pages/PublicSite'
import Admin from './pages/Admin'
import './index.css'
import './App.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<PublicSite />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
