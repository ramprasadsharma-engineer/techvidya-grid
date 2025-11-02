import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Sponsors.css'

export default function Sponsors() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="section sponsors-section" id="sponsors" ref={ref}>
      <motion.div
        className="content-block glass-strong"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          OUR SPONSORS
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We're proud to partner with industry leaders who share our vision of 
          innovation and excellence. Join us in making TECHVIDYA 2K25 a grand success!
        </motion.p>

        <motion.div
          className="sponsor-tiers"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="sponsor-tier">
            <h3 className="tier-title platinum">Platinum Sponsors</h3>
            <div className="sponsor-logos">
              <div className="sponsor-placeholder glass">Logo 1</div>
              <div className="sponsor-placeholder glass">Logo 2</div>
            </div>
          </div>

          <div className="sponsor-tier">
            <h3 className="tier-title gold">Gold Sponsors</h3>
            <div className="sponsor-logos">
              <div className="sponsor-placeholder glass">Logo 1</div>
              <div className="sponsor-placeholder glass">Logo 2</div>
              <div className="sponsor-placeholder glass">Logo 3</div>
            </div>
          </div>

          <div className="sponsor-tier">
            <h3 className="tier-title silver">Silver Sponsors</h3>
            <div className="sponsor-logos">
              <div className="sponsor-placeholder glass">Logo 1</div>
              <div className="sponsor-placeholder glass">Logo 2</div>
              <div className="sponsor-placeholder glass">Logo 3</div>
              <div className="sponsor-placeholder glass">Logo 4</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="become-sponsor"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Become a Sponsor</h3>
          <p>Partner with us to showcase your brand to hundreds of talented students and professionals.</p>
          <motion.button
            className="sponsor-button"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 240, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Sponsorship Details
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

