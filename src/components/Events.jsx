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
    knowMoreLink: `${BROCHURE_URL}?page=7`,
    brochurePage: 7
  },
  {
    id: 3,
    title: "Cryptohunt",
    description: "A high-speed chase is on! Follow cryptic QR clues in a race against time, where one wrong sequence or a single mistake could end your hunt.",
    date: "November 15, 2025",
    time: "1:45 PM",
    registrationFee: "₹200",
    posterImage: "/event-posters/3.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Cryptohunt`,
    knowMoreLink: `${BROCHURE_URL}?page=8`,
    brochurePage: 8
  },
  {
    id: 4,
    title: "Technophilia",
    description: "Your technical knowledge will be pushed to its limits in a challenging online quest. Survive that, and you'll face the lightning-fast pressure of the 'Battle of Buzzers'.",
    date: "November 15, 2025",
    time: "9:00 AM",
    registrationFee: "₹250",
    posterImage: "/event-posters/4.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Technophilia`,
    knowMoreLink: `${BROCHURE_URL}?page=9`,
    brochurePage: 9
  },
  {
    id: 5,
    title: "Free Fire",
    description: "Enter a raw, mobile-only battle where your character skills are useless and explosives are forbidden. Only pure aim and strategy will lead to victory in this knockout tournament.",
    date: "November 14, 2025",
    time: "2:30 PM",
    registrationFee: "₹400",
    posterImage: "/event-posters/5.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Free+Fire`,
    knowMoreLink: `${BROCHURE_URL}?page=10`,
    brochurePage: 10
  },
  {
    id: 6,
    title: "Clash Royale",
    description: "Can you build a winning deck on the fly? Enter the Mega Draft tournament, where you must conquer your pool to earn a spot in the Grand Finale.",
    date: "November 15, 2025",
    time: "1:00 PM",
    registrationFee: "₹300",
    posterImage: "/event-posters/6.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Clash+Royale`,
    knowMoreLink: `${BROCHURE_URL}?page=11`,
    brochurePage: 11
  },
  {
    id: 7,
    title: "Valorant",
    description: "This is a double-bracket gauntlet where one loss only sends you on a harder path. Fight your way through swift-play chaos to earn a spot in the standard-match finals.",
    date: "November 14, 2025",
    time: "2:30 PM",
    registrationFee: "₹500",
    posterImage: "/event-posters/7.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Valorant`,
    knowMoreLink: `${BROCHURE_URL}?page=12`,
    brochurePage: 12
  },
  {
    id: 8,
    title: "Capture the Flag",
    description: "The digital battlefield is live, and the flags are hidden deep within the system. Hack, hunt, and exploit your way through a gauntlet of cyber challenges to seize victory.",
    date: "November 14, 2025",
    time: "11:30 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/8.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Capture+The+Flag`,
    knowMoreLink: `${BROCHURE_URL}?page=13`,
    brochurePage: 13
  },
  {
    id: 9,
    title: "Optithon",
    description: "You have exactly two hours. Can your team take a problem, build a functional prototype using any tool at your disposal, and present a winning pitch before time expires?",
    date: "November 15, 2025",
    time: "1:30 PM",
    registrationFee: "₹400",
    posterImage: "/event-posters/9.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Optithon`,
    knowMoreLink: `${BROCHURE_URL}?page=14`,
    brochurePage: 14
  },
  {
    id: 10,
    title: "Webcraft",
    description: "The theme is revealed, and the clock starts now: you have one hour. Design and code a stunning, dynamic website that will blow the judges away.",
    date: "November 15, 2025",
    time: "10:00 AM",
    registrationFee: "₹450",
    posterImage: "/event-posters/10.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Webscraft`,
    knowMoreLink: `${BROCHURE_URL}?page=15`,
    brochurePage: 15
  },
  {
    id: 11,
    title: "VisualX",
    description: "This isn't just a quiz; it's a test of perception. Decipher concepts from fleeting images, reassemble visual fragments, and find the hidden link before anyone else.",
    date: "November 15, 2025",
    time: "2:00 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/11.png",
    registrationLink: `${REGISTRATION_FORM_BASE}VisualX`,
    knowMoreLink: `${BROCHURE_URL}?page=16`,
    brochurePage: 16
  },
  {
    id: 12,
    title: "Technical Quiz",
    description: "This is survival of the smartest. Battle through relentless quiz rounds where the lowest scorers are cut, leaving only the top two to claim the title.",
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
    description: "First, prove your theoretical genius in a high-stakes written exam. Survive the cut, and you'll face the ultimate practical test: designing and implementing a live circuit.",
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
    description: "It demands perfect stillness and nerves of steel. Guide the loop along the winding path—one touch, one flinch, and your run is over.",
    date: "November 14, 2025",
    time: "9:00 AM",
    registrationFee: "₹200",
    posterImage: "/event-posters/14.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Touch+Me+Not`,
    knowMoreLink: `${BROCHURE_URL}?page=19`,
    brochurePage: 19
  },
  {
    id: 15,
    title: "Techenact",
    description: "How do you act out \"machine learning\" or \"blockchain\"? Get your team to guess complex technical terms using only silent gestures, all against a 60-second clock.",
    date: "November 15, 2025",
    time: "11:00 AM",
    registrationFee: "₹250",
    posterImage: "/event-posters/15.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Techenact`,
    knowMoreLink: `${BROCHURE_URL}?page=20`,
    brochurePage: 20
  },
  {
    id: 16,
    title: "Cryptic Cross",
    description: "This is no ordinary puzzle. Prepare to decipher a grid of baffling technical clues where every answer must be exact to unlock the final solution.",
    date: "November 15, 2025",
    time: "1:00 PM",
    registrationFee: "₹100",
    posterImage: "/event-posters/16.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Cryptic+Cross`,
    knowMoreLink: `${BROCHURE_URL}?page=21`,
    brochurePage: 21
  },
  {
    id: 17,
    title: "Guess the Prompt",
    description: "The image is before you, but the secret lies in the words that created it. Can you reverse-engineer the mind of an AI and guess the exact prompt that generated the photo?",
    date: "November 14, 2025",
    time: "3:00 PM",
    registrationFee: "₹200",
    posterImage: "/event-posters/17.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Guess+The+Prompt`,
    knowMoreLink: `${BROCHURE_URL}?page=22`,
    brochurePage: 22
  },
  {
    id: 18,
    title: "Code Decathlon",
    description: "Your code is shattered and locked behind cryptic puzzles. Race to crack the passwords, assemble the scattered fragments, and fill in the missing logic to achieve the perfect output.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹500",
    posterImage: "/event-posters/18.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Code+Decathlon`,
    knowMoreLink: `${BROCHURE_URL}?page=23`,
    brochurePage: 23
  },
  {
    id: 19,
    title: "Escape Room Tech Version",
    description: "The doors lock behind you. Solve your way through three rooms of intense riddles, knowing that a final, decisive technical challenge waits in the last room.",
    date: "November 15, 2025",
    time: "12:00 PM",
    registrationFee: "₹400",
    posterImage: "/event-posters/19.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Escape+Room-Tech+Version`,
    knowMoreLink: `${BROCHURE_URL}?page=24`,
    brochurePage: 24
  },
  {
    id: 20,
    title: "BattleGround Mobile India",
    description: "Drop in, gear up, and dominate your lobby. Victory only means you advance to a final, brutal TDM showdown against the other room's champions.",
    date: "November 14, 2025",
    time: "2:30 PM",
    registrationFee: "₹450",
    posterImage: "/event-posters/20.png",
    registrationLink: `${REGISTRATION_FORM_BASE}BattleGround+Mobile+India`,
    knowMoreLink: `${BROCHURE_URL}?page=25`,
    brochurePage: 25
  },
  {
    id: 21,
    title: "Artify",
    description: "Wield the power of generative AI to make the \"impossible, possible.\" Forge a stunning logo, and if you're good enough, advance to create a short video masterpiece.",
    date: "November 15, 2025",
    time: "11:30 AM",
    registrationFee: "₹300",
    posterImage: "/event-posters/21.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Artify`,
    knowMoreLink: `${BROCHURE_URL}?page=26`,
    brochurePage: 26
  },
  {
    id: 22,
    title: "Imagify",
    description: "In one round, you command the AI to create art from a prompt. In the next, you must read the AI's mind, guessing the prompt from just an image.",
    date: "November 15, 2025",
    time: "12:30 PM",
    registrationFee: "₹250",
    posterImage: "/event-posters/22.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Imagify`,
    knowMoreLink: `${BROCHURE_URL}?page=27`,
    brochurePage: 27
  },
  {
    id: 23,
    title: "Mindify",
    description: "A murder mystery pits you against AI... or is it a human? Sift through the evidence, solve cryptic puzzles, and crack the codes to be the first to unmask the culprit.",
    date: "November 14, 2025",
    time: "1:00 PM",
    registrationFee: "₹150",
    posterImage: "/event-posters/23.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Mindify`,
    knowMoreLink: `${BROCHURE_URL}?page=28`,
    brochurePage: 28
  },
  {
    id: 24,
    title: "Ludify",
    description: "This is trivia chaos for everyone. Battle through 25 random tech and non-tech questions, but only the team that completes their Bingo slip first and has the most correct answers will win.",
    date: "November 14, 2025",
    time: "2:00 PM",
    registrationFee: "₹200",
    posterImage: "/event-posters/24.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Ludify`,
    knowMoreLink: `${BROCHURE_URL}?page=29`,
    brochurePage: 29
  },
  {
    id: 25,
    title: "Science Spark",
    description: "This is a gauntlet of scientific perception. Identify, find, and unjumble your way through brutal elimination rounds to prove you're worthy of the final science puzzle.",
    date: "November 15, 2025",
    time: "5:30 AM",
    registrationFee: "Free",
    posterImage: "/event-posters/25.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Science+Spark`,
    knowMoreLink: `${BROCHURE_URL}?page=30`,
    brochurePage: 30
  },
  {
    id: 26,
    title: "Thermocol Modelling",
    description: "Turn simple thermocol into a work of art. The challenge is one of pure creativity—transform basic materials into a stunning model that outshines all others.",
    date: "November 14, 2025",
    time: "1:00 PM",
    registrationFee: "₹300",
    posterImage: "/event-posters/26.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Thermocool+Modelling`,
    knowMoreLink: `${BROCHURE_URL}?page=31`,
    brochurePage: 31
  },
  {
    id: 27,
    title: "CAD Clash",
    description: "The problem is revealed, and the 90-minute timer starts now. You must design, model, and render a perfect 3D model from scratch, judged on pure accuracy and creativity.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹400",
    posterImage: "/event-posters/27.png",
    registrationLink: `${REGISTRATION_FORM_BASE}CAD+Clash`,
    knowMoreLink: `${BROCHURE_URL}?page=32`,
    brochurePage: 32
  },
  {
    id: 28,
    title: "Link-o-Motion",
    description: "Engineer a masterpiece of pure mechanical motion using only simple sticks and pins. Your model must move, but batteries and motors are forbidden—only clever design will prevail.",
    date: "November 14, 2025",
    time: "1:30 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/28.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Link-0-Motion`,
    knowMoreLink: `${BROCHURE_URL}?page=33`,
    brochurePage: 33
  },
  {
    id: 29,
    title: "Bridge the Gap",
    description: "Your creation, built from nothing but sticks and glue, faces a single test: destruction. How much weight can your bridge withstand before it buckles under the pressure?",
    date: "November 15, 2025",
    time: "11:00 AM",
    registrationFee: "₹450",
    posterImage: "/event-posters/29.png",
    registrationLink: `${REGISTRATION_FORM_BASE}BridgeThe+Gap`,
    knowMoreLink: `${BROCHURE_URL}?page=34`,
    brochurePage: 34
  },
  {
    id: 30,
    title: "Dalal",
    description: "Do you have what it takes to rule the market? Step into the high-stakes world of finance, where every decision could lead to fortune or failure.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹300",
    posterImage: "/event-posters/30.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Dalal`,
    knowMoreLink: `${BROCHURE_URL}?page=35`,
    brochurePage: 35
  },
  {
    id: 31,
    title: "People Craft - Gen Z",
    description: "Step into the role of a next-generation HR leader. You must transform real-world, modern challenges into actionable solutions that foster growth and resilience.",
    date: "November 14, 2025",
    time: "2:00 PM",
    registrationFee: "₹250",
    posterImage: "/event-posters/31.png",
    registrationLink: `${REGISTRATION_FORM_BASE}People+Craft+-+Gen+Z`,
    knowMoreLink: `${BROCHURE_URL}?page=36`,
    brochurePage: 36
  },
  {
    id: 32,
    title: "The Data Hustle",
    description: "The true challenge will only be revealed on the spot. Bring your device, brace for a strict time limit, and prepare to dive into a high-pressure data gauntlet.",
    date: "November 15, 2025",
    time: "9:30 AM",
    registrationFee: "₹500",
    posterImage: "/event-posters/32.png",
    registrationLink: `${REGISTRATION_FORM_BASE}The+Data+Hustle`,
    knowMoreLink: `${BROCHURE_URL}?page=37`,
    brochurePage: 37
  },
  {
    id: 33,
    title: "Mark-King",
    description: "This is the ultimate battle for the marketing crown. Prove you have the creativity, strategy, and vision to dominate the market and sell your ideas.",
    date: "November 15, 2025",
    time: "1:30 PM",
    registrationFee: "₹350",
    posterImage: "/event-posters/33.png",
    registrationLink: `${REGISTRATION_FORM_BASE}Mark-King`,
    knowMoreLink: `${BROCHURE_URL}?page=38`,
    brochurePage: 38
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

