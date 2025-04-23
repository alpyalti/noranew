"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface RadialScoreChartProps {
  score: number;
  className?: string;
}

const chartConfig = {
  score: {
    label: "Score",
    color: "hsl(var(--primary))",
  }
} satisfies ChartConfig

export function RadialScoreChart({ score, className }: RadialScoreChartProps) {
  const chartData = [{ 
    name: "Score",
    score: score,
    fill: "hsl(var(--primary))"
  }]

  return (
    <ChartContainer
      config={chartConfig}
      className={className}
    >
      <RadialBarChart
        data={chartData}
        startAngle={180}
        endAngle={0}
        innerRadius="80%"
        outerRadius="100%"
        barSize={10}
      >
        <PolarRadiusAxis
          type="number"
          domain={[0, 100]}
          tick={false}
        />
        <RadialBar
          background
          dataKey="score"
          cornerRadius={30}
          fill="hsl(var(--primary))"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-2xl font-bold"
        >
          {score}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-sm"
        >
          Score
        </text>
      </RadialBarChart>
    </ChartContainer>
  )
} 