"use client"

import { useState } from "react"

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope. A standard bathroom remodel takes 2–3 weeks. We provide a clear schedule during your initial consultation.",
  },
  {
    question: "Are your projects covered by a warranty or guarantee?",
    answer:
      "Yes. We stand behind our craftsmanship with a satisfaction guarantee, ensuring your complete peace of mind.",
  },
  {
    question: "Do you offer financing or payment plan options?",
    answer:
      "We provide flexible financing solutions to fit various budgets, making it easier to start your project sooner.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 160px) 0" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">

        <div className="mb-12">
          <p className="eyebrow mb-3">FAQ</p>
          <h2
            className="headline-stagger"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "#0d0f12" }}
          >
            COMMON
          </h2>
          <h2
            className="headline-stagger"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#0d0f12",
              marginLeft: "2ch",
            }}
          >
            QUESTIONS
          </h2>
        </div>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderTop: "1px solid #e3e1dd" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left"
                  style={{ padding: "22px 0" }}
                  aria-expanded={isOpen}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#0d0f12",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {faq.question}
                  </span>
                  {/* Plus / minus — thin stroke */}
                  <span
                    style={{
                      flexShrink: 0,
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      marginLeft: "1rem",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        width: "14px",
                        height: "1px",
                        backgroundColor: "#103a61",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        width: "1px",
                        height: "14px",
                        backgroundColor: "#103a61",
                        transition: "transform 0.25s",
                        transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                      }}
                    />
                  </span>
                </button>

                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? "300px" : "0",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "14px",
                      fontWeight: 400,
                      color: "#6b6b63",
                      lineHeight: 1.7,
                      paddingBottom: "22px",
                    }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
          <div style={{ height: "1px", backgroundColor: "#e3e1dd" }} />
        </div>

      </div>
    </section>
  )
}
