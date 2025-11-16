import { motion } from 'framer-motion'
import { HiDownload, HiArrowRight } from 'react-icons/hi'
import { FaCode, FaLaptopCode, FaRocket } from 'react-icons/fa'

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
      {/* Optimized Gradient Background - Professional Theme */}
      <div className="absolute inset-0">
        {/* Base gradient - deep blue to dark */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#030509] via-[#0a0f1e] to-[#030509]"></div>
        
        {/* Layered gradient orbs - cyan and purple tones */}
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              x: [0, 100, 0],
              y: [0, -80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-cyan-500/25 via-blue-600/12 to-transparent rounded-full filter blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, -80, 0],
              y: [0, 100, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-gradient-radial from-purple-500/20 via-fuchsia-600/10 to-transparent rounded-full filter blur-3xl"
          />
          <motion.div 
            animate={{ 
              x: [0, 60, 0],
              y: [0, -60, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/3 left-1/2 w-[380px] h-[380px] bg-gradient-radial from-blue-500/22 via-cyan-600/11 to-transparent rounded-full filter blur-3xl"
          />
        </div>

        {/* Subtle animated grid */}
        <motion.div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(14,165,233,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.4) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 80%)'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Refined gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030509]/50 via-transparent to-[#030509]/70" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 lg:px-8 xl:px-12 z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 xl:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left lg:pr-8">
            <motion.div variants={itemVariants} className="mb-4">
              <motion.span 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(14, 165, 233, 0.6)" }}
                className="inline-block px-6 py-3 glass-effect border border-cyan-500/40 rounded-full text-cyan-400 font-semibold text-sm mb-4 shadow-lg shadow-cyan-500/30"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  MERN Stack Developer | AI/ML Enthusiast
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
                className="block text-blue-100 mb-2"
              >
                Hi, I'm
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, scale: 0.85, rotateX: -10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.03, 
                  rotateZ: 1,
                  transition: { duration: 0.3 }
                }}
                className="block bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent font-black"
                style={{ 
                  filter: "drop-shadow(0 0 40px rgba(14, 165, 233, 0.6))",
                  textShadow: "0 0 80px rgba(217, 70, 239, 0.4)"
                }}
              >
                Harsh Raj
              </motion.span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4"
            >
              <motion.span 
                className="block bg-gradient-to-r from-cyan-200 to-blue-400 bg-clip-text text-transparent font-bold"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                MERN Stack Developer
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Learning AI/ML & Deep Learning
              </motion.span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              style={{ textShadow: "0 2px 10px rgba(14, 165, 233, 0.2)" }}
            >
              Building full-stack web applications with MERN stack while exploring the frontiers of AI, Machine Learning, and Deep Learning.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#projects"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                className="btn-secondary inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <HiDownload />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto lg:mx-0"
            >
              {[
                { number: '5+', label: 'Projects' },
                { number: '4+', label: 'Technologies' },
                { number: '2+', label: 'Achievements' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-200/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Professional Photo Section */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative -mt-8 sm:-mt-16 lg:-mt-40"
          >
            <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-2xl mx-auto aspect-square px-6 sm:px-8 lg:px-0">
              {/* Subtle Static Background Glow - Blends with hero background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-radial from-blue-500/15 via-transparent to-transparent rounded-full blur-2xl" />
              </div>

              {/* Photo Container - Static */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Main Photo - No Border */}
                <div className="relative w-full h-full max-w-[280px] max-h-[280px] sm:max-w-[400px] sm:max-h-[400px] lg:max-w-[700px] lg:max-h-[700px]">
                  <img 
                    src="/port photo/photo3.png" 
                    alt="Harsh Raj - MERN Stack Developer" 
                    className="w-full h-full object-contain scale-110 sm:scale-125 lg:scale-150"
                  />
                </div>
              </div>

              {/* Floating Tech Stack Labels */}
              {[
                { text: 'MongoDB', x: '-15%', y: '15%', delay: 0 },
                { text: 'Express', x: '105%', y: '25%', delay: 0.8 },
                { text: 'React', x: '105%', y: '70%', delay: 1.6 },
                { text: 'Node.js', x: '-15%', y: '75%', delay: 2.4 },
                { text: 'Python', x: '-10%', y: '45%', delay: 3.2 },
                { text: 'Java', x: '100%', y: '50%', delay: 4.0 }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1, 1, 0],
                    y: [0, -25, -50, -75]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeOut"
                  }}
                  className="absolute px-4 py-2 bg-gradient-to-r from-cyan-500/25 to-purple-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-sm font-bold backdrop-blur-md shadow-lg shadow-cyan-500/20"
                  style={{
                    left: item.x,
                    top: item.y
                  }}
                >
                  {item.text}
                </motion.div>
              ))}
            </div>
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
          className="w-6 h-10 border-2 border-cyan-500 rounded-full flex justify-center pt-2 shadow-lg shadow-cyan-500/30"
        >
          <div className="w-1 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
