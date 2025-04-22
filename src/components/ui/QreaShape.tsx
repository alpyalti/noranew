import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { memo } from "react";

interface QreaShapeProps {
    className?: string;
    delay?: number;
    size?: number;
    rotate?: number;
    gradient?: string;
    isDark?: boolean;
}

const QreaShape = memo(function QreaShape({
    className,
    delay = 0,
    size = 260,
    rotate = 0,
    gradient = "from-white/[0.08]",
    isDark = true,
}: QreaShapeProps) {
    // Extract color from gradient string
    const getColorFromGradient = () => {
        if (gradient.includes("indigo")) return isDark ? "#6366f1" : "#4f46e5";
        if (gradient.includes("rose")) return isDark ? "#f43f5e" : "#e11d48";
        if (gradient.includes("violet")) return isDark ? "#8b5cf6" : "#7c3aed";
        if (gradient.includes("amber")) return isDark ? "#f59e0b" : "#d97706";
        if (gradient.includes("cyan")) return isDark ? "#06b6d4" : "#0891b2";
        return isDark ? "#ffffff" : "#000000";
    };

    const gradientId = `gradient-${rotate}-${delay}`.replace(/\./g, "");
    const color = getColorFromGradient();
    
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
            className={cn("absolute will-change-transform", className)}
            style={{
                width: size,
                height: size,
            }}
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
                className="relative w-full h-full"
            >
                <svg
                    viewBox="0 0 259.66 259.67"
                    className="w-full h-full"
                    style={{
                        filter: isDark 
                            ? "drop-shadow(0 0 35px rgba(255,255,255,0.3)) drop-shadow(0 0 15px rgba(255,255,255,0.2))" 
                            : "drop-shadow(0 0 35px rgba(0,0,0,0.15)) drop-shadow(0 0 15px rgba(0,0,0,0.1))",
                        willChange: "filter"
                    }}
                >
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop 
                                offset="0%" 
                                stopColor={color}
                                stopOpacity={isDark ? "0.3" : "0.2"} 
                            />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path
                        className="transition-colors duration-300"
                        fill={`url(#${gradientId})`}
                        d="M245.84,96.37c8.77,8.77,13.82,20.92,13.82,33.26s-4.14,23.17-11.97,31.73l-.06.06-.06.06c-7.09,7.8-16.46,12.47-28.66,14.28l-4.8.71c-19.47,2.89-34.76,18.17-37.64,37.64l-.71,4.8c-1.81,12.2-6.49,21.58-14.3,28.67l-.06.06-.06.06c-8.56,7.82-19.53,11.97-31.69,11.97s-24.53-5.05-33.32-13.82c-.43-.43-.86-.88-1.28-1.32l-.07-.07-.07-.07c-6.16-6.62-9.78-14.64-11.37-25.22l-.73-4.78c-2.91-19.41-18.16-34.66-37.57-37.56l-4.78-.71c-10.56-1.59-18.56-5.19-25.19-11.35l-.07-.07-.07-.07c-.45-.42-.89-.84-1.32-1.27C5.04,154.55,0,142.42,0,130.06s4.14-23.17,11.97-31.73l.06-.06.06-.06c7.09-7.8,16.46-12.47,28.66-14.28l4.8-.71c19.47-2.89,34.76-18.17,37.64-37.64l.71-4.8c1.81-12.2,6.49-21.58,14.3-28.67l.06-.06.06-.06C106.87,4.18,117.83.03,130,.03s24.53,5.05,33.32,13.82c.43.43.86.88,1.28,1.32l.07.07.07.07c6.16,6.62,9.78,14.63,11.37,25.2l.71,4.78c2.91,19.43,18.16,34.67,37.59,37.59l4.78.71c10.56,1.59,18.56,5.19,25.19,11.35l.07.07.07.07c.45.42.89.84,1.32,1.27h0"
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
});

export { QreaShape }; 