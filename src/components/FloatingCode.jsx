import { useEffect, useRef, useState } from 'react'
import './FloatingCode.css'

export default function FloatingCode() {
  const containerRef = useRef(null)
  const [fragments, setFragments] = useState([])

  // Tech-related code snippets and keywords for TECHVIDYA
  const codeSnippets = [
    '{ innovation: true }',
    'const future = await tech();',
    'if (creative) { build(); }',
    '<Hackathon />',
    'npm install innovation',
    'git push origin future',
    'SELECT * FROM ideas;',
    'function innovate() {',
    '#!/bin/bash creativity',
    'import { Vision } from "2K25"',
    'while(learning) { grow(); }',
    'class Innovation extends Tech',
    'def solve_problem():',
    'console.log("TECHVIDYA");',
    'async function compete() {',
    '> cd /path/to/success',
    'docker run --creativity',
    'AI = λ x: transform(x)',
    'boolean isWinner = true;',
    'echo "Hello TechVidya"',
    '{ "event": "amazing" }',
    'return breakthrough;',
    'catch (Exception inspire)',
    'val creativity = infinite',
    'let ideas = [...previous, new]',
    'CREATE TABLE winners();',
    'algorithm.optimize()',
    'Process.start("innovate")',
    'quantum.compute(solution)',
    '// TODO: Change the world'
  ]

  const techWords = [
    'INNOVATION', 'ALGORITHM', 'QUANTUM', 'NEURAL', 'BLOCKCHAIN',
    'MACHINE LEARNING', 'CYBERSECURITY', 'DATA SCIENCE', 'CLOUD',
    'ARTIFICIAL INTELLIGENCE', 'ROBOTICS', 'IoT', 'AUTOMATION',
    'PROGRAMMING', 'DEBUGGING', 'OPTIMIZATION', 'ARCHITECTURE',
    'FRAMEWORK', 'DATABASE', 'API', 'MICROSERVICES', 'DEVOPS'
  ]

  useEffect(() => {
    const createFragment = () => {
      const isCodeSnippet = Math.random() > 0.4
      const content = isCodeSnippet 
        ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        : techWords[Math.floor(Math.random() * techWords.length)]

      return {
        id: Math.random(),
        content,
        type: isCodeSnippet ? 'code' : 'word',
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: 0,
        targetOpacity: Math.random() * 0.6 + 0.2,
        size: Math.random() * 0.5 + 0.7,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        lifeTime: Math.random() * 15000 + 10000, // 10-25 seconds
        fadePhase: 'in', // 'in', 'visible', 'out'
        phaseTimer: 0
      }
    }

    // Initialize fragments
    const initialFragments = Array.from({ length: 15 }, createFragment)
    setFragments(initialFragments)

    let animationFrameId

    const animate = () => {
      setFragments(prevFragments => {
        return prevFragments.map(fragment => {
          let newFragment = { ...fragment }
          
          // Move fragment
          newFragment.x += newFragment.vx
          newFragment.y += newFragment.vy
          newFragment.rotation += newFragment.rotationSpeed
          newFragment.phaseTimer += 16 // ~60fps

          // Handle fade phases
          if (newFragment.fadePhase === 'in') {
            newFragment.opacity = Math.min(newFragment.opacity + 0.01, newFragment.targetOpacity)
            if (newFragment.opacity >= newFragment.targetOpacity) {
              newFragment.fadePhase = 'visible'
              newFragment.phaseTimer = 0
            }
          } else if (newFragment.fadePhase === 'visible') {
            if (newFragment.phaseTimer > newFragment.lifeTime * 0.7) {
              newFragment.fadePhase = 'out'
              newFragment.phaseTimer = 0
            }
          } else if (newFragment.fadePhase === 'out') {
            newFragment.opacity = Math.max(newFragment.opacity - 0.015, 0)
          }

          // Wrap around screen edges
          if (newFragment.x < -200) newFragment.x = window.innerWidth + 100
          if (newFragment.x > window.innerWidth + 200) newFragment.x = -100
          if (newFragment.y < -100) newFragment.y = window.innerHeight + 50
          if (newFragment.y > window.innerHeight + 100) newFragment.y = -50

          return newFragment
        }).filter(fragment => {
          // Remove completely faded fragments and replace with new ones
          if (fragment.opacity <= 0 && fragment.fadePhase === 'out') {
            return false
          }
          return true
        })
      })

      // Add new fragments to maintain count
      setFragments(prevFragments => {
        if (prevFragments.length < 15) {
          return [...prevFragments, ...Array.from({ length: 15 - prevFragments.length }, createFragment)]
        }
        return prevFragments
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="floating-code-container">
      {fragments.map(fragment => (
        <div
          key={fragment.id}
          className={`floating-fragment ${fragment.type === 'code' ? 'code-snippet' : 'tech-word'}`}
          style={{
            left: `${fragment.x}px`,
            top: `${fragment.y}px`,
            opacity: fragment.opacity,
            transform: `scale(${fragment.size}) rotate(${fragment.rotation}deg)`,
            fontSize: fragment.type === 'code' ? '0.85rem' : '1.2rem'
          }}
        >
          {fragment.content}
        </div>
      ))}
    </div>
  )
}
