const testimonials = [
  {
    name: "Sarah M.",
    location: "Scottsdale, AZ",
    text: "CV Remodeling transformed our outdated bathroom into a stunning modern space. The team was professional, communicated every step, and finished on time. We couldn't be happier.",
  },
  {
    name: "Michael R.",
    location: "Phoenix, AZ",
    text: "After getting quotes from several contractors, we chose CV for their transparency and expertise. Our bathroom renovation exceeded expectations. Highly recommend.",
  },
  {
    name: "Jennifer L.",
    location: "Tempe, AZ",
    text: "The attention to detail was incredible. They helped us select the perfect materials within our budget and the craftsmanship is top-notch. A truly professional experience.",
  },
]

export function Testimonials() {
  return (
    <section
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 160px) 0" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">

        {/* Header */}
        <div className="mb-14">
          <p className="eyebrow mb-3">Client Reviews</p>
          <h2
            className="headline-stagger"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#0d0f12" }}
          >
            DON&apos;T JUST TAKE
          </h2>
          <h2
            className="headline-stagger"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#0d0f12",
              marginLeft: "2ch",
            }}
          >
            OUR WORD FOR IT
          </h2>
        </div>

        {/* Three columns with hairline vertical dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="flex flex-col py-8 md:py-0 md:px-8"
              style={{
                borderTop: "1px solid #e3e1dd",
                borderLeft: i > 0 ? "1px solid #e3e1dd" : undefined,
              }}
            >
              {/* Mobile: top border, Desktop: left border between cols */}
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "20px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#0d0f12",
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#0d0f12",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b6b63",
                    marginTop: "2px",
                  }}
                >
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
