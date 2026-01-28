import React from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BorderBeam } from "@/components/ui/border-beam";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectsShowcase({ projects }) {
  return (
    <div className="relative w-full py-20 flex flex-wrap justify-center gap-10 px-6  dark:bg-[#09090b] transition-colors duration-500">
      {/* Orqa fon uchun nafis nur (faqat dark modeda) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-[120px] -z-10 hidden dark:block"></div>

      {projects.map((p, index) => (
        <div
          key={index}
          className="group relative w-80 p-5 rounded-3xl cursor-pointer
                      dark:bg-zinc-900/40 
                     backdrop-blur-xl border border-gray-200 dark:border-zinc-800
                     shadow-xl transition-all duration-500
                     hover:-translate-y-2 hover:shadow-2xl hover:border-gray-300 dark:hover:border-zinc-700"
        >
          {/* Border Beam Animatsiyasi - har bir karta chetida aylanadi */}
          <BorderBeam
            size={120}
            duration={10}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {/* Image Wrapper */}
          {p.image && (
            <div className="relative overflow-hidden rounded-2xl mb-5 shadow-inner">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-44 object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
              {p.title}
            </h2>

            <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
              {p.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 my-3">
              {p.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md 
                             bg-gray-100 dark:bg-zinc-800/50 
                             text-gray-700 dark:text-zinc-300 
                             border border-gray-200 dark:border-zinc-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-2">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-12 h-10 rounded-xl
                             bg-gray-100 dark:bg-zinc-800 
                             text-gray-900 dark:text-zinc-100 
                             hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black 
                             transition-all duration-300 shadow-sm"
                  title="GitHub Source"
                >
                  <FaGithub size={18} />
                </a>
              )}

              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <ShimmerButton className="w-full">
                    <div className="flex items-center justify-center gap-2 text-sm font-bold">
                      <span className="whitespace-nowrap">{p.title}</span>
                      <FaExternalLinkAlt size={12} />
                    </div>
                  </ShimmerButton>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
