"use client"

import { useEffect, useRef } from "react"

const FEATURES = [
  { label: "CABINETS", detail: "soft-close, all-inclusive" },
  { label: "COUNTERTOPS", detail: "quartz, fully installed" },
  { label: "FIXTURES", detail: "sink, faucet, hardware" },
  { label: "TIMELINE", detail: "done in weeks, not months" },
]

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const revealRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )
    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const addRevealRef = (el: HTMLDivElement | null, i: number) => {
    if (el) revealRefs.current[i] = el
  }

  return (
    <>
      {/* Hero — full viewport, ink dark grade over photo */}
      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Background photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/gallery-2.jpg')" }}
        />
        {/* Dark grade — heavier at bottom where text lives */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,15,18,0.45) 0%, rgba(13,15,18,0.55) 50%, rgba(13,15,18,0.82) 100%)",
          }}
        />
        {/* Warm light bloom — upper right only */}
        <div
          className="absolute"
          style={{
            top: "8%",
            right: "12%",
            width: "320px",
            height: "320px",
            background: "radial-gradient(circle, rgba(220,170,100,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Content — pinned lower-left */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 md:px-10 lg:px-16"
          style={{ paddingBottom: "clamp(48px, 8vw, 120px)" }}
        >
          {/* Headline — staggered two-line indent */}
          <div
            ref={(el) => addRevealRef(el as HTMLDivElement, 0)}
            className="reveal"
            style={{ transitionDelay: "0ms" }}
          >
            <h1
              className="headline-stagger text-white"
              style={{ fontSize: "clamp(64px, 11vw, 160px)", marginBottom: "0.1em" }}
            >
              $24K FLAT.
            </h1>
            <h1
              className="headline-stagger text-white"
              style={{
                fontSize: "clamp(64px, 11vw, 160px)",
                marginLeft: "2ch",
                marginBottom: "clamp(24px, 3vw, 48px)",
              }}
            >
              NEW BATHROOM.
            </h1>
          </div>

          {/* Ghost pill CTA */}
          <div
            ref={(el) => addRevealRef(el as HTMLDivElement, 1)}
            className="reveal"
            style={{ transitionDelay: "80ms", marginBottom: "clamp(40px, 6vw, 80px)" }}
          >
            <button
              onClick={scrollToForm}
              className="pill-ghost text-white group"
            >
              <span className="text-white group-hover:text-[#0d0f12] transition-colors">
                Start Your Free Estimate
              </span>
              <span
                className="text-white/60 group-hover:text-[#0d0f12] transition-colors"
                style={{ fontSize: "1.1em", lineHeight: 1 }}
              >
                →
              </span>
            </button>
          </div>

          {/* Inline feature callouts */}
          <div
            ref={(el) => addRevealRef(el as HTMLDivElement, 2)}
            className="reveal"
            style={{ transitionDelay: "160ms" }}
          >
            <div
              className="flex flex-wrap gap-x-8 gap-y-6"
            >
              {FEATURES.map((f) => (
                <div key={f.label} className="flex flex-col" style={{ minWidth: "120px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#ffffff",
                    }}
                  >
                    {f.label}
                  </span>
                  {/* thin underline rule */}
                  <span
                    style={{
                      display: "block",
                      height: "1px",
                      backgroundColor: "rgba(255,255,255,0.35)",
                      margin: "4px 0 6px",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10px",
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      color: "rgba(255,255,255,0.65)",
                      textTransform: "lowercase",
                    }}
                  >
                    {f.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badge bar — thin hairline strip below hero */}
      <div
        style={{
          backgroundColor: "#0d0f12",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-center gap-8 py-4">
            {[
              "Licensed & Insured",
              "On-Time Guarantee",
              "5-Star Rated",
            ].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
