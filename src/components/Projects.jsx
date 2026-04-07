import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      try {
        console.log("Fetching projects from Firebase...");
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjectsList(fetched);
      } catch (err) {
        console.error("Firestore Fetch error:", err);
        setProjectsList([]);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  return (
    <main className="min-h-screen pt-32 bg-transparent transition-colors duration-500  px-4 sm:px-6">
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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <MasonryGrid projects={projectsList} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
