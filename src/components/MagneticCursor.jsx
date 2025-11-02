import { useEffect, useRef, useCallback } from 'react'
import './MagneticCursor.css'

export default function MagneticCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const rafId = useRef(null)

  // Smooth animation loop using requestAnimationFrame
  const animate = useCallback(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Smooth lerp interpolation for fluid movement
    const lerp = 0.15
    currentPos.current.x += (mousePos.current.x - currentPos.current.x) * lerp
    currentPos.current.y += (mousePos.current.y - currentPos.current.y) * lerp

    // Use transform3d for hardware acceleration
    cursor.style.transform = `translate3d(${currentPos.current.x - 50}px, ${currentPos.current.y - 50}px, 0)`

    rafId.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!isHovering.current) {
      isHovering.current = true
      if (cursorRef.current) {
        cursorRef.current.classList.add('hovering')
      }
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (isHovering.current) {
      isHovering.current = false
      if (cursorRef.current) {
        cursorRef.current.classList.remove('hovering')
      }
    }
  }, [])

  useEffect(() => {
    // Start animation loop
    rafId.current = requestAnimationFrame(animate)

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"], .event-btn')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter, { passive: true })
      el.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    })

    document.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [animate, handleMouseMove, handleMouseEnter, handleMouseLeave])

  return (
    <div
      ref={cursorRef}
      className="magnetic-cursor"
    >
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  )
}
