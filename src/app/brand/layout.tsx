import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brand Details",
  description: "Manage your brand information and preferences",
}

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 