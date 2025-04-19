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

// Types
interface NavItem {
  title: string
  url: string
  icon: React.ElementType
  isActive?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}

interface NavMainProps {
  items: NavItem[]
  id?: string
  isCompact?: boolean
  initialOpenItems?: string[]
}

// Constants
const MENU_CLASS = {
  compact: "gap-0 py-0 px-2",
  default: "gap-0.5 py-0 px-2"
}

const BUTTON_BASE_CLASS = "mx-0 rounded-md w-full relative cursor-pointer"
const BUTTON_PADDING_CLASS = (isCompact: boolean) => `pl-2 ${isCompact ? 'pr-2' : 'pr-8'}`
const BUTTON_ACTIVE_CLASS = "bg-primary/50 dark:bg-primary/30 font-semibold shadow-sm"
const BUTTON_HOVER_CLASS = "hover:bg-primary/30 hover:shadow-sm dark:hover:bg-primary/20 transition-all duration-150"
const ICON_CLASS = (isCompact: boolean, isActive: boolean) => 
  `size-4 ${isCompact ? 'mr-0' : 'mr-2'} ${isActive ? 'text-primary' : ''}`

// Components
const MenuButton: React.FC<{
  item: NavItem
  isCompact: boolean
  hasItems?: boolean
  onClick?: () => void
  isOpen?: boolean
  isExpanded?: boolean
}> = ({ item, isCompact, hasItems, onClick, isOpen, isExpanded }) => {
  const buttonClass = `${BUTTON_BASE_CLASS} ${BUTTON_PADDING_CLASS(isCompact)} ${item.isActive ? BUTTON_ACTIVE_CLASS : BUTTON_HOVER_CLASS} group`
  const iconClass = ICON_CLASS(isCompact, !!item.isActive)

  const button = (
    <div className="relative">
      <SidebarMenuButton
        isActive={item.isActive}
        onClick={onClick}
        className={buttonClass}
      >
        <item.icon className={`${iconClass} group-hover:text-primary transition-colors duration-150`} />
        {!isCompact && <span className="truncate group-hover:font-medium transition-all duration-150">{item.title}</span>}
      </SidebarMenuButton>
      {hasItems && isExpanded && !isCompact && (
        <div className="absolute right-2 top-[50%] -translate-y-[50%] pointer-events-none">
          <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'} flex items-center justify-center`}>
            <ChevronRight className="size-4" />
          </div>
        </div>
      )}
      {item.isActive && !hasItems && isExpanded && !isCompact && (
        <div className="absolute right-2 top-[50%] -translate-y-[50%] pointer-events-none">
          <Check className="size-4 text-primary" />
        </div>
      )}
    </div>
  )

  if (isCompact) {
    const hasSubmenu = hasItems && item.items && item.items.length > 0;
    
    if (hasSubmenu) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {button}
          </TooltipTrigger>
          <TooltipContent side="right" align="start" className="p-0 w-52 border border-border shadow-lg">
            <div className="py-1.5">
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground border-b bg-muted/30">{item.title}</div>
              <div className="pt-1">
                {item.items?.map((subItem) => (
                  <a 
                    key={subItem.title} 
                    href={subItem.url}
                    className={`px-3 py-1.5 text-sm flex items-center hover:bg-primary/20 hover:shadow-sm transition-all duration-150 cursor-pointer ${subItem.isActive ? 'bg-primary/10 font-medium' : ''}`}
                  >
                    <span className="flex-grow">{subItem.title}</span>
                    {subItem.isActive && <Check className="size-3.5 text-primary ml-2" />}
                  </a>
                ))}
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      );
    }
    
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side="right" align="center" className="border border-border shadow-md">
          {item.title}
        </TooltipContent>
      </Tooltip>
    )
  }

  return button
}

export function NavMain({
  items,
  id,
  isCompact = false,
  initialOpenItems = []
}: NavMainProps) {
  const { state } = useSidebar()
  const isExpanded = state === "expanded"

  const [openSubmenus, setOpenSubmenus] = React.useState<string[]>(
    items
      .filter(item => item.isActive || initialOpenItems.includes(item.title))
      .map(item => item.title)
  )

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  return (
    <TooltipProvider delayDuration={100} skipDelayDuration={0}>
      <SidebarMenu className={isCompact ? MENU_CLASS.compact : MENU_CLASS.default}>
        {items.map((item) => {
          const isOpen = openSubmenus.includes(item.title)
          const hasItems = item.items && item.items.length > 0

          return (
            <SidebarMenuItem key={`${id || "default"}-${item.title}`}>
              <MenuButton
                item={item}
                isCompact={isCompact}
                hasItems={hasItems}
                onClick={() => hasItems && toggleSubmenu(item.title)}
                isOpen={isOpen}
                isExpanded={isExpanded}
              />
              
              {hasItems && isOpen && item.items && isExpanded && !isCompact && (
                <SidebarMenuSub className="px-0 mx-3 mt-0.5 mb-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={`${id || "default"}-${item.title}-${subItem.title}`}>
                      <SidebarMenuSubButton 
                        href={subItem.url}
                        isActive={subItem.isActive} 
                        className={`pl-4 pr-3 mx-2 py-1 rounded-md w-[calc(100%-16px)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer ${subItem.isActive ? BUTTON_ACTIVE_CLASS : ''}`}
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
