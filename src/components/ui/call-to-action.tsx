"use client";

import { MoveRight, PhoneCall, Zap, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState } from "react";
import { GridPattern } from "@/components/magicui/grid-pattern";

function CTA() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div className="w-full py-8 lg:py-16">
      <div className="container mx-auto">
        <div className="relative flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center overflow-hidden">
          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className={cn(
              "absolute inset-0 opacity-40",
              "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
              isDark ? "text-white/[0.2]" : "text-black/[0.2]"
            )}
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-bold tracking-tight sm:text-5xl max-w-xl">
              Try our platform today!
            </h3>
            <p className="text-muted-foreground text-lg max-w-xl">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our goal
              is to streamline SMB trade, making it easier and faster than ever.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button className="gap-4 cursor-pointer" variant="outline">
              Set up meeting <Calendar className="w-4 h-4" />
            </Button>
            <Button 
              className="gap-4 cursor-pointer group"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Get Started for Free
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: 5 }
                }}
                animate={isButtonHovered ? "hover" : "rest"}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
