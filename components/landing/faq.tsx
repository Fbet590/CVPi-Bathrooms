"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on the complexity and scope. A basic project would take about 2-3 weeks. We provide a clear timeline during your initial consultation."
  },
  {
    question: "Are your projects covered by a warranty or guarantee?",
    answer: "Absolutely! We proudly stand behind our craftsmanship with a satisfaction guarantee, ensuring your complete peace of mind."
  },
  {
    question: "Do you offer financing or payment plan options?",
    answer: "Yes, we provide flexible financing solutions to fit various budgets, making it easier to start your dream project sooner."
  }
]

export function FAQ() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            FAQs
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card rounded-xl px-6 shadow-md border-none"
            >
              <AccordionTrigger className="text-left font-semibold text-card-foreground hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
