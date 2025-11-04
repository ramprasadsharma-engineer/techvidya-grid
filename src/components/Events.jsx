import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './Events.css'
import EventsSidebar from './EventsSidebar'
import { sortedEventData } from '../data/events'


export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [sidebarVisible, setSidebarVisible] = useState(false)

  // Track when events section is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const eventsSection = document.getElementById('events')
      if (eventsSection) {
        const rect = eventsSection.getBoundingClientRect()
        // Show sidebar when events section is visible (with more generous margin)
        const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200
        setSidebarVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Also show the sidebar toggle as soon as the section is observed in view
  useEffect(() => {
    if (isInView) {
      setSidebarVisible(true)
    }
  }, [isInView])

  return (
    <section className="section events-section" id="events" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        EVENTS
      </motion.h2>

      <EventsSidebar eventData={sortedEventData} isVisible={sidebarVisible} />

      <div className="events-grid">
        {sortedEventData.map((event, index) => (
          <motion.div
            key={event.id}
            id={`event-${event.id}`}
            className="event-card-new glass"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 60px rgba(0, 240, 255, 0.3)"
            }}
            style={{
              backgroundImage: `url(${event.posterImage})`,
            }}
          >
            {/* Background Overlay */}
            <div className="event-overlay"></div>
            
            {/* Event Content */}
            <div className="event-content-new">
              <h3 className="event-title-new">{event.title}</h3>
              
              <p className="event-description">{event.description}</p>
              
              <div className="event-details-divider">
                <div className="gradient-line"></div>
                <div className="details-row">
                  <span className="detail-item">{event.date}</span>
                  <span className="detail-separator">│</span>
                  <span className="detail-item">{event.time}</span>
                </div>
              </div>
              
              <div className="event-buttons">
                {event.embedWebsite ? (
                  <motion.a
                    href={event.embedWebsite}
                    className="event-btn know-more-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Website
                  </motion.a>
                ) : (
                  <motion.a
                    href={event.knowMoreLink}
                    className="event-btn know-more-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Know More
                  </motion.a>
                )}
                {!event.registrationLink ? (
                  <motion.div
                    className="event-btn register-btn coming-soon-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: 'not-allowed', opacity: 0.7 }}
                  >
                    Coming Soon
                  </motion.div>
                ) : (
                  <motion.a
                    href={event.registrationLink}
                    className="event-btn register-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

