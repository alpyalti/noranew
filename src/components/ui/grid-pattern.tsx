"use client"

import { useEffect, useState } from "react"
import { generateGridPattern } from "@/lib/utils"

export function GridPattern({
  size = 40,
  color = "currentColor",
  opacity = 0.1,
  className = "",
}) {
  const [pattern, setPattern] = useState("")

  useEffect(() => {
    setPattern(generateGridPattern(size, color, opacity))
  }, [size, color, opacity])

  return (
    <div
      className={className}
      style={{
        backgroundImage: pattern ? `url(${pattern})` : undefined,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  )
} 