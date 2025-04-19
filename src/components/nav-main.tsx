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
const BUTTON_ACTIVE_CLASS = "bg-white text-black font-semibold shadow-sm dark:bg-black dark:text-white"
const ICON_CLASS = (isCompact: boolean, isActive: boolean) => 
  `size-4 ${isCompact ? 'mr-0' : 'mr-2'} ${isActive ? 'text-black dark:text-white' : ''}`

// Components
const MenuButton: React.FC<{
  item: NavItem
  isCompact: boolean
  hasItems?: boolean
  onClick?: () => void
  isOpen?: boolean
  isExpanded?: boolean
}> = ({ item, isCompact, hasItems, onClick, isOpen, isExpanded }) => {
  const buttonClass = `${BUTTON_BASE_CLASS} ${BUTTON_PADDING_CLASS(isCompact)} ${item.isActive ? BUTTON_ACTIVE_CLASS : 'hover:bg-muted/20'}`
  const iconClass = ICON_CLASS(isCompact, !!item.isActive)

  const button = (
    <div className="relative">
      <SidebarMenuButton
        isActive={item.isActive}
        onClick={onClick}
        className={buttonClass}
      >
        <item.icon className={iconClass} />
        {!isCompact && <span className="truncate">{item.title}</span>}
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
          <TooltipContent side="right" align="start" className="p-0 w-52">
            <div className="py-1.5">
              <div className="mx-2 px-3 py-1.5 text-xs font-medium text-muted-foreground">{item.title}</div>
              <div className="pt-1">
                {item.items?.map((subItem) => (
                  <a 
                    key={subItem.title} 
                    href={subItem.url}
                    className={`mx-2 my-0.5 px-3 py-1.5 text-sm flex items-center rounded-md cursor-pointer ${
                      subItem.isActive 
                        ? 'bg-white dark:bg-black text-black dark:text-white font-semibold' 
                        : 'hover:bg-muted/20'
                    }`}
                  >
                    <span className="flex-grow">{subItem.title}</span>
                    {subItem.isActive && <Check className="size-3.5 text-black dark:text-white ml-2" />}
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
        <TooltipContent side="right" align="center">
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
