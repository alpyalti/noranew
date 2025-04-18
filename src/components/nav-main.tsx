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
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  id,
}: {
  items: {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  id?: string
}) {
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(
    items.find((item) => item.isActive)?.title || null
  )

  // Toggle fonksiyonu - önceki menü açıksa kapat, değilse yeni menüyü aç
  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(prev => prev === title ? null : title)
  }

  return (
    <SidebarMenu className="gap-1 py-1.5">
      {items.map((item) => {
        const isOpen = openSubmenu === item.title
        const hasItems = item.items && item.items.length > 0

        return (
          <SidebarMenuItem key={`${id || "default"}-${item.title}`}>
            <SidebarMenuButton
              isActive={item.isActive}
              onClick={() => hasItems && toggleSubmenu(item.title)}
            >
              <item.icon className="size-4 mr-2" />
              <span className="truncate">{item.title}</span>
              {hasItems && (
                <div className="ml-auto mr-1">
                  <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    <ChevronRight className="size-4" />
                  </div>
                </div>
              )}
            </SidebarMenuButton>
            {hasItems && isOpen && item.items && (
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={`${id || "default"}-${item.title}-${subItem.title}`}>
                    <SidebarMenuSubButton href={subItem.url}>
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
