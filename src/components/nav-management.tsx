"use client"

import * as React from "react"
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavManagement({
  projects,
  hideTitle = false,
  isCompact = false
}: {
  projects: {
    name: string
    url: string
    icon: React.ElementType
  }[]
  hideTitle?: boolean
  isCompact?: boolean
}) {
  return (
    <div className={hideTitle ? "py-1" : "py-4"}>
      <SidebarMenu className={hideTitle ? "gap-0 py-0 px-2" : "gap-1 py-1.5 px-2"}>
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild className={`pl-4 ${isCompact ? 'pr-1' : 'pr-3'} mx-0 rounded-md w-full cursor-pointer`}>
              <a href={project.url}>
                <project.icon className="size-4 mr-2" />
                {!isCompact && <span className="truncate">{project.name}</span>}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  )
} 