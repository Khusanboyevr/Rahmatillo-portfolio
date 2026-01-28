import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profile from "../assets/personal.jpg";
import { Link } from "react-router-dom";
import { FaGithub, FaEnvelope, FaFileAlt, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Meteors } from "@/components/ui/meteors";
import { useTranslation } from "react-i18next";
import { RoughNotation } from "react-rough-notation";

export default function Main() {
  const { t } = useTranslation();
  const titles = [t("hero.frontend"), t("hero.trader")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [titles]);

  return (
    <main className="relative min-h-[90vh] transition-colors duration-500 bg-transparent selection:bg-blue-500/30 overflow-hidden flex flex-col justify-center">
      {/* Background Effects */}
      <Meteors number={30} />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 w-full">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-600/70 dark:text-blue-400/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              <HiSparkles className="text-blue-500" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight uppercase tracking-tighter"
            >
              {t("hero.experience")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
                {t("hero.experience_accent")}
              </span>
            </motion.h1>

            <div className="h-10 mt-3 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg sm:text-xl text-gray-400 dark:text-zinc-500 font-bold italic"
                >
                  {titles[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-sm text-gray-500 dark:text-zinc-400 max-w-md leading-relaxed"
            >
              {t("hero.description_part1")}
              <RoughNotation
                type="underline"
                show={true}
                color="#3b82f6"
                strokeWidth={2}
                padding={[0, 2]}
              >
                {t("hero.description_accent1")}
              </RoughNotation>
              {t("hero.description_part2")}
              <RoughNotation
                type="highlight"
                show={true}
                color="#ff8c00"
                padding={[2, 4]}
              >
                {t("hero.description_accent2")}
              </RoughNotation>
              {t("hero.description_part3")}
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <Link to="/projects" className="w-full sm:w-auto">
                <ShimmerButton className="w-full px-7 py-3 text-xs font-bold tracking-widest uppercase">
                  {t("hero.cta_projects")}
                </ShimmerButton>
              </Link>
              <motion.div
                whileHover="hover"
                initial="initial"
                className="w-full sm:w-auto"
              >
                <Link to="/about" className="group relative overflow-hidden px-8 py-3.5 border-2 border-gray-900 dark:border-white rounded-xl w-full sm:w-auto text-center block">
                  <motion.span
                    variants={{
                      initial: { color: "var(--btn-text-start)" },
                      hover: { color: "var(--btn-text-end)" }
                    }}
                    style={{
                      "--btn-text-start": "currentColor",
                      "--btn-text-end": "white"
                    }}
                    className="relative z-10 text-[11px] font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <span className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                      {t("hero.cta_about")} <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform inline-block" />
                    </span>
                  </motion.span>
                  <motion.div
                    variants={{
                      initial: { height: 0 },
                      hover: { height: "100%" }
                    }}
                    className="absolute bottom-0 left-0 right-0 bg-gray-900 dark:bg-white"
                    transition={{ duration: 0.3, ease: "circOut" }}
                  />
                </Link>
              </motion.div>
            </div>

            {/* Socials */}
            <div className="flex justify-center lg:justify-start gap-3 mt-10">
              {[
                { icon: <FaGithub />, link: "https://github.com/Khusanboyevr" },
                { icon: <FaEnvelope />, link: "mailto:web20100101@gmail.com" },
                { icon: <FaFileAlt />, link: "/resume.pdf" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-blue-500/30 text-gray-400 dark:text-zinc-400 hover:text-blue-500 transition-all duration-300 shadow-sm"
                  target="_blank" rel="noreferrer"
                >
                  <span className="text-sm">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
              <div className="absolute inset-[-10px] rounded-[32px] border border-blue-500/5 rotate-3 -z-10"></div>
              <div className="w-full h-full rounded-[28px] overflow-hidden shadow-xl border-2 border-white dark:border-zinc-900">
                <img
                  src={profile}
                  alt="Rahmatillo"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <footer className="text-center text-gray-300 dark:text-zinc-600 text-[9px] font-bold tracking-[0.3em] mt-20 pb-10 uppercase">
          © 2026 husanboyev.uz • {t("hero.footer")}
        </footer>
      </div>
    </main>
  );
}
