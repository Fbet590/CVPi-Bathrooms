"use client"

import { useEffect, useRef, useState } from "react"

interface StatRow {
  value: number
  suffix: string
  unit: string
  label: string
}

const STATS: StatRow[] = [
  { value: 10, suffix: "+", unit: "YEARS", label: "Experience" },
  { value: 500, suffix: "+", unit: "PROJECTS", label: "Completed in Phoenix" },
  { value: 100, suffix: "%", unit: "LICENSED", label: "& Insured" },
  { value: 5.0, suffix: "", unit: "RATING", label: "Average client rating" },
]

function Counter({ end, suffix, decimals = 0 }: { end: number; suffix: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true
          const duration = 1600
          const steps = 60
          const increment = end / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(parseFloat(current.toFixed(decimals)))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, decimals])

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  )
}

export function Stats() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const revealRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.1 }
    )
    if (revealRef.current) observer.observe(revealRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 160px) 0" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">

        {/* Header row: eyebrow right / headline left */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <h2
              className="headline-stagger"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                color: "#0d0f12",
              }}
            >
              PROVEN
            </h2>
            <h2
              className="headline-stagger"
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                marginLeft: "2ch",
                color: "#0d0f12",
              }}
            >
              RESULTS
            </h2>
          </div>
          <p
            className="eyebrow md:text-right"
            style={{ marginBottom: "0.5rem" }}
          >
            Why homeowners<br />trust us
          </p>
        </div>

        {/* Stats grid */}
        <div ref={revealRef} className="reveal">
          {STATS.map((stat, i) => (
            <div key={stat.unit}>
              {/* Row */}
              <div
                className="flex items-baseline gap-4 py-8"
                style={{ borderTop: "1px solid #e3e1dd" }}
              >
                {/* Giant numeral */}
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(56px, 7vw, 96px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: "#0d0f12",
                    minWidth: "clamp(120px, 14vw, 200px)",
                  }}
                >
                  <Counter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                  />
                </div>

                {/* Unit tag */}
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#103a61",
                    alignSelf: "flex-start",
                    marginTop: "0.6rem",
                    minWidth: "80px",
                  }}
                >
                  {stat.unit}
                </span>

                {/* Label */}
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#6b6b63",
                    letterSpacing: "0.01em",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
          {/* Bottom rule */}
          <div style={{ height: "1px", backgroundColor: "#e3e1dd" }} />
        </div>

        {/* CTA — bottom right */}
        <div className="flex justify-end mt-10">
          <button
            onClick={scrollToForm}
            className="pill-ghost group"
            style={{ color: "#103a61", borderColor: "#103a61" }}
          >
            <span
              className="group-hover:text-white transition-colors"
              style={{ color: "#103a61" }}
            >
              Claim Your Free Estimate
            </span>
            <span
              className="group-hover:text-white transition-colors"
              style={{ color: "#103a61", fontSize: "1.1em", lineHeight: 1 }}
            >
              →
            </span>
          </button>
        </div>

      </div>
    </section>
  )
}
