import React, { useState, useEffect } from "react";
import { db, auth, storage } from "../lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

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

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (u) fetchProjects();
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const fetchProjects = async () => {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        setProjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            alert("Login xatosi: " + err.message);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageUrl = formData.image;

            if (imageFile) {
                const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            if (!imageUrl && formData.demo) {
                // Use WordPress MShot as a backup/auto-generate
                imageUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(formData.demo)}?w=1200&h=800`;
            }

            if (!imageUrl) {
                alert("Iltimos, rasm yuklang, URL kiriting yoki Demo linkini yozing");
                setUploading(false);
                return;
            }

            await addDoc(collection(db, "projects"), {
                ...formData,
                image: imageUrl,
                tags: formData.tags.split(",").map(t => t.trim()),
                createdAt: new Date()
            });

            alert("Loyiha qo'shildi!");
            setFormData({ title: "", minDescription: "", description: "", tags: "", github: "", demo: "", image: "", startYear: "2024", endYear: "Hozirgacha" });
            setImageFile(null);
            fetchProjects();
        } catch (err) {
            alert("Xato: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const generatePreview = () => {
        if (formData.demo) {
            const previewUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(formData.demo)}?w=1200&h=800`;
            setFormData({ ...formData, image: previewUrl });
        } else {
            alert("Avval Demo linkini kiriting");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Loyihani o'chirishni xohlaysizmi?")) {
            await deleteDoc(doc(db, "projects", id));
            fetchProjects();
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center dark:text-white font-medium">Yuklanmoqda...</div>;

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-[#09090b]">
                <form onSubmit={handleLogin} className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
                    <h1 className="text-2xl font-bold mb-6 dark:text-white text-center">Admin Login</h1>
                    <div className="space-y-4">
                        <input
                            type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="password" placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-[0.98]">Kirish</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 pt-24 bg-gray-50 dark:bg-[#09090b]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold dark:text-white">Loyiha Boshqaruvi</h1>
                        <p className="text-gray-500 text-sm mt-1">Yangi loyihalar qo'shish va boshqarish</p>
                    </div>
                    <button onClick={() => signOut(auth)} className="px-5 py-2 bg-red-500/10 text-red-500 rounded-xl font-bold hover:bg-red-500/20 transition">Chiqish</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Add Form */}
                    <form onSubmit={handleAddProject} className="space-y-4 bg-white dark:bg-zinc-900 p-7 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 h-fit">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Yangi Loyiha Qo'shish</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Loyiha Nomi</label>
                                <input placeholder="Masalan: Portfolio Site" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Loyiha Rasmi</label>
                                <div className="space-y-3">
                                    {formData.image && (
                                        <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-100 dark:border-zinc-800 mb-2">
                                            <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                            <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full p-2.5 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                                    <div className="flex items-center gap-4">
                                        <hr className="flex-1 dark:border-zinc-800" />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">yoki URL</span>
                                        <hr className="flex-1 dark:border-zinc-800" />
                                    </div>
                                    <input placeholder="https://..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Qisqa Tavsif</label>
                                <textarea placeholder="Loyiha haqida qisqacha..." required value={formData.minDescription} onChange={e => setFormData({ ...formData, minDescription: e.target.value })} className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white h-24 outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm" />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Texnologiyalar (vergul bilan)</label>
                                <input placeholder="React, Tailwind, Firebase" required value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">GitHub</label>
                                    <input placeholder="GitHub URL" value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} className="w-full p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 mb-1 ml-1 uppercase tracking-wider">Demo</label>
                                    <div className="flex gap-2">
                                        <input placeholder="Demo URL" value={formData.demo} onChange={e => setFormData({ ...formData, demo: e.target.value })} className="flex-1 p-3 rounded-xl border dark:bg-zinc-800 dark:border-zinc-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" />
                                        <button type="button" onClick={generatePreview} className="px-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500/20 transition-all text-[10px] font-bold uppercase tracking-tight">Rasm yaratish</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button disabled={uploading} className="group relative w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400 overflow-hidden shadow-xl shadow-blue-500/25 active:scale-[0.98] mt-4">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {uploading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saqlanmoqda...
                                    </>
                                ) : "Loyiha Qo'shish"}
                            </span>
                        </button>
                    </form>

                    {/* Project List */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Mavjud Loyihalar ({projects.length})</h2>
                        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-3 custom-scrollbar">
                            {projects.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-300 dark:border-zinc-800 text-center px-6">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold dark:text-white">Hech narsa topilmadi</h3>
                                    <p className="text-sm text-gray-500 mt-1">Hali bitta ham loyiha qo'shilmadi. Birinchi loyihangizni yarating!</p>
                                </div>
                            ) : (
                                projects.map(proj => (
                                    <div key={proj.id} className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                                        <div className="flex items-center gap-5">
                                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                                                <img src={proj.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold dark:text-white text-base">{proj.title}</h3>
                                                <div className="flex flex-wrap gap-2 mt-1.5">
                                                    {proj.tags.slice(0, 3).map((t, idx) => (
                                                        <span key={idx} className="text-[9px] font-bold px-2 py-0.5 bg-blue-500/5 text-blue-600 dark:text-blue-400 rounded-lg">{t}</span>
                                                    ))}
                                                    {proj.tags.length > 3 && <span className="text-[9px] text-gray-400">+{proj.tags.length - 3}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(proj.id)} className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-500/5 rounded-2xl transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
