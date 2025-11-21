// home.js (JavaScript Murni dengan DOM Manipulation)

import { CLASSES } from './constants.js'; 

// --- SVG Icons (Pengganti Lucide React) ---
const createSvg = (name, size = 24, className = '') => {
    const iconPaths = {
        Activity: `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
        Calendar: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>`,
        BookOpen: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
        Users: `<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7.5" r="4.5"/><path d="M17 14v6"/><path d="M20 17h-6"/>`,
        ArrowRight: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
    };
    const path = iconPaths[name] || '';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">${path}</svg>`;
};

// --- QUICK CARD COMPONENT HELPER ---
const QuickCard = (to, title, desc, iconName, color, bg) => {
    return `
        <a href="${to}" class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div class="w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                ${createSvg(iconName, 24)}
            </div>
            <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2">${title}</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${desc}</p>
        </a>
    `;
};


// --- FUNGSI UTAMA RENDER KOMPONEN HOME ---
export const renderHomeComponent = () => {
    const rootElement = document.getElementById('home-root'); // Ganti dengan ID root DOM Anda
    if (!rootElement) {
        console.error("DOM element with ID 'home-root' not found.");
        return;
    }

    rootElement.className = "space-y-8 animate-fade-in pb-12";

    const totalClasses = CLASSES.length;

    rootElement.innerHTML = `
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 shadow-2xl">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div class="relative z-10 px-8 py-12 md:py-20 text-white">
                <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    Selamat Datang di <br/>
                    <span class="text-blue-200">E-Class Pro</span>
                </h1>
                <p class="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
                    Platform manajemen kelas masa depan. Kelola absensi, jadwal, tugas, dan kelompok belajar dengan teknologi modern dan antarmuka futuristik.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="/absensi" class="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105">
                        Mulai Absensi ${createSvg('ArrowRight', 18)}
                    </a>
                    <a href="/jadwal" class="bg-blue-800/50 hover:bg-blue-800/70 text-white px-6 py-3 rounded-xl font-bold backdrop-blur-md border border-blue-500/30 transition-all">
                        Lihat Jadwal
                    </a>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            ${QuickCard(
                "/absensi", 
                "Absensi Harian", 
                "Rekap kehadiran siswa realtime dengan penyimpanan otomatis.",
                "Activity",
                "text-green-500",
                "bg-green-100 dark:bg-green-900/20"
            )}
            ${QuickCard(
                "/jadwal", 
                "Jadwal Pelajaran", 
                "Jadwal mata pelajaran lengkap untuk seluruh kelas.",
                "Calendar",
                "text-purple-500",
                "bg-purple-100 dark:bg-purple-900/20"
            )}
            ${QuickCard(
                "/tugas", 
                "Daftar Tugas", 
                "Monitoring tugas dan tenggat waktu pengumpulan.",
                "BookOpen",
                "text-orange-500",
                "bg-orange-100 dark:bg-orange-900/20"
            )}
            ${QuickCard(
                "/kelompok", 
                "Generator Kelompok", 
                "Acak kelompok belajar secara adil dan instan.",
                "Users",
                "text-pink-500",
                "bg-pink-100 dark:bg-pink-900/20"
            )}
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-4">Status Sistem</h3>
                <div class="space-y-4">
                    <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <span class="text-slate-600 dark:text-slate-400">Total Kelas</span>
                        <span class="font-bold text-slate-900 dark:text-white">${totalClasses} Kelas</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <span class="text-slate-600 dark:text-slate-400">Semester</span>
                        <span class="font-bold text-slate-900 dark:text-white">Ganjil 2025/2026</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                        <span class="text-slate-600 dark:text-slate-400">Mode</span>
                        <span class="font-bold text-blue-500">Online</span>
                    </div>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg flex flex-col justify-center items-center text-center">
                <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                    ${createSvg('Users', 32)}
                </div>
                <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Area Admin</h3>
                <p class="text-slate-500 dark:text-slate-400 mb-6 text-sm">
                    Login sebagai administrator untuk mengelola tugas, mengubah jadwal, dan pengaturan sistem lainnya.
                </p>
                <a href="/admin" class="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors">
                    Masuk ke Admin
                </a>
            </div>
        </div>
    `;
};

// Panggil fungsi render ini di file utama aplikasi Anda setelah DOM dimuat
// window.addEventListener('DOMContentLoaded', renderHomeComponent);
