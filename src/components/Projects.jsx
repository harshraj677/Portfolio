import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiX, HiArrowLeft, HiStar } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [tiltStyles, setTiltStyles] = useState({});

  const filters = ['All', 'MERN Stack', 'Full Stack', 'Frontend'];

  const handleCardMouseMove = (e, projectId) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((centerX - x) / centerX) * 8;

    setTiltStyles(prev => ({
      ...prev,
      [projectId]: {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`,
      }
    }));
  };

  const handleCardMouseLeave = (projectId) => {
    setTiltStyles(prev => ({
      ...prev,
      [projectId]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      }
    }));
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack MERN e-commerce application with payment integration and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      category: 'MERN Stack',
      liveLink: '#',
      githubLink: '#',
      featured: true,
      features: ['Payment Gateway', 'Admin Dashboard', 'Cart Management', 'Order Tracking'],
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
    },
    {
      id: 2,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with insights and scheduling.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['React', 'Express', 'MongoDB'],
      category: 'MERN Stack',
      liveLink: '#',
      githubLink: '#',
      featured: true,
      features: ['Analytics Dashboard', 'Post Scheduling', 'Engagement Metrics'],
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js']
    },
    {
      id: 3,
      title: 'Real-Time Chat App',
      description: 'Modern chat application with real-time messaging and file sharing.',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'Socket.io'],
      category: 'Full Stack',
      liveLink: '#',
      githubLink: '#',
      featured: false,
      features: ['Real-time Messaging', 'Group Chats', 'File Sharing'],
      techStack: ['React.js', 'Node.js', 'Socket.io']
    }
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const getTechIcon = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('mongo')) return <SiMongodb className="text-green-500" />;
    if (t.includes('express')) return <SiExpress className="text-gray-600 dark:text-gray-300" />;
    if (t.includes('react')) return <SiReact className="text-cyan-500" />;
    if (t.includes('node')) return <SiNodedotjs className="text-green-600" />;
    return null;
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 backdrop-blur-sm border border-primary-500/30 mb-4"
          >
            <HiCode className="text-primary-500" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">MERN Stack Specialist 🚀</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of full-stack applications built with modern technologies
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((f, i) => (
            <motion.button
              key={f}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-500/50 hover:text-primary-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onMouseMove={(e) => handleCardMouseMove(e, project.id)}
                onMouseLeave={() => handleCardMouseLeave(project.id)}
                style={{
                  transformStyle: 'preserve-3d',
                  ...(tiltStyles[project.id] || {}),
                  transition: 'transform 0.1s ease-out'
                }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.featured && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className="absolute top-4 left-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg"
                  >
                    <HiStar />
                    Featured
                  </motion.div>
                )}

                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60" />
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    whileHover={{ opacity: 1 }} 
                    className="absolute inset-0 bg-gradient-to-t from-primary-600/90 via-accent-600/80 to-transparent flex items-center justify-center gap-4"
                  >
                    <motion.a 
                      href={project.liveLink} 
                      onClick={(e) => e.stopPropagation()} 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }} 
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                    >
                      <HiExternalLink size={24} />
                    </motion.a>
                    <motion.a 
                      href={project.githubLink} 
                      onClick={(e) => e.stopPropagation()} 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }} 
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                    >
                      <FaGithub size={24} />
                    </motion.a>
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, ti) => (
                      <span 
                        key={ti} 
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }} 
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-200 dark:border-gray-800 shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
                <motion.button 
                  whileHover={{ scale: 1.1, x: -5 }} 
                  whileTap={{ scale: 0.9 }} 
                  onClick={() => setSelectedProject(null)} 
                  className="p-2 rounded-full hover:bg-primary-500/10 flex items-center gap-2 text-primary-500 font-semibold"
                >
                  <HiArrowLeft size={24} />
                  <span>Back</span>
                </motion.button>
                
                {selectedProject.featured && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold"
                  >
                    <HiStar />
                    Featured
                  </motion.div>
                )}
                
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }} 
                  whileTap={{ scale: 0.9 }} 
                  onClick={() => setSelectedProject(null)} 
                  className="p-2 rounded-full hover:bg-red-500/10 text-red-500"
                >
                  <HiX size={24} />
                </motion.button>
              </div>

              <div className="relative h-80">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-display font-bold mb-4 bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-base">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-display font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
                    <HiCode className="text-primary-500" />
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.techStack.map((tech, ti) => (
                      <motion.div 
                        key={ti} 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ delay: ti * 0.05 }} 
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20"
                      >
                        {getTechIcon(tech)}
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-display font-semibold mb-3 text-gray-900 dark:text-white">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, fi) => (
                      <motion.li 
                        key={fi} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: fi * 0.05 }} 
                        className="flex items-start gap-2"
                      >
                        <span className="text-primary-500 mt-1 font-bold">✓</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <motion.a 
                    href={selectedProject.liveLink} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg shadow-primary-500/30"
                  >
                    <HiExternalLink size={20} />
                    View Live Demo
                  </motion.a>
                  <motion.a 
                    href={selectedProject.githubLink} 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-primary-500/50 font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <FaGithub size={20} />
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
