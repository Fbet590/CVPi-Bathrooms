"use client"

import Image from "next/image"
import { useState } from "react"

const PAIRS = [
  {
    images: [
      {
        src: "/images/gallery-1.jpg",
        alt: "Modern kitchen renovation with white cabinets and marble countertops",
        title: "Modern Kitchen Remodel",
        city: "Scottsdale, AZ",
      },
      {
        src: "/images/gallery-2.jpg",
        alt: "Luxurious bathroom remodel with walk-in shower",
        title: "Luxury Walk-In Shower",
        city: "Phoenix, AZ",
      },
    ],
  },
  {
    images: [
      {
        src: "/images/gallery-3.jpg",
        alt: "Custom kitchen island with pendant lighting",
        title: "Custom Kitchen Island",
        city: "Tempe, AZ",
      },
      {
        src: "/images/gallery-4.jpg",
        alt: "Elegant master bathroom with soaking tub",
        title: "Master Bath Retreat",
        city: "Mesa, AZ",
      },
    ],
  },
  {
    images: [
      {
        src: "/images/gallery-5.jpg",
        alt: "Contemporary kitchen with stainless steel appliances",
        title: "Contemporary Kitchen",
        city: "Gilbert, AZ",
      },
      {
        src: "/images/gallery-6.jpg",
        alt: "Spa-inspired bathroom renovation",
        title: "Spa-Inspired Bathroom",
        city: "Chandler, AZ",
      },
    ],
  },
]

export function Gallery() {
  const [pairIndex, setPairIndex] = useState(0)
  const total = PAIRS.length
  const pair = PAIRS[pairIndex]

  const goPrev = () => setPairIndex((i) => (i === 0 ? total - 1 : i - 1))
  const goNext = () => setPairIndex((i) => (i === total - 1 ? 0 : i + 1))

  return (
    <section
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 160px) 0" }}
    >
      {/* Section header */}
      <div className="container mx-auto px-6 md:px-10 max-w-6xl mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Recent Projects</p>
            <h2
              className="headline-stagger"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#0d0f12" }}
            >
              OUR RECENT
            </h2>
            <h2
              className="headline-stagger"
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "#0d0f12",
                marginLeft: "2ch",
              }}
            >
              WORK
            </h2>
          </div>
        </div>
      </div>

      {/* Full-bleed image pair */}
      <div className="w-full grid grid-cols-2" style={{ aspectRatio: "2 / 1" }}>
        {pair.images.map((img) => (
          <div key={img.src} className="relative overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
        ))}
      </div>

      {/* Caption + navigation row */}
      <div className="container mx-auto px-6 md:px-10 max-w-6xl mt-6">
        <div className="flex items-start justify-between gap-4">

          {/* Counter + captions */}
          <div>
            {/* Counter */}
            <div className="flex items-center gap-2 mb-3">
              {/* Hairline tick */}
              <div style={{ width: "24px", height: "1px", backgroundColor: "#0d0f12" }} />
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  color: "#0d0f12",
                }}
              >
                {String(pairIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            {/* Project names */}
            <div className="flex gap-8">
              {pair.images.map((img) => (
                <div key={img.src}>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0d0f12",
                    }}
                  >
                    {img.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#6b6b63",
                      marginTop: "2px",
                    }}
                  >
                    {img.city}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next pill buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={goPrev}
              aria-label="Previous projects"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                border: "1px solid #e3e1dd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: "#0d0f12",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#103a61"
                e.currentTarget.style.color = "#103a61"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e3e1dd"
                e.currentTarget.style.color = "#0d0f12"
              }}
            >
              ←
            </button>
            <button
              onClick={goNext}
              aria-label="Next projects"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                border: "1px solid #e3e1dd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                cursor: "pointer",
                fontSize: "16px",
                color: "#0d0f12",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#103a61"
                e.currentTarget.style.color = "#103a61"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e3e1dd"
                e.currentTarget.style.color = "#0d0f12"
              }}
            >
              →
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
