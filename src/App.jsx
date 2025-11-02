import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Events from './components/Events'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import BreathingGrid from './components/BreathingGrid'
import MagneticCursor from './components/MagneticCursor'
import SocialSidebar from './components/SocialSidebar'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <BreathingGrid />
      <ParticleBackground />
      <MagneticCursor />
      <SocialSidebar />
      <Navbar scrollY={scrollY} />
      <Hero />
      <About />
      <Events />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

