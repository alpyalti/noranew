"use client"

import * as React from "react"
import { AppSidebarFixed } from "@/components/app-sidebar-fixed"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Edit, 
  RefreshCw, 
  Sparkles, 
  Activity, 
  Crosshair,
  TrendingUp,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Music2,
  Pencil
} from "lucide-react"
import { RadarChart } from "@/components/radar-chart"
import { AreaChart } from "@/components/area-chart"

// Mock data
const brandData = {
  name: "TechVision Corp",
  description: "Leading technology solutions provider specializing in AI and cloud services",
  keywords: ["Technology", "AI Solutions"],
  region: "North America"
}

const pulseNewsData = {
  lastUpdate: "2024-03-20 14:30",
  news: [
    {
      title: "AI Technology Breakthrough in Cloud Computing",
      summary: "Major advancement in cloud computing efficiency using AI algorithms...",
      keywords: ["AI", "Cloud Computing"]
    },
    {
      title: "Tech Companies Expanding in North America",
      summary: "Technology sector sees rapid growth in North American market...",
      keywords: ["Technology", "North America"]
    },
    {
      title: "New AI Solutions for Enterprise",
      summary: "Enterprise-level AI solutions transforming business operations...",
      keywords: ["AI", "Enterprise"]
    }
  ]
}

const competitorData = {
  competitors: [
    {
      name: "InnoTech Solutions",
      sector: "Technology",
      region: "North America"
    },
    {
      name: "CloudAI Systems",
      sector: "Cloud Services",
      region: "Europe"
    }
  ]
}

const overwatchData = {
  lastUpdate: "2024-03-20 15:45",
  activities: [
    {
      title: "InnoTech Solutions Launches New Cloud Platform",
      summary: "Major cloud platform release with advanced AI capabilities...",
      competitor: "InnoTech Solutions"
    },
    {
      title: "CloudAI Systems Expands to Asian Market",
      summary: "Strategic expansion into Asian markets with new partnerships...",
      competitor: "CloudAI Systems"
    },
    {
      title: "AI Industry Partnership Announcement",
      summary: "Leading companies form strategic partnership in AI development...",
      competitor: "InnoTech Solutions"
    }
  ]
}

const socialMediaTrendsData = {
  channels: {
    Facebook: { tech: 85, cloud: 70 },
    Instagram: { tech: 92, cloud: 65 },
    YouTube: { tech: 78, cloud: 85 },
    LinkedIn: { tech: 95, cloud: 90 },
    Twitter: { tech: 88, cloud: 75 },
    TikTok: { tech: 70, cloud: 45 }
  },
  trendingChannel: {
    name: "LinkedIn",
    growth: 25
  },
  period: "January 2024 - March 2024"
}

const followerGrowthData = {
  competitors: {
    "InnoTech Solutions": [100000, 95000, 120000, 115000],
    "CloudAI Systems": [50000, 55000, 60000, 58000],
    "DataFlow Inc": [75000, 85000, 80000, 95000],
    "SmartCore Technologies": [20000, 25000, 30000, 28000]
  },
  topGrower: {
    name: "CloudAI Systems",
    growth: 35
  },
  period: "December 2023 - March 2024"
}

// Format data for RadarChart
const radarChartData = Object.entries(socialMediaTrendsData.channels).map(([name, values]) => ({
  name,
  tech: values.tech,
  cloud: values.cloud
}))

// Format data for AreaChart
const areaChartData = Array.from({ length: 4 }, (_, i) => ({
  name: `Q${i + 1}`,
  value1: followerGrowthData.competitors["InnoTech Solutions"][i],
  value2: followerGrowthData.competitors["CloudAI Systems"][i],
  value3: followerGrowthData.competitors["DataFlow Inc"][i],
  value4: followerGrowthData.competitors["SmartCore Technologies"][i]
}))

const InlineTag = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-tag ${className || ''}`}>{children}</span>
);

const getTimeAgo = (date: string) => {
  return "2 hours ago";
};

export default function ExplorerPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [pulseLastUpdate, setPulseLastUpdate] = React.useState(pulseNewsData.lastUpdate)
  const [overwatchLastUpdate, setOverwatchLastUpdate] = React.useState(overwatchData.lastUpdate)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleRefresh = async (type: 'pulse' | 'overwatch') => {
    setIsRefreshing(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const now = new Date().toISOString()
    if (type === 'pulse') {
      setPulseLastUpdate(now)
    } else {
      setOverwatchLastUpdate(now)
    }
    setIsRefreshing(false)
  }

  return (
    <>
      <style jsx global>{`
        @keyframes doublePulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          25% { transform: scale(1.2); opacity: 0.8; }
          35% { transform: scale(1.1); opacity: 0.9; }
          45% { transform: scale(1.2); opacity: 0.8; }
          55% { transform: scale(1); opacity: 1; }
        }
        .inline-tag {
          display: inline-block;
          padding: 0.125rem 0.375rem;
          margin: 0.125rem 0;
          border-radius: 0.375rem;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
          background-color: rgba(34, 197, 94, 0.1);
          color: rgb(21, 128, 61);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .inline-tag-competitor {
          background-color: rgba(239, 68, 68, 0.1);
          color: rgb(185, 28, 28);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        @media (prefers-color-scheme: dark) {
          .inline-tag {
            background-color: transparent;
            color: rgb(34, 197, 94);
            border-color: rgba(34, 197, 94, 0.5);
          }
          .inline-tag-competitor {
            background-color: transparent;
            color: rgb(239, 68, 68);
            border-color: rgba(239, 68, 68, 0.5);
          }
        }
      `}</style>
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
            <div className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Today's Pulse Card */}
                <Card className="w-full data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="cursor-pointer">
                          <Activity 
                            className="h-5 w-5 text-green-500" 
                            style={{ animation: 'doublePulse 3s ease-in-out infinite' }}
                          />
                        </div>
                        <CardTitle>Today's Pulse</CardTitle>
                      </div>
                      <CardDescription className="text-xs pl-7">
                        Market insights & updates
                      </CardDescription>
                    </div>
                    <div className="flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-opacity duration-500 text-card-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Updated {getTimeAgo(pulseLastUpdate)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="divide-y divide-border">
                      <div className="pb-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">Market Share Growth in AI Analytics</h3>
                          <Button variant="ghost" size="icon" className="cursor-pointer -mt-1">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">
                          <InlineTag>Enterprise</InlineTag> adoption of <InlineTag>AI</InlineTag> analytics solutions shows 28% increase in market penetration. <InlineTag>Predictive</InlineTag> modeling and <InlineTag>real-time</InlineTag> processing capabilities drive significant growth across key industry sectors.
                        </p>
                      </div>
                      
                      <div className="py-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">Competitor Platform Enhancement</h3>
                          <Button variant="ghost" size="icon" className="cursor-pointer -mt-1">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">
                          <InlineTag className="inline-tag-competitor">DataTech</InlineTag> launches enhanced <InlineTag>ML</InlineTag> capabilities in their analytics suite. New features include predictive modeling and scalable data processing, targeting enterprise-level implementations.
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">Regional Market Dynamics</h3>
                          <Button variant="ghost" size="icon" className="cursor-pointer -mt-1">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">
                          <InlineTag>APAC</InlineTag> region shows strongest growth in <InlineTag>AI</InlineTag> analytics adoption, with 45% year-over-year increase. Financial and healthcare sectors lead implementation, focusing on automated decision-making systems.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Overwatch Card */}
                <Card className="w-full data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="cursor-pointer">
                          <Crosshair className="h-5 w-5 text-red-500 animate-[pulse_2s_ease-in-out_infinite] scale-110" />
                        </div>
                        <CardTitle>Overwatch</CardTitle>
                      </div>
                      <CardDescription className="text-xs pl-7">
                        Competitor activity tracker
                      </CardDescription>
                    </div>
                    <div className="flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-opacity duration-500 text-card-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Updated {getTimeAgo(overwatchLastUpdate)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1">
                    <div className="divide-y divide-border">
                      <div className="pb-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">Strategic Partnership Announcement</h3>
                          <Button variant="ghost" size="icon" className="cursor-pointer -mt-1">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">
                          <InlineTag className="inline-tag-competitor">CoreTech</InlineTag> partners with <InlineTag className="inline-tag-competitor">CloudScale</InlineTag> to enhance data processing. Joint development focuses on scalable analytics solutions for enterprise clients, with initial rollout in Q3.
                        </p>
                      </div>
                      
                      <div className="py-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">Market Expansion Initiative</h3>
                          <Button variant="ghost" size="icon" className="cursor-pointer -mt-1">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">
                          <InlineTag className="inline-tag-competitor">DataFlow</InlineTag> expands into <InlineTag>Asia-Pacific</InlineTag>, establishing Singapore headquarters. New research center focuses on AI development and local market customization, targeting Q4 launch.
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-sm">Product Portfolio Update</h3>
                          <Button variant="ghost" size="icon" className="cursor-pointer -mt-1">
                            <Sparkles className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5 mb-1.5">
                          <InlineTag className="inline-tag-competitor">SmartCore</InlineTag> introduces advanced tools in their analytics platform. New features emphasize real-time data processing and scalable dashboards.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Overview and Competitors Column */}
                <div className="flex flex-col gap-4 lg:col-span-1">
                  <Card className="h-[240px] w-full data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between">
                        <CardTitle>Brand Overview</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="pb-0">Brand details and market position</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <h3 className="font-semibold truncate">{brandData.name}</h3>
                        <div className="flex gap-2 flex-wrap">
                          {brandData.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline">{keyword}</Badge>
                          ))}
                          <Badge variant="secondary">{brandData.region}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {"A pioneering force in AI-driven analytics, specializing in transforming complex data into actionable business intelligence. Our innovative solutions empower organizations to make data-driven decisions with confidence.".slice(0, 150)}...
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-[240px] w-full data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                    <CardHeader className="pb-0">
                      <div className="flex items-center justify-between">
                        <CardTitle>Competitors</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="pb-0">Key market competitors and their focus areas</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">1</div>
                            <h4 className="font-medium text-[13px] truncate">{competitorData.competitors[0].name}</h4>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5">{competitorData.competitors[0].sector}</Badge>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{competitorData.competitors[0].region}</Badge>
                          </div>
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">2</div>
                            <h4 className="font-medium text-[13px] truncate">{competitorData.competitors[1].name}</h4>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5">{competitorData.competitors[1].sector}</Badge>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">{competitorData.competitors[1].region}</Badge>
                          </div>
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">3</div>
                            <h4 className="font-medium text-[13px] truncate">DataFlow Inc</h4>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5">Data Analytics</Badge>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">Asia Pacific</Badge>
                          </div>
                        </div>

                        <div className="h-px w-full bg-border" />

                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-medium">4</div>
                            <h4 className="font-medium text-[13px] truncate">SmartCore Technologies</h4>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Badge variant="outline" className="text-[10px] h-5 px-1.5">AI Solutions</Badge>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">South America</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Social Media Trends Card */}
                <Card className="w-full data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                  <CardHeader>
                    <CardTitle>Social Media Trends</CardTitle>
                    <CardDescription>
                      Channel usage comparison by sector
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadarChart data={radarChartData} />
                  </CardContent>
                </Card>

                {/* Follower Growth Card */}
                <Card className="w-full md:col-span-2 data-[slot=card]:bg-gradient-to-t data-[slot=card]:from-primary/5 data-[slot=card]:to-card dark:data-[slot=card]:bg-card" data-slot="card">
                  <CardHeader>
                    <CardTitle>Follower Growth</CardTitle>
                    <CardDescription>Daily follower count comparison across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AreaChart data={areaChartData} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
} 