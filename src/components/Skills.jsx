import { motion } from 'framer-motion'
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiTailwindcss, SiJavascript, SiGit, SiPython, SiHtml5, SiCss3, SiFirebase, SiDocker, SiRedis, SiGraphql, SiTypescript, SiVite } from 'react-icons/si'

const Skills = () => {
  const floatingSkills = [
    // MERN Stack Core (Largest)
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', size: 'xlarge', speed: 8, layer: 1 },
    { name: 'Express', icon: SiExpress, color: '#ffffff', size: 'xlarge', speed: 8.5, layer: 1 },
    { name: 'React', icon: SiReact, color: '#61DAFB', size: 'xlarge', speed: 9, layer: 1 },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933', size: 'xlarge', speed: 8.2, layer: 1 },
    
    // Primary Technologies (Large)
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', size: 'large', speed: 10, layer: 2 },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', size: 'large', speed: 10.5, layer: 2 },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4', size: 'large', speed: 11, layer: 2 },
    
    // Supporting Technologies (Medium)
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26', size: 'medium', speed: 12, layer: 3 },
    { name: 'CSS3', icon: SiCss3, color: '#1572B6', size: 'medium', speed: 12.5, layer: 3 },
    { name: 'Git', icon: SiGit, color: '#F05032', size: 'medium', speed: 13, layer: 3 },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', size: 'medium', speed: 13.5, layer: 3 },
    
    // Additional Tools (Small)
    { name: 'Docker', icon: SiDocker, color: '#2496ED', size: 'small', speed: 14, layer: 4 },
    { name: 'Redis', icon: SiRedis, color: '#DC382D', size: 'small', speed: 14.5, layer: 4 },
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098', size: 'small', speed: 15, layer: 4 },
    { name: 'Vite', icon: SiVite, color: '#646CFF', size: 'small', speed: 15.5, layer: 4 },
  ]

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React.js', icon: SiReact, color: '#61DAFB', level: 90 },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 85 },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4', level: 88 },
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 82 },
        { name: 'Express.js', icon: SiExpress, color: '#000000', level: 80 },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 78 },
      ]
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git', icon: SiGit, color: '#F05032', level: 85 },
        { name: 'Python', icon: SiPython, color: '#3776AB', level: 75 },
      ]
    }
  ]

  const getSizeValue = (size) => {
    switch (size) {
      case 'xlarge': return { width: 140, iconSize: 70 }
      case 'large': return { width: 110, iconSize: 55 }
      case 'medium': return { width: 85, iconSize: 42 }
      case 'small': return { width: 65, iconSize: 32 }
      default: return { width: 90, iconSize: 45 }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies I've been working with to build amazing projects
          </p>
        </motion.div>

        {/* Floating 3D Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-20 px-4"
          style={{ minHeight: '700px' }}
        >
          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-3xl" />
          
          {/* Rotating Container */}
          <motion.div 
            className="relative w-full h-full flex items-center justify-center" 
            style={{ minHeight: '700px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            {floatingSkills.map((skill, index) => {
              const angle = (index * 360) / floatingSkills.length
              const baseRadius = skill.layer === 1 ? 180 : skill.layer === 2 ? 260 : skill.layer === 3 ? 330 : 380
              const x = Math.cos((angle * Math.PI) / 180) * baseRadius
              const y = Math.sin((angle * Math.PI) / 180) * baseRadius
              const sizeValues = getSizeValue(skill.size)
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0, rotate: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [y - 10, y + 10, y - 10],
                    x: [x - 5, x + 5, x - 5],
                    rotate: -360,
                  }}
                  transition={{
                    opacity: { delay: index * 0.08, duration: 0.6 },
                    scale: { delay: index * 0.08, duration: 0.6, type: "spring" },
                    y: {
                      duration: skill.speed,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    x: {
                      duration: skill.speed * 1.2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    rotate: {
                      duration: 60,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  whileHover={{
                    scale: 1.5,
                    zIndex: 999,
                    y: y - 20,
                    transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 15 }
                  }}
                  className="absolute cursor-pointer group"
                  style={{
                    width: sizeValues.width,
                    height: sizeValues.width,
                    left: '50%',
                    top: '50%',
                    marginLeft: -sizeValues.width / 2,
                    marginTop: -sizeValues.width / 2,
                    transform: `translate(${x}px, ${y}px)`,
                    zIndex: 10
                  }}
                >
                  <div className="relative w-full h-full">
                    {/* Icon Container */}
                    <div 
                      className="absolute inset-0 rounded-2xl glass-effect-dark border-2 flex items-center justify-center transition-all duration-300 group-hover:border-primary-400 group-hover:shadow-2xl group-hover:scale-105"
                      style={{
                        borderColor: `${skill.color}50`,
                        boxShadow: `0 4px 20px ${skill.color}30, 0 8px 25px rgba(0,0,0,0.2)`,
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      }}
                    >
                      <skill.icon 
                        style={{ 
                          color: skill.color,
                          fontSize: sizeValues.iconSize,
                          filter: `drop-shadow(0 4px 8px ${skill.color}60)`
                        }}
                        className="transition-all duration-300 group-hover:scale-110 group-hover:filter group-hover:brightness-125"
                      />
                    </div>
                    
                    {/* Name Label on Hover */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
                      <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm rounded-lg font-bold shadow-2xl block">
                        {skill.name}
                      </span>
                    </div>

                    {/* Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl -z-10"
                      style={{
                        background: `radial-gradient(circle, ${skill.color}60, transparent 70%)`
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-2xl font-display font-bold text-gray-800 dark:text-white mb-6">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    {/* Skill Card */}
                    <div className="p-6 rounded-2xl glass-effect hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-primary-500/30">
                      <div className="flex items-center gap-4 mb-4">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="p-3 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl"
                        >
                          <skill.icon 
                            className="w-8 h-8" 
                            style={{ color: skill.color }}
                          />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                            {skill.name}
                          </h4>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.level}% Proficiency
                          </span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
            Also Familiar With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['HTML5', 'CSS3', 'REST APIs', 'Postman', 'VS Code', 'GitHub', 'Figma', 'AI Tools'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-6 py-3 bg-white dark:bg-dark-300 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 font-medium shadow-sm hover:shadow-md transition-all"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default Skills
