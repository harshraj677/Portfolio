import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export const AnimatedDock = ({ className, items }) => {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-white/10 dark:bg-gray-900/50 backdrop-blur-lg border border-primary-500/20 shadow-lg px-4 pb-3",
        className
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX}>
          <a
            href={item.link}
            target={item.target}
            className="grow flex items-center justify-center w-full h-full text-gray-700 dark:text-gray-300"
          >
            {item.Icon}
          </a>
        </DockItem>
      ))}
    </motion.div>
  )
}

export const DockItem = ({ mouseX, children }) => {
  const ref = useRef(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const iconScale = useTransform(width, [40, 80], [1, 1.5])
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white flex items-center justify-center shadow-lg"
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full grow"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
