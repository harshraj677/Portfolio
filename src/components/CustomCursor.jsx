import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const [trails, setTrails] = useState([])
  const trailRef = useRef([])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Add trail point
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() }
      trailRef.current = [...trailRef.current, newTrail].slice(-15)
      setTrails(trailRef.current)
    }

    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => setIsActive(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Trail */}
      {trails.map((trail, idx) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: trail.x,
            top: trail.y,
            width: 8 - idx * 0.3,
            height: 8 - idx * 0.3,
            background: `rgba(249, 115, 22, ${0.6 - idx * 0.04})`,
            boxShadow: `0 0 ${10 - idx * 0.5}px rgba(249, 115, 22, ${0.8 - idx * 0.05})`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className={`custom-cursor hidden md:block ${isActive ? 'active' : ''}`}
        animate={{
          left: position.x,
          top: position.y,
          scale: isActive ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          width: 24,
          height: 24,
          border: '2px solid #f97316',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          background: isActive ? 'rgba(249, 115, 22, 0.3)' : 'transparent',
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.6), inset 0 0 10px rgba(249, 115, 22, 0.4)',
        }}
      >
        <div 
          className="absolute inset-0 rounded-full animate-ping" 
          style={{
            background: 'rgba(249, 115, 22, 0.4)',
            animationDuration: '2s'
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-[9998] rounded-full border border-orange-500/30"
        animate={{
          left: position.x,
          top: position.y,
          scale: isActive ? 2 : 1.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        style={{
          width: 48,
          height: 48,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}

export default CustomCursor
