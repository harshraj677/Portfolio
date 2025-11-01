import { useState, useEffect } from 'react'
import ThemeProvider from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-4">
            Harsh Raj Portfolio
          </h1>
          <p className="text-2xl text-white/90">
            Website is Loading Successfully! ✅
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
