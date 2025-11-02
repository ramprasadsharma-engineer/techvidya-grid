import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

export default function Navbar({ scrollY }) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  useEffect(() => {
    const sections = ['about', 'events', 'contact']
    const navHeight = 100
    
    const currentSection = sections.find(section => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= navHeight && rect.bottom >= navHeight
      }
      return false
    })
    
    setActiveSection(currentSection || '')
  }, [scrollY])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    const navHeight = 80
    const targetPosition = element.offsetTop - navHeight

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }

  return (
    <motion.nav
      className={`navbar glass ${isVisible ? 'visible' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <motion.a
          href="#hero"
          className="logo"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('hero')
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          TECHVIDYA 2K25
        </motion.a>
        <ul className="nav-menu">
          {['about', 'events', 'contact'].map((item) => (
            <li key={item}>
              <motion.a
                href={`#${item}`}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item === 'contact' ? 'SUPPORT' : item.toUpperCase()}
              </motion.a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

