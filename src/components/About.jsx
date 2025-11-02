import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="section about-section" id="about" ref={ref}>
      <motion.div
        className="content-block glass-strong"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        whileHover={{
          y: -10,
          boxShadow: "0 20px 60px rgba(232, 232, 232, 0.3)"
        }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          TechVidya 2025 — Where Innovation Meets Imagination
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Get ready to experience TechVidya 2025, the ultimate State-Level Technical Fest hosted by Sai Vidya Institute of Technology, Bengaluru! 
          A celebration of creativity, technology, and talent, TechVidya brings together the brightest young minds from across Karnataka to compete, 
          collaborate, and create the future.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          With an electrifying ₹150k Prize Pool, the fest features a diverse mix of technical, non-technical, and gaming events designed to 
          challenge your intellect and fuel your passion — from hackathons, coding wars, and model building to design battles, esports tournaments, 
          and mind-bending quizzes.
        </motion.p>


        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Join us as we redefine what it means to learn, play, and innovate — all under one roof.<br/>
          Think. Create. Compete. Celebrate.<br/>
          Welcome to TechVidya 2025 — where ideas turn into impact.
        </motion.p>

        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="stat-item glass">
            <h3>30+</h3>
            <p>Events</p>
          </div>
          <div className="stat-item glass">
            <h3>2</h3>
            <p>Days</p>
          </div>
          <div className="stat-item glass">
            <h3>₹150k</h3>
            <p>Prize Pool</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

