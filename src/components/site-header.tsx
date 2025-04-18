import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="flex h-14 items-center px-4 md:px-6">
        <SidebarTrigger />
        <Separator className="mx-4 h-6" orientation="vertical" />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-base font-medium">Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
