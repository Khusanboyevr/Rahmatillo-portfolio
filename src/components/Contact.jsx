import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTelegram,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaSms,
  FaRocket,
} from "react-icons/fa";
import { WarpBackground } from "@/components/ui/warp-background";
import { useTranslation } from "react-i18next";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";

export default function ContactCompact() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [tgConfig, setTgConfig] = useState({
    botToken: "7857475586:AAEA1yRlY1QXtaqnbD6eHUGCgPhBjf0naBI",
    chatId: "6112428725"
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docRef = doc(db, "settings", "telegram");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTgConfig(docSnap.data());
        }
      } catch (err) {
        console.error("Config fetch error:", err);
      }
    };
    fetchConfig();
  }, []);

  const contacts = [
    {
      icon: <FaPhone />,
      label: "+998 50 100 42 81",
      link: "tel:+998501004281",
    },
    { icon: <FaSms />, label: t("contact.sms"), link: "sms:+998501004281" },
    {
      icon: <FaEnvelope />,
      label: "rh20100101@gmail.com",
      link: "mailto:rh20100101@gmail.com",
    },
    {
      icon: <FaTelegram />,
      label: "@elmurodovich01",
      link: "https://t.me/elmurodovich01",
    },
    {
      icon: <FaGithub />,
      label: "github.com/Khusanboyevr",
      link: "https://github.com/Khusanboyevr",
    },
    {
      icon: <FaInstagram />,
      label: "@elmurodovich_r",
      link: "https://instagram.com/elmurodovich_r",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const telegram = e.target.telegram.value;
    const message = e.target.message.value;

    const { botToken, chatId } = tgConfig;

    const text = `🚀 *Yangi xabar!*\n\n👤 *Ism:* ${name}\n📱 *Telegram:* ${telegram}\n📝 *Xabar:* ${message}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      text
    )}&parse_mode=Markdown`;

    try {
      const res = await fetch(url);
      if (res.ok) {
        setSuccess(true);
        e.target.reset();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Xato:", err);
    }
  };

  return (
    <main className="relative min-h-screen bg-transparent transition-colors duration-500 flex flex-col items-center px-4 pt-24 pb-8 gap-8 overflow-x-hidden">
      {/* Warp Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-0">
        <WarpBackground />
      </div>

      <div className="relative w-full max-w-md z-10">
        <div className="text-center px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
            {t("contact.title")}
          </h1>
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-600 dark:text-green-400 font-bold text-center flex items-center gap-2 justify-center mt-2"
            >
              <FaRocket className="text-lg animate-bounce" />
              <span>{t("contact.form.success")}</span>
            </motion.div>
          )}
          <p className="mt-2 text-gray-600 dark:text-zinc-400 text-sm sm:text-base">
            {t("contact.description")}
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl z-10">
        {contacts.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl border border-gray-200 dark:border-zinc-800 shadow-sm
                       transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl hover:bg-white dark:hover:bg-zinc-800/80 group"
          >
            <div className="text-xl sm:text-2xl mb-2 text-gray-800 dark:text-zinc-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {item.icon}
            </div>
            <p className="font-medium text-[13px] sm:text-sm text-gray-900 dark:text-zinc-200 break-all text-center">
              {item.label}
            </p>
          </a>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full max-w-2xl h-px bg-gray-200 dark:bg-zinc-800 z-10"></div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 w-full max-w-2xl z-10 px-2"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            placeholder={t("contact.form.name")}
            required
            className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-300 dark:border-zinc-800 w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 transition-all"
          />
          <input
            type="text"
            name="telegram"
            placeholder={t("contact.form.telegram")}
            required
            className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-300 dark:border-zinc-800 w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 transition-all"
          />
        </div>
        <textarea
          name="message"
          rows="4"
          placeholder={t("contact.form.message")}
          required
          className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-gray-300 dark:border-zinc-800 w-full px-4 py-2.5 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-zinc-100 placeholder:text-gray-400 dark:placeholder:text-zinc-500 transition-all"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-3 bg-black dark:bg-zinc-100 text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/10"
          >
            {t("contact.form.submit")}
          </button>
        </div>
      </form>

      {success && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded-full shadow-2xl z-50 animate-bounce text-sm font-medium">
          {t("contact.form.success")}
        </div>
      )}

      <div className="flex flex-col items-center gap-1 mt-4">
        <p className="text-center text-x text-gray-500 dark:text-zinc-500 font-medium">
          {t("contact.form.note")}
        </p>
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
      </div>
    </main>
  );
}
