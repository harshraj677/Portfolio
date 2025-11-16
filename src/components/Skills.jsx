import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiJavascript, SiGit, SiPython, SiVite } from 'react-icons/si'
import OrbitingSkills from './ui/orbiting-skills'

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      gradient: 'from-cyan-500 via-blue-500 to-purple-600',
      skills: [
        { name: 'React.js', icon: SiReact, color: '#61DAFB' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      ]
    },
    {
      title: 'Backend',
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      ]
    },
    {
      title: 'Tools & Others',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'Vite', icon: SiVite, color: '#646CFF' },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-4"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              🚀 Full-Stack MERN Specialist
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            My Tech Stack
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern tools and frameworks I use to build scalable web applications
          </p>
        </motion.div>

        {/* Orbiting Skills Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-20 md:mb-28 lg:mb-32 flex justify-center py-4 sm:py-8"
        >
          <OrbitingSkills />
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Category Title */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills Cards */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: categoryIndex * 0.2 + skillIndex * 0.15, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    className="group cursor-pointer"
                  >
                    {/* Skill Card */}
                    <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-xl border-2 border-gray-700/50 hover:border-transparent transition-all duration-300 overflow-hidden">
                      {/* Gradient Border on Hover */}
                      <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${category.gradient} p-[2px] -z-10`}>
                        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900" />
                      </div>

                      {/* Colored Dot Indicator */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient}`}
                        />
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Icon Circle */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="relative"
                        >
                          <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center relative overflow-hidden"
                            style={{
                              background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`
                            }}
                          >
                            {/* Glow Effect */}
                            <div 
                              className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                              style={{
                                background: `radial-gradient(circle at center, ${skill.color}40, transparent 70%)`
                              }}
                            />
                            <skill.icon 
                              className="w-12 h-12 relative z-10" 
                              style={{ color: skill.color }}
                            />
                          </div>
                        </motion.div>

                        {/* Skill Name */}
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-1">
                            {skill.name}
                          </h4>
                        </div>
                      </div>

                      {/* Animated Progress Bar - Gradient */}
                      <div className="mt-6 relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.15 + 0.3,
                            ease: "easeOut"
                          }}
                          className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative`}
                        >
                          {/* Shine Effect */}
                          <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              repeatDelay: 1,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default Skills
