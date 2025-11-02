import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './Contact.css'

const supportTeam = [
  {
    id: 1,
    name: "Dr. Vrinda Shetty",
    role: "Convenor",
    phone: "+91 93434 24422",
    email: "convenor1@svit.ac.in"
  },
  {
    id: 2,
    name: "Dr. Vikramathithan A C",
    role: "Convenor",
    phone: "+91 79757 38993",
    email: "convenor2@svit.ac.in"
  },
  {
    id: 3,
    name: "S Lekha Reddy",
    role: "Main Coordinator",
    phone: "+91 81473 88296",
    email: "lekha@svit.ac.in"
  },
  {
    id: 4,
    name: "Purav S",
    role: "Main Coordinator",
    phone: "+91 73380 33618",
    email: "purav@svit.ac.in"
  },
  {
    id: 5,
    name: "Darshan P & Kathyainie",
    role: "Main Coordinator",
    phone: "7795348218 / 7204240503",
    email: "ise@svit.ac.in"
  },
  {
    id: 6,
    name: "P Vaishnavi & Vinayaka H Shankara",
    role: "Main Coordinator",
    phone: "8310385129 / 9480443130",
    email: "cse@svit.ac.in"
  },
  {
    id: 7,
    name: "Y. Lalith Sagar Reddy & Sanjana R S",
    role: "Main Coordinator",
    phone: "9148584848 / 8660420547",
    email: "cseds@svit.ac.in"
  },
  {
    id: 8,
    name: "Kishore Biradar & Hima Parvathi",
    role: "Main Coordinator",
    phone: "9353311721 / 7892202475",
    email: "cseaiml@svit.ac.in"
  },
  {
    id: 9,
    name: "Ashish A & Harshitha E",
    role: "Main Coordinator",
    phone: "7892133997 / 7338059792",
    email: "ece@svit.ac.in"
  },
  {
    id: 10,
    name: "M M A Kamal Kishore & Kapil",
    role: "Main Coordinator",
    phone: "9620770988 / 8549936069",
    email: "mech@svit.ac.in"
  },
  {
    id: 11,
    name: "Nithin & Vidya H U",
    role: "Main Coordinator",
    phone: "7090073337 / 8660996052",
    email: "civil@svit.ac.in"
  },
  {
    id: 12,
    name: "Chinmay N & Arpitha H",
    role: "Main Coordinator",
    phone: "8296357539 / 8618823587",
    email: "mba@svit.ac.in"
  }
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const convenors = supportTeam.filter(m => m.role === "Convenor")
  const mainCoordinators = supportTeam.filter(m => m.role === "Main Coordinator")

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        SUPPORT TEAM
      </motion.h2>

      <motion.p
        className="support-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Reach out to our team for any assistance during TECHVIDYA 2K25
      </motion.p>

      <div className="support-container">
        {/* Convenors Section */}
        <motion.div
          className="support-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="section-heading">Convenors</h3>
          <div className="team-list">
            {convenors.map((member) => (
              <div key={member.id} className="team-member">
                <p className="member-name">{member.name}</p>
                <a href={`tel:${member.phone}`} className="member-phone">{member.phone}</a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Coordinators Section */}
        <motion.div
          className="support-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="section-heading">Main Coordinators</h3>
          <div className="dept-grid">
            {mainCoordinators.map((member) => (
              <div key={member.id} className="dept-member">
                <p className="member-name">{member.name}</p>
                <a href={`tel:${member.phone}`} className="member-phone">{member.phone}</a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

