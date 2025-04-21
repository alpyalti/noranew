"use client"

import * as React from "react"
import { AppSidebarFixed } from "@/components/app-sidebar-fixed"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Camera,
  Image,
  VideoIcon,
  FileText,
  Music,
  ShoppingBag,
  Megaphone,
  Sparkles,
  Film,
  Link,
  MessagesSquare,
  Shirt,
  Eraser,
  ArrowUpRight,
  User,
  Mic,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  CalendarPlus,
  ChevronUp,
  Plus,
  Grid2X2,
  Ruler,
  Upload,
  Type,
  Layers,
  ShieldCheck,
  Star,
  Wine,
  Zap,
  ArrowRight,
  Wand2,
  PenLine,
  Search,
  Trash2,
  Copy,
  TableIcon,
  Loader2,
  Youtube,
  Instagram,
  Tv2
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Type definitions
type ServiceCategory = "visual" | "video" | "text" | "sound";
type TabValue = ServiceCategory | "all";
type HistoryTabValue = "all" | "image" | "video" | "text" | "favorites" | "uploads";
type CreativeSize = {
  name: string;
  width: number;
  height: number;
};

// Service types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ServiceCategory;
  type: "image" | "video" | "text";
}

// History item types
interface HistoryItem {
  id: number;
  type: "image" | "video" | "text";
  thumbnail?: string;
  content?: string;
  title: string;
  date: string;
  serviceId: string;
}

// Result types
interface Result {
  id: number;
  thumbnail: string;
  isCommercial: boolean;
  type: "image" | "video" | "text";
  engagementScore: number;
}

// Before the mock data, add an interface for StockPhoto
interface StockPhoto {
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

// Add this interface for the archive items
interface ArchiveItem extends StockPhoto {
  category: "uploads" | "ai-generated" | "favorites";
  serviceId?: string;
  date: string;
}

// AI Service definitions
const aiServices: Service[] = [
  {
    id: "product-photo",
    title: "Product Photo",
    description: "Turn basic product images into high-quality, professional-looking product photos with one upload.",
    icon: <Wine className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "image-ads",
    title: "Image Ads",
    description: "Create scroll-stopping social media ads by uploading an image and adding optimized headlines.",
    icon: <Image className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "photo-effects",
    title: "Photo Effects",
    description: "Apply AI-powered lighting, shadows, reflections, and stylization effects to enhance your product images.",
    icon: <Sparkles className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "product-video",
    title: "Product Video",
    description: "Convert a single product photo into a smooth, high-quality promotional video with visual effects.",
    icon: <VideoIcon className="h-5 w-5" />,
    category: "video",
    type: "video"
  },
  {
    id: "video-ads",
    title: "Video Ads",
    description: "Generate high-converting, short-form video ads for products using just one image.",
    icon: <Film className="h-5 w-5" />,
    category: "video",
    type: "video"
  },
  {
    id: "stock-images",
    title: "AI Stock Images",
    description: "Generate ultra-realistic, commercially-safe stock images in any style using simple text prompts.",
    icon: <Camera className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "stock-videos",
    title: "Stock Videos",
    description: "Create unique, royalty-free AI-generated stock videos in any style or theme with a text prompt.",
    icon: <Film className="h-5 w-5" />,
    category: "video",
    type: "video"
  },
  {
    id: "url-to-ad-texts",
    title: "URL to Ad Texts",
    description: "Generate persuasive ad copy using proven frameworks by simply entering a webpage URL.",
    icon: <Link className="h-5 w-5" />,
    category: "text",
    type: "text"
  },
  {
    id: "link-to-idea",
    title: "Link to Idea",
    description: "Turn any social media video link into a content idea tailored for your brand.",
    icon: <MessagesSquare className="h-5 w-5" />,
    category: "text",
    type: "text"
  },
  {
    id: "storytelling-videos",
    title: "Storytelling Videos",
    description: "Create narrative-style video ads with custom scenes, storylines, and AI voice-over.",
    icon: <Film className="h-5 w-5" />,
    category: "video",
    type: "video"
  },
  {
    id: "virtual-try-on",
    title: "Virtual Try-On",
    description: "Dress AI-generated models in your product images to instantly visualize and showcase outfits on realistic human figures.",
    icon: <Shirt className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove image backgrounds instantly to isolate products or subjects with precision.",
    icon: <Eraser className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "image-upscaler",
    title: "Image Upscaler",
    description: "Increase image resolution with AI while preserving clarity and detail.",
    icon: <ArrowUpRight className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "face-enhancer",
    title: "Face Enhancer",
    description: "Fix and enhance distorted or low-quality faces in AI-generated or real photos.",
    icon: <User className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "eraser-replacer",
    title: "Eraser & Replacer",
    description: "Easily remove or replace selected parts of an image using AI.",
    icon: <Eraser className="h-5 w-5" />,
    category: "visual",
    type: "image"
  },
  {
    id: "buyer-personas",
    title: "Buyer Personas",
    description: "Generate AI-crafted buyer personas to refine targeting, improve messaging and boost engagement.",
    icon: <User className="h-5 w-5" />,
    category: "text",
    type: "text"
  },
  {
    id: "voice-over",
    title: "Voice-over",
    description: "Convert your text into high-quality, natural-sounding voice-overs using AI.",
    icon: <Mic className="h-5 w-5" />,
    category: "sound",
    type: "text"
  },
]

// Mock assets
const mockImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
const mockVideo = "https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4"

// Add these mock data before the ServiceCard component
const mockKeywords = [
  "Product Lifestyle",
  "Office Environment",
  "Tech Workspace",
  "Team Collaboration",
  "Modern Business",
  "Creative Design"
];

// Update the mockStockPhotos array to use the new interface
const mockStockPhotos: StockPhoto[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  url: mockImage,
  type: i % 4 === 0 ? "square" : i % 4 === 1 ? "portrait" : "landscape",
  width: i % 4 === 0 ? 1080 : i % 4 === 1 ? 1080 : 1920,
  height: i % 4 === 0 ? 1080 : i % 4 === 1 ? 1350 : 1080,
  title: `Sample Photo ${i + 1}`,
  tags: ["sample", "demo", i % 2 === 0 ? "nature" : "business"],
}));

// Add mock data for archive items
const mockArchiveItems: ArchiveItem[] = Array.from({ length: 60 }, (_, i) => {
  const category = i % 3 === 0 ? "uploads" : i % 3 === 1 ? "ai-generated" : "favorites";
  let serviceId = undefined;
  
  // For ai-generated and favorites, assign a random service
  if (category !== "uploads") {
    const services = [
      "product-photo", "image-ads", "photo-effects", "product-video", 
      "video-ads", "stock-images", "stock-videos", "url-to-ad-texts"
    ];
    serviceId = services[Math.floor(Math.random() * services.length)];
  }
  
  // Generate a date within the last 3 months
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 90); // Random days up to 90 days ago
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  
  // Format the date as Month Day, Year
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return {
    id: i + 1,
    url: mockImage,
    type: i % 4 === 0 ? "square" : i % 4 === 1 ? "portrait" : "landscape",
    width: i % 4 === 0 ? 1080 : i % 4 === 1 ? 1080 : 1920,
    height: i % 4 === 0 ? 1080 : i % 4 === 1 ? 1350 : 1080,
    title: `Archive Item ${i + 1}`,
    tags: ["archived", i % 2 === 0 ? "product" : "marketing"],
    category,
    serviceId,
    date: formattedDate
  };
});

const historyItems: HistoryItem[] = [
  { id: 1, type: "image", thumbnail: mockImage, title: "Product Photo", date: "May 10, 2024", serviceId: "product-photo" },
  { id: 2, type: "video", thumbnail: mockImage, title: "Video Ads", date: "May 9, 2024", serviceId: "video-ads" },
  { id: 3, type: "text", content: "Increase your conversion rates with our revolutionary AI-powered marketing solution. Transform your digital presence and engage customers like never before. Our cutting-edge technology delivers personalized experiences that drive results.", title: "URL to Ad Texts", date: "May 8, 2024", serviceId: "url-to-ad-texts" },
  { id: 4, type: "image", thumbnail: mockImage, title: "Stock Images", date: "May 7, 2024", serviceId: "stock-images" },
  { id: 5, type: "image", thumbnail: mockImage, title: "Background Remover", date: "May 6, 2024", serviceId: "background-remover" },
  { id: 6, type: "video", thumbnail: mockImage, title: "Storytelling Videos", date: "May 5, 2024", serviceId: "storytelling-videos" },
  { id: 7, type: "text", content: "Meet Sarah, 34, a dynamic marketing manager who leads digital transformation at a growing e-commerce brand. With 8+ years of experience in digital marketing, she's passionate about data-driven strategies and emerging technologies. Sarah seeks innovative solutions to streamline campaigns and boost ROI.", title: "Buyer Personas", date: "May 4, 2024", serviceId: "buyer-personas" },
  { id: 8, type: "image", thumbnail: mockImage, title: "Product Photo", date: "May 3, 2024", serviceId: "product-photo" },
  { id: 9, type: "video", thumbnail: mockImage, title: "Video Ads", date: "May 2, 2024", serviceId: "video-ads" },
  { id: 10, type: "text", content: "Discover the power of AI-driven marketing automation that transforms your customer engagement. Our platform uses advanced algorithms to analyze customer behavior, optimize touchpoints, and deliver personalized content that resonates with your target audience.", title: "URL to Ad Texts", date: "May 1, 2024", serviceId: "url-to-ad-texts" },
  { id: 11, type: "image", thumbnail: mockImage, title: "Stock Images", date: "April 30, 2024", serviceId: "stock-images" },
  { id: 12, type: "image", thumbnail: mockImage, title: "Background Remover", date: "April 29, 2024", serviceId: "background-remover" },
  { id: 13, type: "video", thumbnail: mockImage, title: "Storytelling Videos", date: "April 28, 2024", serviceId: "storytelling-videos" },
  { id: 14, type: "text", content: "Meet John, 28, an ambitious digital marketer specializing in social media and content strategy. Working at a tech startup, he's focused on building brand awareness through viral campaigns. John is always looking for innovative tools to create engaging content and measure campaign performance effectively.", title: "Buyer Personas", date: "April 27, 2024", serviceId: "buyer-personas" },
  { id: 15, type: "image", thumbnail: mockImage, title: "Product Photo", date: "April 26, 2024", serviceId: "product-photo" },
  { id: 16, type: "video", thumbnail: mockImage, title: "Video Ads", date: "April 25, 2024", serviceId: "video-ads" },
  { id: 17, type: "text", content: "Elevate your brand presence with our cutting-edge AI marketing suite. From personalized content creation to advanced analytics, we provide the tools you need to stand out in today's competitive digital landscape.", title: "URL to Ad Texts", date: "April 24, 2024", serviceId: "url-to-ad-texts" },
  { id: 18, type: "image", thumbnail: mockImage, title: "Stock Images", date: "April 23, 2024", serviceId: "stock-images" },
  { id: 19, type: "video", thumbnail: mockImage, title: "Storytelling Videos", date: "April 22, 2024", serviceId: "storytelling-videos" },
  { id: 20, type: "text", content: "Meet Emma, 31, a creative director at a digital agency. With a keen eye for design and a passion for innovative marketing, she's always seeking new ways to blend creativity with data-driven strategies to deliver impactful campaigns.", title: "Buyer Personas", date: "April 21, 2024", serviceId: "buyer-personas" }
]

// Mock results for Content Generation Area
const mockResults: Result[] = [
  { id: 1, thumbnail: mockImage, isCommercial: true, type: "video" as const, engagementScore: Math.floor(Math.random() * (97 - 80 + 1)) + 80 },
  { id: 2, thumbnail: mockImage, isCommercial: true, type: "video" as const, engagementScore: Math.floor(Math.random() * (97 - 80 + 1)) + 80 },
  { id: 3, thumbnail: mockImage, isCommercial: true, type: "image" as const, engagementScore: Math.floor(Math.random() * (97 - 80 + 1)) + 80 },
  { id: 4, thumbnail: mockImage, isCommercial: true, type: "image" as const, engagementScore: Math.floor(Math.random() * (97 - 80 + 1)) + 80 },
].sort((a, b) => b.engagementScore - a.engagementScore);

// Create separate uploads items that won't appear in the main history items
const uploadItems: HistoryItem[] = [
  { id: 101, type: "image", thumbnail: mockImage, title: "User Photo 1", date: "May 23, 2024", serviceId: "uploads" },
  { id: 102, type: "image", thumbnail: mockImage, title: "User Photo 2", date: "May 22, 2024", serviceId: "uploads" },
  { id: 103, type: "image", thumbnail: mockImage, title: "User Photo 3", date: "May 21, 2024", serviceId: "uploads" },
  { id: 104, type: "image", thumbnail: mockImage, title: "Product Image 1", date: "May 20, 2024", serviceId: "uploads" },
  { id: 105, type: "image", thumbnail: mockImage, title: "Product Image 2", date: "May 19, 2024", serviceId: "uploads" },
  { id: 106, type: "image", thumbnail: mockImage, title: "Marketing Banner", date: "May 18, 2024", serviceId: "uploads" },
  { id: 107, type: "image", thumbnail: mockImage, title: "Team Photo", date: "May 17, 2024", serviceId: "uploads" },
  { id: 108, type: "image", thumbnail: mockImage, title: "Office Interior", date: "May 16, 2024", serviceId: "uploads" },
];

// ServiceCard component for the left panel
function ServiceCard({ 
  service, 
  onSelect, 
  isSelected 
}: { 
  service: Service; 
  onSelect: (service: Service) => void; 
  isSelected: boolean;
}) {
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
          {service.type === "video" ? (
            <video 
              src={mockVideo}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
              loop
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <img 
              src={mockImage} 
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
            />
          )}
        </div>
      </div>
    </Card>
  )
}

// Result card component for the center panel
function ResultCard({ 
  result, 
  onSelect, 
  isSelected 
}: { 
  result: Result; 
  onSelect: (result: Result) => void; 
  isSelected: boolean; 
}) {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <div className="relative group">
      <div className={cn(
        "h-full w-full border border-border/40 rounded-md overflow-hidden transition-all duration-200 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
        isSelected 
          ? "border-2 border-primary shadow-[0_0_0_1px_var(--primary)]" 
          : "hover:border-border/80 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
      )}>
        <div className="aspect-square bg-muted relative">
          {result.type === "video" ? (
            <video 
              src={mockVideo}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <img 
              src={result.thumbnail} 
              alt="Result preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          {result.isCommercial && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Badge variant="secondary" className="text-xs shadow-sm flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Commercially Safe
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="max-w-[200px] text-xs">This content is safe for commercial use and complies with copyright and licensing requirements.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Badge variant="secondary" className="text-xs shadow-sm flex items-center gap-1">
                  <Zap className="h-3 w-3 fill-current" />
                  {result.engagementScore}/100
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="max-w-[200px] text-xs">Based on your data, we believe this output can bring you the best results. Make sure that your colors look good on the template, edit if needed.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
            <Button size="sm" variant="ghost" className="h-7 flex items-center gap-1.5 px-2 hover:bg-accent cursor-pointer">
              <CalendarPlus className="h-4 w-4" />
              <span className="text-xs">Add to Calendar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// History item component for the right panel
function HistoryItem({ 
  item, 
  onClick,
  onDelete 
}: { 
  item: HistoryItem; 
  onClick: (item: HistoryItem) => void;
  onDelete?: (id: number) => void;
}) {
  const service = React.useMemo(() => {
    return aiServices.find(s => s.id === item.serviceId);
  }, [item.serviceId]);

  // Helper function to get icon based on type
  const getTypeIcon = (type: "image" | "video" | "text") => {
    switch (type) {
      case "image":
        return <Image className="h-3 w-3" />;
      case "video":
        return <VideoIcon className="h-3 w-3" />;
      case "text":
        return <FileText className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const truncateText = (text: string, limit: number = 90) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  // Check if this is an uploads item
  const isUpload = item.serviceId === "uploads";

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
          {item.type === "video" ? (
            <video 
              src={mockVideo}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              loop
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <img 
              src={item.thumbnail} 
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          )}
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
  )
}

// Add a new CopyButton component outside the main render function
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip open={open || copied} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{copied ? "Copied!" : "Copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Import new components
import ImageAdsService from "./components/ImageAdsService";
import LinkToIdeaService from "./components/LinkToIdeaService";
import ComingSoonService from "./components/ComingSoonService";

export default function CreatorPage() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("all")
  const [activeHistoryTab, setActiveHistoryTab] = React.useState<HistoryTabValue>("all")
  const [selectedService, setSelectedService] = React.useState<Service | null>(null)
  const [activeStep, setActiveStep] = React.useState(1)
  const [selectedResults, setSelectedResults] = React.useState<number[]>([])
  const [showAllHistory, setShowAllHistory] = React.useState(false)
  const [selectedSize, setSelectedSize] = React.useState<CreativeSize | null>(null);
  const [showCustomPrompt, setShowCustomPrompt] = React.useState(false);
  const [customPrompt, setCustomPrompt] = React.useState("");
  const [displayedPhotos, setDisplayedPhotos] = React.useState(40);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [displayedArchiveItems, setDisplayedArchiveItems] = React.useState(40);
  const [isLoadingMoreArchive, setIsLoadingMoreArchive] = React.useState(false);
  const [activeArchiveFilter, setActiveArchiveFilter] = React.useState<"all" | "uploads" | "favorites">("all");
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState<number | null>(null);
  const [linkInputValue, setLinkInputValue] = React.useState("");
  const [linkStepActive, setLinkStepActive] = React.useState(1);
  const [isGeneratingTranscript, setIsGeneratingTranscript] = React.useState(false);
  const [isGeneratingIdea, setIsGeneratingIdea] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [aiIdea, setAiIdea] = React.useState("");
  
  // Filter services based on active tab
  const filteredServices = React.useMemo(() => {
    if (activeTab === "all") return aiServices
    return aiServices.filter(service => service.category === activeTab)
  }, [activeTab])

  // Update the filtered history items logic to handle uploads separately
  const filteredHistoryItems = React.useMemo(() => {
    let items: HistoryItem[] = [];
    
    if (activeHistoryTab === "uploads") {
      // Show only upload items when the uploads tab is active
      items = uploadItems;
    } else {
      // For all other tabs, use the regular history items
      items = activeHistoryTab === "all" 
        ? historyItems 
        : historyItems.filter(item => item.type === activeHistoryTab);
        
      // Apply favorites filter if active
      if (showFavorites) {
        // For demo purposes, filter to include only even-numbered IDs as "favorites"
        items = items.filter(item => item.id % 2 === 0);
      }
    }
    
    return showAllHistory ? items : items.slice(0, 16);
  }, [activeHistoryTab, showFavorites, showAllHistory]);

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setActiveStep(1)
  }

  // Handle result selection
  const handleResultSelect = (result: Result) => {
    setSelectedResults(prev => {
      if (prev.includes(result.id)) {
        return prev.filter(id => id !== result.id)
      } else {
        return [...prev, result.id]
      }
    })
  }

  // Next step in generation flow
  const handleNextStep = () => {
    setActiveStep(prev => prev + 1)
  }

  // Handle history item click
  const handleHistoryItemClick = (item: HistoryItem) => {
    // Logic to load history item into center panel
    console.log("Loading history item:", item)
  }

  const handleSizeSelect = (size: CreativeSize) => {
    setSelectedSize(size);
  };

  // Inside the CreatorPage component, add a function to determine image type based on dimensions
  const getImageType = (width: number, height: number): "square" | "portrait" | "landscape" => {
    const ratio = width / height;
    if (ratio > 1.2) return "landscape";
    if (ratio < 0.8) return "portrait";
    return "square";
  };

  // In the handle scroll function, update to support Pixabay API loading
  const handleScroll = (event: any) => {
    const scrollElement = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    
    // If we're within 100px of the bottom and not already loading
    if (
      scrollHeight - scrollTop <= clientHeight + 100 && 
      !isLoadingMore && 
      displayedPhotos < mockStockPhotos.length
    ) {
      setIsLoadingMore(true);
      
      // Simulate API call with timeout
      // This will be replaced with actual Pixabay API call
      setTimeout(() => {
        // When integrating with Pixabay, you'll fetch new photos here instead
        // const newPhotos = await fetchPixabayPhotos(page, searchQuery);
        // setPhotos(prev => [...prev, ...newPhotos.map(photo => ({
        //   id: photo.id,
        //   url: photo.webformatURL,
        //   type: getImageType(photo.imageWidth, photo.imageHeight),
        //   width: photo.imageWidth,
        //   height: photo.imageHeight,
        //   title: photo.tags.split(',')[0] || 'Pixabay Photo',
        //   tags: photo.tags.split(','),
        //   author: photo.user,
        //   authorUrl: `https://pixabay.com/users/${photo.user}-${photo.user_id}/`,
        //   sourceUrl: photo.pageURL
        // }))]);
        
        setDisplayedPhotos(prev => Math.min(prev + 20, mockStockPhotos.length));
        setIsLoadingMore(false);
      }, 500);
    }
  };

  // Handle archive scroll for infinite loading
  const handleArchiveScroll = (event: any) => {
    const scrollElement = event.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    
    if (
      scrollHeight - scrollTop <= clientHeight + 100 && 
      !isLoadingMoreArchive && 
      displayedArchiveItems < filteredArchiveItems.length
    ) {
      setIsLoadingMoreArchive(true);
      setTimeout(() => {
        setDisplayedArchiveItems(prev => Math.min(prev + 20, filteredArchiveItems.length));
        setIsLoadingMoreArchive(false);
      }, 500);
    }
  };

  // Filter archive items based on active filter
  const filteredArchiveItems = React.useMemo(() => {
    if (activeArchiveFilter === "all") return mockArchiveItems;
    return mockArchiveItems.filter(item => item.category === activeArchiveFilter);
  }, [activeArchiveFilter]);

  // Add a function to handle item deletion
  const handleDeleteConfirm = () => {
    if (itemToDelete !== null) {
      console.log(`Deleting item with id: ${itemToDelete}`);
      // In a real app, you would remove the item from your database
    }
    // Close the dialog
    setItemToDelete(null);
  };

  // Function to handle URL submission
  const handleLinkSubmit = () => {
    if (!linkInputValue) return;
    setIsGeneratingTranscript(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setTranscript("This is a sample transcript of the video. It would contain the actual content from the video, including all spoken words, key phrases, and important points discussed. The transcript helps in understanding the main topics covered in the video and provides a text-based representation of the audio content. By analyzing this transcript, our AI can identify trends, topics, and opportunities that might be relevant to your brand.\n\nIn a real implementation, this would be the actual transcript extracted from the video URL you provided, processed through speech recognition and text analysis tools to ensure accuracy and completeness.");
      setIsGeneratingTranscript(false);
      setLinkStepActive(2);
    }, 3000);
  };

  // Function to handle idea generation
  const handleGenerateIdea = () => {
    setIsGeneratingIdea(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setAiIdea("Based on the content analysis, here's a tailored content idea for your brand:\n\n\"Innovative Product Showcase Series: Weekly 60-second demonstrations highlighting a single feature of your product in a problem-solution format. Each video addresses a specific pain point mentioned by your customers, shows how your product solves it, and ends with a customer testimonial. This format has been performing exceptionally well in your industry, with 43% higher engagement rates compared to standard promotional content.\"\n\nThis approach leverages the trending short-form educational content style while maintaining your brand's professional tone and focusing on customer-centric messaging that resonates with your target audience.");
      setIsGeneratingIdea(false);
      setLinkStepActive(3);
    }, 3000);
  };

  // Render the appropriate service component based on selected service
  const renderServiceContent = () => {
    if (!selectedService) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-var(--header-height)-17rem)]">
          <div className="text-center">
            <Image className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-4 text-lg font-medium">Select a service</h3>
            <p className="mt-2 text-sm text-muted-foreground">Choose an AI service from the left panel to start creating</p>
          </div>
        </div>
      );
    }

    // Render the appropriate service component based on the selected service ID
    switch (selectedService.id) {
      case "image-ads":
        return (
          <ImageAdsService 
            mockImage={mockImage}
            mockVideo={mockVideo} 
            mockKeywords={mockKeywords}
            mockResults={mockResults}
            mockStockPhotos={mockStockPhotos}
            filteredArchiveItems={filteredArchiveItems}
            aiServices={aiServices}
          />
        );
      case "link-to-idea":
        return <LinkToIdeaService />;
      default:
        return <ComingSoonService service={selectedService} />;
    }
  };

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebarFixed variant="inset" />
        <SidebarInset className="overflow-hidden">
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col">
              <div className="flex flex-col py-6">
                <div className="px-6">
                  {/* Main content grid with 3 panels */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
                    
                    {/* Left Panel - AI-Generated Asset */}
                    <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-4 md:sticky md:top-[calc(var(--header-height)+2rem)] md:h-[calc(100vh-var(--header-height)-10rem)]">
                      <Card className="flex-1 flex flex-col bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle>AI-Generated Asset</CardTitle>
                          <CardDescription>Choose from our creative tools</CardDescription>
                        </CardHeader>
                        <div className="px-4 pb-0">
                          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
                            <TabsList className="grid grid-cols-4">
                              <TabsTrigger value="all" className="cursor-pointer px-1.5">
                                <div className="flex items-center gap-1">
                                  <Grid2X2 className="h-4 w-4" />
                                  <span className="text-xs">All</span>
                                </div>
                              </TabsTrigger>
                              <TabsTrigger value="visual" className="cursor-pointer px-1.5">
                                <div className="flex items-center gap-1">
                                  <Image className="h-4 w-4" />
                                  <span className="text-xs">Visual</span>
                                </div>
                              </TabsTrigger>
                              <TabsTrigger value="video" className="cursor-pointer px-1.5">
                                <div className="flex items-center gap-1">
                                  <VideoIcon className="h-4 w-4" />
                                  <span className="text-xs">Video</span>
                                </div>
                              </TabsTrigger>
                              <TabsTrigger value="text" className="cursor-pointer px-1.5">
                                <div className="flex items-center gap-1">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-xs">Text</span>
                                </div>
                              </TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                        <CardContent className="p-0 pt-0 flex-1 border-t -mt-2 overflow-hidden">
                          <ScrollArea className="h-[calc(100vh-var(--header-height)-20rem)] md:h-[calc(100vh-var(--header-height)-20rem)]">
                            <div className="p-4 flex flex-col gap-2.5">
                              {filteredServices.map((service) => (
                                <ServiceCard 
                                  key={service.id} 
                                  service={service} 
                                  onSelect={handleServiceSelect}
                                  isSelected={selectedService?.id === service.id}
                                />
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="px-4 py-1.5 text-xs text-muted-foreground border-t">
                            {filteredServices.length} services available
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Middle Panel - Content Generation */}
                    <div className="md:col-span-6 lg:col-span-6 flex flex-col gap-4 overflow-auto md:min-h-[calc(100vh-var(--header-height)-7rem)]">
                      <Card className="flex-1 flex flex-col bg-muted/50">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between sticky top-0 backdrop-blur-sm z-10">
                          <div>
                            <CardTitle>{selectedService?.title || "Content Creation"}</CardTitle>
                            <CardDescription>{selectedService?.description || "Select a service to get started"}</CardDescription>
                          </div>
                          {selectedService && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="gap-1">
                                {selectedService.icon}
                                <span>{selectedService.title}</span>
                              </Badge>
                            </div>
                          )}
                        </CardHeader>
                        <CardContent className="flex-1 p-4">
                          {renderServiceContent()}
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Right Panel - Archive */}
                    <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-4 md:sticky md:top-[calc(var(--header-height)+2rem)] md:h-[calc(100vh-var(--header-height)-10rem)]">
                      <Card className="flex-1 flex flex-col bg-muted/50">
                        <CardHeader className="pb-2">
                          <CardTitle>Archive</CardTitle>
                          <CardDescription>Your recent creations</CardDescription>
                        </CardHeader>
                        <div className="px-4 pb-0">
                          <div className="flex items-center gap-2">
                            <Tabs 
                              defaultValue="all" 
                              value={activeHistoryTab} 
                              onValueChange={(value) => setActiveHistoryTab(value as HistoryTabValue)}
                              className="flex-1"
                            >
                              <TabsList className="grid grid-cols-4 w-full">
                                <TabsTrigger value="all" className="cursor-pointer px-1.5">
                                  <div className="flex items-center gap-1">
                                    <Grid2X2 className="h-4 w-4" />
                                    <span className="text-xs">All</span>
                                  </div>
                                </TabsTrigger>
                                <TabsTrigger value="image" className="cursor-pointer px-1.5">
                                  <div className="flex items-center gap-1">
                                    <Image className="h-4 w-4" />
                                    <span className="text-xs">Image</span>
                                  </div>
                                </TabsTrigger>
                                <TabsTrigger value="video" className="cursor-pointer px-1.5">
                                  <div className="flex items-center gap-1">
                                    <VideoIcon className="h-4 w-4" />
                                    <span className="text-xs">Video</span>
                                  </div>
                                </TabsTrigger>
                                <TabsTrigger value="text" className="cursor-pointer px-1.5">
                                  <div className="flex items-center gap-1">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-xs">Text</span>
                                  </div>
                                </TabsTrigger>
                              </TabsList>
                            </Tabs>
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                  "h-8 w-8 p-0 cursor-pointer",
                                  showFavorites && "bg-accent text-primary"
                                )}
                                onClick={() => setShowFavorites(!showFavorites)}
                                disabled={activeHistoryTab === "uploads"}
                              >
                                <Star className={cn(
                                  "h-4 w-4",
                                  showFavorites && "fill-current"
                                )} />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className={cn(
                                  "h-8 w-8 p-0 cursor-pointer",
                                  activeHistoryTab === "uploads" && "bg-accent"
                                )}
                                onClick={() => {
                                  setActiveHistoryTab(activeHistoryTab === "uploads" ? "all" : "uploads");
                                  if (activeHistoryTab !== "uploads") {
                                    setShowFavorites(false); // Reset favorites when switching to uploads
                                  }
                                }}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-0 pt-0 flex-1 border-t -mt-2 overflow-hidden">
                          <ScrollArea className="h-[calc(100vh-var(--header-height)-20rem)]">
                            <div className="p-4">
                              <div className="grid grid-cols-2 gap-3">
                                {filteredHistoryItems.map((item) => (
                                  <HistoryItem 
                                    key={item.id} 
                                    item={item} 
                                    onClick={handleHistoryItemClick}
                                    onDelete={(id) => setItemToDelete(id)}
                                  />
                                ))}
                              </div>
                              {!showAllHistory && (activeHistoryTab === "all" ? historyItems.length > 16 : historyItems.filter(item => item.type === activeHistoryTab).length > 16) && (
                                <div className="mt-4 flex justify-center">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 px-3 text-xs gap-1.5 cursor-pointer"
                                    onClick={() => setShowAllHistory(true)}
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                    Show More
                                  </Button>
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                          <div className="px-4 py-1.5 text-xs text-muted-foreground border-t">
                            {filteredHistoryItems.length} items in archive
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Dialog open={itemToDelete !== null} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setItemToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 