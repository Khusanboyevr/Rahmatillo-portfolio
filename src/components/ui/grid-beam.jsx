"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GridBeam = ({ className }) => {
    const [beams, setBeams] = useState([]);

    useEffect(() => {
        const generateBeams = () => {
            const isMobile = window.innerWidth < 768;
            const count = isMobile ? 12 : 20;
            const newBeams = Array.from({ length: count }).map((_, i) => ({
                id: i,
                delay: Math.random() * 5,
                duration: 3 + Math.random() * 4,
                x: Math.floor(Math.random() * 100),
                horizontal: Math.random() > 0.5,
            }));
            setBeams(newBeams);
        };

        generateBeams();
        window.addEventListener('resize', generateBeams);
        return () => window.removeEventListener('resize', generateBeams);
    }, []);

    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none",
                className
            )}
        >
            {/* Dynamic Grid */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Animated Beams */}
            {beams.map((beam) => (
                <motion.div
                    key={beam.id}
                    initial={
                        beam.horizontal
                            ? { x: "-10%", y: `${beam.x}%`, opacity: 0 }
                            : { x: `${beam.x}%`, y: "-10%", opacity: 0 }
                    }
                    animate={
                        beam.horizontal
                            ? { x: "110%", opacity: [0, 1, 1, 0] }
                            : { y: "110%", opacity: [0, 1, 1, 0] }
                    }
                    transition={{
                        duration: beam.duration,
                        delay: beam.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className={cn(
                        "absolute bg-gradient-to-r from-transparent via-blue-500/40 dark:via-blue-400/30 to-transparent",
                        beam.horizontal ? "h-[1px] w-48" : "w-[1px] h-48 rotate-90"
                    )}
                    style={
                        beam.horizontal
                            ? { top: `${beam.x}%` }
                            : { left: `${beam.x}%` }
                    }
                />
            ))}

            {/* Radial Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
};
