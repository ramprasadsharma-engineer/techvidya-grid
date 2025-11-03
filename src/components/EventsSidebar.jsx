import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EventsSidebar.css'

export default function EventsSidebar({ eventData, isVisible }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.events-sidebar') && !e.target.closest('.sidebar-toggle')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Scroll to specific event card
  const scrollToEvent = (eventId) => {
    const eventCard = document.getElementById(`event-${eventId}`)
    if (eventCard) {
      eventCard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      })
      setActiveEvent(eventId)
      // Close sidebar after a short delay
      setTimeout(() => setIsOpen(false), 300)
    }
  }

  // Track which event is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const eventCards = eventData.map(event => ({
        id: event.id,
        element: document.getElementById(`event-${event.id}`)
      }))

      const viewportMiddle = window.innerHeight / 2
      
      for (const { id, element } of eventCards) {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            setActiveEvent(id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [eventData])

  // Keep component mounted if sidebar is open, even if visibility flag toggles off momentarily
  if (!isVisible && !isOpen) return null

  return (
    <>
      {/* Hamburger Toggle Button */}
      <motion.button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </motion.button>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Content */}
            <motion.div
              className="events-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="sidebar-header">
                <h3>Events Navigation</h3>
              </div>

              <div className="sidebar-events-list">
                {eventData.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className={`sidebar-event-item ${activeEvent === event.id ? 'active' : ''}`}
                    onClick={() => scrollToEvent(event.id)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{ x: 10, backgroundColor: 'rgba(232, 232, 232, 0.1)' }}
                  >
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p className="event-date">{event.date}</p>
                    </div>
                    {activeEvent === event.id && (
                      <motion.div 
                        className="active-indicator"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
