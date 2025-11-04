import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { firebaseService } from '../services/firebaseService'
import './AdminPanel.css'
import { eventData } from '../data/events'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [adminInfo, setAdminInfo] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [winners, setWinners] = useState({})
  const [editMode, setEditMode] = useState(null) // 'first', 'second', 'third', or null
  const [teamSize, setTeamSize] = useState({ first: 1, second: 1, third: 1 })
  const [teamMembers, setTeamMembers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

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
    // Load all winners from Firestore
    const loadAllWinners = async () => {
      try {
        const allWinners = await firebaseService.getAllWinners()
        setWinners(allWinners)
      } catch (error) {
        console.error('Error loading winners:', error)
      }
    }

    if (adminInfo) {
      loadAllWinners()
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
    setTeamMembers(currentWinners.length ? currentWinners : [{ name: '', college: '', department: '' }])
  }

  const handleTeamSizeChange = (position, size) => {
    const newSize = Math.max(1, Math.min(10, parseInt(size) || 1))
    setTeamSize({ ...teamSize, [position]: newSize })
    
    const current = [...teamMembers]
    if (newSize > current.length) {
      // Add empty members
      for (let i = current.length; i < newSize; i++) {
        current.push({ name: '', college: '', department: '' })
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
      alert('Winners saved successfully!')
    } catch (error) {
      console.error('Error saving winners:', error)
      alert('Error saving winners: ' + error.message)
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
      alert('Winners deleted successfully!')
    } catch (error) {
      console.error('Error deleting winners:', error)
      alert('Error deleting winners: ' + error.message)
    }
  }

  const cancelEdit = () => {
    setEditMode(null)
    setTeamMembers([])
  }

  const filteredEvents = eventData.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!adminInfo) return null

  return (
    <div className="admin-panel-container">
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
                <h2>{selectedEvent.title}</h2>
                <p>{selectedEvent.date} · {selectedEvent.time}</p>
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
                                placeholder="College"
                                value={member.college}
                                onChange={(e) => handleMemberChange(index, 'college', e.target.value)}
                              />
                              <input
                                type="text"
                                placeholder="Department"
                                value={member.department}
                                onChange={(e) => handleMemberChange(index, 'department', e.target.value)}
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
                                <p className="winner-details">{member.college} · {member.department}</p>
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
