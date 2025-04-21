import React from "react";
import { MediaContentProps } from "../../types";

/**
 * Renders either an image or video based on the content type
 */
export function MediaContent({
  src,
  type,
  onMouseEnter,
  onMouseLeave,
  className,
  alt = "Content preview"
}: MediaContentProps) {
  // Error state for video loading
  const [videoError, setVideoError] = React.useState(false);

  // Handle video error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error("Video failed to load:", src);
    setVideoError(true);
  };

  if (type === "video") {
    if (videoError) {
      // Show fallback content if video fails to load
      return (
        <div className={`${className} flex items-center justify-center bg-muted`}>
          <p className="text-xs text-muted-foreground">Video unavailable</p>
        </div>
      );
    }

    return (
      <video 
        src={src}
        className={className}
        loop
        muted
        playsInline
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onError={handleVideoError}
      />
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = "https://placehold.co/600x400?text=Image+Not+Found";
      }}
    />
  );
} 