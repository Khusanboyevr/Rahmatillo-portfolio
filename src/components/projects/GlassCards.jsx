import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";

export default function VerticalFullScreenSlider({ projects }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("down");
  const [isHovering, setIsHovering] = useState(false);

  const isAnimating = useRef(false);
  const lastActionTime = useRef(0);
  const touchStartY = useRef(0);

  /* BODY SCROLLNI BLOKLASH */
  useEffect(() => {
    // document.body.style.overflow = "hidden";
    // return () => (document.body.style.overflow = "auto");
  }, []);

  /* SLIDE O'ZGARTIRISH */
  const changeSlide = (dir) => {
    if (isAnimating.current) return;
    const now = Date.now();
    if (now - lastActionTime.current < 650) return;
    lastActionTime.current = now;

    isAnimating.current = true;
    setDirection(dir);

    setIndex((prev) => {
      if (dir === "down") {
        return (prev + 1) % projects.length; // Infinite loop forward
      } else {
        return (prev - 1 + projects.length) % projects.length; // Infinite loop backward
      }
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 550);
  };

  /* AUTO SLIDE */
  useEffect(() => {
    let interval;
    if (!isHovering) {
      interval = setInterval(() => {
        changeSlide("down");
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [index, isHovering, projects.length]);

  /* MOUSE WHEEL */
  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) < 30) return;
      changeSlide(e.deltaY > 0 ? "down" : "up");
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [index]);

  /* KEYBOARD */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowDown") changeSlide("down");
      if (e.key === "ArrowUp") changeSlide("up");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  /* TOUCH */
  useEffect(() => {
    const start = (e) => (touchStartY.current = e.touches[0].clientY);
    const end = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 60) return;
      changeSlide(diff > 0 ? "down" : "up");
    };
    window.addEventListener("touchstart", start);
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [index]);

  const variants = {
    enter: () => ({
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: () => ({
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <div
      className="relative w-full h-[85vh] overflow-y-auto sm:overflow-hidden dark:bg-[#09090b] transition-colors duration-500"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* PROGRESS NUQTALAR */}
      <div className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 flex-col gap-3 z-20">
        {projects.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === index
              ? "bg-black dark:bg-white scale-125"
              : "bg-gray-400 dark:bg-zinc-700"
              }`}
          />
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative w-full flex flex-col items-center pb-20 sm:pb-0"
        >
          {/* IMAGE - O'lchamlar saqlab qolindi */}
          <div className="mt-[3vh] w-full flex justify-center px-4 flex-shrink-0">
            <img
              src={projects[index].image}
              alt={projects[index].title}
              className="w-full max-w-5xl h-auto max-h-[40vh] sm:max-h-[55vh] object-contain rounded-3xl shadow-2xl dark:border dark:border-zinc-800"
            />
          </div>

          {/* INFO CARD - O'lchamlar va stil saqlandi, dark mode qo'shildi */}
          <div className="relative mt-4 w-full max-w-5xl bg-white dark:bg-zinc-900/90 dark:backdrop-blur-md rounded-2xl shadow-xl px-5 py-3 mx-4 flex flex-col gap-2 border border-gray-100 dark:border-zinc-800 flex-shrink-0">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-zinc-100">
                {projects[index].title}
              </h2>
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {projects[index].startYear} / {projects[index].endYear}
              </span>
            </div>

            <p className="text-gray-700 dark:text-zinc-300 text-sm sm:text-base leading-tight">
              {projects[index].minDescription || projects[index].description}
            </p>

            <div className="flex flex-wrap gap-2">
              {projects[index].tags.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-black dark:bg-zinc-100 text-white dark:text-black rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Tugmalar bo'limi - Mobileda korinishi uchun gap-3 va mt-1 saqlandi */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {projects[index].github && (
                <a
                  href={projects[index].github}
                  target="_blank"
                  className="flex-1 border border-black dark:border-zinc-700 rounded-xl py-2 text-center flex justify-center items-center hover:bg-black dark:hover:bg-zinc-100 hover:text-white dark:hover:text-black dark:text-zinc-200 transition text-sm font-semibold"
                >
                  GitHub 🔗
                </a>
              )}
              {projects[index].demo && (
                <a
                  href={projects[index].demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 "
                >
                  <ShimmerButton className="w-full h-full flex items-center justify-center gap-2 text-sm">
                    {projects[index].title}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </ShimmerButton>
                </a>
              )}
            </div>

            {/* BorderBeam doim oxirida turadi */}
            <BorderBeam
              size={200}
              duration={10}
              className="opacity-40 dark:opacity-100"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
