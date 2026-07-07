import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminRoute from "./pages/AdminRoute";

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

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Protected Routes */}

        <Route
            path="/"
            element={
                <ProtectedRoute>
                    <App />
                </ProtectedRoute>
            }
        >

            <Route index element={<Home />} />

            <Route path="map" element={<Map />} />

            <Route path="prediction" element={<Prediction />} />

            <Route path="analytics" element={<Analytics />} />

            <Route path="history" element={<History />} />

            <Route
                path="admin"
                element={
                    <AdminRoute>
                        <Admin />
                    </AdminRoute>
                }
            />

        </Route>

    </Routes>
</BrowserRouter>
  </StrictMode>,
)