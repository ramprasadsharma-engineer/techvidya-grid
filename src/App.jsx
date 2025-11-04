import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BreathingGrid from './components/BreathingGrid'
import SocialSidebar from './components/SocialSidebar'
import LeaderboardSidebar from './components/LeaderboardSidebar'
import './App.css'

// Lazy load heavy components for better initial load performance
const About = lazy(() => import('./components/About'))
const Events = lazy(() => import('./components/Events'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))
const ParticleBackground = lazy(() => import('./components/ParticleBackground'))

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [leaderboardOpen, setLeaderboardOpen] = useState(false)

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false
    let lastScrollY = 0

    const updateScroll = () => {
      lastScrollY = window.scrollY
      setScrollY(lastScrollY)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    // Optimize initial load
    const handleLoad = () => {
      setIsLoading(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('load', handleLoad)
    
    // Set initial loading state
    if (document.readyState === 'complete') {
      setIsLoading(false)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  // Open the Leaderboard sidebar when the global event is dispatched
  useEffect(() => {
    const handler = () => setLeaderboardOpen(true)
    window.addEventListener('open-leaderboard', handler)
    return () => window.removeEventListener('open-leaderboard', handler)
  }, [])

  // Loading component
  const LoadingFallback = () => (
    <div className="loading-fallback">
      <div className="loading-spinner"></div>
    </div>
  )

  return (
    <div className={`App ${isLoading ? 'is-loading' : ''}`}>
      <BreathingGrid />
      <Suspense fallback={<LoadingFallback />}>
        <ParticleBackground />
      </Suspense>
      <SocialSidebar />
      <LeaderboardSidebar open={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />
      <Navbar scrollY={scrollY} />
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <About />
        <Events />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App

