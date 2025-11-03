import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  }

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 1.2
      }
    }
  }

  return (
    <section className="hero" id="hero">
      {/* Animated background elements */}
      <div className="hero-bg-elements">
        <div className="floating-orb orb-1" />
        <div className="floating-orb orb-2" />
        <div className="floating-orb orb-3" />
        <div className="grid-pattern" />
      </div>

      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >

        <motion.h3
          className="institute-name"
          variants={itemVariants}
        >
          <span className="gradient-text">Sai Vidya</span>
          <span className="light-text"> Institute of Technology</span>
        </motion.h3>
        
        <motion.div
          className="presents-wrapper"
          variants={itemVariants}
        >
          <span className="presents-line left-line"></span>
          <span className="presents-text">Presents</span>
          <span className="presents-line right-line"></span>
        </motion.div>
        
        <motion.h3
          className="event-type"
          variants={itemVariants}
        >
          <span className="highlight-box">STATE-LEVEL</span>
          <span className="type-text">TECHNICAL FEST</span>
        </motion.h3>
        
        <motion.div 
          className="main-title-wrapper"
          variants={titleVariants}
        >
          <h1 className="main-title">
            <span className="title-part tech">TECH</span>
            <span className="title-part vidya">VIDYA</span>
            <span className="title-part year">2K25</span>
          </h1>
          <div className="title-underline">
            <motion.div 
              className="underline-fill"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1 }}
            />
          </div>
        </motion.div>
        
        <motion.h2
          className="event-subtitle"
          variants={itemVariants}
        >
          <span className="subtitle-letter">C</span>
          <span className="subtitle-letter">H</span>
          <span className="subtitle-letter">A</span>
          <span className="subtitle-letter">N</span>
          <span className="subtitle-letter">A</span>
          <span className="subtitle-letter">K</span>
          <span className="subtitle-letter">Y</span>
          <span className="subtitle-letter">O</span>
          <span className="subtitle-letter">T</span>
          <span className="subtitle-letter">S</span>
          <span className="subtitle-letter">A</span>
          <span className="subtitle-letter">V</span>
        </motion.h2>

        <motion.div 
          className="dates-wrapper"
          variants={itemVariants}
        >
          <div className="date-box">
            <span className="date-number">14</span>
            <span className="date-suffix">TH</span>
          </div>
          <span className="date-separator">&</span>
          <div className="date-box">
            <span className="date-number">15</span>
            <span className="date-suffix">TH</span>
          </div>
          <span className="date-month">NOVEMBER</span>
        </motion.div>

        <motion.div
          className="hero-cta"
          variants={itemVariants}
        >
          <motion.button
            className="cta-button-enhanced"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="button-text">Explore Events</span>
            <span className="button-icon">→</span>
            <div className="button-shine" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

