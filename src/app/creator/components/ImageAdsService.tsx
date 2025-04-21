import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  Ruler,
  Upload,
  Type,
  Layers,
  Grid2X2,
  Search,
  Star,
  Download,
  Sparkles,
  PenLine,
  Plus,
  ArrowRight,
  Wand2,
} from "lucide-react"

// Import types
import { 
  ArchiveFilterValue, 
  ArchiveItem, 
  CreativeSize, 
  ImageAdsServiceProps, 
  Result,
  StockPhoto
} from "../types"

// Import common components
import { ResultCard } from "./common/ResultCard"
import { StepSection } from "./common/StepSection"
import { MediaContent } from "./common/MediaContent"

// Import helpers
import { sortByDateDesc, handleInfiniteScroll } from "../utils/helpers"

export default function ImageAdsService({ 
  mockImage, 
  mockVideo, 
  mockKeywords, 
  mockResults, 
  mockStockPhotos,
  filteredArchiveItems,
  aiServices
}: ImageAdsServiceProps) {
  // State
  const [activeStep, setActiveStep] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<CreativeSize | null>(null);
  const [showCustomPrompt, setShowCustomPrompt] = React.useState(false);
  const [customPrompt, setCustomPrompt] = React.useState("");
  const [selectedResults, setSelectedResults] = React.useState<number[]>([]);
  const [displayedPhotos, setDisplayedPhotos] = React.useState(40);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);
  const [displayedArchiveItems, setDisplayedArchiveItems] = React.useState(40);
  const [isLoadingMoreArchive, setIsLoadingMoreArchive] = React.useState(false);
  const [activeArchiveFilter, setActiveArchiveFilter] = React.useState<ArchiveFilterValue>("all");
  const [favoriteStockPhotos, setFavoriteStockPhotos] = React.useState<number[]>([]);
  const [archiveFavorites, setArchiveFavorites] = React.useState<number[]>([]);

  // Filter archive items based on active filter
  const filteredArchiveItemsByCategory = React.useMemo(() => {
    let filteredItems;
    if (activeArchiveFilter === "all") {
      filteredItems = filteredArchiveItems;
    } else if (activeArchiveFilter === "uploads") {
      filteredItems = filteredArchiveItems.filter(item => item.category === "uploads");
    } else if (activeArchiveFilter === "favorites") {
      filteredItems = filteredArchiveItems.filter(item => item.category === "favorites");
    } else {
      filteredItems = filteredArchiveItems;
    }
    
    // Sort by date - most recent first
    return sortByDateDesc(filteredItems);
  }, [filteredArchiveItems, activeArchiveFilter]);

  // Event handlers
  const handleSizeSelect = (size: CreativeSize) => {
    setSelectedSize(size);
  };

  const handleNextStep = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleResultSelect = (result: Result) => {
    setSelectedResults(prev => {
      if (prev.includes(result.id)) {
        return prev.filter(id => id !== result.id);
      } else {
        return [...prev, result.id];
      }
    });
  };

  const handleStepToggle = (stepIndex: number, isOpen: boolean) => {
    if (isOpen) {
      setActiveStep(stepIndex);
    }
  };

  const handleArchiveScroll = (event: React.UIEvent<HTMLDivElement>) => {
    handleInfiniteScroll(
      event,
      isLoadingMoreArchive, 
      displayedArchiveItems, 
      filteredArchiveItems.length,
      (count) => {
        setIsLoadingMoreArchive(true);
        setTimeout(() => {
          setDisplayedArchiveItems(count);
          setIsLoadingMoreArchive(false);
        }, 500);
      }
    );
  };

  const handlePhotoScroll = (event: React.UIEvent<HTMLDivElement>) => {
    handleInfiniteScroll(
      event,
      isLoadingMore,
      displayedPhotos,
      mockStockPhotos.length,
      (count) => {
        setIsLoadingMore(true);
        setTimeout(() => {
          setDisplayedPhotos(count);
          setIsLoadingMore(false);
        }, 500);
      }
    );
  };

  // Toggle favorite status for archive items
  const toggleArchiveFavorite = (itemId: number, currentCategory: string) => {
    // If item is already a favorite, remove it from favorites
    if (currentCategory === "favorites") {
      // In a real app, you would make an API call here to update the item's category
      console.log('Removing from favorites:', itemId);
      return;
    }
    
    // If item is not a favorite, add it to favorites
    if (currentCategory !== "uploads") {
      // In a real app, you would make an API call here to update the item's category
      console.log('Adding to favorites:', itemId);
      setArchiveFavorites(prev => [...prev, itemId]);
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Step 1: Select Creative Size */}
      <StepSection
        title="Select Creative Size"
        icon={<Ruler className="h-4 w-4" />}
        isActive={activeStep === 1}
        stepNumber={1}
        totalSteps={4}
        onToggle={(open) => handleStepToggle(1, open)}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { name: "Post Size", width: 1080, height: 1080 },
            { name: "Landscape Size", width: 1200, height: 628 },
            { name: "Story Size", width: 1080, height: 1920 },
            { name: "Portrait Size", width: 1080, height: 1350 },
          ].map((size) => (
            <Button
              key={size.name}
              variant="outline"
              className={cn(
                "flex flex-col h-auto py-3 px-2 justify-center items-center gap-1 relative group cursor-pointer",
                selectedSize?.name === size.name && "border-primary bg-primary/5"
              )}
              onClick={() => handleSizeSelect(size)}
            >
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <div className={cn(
                  "bg-primary/80 rounded transition-transform duration-200",
                  size.name === "Post Size" && "w-8 h-8",
                  size.name === "Landscape Size" && "w-10 h-6",
                  size.name === "Story Size" && "w-4 h-8",
                  size.name === "Portrait Size" && "w-6 h-8",
                  selectedSize?.name === size.name && "scale-105"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium",
                selectedSize?.name === size.name && "text-primary"
              )}>{size.name}</span>
              <span className="text-xs text-muted-foreground">{size.width} x {size.height}</span>
              {selectedSize?.name === size.name && (
                <div className="absolute inset-0 border-2 border-primary rounded-md pointer-events-none" />
              )}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleNextStep}
            disabled={!selectedSize}
            className="cursor-pointer group"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </StepSection>
      
      {/* Step 2: Choose Image */}
      <StepSection
        title="Choose Image"
        icon={<Upload className="h-4 w-4" />}
        isActive={activeStep === 2}
        stepNumber={2}
        totalSteps={4}
        onToggle={(open) => handleStepToggle(2, open)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="grid grid-cols-3 gap-4 flex-1">
            <div className="border-2 border-dashed rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group">
              <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-medium text-center">Upload Image</h3>
              <p className="text-xs text-center text-muted-foreground">
                Upload your own image
              </p>
            </div>

            {/* Archive Option */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-center">From Archive</h3>
                  <p className="text-xs text-center text-muted-foreground">
                    Select from your archived assets
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Archive</DialogTitle>
                  <DialogDescription>
                    Browse and filter your archived assets
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <Tabs 
                    defaultValue="all" 
                    value={activeArchiveFilter} 
                    onValueChange={(value) => setActiveArchiveFilter(value as ArchiveFilterValue)}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="all" className="cursor-pointer px-1.5">
                        <div className="flex items-center gap-1">
                          <Grid2X2 className="h-4 w-4" />
                          <span className="text-xs">All</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="favorites" className="cursor-pointer px-1.5">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span className="text-xs">Favorites</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="uploads" className="cursor-pointer px-1.5">
                        <div className="flex items-center gap-1">
                          <Upload className="h-4 w-4" />
                          <span className="text-xs">Uploads</span>
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <ScrollArea 
                    className="h-[60vh] max-h-[calc(80vh-14rem)] md:h-[calc(80vh-12rem)] pr-4"
                    onScrollCapture={handleArchiveScroll}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[160px]">
                      {filteredArchiveItemsByCategory.slice(0, displayedArchiveItems).map((item) => {
                        const rowSpan = item.type === "portrait" ? "row-span-2" : "row-span-1";
                        const isFavorite = item.category === "favorites" || archiveFavorites.includes(item.id);
                        
                        // Get service details from aiServices if available
                        const service = item.serviceId ? aiServices.find(s => s.id === item.serviceId) : null;
                        
                        return (
                          <div
                            key={item.id}
                            className={cn(
                              "relative rounded-lg overflow-hidden cursor-pointer group",
                              rowSpan
                            )}
                          >
                            <img
                              src={item.url}
                              alt={item.title || `Archive item ${item.id}`}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge variant="secondary" className="text-xs shadow-sm flex items-center gap-1 bg-background/80 backdrop-blur-sm">
                                {item.category === "uploads" ? (
                                  <>
                                    <Upload className="h-3 w-3" />
                                    <span>Uploads</span>
                                  </>
                                ) : service ? (
                                  <>
                                    {service.icon}
                                    <span>{service.title}</span>
                                  </>
                                ) : item.category === "favorites" ? (
                                  <>
                                    <Star className="h-3 w-3 fill-current" />
                                    <span>Favorites</span>
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="h-3 w-3" />
                                    <span>AI Generated</span>
                                  </>
                                )}
                              </Badge>
                            </div>
                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md">
                              {item.date}
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button variant="secondary" size="sm" className="cursor-pointer">
                                Select
                              </Button>
                              {item.category !== "uploads" && (
                                <Button 
                                  variant="secondary" 
                                  size="icon" 
                                  className={cn(
                                    "h-8 w-8 cursor-pointer",
                                    isFavorite && "text-primary"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleArchiveFavorite(item.id, item.category);
                                  }}
                                >
                                  <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
                                </Button>
                              )}
                              <Button variant="secondary" size="icon" className="h-8 w-8 cursor-pointer">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {isLoadingMoreArchive && (
                      <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    )}
                    {filteredArchiveItemsByCategory.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="bg-muted/50 p-4 rounded-full mb-3">
                          {activeArchiveFilter === "uploads" ? (
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          ) : activeArchiveFilter === "favorites" ? (
                            <Star className="h-6 w-6 text-muted-foreground" />
                          ) : (
                            <Layers className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <h3 className="text-sm font-medium mb-1">No items found</h3>
                        <p className="text-xs text-muted-foreground max-w-xs">
                          {activeArchiveFilter === "uploads" 
                            ? "You haven't uploaded any images yet." 
                            : activeArchiveFilter === "favorites" 
                              ? "You haven't favorited any images yet."
                              : "Your archive is empty."}
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>

            {/* Stock Photos Option */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="bg-primary/10 p-4 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-center">Stock Photos</h3>
                  <p className="text-xs text-center text-muted-foreground">
                    Browse our stock photo library
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Stock Photos</DialogTitle>
                  <DialogDescription>
                    Search from our curated collection of stock photos
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search stock photos..." 
                      className="pl-9"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {mockKeywords.map((keyword) => (
                      <Button
                        key={keyword}
                        variant="outline"
                        size="sm"
                        className="text-xs cursor-pointer"
                      >
                        {keyword}
                      </Button>
                    ))}
                  </div>
                  <ScrollArea 
                    className="h-[60vh] max-h-[calc(80vh-14rem)] md:h-[calc(80vh-12rem)] pr-4"
                    onScrollCapture={handlePhotoScroll}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[160px]">
                      {mockStockPhotos
                        .slice(0, displayedPhotos)
                        .sort((a, b) => b.id - a.id) // Sort by id in descending order (newest first)
                        .map((photo) => {
                          // Dynamically determine the row span based on image dimensions
                          const rowSpan = photo.type === "portrait" ? "row-span-2" : "row-span-1";
                          const isFavorite = favoriteStockPhotos.includes(photo.id);
                          
                          return (
                            <div
                              key={photo.id}
                              className={cn(
                                "relative rounded-lg overflow-hidden cursor-pointer group",
                                rowSpan
                              )}
                            >
                              <img
                                src={photo.url}
                                alt={photo.title || `Stock photo ${photo.id}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                                loading="lazy"
                              />
                              {photo.author && (
                                <div className="absolute top-2 left-2 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                  {photo.author}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="secondary" size="sm" className="cursor-pointer">
                                  Select
                                </Button>
                                <Button 
                                  variant="secondary" 
                                  size="icon" 
                                  className={cn(
                                    "h-8 w-8 cursor-pointer",
                                    isFavorite && "text-primary"
                                  )}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setFavoriteStockPhotos(prev => 
                                      prev.includes(photo.id) 
                                        ? prev.filter(id => id !== photo.id) 
                                        : [...prev, photo.id]
                                    );
                                  }}
                                >
                                  <Star className={cn("h-4 w-4", isFavorite && "fill-current")} />
                                </Button>
                                <Button variant="secondary" size="icon" className="h-8 w-8 cursor-pointer">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {isLoadingMore && (
                      <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleNextStep} className="cursor-pointer group">
            Next
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </StepSection>
      
      {/* Step 3: On Image Texts */}
      <StepSection
        title="On Image Texts"
        icon={<Type className="h-4 w-4" />}
        isActive={activeStep === 3}
        stepNumber={3}
        totalSteps={4}
        onToggle={(open) => handleStepToggle(3, open)}
      >
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              {showCustomPrompt && (
                <div className="animate-in slide-in-from-top duration-200">
                  <label className="text-sm font-medium mb-1.5 block">Custom Prompt</label>
                  <textarea
                    placeholder="Describe what kind of text you want (e.g., 'Write a persuasive ad copy for a summer sale campaign targeting young professionals, emphasizing eco-friendly products')"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background min-h-[100px]"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 h-9 text-sm cursor-pointer group"
                  onClick={() => {
                    // Handle AI text generation
                    console.log('Generating AI texts with prompt:', customPrompt);
                  }}
                >
                  Generate texts with AI
                  <Sparkles className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0 cursor-pointer"
                  onClick={() => setShowCustomPrompt(!showCustomPrompt)}
                >
                  <PenLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
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
          
          <div className="w-72 flex flex-col gap-3">
            <div className="aspect-square bg-muted rounded-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="bg-background/80 backdrop-blur-sm text-sm font-medium p-2 rounded-md shadow-sm">
                    Your Headline Here
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm text-xs text-muted-foreground p-2 rounded-md shadow-sm">
                    Your Subtitle Here
                  </div>
                </div>
                <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-md w-fit shadow-sm">
                  Your CTA Here
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-right">Example Preview</div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button onClick={handleNextStep} className="cursor-pointer group">
            Generate Results
            <Wand2 className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
          </Button>
        </div>
      </StepSection>
      
      {/* Step 4: Results */}
      <StepSection
        title="Results"
        icon={<Layers className="h-4 w-4" />}
        isActive={activeStep === 4}
        stepNumber={4}
        totalSteps={4}
        onToggle={(open) => handleStepToggle(4, open)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockResults
            .sort((a, b) => b.id - a.id) // Sort by ID in descending order (newest first)
            .map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                isSelected={selectedResults.includes(result.id)}
                onSelect={() => handleResultSelect(result)}
              />
            ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline" 
            className="w-full max-w-sm cursor-pointer" 
            onClick={() => {
              // Handle generate more
              console.log('Generating more results');
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Generate More
          </Button>
        </div>
      </StepSection>
    </div>
  );
} 