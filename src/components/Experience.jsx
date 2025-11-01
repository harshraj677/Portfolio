import { motion } from 'framer-motion'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'

const Experience = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Anveasana Student Ambassador',
      organization: 'Anveasana Platform',
      duration: '2024 - Present',
      description: 'Representing the platform at college level, organizing events, and promoting innovative learning initiatives among students.',
      skills: ['Leadership', 'Event Management', 'Communication']
    },
    {
      type: 'work',
      title: 'Web Development Intern',
      organization: 'Tech Startup',
      duration: 'Summer 2024',
      description: 'Developed and maintained web applications using React.js and Node.js. Collaborated with design team to implement responsive UI/UX.',
      skills: ['React', 'Node.js', 'REST APIs', 'Git']
    },
    {
      type: 'education',
      title: 'B.Tech in Computer Science Engineering',
      organization: 'PES Institute of Technology and Management',
      duration: '2022 - 2026',
      description: 'Pursuing Computer Science Engineering with focus on full-stack development, data structures, algorithms, and AI/ML.',
      skills: ['DSA', 'MERN Stack', 'AI/ML', 'Software Engineering']
    },
    {
      type: 'work',
      title: 'Freelance Developer',
      organization: 'Self-Employed',
      duration: '2023 - Present',
      description: 'Building custom web solutions for clients, specializing in MERN stack applications with modern UI/UX design.',
      skills: ['Full Stack', 'Client Management', 'Problem Solving']
    }
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Experience & Education</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey through education and professional experiences
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1"
                >
                  <div className="glass-effect p-6 rounded-2xl border-l-4 border-primary-500 hover:shadow-2xl transition-all">
                    {/* Icon & Type */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg">
                        {exp.type === 'work' ? (
                          <HiBriefcase className="w-5 h-5 text-white" />
                        ) : (
                          <HiAcademicCap className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-semibold">
                        {exp.type === 'work' ? 'Experience' : 'Education'}
                      </span>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold mb-2">
                      {exp.organization}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {exp.duration}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 dark:bg-dark-400 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Timeline Dot */}
                <div className="hidden md:block relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-dark-400 shadow-lg z-10"
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default Experience
