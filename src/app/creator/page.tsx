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
  Plus
} from "lucide-react"

// Type definitions
type ServiceCategory = "visual" | "video" | "text" | "sound";
type TabValue = ServiceCategory | "all";

// Service types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: ServiceCategory;
}

// History item types
interface HistoryItem {
  id: number;
  type: "image" | "video" | "text";
  thumbnail?: string;
  content?: string;
  title: string;
  date: string;
}

// Result types
interface Result {
  id: number;
  thumbnail: string;
  isCommercial: boolean;
}

// AI Service definitions
const aiServices: Service[] = [
  {
    id: "product-photo",
    title: "Product Photo",
    description: "Turn basic product images into high-quality, professional-looking product photos with one upload.",
    icon: <ShoppingBag className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "image-ads",
    title: "Image Ads",
    description: "Create scroll-stopping social media ads by uploading an image and adding optimized headlines.",
    icon: <Megaphone className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "photo-effects",
    title: "Photo Effects",
    description: "Apply AI-powered lighting, shadows, reflections, and stylization effects to enhance your product images.",
    icon: <Sparkles className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "product-video",
    title: "Product Video",
    description: "Convert a single product photo into a smooth, high-quality promotional video with visual effects.",
    icon: <VideoIcon className="h-5 w-5" />,
    category: "video",
  },
  {
    id: "video-ads",
    title: "Video Ads",
    description: "Generate high-converting, short-form video ads for products using just one image.",
    icon: <Film className="h-5 w-5" />,
    category: "video",
  },
  {
    id: "stock-images",
    title: "Stock Images",
    description: "Generate ultra-realistic, commercially-safe stock images in any style using simple text prompts.",
    icon: <Image className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "stock-videos",
    title: "Stock Videos",
    description: "Create unique, royalty-free AI-generated stock videos in any style or theme with a text prompt.",
    icon: <Film className="h-5 w-5" />,
    category: "video",
  },
  {
    id: "url-to-ad-texts",
    title: "URL to Ad Texts",
    description: "Generate persuasive ad copy using proven frameworks by simply entering a webpage URL.",
    icon: <Link className="h-5 w-5" />,
    category: "text",
  },
  {
    id: "link-to-idea",
    title: "Link to Idea",
    description: "Turn any social media video link into a content idea tailored for your brand.",
    icon: <MessagesSquare className="h-5 w-5" />,
    category: "text",
  },
  {
    id: "storytelling-videos",
    title: "Storytelling Videos",
    description: "Create narrative-style video ads with custom scenes, storylines, and AI voice-over.",
    icon: <Film className="h-5 w-5" />,
    category: "video",
  },
  {
    id: "virtual-try-on",
    title: "Virtual Try-On",
    description: "Dress AI-generated models in your product images to instantly visualize and showcase outfits on realistic human figures.",
    icon: <Shirt className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "background-remover",
    title: "Background Remover",
    description: "Remove image backgrounds instantly to isolate products or subjects with precision.",
    icon: <Eraser className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "image-upscaler",
    title: "Image Upscaler",
    description: "Increase image resolution with AI while preserving clarity and detail.",
    icon: <ArrowUpRight className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "face-enhancer",
    title: "Face Enhancer",
    description: "Fix and enhance distorted or low-quality faces in AI-generated or real photos.",
    icon: <User className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "eraser-replacer",
    title: "Eraser & Replacer",
    description: "Easily remove or replace selected parts of an image using AI.",
    icon: <Eraser className="h-5 w-5" />,
    category: "visual",
  },
  {
    id: "buyer-personas",
    title: "Buyer Personas",
    description: "Generate AI-crafted buyer personas to refine targeting, improve messaging and boost engagement.",
    icon: <User className="h-5 w-5" />,
    category: "text",
  },
  {
    id: "voice-over",
    title: "Voice-over",
    description: "Convert your text into high-quality, natural-sounding voice-overs using AI.",
    icon: <Mic className="h-5 w-5" />,
    category: "sound",
  },
]

// Mock data for history panel
const historyItems: HistoryItem[] = [
  { id: 1, type: "image", thumbnail: "/placeholder-image-1.jpg", title: "Product Photo", date: "May 10, 2024" },
  { id: 2, type: "video", thumbnail: "/placeholder-image-2.jpg", title: "Video Ad", date: "May 9, 2024" },
  { id: 3, type: "text", content: "Increase your conversion rates with our...", title: "Ad Copy", date: "May 8, 2024" },
  { id: 4, type: "image", thumbnail: "/placeholder-image-3.jpg", title: "Stock Image", date: "May 7, 2024" },
  { id: 5, type: "image", thumbnail: "/placeholder-image-4.jpg", title: "Background Removal", date: "May 6, 2024" },
  { id: 6, type: "video", thumbnail: "/placeholder-image-5.jpg", title: "Storytelling Video", date: "May 5, 2024" },
  { id: 7, type: "text", content: "Meet Sarah, 34, marketing manager who...", title: "Buyer Persona", date: "May 4, 2024" },
]

// Mock results for Content Generation Area
const mockResults: Result[] = [
  { id: 1, thumbnail: "/placeholder-result-1.jpg", isCommercial: true },
  { id: 2, thumbnail: "/placeholder-result-2.jpg", isCommercial: true },
  { id: 3, thumbnail: "/placeholder-result-3.jpg", isCommercial: true },
  { id: 4, thumbnail: "/placeholder-result-4.jpg", isCommercial: true },
]

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
        "flex flex-row cursor-pointer transition-all duration-200 hover:shadow-md", 
        isSelected ? "border-primary" : ""
      )}
      onClick={() => onSelect(service)}
    >
      <CardContent className="flex flex-1 items-center p-4 gap-3">
        <div className="bg-primary/10 p-2 rounded-md text-primary">
          {service.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">{service.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
        </div>
        <div className="w-12 h-12 rounded-md overflow-hidden relative group">
          <div className="absolute inset-0 bg-muted group-hover:scale-110 transition-transform duration-200"></div>
        </div>
      </CardContent>
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
  return (
    <div className="relative group">
      <div className={cn(
        "h-full w-full border-2 rounded-md overflow-hidden transition-all duration-200",
        isSelected ? "border-primary" : "border-transparent"
      )}>
        <div className="aspect-square bg-muted relative">
          {/* Placeholder for result image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
        </div>
        <div className="absolute top-2 left-2">
          {result.isCommercial && (
            <Badge variant="secondary" className="text-xs">Commercially Safe</Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <div 
            className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center",
              isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30 bg-background"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(result);
            }}
          >
            {isSelected && <Check className="h-3 w-3" />}
          </div>
        </div>
        <div className="p-2 flex gap-1 justify-between">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <CalendarPlus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// History item component for the right panel
function HistoryItem({ 
  item, 
  onClick 
}: { 
  item: HistoryItem; 
  onClick: (item: HistoryItem) => void; 
}) {
  return (
    <div 
      className="w-full aspect-square relative rounded-md overflow-hidden cursor-pointer group"
      onClick={() => onClick(item)}
    >
      {item.type === "text" ? (
        <div className="absolute inset-0 bg-muted p-2 flex items-center justify-center">
          <p className="text-xs text-center line-clamp-5">{item.content}</p>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:scale-105 transition-transform duration-200"></div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-1">
        <p className="text-xs font-medium truncate">{item.title}</p>
      </div>
    </div>
  )
}

export default function CreatorPage() {
  const [activeTab, setActiveTab] = React.useState<TabValue>("all")
  const [selectedService, setSelectedService] = React.useState<Service | null>(null)
  const [activeStep, setActiveStep] = React.useState(1)
  const [selectedResults, setSelectedResults] = React.useState<number[]>([])
  
  // Filter services based on active tab
  const filteredServices = React.useMemo(() => {
    if (activeTab === "all") return aiServices
    return aiServices.filter(service => service.category === activeTab)
  }, [activeTab])

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
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div className="px-4 lg:px-6">
                  {/* Main content grid with 3 panels */}
                  <div className="grid grid-cols-12 gap-4 h-[calc(100vh-var(--header-height)-2rem)]">
                    
                    {/* Left Panel - AI-Generated Asset */}
                    <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-4">
                      <Card className="flex-1 flex flex-col">
                        <CardHeader className="pb-2">
                          <CardTitle>AI-Generated Asset</CardTitle>
                          <CardDescription>Choose from our creative tools</CardDescription>
                        </CardHeader>
                        <div className="px-4 pb-2">
                          <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)}>
                            <TabsList className="grid grid-cols-4 mb-2">
                              <TabsTrigger value="all">All</TabsTrigger>
                              <TabsTrigger value="visual"><Image className="h-4 w-4" /></TabsTrigger>
                              <TabsTrigger value="video"><VideoIcon className="h-4 w-4" /></TabsTrigger>
                              <TabsTrigger value="text"><FileText className="h-4 w-4" /></TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                        <CardContent className="p-0 pt-0 flex-1">
                          <ScrollArea className="h-[calc(100vh-var(--header-height)-12rem)]">
                            <div className="p-4 flex flex-col gap-3">
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
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Middle Panel - Content Generation */}
                    <div className="col-span-12 md:col-span-6 lg:col-span-7 flex flex-col gap-4">
                      <Card className="flex-1 flex flex-col">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
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
                          {!selectedService ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="text-center">
                                <Image className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                                <h3 className="mt-4 text-lg font-medium">Select a service</h3>
                                <p className="mt-2 text-sm text-muted-foreground">Choose an AI service from the left panel to start creating</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-4">
                              {/* Step 1: Select Creative Size */}
                              <Collapsible
                                open={activeStep === 1}
                                onOpenChange={(open: boolean) => open && setActiveStep(1)}
                                className="border rounded-lg"
                              >
                                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">1</div>
                                    <h3 className="font-medium">Select Creative Size</h3>
                                  </div>
                                  {activeStep === 1 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-4 pb-4 pt-0">
                                  <div className="grid grid-cols-3 gap-2">
                                    <Button variant="outline" className="flex flex-col h-auto py-3 px-4 justify-center items-center gap-1">
                                      <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                                        <div className="w-6 h-8 bg-primary/80 rounded" />
                                      </div>
                                      <span className="text-xs font-medium">Instagram Feed</span>
                                      <span className="text-xs text-muted-foreground">1:1</span>
                                    </Button>
                                    <Button variant="outline" className="flex flex-col h-auto py-3 px-4 justify-center items-center gap-1">
                                      <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                                        <div className="w-4 h-8 bg-primary/80 rounded" />
                                      </div>
                                      <span className="text-xs font-medium">Instagram Story</span>
                                      <span className="text-xs text-muted-foreground">9:16</span>
                                    </Button>
                                    <Button variant="outline" className="flex flex-col h-auto py-3 px-4 justify-center items-center gap-1">
                                      <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                                        <div className="w-8 h-6 bg-primary/80 rounded" />
                                      </div>
                                      <span className="text-xs font-medium">Facebook Ad</span>
                                      <span className="text-xs text-muted-foreground">16:9</span>
                                    </Button>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <Button onClick={handleNextStep}>Next</Button>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                              
                              {/* Step 2: Choose Image */}
                              <Collapsible
                                open={activeStep === 2}
                                onOpenChange={(open: boolean) => open && setActiveStep(2)}
                                className="border rounded-lg"
                              >
                                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">2</div>
                                    <h3 className="font-medium">Choose Image</h3>
                                  </div>
                                  {activeStep === 2 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-4 pb-4 pt-0">
                                  <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-2">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                      <Image className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-medium">Upload your image</h3>
                                    <p className="text-sm text-center text-muted-foreground max-w-md">
                                      Drag and drop your image here, or click to select from your device
                                    </p>
                                    <Button className="mt-2">
                                      <Image className="h-4 w-4 mr-2" />
                                      Select Image
                                    </Button>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <Button onClick={handleNextStep}>Next</Button>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                              
                              {/* Step 3: On Image Texts */}
                              <Collapsible
                                open={activeStep === 3}
                                onOpenChange={(open: boolean) => open && setActiveStep(3)}
                                className="border rounded-lg"
                              >
                                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">3</div>
                                    <h3 className="font-medium">On Image Texts</h3>
                                  </div>
                                  {activeStep === 3 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-4 pb-4 pt-0">
                                  <div className="flex flex-col gap-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Headline</label>
                                      <input
                                        type="text"
                                        placeholder="Add a persuasive headline"
                                        className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Subtitle</label>
                                      <input
                                        type="text"
                                        placeholder="Add a supporting subtitle"
                                        className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium">Call to Action</label>
                                      <input
                                        type="text"
                                        placeholder="Add a call to action"
                                        className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background"
                                      />
                                    </div>
                                  </div>
                                  <div className="mt-4 flex justify-end">
                                    <Button onClick={handleNextStep}>Generate Results</Button>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                              
                              {/* Step 4: Results */}
                              <Collapsible
                                open={activeStep === 4}
                                onOpenChange={(open: boolean) => open && setActiveStep(4)}
                                className="border rounded-lg"
                              >
                                <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                                  <div className="flex items-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm font-medium">4</div>
                                    <h3 className="font-medium">Results</h3>
                                  </div>
                                  {activeStep === 4 ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                </CollapsibleTrigger>
                                <CollapsibleContent className="px-4 pb-4 pt-0">
                                  <div className="grid grid-cols-2 gap-4">
                                    {mockResults.map((result) => (
                                      <ResultCard
                                        key={result.id}
                                        result={result}
                                        isSelected={selectedResults.includes(result.id)}
                                        onSelect={() => handleResultSelect(result)}
                                      />
                                    ))}
                                  </div>
                                  <div className="mt-6 flex justify-center">
                                    <Button className="w-full" variant="outline">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Generate More
                                    </Button>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Right Panel - History */}
                    <div className="col-span-12 md:col-span-3 lg:col-span-3 flex flex-col gap-4">
                      <Card className="flex-1 flex flex-col">
                        <CardHeader className="pb-2">
                          <CardTitle>History</CardTitle>
                          <CardDescription>Your recent creations</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 flex-1">
                          <ScrollArea className="h-[calc(100vh-var(--header-height)-12rem)]">
                            <div className="p-4">
                              <div className="grid grid-cols-2 gap-3">
                                {historyItems.map((item) => (
                                  <HistoryItem 
                                    key={item.id} 
                                    item={item} 
                                    onClick={handleHistoryItemClick} 
                                  />
                                ))}
                              </div>
                            </div>
                          </ScrollArea>
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
    </>
  )
} 