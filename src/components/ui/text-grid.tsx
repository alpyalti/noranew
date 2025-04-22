"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface TextGridProps {
  text?: string;
  className?: string;
}

const TextGrid: React.FC<TextGridProps> = ({
  text = "UNLEASH YOUR POTENTIAL",
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const setupCanvas = useCallback((canvas: HTMLCanvasElement, width: number, height: number) => {
    const dpr = window.devicePixelRatio || 1;
    const adjustedWidth = width * dpr;
    const adjustedHeight = height * dpr;
    
    canvas.width = adjustedWidth;
    canvas.height = adjustedHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Set up the text
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Scale context for retina displays
    ctx.scale(dpr, dpr);

    ctx.fillStyle = resolvedTheme === 'dark' ? 'white' : 'black';
    ctx.font = `bold ${Math.floor(height/3.5)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.clearRect(0, 0, width, height);
    ctx.fillText(text, width / 2, height / 2);

    // Reset scale before getting image data
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const imageData = ctx.getImageData(0, 0, adjustedWidth, adjustedHeight);
    ctx.clearRect(0, 0, adjustedWidth, adjustedHeight);

    // Grid properties
    const baseSquareSize = 4 * dpr;
    const baseGridGap = 3 * dpr;
    const cols = Math.floor(adjustedWidth / (baseSquareSize + baseGridGap));
    const rows = Math.floor(adjustedHeight / (baseSquareSize + baseGridGap));

    // Initialize squares with random opacity
    const squares = new Float32Array(cols * rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * (baseSquareSize + baseGridGap);
        const y = j * (baseSquareSize + baseGridGap);
        const pixelIndex = (Math.floor(y) * adjustedWidth + Math.floor(x)) * 4;
        const alpha = imageData.data[pixelIndex + 3];
        squares[i * rows + j] = alpha > 0 ? Math.random() * 0.3 : 0;
      }
    }

    return { 
      cols, 
      rows, 
      squares, 
      dpr,
      squareSize: baseSquareSize,
      gridGap: baseGridGap
    };
  }, [resolvedTheme, text]);

  const updateSquares = useCallback((squares: Float32Array, textMap: boolean[], deltaTime: number) => {
    for (let i = 0; i < squares.length; i++) {
      if (Math.random() < 0.2 * deltaTime && textMap[i]) {
        squares[i] = Math.random() * 0.3;
      }
    }
  }, []);

  const drawGrid = useCallback((
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    cols: number,
    rows: number,
    squares: Float32Array,
    params: { dpr: number; squareSize: number; gridGap: number }
  ) => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const opacity = squares[i * rows + j];
        if (opacity > 0) {
          ctx.fillStyle = resolvedTheme === 'dark'
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(0, 0, 0, ${opacity})`;
          
          ctx.fillRect(
            i * (params.squareSize + params.gridGap),
            j * (params.squareSize + params.gridGap),
            params.squareSize,
            params.squareSize
          );
        }
      }
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });
      return setupCanvas(canvas, rect.width, rect.height);
    };

    let gridParams = updateCanvasSize();
    if (!gridParams) return;

    // Create text map
    const textMap = new Array(gridParams.cols * gridParams.rows).fill(false);
    for (let i = 0; i < gridParams.cols; i++) {
      for (let j = 0; j < gridParams.rows; j++) {
        const idx = i * gridParams.rows + j;
        textMap[idx] = gridParams.squares[idx] > 0;
      }
    }

    let lastTime = 0;
    const animate = (time: number) => {
      if (!isInView || !gridParams) return;

      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      updateSquares(gridParams.squares, textMap, deltaTime);
      drawGrid(
        ctx,
        canvas.width,
        canvas.height,
        gridParams.cols,
        gridParams.rows,
        gridParams.squares,
        {
          dpr: gridParams.dpr,
          squareSize: gridParams.squareSize,
          gridGap: gridParams.gridGap
        }
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(() => {
      gridParams = updateCanvasSize() || gridParams;
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    intersectionObserver.observe(canvas);

    if (isInView) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [mounted, resolvedTheme, setupCanvas, updateSquares, drawGrid, isInView]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none"
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
};

export { TextGrid }; 