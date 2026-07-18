"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Shield, Clock, Award, ArrowRight, Star } from "lucide-react"

const HEADLINE_WORDS = ["$24K", "Flat.", "New", "Bathroom.", "Done."]

const TRUST_ITEMS = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Clock, label: "On-Time Guarantee" },
  { icon: Award, label: "5-Star Rated" },
  { icon: Star, label: "100+ Happy Homeowners" },
]

export function Hero() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[75vh] md:min-h-[92vh] flex flex-col justify-end overflow-hidden">
      {/* Background Image with slow cinematic zoom + scroll parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
          style={{
            backgroundImage: "url('/images/hero-bathroom.png')",
            transform: `translateY(${offsetY * 0.4}px) scale(1.1)`,
          }}
        />
        {/* Darker on the left where the text lives, lighter on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        {/* Animated accent glow, upper-right */}
        <div className="pointer-events-none absolute -top-1/4 right-0 h-[55vh] w-[55vh] rounded-full bg-[rgba(0,175,255,0.22)] blur-[130px] animate-glow-pulse" />
      </div>

      {/* Content — pinned lower-left, left aligned (Koenigsegg style) */}
      <div
        className="relative z-10 container mx-auto px-6 md:px-10 pt-[111px] md:pt-0 pb-[226px] md:pb-32"
        style={{
          transform: `translateY(${offsetY * 0.12}px)`,
          opacity: Math.max(1 - offsetY / 650, 0),
        }}
      >
        <div className="flex gap-4 md:gap-7 max-w-3xl">
          {/* Vertical accent rail */}
          <div className="relative shrink-0 pt-2">
            <div className="animate-rail h-full w-[3px] bg-gradient-to-b from-[rgba(0,175,255,1)] to-[rgba(0,175,255,0.1)]" />
          </div>

          <div className="min-w-0">
            {/* Eyebrow */}
            <p
              className="animate-hero-rise mb-4 text-[14px] md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#3ec3ff] text-pretty"
              style={{ animationDelay: "0.05s" }}
            >
              Bathroom Remodeling — Done Right
            </p>

            {/* Headline — word-by-word rise */}
            <h1 className="font-[family-name:var(--font-poppins)] text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 text-balance break-words">
              {HEADLINE_WORDS.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em]">
                  <span
                    className="animate-word-rise"
                    style={{ animationDelay: `${0.15 + i * 0.12}s`, fontSize: "48px" }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="animate-hero-rise md:text-2xl mb-8 max-w-xl leading-relaxed text-pretty text-white font-bold"
              style={{ animationDelay: `${0.15 + HEADLINE_WORDS.length * 0.12 + 0.1}s`, fontSize: "20px" }}
            >
              - Vanity<br />
              - Countertops<br />
              - Custom Shower<br />
              <br />
              We handle everything from design to install — you just enjoy the result.
            </p>

            <div
              className="animate-hero-rise"
              style={{ animationDelay: `${0.15 + HEADLINE_WORDS.length * 0.12 + 0.25}s` }}
            >
              <Button
                size="lg"
                onClick={scrollToForm}
                className="group w-full sm:w-auto bg-[rgba(0,175,255,0.95)] hover:bg-[rgba(0,175,255,0.85)] text-primary-foreground text-base md:text-lg px-6 md:px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Free Estimate
                <ArrowRight className="cta-arrow w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee trust ticker along the bottom */}
      <div
        className="marquee-track relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden"
        style={{ opacity: Math.max(1 - offsetY / 500, 0) }}
      >
        <div className="flex w-max animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {TRUST_ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-2.5 px-8 py-4">
                    <Icon className="w-5 h-5 text-[#3ec3ff]" />
                    <span className="whitespace-nowrap font-medium text-white/90 text-base">
                      {item.label}
                    </span>
                    <span className="ml-8 text-white/20">/</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}
