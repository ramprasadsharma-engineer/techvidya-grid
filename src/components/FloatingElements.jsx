import { useEffect, useState } from 'react'
import './FloatingElements.css'

export default function FloatingElements() {
  const [particles, setParticles] = useState([])

  // Beautiful floating code snippets and tech symbols
  const floatingElements = [
    '{ }', '</>', 'AI', '∞', '⚡', '∆', '◊', '※', '✦', '⟨⟩',
    'CSS', 'JS', 'HTML', 'React', 'API', 'JSON', 'UI/UX',
    'λ', '∑', '∫', '∇', '∪', '∩', '⊂', '⊃', '∈', '∉',
    '010101', '101010', 'AI ML', 'IoT', '5G', 'AR VR',
    '⌘', '⌥', '⎋', '⏎', '⌫', '⌦', '⇧', '⌃', '☰', '⊕'
  ]

  useEffect(() => {
    const createParticle = () => {
      const element = floatingElements[Math.floor(Math.random() * floatingElements.length)]
      const newParticle = {
        id: Math.random(),
        element,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        size: 0.8 + Math.random() * 0.7,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: -2 + Math.random() * 4,
        drift: -1 + Math.random() * 2
      }
      return newParticle
    }

    const animateParticles = () => {
      setParticles(prevParticles => {
        const updated = prevParticles.map(particle => ({
          ...particle,
          y: particle.y - particle.speed,
          x: particle.x + particle.drift * 0.1,
          rotation: particle.rotation + particle.rotationSpeed
        })).filter(particle => particle.y > -100)

        // Add new particles occasionally
        if (Math.random() < 0.05 && updated.length < 15) {
          updated.push(createParticle())
        }

        return updated
      })
    }

    const interval = setInterval(animateParticles, 50)
    
    // Create initial particles
    const initialParticles = Array.from({ length: 8 }, createParticle)
    setParticles(initialParticles)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-elements">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="floating-particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}rem`,
            opacity: particle.opacity,
            transform: `rotate(${particle.rotation}deg)`
          }}
        >
          {particle.element}
        </div>
      ))}
    </div>
  )
}
