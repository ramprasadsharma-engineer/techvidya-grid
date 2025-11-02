import { useEffect, useState } from 'react'
import './MagneticCursor.css'

export default function MagneticCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <div
      className={`magnetic-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`
      }}
    >
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  )
}
