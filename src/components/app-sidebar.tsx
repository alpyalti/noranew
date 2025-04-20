/**
 * LATEST VERSION - Sidebar with Tools section removed - For NoraNew
 */

"use client"

import * as React from "react"
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  PlusCircle,
  SquareTerminal,
  Users,
  Palette,
  Settings,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavManagement } from "@/components/nav-management"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  platform: [
    {
      title: "Base",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Dashboard",
          url: "#",
          isActive: true,
        },
        {
          title: "Table",
          url: "#",
        },
        {
          title: "Campaigns",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Creator",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Brand Details",
      url: "#",
      icon: Palette,
    },
    {
      name: "Team",
      url: "#",
      icon: Users,
    },
    {
      name: "Brand Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isExpanded = state === "expanded"
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  
  React.useEffect(() => {
    // Dark mod tespiti
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
    
    // Dark mod değişikliklerini dinle
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          setIsDarkMode(isDark)
        }
      })
    })
    
    observer.observe(document.documentElement, { attributes: true })
    
    return () => observer.disconnect()
  }, [])
  
  const handleQuickCreate = React.useCallback(() => {
    alert("Quick Create button clicked!")
    // Gerçek uygulamada burada bir modal veya form açabilirsiniz
  }, [])
  
  // Buton stilleri
  const buttonStyle = {
    backgroundColor: isDarkMode ? 'white' : 'black',
    color: isDarkMode ? 'black' : 'white',
    padding: '0.375rem 0.75rem',
    paddingLeft: '1rem',
    paddingRight: '0.75rem',
    marginLeft: '0',
    marginRight: '0',
    borderRadius: '0.375rem',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 500,
    fontSize: '0.875rem'
  }

  const compactButtonStyle = {
    ...buttonStyle,
    padding: '0.375rem',
    justifyContent: 'center'
  }

  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = isDarkMode 
      ? 'rgba(255,255,255,0.9)' 
      : 'rgba(0,0,0,0.9)'
  }

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = isDarkMode 
      ? 'white' 
      : 'black'
  }
  
  return (
    <TooltipProvider delayDuration={300}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent className={isExpanded ? "" : "space-y-0"}>
          <div className="py-2">
            <SidebarMenu className="gap-0.5 py-1 px-2">
              <SidebarMenuItem>
                {isExpanded ? (
                  <button 
                    onClick={handleQuickCreate}
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <PlusCircle className="size-4 mr-2" />
                    <span className="truncate font-medium">Quick Create</span>
                  </button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button 
                        onClick={handleQuickCreate}
                        style={compactButtonStyle}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                      >
                        <PlusCircle className="size-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      Quick Create
                    </TooltipContent>
                  </Tooltip>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
          {isExpanded ? (
            <>
              <div className="px-4 py-1 text-xs font-medium text-muted-foreground">Platform</div>
              <NavMain items={data.platform} id="platform" isCompact={false} />
              <div className="mt-1">
                <NavManagement projects={data.projects} hideTitle={false} isCompact={false} />
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-0 pt-0 mt-0">
              <NavMain items={data.platform} id="platform" isCompact={true} />
              <div className="pt-0 mt-0">
                <NavManagement projects={data.projects} hideTitle={true} isCompact={true} />
              </div>
            </div>
          )}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}
