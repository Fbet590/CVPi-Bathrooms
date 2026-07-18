"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "Enter your name:",
    type: "text",
    placeholder: "Your full name"
  },
  {
    title: "What's your email address?",
    type: "email",
    placeholder: "you@example.com"
  },
  {
    title: "What's the best mobile number to reach you on?",
    type: "tel",
    placeholder: "(555) 123-4567"
  }
]

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters and check if we have at least 10 digits
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 10
}

const formatPhone = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, '')
  if (digitsOnly.length <= 3) return digitsOnly
  if (digitsOnly.length <= 6) return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`
  return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`
}

export function QuoteForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<number, string>>({})

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleOptionSelect = (option: string) => {
    if (step.type === "multi") {
      const current = (answers[currentStep] as string[]) || []
      if (current.includes(option)) {
        setAnswers({ ...answers, [currentStep]: current.filter(o => o !== option) })
      } else {
        setAnswers({ ...answers, [currentStep]: [...current, option] })
      }
    } else {
      setAnswers({ ...answers, [currentStep]: option })
    }
  }

  const handleInputChange = (value: string) => {
    // Format phone number as user types
    if (step.type === "tel") {
      const formatted = formatPhone(value)
      setAnswers({ ...answers, [currentStep]: formatted })
    } else {
      setAnswers({ ...answers, [currentStep]: value })
    }
    // Clear error when user starts typing
    if (errors[currentStep]) {
      setErrors({ ...errors, [currentStep]: "" })
    }
  }

  const canProceed = () => {
    const answer = answers[currentStep]
    if (step.type === "multi") {
      return Array.isArray(answer) && answer.length > 0
    }
    if (step.type === "email") {
      return !!answer && typeof answer === "string" && validateEmail(answer)
    }
    if (step.type === "tel") {
      return !!answer && typeof answer === "string" && validatePhone(answer)
    }
    return !!answer && (typeof answer === "string" ? answer.length > 0 : true)
  }

  const goNext = () => {
    const answer = answers[currentStep] as string
    
    // Validate email
    if (step.type === "email" && answer && !validateEmail(answer)) {
      setErrors({ ...errors, [currentStep]: "Please enter a valid email address" })
      return
    }
    
    // Validate phone
    if (step.type === "tel" && answer && !validatePhone(answer)) {
      setErrors({ ...errors, [currentStep]: "Please enter a valid 10-digit phone number" })
      return
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Generate unique event_id for Facebook deduplication
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    
    // Prepare form data for webhook
    const formData = {
      name: answers[0],
      email: answers[1],
      phone: answers[2],
      submitted_at: new Date().toISOString(),
      event_id: eventId
    }

    // Send data to server-side API route which forwards to webhook
    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.error('Webhook error:', error)
    }

    // Fire Facebook Pixel Lead conversion event with event_id for deduplication
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {}, { eventID: eventId })
    }
    
    // Redirect to thank you page
    router.push('/thank-you')
  }

  

  const navyAccent = "#103a61"

  return (
    <section id="quote-form" className="relative -mt-32 z-20 pb-24 bg-muted pt-4">
      <div className="container mx-auto px-4 max-w-xl">

        {/* Panel */}
        <div
          className="bg-[#fafaf8]"
          style={{ borderTop: `1px solid ${navyAccent}`, borderBottom: `1px solid ${navyAccent}` }}
        >

          {/* Headline band */}
          <div className="px-8 md:px-12 text-center" style={{ paddingTop: "9px", paddingBottom: "26px" }}>
            <h2
              className="font-serif text-balance leading-snug"
              style={{
                color: navyAccent,
                letterSpacing: "0.06em",
                fontFamily: "var(--font-cormorant, Georgia, serif)",
                fontSize: "48px",
                fontWeight: "800",
              }}
            >
              The Bathroom Package
            </h2>
            <p
              className="mt-3 leading-relaxed"
              style={{
                color: "#4b4b47",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-poppins, sans-serif)",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Answer our quick form&nbsp;&mdash;&nbsp;no obligation, less than 60&nbsp;seconds.
            </p>
          </div>

          {/* Hairline */}
          <div style={{ height: "1px", backgroundColor: navyAccent, opacity: 0.18 }} />

          {/* Features card */}
          <div className="px-8 md:px-12" style={{ paddingTop: "25px", paddingBottom: "12px" }}>
            <p
              className="uppercase tracking-[0.22em] mb-4"
              style={{
                color: "#54544e",
                fontFamily: "var(--font-poppins, sans-serif)",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              What&apos;s Included
            </p>
            <ul style={{ fontSize: "24px" }}>
              <li className="flex items-start gap-3" style={{ marginBottom: "12px" }}>
                <Check
                  className="flex-shrink-0"
                  style={{ color: navyAccent, width: "30px", height: "30px", marginTop: "2px" }}
                  strokeWidth={2.5}
                />
                <span
                  className="leading-relaxed"
                  style={{
                    color: "#4a4a42",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    letterSpacing: "0.02em",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  $24K all-in flat rate
                </span>
              </li>
              <li className="flex items-start gap-3" style={{ marginBottom: "12px" }}>
                <Check
                  className="flex-shrink-0"
                  style={{ color: navyAccent, width: "30px", height: "30px", marginTop: "2px" }}
                  strokeWidth={2.5}
                />
                <span
                  className="leading-relaxed"
                  style={{
                    color: "#4a4a42",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    letterSpacing: "0.02em",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  Cabinets, countertops & fixtures
                </span>
              </li>
              <li className="flex items-start gap-3" style={{ marginBottom: "12px" }}>
                <Check
                  className="flex-shrink-0"
                  style={{ color: navyAccent, width: "30px", height: "30px", marginTop: "2px" }}
                  strokeWidth={2.5}
                />
                <span
                  className="leading-relaxed"
                  style={{
                    color: "#4a4a42",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    letterSpacing: "0.02em",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  Licensed &amp; Insured
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check
                  className="flex-shrink-0"
                  style={{ color: navyAccent, width: "30px", height: "30px", marginTop: "2px" }}
                  strokeWidth={2.5}
                />
                <span
                  className="leading-relaxed"
                  style={{
                    color: "#4a4a42",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    letterSpacing: "0.02em",
                    fontSize: "18px",
                    fontWeight: "700",
                  }}
                >
                  On-time guarantee
                </span>
              </li>
            </ul>
          </div>

          {/* Hairline */}
          <div style={{ height: "1px", backgroundColor: navyAccent, opacity: 0.18 }} />

          {/* Form steps */}
          <div className="px-8 md:px-12" style={{ paddingTop: "37px", paddingBottom: "32px" }}>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="uppercase tracking-[0.2em]"
                  style={{
                    color: "#8a8a82",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span
                  className="uppercase tracking-[0.2em]"
                  style={{
                    color: "#8a8a82",
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-[2px] w-full bg-[#e8e8e0] overflow-hidden">
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%`, backgroundColor: navyAccent }}
                />
              </div>
            </div>

            {/* Question label */}
            <p
              className="text-[9px] uppercase tracking-[0.22em] mb-3"
              style={{ color: "#8a8a82", fontFamily: "var(--font-poppins, sans-serif)" }}
            >
              {currentStep === 0 ? "Your Name" : currentStep === 1 ? "Email Address" : "Mobile Number"}
            </p>
            <p
              className="mb-6 leading-snug"
              style={{
                color: navyAccent,
                fontFamily: "var(--font-poppins, sans-serif)",
                letterSpacing: "0.01em",
                fontSize: "20px",
              }}
            >
              {step.title}
            </p>

            {/* Input / Options */}
            <div className="mb-8">
              {step.type === "single" || step.type === "multi" ? (
                <div className="space-y-3">
                  {step.options?.map((option) => {
                    const isSelected = step.type === "multi"
                      ? ((answers[currentStep] as string[]) || []).includes(option)
                      : answers[currentStep] === option
                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full text-left transition-all py-3 px-0 flex items-center gap-3 group"
                        style={{ borderBottom: "1px solid #e8e8e0" }}
                      >
                        <span
                          className="w-4 h-4 flex-shrink-0 flex items-center justify-center border"
                          style={{
                            borderColor: isSelected ? navyAccent : "#c8c8be",
                            backgroundColor: isSelected ? navyAccent : "transparent",
                          }}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                        </span>
                        <span
                          className="text-[11px] tracking-wide"
                          style={{
                            color: isSelected ? navyAccent : "#4a4a42",
                            fontFamily: "var(--font-poppins, sans-serif)",
                            letterSpacing: "0.03em",
                          }}
                        >
                          {option}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div>
                  <input
                    type={step.type === "tel" ? "text" : step.type}
                    placeholder={step.placeholder}
                    value={(answers[currentStep] as string) || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full bg-transparent outline-none py-3 text-sm placeholder:text-[#b0b0a8] transition-all"
                    style={{
                      borderBottom: `1px solid ${errors[currentStep] ? "#c0392b" : navyAccent}`,
                      color: navyAccent,
                      fontFamily: "var(--font-poppins, sans-serif)",
                      letterSpacing: "0.02em",
                    }}
                    onFocus={(e) => {
                      if (!errors[currentStep]) {
                        e.currentTarget.style.borderBottomWidth = "2px"
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderBottomWidth = "1px"
                    }}
                  />
                  {errors[currentStep] && (
                    <p
                      className="mt-2 text-[10px] tracking-wide"
                      style={{ color: "#c0392b", fontFamily: "var(--font-poppins, sans-serif)" }}
                    >
                      {errors[currentStep]}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {/* Back — text link style */}
              <button
                onClick={goPrev}
                disabled={currentStep === 0}
                className="flex items-center gap-1 transition-opacity disabled:opacity-0"
                style={{
                  color: navyAccent,
                  fontFamily: "var(--font-poppins, sans-serif)",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <ChevronLeft className="w-3 h-3" strokeWidth={1.5} />
                Back
              </button>

              {/* Next / Submit — outlined Tiffany-record style */}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-1.5 px-7 py-2.5 transition-all disabled:opacity-30"
                  style={{
                    border: `1px solid ${navyAccent}`,
                    color: navyAccent,
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                  }}
                >
                  Continue
                  <ChevronRight className="w-3 h-3" strokeWidth={1.5} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className={cn(
                    "flex items-center gap-1.5 px-7 py-2.5 transition-all disabled:opacity-30",
                    isSubmitting && "pointer-events-none opacity-50"
                  )}
                  style={{
                    border: `1px solid ${navyAccent}`,
                    color: navyAccent,
                    fontFamily: "var(--font-poppins, sans-serif)",
                    fontSize: "10px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                  }}
                >
                  {isSubmitting ? "Sending\u2026" : "Get My Free Quote"}
                  {!isSubmitting && <ChevronRight className="w-3 h-3" strokeWidth={1.5} />}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
