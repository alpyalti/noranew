"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { QreaShape } from "./QreaShape";
import React from "react";

function HeroGeometric({
    badge = "AI-Powered Complete Marketing",
    title1 = "Unleash Your",
    title2 = "Potential With Nora",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    
    // When mounted on client, now we can show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize shapes to prevent re-renders
    const shapes = React.useMemo(() => (
        <div className="absolute inset-0 overflow-hidden">
            <QreaShape
                delay={0.3}
                size={400}
                rotate={12}
                gradient={isDark ? "from-indigo-500/[0.08]" : "from-indigo-500/[0.08]"}
                className="left-[-10%] md:left-[-5%] top-[10%] md:top-[15%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.5}
                size={350}
                rotate={-15}
                gradient={isDark ? "from-rose-500/[0.04]" : "from-rose-500/[0.08]"}
                className="right-[-8%] md:right-[-3%] top-[65%] md:top-[70%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.4}
                size={260}
                rotate={-8}
                gradient={isDark ? "from-violet-500/[0.04]" : "from-violet-500/[0.08]"}
                className="left-[20%] md:left-[15%] bottom-[15%] md:bottom-[20%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.6}
                size={200}
                rotate={20}
                gradient={isDark ? "from-amber-500/[0.04]" : "from-amber-500/[0.08]"}
                className="right-[20%] md:right-[25%] top-[15%] md:top-[20%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.7}
                size={150}
                rotate={-25}
                gradient={isDark ? "from-cyan-500/[0.04]" : "from-cyan-500/[0.08]"}
                className="left-[20%] md:left-[27%] top-[10%] md:top-[15%] transform-gpu"
                isDark={isDark}
            />
        </div>
    ), [isDark]);
    
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    const buttonArrowVariants = {
        rest: { x: 0, opacity: 0.8 },
        hover: { x: 5, opacity: 1 },
    };

    // Don't render UI until mounted to prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    return (
        <div className={cn(
            "relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-300",
            isDark ? "bg-background" : "bg-background"
        )}>
            <div className={cn(
                "absolute inset-0 blur-3xl opacity-30 transition-opacity duration-300",
                isDark ? "bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]" 
                       : "bg-gradient-to-br from-indigo-500/[0.02] via-transparent to-rose-500/[0.02]"
            )} />

            {shapes}

            <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center pt-20 md:pt-24">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        className={cn(
                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 md:mb-8 cursor-pointer transition-all duration-300",
                            isDark 
                                ? "bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08]" 
                                : "bg-black/[0.02] border border-black/[0.03] hover:bg-black/[0.03] hover:border-black/[0.05]"
                        )}
                    >
                        <Sparkles className={cn(
                            "h-4 w-4",
                            isDark ? "text-white/60" : "text-black/60"
                        )} />
                        <AnimatedShinyText
                            className={cn(
                                "text-sm tracking-wide",
                                isDark ? "text-white/60" : "text-black/60"
                            )}
                            shimmerWidth={200}
                        >
                            {badge}
                        </AnimatedShinyText>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-10 tracking-tight">
                            <span className={cn(
                                "bg-clip-text text-transparent inline-block mb-2 md:mb-3",
                                isDark ? "bg-gradient-to-b from-white to-white/80" : "bg-gradient-to-b from-black to-black/80"
                            )}>
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent inline-block",
                                    isDark ? "bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300" 
                                          : "bg-gradient-to-r from-indigo-500 via-black/90 to-rose-500"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-14"
                    >
                        <p className={cn(
                            "text-base sm:text-lg md:text-xl leading-relaxed font-light tracking-wide max-w-2xl mx-auto px-4",
                            isDark ? "text-white/40" : "text-black/60"
                        )}>
                            Crafting exceptional digital experiences through
                            innovative design and cutting-edge technology.
                        </p>

                        <motion.button
                            onHoverStart={() => setIsButtonHovered(true)}
                            onHoverEnd={() => setIsButtonHovered(false)}
                            className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 cursor-pointer",
                                isDark 
                                    ? "bg-white text-black hover:bg-white/90" 
                                    : "bg-black text-white hover:bg-black/90"
                            )}
                        >
                            Try For Free Now
                            <motion.div
                                variants={buttonArrowVariants}
                                initial="rest"
                                animate={isButtonHovered ? "hover" : "rest"}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                            >
                                <ArrowRight className="h-4 w-4" />
                            </motion.div>
                        </motion.button>
                    </motion.div>

                    {/* Hero Image Section */}
                    <motion.div
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="mt-32 relative w-[calc(100vw-8rem)] md:w-[calc(100vw-12rem)] lg:w-[calc(100vw-16rem)] max-w-[1200px] left-[50%] -translate-x-[50%] aspect-[16/9] mb-[-10%]"
                    >
                        {/* Blue glow effect */}
                        <div className={cn(
                            "absolute left-1/2 -top-5 -translate-x-1/2 -z-10",
                            isDark ? "opacity-40" : "opacity-90"
                        )} aria-hidden="true">
                            <div className="relative">
                                <div className="absolute inset-0 blur-[100px] will-change-transform">
                                    <div className="h-[300px] w-[1300px] bg-gradient-to-b from-[#0ea5e9] via-[#6366f1]/50 to-transparent rounded-full" />
                                </div>
                                <div className="h-[300px] w-[1300px] bg-gradient-to-b from-[#0ea5e9] via-[#6366f1]/50 to-transparent opacity-50 blur-3xl rounded-full" />
                            </div>
                        </div>

                        <div className="absolute inset-0 rounded-3xl overflow-hidden">
                            {/* Gradient overlay */}
                            <div className={cn(
                                "absolute inset-0 z-10",
                                [
                                    "bg-gradient-to-t from-background from-20% via-background/95 to-transparent",
                                    "bg-gradient-to-b from-transparent via-transparent to-background to-90%"
                                ].join(" ")
                            )} />
                            
                            {/* Border effect */}
                            <div className={cn(
                                "absolute inset-0 border-2 rounded-3xl z-20",
                                isDark 
                                    ? "border-white/5" 
                                    : "border-black/5"
                            )} />

                            {/* The actual image */}
                            <img
                                src={isDark ? "/black.png" : "/white2.png"}
                                alt="Hero section image"
                                className={cn(
                                    "w-full h-full object-contain",
                                    isDark 
                                        ? "opacity-75" 
                                        : "opacity-85"
                                )}
                            />

                            {/* Bottom fade overlay */}
                            <div className={cn(
                                "absolute bottom-0 left-0 right-0 h-[85%] z-30",
                                "bg-gradient-to-t from-background from-0% via-background/95 via-40% via-background/80 via-60% via-background/40 via-80% to-transparent to-100%"
                            )} />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient overlay for smooth transition */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 h-64 pointer-events-none",
                "bg-gradient-to-t from-background from-0% via-background/95 via-40% via-background/80 via-60% via-background/40 via-80% to-transparent to-100%"
            )} />
        </div>
    );
}

export { HeroGeometric }
