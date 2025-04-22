"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  squares?: number[][];
}

export function GridPattern({
  width = 40,
  height = 40,
  x = 0,
  y = 0,
  strokeDasharray = "",
  squares,
  className,
  ...props
}: GridPatternProps) {
  const pattern = React.useMemo(() => {
    const pattern = [];
    const squareSize = 1;
    const strokeWidth = 1;

    for (let row = 0; row < height; row += squareSize) {
      for (let col = 0; col < width; col += squareSize) {
        const key = `${col}-${row}`;
        pattern.push(
          <rect
            key={key}
            width={squareSize}
            height={squareSize}
            x={col}
            y={row}
            className="fill-transparent stroke-current"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
          />
        );
      }
    }
    return pattern;
  }, [width, height, strokeDasharray]);

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      {...props}
    >
      <defs>
        <pattern
          id="grid"
          width={width}
          height={height}
          x={x}
          y={y}
          patternUnits="userSpaceOnUse"
        >
          {pattern}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
} 