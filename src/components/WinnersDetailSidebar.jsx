import { motion, AnimatePresence } from 'framer-motion'
import './WinnersDetailSidebar.css'

export default function WinnersDetailSidebar({ open, onClose, event, winners }) {
  if (!event || !winners) return null

  const eventWinners = winners[event.id] || {}
  const hasWinners = eventWinners.first?.length > 0 || 
                     eventWinners.second?.length > 0 || 
                     eventWinners.third?.length > 0

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="winners-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Dialog */}
          <motion.div
            className="winners-modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="winners-modal-header">
              <button className="close-btn" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <h3>{event.title}</h3>
              <p className="event-meta">{event.date} · {event.time}</p>
            </div>

            <div className="winners-modal-content">
              {!hasWinners ? (
                <div className="no-winners-yet">
                  <p>No winners announced yet</p>
                </div>
              ) : (
                <div className="podium-container">
                  {/* Second Place */}
                  {eventWinners.second?.length > 0 && (
                    <div className="winner-position-section podium-second">
                      <div className="position-header">
                        <span className="position-medal">🥈</span>
                        <h4>2nd Place</h4>
                      </div>
                      <div className="team-members">
                        {eventWinners.second.map((member, idx) => (
                          <div key={idx} className="member-item">
                            <p className="member-name">{member.name}</p>
                            <p className="member-info">
                              {member.year && `${member.year} Year · `}
                              {member.department}
                            </p>
                            <p className="member-college">{member.college}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* First Place */}
                  {eventWinners.first?.length > 0 && (
                    <div className="winner-position-section podium-first">
                      <div className="position-header">
                        <span className="position-medal">🥇</span>
                        <h4>1st Place</h4>
                      </div>
                      <div className="team-members">
                        {eventWinners.first.map((member, idx) => (
                          <div key={idx} className="member-item">
                            <p className="member-name">{member.name}</p>
                            <p className="member-info">
                              {member.year && `${member.year} Year · `}
                              {member.department}
                            </p>
                            <p className="member-college">{member.college}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Third Place */}
                  {eventWinners.third?.length > 0 && (
                    <div className="winner-position-section podium-third">
                      <div className="position-header">
                        <span className="position-medal">🥉</span>
                        <h4>3rd Place</h4>
                      </div>
                      <div className="team-members">
                        {eventWinners.third.map((member, idx) => (
                          <div key={idx} className="member-item">
                            <p className="member-name">{member.name}</p>
                            <p className="member-info">
                              {member.year && `${member.year} Year · `}
                              {member.department}
                            </p>
                            <p className="member-college">{member.college}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
