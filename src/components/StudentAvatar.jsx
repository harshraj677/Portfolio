import { motion } from 'framer-motion'

export default function StudentAvatar() {
  return (
    <motion.svg 
      viewBox="0 0 700 700" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <defs>
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
        <radialGradient id="ambient-glow">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#d946ef" stopOpacity="0"/>
        </radialGradient>
        <filter id="glow-effect">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Ambient Background Glow */}
      <motion.circle
        cx="350" cy="350" r="280"
        fill="url(#ambient-glow)"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

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

      {/* Character Head */}
      <motion.g
        animate={{ 
          y: [0, -4, 0],
          rotateZ: [0, 1, 0, -1, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "350px 200px" }}
      >
        {/* Head */}
        <circle cx="350" cy="200" r="50" fill="#ffcb9a"/>
        
        {/* Hair - Modern Style */}
        <path d="M 305 180 Q 350 150 395 180 L 395 200 Q 375 165 350 160 Q 325 165 305 200 Z" fill="#1a1a1a"/>
        <path d="M 320 165 Q 340 155 360 165" stroke="#2a2a2a" strokeWidth="3" fill="none"/>
        
        {/* Glasses - Modern Tech Look */}
        <g opacity="0.9">
          <rect x="320" y="195" width="25" height="18" rx="9" fill="none" stroke="#2a2a2a" strokeWidth="2.5"/>
          <rect x="365" y="195" width="25" height="18" rx="9" fill="none" stroke="#2a2a2a" strokeWidth="2.5"/>
          <line x1="345" y1="204" x2="365" y2="204" stroke="#2a2a2a" strokeWidth="2"/>
          {/* Lens Glare */}
          <ellipse cx="328" cy="200" rx="5" ry="3" fill="white" opacity="0.6"/>
          <ellipse cx="373" cy="200" rx="5" ry="3" fill="white" opacity="0.6"/>
        </g>
        
        {/* Eyes with Animation */}
        <motion.g
          animate={{ scaleY: [1, 0.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, repeatDelay: 3 }}
        >
          <circle cx="332" cy="202" r="3" fill="#1a1a1a"/>
          <circle cx="377" cy="202" r="3" fill="#1a1a1a"/>
        </motion.g>
        
        {/* Smile */}
        <path d="M 330 220 Q 350 228 370 220" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </motion.g>

      {/* Character Body */}
      <motion.g
        animate={{ 
          y: [0, -3, 0],
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      >
        {/* Torso - Hoodie Style */}
        <rect x="300" y="250" width="100" height="140" rx="20" fill="url(#body-gradient)"/>
        <path d="M 310 260 Q 350 250 390 260 L 390 280 L 310 280 Z" fill="#8b5cf6" opacity="0.7"/>
        
        {/* Hoodie Strings */}
        <line x1="335" y1="260" x2="335" y2="285" stroke="#1a1a1a" strokeWidth="2"/>
        <line x1="365" y1="260" x2="365" y2="285" stroke="#1a1a1a" strokeWidth="2"/>
        <circle cx="335" cy="290" r="3" fill="#1a1a1a"/>
        <circle cx="365" cy="290" r="3" fill="#1a1a1a"/>
      </motion.g>

      {/* Arms Typing */}
      <motion.g
        animate={{ 
          rotateZ: [0, -3, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: "300px 280px" }}
      >
        {/* Left Arm */}
        <rect x="260" y="280" width="40" height="110" rx="20" fill="url(#body-gradient)"/>
        <ellipse cx="280" cy="400" rx="15" ry="12" fill="#ffcb9a"/>
      </motion.g>
      
      <motion.g
        animate={{ 
          rotateZ: [0, 3, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        style={{ transformOrigin: "400px 280px" }}
      >
        {/* Right Arm */}
        <rect x="400" y="280" width="40" height="110" rx="20" fill="url(#body-gradient)"/>
        <ellipse cx="420" cy="400" rx="15" ry="12" fill="#ffcb9a"/>
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
