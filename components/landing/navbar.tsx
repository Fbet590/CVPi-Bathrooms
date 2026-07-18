"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToForm = () => {
    setMenuOpen(false)
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "#0d0f12" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="relative h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="CV Remodeling Logo"
              fill
              className="object-contain"
            />
          </div>

          {/* Hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white transition-opacity hover:opacity-70"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / full-screen menu drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-start justify-center px-10"
          style={{ backgroundColor: "#0d0f12" }}
        >
          <button
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-6 text-white/60 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="space-y-8">
            {["Kitchen", "Bathroom", "Projects", "Reviews", "FAQ"].map((label) => (
              <div key={label}>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/80 hover:text-white transition-colors"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(28px, 5vw, 48px)",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </button>
              </div>
            ))}
          </nav>
          <button
            onClick={scrollToForm}
            className="pill-ghost text-white mt-16"
          >
            <span className="text-white">Free Estimate</span>
            <span className="text-white/60 text-base leading-none">→</span>
          </button>
        </div>
      )}
    </header>
  )
}
