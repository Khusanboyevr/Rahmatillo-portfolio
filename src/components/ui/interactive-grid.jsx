"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const InteractiveGrid = ({ className }) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: 10 + Math.random() * 20,
            delay: Math.random() * -20,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            {/* Base Grid */}
            <div
                className="absolute inset-0 opacity-[0.15] dark:opacity-[0.1]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Spotlight Effect */}
            <motion.div
                className="absolute inset-0 z-0 transition-opacity duration-500"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle 250px at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
                }}
            />

            {/* Highlighted Grid (only visible under spotlight) */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    opacity: isHovered ? 0.4 : 0,
                    backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                    maskImage: `radial-gradient(circle 250px at ${smoothX}px ${smoothY}px, white, transparent)`,
                    WebkitMaskImage: `radial-gradient(circle 250px at ${smoothX}px ${smoothY}px, white, transparent)`,
                }}
            />

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
                    animate={{
                        y: [`${p.y}%`, `${p.y - 10}%`, `${p.y}%`],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute rounded-full bg-blue-400/30 dark:bg-blue-300/20"
                    style={{ width: p.size, height: p.size }}
                />
            ))}

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(255,255,255,0.2)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
    );
};
