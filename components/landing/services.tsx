"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

const services = [
  {
    title: "Kitchen",
    description: "Get a kitchen built with premium materials and expert craftsmanship delivered on time, without the usual renovation delays.",
    image: "/images/kitchen-service.jpg"
  },
  {
    title: "Bathroom",
    description: "We remodel bathrooms using durable, high-end finishes installed quickly and professionally, so you can enjoy your new space sooner.",
    image: "/images/bathroom-service.jpg"
  }
]

export function Services() {
  const scrollToForm = () => {
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-20 bg-muted" style={{ paddingBottom: "0" }}>
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-12">
          <p className="text-[#02aaf7] font-semibold mb-2">
            Ready to Reimagine Your Home&apos;s Interior?
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Expert Contractor Services
          </h2>
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="group bg-[rgba(1,172,250,0.9)] hover:bg-[rgba(1,172,250,0.8)] text-primary-foreground px-8 py-6 text-lg font-semibold"
          >
            Get a Free Quote
            <ArrowRight className="cta-arrow w-5 h-5 ml-1" />
          </Button>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {services.slice(1).map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 120}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover-lift"
            >
              <div className="h-64 overflow-hidden">
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${service.image}')` }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
