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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  if (loading) {
    return <Preloader />
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
