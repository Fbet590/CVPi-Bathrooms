import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You - CV Remodeling & Outdoor Living',
  description: 'Thank you for your submission. Book your appointment now!',
}

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
