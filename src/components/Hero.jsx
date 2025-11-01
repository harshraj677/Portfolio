import { motion } from 'framer-motion'
import { HiDownload, HiArrowRight } from 'react-icons/hi'

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
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 dark:from-dark-500 dark:via-dark-400 dark:to-dark-500"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-500/5 to-transparent" />

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
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-primary-600 dark:text-primary-400 font-semibold text-sm mb-4">
                Welcome to my portfolio 👋
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent animate-glow">
                Harsh Raj
              </span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
            >
              <span className="block">MERN Stack Developer</span>
              <span className="text-primary-600 dark:text-primary-400">CSE Student | Innovator</span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transforming ideas into interactive digital realities with cutting-edge technologies and creative solutions.
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
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 3D Visual/Image Placeholder */}
          <motion.div
            variants={itemVariants}
            className="flex-1 relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full max-w-lg mx-auto aspect-square"
            >
              {/* Glowing Orbs */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-primary-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute w-48 h-48 bg-accent-500/30 rounded-full blur-2xl animate-pulse animation-delay-2000" />
              </div>

              {/* Profile Image Placeholder */}
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden glass-effect-dark border-2 border-primary-500/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4">👨‍💻</div>
                    <p className="text-white text-lg">3D Developer Model</p>
                    <p className="text-white/60 text-sm">Add your photo here</p>
                  </div>
                </div>
              </div>
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
          className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-3 bg-primary-500 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
