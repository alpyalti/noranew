"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Define callback for media query change
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add listener
    media.addEventListener("change", listener);
    
    // Cleanup function
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);
  
  return matches;
} 