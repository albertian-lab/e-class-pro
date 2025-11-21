// schedule.js (JavaScript Murni dengan perbaikan Dark Mode)

import { CLASSES, SCHEDULES } from '../constants.js'; 

// --- SVG ICONS (Pengganti Lucide React) ---
const createSvg = (name, size = 16, className = '') => {
    const iconPaths = {
        Calendar: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>`,
        Clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
        BookOpen: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
        User: `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    };
    const path = iconPaths[name] || '';
    // Ikon perlu disetel warna defaultnya agar berubah dengan 'currentColor' atau kelas eksplisit
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">${path}</svg>`;
};

const icons = {
    Calendar: (size, className) => createSvg('Calendar', size, className),
    Clock: (size, className) => createSvg('Clock', size, className),
    BookOpen: (size, className) => createSvg('BookOpen', size, className),
    User: (size, className) => createSvg('User', size, className), // Tambah ikon User
};

// --- KOMPONEN LOKAL STATE (Pengganti useState) ---
const localState = {
    selectedClass: CLASSES[0],
};

const setLocalState = (newState) => {
    Object.assign(localState, newState);
    renderScheduleComponent(); // Panggil render ulang setiap kali state berubah
};

// --- RENDER HELPER UNTUK SATU PELAJARAN ---
const renderLessonItem = (lesson, idx) => {
    const isBreak = lesson.subject === 'ISTIRAHAT';
    
    // PERBAIKAN DARK MODE: Menambahkan kelas teks eksplisit
    const lineClasses = isBreak ? 'border-yellow-300 dark:border-yellow-600' : 'border-slate-200 dark:border-slate-700';
    const markerClasses = isBreak ? 'bg-yellow-400' : 'bg-blue-500';
    
    // Perbaikan warna teks:
    const timeColor = isBreak ? 'text-yellow-600 **dark:text-yellow-400**' : 'text-blue-600 dark:text-blue-400';
    const subjectColor = isBreak ? 'text-slate-500 italic **dark:text-slate-400**' : 'text-slate-900 **dark:text-white**';
    const detailColor = 'text-slate-500 **dark:text-slate-400**'; // Untuk Kode dan Guru

    return `
        <li key="${idx}" class="relative pl-6 border-l-2 ${lineClasses} pb-3 last:pb-0 last:border-0">
            <div class="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${markerClasses} ring-4 ring-white dark:ring-slate-900"></div>
            <div class="flex flex-col">
                <span class="text-xs font-semibold flex items-center gap-1 mb-0.5 ${timeColor}">
                    ${icons.Clock(10)} ${lesson.time}
                </span>
                <span class="text-sm font-bold ${subjectColor}">
                    ${lesson.subject}
                </span>
                ${lesson.code && !isBreak ? `
                    <span class="text-xs ${detailColor} flex items-center gap-1 mt-1">
                        ${icons.BookOpen(10)} Kode: ${lesson.code}
                    </span>
                ` : ''}
                ${lesson.teacher && !isBreak ? `
                    <span class="text-xs ${detailColor} flex items-center gap-1 mt-1">
                        ${icons.User(10)} Guru: ${lesson.teacher}
                    </span>
                ` : ''}
            </div>
        </li>
    `;
};

// --- FUNGSI UTAMA RENDER KOMPONEN ---
export const renderScheduleComponent = () => {
    const { selectedClass } = localState;
    const currentSchedule = SCHEDULES[selectedClass] || [];

    const rootElement = document.getElementById('schedule-root'); // Ganti dengan ID root DOM Anda
    if (!rootElement) {
        console.error("DOM element with ID 'schedule-root' not found.");
        return;
    }

    rootElement.className = "space-y-6 animate-fade-in";

    // --- Header ---
    const headerHtml = `
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 class="text-3xl font-bold text-slate-800 **dark:text-white**">Jadwal Pelajaran</h1>
                <p class="text-slate-500 **dark:text-slate-400**">Jadwal aktif Semester 1 TP 2025/2026.</p>
            </div>
            <div class="w-full md:w-auto">
                <label class="block text-sm font-medium text-slate-700 **dark:text-slate-300** mb-1">Pilih Kelas</label>
                <select 
                    id="class-select"
                    value="${selectedClass}"
                    class="w-full md:w-48 rounded-lg border-slate-300 bg-white **dark:bg-slate-800** dark:border-slate-700 text-slate-900 **dark:text-white** shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                >
                    ${CLASSES.map(c => `<option key="${c}" value="${c}" ${c === selectedClass ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
            </div>
        </header>
    `;

    // --- Jadwal Grid ---
    const scheduleGridHtml = `
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            ${currentSchedule.map((daySchedule) => `
                <div key="${daySchedule.day}" class="bg-white **dark:bg-slate-900** rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 group">
                    <div class="bg-slate-50 **dark:bg-slate-800/50** p-4 border-b border-slate-200 dark:border-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                        <div class="flex items-center gap-2">
                            ${icons.Calendar(20, "text-blue-500")}
                            <h2 class="font-bold text-lg text-slate-800 **dark:text-white** uppercase tracking-wider">${daySchedule.day}</h2>
                        </div>
                    </div>
                    <div class="p-4">
                        <ul class="space-y-3">
                            ${daySchedule.lessons.map(renderLessonItem).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // --- Render ke DOM ---
    rootElement.innerHTML = headerHtml + scheduleGridHtml;
    
    // --- Attach Event Listener ---
    const selectElement = rootElement.querySelector('#class-select');
    if (selectElement) {
        selectElement.addEventListener('change', (e) => {
            setLocalState({ selectedClass: e.target.value });
        });
    }
};

// Di bagian akhir file Schedule.js atau file utama Anda
window.addEventListener('DOMContentLoaded', () => {
    // Pastikan Anda memanggil fungsi ini
    renderScheduleComponent(); 
});
