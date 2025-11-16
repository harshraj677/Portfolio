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
      
      // Add smooth trail points
      const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() + Math.random() }
      trailRef.current = [...trailRef.current, newTrail].slice(-8)
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
      {/* Smooth circular trail */}
      {trails.map((trail, idx) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ 
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            left: trail.x,
            top: trail.y,
            width: 6,
            height: 6,
            background: 'linear-gradient(135deg, #0ea5e9, #d946ef)',
            boxShadow: '0 0 10px rgba(14, 165, 233, 0.6)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Main cursor - clean circle */}
      <motion.div
        className="custom-cursor hidden md:block"
        animate={{
          left: position.x,
          top: position.y,
          scale: isActive ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          width: 20,
          height: 20,
          border: '2px solid #0ea5e9',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          background: isActive 
            ? 'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)' 
            : 'transparent',
          boxShadow: isActive
            ? '0 0 20px rgba(14, 165, 233, 0.8), 0 0 40px rgba(217, 70, 239, 0.4)'
            : '0 0 15px rgba(14, 165, 233, 0.6)',
        }}
      />

      {/* Outer ring - smooth follow */}
      <motion.div
        className="hidden md:block fixed pointer-events-none z-[9998] rounded-full border border-cyan-500/40"
        animate={{
          left: position.x,
          top: position.y,
          scale: isActive ? 2 : 1.4,
          opacity: isActive ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        style={{
          width: 40,
          height: 40,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(14, 165, 233, 0.3)',
        }}
      />
    </>
  )
}

export default CustomCursor
