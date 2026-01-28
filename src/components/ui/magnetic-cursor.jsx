import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const MagneticCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for trailing effect
    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const dotSpringConfig = { damping: 40, stiffness: 800, mass: 0.1 };
    const dotX = useSpring(mouseX, dotSpringConfig);
    const dotY = useSpring(mouseY, dotSpringConfig);

    useEffect(() => {
        const moveMouse = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleOver = (e) => {
            const target = e.target;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("cursor-pointer") ||
                window.getComputedStyle(target).cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleOver);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <style>{`
        * {
          cursor: none !important;
        }
        input, textarea, select {
          cursor: text !important;
        }
      `}</style>

            {/* Trailing Liquid Aura */}
            <motion.div
                style={{
                    position: "fixed",
                    left: cursorX,
                    top: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                }}
                animate={{
                    width: isHovering ? 60 : 30,
                    height: isHovering ? 60 : 30,
                    backgroundColor: isHovering ? "rgba(59, 130, 246, 0.4)" : "rgba(100, 100, 100, 0.15)",
                    backdropFilter: isHovering ? "blur(4px)" : "blur(0px)",
                    border: isHovering ? "1px solid rgba(59, 130, 246, 0.5)" : "1px solid rgba(150, 150, 150, 0.2)",
                }}
                className="rounded-full transition-colors duration-200"
            />

            {/* Central Dot */}
            <motion.div
                style={{
                    position: "fixed",
                    left: dotX,
                    top: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    pointerEvents: "none",
                    zIndex: 10000,
                }}
                animate={{
                    scale: isClicking ? 0.6 : 1,
                    width: isHovering ? 8 : 4,
                    height: isHovering ? 8 : 4,
                    backgroundColor: isHovering ? "#3b82f6" : "#000",
                }}
                className="rounded-full dark:invert"
            />
        </>
    );
};
