"use client"

import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

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
}) {
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(
    items.find((item) => item.isActive)?.title || null
  )

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isOpen = openSubmenu === item.title
        const hasItems = item.items && item.items.length > 0

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              isActive={item.isActive}
              onClick={() => hasItems && setOpenSubmenu(isOpen ? null : item.title)}
            >
              <item.icon className="size-4 mr-2" />
              <span className="truncate">{item.title}</span>
              {hasItems && (
                <div className="ml-auto mr-1">
                  {isOpen ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </div>
              )}
            </SidebarMenuButton>
            {hasItems && isOpen && item.items && (
              <SidebarMenuSub>
                {item.items.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
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
