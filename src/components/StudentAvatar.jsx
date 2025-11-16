import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export default function StudentAvatar() {
  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(350)
  const mouseY = useMotionValue(350)
  
  const headRotateX = useTransform(mouseY, [250, 450], [5, -5])
  const headRotateY = useTransform(mouseX, [250, 450], [-8, 8])
  const eyeOffsetX = useTransform(mouseX, [250, 450], [-3, 3])
  const eyeOffsetY = useTransform(mouseY, [250, 450], [-2, 2])
  
  const smoothHeadRotateX = useSpring(headRotateX, { stiffness: 50, damping: 20 })
  const smoothHeadRotateY = useSpring(headRotateY, { stiffness: 50, damping: 20 })
  const smoothEyeX = useSpring(eyeOffsetX, { stiffness: 100, damping: 15 })
  const smoothEyeY = useSpring(eyeOffsetY, { stiffness: 100, damping: 15 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect?.()
      if (rect) {
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }
    
    const svg = document.querySelector('#professional-avatar')
    if (svg) {
      svg.addEventListener('mousemove', handleMouseMove)
      return () => svg.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <motion.svg 
      id="professional-avatar"
      viewBox="0 0 700 700" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 1.8, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring", 
        stiffness: 60,
        damping: 15
      }}
      whileHover={{ scale: 1.02 }}
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      <defs>
        {/* Enhanced Gradients */}
        <linearGradient id="laptop-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#0f0f0f" />
        </linearGradient>
        <linearGradient id="screen-glow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="body-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
        <linearGradient id="face-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd4a3" />
          <stop offset="100%" stopColor="#ffb366" />
        </linearGradient>
        <linearGradient id="hair-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <radialGradient id="ambient-glow">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="spotlight">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow-effect">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.4"/>
        </filter>
      </defs>

      {/* Dynamic Background Circles */}
      <motion.circle
        cx="350" cy="350" r="320"
        fill="url(#ambient-glow)"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Spotlight Effect */}
      <motion.circle
        cx="350" cy="280" r="200"
        fill="url(#spotlight)"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [0.95, 1.08, 0.95],
          y: [-5, 5, -5]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          cx={200 + i * 80}
          cy={150 + (i % 3) * 150}
          r={2 + (i % 3)}
          fill="#0ea5e9"
          opacity="0"
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8
          }}
        />
      ))}

      {/* Desk Surface */}
      <motion.g
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <rect x="100" y="500" width="500" height="20" rx="10" fill="#1a1a1a"/>
        <rect x="100" y="500" width="500" height="4" rx="10" fill="#0ea5e9" opacity="0.4"/>
      </motion.g>

      {/* Laptop Base */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <path 
          d="M 220 470 L 210 495 L 490 495 L 480 470 Z" 
          fill="url(#laptop-base)"
          stroke="#0ea5e9"
          strokeWidth="2"
        />
        {/* Keyboard Keys */}
        {[...Array(5)].map((_, i) => (
          <motion.rect 
            key={`key-${i}`}
            x={240 + i * 40} 
            y="478" 
            width="30" 
            height="7" 
            rx="2" 
            fill="#3a3a3a"
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        {/* Trackpad */}
        <rect x="320" y="480" width="60" height="10" rx="5" fill="#2a2a2a" stroke="#0ea5e9" strokeWidth="1" opacity="0.8"/>
      </motion.g>

      {/* Laptop Screen */}
      <motion.g
        animate={{ 
          rotateX: [0, -1.5, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "350px 470px" }}
      >
        {/* Screen Frame */}
        <path 
          d="M 230 240 L 220 470 L 480 470 L 470 240 Z" 
          fill="#1a1a1a"
          stroke="#0ea5e9"
          strokeWidth="3"
        />
        
        {/* Glowing Screen */}
        <motion.rect 
          x="240" y="260" width="220" height="190" rx="10" 
          fill="url(#screen-glow)"
          filter="url(#glow-effect)"
          animate={{ 
            opacity: [0.85, 1, 0.85],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Code Editor Interface */}
        <g opacity="0.9">
          {/* Sidebar */}
          <rect x="245" y="265" width="25" height="175" rx="4" fill="#0a0a0a" opacity="0.8"/>
          
          {/* Code Lines with Syntax Highlighting */}
          <motion.rect x="280" y="275" width="70" height="4" rx="2" fill="#fbbf24"
            animate={{ width: [60, 85, 60] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <rect x="280" y="288" width="130" height="4" rx="2" fill="#fb923c" opacity="0.9"/>
          <motion.rect x="280" y="301" width="90" height="4" rx="2" fill="#34d399"
            animate={{ width: [75, 105, 75] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          <rect x="280" y="314" width="120" height="4" rx="2" fill="#60a5fa" opacity="0.9"/>
          <motion.rect x="280" y="327" width="60" height="4" rx="2" fill="#f472b6"
            animate={{ width: [45, 80, 45] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <rect x="280" y="340" width="100" height="4" rx="2" fill="#a78bfa" opacity="0.9"/>
          <rect x="280" y="353" width="140" height="4" rx="2" fill="#fb923c" opacity="0.9"/>
          <motion.rect x="280" y="366" width="80" height="4" rx="2" fill="#fbbf24"
            animate={{ width: [65, 95, 65] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
          />
          
          {/* Blinking Cursor */}
          <motion.rect 
            x="415" y="275" width="2" height="4" fill="#0ea5e9"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </g>
        
        {/* Screen Reflection */}
        <rect x="245" y="265" width="210" height="90" rx="8" fill="white" opacity="0.06"/>
      </motion.g>

      {/* Character Head with 3D Effect and Parallax */}
      <motion.g
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ 
          transformOrigin: "350px 200px",
          rotateX: smoothHeadRotateX,
          rotateY: smoothHeadRotateY
        }}
        whileHover={{
          scale: 1.08,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        filter="url(#shadow)"
      >
        {/* 3D Head Shadow/Depth with motion */}
        <motion.ellipse 
          cx="353" cy="205" rx="52" ry="50" 
          fill="#d9a066" 
          opacity="0.3"
          animate={{
            rx: [52, 54, 52],
            ry: [50, 52, 50]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main Head - Cartoon Style with breathing */}
        <motion.circle 
          cx="350" cy="200" r="52" 
          fill="url(#face-gradient)"
          animate={{
            r: [52, 53, 52]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle 
          cx="350" cy="200" r="50" 
          fill="#ffcb9a" 
          opacity="0.95"
          animate={{
            r: [50, 51, 50]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Face Highlight for 3D effect - animated */}
        <motion.ellipse 
          cx="335" cy="180" rx="25" ry="30" 
          fill="white" 
          opacity="0.2"
          animate={{
            opacity: [0.2, 0.3, 0.2],
            cx: [335, 337, 335]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Professional Haircut - 3D Styled with subtle motion */}
        <g>
          <motion.path 
            d="M 305 175 Q 350 140 395 175 L 395 205 Q 385 165 350 150 Q 315 165 305 205 Z" 
            fill="url(#hair-gradient)"
            animate={{
              d: [
                "M 305 175 Q 350 140 395 175 L 395 205 Q 385 165 350 150 Q 315 165 305 205 Z",
                "M 305 175 Q 350 138 395 175 L 395 205 Q 385 165 350 148 Q 315 165 305 205 Z",
                "M 305 175 Q 350 140 395 175 L 395 205 Q 385 165 350 150 Q 315 165 305 205 Z"
              ]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Hair Shine with pulse */}
          <motion.ellipse 
            cx="360" cy="160" rx="15" ry="8" 
            fill="white" 
            opacity="0.15"
            animate={{
              opacity: [0.15, 0.25, 0.15],
              rx: [15, 17, 15]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Hair Strands with subtle movement */}
          <motion.path 
            d="M 320 160 Q 325 152 330 160" 
            stroke="#0f0f0f" 
            strokeWidth="2" 
            fill="none" 
            opacity="0.6"
            animate={{ d: ["M 320 160 Q 325 152 330 160", "M 320 160 Q 325 150 330 160", "M 320 160 Q 325 152 330 160"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path 
            d="M 340 155 Q 345 148 350 155" 
            stroke="#0f0f0f" 
            strokeWidth="2" 
            fill="none" 
            opacity="0.6"
            animate={{ d: ["M 340 155 Q 345 148 350 155", "M 340 155 Q 345 146 350 155", "M 340 155 Q 345 148 350 155"] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
          />
          <motion.path 
            d="M 370 160 Q 375 153 380 160" 
            stroke="#0f0f0f" 
            strokeWidth="2" 
            fill="none" 
            opacity="0.6"
            animate={{ d: ["M 370 160 Q 375 153 380 160", "M 370 160 Q 375 151 380 160", "M 370 160 Q 375 153 380 160"] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 0.6 }}
          />
          {/* Side hair */}
          <path d="M 305 185 L 308 200 L 310 195" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
          <path d="M 395 185 L 392 200 L 390 195" stroke="#1a1a1a" strokeWidth="2.5" fill="none"/>
        </g>
        
        {/* Modern Tech Glasses with 3D Effect and Reflections */}
        <g opacity="0.95">
          {/* Glass Frame Shadow */}
          <rect x="321" y="198" width="25" height="18" rx="9" fill="#1a1a1a" opacity="0.2"/>
          <rect x="366" y="198" width="25" height="18" rx="9" fill="#1a1a1a" opacity="0.2"/>
          
          {/* Main Frames */}
          <rect x="320" y="195" width="25" height="18" rx="9" fill="rgba(42,42,42,0.1)" stroke="#2a2a2a" strokeWidth="3"/>
          <rect x="365" y="195" width="25" height="18" rx="9" fill="rgba(42,42,42,0.1)" stroke="#2a2a2a" strokeWidth="3"/>
          
          {/* Bridge */}
          <line x1="345" y1="204" x2="365" y2="204" stroke="#2a2a2a" strokeWidth="2.5"/>
          
          {/* Animated Lens Reflections */}
          <motion.ellipse 
            cx="328" cy="199" rx="6" ry="4" fill="white" opacity="0.7"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              rx: [6, 7, 6]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse 
            cx="373" cy="199" rx="6" ry="4" fill="white" opacity="0.7"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              rx: [6, 7, 6]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.ellipse 
            cx="325" cy="202" rx="3" ry="2" fill="#0ea5e9" opacity="0.3"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.ellipse 
            cx="370" cy="202" rx="3" ry="2" fill="#0ea5e9" opacity="0.3"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </g>
        
        {/* Animated Eyes with Following Effect */}
        <motion.g
          animate={{ 
            scaleY: [1, 0.1, 1],
          }}
          transition={{ 
            duration: 0.15,
            repeat: Infinity, 
            repeatDelay: 5,
            repeatType: "mirror"
          }}
          style={{
            x: smoothEyeX,
            y: smoothEyeY
          }}
        >
          <motion.circle 
            cx="332" cy="202" r="3.5" 
            fill="#1a1a1a"
            animate={{
              r: [3.5, 4, 3.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle 
            cx="377" cy="202" r="3.5" 
            fill="#1a1a1a"
            animate={{
              r: [3.5, 4, 3.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {/* Eye Shine with sparkle */}
          <motion.circle 
            cx="333" cy="201" r="1" 
            fill="white" 
            opacity="0.8"
            animate={{
              opacity: [0.8, 1, 0.8],
              r: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <motion.circle 
            cx="378" cy="201" r="1" 
            fill="white" 
            opacity="0.8"
            animate={{
              opacity: [0.8, 1, 0.8],
              r: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.2
            }}
          />
        </motion.g>
        
        {/* Eyebrows - Expression with subtle movement */}
        <motion.path 
          d="M 320 188 Q 328 186 335 188" 
          stroke="#5a5a5a" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
          animate={{ 
            d: [
              "M 320 188 Q 328 186 335 188",
              "M 320 187 Q 328 185 335 187",
              "M 320 188 Q 328 186 335 188"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 365 188 Q 373 186 380 188" 
          stroke="#5a5a5a" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
          animate={{ 
            d: [
              "M 365 188 Q 373 186 380 188",
              "M 365 187 Q 373 185 380 187",
              "M 365 188 Q 373 186 380 188"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.2, ease: "easeInOut" }}
        />
        
        {/* Nose */}
        <path d="M 350 208 L 348 215" stroke="#d9a066" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Friendly Smile with 3D effect and natural movement */}
        <path d="M 330 222 Q 350 232 370 222" stroke="#d9a066" strokeWidth="1.5" fill="none" opacity="0.3"/>
        <motion.path 
          d="M 330 221 Q 350 230 370 221" 
          stroke="#1a1a1a" 
          strokeWidth="2.8" 
          fill="none" 
          strokeLinecap="round"
          animate={{ 
            d: [
              "M 330 221 Q 350 230 370 221", 
              "M 330 221 Q 350 234 370 221",
              "M 330 221 Q 350 232 370 221",
              "M 330 221 Q 350 230 370 221"
            ] 
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Cheek Blush with pulse */}
        <motion.ellipse 
          cx="320" cy="212" rx="8" ry="5" 
          fill="#ff9999" 
          opacity="0.25"
          animate={{
            opacity: [0.25, 0.4, 0.25],
            rx: [8, 9, 8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.ellipse 
          cx="380" cy="212" rx="8" ry="5" 
          fill="#ff9999" 
          opacity="0.25"
          animate={{
            opacity: [0.25, 0.4, 0.25],
            rx: [8, 9, 8]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Ears */}
        <ellipse cx="298" cy="200" rx="8" ry="12" fill="#ffb380"/>
        <ellipse cx="402" cy="200" rx="8" ry="12" fill="#ffb380"/>
        <ellipse cx="298" cy="200" rx="4" ry="6" fill="#d9a066"/>
        <ellipse cx="402" cy="200" rx="4" ry="6" fill="#d9a066"/>
      </motion.g>

      {/* Character Body with professional breathing motion */}
      <motion.g
        animate={{ 
          y: [0, -4, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      >
        {/* Professional Attire - Suit/Blazer */}
        <g>
          {/* Main Suit Body with subtle scale */}
          <motion.rect 
            x="300" y="250" width="100" height="140" rx="15" 
            fill="#1e293b"
            animate={{
              height: [140, 142, 140]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Shirt Collar */}
          <path d="M 320 250 L 315 265 L 335 270 L 350 268 L 365 270 L 385 265 L 380 250 Z" fill="#e0f2fe"/>
          
          {/* Tie with gradient and shine */}
          <motion.path 
            d="M 350 268 L 346 310 L 343 350 L 350 365 L 357 350 L 354 310 Z" 
            fill="url(#body-gradient)" 
            opacity="0.9"
            animate={{
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Suit Buttons with glow */}
          <motion.circle 
            cx="350" cy="295" r="3" 
            fill="#0ea5e9" 
            opacity="0.9"
            animate={{
              opacity: [0.9, 1, 0.9],
              r: [3, 3.5, 3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.circle 
            cx="350" cy="325" r="3" 
            fill="#0ea5e9" 
            opacity="0.9"
            animate={{
              opacity: [0.9, 1, 0.9],
              r: [3, 3.5, 3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
          <motion.circle 
            cx="350" cy="355" r="3" 
            fill="#0ea5e9" 
            opacity="0.9"
            animate={{
              opacity: [0.9, 1, 0.9],
              r: [3, 3.5, 3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
          />
          
          {/* Suit Lapels */}
          <path d="M 300 250 L 315 265 L 315 320 L 300 320 Z" fill="#0f172a" opacity="0.8"/>
          <path d="M 400 250 L 385 265 L 385 320 L 400 320 Z" fill="#0f172a" opacity="0.8"/>
        </g>
      </motion.g>

      {/* Arms Typing with natural movement */}
      <motion.g
        animate={{ 
          rotateZ: [0, -4, -2, -4, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "300px 280px" }}
      >
        {/* Left Arm - Suit Sleeve */}
        <motion.rect 
          x="260" y="280" width="40" height="110" rx="20" 
          fill="#1e293b"
          animate={{
            height: [110, 112, 110]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <rect x="260" y="370" width="40" height="20" rx="10" fill="#0f172a"/>
        <motion.ellipse 
          cx="280" cy="400" rx="15" ry="12" 
          fill="#ffcb9a"
          animate={{
            ry: [12, 13, 12]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.g>
      
      <motion.g
        animate={{ 
          rotateZ: [0, 4, 2, 4, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.15
        }}
        style={{ transformOrigin: "400px 280px" }}
      >
        {/* Right Arm - Suit Sleeve */}
        <motion.rect 
          x="400" y="280" width="40" height="110" rx="20" 
          fill="#1e293b"
          animate={{
            height: [110, 112, 110]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15
          }}
        />
        <rect x="400" y="370" width="40" height="20" rx="10" fill="#0f172a"/>
        <motion.ellipse 
          cx="420" cy="400" rx="15" ry="12" 
          fill="#ffcb9a"
          animate={{
            ry: [12, 13, 12]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15
          }}
        />
      </motion.g>

      {/* Floating Tech Icons */}
      {[
        { icon: 'M', x: 150, y: 200, delay: 0 },
        { icon: 'E', x: 550, y: 250, delay: 0.5 },
        { icon: 'R', x: 580, y: 350, delay: 1 },
        { icon: 'N', x: 120, y: 350, delay: 1.5 }
      ].map((item, i) => (
        <motion.g key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -30, -60, -90]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeOut"
          }}
        >
          <circle cx={item.x} cy={item.y} r="20" fill={i % 2 === 0 ? "#0ea5e9" : "#d946ef"} opacity="0.2"/>
          <text x={item.x} y={item.y} textAnchor="middle" dy="7" fontSize="24" fontWeight="bold" fill={i % 2 === 0 ? "#0ea5e9" : "#d946ef"}>
            {item.icon}
          </text>
        </motion.g>
      ))}

      {/* Coffee Cup */}
      <motion.g
        animate={{ 
          y: [0, -2, 0],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <rect x="520" y="440" width="50" height="60" rx="10" fill="#8B4513" stroke="#0ea5e9" strokeWidth="2"/>
        <ellipse cx="545" cy="440" rx="25" ry="10" fill="#6B3410"/>
        <path d="M 570 455 Q 590 455 590 475 Q 590 495 570 495" stroke="#8B4513" strokeWidth="3" fill="none"/>
        
        {/* Steam Particles */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M ${535 + i * 8} 430 Q ${540 + i * 8} 415 ${535 + i * 8} 400`}
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            animate={{ 
              opacity: [0, 0.7, 0],
              y: [0, -15, -30]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.g>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.circle
          key={`particle-${i}`}
          cx={150 + (i % 6) * 80}
          cy={180 + Math.floor(i / 6) * 40}
          r={2 + (i % 3)}
          fill={i % 3 === 0 ? "#0ea5e9" : i % 3 === 1 ? "#8b5cf6" : "#d946ef"}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            y: [0, -60, -120],
            x: [0, Math.sin(i) * 30, Math.sin(i * 2) * 20]
          }}
          transition={{ 
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut"
          }}
        />
      ))}
    </motion.svg>
  )
}
