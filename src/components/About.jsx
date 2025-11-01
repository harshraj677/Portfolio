import { motion } from 'framer-motion'
import { HiCode, HiLightningBolt, HiUsers } from 'react-icons/hi'

const About = () => {
  const badges = [
    'MERN Stack Developer',
    'AI & ML Learner',
    'Anvesana Ambassador',
    'Java Developer'
  ]

  const highlights = [
    {
      icon: HiCode,
      title: 'Full Stack Development',
      description: 'Building scalable web applications with modern technologies'
    },
    {
      icon: HiLightningBolt,
      title: 'Quick Learner',
      description: 'Passionate about learning and implementing new technologies'
    },
    {
      icon: HiUsers,
      title: 'Team Collaboration',
      description: 'Effective communicator and collaborative team player'
    }
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what drives me
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image/Avatar Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Image Container */}
              <div className="relative w-full max-w-md mx-auto aspect-square rounded-3xl overflow-hidden glass-effect-dark border-2 border-primary-500/30 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-9xl mb-4">🚀</div>
                    <p className="text-white text-xl font-semibold">Harsh Raj</p>
                    <p className="text-white/60">Developer & Innovator</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl opacity-20 blur-xl"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Hello! I'm <span className="font-semibold text-primary-600 dark:text-primary-400">Harsh Raj</span>, 
                a passionate Computer Science Engineering student at <span className="font-semibold">PES Institute of Technology and Management</span>.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                I specialize in <span className="font-semibold text-accent-600 dark:text-accent-400">MERN Stack Development</span>, 
                creating dynamic and responsive web applications. My journey in tech has been driven by curiosity 
                and a desire to build solutions that make a difference.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                Beyond coding, I'm exploring AI & Machine Learning, participating in hackathons, 
                and serving as an Anvesana College Ambassador, helping bridge innovation and education.
              </motion.p>
            </div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {badges.map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-full text-primary-700 dark:text-primary-400 font-medium text-sm"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* Highlights */}
            <div className="grid gap-4 pt-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-xl glass-effect hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default About
