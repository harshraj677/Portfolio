import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiZoomIn, HiArrowLeft } from 'react-icons/hi';

const Achievements = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const achievements = [
    {
      id: 1,
      title: 'Anveasana Student Ambassador',
      year: '2024',
      description: 'Recognized as an official student ambassador for Anveasana platform',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=600&fit=crop',
      category: 'Leadership'
    },
    {
      id: 2,
      title: 'Hackathon Finalist',
      year: '2024',
      description: 'Secured top position in regional tech hackathon',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
      category: 'Competition'
    },
    {
      id: 3,
      title: 'AI & ML Workshop Certificate',
      year: '2023',
      description: 'Completed intensive AI and Machine Learning data science workshop',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
      category: 'Learning'
    },
    {
      id: 4,
      title: 'Best Project Award',
      year: '2024',
      description: 'Awarded for outstanding MERN stack project implementation',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
      category: 'Achievement'
    },
    {
      id: 5,
      title: 'Web Development Bootcamp',
      year: '2023',
      description: 'Successfully completed full-stack web development intensive course',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      category: 'Learning'
    },
    {
      id: 6,
      title: 'Community Contributor',
      year: '2024',
      description: 'Active open-source contributor with multiple merged PRs',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      category: 'Community'
    },
    {
      id: 7,
      title: 'Tech Talk Speaker',
      year: '2024',
      description: 'Delivered technical presentation on modern web development',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      category: 'Speaking'
    },
    {
      id: 8,
      title: 'Coding Competition Winner',
      year: '2023',
      description: 'First place in college-level coding competition',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop',
      category: 'Competition'
    },
    {
      id: 9,
      title: 'Innovation Challenge',
      year: '2024',
      description: 'Won innovation challenge with AI-powered solution',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
      category: 'Competition'
    },
    {
      id: 10,
      title: 'Full Stack Certification',
      year: '2023',
      description: 'Certified full-stack developer with honors',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      category: 'Learning'
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
          className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
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
                <div className={`relative ${randomHeight} w-full overflow-hidden rounded-3xl shadow-lg`}>
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay - Always visible like reference */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-primary-500/90 backdrop-blur-sm text-white text-xs rounded-full font-semibold shadow-lg">
                          {achievement.category}
                        </span>
                        <span className="text-white/95 text-xs font-bold">{achievement.year}</span>
                      </div>
                      <h3 className="text-white font-bold text-sm leading-tight mb-1 line-clamp-2 drop-shadow-lg">
                        {achievement.title}
                      </h3>
                      <p className="text-white/90 text-xs leading-snug line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {achievement.description}
                      </p>
                    </div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HiZoomIn className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  </div>

                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:to-accent-500/10 transition-all duration-300 pointer-events-none" />
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
            { number: '10+', label: 'Achievements', icon: '🏆' },
            { number: '8+', label: 'Certifications', icon: '📜' },
            { number: '5+', label: 'Competitions', icon: '🎯' },
            { number: '3+', label: 'Workshops', icon: '🎓' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-6 bg-white dark:bg-dark-400 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
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
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Back Button - Left side */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 left-0 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-105 group"
              >
                <HiArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
                <span className="text-white font-semibold text-sm">Back</span>
              </button>

              {/* Close Button - Right side */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-red-500/80 rounded-full transition-colors group"
                title="Close"
              >
                <HiX className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 rounded-b-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-4 py-1.5 bg-primary-500 text-white text-sm rounded-full font-semibold">
                    {selectedImage.category}
                  </span>
                  <span className="text-white font-semibold">{selectedImage.year}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-white/80">
                  {selectedImage.description}
                </p>
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
