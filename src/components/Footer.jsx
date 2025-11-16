import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/harshraj677', label: 'GitHub', color: '#333' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/harsh-raj-697858228?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn', color: '#0077B5' },
    { icon: FaTwitter, href: 'https://twitter.com/harshraj', label: 'Twitter', color: '#1DA1F2' },
    { icon: FaInstagram, href: 'https://www.instagram.com/harshraj677?igsh=czUzZnY4NDVsaTV3', label: 'Instagram', color: '#E4405F' },
  ];

  const mernStack = [
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiExpress, name: 'Express', color: '#ffffff' },
    { icon: SiReact, name: 'React', color: '#61DAFB' },
    { icon: SiNodedotjs, name: 'Node.js', color: '#339933' },
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const contactInfo = [
    { icon: FaEnvelope, text: 'rajharsh7070@gmail.com', href: 'mailto:harshraj@example.com' },
    { icon: FaPhone, text: '+91 9835251540', href: 'tel:+911234567890' },
    { icon: FaMapMarkerAlt, text: 'India', href: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-dark-400 via-dark-500 to-black dark:from-dark-500 dark:via-dark-600 dark:to-black text-white overflow-hidden">
      {/* Animated Gradient Line */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
        animate={{ 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 100%' }}
      />
      
      {/* 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <motion.h3 
              className="text-4xl font-display font-bold mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-primary-400 bg-clip-text text-transparent">
                &lt;HarshRaj /&gt;
              </span>
            </motion.h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              MERN Stack Developer building modern web applications while learning AI, Machine Learning, and Deep Learning technologies.
            </p>

            {/* MERN Stack Icons 3D */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-gray-400">Tech Stack:</span>
              <div className="flex gap-3">
                {mernStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    whileHover={{ 
                      scale: 1.3, 
                      rotate: 360,
                      y: -10,
                    }}
                    className="relative group"
                  >
                    <div 
                      className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary-500/50 transition-all duration-300 shadow-lg"
                      style={{
                        boxShadow: `0 4px 20px ${tech.color}20`
                      }}
                    >
                      <tech.icon 
                        className="w-6 h-6" 
                        style={{ color: tech.color }}
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      <span className="px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs rounded-lg font-semibold shadow-xl">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.text}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, color: '#0ea5e9' }}
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-1.5 h-1.5 bg-primary-500 rounded-full"
                      whileHover={{ scale: 2 }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500"></span>
              Connect
            </h4>
            
            {/* Social Links 3D */}
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 360,
                    y: -5,
                  }}
                  className="relative group"
                  aria-label={social.label}
                >
                  <div 
                    className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-primary-500/50 transition-all duration-300"
                    style={{
                      boxShadow: `0 4px 15px ${social.color}20`
                    }}
                  >
                    <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  
                  {/* 3D Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10"
                    style={{
                      background: `radial-gradient(circle, ${social.color}40, transparent)`
                    }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Newsletter */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8"
            >
              <p className="text-sm text-gray-400 mb-3">Stay updated with my latest work</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-400 mb-1">
              © 2025 Harsh Raj | Crafted with 
              <span className="flex items-center gap-1">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaHeart className="text-red-500" />
                </motion.span>
                & MERN Stack
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Designed & Developed with passion | All Rights Reserved
            </p>
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full font-semibold text-sm hover:shadow-lg transition-all flex items-center gap-2 group"
          >
            <span>Back to Top</span>
            <motion.span
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* 3D Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center bottom'
        }} />
      </div>
    </footer>
  );
};

export default Footer;
