import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './AuthLogin.css'

// Predefined admin credentials (in production, this should be in backend)
const ADMIN_CREDENTIALS = {
  'cse_admin': 'CSE@2025#tech',
  'aiml_admin': 'AIML@2025#tech',
  'ise_admin': 'ISE@2025#tech',
  'ec_admin': 'EC@2025#tech',
  'mech_admin': 'MECH@2025#tech',
  'civil_admin': 'CIVIL@2025#tech',
  'mba_admin': 'MBA@2025#tech',
  'ds_admin': 'DS@2025#tech',
  'webmaster': 'WEB@master#2025!',
  'convenor': 'CONV@enor#2025!',
  'chief_coordinator': 'CHIEF@coord#2025!'
}

export default function AuthLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      if (ADMIN_CREDENTIALS[username] === password) {
        // Store auth token in localStorage
        localStorage.setItem('adminAuth', JSON.stringify({
          username,
          department: username.replace('_admin', '').toUpperCase(),
          timestamp: Date.now()
        }))
        navigate('/admin')
      } else {
        setError('Invalid username or password')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="auth-login-container">
      <div className="auth-background">
        <div className="auth-orb orb-1" />
        <div className="auth-orb orb-2" />
        <div className="auth-orb orb-3" />
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h1>Admin Login</h1>
          <p>TechVidya 2K25 - Event Management</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <div className="auth-footer">
          <p>Authorized personnel only</p>
          <motion.button
            className="back-home-btn"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
