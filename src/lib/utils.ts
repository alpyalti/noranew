import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`
}

export function generateGridPattern(
  size = 40,
  color = "currentColor",
  opacity = 0.1
) {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) return ""

  const cellSize = size
  canvas.width = cellSize
  canvas.height = cellSize

  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.globalAlpha = opacity

  // Draw vertical line
  ctx.beginPath()
  ctx.moveTo(cellSize, 0)
  ctx.lineTo(cellSize, cellSize)
  ctx.stroke()

  // Draw horizontal line
  ctx.beginPath()
  ctx.moveTo(0, cellSize)
  ctx.lineTo(cellSize, cellSize)
  ctx.stroke()

  return canvas.toDataURL()
}
