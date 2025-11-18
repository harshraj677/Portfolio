import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from 'react-icons/hi'
import { EMAILJS_CONFIG } from '../config'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init(EMAILJS_CONFIG.publicKey)
      console.log('EmailJS initialized successfully')
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error)
    }
  }, [])

  const contactInfo = [
    {
      icon: HiMail,
      title: 'Email',
      value: 'rajharsh7070@gmail.com',
      link: 'mailto:rajharsh7070@gmail.com'
    },
    {
      icon: HiLocationMarker,
      title: 'Location',
      value: 'India',
      link: null
    },
    {
      icon: HiPhone,
      title: 'Connect',
      value: 'LinkedIn | GitHub',
      link: null
    }
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      })
      setLoading(false)
      return
    }

    try {
      console.log('Sending email with config:', {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
        publicKey: EMAILJS_CONFIG.publicKey ? 'Present' : 'Missing'
      })

      console.log('Form data being sent:', {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message
      })

      // Send email using EmailJS - method 1
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Harsh Raj',
          reply_to: formData.email,
          to_email: 'rajharsh7070@gmail.com'
        }
      )

      console.log('EmailJS Response:', response)

      if (response.status === 200) {
        setStatus({
          type: 'success',
          message: '✅ Message sent successfully! I\'ll get back to you soon.'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('EmailJS Error Details:', error)
      
      let errorMessage = 'Failed to send message. '
      
      if (error.text) {
        errorMessage += error.text
      } else if (error.message) {
        errorMessage += error.message
      } else if (error.status === 400) {
        errorMessage += 'Invalid request. Please check your EmailJS configuration.'
      } else if (error.status === 401) {
        errorMessage += 'Authentication failed. Please verify your EmailJS public key.'
      } else if (error.status === 404) {
        errorMessage += 'Service or template not found. Please check your EmailJS IDs.'
      } else {
        errorMessage += 'Unknown error occurred.'
      }
      
      errorMessage += ' Please try again or email me directly at rajharsh7070@gmail.com'
      
      setStatus({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setLoading(false)
      setTimeout(() => setStatus({ type: '', message: '' }), 8000)
    }
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Let's Talk About Your Project
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-5 glass-effect rounded-2xl hover:shadow-lg transition-all"
                >
                  <div className="p-3 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                      {info.title}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Element */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full h-64 mt-8 rounded-3xl overflow-hidden glass-effect-dark"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-white text-lg font-semibold">Let's Connect</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="glass-effect p-8 rounded-3xl shadow-xl">
              {/* Name Input */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-dark-400 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-800 dark:text-white"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Your Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-dark-400 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-gray-800 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Input */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                >
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white dark:bg-dark-400 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none text-gray-800 dark:text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl flex items-center gap-2 ${
                    status.type === 'success'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  }`}
                >
                  {status.type === 'success' && <HiCheckCircle className="w-5 h-5" />}
                  <span>{status.message}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full btn-primary ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              {/* Alternative Contact Method */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Or email directly at{' '}
                  <a
                    href="mailto:rajharsh7070@gmail.com"
                    className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                  >
                    rajharsh7070@gmail.com
                  </a>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl -z-10" />
    </section>
  )
}

export default Contact
