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
          <motion.div
            className="winners-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="winners-detail-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="winners-sidebar-header">
              <button className="close-btn" onClick={onClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <h3>{event.title}</h3>
              <p className="event-meta">{event.date} · {event.time}</p>
              <p className="event-venue">📍 {event.venue}</p>
            </div>

            <div className="winners-content">
              {!hasWinners ? (
                <div className="no-winners-yet">
                  <p>No winners announced yet</p>
                </div>
              ) : (
                <>
                  {/* First Place */}
                  {eventWinners.first?.length > 0 && (
                    <div className="winner-position-section">
                      <div className="position-header">
                        <span className="position-medal">🥇</span>
                        <h4>First Place</h4>
                      </div>
                      <div className="team-members">
                        {eventWinners.first.map((member, idx) => (
                          <div key={idx} className="member-card">
                            <div className="member-number">Member {idx + 1}</div>
                            <h5 className="member-name">{member.name}</h5>
                            <div className="member-details">
                              {member.year && <span className="detail-badge">{member.year} Year</span>}
                              <span className="detail-badge">{member.department}</span>
                              <span className="detail-badge college">{member.college}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Second Place */}
                  {eventWinners.second?.length > 0 && (
                    <div className="winner-position-section">
                      <div className="position-header">
                        <span className="position-medal">🥈</span>
                        <h4>Second Place</h4>
                      </div>
                      <div className="team-members">
                        {eventWinners.second.map((member, idx) => (
                          <div key={idx} className="member-card">
                            <div className="member-number">Member {idx + 1}</div>
                            <h5 className="member-name">{member.name}</h5>
                            <div className="member-details">
                              {member.year && <span className="detail-badge">{member.year} Year</span>}
                              <span className="detail-badge">{member.department}</span>
                              <span className="detail-badge college">{member.college}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Third Place */}
                  {eventWinners.third?.length > 0 && (
                    <div className="winner-position-section">
                      <div className="position-header">
                        <span className="position-medal">🥉</span>
                        <h4>Third Place</h4>
                      </div>
                      <div className="team-members">
                        {eventWinners.third.map((member, idx) => (
                          <div key={idx} className="member-card">
                            <div className="member-number">Member {idx + 1}</div>
                            <h5 className="member-name">{member.name}</h5>
                            <div className="member-details">
                              {member.year && <span className="detail-badge">{member.year} Year</span>}
                              <span className="detail-badge">{member.department}</span>
                              <span className="detail-badge college">{member.college}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="event-details-footer">
              <div className="event-info-row">
                <span className="info-label">Team Size:</span>
                <span className="info-value">{event.teamSize}</span>
              </div>
              <div className="event-info-row">
                <span className="info-label">Registration Fee:</span>
                <span className="info-value">{event.registrationFee}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
