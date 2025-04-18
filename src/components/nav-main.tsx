"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  id,
  isCompact = false
}: {
  items: {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
    items?: {
      title: string
      url: string
      isActive?: boolean
    }[]
  }[]
  id?: string
  isCompact?: boolean
}) {
  // Sidebar durumunu alıyoruz
  const { state } = useSidebar()
  const isExpanded = state === "expanded"

  // Açık menüleri dizi olarak tutuyoruz, böylece birden fazla menü açık kalabilir
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>(
    items.filter((item) => item.isActive).map(item => item.title)
  )

  // Toggle fonksiyonu - menü açıksa kapat, değilse aç
  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) // Menü açıksa, listeden çıkar
        : [...prev, title] // Menü kapalıysa, listeye ekle
    )
  }

  return (
    <SidebarMenu className={isExpanded ? "gap-0.5 py-1 px-2" : "gap-0 py-0 px-2"}>
      {items.map((item) => {
        const isOpen = openSubmenus.includes(item.title)
        const hasItems = item.items && item.items.length > 0

        return (
          <SidebarMenuItem key={`${id || "default"}-${item.title}`}>
            <SidebarMenuButton
              isActive={item.isActive}
              onClick={() => hasItems && toggleSubmenu(item.title)}
              className="pl-4 pr-8 mx-0 rounded-md w-full relative cursor-pointer"
            >
              <item.icon className="size-4 mr-2" />
              {!isCompact && <span className="truncate">{item.title}</span>}
              {hasItems && isExpanded && !isCompact && (
                <div className="absolute right-2">
                  <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              )}
            </SidebarMenuButton>
            {hasItems && isOpen && item.items && isExpanded && !isCompact && (
              <SidebarMenuSub className="px-0 mx-3 mt-0.5 mb-1">
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={`${id || "default"}-${item.title}-${subItem.title}`}>
                    <SidebarMenuSubButton 
                      href={subItem.url}
                      isActive={subItem.isActive} 
                      className="pl-6 pr-3 mx-2 py-1 rounded-md w-[calc(100%-16px)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer"
                    >
                      {subItem.title}
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
