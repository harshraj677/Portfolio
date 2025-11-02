import { motion } from 'framer-motion'
import { HiDownload, HiArrowRight } from 'react-icons/hi'
import StudentAvatar from './StudentAvatar'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D Animated Background with Balanced Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0a00] to-black"></div>
        
        {/* Floating 3D Orbs - Enhanced Orange Theme */}
        <div className="absolute inset-0 opacity-60">
          <motion.div 
            animate={{ 
              x: [0, 120, 0],
              y: [0, -80, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-orange-600/40 to-red-600/30 rounded-full filter blur-[100px]"
            style={{ transform: 'translateZ(50px)' }}
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, 100, 0],
              scale: [1, 1.4, 1],
              rotate: [360, 180, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-gradient-to-r from-orange-500/35 to-amber-600/25 rounded-full filter blur-[110px]"
            style={{ transform: 'translateZ(30px)' }}
          />
          <motion.div 
            animate={{ 
              x: [0, 60, 0],
              y: [0, -60, 0],
              scale: [1, 1.2, 1],
              rotate: [0, -180, -360]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 left-1/2 w-[450px] h-[450px] bg-gradient-to-r from-red-600/30 to-orange-600/35 rounded-full filter blur-[95px]"
            style={{ transform: 'translateZ(20px)' }}
          />
        </div>

        {/* Animated Grid Pattern */}
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.08)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-orange-500/5 to-black/50" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={itemVariants} className="mb-4">
              <motion.span 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)" }}
                className="inline-block px-6 py-3 glass-effect border border-orange-500/30 rounded-full text-orange-400 font-semibold text-sm mb-4 shadow-lg shadow-orange-500/20"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                  MERN Stack Specialist 🚀
                </span>
              </motion.span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
              style={{ perspective: '1000px' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block text-gray-200 mb-2"
              >
                Hi, I'm
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.85, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.03, 
                  rotateZ: 2,
                  transition: { duration: 0.3 }
                }}
                className="block bg-gradient-to-r from-orange-300 via-orange-500 to-red-600 bg-clip-text text-transparent font-black"
                style={{ 
                  filter: "drop-shadow(0 0 40px rgba(249, 115, 22, 0.6))",
                  textShadow: "0 0 80px rgba(249, 115, 22, 0.3)"
                }}
              >
                Harsh Raj
              </motion.span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6"
            >
              <motion.span 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block text-gray-300 mb-2"
              >
                Full Stack Developer
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-bold"
              >
                CSE Student | Innovator
              </motion.span>
            </motion.div>
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block text-gray-400"
              >
                Full Stack Developer
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"
              >
                CSE Student | Innovator
              </motion.span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Crafting cutting-edge web applications with the power of MongoDB, Express, React, and Node.js
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="btn-primary inline-flex items-center justify-center gap-2 group relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View My Work</span>
                <HiArrowRight className="group-hover:translate-x-1 transition-transform relative z-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                className="btn-secondary inline-flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <HiDownload className="group-hover:animate-bounce" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0"
            >
              {[
                { number: '15+', label: 'Projects' },
                { number: '5+', label: 'Technologies' },
                { number: '10+', label: 'Achievements' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-orange-500 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 3D Student Avatar */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotateZ: [0, 2, 0, -2, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-lg mx-auto aspect-square"
            >
              {/* Glowing Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-80 h-80 bg-orange-500/30 rounded-full blur-3xl"
                />
                <motion.div 
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute w-64 h-64 bg-red-500/30 rounded-full blur-2xl"
                />
              </div>

              {/* Student Avatar Component */}
              <div className="relative z-10 w-full h-full">
                <StudentAvatar />
              </div>

              {/* Floating Code Snippets */}
              {[
                { text: '<React />', top: '10%', left: '-10%', delay: 0 },
                { text: 'MongoDB', top: '20%', right: '-15%', delay: 0.5 },
                { text: 'Node.js', bottom: '20%', left: '-15%', delay: 1 },
                { text: 'Express', bottom: '15%', right: '-10%', delay: 1.5 }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                    y: [0, -20, -40, -60]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeOut"
                  }}
                  className="absolute px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 text-sm font-mono backdrop-blur-sm"
                  style={{
                    top: item.top,
                    bottom: item.bottom,
                    left: item.left,
                    right: item.right
                  }}
                >
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-orange-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
