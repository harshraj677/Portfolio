import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiZoomIn, HiArrowLeft } from 'react-icons/hi';

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const achievements = [
    {
      id: 1,
      title: 'Anveasana Campus Ambassador',
      year: '2025',
      description: 'Recognized as an official campus ambassador for Anvesana Innovation & Entrepreneurial Forum',
      image: '/port photo/workshop.jpeg',
      category: 'Leadership'
    },
    {
      id: 2,
      title: 'Hackathon Finalist',
      year: '2024',
      description: 'Secured top position in regional tech hackathon',
      image: '/port photo/Foss Hackthon.jpeg',
      category: 'Competition'
    },
    {
      id: 3,
      title: 'Google Cloud Agentic AI Day Certificate',
      year: '2025',
      description: 'Participated in Google Cloud Agentic AI Day, exploring next-gen AI innovations.',
      image: '/port photo/Agentic AI day certificate (1).jpeg',
      category: 'Participated'
    },
    {
      id: 4,
      title: 'Best Project Award',
      year: '2024',
      description: 'Our project was shortlisted in top five out of fifty teams',
      image: '/port photo/foss.jpeg',
      category: 'Presentation'
    },
    {
      id: 5,
      title: 'HANDS-ON WORKSHOP ON RAG MODEL',
      year: '2025',
      description: 'Participated in a hands-on RAG model workshop enhancing AI skills.',
      image: '/port photo/Rag workshop.jpeg',
      category: 'Learning'
    },
    {
      id: 6,
      title: 'Hackathon',
      year: '2025',
      description: 'Selected as a top 40 finalist team in Monaithon Hackathon 2025.',
      image: '/port photo/Monaithon Hackthon (2).jpeg',
      category: 'Participated'
    },
    {
      id: 7,
      title: 'Leadership Talk ',
      year: '2025',
      description: 'Was part of a leadership session with Zoho Global HeadKuppulakshmi Krishnamoorthy ',
      image: '/port photo/Leadership Talk.jpeg',
      category: 'Learning    '
    },
    {
      id: 8,
      title: 'Advaya Hackathon',
      year: '2025',
      description: 'Represented college nationally by participating in the Advaya Pan-India Hackathon',
      image: '/port photo/Advaya  Hackathon.jpeg',
      category: 'Participated'
    },
    {
      id: 9,
      title: 'Presentation',
      year: '2024',
      description: 'Earned the opportunity to showcase my project in a college presentation.',
      image: '/port photo/presentation.jpeg',
      category: 'Presenting'
    },
    {
      id: 10,
      title: 'Project Exhibition Certification',
      year: '2024',
      description: 'Earned first prize at the college project exhibition for exceptional performance.',
      image: '/port photo/Project Exhibition certificate.jpeg',
      category: 'Achievement'
    }
  ];

  return (
    <section id="achievements" className="py-20 relative overflow-hidden bg-gray-50 dark:bg-dark-300">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Achievements & Certifications</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my journey, recognition, and continuous learning
          </p>
        </motion.div>

        {/* Dome Gallery - Organic Masonry Layout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
        >
          {achievements.map((achievement, index) => {
            // Vary heights for organic look like the reference image
            const heights = ['h-40', 'h-48', 'h-56', 'h-64', 'h-72', 'h-80', 'h-56', 'h-64', 'h-48', 'h-60'];
            const randomHeight = heights[index % heights.length];
            
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.03, zIndex: 20 }}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(achievement)}
              >
                <div className={`relative ${randomHeight} w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg`}>
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Minimal Overlay - Only badge and year visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 sm:px-2.5 py-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 backdrop-blur-sm text-white text-xs rounded-full font-semibold shadow-lg">
                          {achievement.category}
                        </span>
                        <span className="text-white/95 text-xs font-bold">{achievement.year}</span>
                      </div>
                      {/* Title only shows on hover */}
                      <h3 className="text-white font-bold text-sm sm:text-base leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                        {achievement.title}
                      </h3>
                    </div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HiZoomIn className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: '2+', label: 'Achievements', icon: '🏆' },
            { number: '8+', label: 'Certifications', icon: '📜' },
            { number: '3+', label: 'Hackathons', icon: '🎯' },
            { number: '3+', label: 'Workshops', icon: '🎓' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-white dark:bg-dark-400 rounded-2xl shadow-lg hover:shadow-cyan-500/20 border border-cyan-500/20 transition-all"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Back and Close buttons */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                {/* Back Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-105 group backdrop-blur-md"
                >
                  <HiArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                  <span className="text-white font-semibold text-sm sm:text-base">Back</span>
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Open in New Tab Button */}
                  <a
                    href={selectedImage.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-full transition-all hover:scale-105 group backdrop-blur-md"
                    title="Open in new tab"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-white font-semibold text-sm sm:text-base hidden sm:inline">Open</span>
                  </a>

                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 sm:p-2.5 bg-white/10 hover:bg-red-500/80 rounded-full transition-colors group backdrop-blur-md"
                    title="Close"
                  >
                    <HiX className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div 
                className="relative flex-1 overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl cursor-pointer group/image"
                onClick={() => window.open(selectedImage.image, '_blank')}
                title="Click to open in new tab"
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain bg-black/50 group-hover/image:scale-105 transition-transform duration-300"
                />

                {/* Click hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/20">
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full flex items-center gap-2">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="text-white font-semibold text-sm">Click to open</span>
                  </div>
                </div>

                {/* Info Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 sm:p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs sm:text-sm rounded-full font-semibold shadow-lg">
                      {selectedImage.category}
                    </span>
                    <span className="text-white font-semibold text-sm sm:text-base">{selectedImage.year}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-3xl">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
};

export default Achievements;
