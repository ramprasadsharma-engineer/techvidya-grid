import { useEffect, useRef } from 'react'
import './StarField.css'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Stars array
    const stars = []
    const numStars = 150
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.02 + 0.005,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2
      })
    }
    
    // Floating particles
    const particles = []
    const numParticles = 20
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 180 // Blue-cyan range
      })
    }
    
    // Animation loop
    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Animate stars
      stars.forEach(star => {
        star.z -= star.speed * 16
        
        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
        }
        
        // Calculate 3D position
        const x = (star.x - canvas.width / 2) * (1000 / star.z) + canvas.width / 2
        const y = (star.y - canvas.height / 2) * (1000 / star.z) + canvas.height / 2
        
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          const size = (1 - star.z / 1000) * star.size
          const opacity = (1 - star.z / 1000) * star.opacity * (0.5 + 0.5 * Math.sin(time * 0.002 + star.twinkle))
          
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.fill()
          
          // Add glow effect for closer stars
          if (star.z < 300) {
            ctx.beginPath()
            ctx.arc(x, y, size * 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(180, 220, 255, ${opacity * 0.1})`
            ctx.fill()
          }
        }
      })
      
      // Animate particles
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Inner bright core
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${particle.hue}, 80%, 80%, ${particle.opacity * 0.8})`
        ctx.fill()
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    animate(0)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield-canvas" />
}
