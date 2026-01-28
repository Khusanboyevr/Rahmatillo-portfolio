import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";

export default function WheelCarousel({ projects }) {
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [radius, setRadius] = useState(400);
    const containerRef = useRef(null);
    const count = projects.length;
    const angleStep = 360 / count;

    // Handle responsive radius and orientation
    useEffect(() => {
        const updateDimensions = () => {
            if (window.innerWidth < 640) {
                setRadius(240); // Compact for mobile
            } else if (window.innerWidth < 1024) {
                setRadius(300);
            } else {
                setRadius(380); // Compact desktop
            }
        };
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        let interval;
        if (!isHovered) {
            interval = setInterval(() => {
                setRotation((prev) => prev + 0.15); // Continuous rotation (bottom to top)
            }, 16);
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    const handleDrag = (event, info) => {
        setRotation((prev) => prev - info.delta.y * 0.1);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                style={{
                    rotateX: rotation, // Vertical axis
                    transformStyle: "preserve-3d",
                }}
                drag="y"
                onDrag={handleDrag}
            >
                {projects.map((project, i) => {
                    const angle = i * angleStep;
                    return (
                        <div
                            key={project.id}
                            className="absolute top-1/2 left-1/2 w-[220px] sm:w-[300px] md:w-[360px] backface-hidden"
                            style={{
                                transform: `translate(-50%, -50%) rotateX(${angle}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl border border-white/20 dark:border-zinc-800 transition-all hover:scale-[1.02] group">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-28 sm:h-44 object-cover rounded-xl mb-3 sm:mb-4"
                                />
                                <h3 className="text-xs sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-1">
                                    {project.title}
                                </h3>
                                <p className="text-[9px] sm:text-xs text-gray-600 dark:text-zinc-400 line-clamp-1 mb-2 sm:mb-3">
                                    {project.minDescription}
                                </p>
                                <div className="flex gap-1.5 mb-3 sm:mb-4 overflow-x-auto no-scrollbar">
                                    {project.tags.slice(0, 3).map((tag, j) => (
                                        <span key={j} className="flex-shrink-0 px-2 py-0.5 text-[8px] sm:text-[10px] bg-black/5 dark:bg-white/10 rounded-md text-gray-600 dark:text-zinc-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        className="flex-1 py-1 sm:py-2 text-center text-[9px] sm:text-xs font-semibold border border-black dark:border-zinc-700 rounded-lg hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition"
                                    >
                                        Code
                                    </a>
                                    <a href={project.demo} target="_blank" className="flex-1">
                                        <ShimmerButton className="w-full py-1 sm:py-2 text-[9px] sm:text-xs rounded-lg">
                                            Demo
                                        </ShimmerButton>
                                    </a>
                                </div>
                                <BorderBeam size={80} duration={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    );
                })}
            </motion.div>

            {/* Scroll indicator/help */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 text-[9px] sm:text-xs animate-bounce bg-white/40 dark:bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {isHovered ? "Paused" : "Drag up/down to scroll"}
            </div>
        </div>
    );
}
