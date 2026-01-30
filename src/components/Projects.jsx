import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GlassCards from "./projects/GlassCards";
import MasonryGrid from "./projects/MasonryGrid";
import { db } from "../lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import ansorImg from "../assets/projects/ansor_med.png";
import shortenerImg from "../assets/projects/shortener.png";
import akademImg from "../assets/projects/akademnashr.png";
import foodImg from "../assets/projects/food_app.png";
import tojikistonImg from "../assets/projects/tojikiston.png";

export default function Projects() {
  const { t } = useTranslation();
  const tabs = [
    { id: "glass", label: t("projects.tabs.glass") },
    { id: "masonry", label: t("projects.tabs.masonry") },
  ];

  const SAMPLE = [
    {
      id: 1,
      title: "Ansor Med",
      minDescription: "Ansor Med — tibbiyot markazi uchun maxsus ishlab chiqilgan premium platforma. Barcha tibbiy xizmatlar bir joyda.",
      description: "Ansor Med tibbiyot markazi uchun zamonaviy va qulay platforma. Foydalanuvchilar shifokorlar ko'rigiga yozilishi va xizmatlar haqida to'liq ma'lumot olishlari mumkin.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/Khusanboyevr/ansor.git",
      demo: "https://ansormedn.netlify.app/",
      image: ansorImg,
    },
    {
      id: 2,
      title: "Akademnashr",
      minDescription: "Akademnashr — nashriyot uyi uchun yaratilgan zamonaviy web-sayt. Kitoblar olamiga xush kelibsiz.",
      description: "Akademnashr nashriyoti uchun ishlab chiqilgan platforma. Kitoblar katalogi, yangiliklar va nashriyot faoliyati haqida batafsil ma'lumot.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "TailwindCSS"],
      github: "https://github.com/Khusanboyevr/akademnashr.git",
      demo: "https://akademnashrmy.netlify.app",
      image: akademImg,
    },
    {
      id: 3,
      title: "Shortening API",
      minDescription: "URL Shortener — uzun havolalarni qisqartirish va ularni boshqarish uchun texnologik yechim.",
      description: "Uzun havolalarni soniyalar ichida qisqartiruvchi va statistikani kuzatuvchi servis. API orqali boshqa servislar bilan integratsiya imkoniyati.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "Node.js", "Express"],
      github: "https://github.com/Khusanboyevr/shortening-api.git",
      demo: "https://rahmatillo-shortterining.netlify.app",
      image: shortenerImg,
    },
    {
      id: 4,
      title: "Premium Food",
      minDescription: "Food delivery app — taom yetkazib berish xizmati uchun zamonaviy va interaktiv interfeys.",
      description: "Restoranlar va mijozlarni bog'lovchi qulay interfeysli taom yetkazib berish ilovasi. Silliq animatsiyalar va foydalanuvchiga qulay dizayn.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "TailwindCSS", "Framer Motion"],
      github: "",
      demo: "https://bucolic-gaufre-266faa.netlify.app",
      image: foodImg,
    },
    {
      id: 5,
      title: "Tojikiston",
      minDescription: "Tojikiston — Tojikistonning go'zal tabiati va madaniyati haqida ma'lumot beruvchi interfaol platforma.",
      description: "Tojikistonning turistik salohiyati, tog'lari, ko'llari va boy tarixi haqida ma'lumot beruvchi zamonaviy web-sayt. Foydalanuvchilar uchun qulay navigatsiya va vizual boy dizayn.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "TailwindCSS"],
      github: "https://github.com/Khusanboyevr/tojikiston.git",
      demo: "https://tojikiston.netlify.app",
      image: tojikistonImg,
    },
    {
      id: 6,
      title: "Trading",
      minDescription: "Zamonaviy trading platformasi dashboardi",
      description: "Candlestick grafiklar, texnik tahlil indikatorlari va portfel boshqaruvi bilan jihozlangan professional trading interfeysi. Dark mode va qulay UX dizayn.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "Chart.js", "TailwindCSS"],
      github: "https://github.com/Khusanboyevr/trading.git",
      demo: "https://tradinng.netlify.app/",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftradinng.netlify.app%2F?w=1200&h=800",
    },
    {
      id: 7,
      title: "Worldty",
      minDescription: "Worldty — Dunyo mamlakatlari haqida to'liq ma'lumot beruvchi interfaol platforma.",
      description: "Bayroqlar, aholi soni, mintaqalar va boshqa ko'plab qiziqarli ma'lumotlar bilan boyitilgan interfaol platforma. Foydalanuvchilar qidiruv va filtrlash orqali mamlakatlar haqida batafsil ma'lumot olishlari mumkin.",
      startYear: "2025", endYear: "2025",
      tags: ["React", "TailwindCSS", "Rest API"],
      github: "https://github.com/Khusanboyevr/countries-about.git",
      demo: "https://worldty.netlify.app/",
      image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fworldty.netlify.app%2F?w=1200&h=800",
    }
  ];

  const [active, setActive] = useState("glass");
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (fetched.length > 0) {
          // Merge fetched projects with SAMPLE projects, avoiding duplicates by title
          const sampleFiltered = SAMPLE.filter(s => !fetched.some(f => f.title === s.title));
          setProjectsList([...fetched, ...sampleFiltered]);
        } else {
          setProjectsList(SAMPLE);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setProjectsList(SAMPLE);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <main className="min-h-screen pt-20 bg-transparent transition-colors duration-500  px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between ">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-zinc-100">
              {t("projects.title")}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base max-w-md">
              {t("projects.description")}
            </p>
          </div>

          <div className="flex p-1 bg-gray-100 dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl w-fit border border-gray-200 dark:border-zinc-800 mt-6 sm:mt-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-6 py-2 text-sm font-semibold rounded-xl transition-all duration-300 ${active === t.id
                  ? "bg-white dark:bg-zinc-800 text-black dark:text-white shadow-md"
                  : "text-gray-500 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-200"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <section className="relative">
          {loading ? (
            <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="text-gray-500 dark:text-zinc-400 text-sm font-medium tracking-widest uppercase"
              >
                {t("projects.loading")}
              </motion.p>
            </div>
          ) : (
            <>
              {active === "glass" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <GlassCards projects={projectsList} />
                </div>
              )}
              {active === "masonry" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <MasonryGrid projects={projectsList} />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
