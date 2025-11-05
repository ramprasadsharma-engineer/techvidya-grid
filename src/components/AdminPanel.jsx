import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { firebaseService } from '../services/firebaseService'
import { useToast } from './ToastContainer'
import './AdminPanel.css'
import { sortedEventData } from '../data/events'

export default function AdminPanel() {
  const navigate = useNavigate()
  const { showToast, ToastContainer } = useToast()
  const [adminInfo, setAdminInfo] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [winners, setWinners] = useState({})
  const [editMode, setEditMode] = useState(null) // 'first', 'second', 'third', or null
  const [teamSize, setTeamSize] = useState({ first: 1, second: 1, third: 1 })
  const [teamMembers, setTeamMembers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [eventStatuses, setEventStatuses] = useState({})

  useEffect(() => {
    // Check Firebase authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminAuth = localStorage.getItem('adminAuth')
        if (adminAuth) {
          setAdminInfo(JSON.parse(adminAuth))
        }
      } else {
        navigate('/authlogin')
      }
    })

    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    // Load all winners and event statuses from Firestore
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
      }
    }

    if (adminInfo) {
      loadData()
    }
  }, [adminInfo])

  const handleLogout = async () => {
    try {
      await firebaseService.logout()
      localStorage.removeItem('adminAuth')
      navigate('/authlogin')
    } catch (error) {
      console.error('Logout error:', error)
      // Still navigate even if logout fails
      localStorage.removeItem('adminAuth')
      navigate('/authlogin')
    }
  }

  const handleEventSelect = (event) => {
    setSelectedEvent(event)
    setEditMode(null)
  }

  const startEdit = (position) => {
    setEditMode(position)
    const currentWinners = winners[selectedEvent.id]?.[position] || []
    const size = currentWinners.length || 1
    setTeamSize({ ...teamSize, [position]: size })
    setTeamMembers(currentWinners.length ? currentWinners : [{ name: '', year: '', college: '', department: '' }])
  }

  const handleTeamSizeChange = (position, size) => {
    const newSize = Math.max(1, Math.min(10, parseInt(size) || 1))
    setTeamSize({ ...teamSize, [position]: newSize })
    
    const current = [...teamMembers]
    if (newSize > current.length) {
      // Add empty members
      for (let i = current.length; i < newSize; i++) {
        current.push({ name: '', year: '', college: '', department: '' })
      }
    } else {
      // Remove extra members
      current.splice(newSize)
    }
    setTeamMembers(current)
  }

  const handleMemberChange = (index, field, value) => {
    const updated = [...teamMembers]
    updated[index] = { ...updated[index], [field]: value }
    setTeamMembers(updated)
  }

  const saveWinners = async () => {
    try {
      const validMembers = teamMembers.filter(m => m.name.trim() !== '')
      
      await firebaseService.saveWinners(
        selectedEvent.id,
        editMode,
        validMembers,
        adminInfo.email
      )

      // Update local state
      const updatedWinners = {
        ...winners,
        [selectedEvent.id]: {
          ...winners[selectedEvent.id],
          [editMode]: validMembers
        }
      }
      setWinners(updatedWinners)
      setEditMode(null)
      showToast('Winners saved successfully!', 'success')
    } catch (error) {
      console.error('Error saving winners:', error)
      showToast('Error saving winners: ' + error.message, 'error')
    }
  }

  const deleteWinners = async (position) => {
    if (!confirm(`Are you sure you want to delete ${position} place winners?`)) return
    
    try {
      await firebaseService.deleteWinners(selectedEvent.id, position)

      // Update local state
      const updatedWinners = { ...winners }
      if (updatedWinners[selectedEvent.id]) {
        delete updatedWinners[selectedEvent.id][position]
      }
      setWinners(updatedWinners)
      showToast('Winners deleted successfully!', 'success')
    } catch (error) {
      console.error('Error deleting winners:', error)
      showToast('Error deleting winners: ' + error.message, 'error')
    }
  }

  const cancelEdit = () => {
    setEditMode(null)
    setTeamMembers([])
  }

  const toggleEventStatus = async (eventId) => {
    try {
      const currentStatus = eventStatuses[eventId] || 'active'
      const newStatus = currentStatus === 'closed' ? 'active' : 'closed'
      
      await firebaseService.updateEventStatus(eventId, newStatus, adminInfo.email)
      
      setEventStatuses({
        ...eventStatuses,
        [eventId]: newStatus
      })
      
      showToast(`Event ${newStatus === 'closed' ? 'closed' : 'reopened'} successfully!`, 'success')
    } catch (error) {
      console.error('Error updating event status:', error)
      showToast('Error updating event status: ' + error.message, 'error')
    }
  }

  const filteredEvents = sortedEventData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate statistics
  const totalEvents = sortedEventData.length
  const eventsWithWinners = Object.keys(winners).filter(eventId => {
    const eventWinners = winners[eventId]
    return eventWinners.first?.length > 0 || eventWinners.second?.length > 0 || eventWinners.third?.length > 0
  }).length
  const closedEvents = Object.values(eventStatuses).filter(status => status === 'closed').length
  const totalWinners = Object.values(winners).reduce((acc, eventWinners) => {
    return acc + (eventWinners.first?.length || 0) + (eventWinners.second?.length || 0) + (eventWinners.third?.length || 0)
  }, 0)

  if (!adminInfo) return null

  return (
    <div className="admin-panel-container">
      <ToastContainer />
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Admin Panel</h1>
            <p>Logged in as: <strong>{adminInfo.username}</strong> ({adminInfo.department})</p>
          </div>
          <motion.button
            className="logout-btn"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="stats-dashboard">
        <motion.div 
          className="stat-card"
          style={{ '--stat-color': '#FFD700' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon">🎯</div>
          <p className="stat-label">Total Events</p>
          <h3 className="stat-value">{totalEvents}</h3>
        </motion.div>

        <motion.div 
          className="stat-card"
          style={{ '--stat-color': '#00ff88' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon">🏆</div>
          <p className="stat-label">Events with Winners</p>
          <h3 className="stat-value">{eventsWithWinners}</h3>
        </motion.div>

        <motion.div 
          className="stat-card"
          style={{ '--stat-color': '#ff6b6b' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon">🔒</div>
          <p className="stat-label">Closed Events</p>
          <h3 className="stat-value">{closedEvents}</h3>
        </motion.div>

        <motion.div 
          className="stat-card"
          style={{ '--stat-color': '#00d4ff' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon">👥</div>
          <p className="stat-label">Total Winners</p>
          <h3 className="stat-value">{totalWinners}</h3>
        </motion.div>
      </div>

      <div className="admin-content">
        {/* Events List Sidebar */}
        <div className="admin-sidebar">
          <div className="sidebar-search">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="events-list">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                className={`event-item ${selectedEvent?.id === event.id ? 'active' : ''}`}
                onClick={() => handleEventSelect(event)}
                whileHover={{ x: 5 }}
              >
                <h4>{event.title}</h4>
                <p>{event.date}</p>
                {winners[event.id] && (
                  <span className="has-winners-badge">✓</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="admin-main">
          {!selectedEvent ? (
            <div className="empty-state">
              <h2>Select an event to manage winners</h2>
              <p>Choose an event from the sidebar to add or edit winners</p>
            </div>
          ) : (
            <div className="event-management">
              <div className="event-header">
                <div className="event-title-section">
                  <h2>{selectedEvent.title}</h2>
                  <p>{selectedEvent.date} · {selectedEvent.time}</p>
                </div>
                <div className="event-status-section">
                  <span className={`event-status-badge ${eventStatuses[selectedEvent.id] === 'closed' ? 'closed' : 'active'}`}>
                    {eventStatuses[selectedEvent.id] === 'closed' ? '🔒 Closed' : '✅ Active'}
                  </span>
                  <motion.button
                    className={`status-toggle-btn ${eventStatuses[selectedEvent.id] === 'closed' ? 'reopen' : 'close'}`}
                    onClick={() => toggleEventStatus(selectedEvent.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {eventStatuses[selectedEvent.id] === 'closed' ? 'Reopen Event' : 'Close Event'}
                  </motion.button>
                </div>
              </div>

              {/* Winners Management */}
              <div className="winners-sections">
                {['first', 'second', 'third'].map((position) => (
                  <div key={position} className="winner-section">
                    <div className="winner-section-header">
                      <h3>
                        {position === 'first' ? '🥇 First' : position === 'second' ? '🥈 Second' : '🥉 Third'} Place
                      </h3>
                      <div className="winner-actions">
                        {editMode !== position && (
                          <>
                            <motion.button
                              className="edit-btn"
                              onClick={() => startEdit(position)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {winners[selectedEvent.id]?.[position] ? 'Edit' : 'Add'}
                            </motion.button>
                            {winners[selectedEvent.id]?.[position] && (
                              <motion.button
                                className="delete-btn"
                                onClick={() => deleteWinners(position)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Delete
                              </motion.button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {editMode === position ? (
                      <div className="edit-form">
                        <div className="team-size-selector">
                          <label>Team Size:</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={teamSize[position]}
                            onChange={(e) => handleTeamSizeChange(position, e.target.value)}
                          />
                        </div>

                        {teamMembers.map((member, index) => (
                          <div key={index} className="member-form">
                            <h4>Member {index + 1}</h4>
                            <div className="form-row">
                              <input
                                type="text"
                                placeholder="Name"
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Year (e.g., 1st, 2nd, 3rd, 4th)"
                                value={member.year}
                                onChange={(e) => handleMemberChange(index, 'year', e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Department"
                                value={member.department}
                                onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="College"
                                value={member.college}
                                onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}

                        <div className="form-actions">
                          <motion.button
                            className="save-btn"
                            onClick={saveWinners}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Save Winners
                          </motion.button>
                          <motion.button
                            className="cancel-btn"
                            onClick={cancelEdit}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="winners-display">
                        {winners[selectedEvent.id]?.[position]?.length > 0 ? (
                          winners[selectedEvent.id][position].map((member, index) => (
                            <div key={index} className="winner-card">
                              <div className="winner-info">
                                <p className="winner-name">{member.name}</p>
                                <p className="winner-details">{member.year && `${member.year} Year · `}{member.department} · {member.college}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="no-winners">No winners added yet</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
