"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

type Direction = "up" | "left" | "right" | "none"

interface RevealProps {
  children: ReactNode
  /** delay in ms before the reveal animation starts */
  delay?: number
  /** direction the element travels from */
  direction?: Direction
  className?: string
  /** render as a different element if needed */
  as?: "div" | "section" | "li"
}

const offsets: Record<Direction, string> = {
  up: "translateY(32px)",
  left: "translateX(-32px)",
  right: "translateX(32px)",
  none: "translateY(0)",
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who prefer reduced motion — show immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0, 0)" : offsets[direction],
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  )
}
