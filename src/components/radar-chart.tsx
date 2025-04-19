"use client"

import { Card } from "@/components/ui/card"
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { TrendingUp } from "lucide-react"

interface RadarChartProps {
  data: {
    name: string
    tech: number
    cloud: number
  }[]
}

export function RadarChart({ data }: RadarChartProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="h-[200px] md:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data} margin={{ top: 0, right: 30, bottom: 0, left: 0 }}>
            <PolarGrid className="text-border" strokeOpacity={0.1} />
            <PolarAngleAxis
              dataKey="name"
              className="text-xs text-muted-foreground"
              tick={{ fontSize: 10 }}
            />
            <PolarRadiusAxis className="text-xs text-muted-foreground" tick={{ fontSize: 10 }} />
            <Radar
              name="Technology"
              dataKey="tech"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
            />
            <Radar
              name="Cloud Services"
              dataKey="cloud"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.1}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="border shadow-md">
                      <div className="grid gap-2 p-2">
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span className="text-[0.70rem] font-medium">Technology</span>
                            <span className="ml-auto text-[0.70rem] font-medium">
                              {payload[0].value}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-[0.70rem] font-medium">Cloud Services</span>
                            <span className="ml-auto text-[0.70rem] font-medium">
                              {payload[1].value}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                }
                return null
              }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center items-center gap-2 flex-wrap px-2">
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-[2px] mr-2" style={{ backgroundColor: "rgb(59, 130, 246)" }} />
            <span className="text-[0.70rem] text-muted-foreground">Technology</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-[2px] mr-2" style={{ backgroundColor: "rgb(34, 197, 94)" }} />
            <span className="text-[0.70rem] text-muted-foreground">Cloud Services</span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center text-center space-y-1 px-2">
          <div className="flex items-center justify-center gap-2 text-[0.70rem] flex-wrap">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="font-medium truncate">LinkedIn</span>
            <span className="text-green-500">+25%</span>
          </div>
          <span className="text-[0.70rem] text-muted-foreground">January 2024 - March 2024</span>
        </div>
      </div>
    </div>
  )
} 