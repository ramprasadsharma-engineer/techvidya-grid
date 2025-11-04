import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AuthLogin from './components/AuthLogin.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import './index.css'

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(
      (registration) => {
        console.log('ServiceWorker registration successful:', registration.scope)
      },
      (err) => {
        console.log('ServiceWorker registration failed:', err)
      }
    )
  })
}

// Remove loading screen after app loads
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen')
    if (loadingScreen) {
      loadingScreen.style.opacity = '0'
      loadingScreen.style.transition = 'opacity 0.5s ease-out'
      setTimeout(() => {
        loadingScreen.remove()
      }, 500)
    }
  }, 1000)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/authlogin" element={<AuthLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

