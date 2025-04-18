"use client"

import * as React from "react"
import { ChevronRight, Check } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function NavMain({
  items,
  id,
  isCompact = false,
  initialOpenItems = []
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
  initialOpenItems?: string[]
}) {
  // Sidebar durumunu alıyoruz
  const { state } = useSidebar()
  const isExpanded = state === "expanded"

  // Açık menüleri dizi olarak tutuyoruz, böylece birden fazla menü açık kalabilir
  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>(
    items
      .filter(item => item.isActive || initialOpenItems.includes(item.title))
      .map(item => item.title)
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
    <TooltipProvider delayDuration={0}>
      <SidebarMenu className={isCompact ? "gap-0 py-0 px-2" : "gap-0.5 py-0 px-2"}>
        {items.map((item) => {
          const isOpen = openSubmenus.includes(item.title)
          const hasItems = item.items && item.items.length > 0

          return (
            <SidebarMenuItem key={`${id || "default"}-${item.title}`}>
              {isCompact ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      isActive={item.isActive}
                      onClick={() => hasItems && toggleSubmenu(item.title)}
                      className={`pl-2 ${isCompact ? 'pr-2' : 'pr-8'} mx-0 rounded-md w-full relative cursor-pointer ${item.isActive ? 'bg-primary/40 dark:bg-primary/30 font-semibold shadow-sm' : ''}`}
                    >
                      <item.icon className={`size-4 ${isCompact ? 'mr-0' : 'mr-2'} ${item.isActive ? 'text-primary' : ''}`} />
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <SidebarMenuButton
                  isActive={item.isActive}
                  onClick={() => hasItems && toggleSubmenu(item.title)}
                  className={`pl-2 ${isCompact ? 'pr-2' : 'pr-8'} mx-0 rounded-md w-full relative cursor-pointer ${item.isActive ? 'bg-primary/40 dark:bg-primary/30 font-semibold shadow-sm' : ''}`}
                >
                  <item.icon className={`size-4 ${isCompact ? 'mr-0' : 'mr-2'} ${item.isActive ? 'text-primary' : ''}`} />
                  <span className="truncate">{item.title}</span>
                  {hasItems && isExpanded && (
                    <div className="absolute right-2">
                      <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                        <ChevronRight className="size-4" />
                      </div>
                    </div>
                  )}
                  {item.isActive && !hasItems && isExpanded && (
                    <div className="absolute right-2">
                      <Check className="size-4 text-primary" />
                    </div>
                  )}
                </SidebarMenuButton>
              )}
              
              {hasItems && isOpen && item.items && isExpanded && !isCompact && (
                <SidebarMenuSub className="px-0 mx-3 mt-0.5 mb-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={`${id || "default"}-${item.title}-${subItem.title}`}>
                      <SidebarMenuSubButton 
                        href={subItem.url}
                        isActive={subItem.isActive} 
                        className={`pl-4 pr-3 mx-2 py-1 rounded-md w-[calc(100%-16px)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer ${subItem.isActive ? 'bg-primary/40 dark:bg-primary/30 font-semibold shadow-sm' : ''}`}
                      >
                        {subItem.title}
                        {subItem.isActive && (
                          <Check className="size-4 ml-1 text-primary" />
                        )}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </TooltipProvider>
  )
}
