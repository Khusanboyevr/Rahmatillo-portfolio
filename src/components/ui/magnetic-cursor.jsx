import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export const MagneticCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isInside, setIsInside] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Ultra smooth spring for the aura
    const auraSpringConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const auraX = useSpring(mouseX, auraSpringConfig);
    const auraY = useSpring(mouseY, auraSpringConfig);

    // Fast spring for the core
    const coreSpringConfig = { damping: 30, stiffness: 800, mass: 0.1 };
    const coreX = useSpring(mouseX, coreSpringConfig);
    const coreY = useSpring(mouseY, coreSpringConfig);

    useEffect(() => {
        // Better mobile detection - only hide if it's actually a touch-only mobile experience
        const checkMobile = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmall = window.innerWidth <= 768;
            setIsMobile(isTouch && isSmall);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isInside) setIsInside(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleOver = (e) => {
            const target = e.target;
            const isPointer =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-pointer") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsHovering(isPointer);
        };

        const handleLeave = () => setIsInside(false);
        const handleEnter = () => setIsInside(true);

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleOver);
        document.addEventListener("mouseleave", handleLeave);
        document.addEventListener("mouseenter", handleEnter);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleOver);
            document.removeEventListener("mouseleave", handleLeave);
            document.removeEventListener("mouseenter", handleEnter);
        };
    }, [mouseX, mouseY, isInside]);

    if (isMobile) return null;

    return (
        <>
            <style>{`
                * {
                    cursor: none !important;
                }
                input, textarea, select {
                    cursor: text !important;
                }
                .cursor-none {
                    cursor: none !important;
                }
            `}</style>

            <AnimatePresence>
                {isInside && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Outer Aura - Liquid/Premium look */}
                        <motion.div
                            style={{
                                position: "fixed",
                                left: auraX,
                                top: auraY,
                                translateX: "-50%",
                                translateY: "-50%",
                                pointerEvents: "none",
                                zIndex: 9999,
                            }}
                            animate={{
                                width: isHovering ? 80 : 40,
                                height: isHovering ? 80 : 40,
                                backgroundColor: isHovering ? "rgba(59, 130, 246, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                border: isHovering ? "1px solid rgba(59, 130, 246, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(2px)",
                            }}
                            className="rounded-full dark:border-white/10 dark:bg-white/5"
                        />

                        {/* Core Dot - Sharp and reactive */}
                        <motion.div
                            style={{
                                position: "fixed",
                                left: coreX,
                                top: coreY,
                                translateX: "-50%",
                                translateY: "-50%",
                                pointerEvents: "none",
                                zIndex: 10000,
                            }}
                            animate={{
                                scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
                                width: 8,
                                height: 8,
                                backgroundColor: isHovering ? "#3b82f6" : "#000",
                                boxShadow: isHovering ? "0 0 20px rgba(59, 130, 246, 0.8)" : "0 0 10px rgba(0,0,0,0.1)",
                            }}
                            className="rounded-full shadow-lg dark:bg-white dark:invert-0"
                        />

                        {/* Particle trailing essence (Optional premium touch) */}
                        {isClicking && (
                            <motion.div
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 4, opacity: 0 }}
                                style={{
                                    position: "fixed",
                                    left: coreX,
                                    top: coreY,
                                    translateX: "-50%",
                                    translateY: "-50%",
                                    width: 40,
                                    height: 40,
                                    border: "1px solid rgba(59, 130, 246, 0.5)",
                                    borderRadius: "50%",
                                    pointerEvents: "none",
                                    zIndex: 9998
                                }}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
