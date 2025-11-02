import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer glass">
      <div className="footer-content">
        <motion.div
          className="footer-top"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-section">
            <h3>TECHVIDYA 2K25</h3>
            <p>Celebrating innovation, creativity, and technological excellence.</p>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-social">
              <motion.a href="https://www.instagram.com/sai_vidya_institute_of_tech/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}>Instagram</motion.a>
              <motion.a href="https://www.linkedin.com/school/sai-vidya-institute-of-technology/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}>LinkedIn</motion.a>
              <motion.a href="https://x.com/SaividyaIT" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}>Twitter</motion.a>
              <motion.a href="https://www.facebook.com/SaiVidyaInstituteOfTechnology" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}>Facebook</motion.a>
              <motion.a href="https://www.threads.com/@sai_vidya_institute_of_tech" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2, y: -3 }}>Threads</motion.a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Location</h4>
            <p>Sai Vidya Institute of Technology<br/>Bangalore, India</p>
          </div>
        </motion.div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>&copy; 2025 Sai Vidya Institute of Technology. All rights reserved.</p>
          <p className="footer-tagline">Built with ❤️ by TECHVIDYA Team</p>
        </motion.div>
      </div>
    </footer>
  )
}

