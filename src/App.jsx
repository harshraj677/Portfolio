import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import ThemeProvider from './context/ThemeContext'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Simulate loading time
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }, [])

  if (loading) {
    return <Preloader />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error Loading App</h1>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <CustomCursor />
        <Navbar />
        
        <main className="gradient-bg min-h-screen">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Experience />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
