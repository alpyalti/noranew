import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Download, Star } from "lucide-react";
import { ResultCardProps } from "../../types";
import { MediaContent } from "./MediaContent";

export function ResultCard({ result, onSelect, isSelected }: ResultCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);

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
    <div className="relative group">
      <div className={cn(
        "h-full w-full border border-border/40 rounded-md overflow-hidden transition-all duration-200 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
        isSelected 
          ? "border-2 border-primary shadow-[0_0_0_1px_var(--primary)]" 
          : "hover:border-border/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
      )}>
        <div className="aspect-square bg-muted relative">
          <MediaContent 
            src={result.type === "video" ? "/path/to/video" : result.thumbnail}
            type={result.type}
            onMouseEnter={handleVideoEnter}
            onMouseLeave={handleVideoLeave}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-7 w-7 p-0 hover:bg-background/80 hover:backdrop-blur-sm cursor-pointer",
              isFavorite && "text-primary"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
          </Button>
        </div>
        <div className="border-t border-border/40 bg-card shadow-[0_-1px_0_0_rgba(0,0,0,0.05)]">
          <div className="p-2 flex gap-1 justify-between items-center">
            <div className="flex gap-1">
              <div 
                className={cn(
                  "w-7 h-7 rounded-md border flex items-center justify-center cursor-pointer",
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-accent"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(result);
                }}
              >
                {isSelected && <Check className="h-4 w-4" />}
              </div>
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 hover:bg-accent cursor-pointer">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 