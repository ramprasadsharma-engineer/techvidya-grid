import { motion } from 'framer-motion'
import './Hero.css'
import './StarField.css'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <motion.h3
          className="presenter-title enhanced-glow"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Sai Vidya Institute of Technology
        </motion.h3>
        
        <motion.h3
          className="presenter-title presents floating"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Presents
        </motion.h3>
        <motion.h1
          className="event-title liquid-mirror enhanced-glow"
          data-text="TECHVIDYA 2K25"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.55,
            type: "spring",
            stiffness: 100
          }}
        >
          TECHVIDYA 2K25
        </motion.h1>
        
        <motion.h2
          className="event-subtitle floating"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          CHANAKYOTSAV
        </motion.h2>

        <motion.p
          className="event-dates enhanced-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          14TH & 15TH NOVEMBER
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="cta-button pulse-glow"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 8px 40px rgba(232, 232, 232, 0.6), 0 0 20px rgba(180, 220, 255, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('events').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Events
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

