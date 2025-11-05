import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { firebaseService } from '../services/firebaseService'
import './EventsSidebar.css'
import { sortedEventData } from '../data/events'
import WinnersDetailSidebar from './WinnersDetailSidebar'

const toDate = (dateStr, timeStr) => new Date(`${dateStr} ${timeStr}`)

export default function LeaderboardSidebar({ open, onClose }) {
  const [now, setNow] = useState(Date.now())
  const [winners, setWinners] = useState({})
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [winnersDetailOpen, setWinnersDetailOpen] = useState(false)
  const [eventStatuses, setEventStatuses] = useState({})

  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    // Load winners and event statuses from Firebase
    const loadData = async () => {
      try {
        const [allWinners, allStatuses] = await Promise.all([
          firebaseService.getAllWinners(),
          firebaseService.getAllEventStatuses()
        ])
        setWinners(allWinners)
        setEventStatuses(allStatuses)
      } catch (error) {
        console.error('Error loading data:', error)
        // Set empty data to prevent infinite loading
        setWinners({})
        setEventStatuses({})
      }
    }
    
    loadData()
    
    // Reload data every 30 seconds to get updates
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
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
    return sortedEventData
      .map(e => {
        const start = toDate(e.date, e.time)
        const isClosed = eventStatuses[e.id] === 'closed'
        const status = isClosed ? 'Closed' : (n >= start ? 'Active' : 'Upcoming')
        return { ...e, start, status }
      })
  }, [now, eventStatuses])

  const handleCheckWinners = (event) => {
    setSelectedEvent(event)
    setWinnersDetailOpen(true)
  }

  const closeWinnersDetail = () => {
    setWinnersDetailOpen(false)
    setSelectedEvent(null)
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
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ backgroundColor: 'rgba(232, 232, 232, 0.1)' }}
                  >
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p className="event-date">{event.date} · {event.time}</p>
                      <p className="event-venue">📍 {event.venue}</p>
                      {hasWinners && (
                        <motion.button
                          className="check-winners-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckWinners(event);
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          🏆 Check Winners
                        </motion.button>
                      )}
                    </div>

                    <span className={`status-pill ${event.status.toLowerCase()}`}>
                      {event.status === 'Closed' ? '🔒 ' : ''}{event.status}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <WinnersDetailSidebar
            open={winnersDetailOpen}
            onClose={closeWinnersDetail}
            event={selectedEvent}
            winners={winners}
          />
        </>
      )}
    </AnimatePresence>
  )
}
