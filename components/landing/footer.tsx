import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-[60px] w-[60px] bg-white rounded-lg p-1">
            <Image
              src="/images/logo.jpeg"
              alt="CV Remodeling & Outdoor Living Logo"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-serif text-xl font-semibold">
            CV Remodeling & Outdoor Living
          </p>
          <p className="text-background/70 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved. Licensed & Insured.
          </p>
        </div>
      </div>
    </footer>
  )
}
