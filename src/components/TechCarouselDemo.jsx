import { TechStackCarousel } from './TechStackCarousel'

// Demo component showing different configurations
const TechCarouselDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-dark-200 dark:to-dark-300">
      {/* Default Configuration */}
      <TechStackCarousel />

      {/* Custom Configuration Example 1: Minimalist */}
      <div className="mt-20">
        <TechStackCarousel 
          heading="Core Technologies"
          subheading="💼 Professional Stack"
          className="py-12"
        />
      </div>

      {/* Custom Configuration Example 2: Full Stack Focus */}
      <div className="mt-20">
        <TechStackCarousel 
          heading="Full-Stack Expertise"
          subheading="🎯 MERN Development"
          className="py-16"
        />
      </div>
    </div>
  )
}

export default TechCarouselDemo
