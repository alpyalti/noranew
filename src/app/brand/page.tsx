"use client"

import * as React from "react"
import { AppSidebarFixed } from "@/components/app-sidebar-fixed"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, X, Search, Wand2, Save, Globe2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Sample data for demo
const industries = [
  "Technology",
  "E-commerce",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Marketing",
  "Media",
  "Travel",
  "Food & Beverage",
  "Real Estate",
  "Entertainment",
  "Automotive",
  "Fashion",
  "Art & Design",
  "Sports",
  "Consulting",
  "Legal Services",
  "Agriculture"
];

const countries = [
  { name: "United States", code: "US" },
  { name: "United Kingdom", code: "GB" },
  { name: "Canada", code: "CA" },
  { name: "Australia", code: "AU" },
  { name: "Germany", code: "DE" },
  { name: "France", code: "FR" },
  { name: "Japan", code: "JP" },
  { name: "China", code: "CN" },
  { name: "India", code: "IN" },
  { name: "Brazil", code: "BR" },
  { name: "Mexico", code: "MX" },
  { name: "South Africa", code: "ZA" },
  { name: "Turkey", code: "TR" },
  { name: "Russia", code: "RU" },
  { name: "Italy", code: "IT" },
  { name: "Spain", code: "ES" },
  { name: "Netherlands", code: "NL" },
  { name: "Sweden", code: "SE" },
  { name: "Singapore", code: "SG" },
  { name: "UAE", code: "AE" }
];

const socialMediaPlatforms = [
  { name: "Facebook", value: "facebook" },
  { name: "Instagram", value: "instagram" },
  { name: "Twitter/X", value: "twitter" },
  { name: "LinkedIn", value: "linkedin" },
  { name: "YouTube", value: "youtube" },
  { name: "TikTok", value: "tiktok" }
];

const ageRanges = [
  { label: "Under 18", value: "under_18" },
  { label: "18-24", value: "18_24" },
  { label: "25-34", value: "25_34" },
  { label: "35-44", value: "35_44" },
  { label: "45-54", value: "45_54" },
  { label: "55-64", value: "55_64" },
  { label: "65+", value: "65_plus" }
];

export default function BrandDetailsPage() {
  // State variables
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [brandName, setBrandName] = React.useState("Acme Corporation");
  const [brandDescription, setBrandDescription] = React.useState("A global technology company specializing in innovative solutions for business automation and productivity enhancement.");
  const [selectedIndustries, setSelectedIndustries] = React.useState(["Technology", "Software"]);
  const [industryInput, setIndustryInput] = React.useState("");
  const [filteredIndustries, setFilteredIndustries] = React.useState(industries);
  const [selectedRegions, setSelectedRegions] = React.useState([{ name: "United States", code: "US" }, { name: "Canada", code: "CA" }]);
  const [isGlobal, setIsGlobal] = React.useState(false);
  const [countrySearch, setCountrySearch] = React.useState("");
  const [filteredCountries, setFilteredCountries] = React.useState(countries);
  const [selectedAgeRanges, setSelectedAgeRanges] = React.useState(["25_34", "35_44"]);
  const [selectedSocialMedia, setSelectedSocialMedia] = React.useState(["facebook", "instagram", "linkedin"]);
  const [competitors, setCompetitors] = React.useState(["CompetitorX", "CompetitorY", "CompetitorZ"]);
  const [competitorInput, setCompetitorInput] = React.useState("");
  const [hasChanges, setHasChanges] = React.useState(false);
  const [initialData, setInitialData] = React.useState({});

  // Store initial data for change detection
  React.useEffect(() => {
    setInitialData({
      brandName,
      brandDescription,
      selectedIndustries,
      selectedRegions,
      isGlobal,
      selectedAgeRanges,
      selectedSocialMedia,
      competitors
    });
  }, []);

  // Check for changes
  React.useEffect(() => {
    const currentData = {
      brandName,
      brandDescription,
      selectedIndustries,
      selectedRegions,
      isGlobal,
      selectedAgeRanges,
      selectedSocialMedia,
      competitors
    };
    
    setHasChanges(JSON.stringify(currentData) !== JSON.stringify(initialData));
  }, [
    brandName,
    brandDescription,
    selectedIndustries,
    selectedRegions,
    isGlobal,
    selectedAgeRanges,
    selectedSocialMedia,
    competitors,
    initialData
  ]);

  // Filter industries based on input
  React.useEffect(() => {
    if (industryInput.trim() === "") {
      setFilteredIndustries(industries);
    } else {
      setFilteredIndustries(
        industries.filter(industry => 
          industry.toLowerCase().includes(industryInput.toLowerCase())
        )
      );
    }
  }, [industryInput]);

  // Filter countries based on search
  React.useEffect(() => {
    if (countrySearch.trim() === "") {
      setFilteredCountries(countries);
    } else {
      setFilteredCountries(
        countries.filter(country => 
          country.name.toLowerCase().includes(countrySearch.toLowerCase())
        )
      );
    }
  }, [countrySearch]);

  // Handle adding an industry
  const handleAddIndustry = (industry: string) => {
    if (industry && !selectedIndustries.includes(industry)) {
      setSelectedIndustries([...selectedIndustries, industry]);
      setIndustryInput("");
    }
  };

  // Handle removing an industry
  const handleRemoveIndustry = (industry: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
  };

  // Handle adding a competitor
  const handleAddCompetitor = () => {
    if (competitorInput.trim() && !competitors.includes(competitorInput.trim())) {
      setCompetitors([...competitors, competitorInput.trim()]);
      setCompetitorInput("");
    }
  };

  // Handle removing a competitor
  const handleRemoveCompetitor = (competitor: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompetitors(competitors.filter(c => c !== competitor));
  };

  // Handle region selection
  const handleRegionSelect = (country: typeof countries[0]) => {
    if (isGlobal) {
      setIsGlobal(false);
    }
    
    if (!selectedRegions.some(r => r.code === country.code)) {
      setSelectedRegions([...selectedRegions, country]);
    }
    
    setCountrySearch("");
  };

  // Handle removing a region
  const handleRemoveRegion = (code: string) => {
    setSelectedRegions(selectedRegions.filter(r => r.code !== code));
  };

  // Handle global toggle
  const handleGlobalToggle = () => {
    setIsGlobal(!isGlobal);
    if (!isGlobal) {
      setSelectedRegions([]);
    }
  };

  // Handle age range selection
  const handleAgeRangeToggle = (value: string) => {
    if (selectedAgeRanges.includes(value)) {
      setSelectedAgeRanges(selectedAgeRanges.filter(r => r !== value));
    } else {
      setSelectedAgeRanges([...selectedAgeRanges, value]);
    }
  };

  // Handle social media selection
  const handleSocialMediaToggle = (value: string) => {
    if (selectedSocialMedia.includes(value)) {
      setSelectedSocialMedia(selectedSocialMedia.filter(s => s !== value));
    } else {
      setSelectedSocialMedia([...selectedSocialMedia, value]);
    }
  };

  // Handle auto-fill with AI
  const handleAutoFill = async () => {
    if (!websiteUrl) return;
    
    setLoading(true);
    
    try {
      // Simulating API call to analyze website
      setTimeout(() => {
        setBrandName("TechPro Solutions");
        setBrandDescription("TechPro Solutions is a leading provider of cloud-based software solutions for enterprise resource planning and customer relationship management. With over 15 years of industry experience, we help businesses streamline operations, improve productivity, and drive growth through innovative technology.");
        setSelectedIndustries(["Technology", "Software", "Cloud Services"]);
        setSelectedRegions([
          { name: "United States", code: "US" },
          { name: "United Kingdom", code: "GB" },
          { name: "Germany", code: "DE" }
        ]);
        setIsGlobal(false);
        setSelectedAgeRanges(["25_34", "35_44", "45_54"]);
        setSelectedSocialMedia(["linkedin", "twitter", "facebook", "youtube"]);
        setCompetitors(["Salesforce", "Microsoft", "Oracle", "SAP"]);
        setLoading(false);
        setHasChanges(true);
      }, 2000);
    } catch (error) {
      console.error("Error auto-filling brand details", error);
      setLoading(false);
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // In a real app, this would send data to an API
    setInitialData({
      brandName,
      brandDescription,
      selectedIndustries,
      selectedRegions,
      isGlobal,
      selectedAgeRanges,
      selectedSocialMedia,
      competitors
    });
    setHasChanges(false);
  };

  return (
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
                <h1 className="text-2xl font-semibold mb-2">Brand Details</h1>
                <p className="text-muted-foreground mb-6">
                  Manage your brand information and preferences
                </p>
                
                {/* Auto-fill Card */}
                <Card className="mb-6 data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                  <CardHeader>
                    <CardTitle>Auto-fill from Website</CardTitle>
                    <CardDescription>
                      Enter your company website URL to automatically populate brand details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleAutoFill} 
                        disabled={!websiteUrl || loading}
                        className="gap-2 cursor-pointer"
                      >
                        {loading ? "Analyzing..." : "Auto-fill with AI"}
                        <Wand2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Brand Information Form */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Basic Information */}
                  <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Essential details about your brand
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand-name">Brand Name</Label>
                        <Input
                          id="brand-name"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand-description">Brand Description</Label>
                        <Textarea
                          id="brand-description"
                          value={brandDescription}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBrandDescription(e.target.value)}
                          rows={5}
                          className="resize-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Industry/Sector</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedIndustries.map(industry => (
                            <div key={industry} className="flex items-center">
                              <Badge variant="secondary" className="gap-1 px-2 py-1">
                                <span>{industry}</span>
                                <button 
                                  type="button"
                                  onClick={() => setSelectedIndustries(selectedIndustries.filter(i => i !== industry))}
                                  className="ml-1 focus:outline-none"
                                >
                                  <X className="h-3 w-3 cursor-pointer" />
                                </button>
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <div className="relative">
                          <Input
                            placeholder="Add industry..."
                            value={industryInput}
                            onChange={(e) => setIndustryInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddIndustry(industryInput);
                              }
                            }}
                          />
                          {industryInput && (
                            <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-popover border rounded-md shadow-md">
                              <ScrollArea className="h-full max-h-48">
                                <div className="p-2 space-y-1">
                                  {filteredIndustries.map(industry => (
                                    <div
                                      key={industry}
                                      className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded"
                                      onClick={() => handleAddIndustry(industry)}
                                    >
                                      {industry}
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Competitors */}
                  <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                    <CardHeader>
                      <CardTitle>Competitors</CardTitle>
                      <CardDescription>
                        Add your main competitors to improve content targeting
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Competitor Companies</Label>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {competitors.map(competitor => (
                              <div key={competitor} className="flex items-center">
                                <Badge variant="outline" className="gap-1 px-2 py-1">
                                  <span>{competitor}</span>
                                  <button 
                                    type="button"
                                    onClick={() => setCompetitors(competitors.filter(c => c !== competitor))}
                                    className="ml-1 focus:outline-none"
                                  >
                                    <X className="h-3 w-3 cursor-pointer" />
                                  </button>
                                </Badge>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add competitor..."
                              value={competitorInput}
                              onChange={(e) => setCompetitorInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddCompetitor();
                                }
                              }}
                              className="flex-1"
                            />
                            <Button 
                              variant="outline" 
                              onClick={handleAddCompetitor}
                              disabled={!competitorInput.trim()}
                              className="cursor-pointer"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Target Regions */}
                  <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                    <CardHeader>
                      <CardTitle>Target Regions</CardTitle>
                      <CardDescription>
                        Select countries or regions for your marketing efforts
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant={isGlobal ? "default" : "outline"}
                          size="sm"
                          onClick={handleGlobalToggle}
                          className="gap-2 cursor-pointer"
                        >
                          <Globe2 className="h-4 w-4" />
                          Global
                        </Button>
                        {isGlobal && (
                          <span className="text-sm text-muted-foreground">Marketing to all regions</span>
                        )}
                      </div>
                      
                      {!isGlobal && (
                        <>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {selectedRegions.map(region => (
                              <div key={region.code} className="flex items-center">
                                <Badge variant="secondary" className="gap-1 px-2 py-1">
                                  <span>{region.name}</span>
                                  <button 
                                    type="button"
                                    onClick={() => setSelectedRegions(selectedRegions.filter(r => r.code !== region.code))}
                                    className="ml-1 focus:outline-none"
                                  >
                                    <X className="h-3 w-3 cursor-pointer" />
                                  </button>
                                </Badge>
                              </div>
                            ))}
                          </div>
                          <div className="relative">
                            <Input
                              placeholder="Search countries..."
                              value={countrySearch}
                              onChange={(e) => setCountrySearch(e.target.value)}
                              className="mb-1"
                            />
                            {countrySearch && (
                              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-popover border rounded-md shadow-md">
                                <ScrollArea className="h-full max-h-48">
                                  <div className="p-2 space-y-1">
                                    {filteredCountries.map(country => (
                                      <div
                                        key={country.code}
                                        className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent rounded flex items-center gap-1"
                                        onClick={() => handleRegionSelect(country)}
                                      >
                                        {country.name}
                                      </div>
                                    ))}
                                  </div>
                                </ScrollArea>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Target Audience */}
                  <Card className="data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                    <CardHeader>
                      <CardTitle>Target Audience</CardTitle>
                      <CardDescription>
                        Define demographics and channels for your audience
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Age Groups</Label>
                        <div className="flex flex-wrap gap-2">
                          {ageRanges.map(range => (
                            <Badge 
                              key={range.value}
                              variant={selectedAgeRanges.includes(range.value) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleAgeRangeToggle(range.value)}
                            >
                              {range.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label>Social Media Channels</Label>
                        <div className="flex flex-wrap gap-2">
                          {socialMediaPlatforms.map(platform => (
                            <Badge 
                              key={platform.value}
                              variant={selectedSocialMedia.includes(platform.value) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => handleSocialMediaToggle(platform.value)}
                            >
                              {platform.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                  <Button 
                    size="lg" 
                    disabled={!hasChanges}
                    onClick={handleSaveChanges}
                    className="gap-2 cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 