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
    <div ref={ref} className="font-serif text-6xl md:text-7xl font-bold text-[#02affd]">
      {count}{suffix}
    </div>
  )
}

export function Stats() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <AnimatedCounter end={10} suffix="+" />
          <p className="text-lg text-muted-foreground mt-2 mb-10 font-bold">Years Experience</p>
          
          <p className="text-[#02abf8] font-semibold mb-2 text-xl">
            Choosing a contractor doesn&apos;t have to be stressful.
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            No more endless searching, hidden costs, or surprise delays.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Here&apos;s why homeowners trust us:
          </p>
          
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-[rgba(3,171,248,0.9)] hover:bg-[rgba(3,171,248,0.8)] text-primary-foreground px-8 py-6 text-lg font-semibold"
          >
            Claim Your Free Estimate
          </Button>
        </div>
      </div>
    </section>
  )
}
