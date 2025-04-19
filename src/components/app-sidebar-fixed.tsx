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
import { usePathname } from "next/navigation"

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
          url: "/dashboard",
        },
        {
          title: "Table",
          url: "/table",
        },
        {
          title: "Campaigns",
          url: "/campaigns",
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
          url: "/explorer",
        },
        {
          title: "Creator",
          url: "/creator",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Brand Details",
      url: "/brand",
      icon: Palette,
    },
    {
      name: "Team",
      url: "/team",
      icon: Users,
    },
    {
      name: "Brand Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebarFixed({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isExpanded = state === "expanded"
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const pathname = usePathname()
  
  // Platform menü öğeleri için başlangıçta açık olacak başlıkları belirle
  const initialOpenPlatformItems = React.useMemo(() => ["Base", "Models"], [])

  // Update platform items based on current URL
  const platformItems = React.useMemo(() => {
    return data.platform.map(section => ({
      ...section,
      items: section.items?.map(item => ({
        ...item,
        isActive: pathname === item.url
      }))
    }))
  }, [pathname])

  // Update project items based on current URL
  const projectItems = React.useMemo(() => {
    return data.projects.map(project => ({
      ...project,
      isActive: pathname === project.url
    }))
  }, [pathname])
  
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
                  <SidebarMenuButton
                    onClick={handleQuickCreate}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white pl-2 pr-8 mx-0 rounded-md w-full cursor-pointer"
                  >
                    <PlusCircle className="size-4 mr-2" />
                    <span className="truncate font-medium">Quick Create</span>
                  </SidebarMenuButton>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        onClick={handleQuickCreate}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white pl-2 pr-2 mx-0 rounded-md w-full cursor-pointer"
                      >
                        <PlusCircle className="size-4" />
                      </SidebarMenuButton>
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
              <NavMain items={platformItems} id="platform" isCompact={false} initialOpenItems={initialOpenPlatformItems} />
              <div className="mt-0">
                <NavManagement projects={projectItems} hideTitle={false} isCompact={false} />
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-0 pt-0 mt-0">
              <NavMain items={platformItems} id="platform" isCompact={true} initialOpenItems={initialOpenPlatformItems} />
              <div className="pt-0 mt-0">
                <NavManagement projects={projectItems} hideTitle={true} isCompact={true} />
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