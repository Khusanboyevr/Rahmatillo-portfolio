import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Meteors } from "@/components/ui/meteors";
import { useTranslation } from "react-i18next";
import { FaCode, FaChartLine } from "react-icons/fa";

export default function About() {
  const [mode, setMode] = useState("developer"); // developer | trader
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 pt-24 pb-12 bg-transparent transition-colors duration-500 overflow-hidden">
      {/* Meteor effekti */}
      <Meteors number={20} />

      {/* Mode Switcher */}
      <div className="relative z-20 mb-12 flex p-1 bg-gray-100 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl w-fit border border-gray-200 dark:border-zinc-800">
        <button
          onClick={() => setMode("developer")}
          className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${mode === "developer"
            ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-md"
            : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-200"
            }`}
        >
          <FaCode className={mode === "developer" ? "text-blue-500" : ""} />
          {t("about.developer")}
        </button>
        <button
          onClick={() => setMode("trader")}
          className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${mode === "trader"
            ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-md"
            : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-200"
            }`}
        >
          <FaChartLine className={mode === "trader" ? "text-green-500" : ""} />
          {t("about.trader")}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl w-full relative z-10"
        >
          {mode === "developer" ? (
            <div className="space-y-6 text-gray-800 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p className="text-xl sm:text-3xl font-semibold text-black dark:text-white tracking-tight">
                {t("about.dev_quote")}
                <br />
                <span className="italic text-gray-500 dark:text-zinc-500 font-normal">
                  {t("about.dev_question")}
                </span>
              </p>

              <p>{t("about.dev_lead")}</p>

              <div className="space-y-3">
                <p className="font-medium text-black dark:text-zinc-100">
                  {t("about.today_i_am")}
                </p>
                <ul className="space-y-3 pl-2 sm:pl-4 border-l border-gray-100 dark:border-zinc-800">
                  {t("about.dev_list", { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="h-px w-4 bg-blue-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p>{t("about.dev_summary")}</p>

              <p className="font-medium text-zinc-900 dark:text-zinc-200">
                {t("about.dev_end")}
              </p>
            </div>
          ) : (
            <div className="space-y-6 text-gray-800 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
              <p className="text-xl sm:text-3xl font-semibold text-black dark:text-white tracking-tight">
                {t("about.trade_quote")}
                <br />
                <span className="italic text-gray-500 dark:text-zinc-500 font-normal">
                  {t("about.trade_question")}
                </span>
              </p>

              <p>{t("about.trade_lead")}</p>

              <div className="space-y-3">
                <p className="font-medium text-black dark:text-zinc-100">
                  {t("about.today_i_am")}
                </p>
                <ul className="space-y-3 pl-2 sm:pl-4 border-l border-gray-100 dark:border-zinc-800">
                  {t("about.trade_list", { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="h-px w-4 bg-blue-500"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p>{t("about.trade_summary")}</p>

              <p className="font-medium text-zinc-900 dark:text-zinc-200">
                {t("about.trade_end")}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent" />

          <motion.blockquote
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 text-gray-500 dark:text-zinc-500 italic text-sm sm:text-base max-w-lg leading-relaxed border-l-2 border-blue-500 dark:border-blue-500/50 pl-6"
          >
            {mode === "developer" ? t("about.motto_dev") : t("about.motto_trade")}
          </motion.blockquote>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
