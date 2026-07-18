import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { QuoteForm } from "@/components/landing/quote-form"
import { Stats } from "@/components/landing/stats"
import { Testimonials } from "@/components/landing/testimonials"
import { Services } from "@/components/landing/services"
import { Gallery } from "@/components/landing/gallery"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuoteForm />
        <Stats />
        <Testimonials />
        <Services />
        <Gallery />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
