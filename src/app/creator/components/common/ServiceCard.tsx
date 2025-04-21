import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ServiceCardProps } from "../../types";
import { MediaContent } from "./MediaContent";

export function ServiceCard({ service, onSelect, isSelected }: ServiceCardProps) {
  // Handle video play on hover
  const handleVideoEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };

  // Handle video pause on leave
  const handleVideoLeave = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  };

  return (
    <Card 
      className={cn(
        "flex flex-row cursor-pointer transition-all duration-200 hover:shadow-md w-full", 
        isSelected ? "border-primary" : ""
      )}
      onClick={() => onSelect(service)}
    >
      <div className="flex flex-1 items-center py-0 px-2 gap-1.5 w-full">
        <div className="bg-primary/10 p-1 rounded-md text-primary shrink-0">
          {service.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium leading-none line-clamp-2">{service.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{service.description}</p>
        </div>
        <div className="w-24 h-14 rounded-md overflow-hidden relative group shrink-0">
          <MediaContent 
            src={service.type === "video" ? "/path/to/video" : "/path/to/image"}
            type={service.type}
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>
    </Card>
  );
} 