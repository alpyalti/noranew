"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarSeparator 
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
    <div className="py-2">
      <div className="px-4 py-1 text-xs font-medium text-muted-foreground">Projects</div>
      <SidebarMenu>
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild>
              <a href={project.url}>
                <project.icon className="size-4 mr-2" />
                <span className="truncate">{project.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarSeparator className="my-2" />
      <div className="px-3">
        <Button variant="outline" size="sm" className="w-full justify-start">
          <Plus className="mr-2 size-4" />
          <span>Add Project</span>
        </Button>
      </div>
    </div>
  )
} 