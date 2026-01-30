import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const langTimeoutRef = useRef(null);
  const menuTimeoutRef = useRef(null);

  // Auto-hide language dropdown after 6 seconds
  useEffect(() => {
    if (langOpen) {
      langTimeoutRef.current = setTimeout(() => {
        setLangOpen(false);
      }, 6000);
    }
    return () => clearTimeout(langTimeoutRef.current);
  }, [langOpen]);

  // Auto-hide mobile menu after 6 seconds
  useEffect(() => {
    if (open) {
      menuTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 6000);
    }
    return () => clearTimeout(menuTimeoutRef.current);
  }, [open]);

  // Reset timer on interaction
  const resetLangTimer = () => {
    clearTimeout(langTimeoutRef.current);
    langTimeoutRef.current = setTimeout(() => {
      setLangOpen(false);
    }, 6000);
  };

  const resetMenuTimer = () => {
    clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 6000);
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const languages = [
    { code: "uz", label: "UZ" },
    { code: "ru", label: "RU" },
    { code: "tr", label: "TR" },
    { code: "en", label: "EN" },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  const linkStyle = ({ isActive }) =>
    `relative block px-3 py-2 text-[15px] font-medium transition-colors duration-300
     ${isActive
      ? "text-black dark:text-white"
      : "text-[#2a1818b3] dark:text-zinc-400 hover:text-black dark:hover:text-white"
    }
     after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] 
     after:bg-black dark:after:bg-white after:transition-all after:duration-300 
     after:origin-left ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <header className="sticky top-0 z-50 px-4 py-3 bg-white/70 dark:bg-[#09090b]/70 transition-colors duration-500 backdrop-blur-xl border-b border-gray-200/50 dark:border-zinc-800/50 shadow-sm">
      {/* Gradient glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="relative group">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg leading-none flex items-center overflow-hidden">
            <span className="text-[13px] font-bold text-gray-900 dark:text-zinc-100 tracking-tight">Rahmatillo lazy dev</span>
            {/* Rotating Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent border-t-blue-500 border-r-purple-500 rounded-lg opacity-0 group-hover:opacity-100 animate-spin-slow pointer-events-none"></div>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6">
            {navLinks.map((n) => (
              <NavLink key={n.to} to={n.to} className={linkStyle}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-200 dark:border-zinc-800 hover:border-gray-900 dark:hover:border-white transition-all uppercase"
            >
              <FaGlobe className="text-gray-400" />
              <span>{i18n.language?.split("-")[0].toUpperCase() || "UZ"}</span>
              <FaChevronDown className={`text-[8px] transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onMouseEnter={resetLangTimer}
                  onTouchStart={resetLangTimer}
                  className="absolute right-0 mt-2 w-20 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl shadow-xl p-1 overflow-hidden"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`w-full text-center px-2 py-1.5 text-[10px] font-bold rounded-lg transition-colors ${i18n.language === l.code
                        ? "bg-gray-100 dark:bg-zinc-800 text-black dark:text-white"
                        : "text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-800/50"
                        }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Burger Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center z-50"
            aria-label="Menu"
          >
            <span className={`absolute h-[2px] w-6 bg-black dark:bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute h-[2px] w-6 bg-black dark:bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-[2px] w-6 bg-black dark:bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onMouseEnter={resetMenuTimer}
            onTouchStart={resetMenuTimer}
            className="absolute right-4 top-[65px] w-[200px] md:hidden flex flex-col gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-zinc-800"
          >
            {navLinks.map((n) => (
              <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className={linkStyle}>
                {n.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
