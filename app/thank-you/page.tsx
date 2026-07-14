"use client"

import Image from "next/image"
import Script from "next/script"
import { CheckCircle, Calendar, Clock } from "lucide-react"

export default function ThankYouPage() {
  return (
    <>
      <Script 
        src="https://link.msgsndr.com/js/form_embed.js" 
        strategy="lazyOnload"
      />
      <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src="/images/logo.png"
                alt="CV Remodeling & Outdoor Living Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-serif font-semibold text-foreground text-lg">
              CV Remodeling & Outdoor Living
            </span>
          </div>
        </div>
      </header>

      {/* Success Banner */}
      <section className="bg-primary/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle className="w-10 h-10 text-primary" />
            <h1 className="font-serif text-[2.125rem] md:text-[2.625rem] font-extrabold text-foreground">
              Thank You!
            </h1>
          </div>
          <p className="text-[1.0625rem] md:text-[1.1875rem] text-black max-w-2xl mx-auto">
            You&apos;re almost there! Avoid the back-and-forth — book your appointment directly into our calendar below. Pick a time that works best for you while spots are still open!
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">Easy Scheduling</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">30-Minute Consultation</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-medium">No Obligation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Embed Section */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-border">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-card-foreground text-center">
                Schedule Your Free Consultation
              </h2>
            </div>
            
            {/* Calendar Embed */}
            <div className="p-6 md:p-8">
              <iframe 
                src="https://api.leadconnectorhq.com/widget/booking/a9elbRBanx6jLMbSESfH"
                style={{ width: '100%', height: '700px', border: 'none', overflow: 'hidden' }}
                scrolling="no"
                id="a9elbRBanx6jLMbSESfH_1775773376942"
                title="Book an appointment"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-background/70 text-sm">
            &copy; {new Date().getFullYear()} CV Remodeling & Outdoor Living. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
    </>
  )
}
