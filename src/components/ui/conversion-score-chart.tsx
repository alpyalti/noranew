"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { score: 99, fill: "hsl(var(--primary))" },
]

export function ConversionScoreChart({ score = 99 }: { score?: number }) {
  const data = [{ score, fill: "hsl(var(--primary))" }]
  
  return (
    <div className="w-full h-full">
      <div className="mx-auto aspect-square w-full h-full">
        <RadialBarChart
          data={data}
          startAngle={0}
          endAngle={250}
          innerRadius={80}
          outerRadius={110}
          width={250}
          height={250}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="score" background cornerRadius={10} />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {score}/100
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </div>
    </div>
  )
} 