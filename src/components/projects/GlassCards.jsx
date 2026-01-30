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
          className="relative w-full max-w-2xl mx-auto flex items-center justify-center px-4 min-h-[85vh] py-12"
        >
          {/* UNIFIED COMPACT GRID UNIT */}
          <div className="w-full grid grid-cols-1 bg-white/5 dark:bg-zinc-900/60 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/10 dark:border-zinc-800/50 shadow-2xl">

            {/* IMAGE SECTION: Aspect-ratio based to 'only take necessary space' */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/8] bg-[#050505] overflow-hidden flex items-center justify-center group border-b border-white/5 dark:border-zinc-800/50">
              {/* Subtle Grid Pattern Overlay for the 'Big Black Space' */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              {/* Blurred Glow behind image */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl scale-110"
                style={{
                  backgroundImage: `url(${projects[index].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />

              <motion.img
                layoutId={`img-${index}`}
                src={projects[index].image}
                alt={projects[index].title}
                className="relative z-10 w-full h-full object-contain p-6 sm:p-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-[1.02]"
              />

              <div className="absolute top-5 left-5 z-20">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">
                    Project {index + 1}
                  </span>
                </div>
              </div>
            </div>

            {/* CONTENT SECTION: Tightly integrated */}
            <div className="p-7 sm:p-9 flex flex-col gap-5 relative bg-zinc-50/50 dark:bg-transparent">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic leading-none">
                    {projects[index].title}
                  </h2>
                  <span className="text-[10px] font-black text-gray-400 dark:text-zinc-500 bg-gray-100 dark:bg-zinc-800/80 px-2.5 py-1 rounded-md uppercase tracking-[0.15em]">
                    {projects[index].startYear}
                  </span>
                </div>
                <div className="h-0.5 w-12 bg-blue-500/50 rounded-full" />
              </div>

              <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                {projects[index].minDescription || projects[index].description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {projects[index].tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[9px] font-bold text-gray-400 dark:text-zinc-600 border border-gray-100 dark:border-zinc-800/50 px-2.5 py-0.5 rounded-md uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* ACTIONS: Compact Grid */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                {projects[index].demo && (
                  <a href={projects[index].demo} target="_blank" rel="noreferrer">
                    <ShimmerButton className="w-full py-3.5 flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest">
                      Live Preview →
                    </ShimmerButton>
                  </a>
                )}
                {projects[index].github && (
                  <a
                    href={projects[index].github}
                    target="_blank"
                    className="px-4 py-3.5 bg-gray-100 dark:bg-zinc-800/40 text-gray-900 dark:text-white rounded-2xl text-center text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 border border-gray-200 dark:border-zinc-800/20"
                  >
                    Source 🔗
                  </a>
                )}
              </div>

              <BorderBeam
                size={300}
                duration={12}
                className="opacity-10 dark:opacity-30"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
