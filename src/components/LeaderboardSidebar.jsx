import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EventsSidebar.css'
import { eventData } from '../data/events'

const toDate = (dateStr, timeStr) => new Date(`${dateStr} ${timeStr}`)

export default function LeaderboardSidebar({ open, onClose }) {
  const [now, setNow] = useState(Date.now())
  const [winners, setWinners] = useState({})

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    // Load winners from localStorage
    const loadWinners = () => {
      const storedWinners = localStorage.getItem('eventWinners')
      if (storedWinners) {
        setWinners(JSON.parse(storedWinners))
      }
    }
    
    loadWinners()
    
    // Listen for storage changes (when admin updates winners)
    window.addEventListener('storage', loadWinners)
    return () => window.removeEventListener('storage', loadWinners)
  }, [])

  useEffect(() => {
    const onEsc = (e) => { if (e.key === 'Escape') onClose?.() }
    if (open) {
      window.addEventListener('keydown', onEsc)
      return () => window.removeEventListener('keydown', onEsc)
    }
  }, [open, onClose])

  const items = useMemo(() => {
    const n = new Date(now)
    return eventData
      .map(e => {
        const start = toDate(e.date, e.time)
        const status = n >= start ? 'Active' : 'Upcoming'
        return { ...e, start, status }
      })
      .sort((a, b) => a.start - b.start)
  }, [now])

  const scrollToEvent = (eventId) => {
    const el = document.getElementById(`event-${eventId}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => onClose?.(), 300)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="events-sidebar leaderboard-sidebar-left"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="sidebar-header">
              <h3>Leaderboard</h3>
              <p>Live event status</p>
            </div>

            <div className="sidebar-events-list">
              {items.map((event, index) => {
                const hasWinners = winners[event.id] && 
                  (winners[event.id].first?.length > 0 || 
                   winners[event.id].second?.length > 0 || 
                   winners[event.id].third?.length > 0)
                
                return (
                  <motion.div
                    key={event.id}
                    className={`sidebar-event-item ${event.status === 'Active' ? 'active' : ''}`}
                    onClick={() => scrollToEvent(event.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ x: 10, backgroundColor: 'rgba(232, 232, 232, 0.1)' }}
                  >
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p className="event-date">{event.date} · {event.time}</p>
                      {hasWinners && winners[event.id].first?.length > 0 && (
                        <p className="winner-preview">
                          🏆 {winners[event.id].first[0].name}
                        </p>
                      )}
                    </div>

                    <span className={`status-pill ${event.status.toLowerCase()}`}>{event.status}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
