import * as React from "react"
import { CalendarClock } from "lucide-react"
import { Service } from "../types"

interface ComingSoonServiceProps {
  service: Service;
}

export default function ComingSoonService({ service }: ComingSoonServiceProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] p-8">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        {service.icon ? (
          React.cloneElement(service.icon as React.ReactElement, { 
            className: "h-10 w-10 text-primary" 
          })
        ) : (
          <CalendarClock className="h-10 w-10 text-primary" />
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
      <p className="text-center text-muted-foreground mb-2 max-w-md">{service.description}</p>
      <div className="flex items-center justify-center border border-primary text-primary rounded-full py-2 px-6 mt-6">
        <CalendarClock className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Coming Soon</span>
      </div>
      <p className="text-sm text-muted-foreground mt-4">
        We're working hard to bring you this feature. Stay tuned!
      </p>
    </div>
  )
} 