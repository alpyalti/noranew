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
      <SidebarSeparator className="my-2" />
      <div className="px-5 pt-1.5">
        <Button variant="outline" size="sm" className="w-full justify-start pl-4 pr-3 rounded-md cursor-pointer">
          <Plus className="mr-2 size-4" />
          <span>Add Project</span>
        </Button>
      </div>
    </div>
  )
} 