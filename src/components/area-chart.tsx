"use client"

import { Card } from "@/components/ui/card"
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { TrendingUp } from "lucide-react"

interface AreaChartProps {
  data: {
    name: string
    value1: number
    value2: number
    value3: number
    value4: number
  }[]
}

export function AreaChart({ data }: AreaChartProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              className="text-foreground"
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
              className="text-foreground"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <Card className="border shadow-md">
                      <div className="grid gap-2 p-2">
                        <div className="text-[0.70rem] font-semibold uppercase text-muted-foreground">
                          {label}
                        </div>
                        <div className="grid gap-1">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span className="text-[0.70rem] font-medium">InnoTech Solutions</span>
                            <span className="ml-auto text-[0.70rem] font-medium">
                              {payload[0]?.value?.toLocaleString() ?? 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-[0.70rem] font-medium">CloudAI Systems</span>
                            <span className="ml-auto text-[0.70rem] font-medium">
                              {payload[1]?.value?.toLocaleString() ?? 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                            <span className="text-[0.70rem] font-medium">DataFlow Inc</span>
                            <span className="ml-auto text-[0.70rem] font-medium">
                              {payload[2]?.value?.toLocaleString() ?? 0}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                            <span className="text-[0.70rem] font-medium">SmartCore Technologies</span>
                            <span className="ml-auto text-[0.70rem] font-medium">
                              {payload[3]?.value?.toLocaleString() ?? 0}
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
            <Area
              type="monotone"
              dataKey="value1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="value3"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="value4"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center items-center gap-2 flex-wrap px-2">
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-[2px] mr-2" style={{ backgroundColor: "rgb(59, 130, 246)" }} />
            <span className="text-[0.70rem] text-muted-foreground">InnoTech Solutions</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-[2px] mr-2" style={{ backgroundColor: "rgb(34, 197, 94)" }} />
            <span className="text-[0.70rem] text-muted-foreground">CloudAI Systems</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-[2px] mr-2" style={{ backgroundColor: "rgb(168, 85, 247)" }} />
            <span className="text-[0.70rem] text-muted-foreground">DataFlow Inc</span>
          </div>
          <div className="flex items-center">
            <div className="h-2 w-2 shrink-0 rounded-[2px] mr-2" style={{ backgroundColor: "rgb(249, 115, 22)" }} />
            <span className="text-[0.70rem] text-muted-foreground">SmartCore Technologies</span>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-center text-center space-y-1 px-2">
          <div className="flex items-center justify-center gap-2 text-[0.70rem] flex-wrap">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="font-medium truncate">CloudAI Systems</span>
            <span className="text-green-500">+35%</span>
          </div>
          <span className="text-[0.70rem] text-muted-foreground">December 2023 - March 2024</span>
        </div>
      </div>
    </div>
  )
} 