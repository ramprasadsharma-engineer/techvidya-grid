import { useEffect, useRef, useState } from 'react'
import './BreathingGrid.css'

export default function BreathingGrid() {
  const canvasRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [magneticPoints, setMagneticPoints] = useState([])
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      const newScrollY = window.scrollY
      setScrollY(newScrollY)
      
      // Detect active section based on scroll position
      const windowHeight = window.innerHeight
      const currentSection = Math.floor(newScrollY / windowHeight)
      setActiveSection(currentSection)
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleClick = (e) => {
      // Create ripple effect on click
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 0.6,
        startTime: Date.now()
      }
      setRipples(prev => [...prev, newRipple])
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid settings
      const gridSize = 60
      const breathingIntensity = Math.sin(time * 0.001) * 0.3 + 0.7 // 0.4 to 1.0
      const pulseIntensity = Math.sin(time * 0.002) * 0.2 + 0.8

      // Calculate grid offset based on scroll for parallax effect
      const scrollOffset = scrollY * 0.1

      // Calculate magnetic grid points
      const gridPoints = []
      const magneticRange = 80 // Distance for magnetic attraction
      
      for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
          const adjustedX = (x - (scrollOffset % gridSize))
          const adjustedY = y - ((scrollOffset * 0.5) % gridSize)
          
          const distance = Math.sqrt(
            Math.pow(mousePos.x - adjustedX, 2) + 
            Math.pow(mousePos.y - adjustedY, 2)
          )
          
          if (distance < magneticRange) {
            const strength = 1 - (distance / magneticRange)
            gridPoints.push({
              x: adjustedX,
              y: adjustedY,
              strength,
              distance
            })
          }
        }
      }

      // Draw vertical lines
      for (let x = 0; x <= canvas.width + gridSize; x += gridSize) {
        const adjustedX = (x - (scrollOffset % gridSize))
        
        // Distance from active section center affects opacity
        const sectionCenter = (activeSection + 0.5) * window.innerHeight - scrollY
        const distanceFromCenter = Math.abs(canvas.height / 2 - sectionCenter)
        const proximityFactor = Math.max(0, 1 - (distanceFromCenter / (window.innerHeight * 0.8)))
        
        const baseOpacity = 0.08
        const enhancedOpacity = baseOpacity + (proximityFactor * 0.15 * breathingIntensity)
        
        ctx.strokeStyle = `rgba(232, 232, 232, ${enhancedOpacity})`
        ctx.lineWidth = 0.5
        ctx.setLineDash([])
        
        ctx.beginPath()
        ctx.moveTo(adjustedX, 0)
        ctx.lineTo(adjustedX, canvas.height)
        ctx.stroke()

        // Add accent lines every 5th line
        if ((x / gridSize) % 5 === 0) {
          ctx.strokeStyle = `rgba(180, 220, 255, ${enhancedOpacity * 1.5})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height + gridSize; y += gridSize) {
        const adjustedY = y - ((scrollOffset * 0.5) % gridSize)
        
        // Similar proximity calculation for horizontal lines
        const proximityFactor = Math.max(0, 1 - (Math.abs(adjustedY - canvas.height / 2) / (canvas.height * 0.4)))
        
        const baseOpacity = 0.08
        const enhancedOpacity = baseOpacity + (proximityFactor * 0.15 * pulseIntensity)
        
        ctx.strokeStyle = `rgba(232, 232, 232, ${enhancedOpacity})`
        ctx.lineWidth = 0.5
        
        ctx.beginPath()
        ctx.moveTo(0, adjustedY)
        ctx.lineTo(canvas.width, adjustedY)
        ctx.stroke()

        // Add accent lines every 5th line
        if ((y / gridSize) % 5 === 0) {
          ctx.strokeStyle = `rgba(180, 220, 255, ${enhancedOpacity * 1.5})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // Draw section highlights
      if (activeSection >= 0) {
        const sectionY = (activeSection * window.innerHeight) - scrollY
        const sectionHeight = window.innerHeight
        
        // Top section border
        ctx.strokeStyle = `rgba(180, 220, 255, ${0.3 * breathingIntensity})`
        ctx.lineWidth = 2
        ctx.setLineDash([10, 5])
        ctx.beginPath()
        ctx.moveTo(0, sectionY)
        ctx.lineTo(canvas.width, sectionY)
        ctx.stroke()
        
        // Bottom section border
        ctx.beginPath()
        ctx.moveTo(0, sectionY + sectionHeight)
        ctx.lineTo(canvas.width, sectionY + sectionHeight)
        ctx.stroke()
        
        // Side accents
        ctx.setLineDash([])
        ctx.strokeStyle = `rgba(180, 220, 255, ${0.2 * pulseIntensity})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(40, sectionY + 40)
        ctx.lineTo(40, sectionY + sectionHeight - 40)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(canvas.width - 40, sectionY + 40)
        ctx.lineTo(canvas.width - 40, sectionY + sectionHeight - 40)
        ctx.stroke()
      }

      // Draw breathing center point
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const breathRadius = 4 + (breathingIntensity * 6)
      
      ctx.strokeStyle = `rgba(180, 220, 255, ${0.4 * breathingIntensity})`
      ctx.fillStyle = `rgba(180, 220, 255, ${0.1 * breathingIntensity})`
      ctx.lineWidth = 1
      
      ctx.beginPath()
      ctx.arc(centerX, centerY, breathRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Draw magnetic grid points
      gridPoints.forEach(point => {
        const glowIntensity = point.strength * breathingIntensity
        const pulseSize = 3 + (point.strength * 8) + (Math.sin(time * 0.003 + point.distance * 0.01) * 2)
        
        // Outer glow
        ctx.strokeStyle = `rgba(180, 220, 255, ${glowIntensity * 0.3})`
        ctx.fillStyle = `rgba(180, 220, 255, ${glowIntensity * 0.1})`
        ctx.lineWidth = 1.5
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, pulseSize * 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        
        // Inner bright core
        ctx.fillStyle = `rgba(180, 220, 255, ${glowIntensity * 0.6})`
        ctx.beginPath()
        ctx.arc(point.x, point.y, pulseSize * 0.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Connection lines to cursor (subtle)
        if (point.strength > 0.7) {
          ctx.strokeStyle = `rgba(180, 220, 255, ${(point.strength - 0.7) * 0.3})`
          ctx.lineWidth = 1
          ctx.setLineDash([2, 4])
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(mousePos.x, mousePos.y)
          ctx.stroke()
          ctx.setLineDash([])
        }
      })

      // Draw ripple effects
      setRipples(prevRipples => {
        const currentTime = Date.now()
        return prevRipples.filter(ripple => {
          const elapsed = currentTime - ripple.startTime
          const maxDuration = 1500 // 1.5 seconds
          
          if (elapsed > maxDuration) return false
          
          const progress = elapsed / maxDuration
          const currentRadius = progress * 100
          const currentOpacity = ripple.opacity * (1 - progress)
          
          // Draw ripple
          ctx.strokeStyle = `rgba(180, 220, 255, ${currentOpacity})`
          ctx.lineWidth = 2 * (1 - progress * 0.5)
          ctx.setLineDash([])
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2)
          ctx.stroke()
          
          // Inner ripple
          if (progress < 0.7) {
            ctx.strokeStyle = `rgba(232, 232, 232, ${currentOpacity * 0.5})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.arc(ripple.x, ripple.y, currentRadius * 0.6, 0, Math.PI * 2)
            ctx.stroke()
          }
          
          return true
        })
      })

      // Mathematical precision indicators (corner marks)
      const cornerSize = 20
      const cornerOpacity = 0.15 * pulseIntensity
      
      ctx.strokeStyle = `rgba(232, 232, 232, ${cornerOpacity})`
      ctx.lineWidth = 1
      
      // Top left
      ctx.beginPath()
      ctx.moveTo(20, 20)
      ctx.lineTo(20 + cornerSize, 20)
      ctx.moveTo(20, 20)
      ctx.lineTo(20, 20 + cornerSize)
      ctx.stroke()
      
      // Top right
      ctx.beginPath()
      ctx.moveTo(canvas.width - 20, 20)
      ctx.lineTo(canvas.width - 20 - cornerSize, 20)
      ctx.moveTo(canvas.width - 20, 20)
      ctx.lineTo(canvas.width - 20, 20 + cornerSize)
      ctx.stroke()
      
      // Bottom left
      ctx.beginPath()
      ctx.moveTo(20, canvas.height - 20)
      ctx.lineTo(20 + cornerSize, canvas.height - 20)
      ctx.moveTo(20, canvas.height - 20)
      ctx.lineTo(20, canvas.height - 20 - cornerSize)
      ctx.stroke()
      
      // Bottom right
      ctx.beginPath()
      ctx.moveTo(canvas.width - 20, canvas.height - 20)
      ctx.lineTo(canvas.width - 20 - cornerSize, canvas.height - 20)
      ctx.moveTo(canvas.width - 20, canvas.height - 20)
      ctx.lineTo(canvas.width - 20, canvas.height - 20 - cornerSize)
      ctx.stroke()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [scrollY, activeSection, mousePos, ripples])

  return <canvas ref={canvasRef} className="breathing-grid-canvas" />
}
