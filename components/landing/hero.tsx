"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Shield, Clock, Award, ArrowRight } from "lucide-react"

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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-40">
      {/* Background Image with slow cinematic zoom + scroll parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
          style={{
            backgroundImage: "url('/images/hero-bathroom.png')",
            transform: `translateY(${offsetY * 0.4}px) scale(1.1)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        {/* Animated accent glow */}
        <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 h-[50vh] w-[50vh] rounded-full bg-[rgba(0,175,255,0.25)] blur-[120px] animate-glow-pulse" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 container mx-auto px-4 text-center max-w-4xl"
        style={{
          transform: `translateY(${offsetY * 0.15}px)`,
          opacity: Math.max(1 - offsetY / 600, 0),
        }}
      >
        <h1
          className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance animate-hero-rise"
          style={{ animationDelay: "0.1s" }}
        >
          $24K Flat. New Bathroom. Vanity, Countertops & Custom Shower. Done.
        </h1>
        <p
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-hero-rise"
          style={{ animationDelay: "0.3s" }}
        >
          We handle everything from design to install — you just enjoy the result.
        </p>
        <div className="animate-hero-rise" style={{ animationDelay: "0.5s" }}>
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="group bg-[rgba(0,175,255,0.9)] hover:bg-[rgba(0,175,255,0.8)] text-primary-foreground text-xl px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Start Your Free Estimate
            <ArrowRight className="cta-arrow w-5 h-5 ml-1" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-8 md:mb-0 animate-hero-rise"
          style={{ animationDelay: "0.7s" }}
        >
          <div className="flex items-center gap-2 text-white/80">
            <Shield className="w-5 h-5 text-[#03aefc] animate-float" style={{ animationDelay: "0s" }} />
            <span className="font-medium text-white" style={{ fontSize: "18px" }}>Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-5 h-5 text-[#04aaf6] animate-float" style={{ animationDelay: "0.6s" }} />
            <span className="font-medium text-white" style={{ fontSize: "18px" }}>On-Time Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Award className="w-5 h-5 text-[#06aaf4] animate-float" style={{ animationDelay: "1.2s" }} />
            <span className="font-medium text-white" style={{ fontSize: "18px" }}>5-Star Rated</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ opacity: Math.max(1 - offsetY / 300, 0) }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/60">Scroll</span>
        <ChevronDown className="w-8 h-8 text-white/70 animate-bounce" />
      </div>
    </section>
  )
}
