import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload } from "lucide-react";
import { HistoryItem, Service } from "../../types";
import { MediaContent } from "./MediaContent";
import { getTypeIcon, truncateText } from "../../utils/helpers";

interface HistoryItemCardProps {
  item: HistoryItem;
  onClick: (item: HistoryItem) => void;
  onDelete?: (id: number) => void;
  service?: Service | null;
  mockVideo: string;
}

export function HistoryItemCard({ 
  item, 
  onClick,
  onDelete,
  service,
  mockVideo 
}: HistoryItemCardProps) {
  // Check if this is an uploads item
  const isUpload = item.serviceId === "uploads";

  // Handle video play on hover
  const handleVideoEnter = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };

  // Handle video pause on leave
  const handleVideoLeave = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  };

  // Function to handle delete click
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the item onClick
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <div 
      className="w-full aspect-square relative rounded-md overflow-hidden cursor-pointer group transition-all duration-200 hover:shadow-md"
      onClick={() => onClick(item)}
    >
      {/* Delete button - appears on hover */}
      {onDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-7 w-7 p-0 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-4 w-4 text-destructive hover:text-destructive" />
        </Button>
      )}

      {item.type === "text" ? (
        <>
          <div className="absolute inset-0 bg-muted">
            <div className="p-4 flex flex-col justify-center h-full">
              <p className="text-sm leading-snug text-left">
                {item.content ? truncateText(item.content, 90) : "No content available"}
              </p>
            </div>
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs shadow-sm flex items-center gap-1 bg-background/80 backdrop-blur-sm">
              {isUpload ? (
                <>
                  <Upload className="h-3 w-3" />
                  <span>Uploads</span>
                </>
              ) : (
                <>
                  {service?.icon || getTypeIcon(item.type)}
                  <span>{service?.title}</span>
                </>
              )}
            </Badge>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            {item.date}
          </div>
        </>
      ) : (
        <>
          <MediaContent 
            src={item.type === "video" ? mockVideo : (item.thumbnail || "")}
            type={item.type}
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20"></div>
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs shadow-sm flex items-center gap-1 bg-background/80 backdrop-blur-sm">
              {isUpload ? (
                <>
                  <Upload className="h-3 w-3" />
                  <span>Uploads</span>
                </>
              ) : (
                <>
                  {service?.icon || getTypeIcon(item.type)}
                  <span>{service?.title}</span>
                </>
              )}
            </Badge>
          </div>
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
            {item.date}
          </div>
        </>
      )}
    </div>
  );
} 