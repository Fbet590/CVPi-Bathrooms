export function Footer() {
  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <p className="text-background/70 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved. Licensed & Insured.
          </p>
        </div>
      </div>
    </footer>
  )
}
