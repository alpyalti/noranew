import React from "react";

export type ServiceCategory = "visual" | "video" | "text" | "sound";
export type TabValue = ServiceCategory | "all";
export type HistoryTabValue = "all" | "image" | "video" | "text" | "favorites" | "uploads";
export type ArchiveFilterValue = "all" | "uploads" | "favorites";
export type ContentType = "image" | "video" | "text";

export type CreativeSize = {
  name: string;
  width: number;
  height: number;
};

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ServiceCategory;
  type: ContentType;
}

export interface HistoryItem {
  id: number;
  type: ContentType;
  thumbnail?: string;
  content?: string;
  title: string;
  date: string;
  serviceId: string;
}

export interface Result {
  id: number;
  thumbnail: string;
  isCommercial: boolean;
  type: ContentType;
  engagementScore: number;
}

export interface ResultCardProps {
  result: Result;
  onSelect: (result: Result) => void;
  isSelected: boolean;
}

export interface StockPhoto {
  id: number;
  url: string;
  type: "square" | "portrait" | "landscape";
  width: number;
  height: number;
  title?: string;
  tags?: string[];
  author?: string;
  authorUrl?: string;
  sourceUrl?: string;
}

export interface ArchiveItem extends StockPhoto {
  category: "uploads" | "ai-generated" | "favorites";
  serviceId?: string;
  date: string;
}

export interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  isSelected: boolean;
}

export interface ImageAdsServiceProps {
  mockImage: string;
  mockVideo: string;
  mockKeywords: string[];
  mockResults: Result[];
  mockStockPhotos: StockPhoto[];
  filteredArchiveItems: ArchiveItem[];
  aiServices: Service[];
}

export interface LinkToIdeaServiceProps {
  // Props for LinkToIdeaService
}

export interface ComingSoonServiceProps {
  service: Service;
}

export interface MediaContentProps {
  src: string;
  type: ContentType;
  onMouseEnter?: (e: React.MouseEvent<HTMLVideoElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLVideoElement>) => void;
  className?: string;
  alt?: string;
} 