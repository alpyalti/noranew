"use client"

import * as React from "react"
import { 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Constants
const BUTTON_HOVER_CLASS = "hover:bg-primary/30 hover:shadow-sm dark:hover:bg-primary/20 transition-all duration-150"

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
    <div className={hideTitle ? "py-0" : "py-2"}>
      {!hideTitle && (
        <div className="px-4 py-1 text-xs font-medium text-muted-foreground">Management</div>
      )}
      <SidebarMenu className={hideTitle ? "gap-0 py-0 px-2" : "gap-1 py-1.5 px-2"}>
        {projects.map((project) => (
          <SidebarMenuItem key={project.name}>
            {isCompact ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <SidebarMenuButton asChild className={`pl-2 ${isCompact ? 'pr-1' : 'pr-3'} mx-0 rounded-md w-full cursor-pointer ${BUTTON_HOVER_CLASS} group`}>
                    <a href={project.url}>
                      <project.icon className={`size-4 ${isCompact ? 'mr-0' : 'mr-2'} group-hover:text-primary transition-colors duration-150`} />
                    </a>
                  </SidebarMenuButton>
                </TooltipTrigger>
                <TooltipContent side="right" align="center" className="border border-border shadow-md">
                  {project.name}
                </TooltipContent>
              </Tooltip>
            ) : (
              <SidebarMenuButton asChild className={`pl-2 ${isCompact ? 'pr-1' : 'pr-3'} mx-0 rounded-md w-full cursor-pointer ${BUTTON_HOVER_CLASS} group`}>
                <a href={project.url}>
                  <project.icon className={`size-4 ${isCompact ? 'mr-0' : 'mr-2'} group-hover:text-primary transition-colors duration-150`} />
                  <span className="truncate group-hover:font-medium transition-all duration-150">{project.name}</span>
                </a>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  )
} 