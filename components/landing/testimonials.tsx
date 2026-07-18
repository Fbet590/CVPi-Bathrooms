import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    location: "Scottsdale, AZ",
    text: "CV Remodeling & Outdoor Living transformed our outdated kitchen into a stunning modern space. The team was professional, communicated every step, and finished on time. We couldn't be happier!",
    rating: 5
  },
  {
    name: "Michael R.",
    location: "Phoenix, AZ",
    text: "After getting quotes from several contractors, we chose CV for their transparency and expertise. Our bathroom renovation exceeded expectations. Highly recommend!",
    rating: 5
  },
  {
    name: "Jennifer L.",
    location: "Tempe, AZ",
    text: "The attention to detail was incredible. They helped us select the perfect materials within our budget and the craftsmanship is top-notch. A truly professional experience.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="bg-background" style={{ paddingTop: "64px", paddingBottom: "80px" }}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-[#02acfa] font-semibold mb-2 text-xl">
            Don&apos;t Just Take Our Word For It...
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Here&apos;s What Our Past Clients Had To Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.name}
              className="bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
