"use client"

import { usePathname } from "next/navigation"

export function DynamicTitle() {
  const pathname = usePathname()
  
  // Pathname'den sayfa adını çıkartır
  // Örneğin: "/dashboard" -> "Dashboard"
  const pageName = pathname
    .split("/")[1] // İlk segment'i al (örn: "dashboard")
    .replace(/-/g, " ") // Tire işaretlerini boşluğa çevir
    
  // İlk harf büyük, geri kalanı küçük harf olacak şekilde formatlama
  const formattedPageName = pageName
    ? pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase()
    : "Dashboard" // Eğer pathname boşsa, varsayılan olarak "Dashboard" göster
    
  return <h1 className="text-base font-medium">{formattedPageName}</h1>
} 