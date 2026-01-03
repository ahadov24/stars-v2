import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home'
import Stars from './pages/stars/stars'
import Premium from './pages/premium/premium'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stars" element={<Stars />} />
        <Route path="/premium" element={<Premium />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
