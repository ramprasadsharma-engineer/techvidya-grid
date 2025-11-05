import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Toast.css'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`toast toast-${type}`}
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="toast-icon">{icons[type]}</div>
        <p className="toast-message">{message}</p>
        <button className="toast-close" onClick={onClose}>✕</button>
      </motion.div>
    </AnimatePresence>
  )
}
