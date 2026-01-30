import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash, FaSignOutAlt, FaCog, FaCheckCircle, FaExclamationCircle, FaCopy, FaEye, FaEyeSlash, FaHome, FaEdit, FaTimes, FaDatabase, FaTelegram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState("projects"); // projects | settings
    const [editingId, setEditingId] = useState(null);
    const [telegramConfig, setTelegramConfig] = useState({
        botToken: "7857475586:AAEA1yRlY1QXtaqnbD6eHUGCgPhBjf0naBI",
        chatId: "6112428725"
    });

    const IMAGE_PRESETS = [
        // Web
        { name: "Web 1", category: "Web", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
        { name: "Web 2", category: "Web", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
        { name: "Web 3", category: "Web", url: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80" },
        { name: "Web 4", category: "Web", url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80" },
        { name: "Web 5", category: "Web", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80" },

        // App
        { name: "App 1", category: "App", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" },
        { name: "App 2", category: "App", url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80" },
        { name: "App 3", category: "App", url: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=800&q=80" },
        { name: "App 4", category: "App", url: "https://images.unsplash.com/photo-1523474253046-2cd2c78b6ad1?auto=format&fit=crop&w=800&q=80" },
        { name: "App 5", category: "App", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80" },

        // Dashboard
        { name: "Dash 1", category: "Dashboard", url: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&w=800&q=80" },
        { name: "Dash 2", category: "Dashboard", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" },
        { name: "Dash 3", category: "Dashboard", url: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80" },
        { name: "Dash 4", category: "Dashboard", url: "https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&w=800&q=80" },
        { name: "Dash 5", category: "Dashboard", url: "https://images.unsplash.com/photo-1518186239751-dc0d6727d99a?auto=format&fit=crop&w=800&q=80" },

        // E-commerce
        { name: "Shop 1", category: "E-commerce", url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80" },
        { name: "Shop 2", category: "E-commerce", url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80" },
        { name: "Shop 3", category: "E-commerce", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" },
        { name: "Shop 4", category: "E-commerce", url: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80" },
        { name: "Shop 5", category: "E-commerce", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80" }
    ];

    // Notifications
    const [notification, setNotification] = useState(null);

    const showNotification = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        minDescription: "",
        description: "",
        tags: "",
        github: "",
        demo: "",
        image: "",
        startYear: new Date().getFullYear().toString(),
        endYear: "Hozirgacha"
    });

    const [imageFile, setImageFile] = useState(null);

    // Settings state
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) {
                fetchProjects();
                fetchTelegramConfig();
                setNewEmail(u.email);
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const fetchTelegramConfig = async () => {
        try {
            const docRef = doc(db, "settings", "telegram");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setTelegramConfig(docSnap.data());
            }
        } catch (err) {
            console.error("Config fetch error:", err);
        }
    };

    const fetchProjects = async () => {
        try {
            const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            showNotification(err.message, "error");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            showNotification("Xush kelibsiz!");
        } catch (err) {
            showNotification("Login xatosi: " + err.message, "error");
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageUrl = formData.image;

            // Only process image if NOT editing (new project)
            if (!editingId) {
                if (imageFile) {
                    const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
                    const snapshot = await uploadBytes(storageRef, imageFile);
                    imageUrl = await getDownloadURL(snapshot.ref);
                }

                if (!imageUrl && formData.demo) {
                    imageUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(formData.demo)}?w=1200&h=800`;
                }

                if (!imageUrl) {
                    showNotification("Iltimos, rasm yuklang yoki URL kiriting", "error");
                    setUploading(false);
                    return;
                }
            }

            const projectData = {
                ...formData,
                image: imageUrl,
                tags: typeof formData.tags === 'string' ? formData.tags.split(",").map(t => t.trim()) : formData.tags,
                updatedAt: new Date()
            };

            if (editingId) {
                await updateDoc(doc(db, "projects", editingId), projectData);
                showNotification("Loyiha yangilandi!");
            } else {
                await addDoc(collection(db, "projects"), {
                    ...projectData,
                    createdAt: new Date()
                });
                showNotification("Loyiha qo'shildi!");
            }

            setFormData({ title: "", minDescription: "", description: "", tags: "", github: "", demo: "", image: "", startYear: new Date().getFullYear().toString(), endYear: "Hozirgacha" });
            setImageFile(null);
            setEditingId(null);
            fetchProjects();
        } catch (err) {
            showNotification("Xato: " + err.message, "error");
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (proj) => {
        setEditingId(proj.id);
        setFormData({
            title: proj.title || "",
            minDescription: proj.minDescription || "",
            description: proj.description || "",
            tags: Array.isArray(proj.tags) ? proj.tags.join(", ") : proj.tags || "",
            github: proj.github || "",
            demo: proj.demo || "",
            image: proj.image || "",
            startYear: proj.startYear || new Date().getFullYear().toString(),
            endYear: proj.endYear || "Hozirgacha"
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const generateScreenshot = () => {
        if (!formData.demo) {
            showNotification("Avval Demo URL kiritishingiz kerak", "error");
            return;
        }
        const url = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(formData.demo)}?w=1200&h=800`;
        setFormData({ ...formData, image: url });
        showNotification("Screenshot generatsiya qilindi!");
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ title: "", minDescription: "", description: "", tags: "", github: "", demo: "", image: "", startYear: new Date().getFullYear().toString(), endYear: "Hozirgacha" });
        setImageFile(null);
    };

    const handleUpdateCredentials = async (e) => {
        e.preventDefault();
        if (!currentPassword) {
            showNotification("O'zgarishlarni saqlash uchun joriy parolni kiriting", "error");
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);

            if (newEmail !== user.email) {
                await updateEmail(user, newEmail);
            }
            if (newPassword) {
                await updatePassword(user, newPassword);
            }

            showNotification("Ma'lumotlar muvaffaqiyatli yangilandi!");
            setCurrentPassword("");
            setNewPassword("");
        } catch (err) {
            showNotification("Xato: " + err.message, "error");
        }
    };

    const handleSeedProjects = async () => {
        if (!window.confirm("Barcha namunaviy loyihalarni bazaga yuklashni tasdiqlaysizmi? (Bu dublikat loyihalar yaratishi mumkin)")) return;

        setUploading(true);
        try {
            // Normally we'd import this from Projects.jsx, but since it's inside the component, 
            // we'll define the core data here for seeding.
            const initialSamples = [
                { title: "Ansor Med", minDescription: "Tibbiyot markazi platformasi", tags: ["React", "TailwindCSS"], github: "https://github.com/Khusanboyevr/ansor.git", demo: "https://ansormedn.netlify.app/", image: "https://ansormedn.netlify.app/og-image.png" },
                { title: "Akademnashr", minDescription: "Nashriyot uyi sayti", tags: ["React", "TailwindCSS"], github: "https://github.com/Khusanboyevr/akademnashr.git", demo: "https://akademnashrmy.netlify.app", image: "https://akademnashrmy.netlify.app/og-image.png" },
                { title: "Shortening API", minDescription: "URL qisqartiruvchi servis", tags: ["Node.js", "React"], github: "https://github.com/Khusanboyevr/shortening-api.git", demo: "https://rahmatillo-shortterining.netlify.app", image: "https://rahmatillo-shortterining.netlify.app/og-image.png" },
                { title: "Tojikiston", minDescription: "Tojikiston turizm platformasi", tags: ["React", "TailwindCSS"], github: "https://github.com/Khusanboyevr/tojikiston.git", demo: "https://tojikiston.netlify.app", image: "https://tojikiston.netlify.app/og-image.png" },
                { title: "Trading", minDescription: "Trading platformasi dashboardi", tags: ["React", "Chart.js"], github: "https://github.com/Khusanboyevr/trading.git", demo: "https://tradinng.netlify.app/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftradinng.netlify.app%2F?w=1200&h=800" },
                { title: "Worldty", minDescription: "Davlatlar haqida ma'lumot platformasi", tags: ["React", "TailwindCSS", "Rest API"], github: "https://github.com/Khusanboyevr/countries-about.git", demo: "https://worldty.netlify.app/", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fworldty.netlify.app%2F?w=1200&h=800" }
            ];

            for (const proj of initialSamples) {
                // Check if project already exists in current list
                const exists = projects.some(p => p.title === proj.title);
                if (!exists) {
                    await addDoc(collection(db, "projects"), {
                        ...proj,
                        description: proj.minDescription,
                        startYear: "2025",
                        endYear: "2025",
                        createdAt: new Date()
                    });
                }
            }
            showNotification("Loyiha namunalari yuklandi (mavjud bo'lmaganlari)!");
            fetchProjects();
        } catch (err) {
            showNotification("Xato: " + err.message, "error");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Loyihani o'chirishni xohlaysizmi?")) {
            try {
                await deleteDoc(doc(db, "projects", id));
                showNotification("Loyiha o'chirildi");
                fetchProjects();
            } catch (err) {
                showNotification(err.message, "error");
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-[#09090b]">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
            />
            <p className="dark:text-white font-medium animate-pulse">Yuklanmoqda...</p>
        </div>
    );

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#09090b]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-zinc-800"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <FaCog className="text-3xl text-blue-500 animate-spin-slow" />
                        </div>
                        <h1 className="text-2xl font-black dark:text-white uppercase tracking-tighter">Admin Login</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full p-4 rounded-xl border-2 border-gray-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:border-blue-500 transition-all"
                        />
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"} placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-gray-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:border-blue-500 transition-all"
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-500/20 active:scale-[0.98]">
                            Kirish
                        </button>
                    </form>
                </motion.div>
                {notification && (
                    <div className={`fixed bottom-8 px-6 py-3 rounded-2xl text-white font-bold shadow-2xl flex items-center gap-3 z-50 ${notification.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
                        {notification.type === "error" ? <FaExclamationCircle /> : <FaCheckCircle />}
                        {notification.msg}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 pt-24 bg-gray-50 dark:bg-[#09090b] transition-colors duration-500">
            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl text-white font-bold shadow-2xl flex items-center gap-3 z-50 ${notification.type === "error" ? "bg-red-500" : "bg-green-500"}`}
                    >
                        {notification.type === "error" ? <FaExclamationCircle /> : <FaCheckCircle />}
                        {notification.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-black dark:text-white tracking-tighter uppercase italic flex items-center gap-3">
                            <span className="w-8 h-8 bg-blue-500 rounded-lg"></span>
                            Admin Panel
                        </h1>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => setActiveTab("projects")}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "projects" ? "bg-blue-500 text-white" : "bg-white dark:bg-zinc-900 text-gray-500"}`}
                            >
                                Loyihalar
                            </button>
                            <button
                                onClick={() => setActiveTab("settings")}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "settings" ? "bg-blue-500 text-white" : "bg-white dark:bg-zinc-900 text-gray-500"}`}
                            >
                                Sozlamalar
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/" className="p-3 bg-white dark:bg-zinc-900 text-gray-500 rounded-xl hover:text-black dark:hover:text-white transition shadow-sm border border-gray-100 dark:border-zinc-800">
                            <FaHome />
                        </Link>
                        <button onClick={() => signOut(auth)} className="flex items-center gap-2 px-5 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition group">
                            <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
                            Chiqish
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === "projects" ? (
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                        >
                            {/* Add Form */}
                            <form onSubmit={handleAddProject} className="space-y-5 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800 h-fit">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-bold dark:text-white flex items-center gap-2">
                                        {editingId ? <FaEdit className="text-blue-500 text-sm" /> : <FaPlus className="text-blue-500 text-sm" />}
                                        {editingId ? "Loyihani Tahrirlash" : "Yangi Loyiha"}
                                    </h2>
                                    {editingId && (
                                        <button type="button" onClick={handleCancelEdit} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Sarlavha</label>
                                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Texnologiyalar</label>
                                            <input placeholder="React, Tailwind" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                        </div>
                                    </div>

                                    {!editingId && (
                                        <div>
                                            <div className="flex justify-between items-end mb-1">
                                                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Loyiha Rasmi</label>
                                                <button type="button" onClick={generateScreenshot} className="text-[10px] text-blue-500 font-bold hover:underline mb-1">
                                                    Demosidan olish
                                                </button>
                                            </div>
                                            <div className="mt-1 space-y-3">
                                                {formData.image && (
                                                    <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-inner group">
                                                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                                        <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl shadow-lg hover:scale-110 transition-all">
                                                            <FaTrash size={12} />
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Presets */}
                                                <div className="space-y-3 mb-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-800">
                                                    {["Web", "App", "Dashboard", "E-commerce"].map(cat => (
                                                        <div key={cat} className="space-y-1">
                                                            <span className="text-[9px] font-black uppercase text-gray-400 ml-1">{cat}</span>
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {IMAGE_PRESETS.filter(p => p.category === cat).map(preset => (
                                                                    <button
                                                                        key={preset.name}
                                                                        type="button"
                                                                        onClick={() => setFormData({ ...formData, image: preset.url })}
                                                                        className="px-2 py-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-700 rounded-lg text-[10px] font-bold dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all"
                                                                    >
                                                                        {preset.name.split(" ")[1]}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex gap-2">
                                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="flex-1 text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                                                    <input placeholder="Yoki URL manzil..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="flex-[1.5] p-2.5 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white text-xs outline-none focus:border-blue-500" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Qisqa Tavsif</label>
                                        <textarea required value={formData.minDescription} onChange={e => setFormData({ ...formData, minDescription: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white h-24 outline-none focus:border-blue-500 resize-none" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">GitHub</label>
                                            <input value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Demo</label>
                                            <input value={formData.demo} onChange={e => setFormData({ ...formData, demo: e.target.value })} className="w-full p-3 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                        </div>
                                    </div>
                                </div>

                                <button disabled={uploading} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 shadow-xl shadow-blue-500/20 active:scale-[0.98]">
                                    {uploading ? "Saqlanmoqda..." : (editingId ? "O'zgarishlarni Saqlash" : "Loyihani Saqlash")}
                                </button>
                            </form>

                            {/* List */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold dark:text-white">Loyihalar ({projects.length})</h2>
                                    <button
                                        onClick={handleSeedProjects}
                                        disabled={uploading}
                                        className="text-[10px] flex items-center gap-2 px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 dark:text-gray-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all font-black uppercase tracking-widest"
                                    >
                                        <FaDatabase size={10} /> Namunalarini Yuklash
                                    </button>
                                </div>
                                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {projects.map(proj => (
                                        <motion.div
                                            layout
                                            key={proj.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-zinc-800">
                                                    <img src={proj.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold dark:text-white leading-tight">{proj.title}</h3>
                                                    <div className="flex gap-2 mt-1">
                                                        <button onClick={() => { navigator.clipboard.writeText(proj.demo); showNotification("Link nusxalandi!"); }} className="text-gray-400 hover:text-blue-500 transition-colors"><FaCopy size={12} /></button>
                                                        <span className="text-[10px] text-gray-400 font-medium">{proj.tags?.[0]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(proj)} className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDelete(proj.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800">
                                <h2 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-3 italic tracking-tighter">
                                    <FaCog className="text-blue-500" /> Hisob Sozlamalari
                                </h2>

                                <form onSubmit={handleUpdateCredentials} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Yangi Email</label>
                                            <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full p-4 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Yangi Parol (O'zgartirmaslik uchun bo'sh qoldiring)</label>
                                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-4 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
                                            <label className="text-[10px] font-black text-blue-500 ml-1 uppercase">Joriy Parol (O'zgarishlarni tasdiqlash uchun)</label>
                                            <input required type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full p-4 rounded-xl border-2 border-blue-100 dark:bg-black dark:border-blue-900 dark:text-white outline-none focus:border-blue-500 shadow-inner" />
                                        </div>
                                    </div>

                                    <button className="w-full py-4 bg-black dark:bg-white dark:text-black text-white rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-xl active:scale-[0.98]">
                                        Yangilashlarni Saqlash
                                    </button>
                                </form>

                                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800">
                                    <h2 className="text-2xl font-black mb-6 dark:text-white flex items-center gap-3 italic tracking-tighter">
                                        <FaTelegram className="text-blue-400" /> Telegram Sozlamalari
                                    </h2>
                                    <form onSubmit={handleUpdateTelegram} className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Bot Token</label>
                                                <input required type="text" value={telegramConfig.botToken} onChange={e => setTelegramConfig({ ...telegramConfig, botToken: e.target.value })} placeholder="7449520976:AAHe_Ait9iP4Uj6WOfFOfNlYj73_BvD6X8o" className="w-full p-4 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Chat ID</label>
                                                <input required type="text" value={telegramConfig.chatId} onChange={e => setTelegramConfig({ ...telegramConfig, chatId: e.target.value })} placeholder="6571597816" className="w-full p-4 rounded-xl border-2 border-gray-50 dark:bg-zinc-800 dark:border-zinc-800 dark:text-white outline-none focus:border-blue-500" />
                                            </div>
                                        </div>
                                        <button disabled={uploading} className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2">
                                            <FaTelegram /> {uploading ? "Saqlanmoqda..." : "Telegramni Saqlash"}
                                        </button>
                                    </form>
                                    <p className="mt-4 text-[10px] text-gray-400 italic">
                                        BotFather orqali bot oching va userinfobot orqali chat idingizni oling.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
