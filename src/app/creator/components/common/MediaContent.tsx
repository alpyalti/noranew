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
  if (type === "video") {
    return (
      <video 
        src={src}
        className={className}
        loop
        muted
        playsInline
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }
  
  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
} 