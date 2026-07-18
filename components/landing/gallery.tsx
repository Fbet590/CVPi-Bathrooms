"use client"

import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react"

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Modern kitchen renovation with white cabinets and marble countertops",
    title: "Modern Kitchen Remodel",
    description: "Custom white shaker cabinets with marble countertops and subway tile backsplash",
    city: "Scottsdale, AZ"
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Luxurious bathroom remodel with walk-in shower",
    title: "Luxury Walk-In Shower",
    description: "Frameless glass enclosure with rainfall showerhead and white marble tiles",
    city: "Phoenix, AZ"
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Custom kitchen island with pendant lighting",
    title: "Custom Kitchen Island",
    description: "Waterfall quartz countertop with modern pendant lighting and bar seating",
    city: "Tempe, AZ"
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Elegant master bathroom with soaking tub",
    title: "Master Bath Retreat",
    description: "Freestanding soaking tub with double vanity and natural stone finishes",
    city: "Mesa, AZ"
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Contemporary kitchen with stainless steel appliances",
    title: "Contemporary Kitchen",
    description: "Navy blue cabinets with gold hardware and professional-grade appliances",
    city: "Gilbert, AZ"
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Spa-inspired bathroom renovation",
    title: "Spa-Inspired Bathroom",
    description: "Neutral tones with stone accent wall and floating vanity",
    city: "Chandler, AZ"
  }
]

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)
  
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1)
    }
  }
  
  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Recent Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through some of our stunning kitchen and bathroom transformations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/3] w-full overflow-hidden group cursor-pointer"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              </button>
              <div className="p-4">
                <h3 className="font-serif font-semibold text-lg text-card-foreground mb-1">
                  {image.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
                  {image.description}
                </p>
                <div className="flex items-center gap-1 text-primary text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{image.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-background hover:text-background/80 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button
            className="absolute left-4 text-background hover:text-background/80 transition-colors"
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <div 
            className="relative max-w-4xl max-h-[80vh] w-full aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedIndex].src}
              alt={galleryImages[selectedIndex].alt}
              fill
              className="object-contain"
            />
          </div>
          
          <button
            className="absolute right-4 text-background hover:text-background/80 transition-colors"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  )
}
