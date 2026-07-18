"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-border transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`relative transition-all duration-300 ${
                scrolled ? "h-[46px] w-[46px] md:h-[52px] md:w-[52px]" : "h-[54px] w-[54px] md:h-[62px] md:w-[62px]"
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="CV Remodeling & Outdoor Living Logo"
                fill
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
              />
            </div>
          </div>
          
          <Button 
            onClick={scrollToForm}
            className="group bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Free Estimate
            <ArrowRight className="cta-arrow w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  )
}
