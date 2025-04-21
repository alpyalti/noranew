import { ContentType } from "../types";
import React from "react";
import { Image, VideoIcon, FileText } from "lucide-react";

/**
 * Sorts items by date in descending order (newest first)
 */
export function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Handles scrolling for infinite loading
 */
export function handleInfiniteScroll(
  event: React.UIEvent<HTMLDivElement>,
  isLoading: boolean,
  displayedItems: number,
  totalItems: number,
  loadMore: (count: number) => void,
  batchSize: number = 20
) {
  const scrollElement = event.currentTarget;
  const { scrollTop, scrollHeight, clientHeight } = scrollElement;
  
  if (
    scrollHeight - scrollTop <= clientHeight + 100 && 
    !isLoading && 
    displayedItems < totalItems
  ) {
    loadMore(Math.min(displayedItems + batchSize, totalItems));
  }
}

/**
 * Returns appropriate icon based on content type
 */
export function getTypeIcon(type: ContentType): React.ReactNode {
  switch (type) {
    case "image":
      return <Image className="h-3 w-3" aria-hidden="true" />;
    case "video":
      return <VideoIcon className="h-3 w-3" aria-hidden="true" />;
    case "text":
      return <FileText className="h-3 w-3" aria-hidden="true" />;
    default:
      return null;
  }
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, limit: number = 90): string {
  if (!text || text.length <= limit) return text || "";
  return text.slice(0, limit) + "...";
}

/**
 * Determines image type based on dimensions
 */
export function getImageType(width: number, height: number): "square" | "portrait" | "landscape" {
  const ratio = width / height;
  if (ratio > 1.2) return "landscape";
  if (ratio < 0.8) return "portrait";
  return "square";
} 