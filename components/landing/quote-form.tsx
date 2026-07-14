"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

  

  return (
    <section id="quote-form" className="relative -mt-32 z-20 pb-20 bg-muted pt-4">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 font-[family-name:var(--font-poppins)]">
          {/* Form Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-card-foreground mb-2">
              See If You Qualify for Our $15K All-In Kitchen Transformation
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Answer our quick form and we&apos;ll get in touch. No Pressure. No Obligation. Less than 60 Seconds.
            </p>
          </div>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {/* Question */}
          <h3 className="text-xl font-semibold text-card-foreground mb-6 text-center">
            {step.title}
          </h3>

          {/* Options or Input */}
          <div className="space-y-3 mb-8">
            {step.type === "single" || step.type === "multi" ? (
              step.options?.map((option) => {
                const isSelected = step.type === "multi"
                  ? ((answers[currentStep] as string[]) || []).includes(option)
                  : answers[currentStep] === option

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background hover:border-primary/50 text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                        isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                      )}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </span>
                      {option}
                    </span>
                  </button>
                )
              })
            ) : (
              <div className="space-y-2">
                <Input
                  type={step.type === "tel" ? "text" : step.type}
                  placeholder={step.placeholder}
                  value={(answers[currentStep] as string) || ""}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className={cn(
                    "w-full p-4 text-lg",
                    errors[currentStep] && "border-destructive focus-visible:ring-destructive"
                  )}
                />
                {errors[currentStep] && (
                  <p className="text-sm text-destructive">{errors[currentStep]}</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={goNext}
                disabled={!canProceed()}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className={cn(
                  "flex-1 bg-primary hover:bg-primary/90",
                  isSubmitting && "pointer-events-none opacity-70"
                )}
              >
                {isSubmitting ? "Submitting..." : "Get My Free Quote"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
