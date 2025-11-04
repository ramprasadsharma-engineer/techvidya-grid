import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  query,
  where,
  orderBy 
} from 'firebase/firestore'
import { 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth'
import { db, auth } from '../lib/firebase'

export const firebaseService = {
  // Authentication
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Extract department from email (e.g., cse@techvidya.com -> CSE)
      const department = email.split('@')[0].toUpperCase()
      const username = email.split('@')[0] + '_admin'
      
      return {
        user: userCredential.user,
        admin: {
          username: username,
          department: department,
          email: email
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('Invalid email or password')
    }
  },

  async logout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  // Winners Management
  async saveWinners(eventId, position, members, adminEmail) {
    try {
      const docId = `${eventId}_${position}`
      await setDoc(doc(db, 'winners', docId), {
        eventId: parseInt(eventId),
        position,
        members,
        updatedAt: new Date(),
        updatedBy: adminEmail
      })
      return true
    } catch (error) {
      console.error('Error saving winners:', error)
      throw new Error('Failed to save winners')
    }
  },

  async getWinners(eventId) {
    try {
      const q = query(
        collection(db, 'winners'),
        where('eventId', '==', parseInt(eventId))
      )
      const querySnapshot = await getDocs(q)
      
      const winners = {}
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        winners[data.position] = data.members
      })
      
      return winners
    } catch (error) {
      console.error('Error getting winners:', error)
      return {}
    }
  },

  async getAllWinners() {
    try {
      const querySnapshot = await getDocs(collection(db, 'winners'))
      const allWinners = {}
      
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        if (!allWinners[data.eventId]) {
          allWinners[data.eventId] = {}
        }
        allWinners[data.eventId][data.position] = data.members
      })
      
      return allWinners
    } catch (error) {
      console.error('Error getting all winners:', error)
      return {}
    }
  },

  async deleteWinners(eventId, position) {
    try {
      const docId = `${eventId}_${position}`
      await deleteDoc(doc(db, 'winners', docId))
      return true
    } catch (error) {
      console.error('Error deleting winners:', error)
      throw new Error('Failed to delete winners')
    }
  },

  // Event Status Management
  async updateEventStatus(eventId, status, adminEmail) {
    try {
      await setDoc(doc(db, 'eventStatuses', eventId.toString()), {
        eventId: parseInt(eventId),
        status,
        updatedAt: new Date(),
        updatedBy: adminEmail
      })
      return true
    } catch (error) {
      console.error('Error updating event status:', error)
      throw new Error('Failed to update event status')
    }
  },

  async getEventStatus(eventId) {
    try {
      const docSnap = await getDoc(doc(db, 'eventStatuses', eventId.toString()))
      if (docSnap.exists()) {
        return docSnap.data().status
      }
      return 'active' // Default status
    } catch (error) {
      console.error('Error getting event status:', error)
      return 'active'
    }
  },

  async getAllEventStatuses() {
    try {
      const querySnapshot = await getDocs(collection(db, 'eventStatuses'))
      const statuses = {}
      
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        statuses[data.eventId] = data.status
      })
      
      return statuses
    } catch (error) {
      console.error('Error getting all event statuses:', error)
      return {}
    }
  }
}
