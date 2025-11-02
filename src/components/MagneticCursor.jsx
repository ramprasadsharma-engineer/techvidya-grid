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
  const lastTime = useRef(0)
  const isAnimating = useRef(false)

  // Optimized animation loop with performance improvements
  const animate = useCallback((timestamp) => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Calculate delta time for consistent animations
    const deltaTime = timestamp - lastTime.current
    lastTime.current = timestamp

    // Skip frame if too soon (targeting 60fps)
    if (deltaTime < 16) {
      rafId.current = requestAnimationFrame(animate)
      return
    }

    // Calculate distance to target
    const dx = mousePos.current.x - currentPos.current.x
    const dy = mousePos.current.y - currentPos.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Only update if movement is significant (reduces unnecessary renders)
    if (distance > 0.1) {
      // Adaptive lerp - faster when far, slower when close
      const lerp = Math.min(0.2, 0.1 + distance * 0.001)
      currentPos.current.x += dx * lerp
      currentPos.current.y += dy * lerp

      // Use transform3d for hardware acceleration
      // Offset by 20px (half of 40px container size) to center the cursor
      cursor.style.transform = `translate3d(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px, 0)`
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    mousePos.current.x = e.clientX
    mousePos.current.y = e.clientY
    
    // Start animation if not already running
    if (!isAnimating.current) {
      isAnimating.current = true
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate)
      }
    }
  }, [animate])

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
    // Initialize cursor position
    const initX = window.innerWidth / 2
    const initY = window.innerHeight / 2
    mousePos.current = { x: initX, y: initY }
    currentPos.current = { x: initX, y: initY }
    
    // Set initial cursor position
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${initX - 20}px, ${initY - 20}px, 0)`
    }

    // Use event delegation for better performance
    const handleInteraction = (e) => {
      const target = e.target.closest('button, a, input, textarea, [role="button"], .event-btn')
      if (target) {
        if (e.type === 'mouseover') {
          handleMouseEnter()
        } else if (e.type === 'mouseout') {
          handleMouseLeave()
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleInteraction, { passive: true, capture: true })
    document.addEventListener('mouseout', handleInteraction, { passive: true, capture: true })

    // Hide cursor on mouse leave
    const handleMouseLeaveWindow = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
      isAnimating.current = false
    }

    const handleMouseEnterWindow = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    }

    document.addEventListener('mouseleave', handleMouseLeaveWindow)
    document.addEventListener('mouseenter', handleMouseEnterWindow)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleInteraction)
      document.removeEventListener('mouseout', handleInteraction)
      document.removeEventListener('mouseleave', handleMouseLeaveWindow)
      document.removeEventListener('mouseenter', handleMouseEnterWindow)
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
