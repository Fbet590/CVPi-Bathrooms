"use client"

import { useState } from "react"

const TABS = [
  {
    id: "bathroom",
    label: "Bathroom",
    features: [
      {
        index: "01",
        heading: "Full-Room Remodel",
        body:
          "We handle every surface — tile, fixtures, vanity, lighting — as one cohesive package. No subcontracting, no surprises.",
      },
      {
        index: "02",
        heading: "Quartz Countertops",
        body:
          "Premium quartz, fully installed. Durable, easy to maintain, and available in dozens of finishes.",
      },
      {
        index: "03",
        heading: "Soft-Close Cabinetry",
        body:
          "Custom-fit cabinets with soft-close hardware. All-inclusive at the $24K flat rate.",
      },
      {
        index: "04",
        heading: "Done in Weeks",
        body:
          "Our streamlined process typically completes a full bathroom in 2–3 weeks, not months.",
      },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    features: [
      {
        index: "01",
        heading: "Complete Kitchen Packages",
        body:
          "Cabinets, countertops, backsplash, and fixtures — all bundled at a transparent flat rate.",
      },
      {
        index: "02",
        heading: "Quartz & Stone Surfaces",
        body:
          "A full selection of countertop materials installed by our in-house crew.",
      },
      {
        index: "03",
        heading: "Custom Cabinetry",
        body:
          "Semi-custom and full-custom cabinet options, sized to your existing layout or redesigned entirely.",
      },
      {
        index: "04",
        heading: "Minimal Disruption",
        body:
          "Most kitchen remodels are completed in 3–4 weeks with a clean job site daily.",
      },
    ],
  },
]

export function Services() {
  const [activeTab, setActiveTab] = useState("bathroom")

  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const tab = TABS.find((t) => t.id === activeTab)!

  return (
    <section
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 160px) 0" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-3">Our Services</p>
            <h2
              className="headline-stagger"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", color: "#0d0f12" }}
            >
              EXPERT
            </h2>
            <h2
              className="headline-stagger"
              style={{
                fontSize: "clamp(36px, 5vw, 72px)",
                color: "#0d0f12",
                marginLeft: "2ch",
              }}
            >
              CRAFTSMANSHIP
            </h2>
          </div>
          <button
            onClick={scrollToForm}
            className="pill-ghost group self-start md:self-end"
            style={{ color: "#103a61", borderColor: "#103a61" }}
          >
            <span className="group-hover:text-white transition-colors" style={{ color: "#103a61" }}>
              Get a Free Quote
            </span>
            <span
              className="group-hover:text-white transition-colors"
              style={{ color: "#103a61", fontSize: "1.1em", lineHeight: 1 }}
            >
              →
            </span>
          </button>
        </div>

        {/* Tab row — plain text on a hairline rule */}
        <div
          style={{ borderBottom: "1px solid #e3e1dd", display: "flex", gap: "2rem", marginBottom: "3rem" }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: activeTab === t.id ? 700 : 400,
                color: activeTab === t.id ? "#0d0f12" : "#6b6b63",
                letterSpacing: "0.04em",
                paddingBottom: "12px",
                borderBottom: activeTab === t.id ? "2px solid #103a61" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.2s, border-color 0.2s",
                background: "none",
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Feature list — numbered, flat, no cards */}
        <div className="space-y-0">
          {tab.features.map((f, i) => (
            <div
              key={f.index}
              className="py-8"
              style={{
                borderTop: "1px solid #e3e1dd",
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: "0 1.5rem",
              }}
            >
              {/* Index */}
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#103a61",
                  letterSpacing: "0.08em",
                  paddingTop: "3px",
                }}
              >
                {f.index}
              </span>

              {/* Content */}
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0d0f12",
                    letterSpacing: "0.01em",
                    marginBottom: "6px",
                  }}
                >
                  {f.heading}
                </p>
                {/* Navy underline rule */}
                <div
                  style={{
                    height: "1px",
                    width: "32px",
                    backgroundColor: "#103a61",
                    marginBottom: "10px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "#6b6b63",
                    lineHeight: 1.6,
                  }}
                >
                  {f.body}
                </p>
              </div>
            </div>
          ))}
          <div style={{ height: "1px", backgroundColor: "#e3e1dd" }} />
        </div>

      </div>
    </section>
  )
}
