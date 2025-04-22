"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    isDark = true,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    isDark?: boolean;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        isDark 
                          ? "backdrop-blur-[2px] border-2 border-white/[0.15] shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]" 
                          : "backdrop-blur-[2px] border-2 border-black/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
                        isDark
                          ? "after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" 
                          : "after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

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

    const arrowVariants = {
        rest: { x: 0 },
        hover: { x: 5 },
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

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient={isDark ? "from-indigo-500/[0.15]" : "from-indigo-500/[0.08]"}
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                    isDark={isDark}
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient={isDark ? "from-rose-500/[0.15]" : "from-rose-500/[0.08]"}
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                    isDark={isDark}
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient={isDark ? "from-violet-500/[0.15]" : "from-violet-500/[0.08]"}
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                    isDark={isDark}
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient={isDark ? "from-amber-500/[0.15]" : "from-amber-500/[0.08]"}
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                    isDark={isDark}
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient={isDark ? "from-cyan-500/[0.15]" : "from-cyan-500/[0.08]"}
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                    isDark={isDark}
                />
            </div>

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
                            isDark ? "text-rose-500/80" : "text-rose-600/80"
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
                        <motion.div
                            variants={arrowVariants}
                            initial="rest"
                            animate={isHovered ? "hover" : "rest"}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            <ArrowRight className={cn(
                                "h-4 w-4",
                                isDark ? "text-white/60" : "text-black/60"
                            )} />
                        </motion.div>
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
                            Get Started for Free
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
