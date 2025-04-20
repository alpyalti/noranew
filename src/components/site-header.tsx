"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  
  // URL'den sayfa adını çıkarma ve formatlamayı birleştirdim
  const pageTitle = React.useMemo(() => {
    // İlk önceden tanımlanmış sayfaları kontrol ediyoruz
    const pathSegments = pathname.split("/").filter(Boolean)
    const lastSegment = pathSegments[pathSegments.length - 1] || "dashboard"
    
    // İlk harfi büyük yap
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }, [pathname]) // pathname değiştiğinde hesaplanacak
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background rounded-t-[var(--radius-xl)]">
      <div className="flex h-14 items-center px-4 md:px-6">
        <SidebarTrigger />
        <Separator className="mx-4 h-6" orientation="vertical" />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-medium">{pageTitle}</h1>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
