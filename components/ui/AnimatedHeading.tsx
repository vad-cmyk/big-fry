"use client"
import { motion } from "framer-motion"

interface Props {
  text: string
  className?: string
  delay?: number
  tag?: "h1" | "h2" | "h3"
}

export default function AnimatedHeading({ text, className = "", delay = 0, tag: Tag = "h2" }: Props) {
  const words = text.split(" ")
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em] last:mr-0"
          initial={{ opacity: 0, y: 32, rotateX: -15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
