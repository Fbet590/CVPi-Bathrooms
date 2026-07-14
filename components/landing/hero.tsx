"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Shield, Clock, Award } from "lucide-react"

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-40">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-kitchen.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <h1 className="font-[family-name:var(--font-poppins)] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
          $15K Flat. New Kitchen. Cabinets, Countertops & Appliances Included. Done.
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          We handle everything from design to install — you just enjoy the result.
        </p>
        <Button 
          size="lg" 
          onClick={scrollToForm}
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-8 py-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          Start Your Free Estimate
        </Button>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-8 md:mb-0">
          <div className="flex items-center gap-2 text-white/80">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Licensed & Insured</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">On-Time Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">5-Star Rated</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  )
}
