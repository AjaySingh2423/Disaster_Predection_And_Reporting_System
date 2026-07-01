import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'

// Pages
import Home from './pages/Home.jsx'
import Map from './pages/Map.jsx'
import Prediction from './pages/Prediction.jsx'
import Analytics from './pages/Analytics.jsx'
import History from './pages/History.jsx'
import Login from './pages/Login.jsx'
import Registration from './pages/Registration.jsx'
import Admin from './pages/Admin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Layout (Navbar stays same) */}
        <Route path="/" element={<App />}>

          {/* Nested Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="map" element={<Map />} />
          <Route path="prediction" element={<Prediction />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="history" element={<History />} />
          <Route path="admin" element={<Admin />} />
         

        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)