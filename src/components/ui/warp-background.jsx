"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const WarpBackground = ({ className }) => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0, active: false });
    const idleTimerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        let w, h;
        const stars = [];
        const starCount = 4000; // Significantly increased count
        let speed = 0.05;

        // We'll use these to interpolate the "center" of the warp
        const warpCenter = { x: 0, y: 0 };
        const targetWarpCenter = { x: 0, y: 0 };

        const resize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            warpCenter.x = targetWarpCenter.x = w / 2;
            warpCenter.y = targetWarpCenter.y = h / 2;
        };

        class Star {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = (Math.random() - 0.5) * w * 4;
                this.y = (Math.random() - 0.5) * h * 4;
                this.z = Math.random() * w;
                this.pz = this.z;
                this.color = Math.random() > 0.8 ? "rgba(100, 150, 255," : "rgba(255, 255, 255,";
            }

            update(centerX, centerY) {
                this.z -= speed * w * 0.15;
                if (this.z <= 0) {
                    this.reset();
                    this.pz = this.z;
                }
            }

            draw(centerX, centerY) {
                const sx = ((this.x - (centerX - w / 2)) * (w / this.z)) + w / 2;
                const sy = ((this.y - (centerY - h / 2)) * (w / this.z)) + h / 2;

                const r = (1 - this.z / w) * 1.2;

                const px = ((this.x - (centerX - w / 2)) * (w / this.pz)) + w / 2;
                const py = ((this.y - (centerY - h / 2)) * (w / this.pz)) + h / 2;

                ctx.beginPath();
                ctx.strokeStyle = `${this.color} ${(1 - this.z / w) * 0.8})`;
                ctx.lineWidth = r;
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();

                this.pz = this.z;
            }
        }

        const init = () => {
            resize();
            stars.length = 0;
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            const isDark = document.documentElement.classList.contains("dark");

            // Dynamic speed based on mouse activity
            const targetSpeed = mouseRef.current.active ? 0.06 : 0.03;
            speed += (targetSpeed - speed) * 0.05;

            // Smoothly move warp center towards mouse or screen center
            if (mouseRef.current.active) {
                targetWarpCenter.x = mouseRef.current.x;
                targetWarpCenter.y = mouseRef.current.y;
            } else {
                targetWarpCenter.x = w / 2;
                targetWarpCenter.y = h / 2;
            }

            warpCenter.x += (targetWarpCenter.x - warpCenter.x) * 0.1;
            warpCenter.y += (targetWarpCenter.y - warpCenter.y) * 0.1;

            ctx.fillStyle = isDark ? "rgba(10, 10, 11, 0.25)" : "rgba(240, 242, 245, 0.25)";
            ctx.fillRect(0, 0, w, h);

            stars.forEach((star) => {
                star.update(warpCenter.x, warpCenter.y);
                star.draw(warpCenter.x, warpCenter.y);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;

            // Reset idle timer
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                mouseRef.current.active = false;
            }, 2000);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        init();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("absolute inset-0 w-full h-full overflow-hidden", className)}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
            />
            {/* Integrated Grid Overlay */}
            <div
                className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                }}
            />
        </div>
    );
};
