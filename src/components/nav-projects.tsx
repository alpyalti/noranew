"use client"

import * as React from "react"
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ElementType
  }[]
}) {
  return (
    <div className="py-4">
      <div className="px-4 py-1 text-xs font-medium text-muted-foreground">Projects</div>
      <SidebarMenu className="gap-1 py-1.5 px-2">
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild className="pl-4 pr-3 mx-0 rounded-md w-full cursor-pointer">
              <a href={project.url}>
                <project.icon className="size-4 mr-2" />
                <span className="truncate">{project.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  )
} 