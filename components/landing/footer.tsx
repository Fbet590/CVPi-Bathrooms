"use client"

const NAV_COLS = [
  {
    links: ["Kitchen", "Bathroom", "Projects"],
  },
  {
    links: ["Contact", "Free Estimate"],
  },
  {
    links: ["Reviews", "FAQ"],
  },
]

export function Footer() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer
      style={{
        backgroundColor: "#0d0f12",
        padding: "clamp(80px, 10vw, 160px) 0 0",
      }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">

        {/* Main row: giant headline left, nav columns right */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16 pb-20">

          {/* Closing headline — staggered indent */}
          <div className="flex-1">
            <h2
              className="headline-stagger text-white"
              style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
            >
              READY?
            </h2>
            <h2
              className="headline-stagger text-white"
              style={{ fontSize: "clamp(48px, 7vw, 100px)", marginLeft: "2ch" }}
            >
              LET&apos;S BUILD
            </h2>
            <h2
              className="headline-stagger text-white"
              style={{ fontSize: "clamp(48px, 7vw, 100px)" }}
            >
              YOUR BATHROOM.
            </h2>

            <button
              onClick={scrollToForm}
              className="pill-ghost group mt-10"
              style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.3)" }}
            >
              <span
                className="group-hover:text-[#0d0f12] transition-colors"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                Get a Free Quote
              </span>
              <span
                className="group-hover:text-[#0d0f12] transition-colors"
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1em", lineHeight: 1 }}
              >
                →
              </span>
            </button>
          </div>

          {/* Nav columns */}
          <div className="flex gap-12 flex-shrink-0">
            {NAV_COLS.map((col, ci) => (
              <div key={ci} className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <button
                    key={link}
                    onClick={link === "Free Estimate" ? scrollToForm : undefined}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.02em",
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >
                    {link}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            &copy; {new Date().getFullYear()} CV Remodeling & Outdoor Living. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            Licensed & Insured &middot; Phoenix, AZ
          </p>
        </div>

      </div>
    </footer>
  )
}
