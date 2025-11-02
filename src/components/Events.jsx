import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './Events.css'
import EventsSidebar from './EventsSidebar'

// Base URL for the brochure
const BROCHURE_URL = "https://techvidya-2025-brochure.pages.dev/"

// Base URL for registration form
const REGISTRATION_FORM_BASE = "https://docs.google.com/forms/d/e/1FAIpQLSely-y9TGYJhExGmic3Qxx3WHndPGd-USkL5z9oHo6aOnnKzA/viewform?entry.574435312="

const eventData = [
  {
    id: 1,
    title: "Hackathon",
    description: "A hackathon to build innovative solutions for real-world problems.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹500",
    posterImage: "/event-posters/1.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Hackathon`,
    knowMoreLink: `${BROCHURE_URL}?page=3`,
    brochurePage: 3
  },
  {
    id: 2,
    title: "Paper Presentation",
    description: "Present your research and innovative ideas to a panel of experts.",
    date: "November 15, 2025",
    time: "9:00 AM",
    registrationFee: "₹300",
    posterImage: "/event-posters/2.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Paper+Presentation`,
    knowMoreLink: `${BROCHURE_URL}?page=11`,
    brochurePage: 11
  },
  {
    id: 3,
    title: "Cryptohunt",
    description: "A thrilling cryptography challenge. Decode messages and solve puzzles.",
    date: "November 15, 2025",
    time: "1:45 PM",
    registrationFee: "₹200",
    posterImage: "/event-posters/3.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Cryptohunt`,
    knowMoreLink: `${BROCHURE_URL}?page=12`,
    brochurePage: 12
  },
  {
    id: 4,
    title: "Technophilia",
    description: "Celebrate technology with exciting demonstrations and competitions.",
    date: "November 15, 2025",
    time: "9:00 AM",
    registrationFee: "₹250",
    posterImage: "/event-posters/4.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Technophilia`,
    knowMoreLink: `${BROCHURE_URL}?page=13`,
    brochurePage: 13
  },
  {
    id: 5,
    title: "Free Fire",
    description: "Battle royale gaming tournament. Compete for the ultimate victory.",
    date: "November 14, 2025",
    time: "2:30 PM",
    registrationFee: "₹400",
    posterImage: "/event-posters/5.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Free+Fire`,
    knowMoreLink: `${BROCHURE_URL}?page=5`,
    brochurePage: 5
  },
  {
    id: 6,
    title: "Clash Royale",
    description: "Strategic card-based battle tournament. Prove your tactical skills.",
    date: "November 15, 2025",
    time: "1:00 PM",
    registrationFee: "₹300",
    posterImage: "/event-posters/6.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Clash+Royale`,
    knowMoreLink: `${BROCHURE_URL}?page=7`,
    brochurePage: 7
  },
  {
    id: 7,
    title: "Valorant",
    description: "Tactical FPS gaming tournament. Showcase your shooting skills.",
    date: "November 14, 2025",
    time: "2:30 PM",
    registrationFee: "₹500",
    posterImage: "/event-posters/7.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Valorant`,
    knowMoreLink: `${BROCHURE_URL}?page=8`,
    brochurePage: 8
  },
  {
    id: 8,
    title: "Capture the Flag",
    description: "Cybersecurity challenge. Hack your way through and capture the flags.",
    date: "November 14, 2025",
    time: "11:30 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/8.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Capture+The+Flag`,
    knowMoreLink: `${BROCHURE_URL}?page=10`,
    brochurePage: 10
  },
  {
    id: 9,
    title: "Optithon",
    description: "Optimization challenge. Find the best solutions to complex problems.",
    date: "November 15, 2025",
    time: "1:30 PM",
    registrationFee: "₹400",
    posterImage: "/event-posters/9.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Optithon`,
    knowMoreLink: `${BROCHURE_URL}?page=9`,
    brochurePage: 9
  },
  {
    id: 10,
    title: "Webcraft",
    description: "Build stunning, responsive websites within a time limit.",
    date: "November 15, 2025",
    time: "10:00 AM",
    registrationFee: "₹450",
    posterImage: "/event-posters/10.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Webscraft`,
    knowMoreLink: `${BROCHURE_URL}?page=20`,
    brochurePage: 20
  },
  {
    id: 11,
    title: "VisualX",
    description: "A UI/UX design challenge. Create innovative and beautiful interfaces.",
    date: "November 15, 2025",
    time: "2:00 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/11.png",
    registrationLink: `${REGISTRATION_FORM_BASE}VisualX`,
    knowMoreLink: `${BROCHURE_URL}?page=21`,
    brochurePage: 21
  },
  {
    id: 12,
    title: "Technical Quiz",
    description: "Test your knowledge across various domains of technology.",
    date: "November 14, 2025",
    time: "9:00 AM",
    registrationFee: "₹150",
    posterImage: "/event-posters/12.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Technical+Quiz`,
    knowMoreLink: `${BROCHURE_URL}?page=14`,
    brochurePage: 14
  },
  {
    id: 13,
    title: "Platronics",
    description: "Electronics and circuit design competition. Build innovative projects.",
    date: "November 14, 2025",
    time: "2:00 PM",
    registrationFee: "₹600",
    posterImage: "/event-posters/13.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Platronics`,
    knowMoreLink: `${BROCHURE_URL}?page=15`,
    brochurePage: 15
  },
  {
    id: 14,
    title: "Touch Me Not",
    description: "A precision-based challenge where steady hands win the game.",
    date: "November 14, 2025",
    time: "9:00 AM",
    registrationFee: "₹200",
    posterImage: "/event-posters/14.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Touch+Me+Not`,
    knowMoreLink: `${BROCHURE_URL}?page=16`,
    brochurePage: 16
  },
  {
    id: 15,
    title: "Techenact",
    description: "Technical theatre performance combining technology and drama.",
    date: "November 15, 2025",
    time: "11:00 AM",
    registrationFee: "₹250",
    posterImage: "/event-posters/15.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Techenact`,
    knowMoreLink: `${BROCHURE_URL}?page=17`,
    brochurePage: 17
  },
  {
    id: 16,
    title: "Cryptic Cross",
    description: "A crossword puzzle with cryptic clues and technical terms.",
    date: "November 15, 2025",
    time: "1:00 PM",
    registrationFee: "₹100",
    posterImage: "/event-posters/16.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Cryptic+Cross`,
    knowMoreLink: `${BROCHURE_URL}?page=18`,
    brochurePage: 18
  },
  {
    id: 17,
    title: "Guess the Prompt",
    description: "AI challenge. Identify the prompts that generated AI-created content.",
    date: "November 14, 2025",
    time: "3:00 PM",
    registrationFee: "₹200",
    posterImage: "/event-posters/17.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Guess+The+Prompt`,
    knowMoreLink: `${BROCHURE_URL}?page=19`,
    brochurePage: 19
  },
  {
    id: 18,
    title: "Code Decathlon",
    description: "A coding competition with 10 challenging programming problems.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹500",
    posterImage: "/event-posters/18.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Code+Decathlon`,
    knowMoreLink: `${BROCHURE_URL}?page=6`,
    brochurePage: 6
  },
  {
    id: 19,
    title: "Escape Room Tech Version",
    description: "Solve technical puzzles and riddles to escape the room.",
    date: "November 15, 2025",
    time: "12:00 PM",
    registrationFee: "₹400",
    posterImage: "/event-posters/19.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Escape+Room-Tech+Version`,
    knowMoreLink: `${BROCHURE_URL}?page=22`,
    brochurePage: 22
  },
  {
    id: 20,
    title: "BattleGround Mobile India",
    description: "BGMI tournament. Battle royale action on mobile devices.",
    date: "November 14, 2025",
    time: "2:30 PM",
    registrationFee: "₹450",
    posterImage: "/event-posters/20.png",
    registrationLink: `${REGISTRATION_FORM_BASE}BattleGround+Mobile+India`,
    knowMoreLink: `${BROCHURE_URL}?page=23`,
    brochurePage: 23
  },
  {
    id: 21,
    title: "Artify",
    description: "Digital art competition. Create stunning artwork using technology.",
    date: "November 15, 2025",
    time: "11:30 AM",
    registrationFee: "₹300",
    posterImage: "/event-posters/21.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Artify`,
    knowMoreLink: `${BROCHURE_URL}?page=24`,
    brochurePage: 24
  },
  {
    id: 22,
    title: "Imagify",
    description: "Image editing and manipulation challenge using creative tools.",
    date: "November 15, 2025",
    time: "12:30 PM",
    registrationFee: "₹250",
    posterImage: "/event-posters/22.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Imagify`,
    knowMoreLink: `${BROCHURE_URL}?page=25`,
    brochurePage: 25
  },
  {
    id: 23,
    title: "Mindify",
    description: "Brain games and puzzles to test your mental agility and logic.",
    date: "November 14, 2025",
    time: "1:00 PM",
    registrationFee: "₹150",
    posterImage: "/event-posters/23.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Mindify`,
    knowMoreLink: `${BROCHURE_URL}?page=26`,
    brochurePage: 26
  },
  {
    id: 24,
    title: "Ludify",
    description: "Board games and strategic gameplay tournament.",
    date: "November 14, 2025",
    time: "2:00 PM",
    registrationFee: "₹200",
    posterImage: "/event-posters/24.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Ludify`,
    knowMoreLink: `${BROCHURE_URL}?page=27`,
    brochurePage: 27
  },
  {
    id: 25,
    title: "Science Spark",
    description: "Science exhibition and demonstration of innovative experiments.",
    date: "November 15, 2025",
    time: "5:30 AM",
    registrationFee: "Free",
    posterImage: "/event-posters/25.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Science+Spark`,
    knowMoreLink: `${BROCHURE_URL}?page=28`,
    brochurePage: 28
  },
  {
    id: 26,
    title: "Thermocol Modelling",
    description: "Create innovative models and structures using thermocol.",
    date: "November 14, 2025",
    time: "1:00 PM",
    registrationFee: "₹300",
    posterImage: "/event-posters/26.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Thermocool+Modelling`,
    knowMoreLink: `${BROCHURE_URL}?page=29`,
    brochurePage: 29
  },
  {
    id: 27,
    title: "CAD Clash",
    description: "Computer-aided design competition. Create technical drawings and models.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹400",
    posterImage: "/event-posters/27.png",
    registrationLink: `${REGISTRATION_FORM_BASE}CAD+Clash`,
    knowMoreLink: `${BROCHURE_URL}?page=30`,
    brochurePage: 30
  },
  {
    id: 28,
    title: "Link-o-Motion",
    description: "Mechanism design challenge. Create innovative linkage systems.",
    date: "November 14, 2025",
    time: "1:30 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/28.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Link-0-Motion`,
    knowMoreLink: `${BROCHURE_URL}?page=31`,
    brochurePage: 31
  },
  {
    id: 29,
    title: "Bridge the Gap",
    description: "Engineering challenge to design and build strong bridges.",
    date: "November 15, 2025",
    time: "11:00 AM",
    registrationFee: "₹450",
    posterImage: "/event-posters/29.png",
    registrationLink: `${REGISTRATION_FORM_BASE}BridgeThe+Gap`,
    knowMoreLink: `${BROCHURE_URL}?page=32`,
    brochurePage: 32
  },
  {
    id: 30,
    title: "Dalal",
    description: "Stock market simulation game. Trade and invest strategically.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹300",
    posterImage: "/event-posters/30.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Dalal`,
    knowMoreLink: `${BROCHURE_URL}?page=33`,
    brochurePage: 33
  },
  {
    id: 31,
    title: "People Craft - Gen Z",
    description: "HR and management challenge designed for Gen Z participants.",
    date: "November 14, 2025",
    time: "2:00 PM",
    registrationFee: "₹250",
    posterImage: "/event-posters/31.png",
    registrationLink: `${REGISTRATION_FORM_BASE}People+Craft+-+Gen+Z`,
    knowMoreLink: `${BROCHURE_URL}?page=34`,
    brochurePage: 34
  },
  {
    id: 32,
    title: "The Data Hustle",
    description: "Data science and analytics competition. Extract insights from data.",
    date: "November 15, 2025",
    time: "9:30 AM",
    registrationFee: "₹500",
    posterImage: "/event-posters/32.png",
    registrationLink: `${REGISTRATION_FORM_BASE}The+Data+Hustle`,
    knowMoreLink: `${BROCHURE_URL}?page=4`,
    brochurePage: 4
  },
  {
    id: 33,
    title: "Mark-King",
    description: "Marketing strategy and branding competition. Create winning campaigns.",
    date: "November 15, 2025",
    time: "1:30 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/33.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Mark-King`,
    knowMoreLink: `${BROCHURE_URL}?page=35`,
    brochurePage: 35
  }
]

export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [sidebarVisible, setSidebarVisible] = useState(false)

  // Track when events section is in viewport
  useEffect(() => {
    const handleScroll = () => {
      const eventsSection = document.getElementById('events')
      if (eventsSection) {
        const rect = eventsSection.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        setSidebarVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="section events-section" id="events" ref={ref}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        EVENTS
      </motion.h2>

      <EventsSidebar eventData={eventData} isVisible={sidebarVisible} />

      <div className="events-grid">
        {eventData.map((event, index) => (
          <motion.div
            key={event.id}
            id={`event-${event.id}`}
            className="event-card-new glass"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -10,
              boxShadow: "0 20px 60px rgba(0, 240, 255, 0.3)"
            }}
            style={{
              backgroundImage: `url(${event.posterImage})`,
            }}
          >
            {/* Background Overlay */}
            <div className="event-overlay"></div>
            
            {/* Event Content */}
            <div className="event-content-new">
              <h3 className="event-title-new">{event.title}</h3>
              
              <p className="event-description">{event.description}</p>
              
              <div className="event-details-divider">
                <div className="gradient-line"></div>
                <div className="details-row">
                  <span className="detail-item">{event.date}</span>
                  <span className="detail-separator">│</span>
                  <span className="detail-item">{event.time}</span>
                </div>
              </div>
              
              <div className="event-buttons">
                {event.title === "Hackathon" ? (
                  <motion.div
                    className="event-btn know-more-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: 'not-allowed', opacity: 0.7 }}
                  >
                    Website
                  </motion.div>
                ) : (
                  <motion.a
                    href={event.knowMoreLink}
                    className="event-btn know-more-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Know More
                  </motion.a>
                )}
                {event.title === "Hackathon" ? (
                  <motion.div
                    className="event-btn register-btn coming-soon-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: 'not-allowed', opacity: 0.7 }}
                  >
                    Coming Soon
                  </motion.div>
                ) : (
                  <motion.a
                    href={event.registrationLink}
                    className="event-btn register-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

