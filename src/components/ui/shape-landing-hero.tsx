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
                gradient={isDark ? "from-indigo-500/[0.15]" : "from-indigo-500/[0.08]"}
                className="left-[-10%] md:left-[-5%] top-[10%] md:top-[15%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.5}
                size={350}
                rotate={-15}
                gradient={isDark ? "from-rose-500/[0.15]" : "from-rose-500/[0.08]"}
                className="right-[-8%] md:right-[-3%] top-[65%] md:top-[70%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.4}
                size={260}
                rotate={-8}
                gradient={isDark ? "from-violet-500/[0.15]" : "from-violet-500/[0.08]"}
                className="left-[20%] md:left-[15%] bottom-[15%] md:bottom-[20%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.6}
                size={200}
                rotate={20}
                gradient={isDark ? "from-amber-500/[0.15]" : "from-amber-500/[0.08]"}
                className="right-[20%] md:right-[25%] top-[15%] md:top-[20%] transform-gpu"
                isDark={isDark}
            />

            <QreaShape
                delay={0.7}
                size={150}
                rotate={-25}
                gradient={isDark ? "from-cyan-500/[0.15]" : "from-cyan-500/[0.08]"}
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
            "relative min-h-screen w-full flex items-center justify-center overflow-hidden",
            isDark ? "bg-[#030303]" : "bg-[#f8f9fb]"
        )}>
            <div className={cn(
                "absolute inset-0 blur-3xl",
                isDark ? "bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]" 
                       : "bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-rose-500/[0.03]"
            )} />

            {shapes}

            <div className="relative z-10 container mx-auto px-4 md:px-6 -mt-[30rem]">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        className={cn(
                            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 md:mb-12 cursor-pointer transition-colors duration-300",
                            isDark 
                                ? "bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06]" 
                                : "bg-black/[0.02] border border-black/[0.05] hover:bg-black/[0.04]"
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
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className={cn(
                                "bg-clip-text text-transparent",
                                isDark ? "bg-gradient-to-b from-white to-white/80" : "bg-gradient-to-b from-black to-black/80"
                            )}>
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent",
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
                        className="space-y-12"
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
                </div>
            </div>

            <div className={cn(
                "absolute inset-0 bg-gradient-to-t pointer-events-none",
                isDark ? "from-[#030303] via-transparent to-[#030303]/80" 
                       : "from-[#f8f9fb] via-transparent to-[#f8f9fb]/80"
            )} />
        </div>
    );
}

export { HeroGeometric }
