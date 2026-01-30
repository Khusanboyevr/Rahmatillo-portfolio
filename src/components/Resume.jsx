import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode, FaBriefcase, FaGraduationCap, FaGlobe, FaDownload } from "react-icons/fa";

// ----------------------------------------------------------------------
// DATA - EDIT THIS SECTION
// ----------------------------------------------------------------------
const RESUME_DATA = {
    personalInfo: {
        name: "Rahmatillo Elmurdovich",
        title: "Frontend Developer & Trader",
        email: "web20100101@gmail.com",
        phone: "+998 50 100 42 81",
        address: "Farg'ona, O'zbekiston",
        github: "https://github.com/Khusanboyevr",
        linkedin: "https://linkedin.com/in/yourprofile",
        website: "https://yourwebsite.com",
    },
    summary: "Frontend dasturlash bo'yicha kuchli bilimga ega mutaxassis. React, TailwindCSS va zamonaviy web texnologiyalari orqali foydalanuvchilarga qulay va tezkor interfeyslar yaratishga ixtisoslashganman. Shuningdek, moliya bozorlarida trading bilan shug'ullanaman, bu esa menga analitik fikrlash va risklarni boshqarishda yordam beradi.",
    skills: [
        { name: "React.jsx", level: 90 },
        { name: "JavaScript (ES6+)", level: 85 },
        { name: "TypeScript", level: 40 },
        { name: "TailwindCSS", level: 95 },
        { name: "Next.js", level: 80 },
        { name: "Firebase", level: 80 },
        { name: "Git/GitHub", level: 85 },
        { name: "REST API", level: 90 },
    ],
    experience: [
        {
            title: "Frontend Developer",
            company: "Freelance",
            period: "2025 - Hozir",
            description: "Turli xil murakkablikdagi web loyihalarni noldan boshlab ishlab chiqish. Mijozlarning talablariga mos keladigan, responsiv va tezkor saytlar yaratish. Asosan React va TailwindCSS texnologiyalaridan foydalanaman."
        },
        {
            title: "Junior Web Developer",
            company: "Local Studio",
            period: "2024 - 2026",
            description: "Jamoa bilan birgalikda korporativ saytlar ustida ishlash. UI/UX dizaynlarni kodinga o'tkazish va mavjud loyihalarni qo'llab-quvvatlash."
        }
    ],
    education: [
        {
            degree: "Kompyuter Ilmlari",
            school: "Farg'ona Najot Talim",
            period: "2024 - Hozir",
            description: "Dasturiy injiniring yo'nalishi bo'yicha bakalavr darajasi."
        },
        {
            degree: "Frontend Development",
            school: "Online Courses (Udemy, Coursera)",
            period: "2025",
            description: "Chuqurlashtirilgan React va zamonaviy web texnologiyalari kursi."
        }
    ],
    languages: [
        { name: "O'zbek tili", level: "Ona tili" },
        { name: "Turk tili", level: " Erkin so'zlashuv" },
    ]
};

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

export default function Resume() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-transparent px-4 sm:px-6">
            <div className="max-w-4xl mx-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 sm:p-12 shadow-2xl">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-gray-200 dark:border-zinc-800 pb-10">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-2"
                        >
                            {RESUME_DATA.personalInfo.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase"
                        >
                            {RESUME_DATA.personalInfo.title}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-2 text-sm text-gray-600 dark:text-zinc-400"
                    >
                        <a href={`mailto:${RESUME_DATA.personalInfo.email}`} className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                            <FaEnvelope className="text-blue-500" /> {RESUME_DATA.personalInfo.email}
                        </a>
                        <a href={`tel:${RESUME_DATA.personalInfo.phone}`} className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                            <FaPhone className="text-blue-500" /> {RESUME_DATA.personalInfo.phone}
                        </a>
                        <span className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-blue-500" /> {RESUME_DATA.personalInfo.address}
                        </span>
                        <a href={RESUME_DATA.personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                            <FaGithub className="text-blue-500" /> GitHub
                        </a>
                    </motion.div>
                </header>

                {/* Summary */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-3">
                        <span className="w-8 h-1 bg-blue-500 rounded-full"></span> Xulosa
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
                        {RESUME_DATA.summary}
                    </p>
                </motion.section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Main Content Column */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Experience */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                                <FaBriefcase className="text-blue-500" /> Tajriba
                            </h2>
                            <div className="space-y-8 border-l-2 border-gray-100 dark:border-zinc-800 ml-3 pl-8 relative">
                                {RESUME_DATA.experience.map((exp, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute -left-[39px] top-1 w-5 h-5 bg-blue-500 border-4 border-white dark:border-zinc-900 rounded-full"></span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.title}</h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</span>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-gray-500">{exp.period}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Education */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                                <FaGraduationCap className="text-blue-500" /> Ta'lim
                            </h2>
                            <div className="space-y-8 border-l-2 border-gray-100 dark:border-zinc-800 ml-3 pl-8 relative">
                                {RESUME_DATA.education.map((edu, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute -left-[39px] top-1 w-5 h-5 bg-blue-500 border-4 border-white dark:border-zinc-900 rounded-full"></span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-blue-600 dark:text-blue-400 font-semibold">{edu.school}</span>
                                            <span className="text-xs font-bold px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-gray-500">{edu.period}</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-zinc-400 text-sm leading-relaxed">
                                            {edu.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-12">

                        {/* Skills */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                                <FaCode className="text-blue-500" /> Texnik Ko'nikmalar
                            </h2>
                            <div className="space-y-4">
                                {RESUME_DATA.skills.map((skill, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-zinc-400 mb-1">
                                            <span>{skill.name}</span>
                                            <span>{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                                                className="h-full bg-blue-500 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Languages */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                                <FaGlobe className="text-blue-500" /> Tillar
                            </h2>
                            <div className="space-y-4">
                                {RESUME_DATA.languages.map((lang, i) => (
                                    <div key={i} className="p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-gray-100 dark:border-zinc-800">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{lang.name}</h3>
                                        <p className="text-xs text-blue-500 font-medium">{lang.level}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                    </div>
                </div>

                {/* Footer Warning */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-zinc-800 text-center">
                    <p className="text-xs text-gray-400 dark:text-zinc-600 font-mono">
                        * Ushbu ma'lumotlar Resume.jsx faylining yuqori qismidagi RESUME_DATA obyektidan o'zgartirilishi mumkin.
                    </p>
                </div>

            </div>
        </main>
    );
}
