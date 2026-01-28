import React, { useState, useEffect } from "react";
import GlassCards from "./projects/GlassCards";
import MasonryGrid from "./projects/MasonryGrid";
import { db } from "../lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  const tabs = [
    { id: "glass", label: t("projects.tabs.glass") },
    { id: "masonry", label: t("projects.tabs.masonry") },
  ];

  const SAMPLE = [
    {
      id: 0,
      title: "Istiqbol Luck",
      minDescription: "Istiqbol Luck — xususiy maktab uchun ishlab chiqilgan zamonaviy rasmiy web sayt. ",
      description: "Istiqbol Luck — xususiy maktab uchun ishlab chiqilgan zamonaviy rasmiy web sayt.",
      startYear: "2026", endYear: "2026",
      tags: ["React", "TailwindCSS"],
      github: "https://github.com/soliyevdoston/istiqbolluck-v0.2",
      demo: "https://www.istiqbolluck.uz/",
      image: "https://www.istiqbolluck.uz/og-image.png",
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
          setProjectsList(fetched);
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
            <div className="h-[60vh] flex items-center justify-center dark:text-white">{t("projects.loading")}</div>
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
