"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          let start = 0
          const duration = 2000
          const increment = end / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="text-6xl md:text-7xl font-bold text-[#02affd]" style={{ fontFamily: '"Manrope", sans-serif' }}>
      {count}{suffix}
    </div>
  )
}

export function Stats() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-background" style={{ paddingTop: "64px", paddingBottom: "0" }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <AnimatedCounter end={10} suffix="+" />
          <p className="text-lg text-muted-foreground mt-2 mb-10 font-bold">Years Experience</p>
          
          <p className="text-[#02abf8] font-bold mb-2" style={{ fontFamily: '"Manrope", sans-serif', fontSize: "24px" }}>
            Choosing a contractor doesn&apos;t have to be stressful.
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance" style={{ fontFamily: '"Manrope", sans-serif' }}>
            No more endless searching, hidden costs, or surprise delays.
          </h2>
        </div>
      </div>
    </section>
  )
}
