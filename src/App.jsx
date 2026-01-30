import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import Main from "./components/Main.jsx";
import Projects from "./components/Projects.jsx";
import Header from "./components/Header.jsx";

import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Admin from "./components/Admin.jsx";
import Resume from "./components/Resume.jsx";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import bodyImg from "./assets/body2.svg";

export default function App() {
  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <MagneticCursor />

      {/* Global Background Grid */}
      <div
        className="
          fixed 
          inset-0
          -z-20
          bg-[#FDFDFD]
          dark:bg-[#030303]
          transition-colors 
          duration-500
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      >
        {/* Dark mode grid overlay */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        ></div>
        <div className="absolute inset-0 bg-[url('/src/assets/body.svg')] opacity-[0.07] dark:opacity-[0.12] dark:invert bg-repeat bg-[length:200px_auto]"></div>
      </div>

      <div className="fixed bottom-10 right-10 z-20">
        <AnimatedThemeToggler />
      </div>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}
