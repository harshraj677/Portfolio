import AutoScroll from "embla-carousel-auto-scroll"
import { motion } from "framer-motion"
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiGithub,
  SiVite,
  SiRedux,
  SiFirebase,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPostman,
  SiFigma,
} from "react-icons/si"
import { FaJava } from "react-icons/fa"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

const TechStackCarousel = ({
  heading = "Technologies I Work With",
  subheading = "Full-Stack MERN Specialist",
  className = "",
}) => {
  const technologies = [
    {
      id: "react",
      name: "React",
      Icon: SiReact,
      color: "#61DAFB",
      category: "Frontend",
    },
    {
      id: "nodejs",
      name: "Node.js",
      Icon: SiNodedotjs,
      color: "#339933",
      category: "Backend",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      Icon: SiMongodb,
      color: "#47A248",
      category: "Database",
    },
    {
      id: "express",
      name: "Express",
      Icon: SiExpress,
      color: "#ffffff",
      category: "Backend",
    },
    {
      id: "javascript",
      name: "JavaScript",
      Icon: SiJavascript,
      color: "#F7DF1E",
      category: "Frontend",
    },
    {
      id: "typescript",
      name: "TypeScript",
      Icon: SiTypescript,
      color: "#3178C6",
      category: "Frontend",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      Icon: SiTailwindcss,
      color: "#06B6D4",
      category: "Frontend",
    },
    {
      id: "git",
      name: "Git",
      Icon: SiGit,
      color: "#F05032",
      category: "Tools",
    },
    {
      id: "github",
      name: "GitHub",
      Icon: SiGithub,
      color: "#181717",
      category: "Tools",
    },
    {
      id: "vite",
      name: "Vite",
      Icon: SiVite,
      color: "#646CFF",
      category: "Tools",
    },
    {
      id: "redux",
      name: "Redux",
      Icon: SiRedux,
      color: "#764ABC",
      category: "Frontend",
    },
    {
      id: "firebase",
      name: "Firebase",
      Icon: SiFirebase,
      color: "#FFCA28",
      category: "Database",
    },
    {
      id: "java",
      name: "Java",
      Icon: FaJava,
      color: "#007396",
      category: "Backend",
    },
    {
      id: "html5",
      name: "HTML5",
      Icon: SiHtml5,
      color: "#E34F26",
      category: "Frontend",
    },
    {
      id: "css3",
      name: "CSS3",
      Icon: SiCss3,
      color: "#1572B6",
      category: "Frontend",
    },
    {
      id: "postman",
      name: "Postman",
      Icon: SiPostman,
      color: "#FF6C37",
      category: "Tools",
    },
    {
      id: "figma",
      name: "Figma",
      Icon: SiFigma,
      color: "#F24E1E",
      category: "Tools",
    },
  ]

  return (
    <section className={`py-16 relative overflow-hidden ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-50/30 to-transparent dark:via-cyan-950/10" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-block mb-3"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              {subheading}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent mb-3">
            {heading}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Modern tools and frameworks I use to build scalable web applications
          </p>
        </motion.div>

        {/* Animated Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative mx-auto flex items-center justify-center max-w-6xl">
            <Carousel
              opts={{ loop: true, align: "start" }}
              plugins={[
                AutoScroll({
                  playOnInit: true,
                  speed: 1,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent className="ml-0">
                {technologies.map((tech) => (
                  <CarouselItem
                    key={tech.id}
                    className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="mx-6 flex shrink-0 items-center justify-center group"
                    >
                      <div className="relative p-6 rounded-2xl bg-white dark:bg-dark-400 border-2 border-gray-100 dark:border-gray-800 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20">
                        {/* Glow Effect */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                          style={{
                            background: `radial-gradient(circle at center, ${tech.color}30, transparent 70%)`,
                          }}
                        />
                        
                        {/* Icon */}
                        <div className="relative">
                          <tech.Icon
                            className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
                            style={{ color: tech.color }}
                          />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          <div className="px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-lg shadow-lg">
                            {tech.name}
                            <span className="block text-[10px] opacity-75 mt-0.5">
                              {tech.category}
                            </span>
                          </div>
                        </div>

                        {/* Corner Accent */}
                        <div
                          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                          style={{ backgroundColor: tech.color }}
                        />
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Gradient Fades */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-dark-200 to-transparent pointer-events-none z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-dark-200 to-transparent pointer-events-none z-10"></div>
          </div>
        </motion.div>

        {/* Category Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {["Frontend", "Backend", "Database", "Tools"].map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {category}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { TechStackCarousel }
