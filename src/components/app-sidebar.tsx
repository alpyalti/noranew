"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Palette,
  GalleryVerticalEnd,
  Settings,
  Users,
  PlusCircle,
  Settings2,
  SquareTerminal,
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
      isActive: true,
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
  navMain: [
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Campaigns",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
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
  
  const handleQuickCreate = React.useCallback(() => {
    alert("Quick Create button clicked!")
    // Gerçek uygulamada burada bir modal veya form açabilirsiniz
  }, [])
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <div className="py-2">
          <SidebarMenu className="gap-0.5 py-1 px-2">
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={handleQuickCreate}
                className="pl-4 pr-3 mx-0 rounded-md w-full cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <PlusCircle className="size-4 mr-2" />
                <span className="truncate font-medium">Quick Create</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
        <div className="px-4 py-1 text-xs font-medium text-muted-foreground">Platform</div>
        <NavMain items={data.platform} id="platform" />
        {/* Tools section intentionally removed */}        <div className="mt-1">
          <NavManagement projects={data.projects} />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
