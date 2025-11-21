// attendance.js (JavaScript Murni dengan Chart.js)

import { CLASSES, generateStudents, ATTENDANCE_COLORS } from './constants.js';

// --- PLACEHOLDERS UNTUK GLOBAL STATE & ACTIONS (Ganti dengan AppContext Anda) ---
const AttendanceStatus = {
    HADIR: 'Hadir',
    SAKIT: 'Sakit',
    IZIN: 'Izin',
    DISPENSASI: 'Dispensasi',
    ALPA: 'Alpa',
    UNSET: 'Belum Absen'
};

const appState = {
    isAdminLoggedIn: false, 
    adminClass: null,
    getAttendance: (classId, date) => {
        const key = `attendance_${classId}_${date}`;
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error("Error loading attendance:", e);
            return {};
        }
    },
    saveAttendance: (classId, date, data) => {
        const key = `attendance_${classId}_${date}`;
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving attendance:", e);
        }
    }
};

// --- KOMPONEN LOKAL STATE (Pengganti useState) ---
const localState = {
    selectedClass: CLASSES[0],
    students: [],
    attendanceData: {},
    selectedDate: new Date().toISOString().split('T')[0],
    isSaved: false,
    currentTime: new Date(),
    isLocked: false,
    isLateWarning: false,
    isPastCutoff: false,
    chartInstance: null // Menyimpan instance Chart.js
};

const setLocalState = (newState) => {
    Object.assign(localState, newState);
    renderAttendanceComponent();
};

// --- LOGIC HANDLERS ---

const handleStatusChange = (studentId, status) => {
    const newData = {
        ...localState.attendanceData,
        [studentId]: status
    };

    appState.saveAttendance(localState.selectedClass, localState.selectedDate, newData);
    
    setLocalState({ attendanceData: newData, isSaved: true });
    
    setTimeout(() => {
        setLocalState({ isSaved: false });
    }, 2000);
};

const calculateStats = (attendanceData, students) => {
    const stats = Object.values(AttendanceStatus)
        .filter(s => s !== AttendanceStatus.UNSET)
        .map(status => {
            let label = status;
            if (status === AttendanceStatus.DISPENSASI) label = 'Disp';
            
            return {
                name: label,
                fullName: status,
                count: Object.values(attendanceData).filter(s => s === status).length
            };
        });
    
    const unsetCount = students.length - Object.values(attendanceData).filter(s => s !== AttendanceStatus.UNSET).length;
    
    return { stats, unsetCount };
};

const updateTimeLogic = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    
    const isLateWarning = currentHour > 7 || (currentHour === 7 && currentMinute >= 30);
    const isPastCutoff = currentHour >= 8; 

    const isLocked = isPastCutoff && !appState.isAdminLoggedIn;
    
    localState.currentTime = currentTime;
    localState.isLateWarning = isLateWarning;
    localState.isPastCutoff = isPastCutoff;
    localState.isLocked = isLocked;
};

// --- EFFECT/SETUP Awal ---

const setupTimeUpdater = () => {
    const timer = setInterval(() => {
        updateTimeLogic();
        renderAttendanceComponent();
    }, 60000);
    return () => clearInterval(timer);
};
setupTimeUpdater();

const loadAttendanceData = () => {
    // 1. Handle Admin Class Restriction
    if (appState.isAdminLoggedIn && appState.adminClass && localState.selectedClass !== appState.adminClass) {
        localState.selectedClass = appState.adminClass;
    }
    
    // 2. Load Students
    const loadedStudents = generateStudents(localState.selectedClass);
    
    // 3. Load Saved Attendance
    const savedData = appState.getAttendance(localState.selectedClass, localState.selectedDate);
    
    let initialAttendance = {};
    if (Object.keys(savedData).length > 0) {
        initialAttendance = savedData;
    } else {
        loadedStudents.forEach(s => initialAttendance[s.id] = AttendanceStatus.UNSET);
    }
    
    // Hentikan render jika tidak ada perubahan data inti (untuk mencegah loop)
    if (JSON.stringify(localState.students.map(s => s.id)) === JSON.stringify(loadedStudents.map(s => s.id)) && 
        JSON.stringify(localState.attendanceData) === JSON.stringify(initialAttendance)) {
        return;
    }

    setLocalState({
        students: loadedStudents,
        attendanceData: initialAttendance,
        isSaved: false 
    });
};

// --- UTILITY ICONS (Definisi Sederhana) ---
// Perlu disalin dari file attendance-icons.js atau didefinisikan secara global
const createSvg = (name, size = 16, className = '') => {
    const iconPaths = {
        Users: `<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7.5" r="4.5"/><path d="M18 13V9m-2 2h4"/>`,
        CalendarDays: `<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>`,
        Lock: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
        AlertTriangle: `<path d="m21.73 18-9-15a.5.5 0 0 0-.87 0l-9 15a.5.5 0 0 0 .43.75h18.14a.5.5 0 0 0 .43-.75z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
        Bell: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
        Shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>`,
        Save: `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>`,
        Clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
        HelpCircle: `<circle cx="12" cy="12" r="10"/><path d="M9.09 10a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`,
    };
    const path = iconPaths[name] || '';
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">${path}</svg>`;
};

const icons = {
    Users: (size, className = '') => createSvg('Users', size, className),
    CalendarDays: (size, className = '') => createSvg('CalendarDays', size, className),
    Lock: (size, className = '') => createSvg('Lock', size, className),
    AlertTriangle: (size, className = '') => createSvg('AlertTriangle', size, className),
    Bell: (size, className) => createSvg('Bell', size, className),
    Shield: (size, className = '') => createSvg('Shield', size, className),
    Save: (size, className = '') => createSvg('Save', size, className),
    Clock: (size, className = '') => createSvg('Clock', size, className),
    HelpCircle: (size, className = '') => createSvg('HelpCircle', size, className),
};

// --- CHART.JS INITIALIZATION ---

const initializeChart = (stats, rootElement) => {
    // Hapus instance chart lama jika ada
    if (localState.chartInstance) {
        localState.chartInstance.destroy();
    }
    
    const chartData = {
        labels: stats.map(s => s.name),
        datasets: [{
            data: stats.map(s => s.count),
            backgroundColor: stats.map(s => ATTENDANCE_COLORS[s.fullName]),
            borderRadius: 4,
        }]
    };
    
    // Periksa apakah elemen canvas sudah ada dan tersedia
    const canvas = rootElement.querySelector('#attendance-chart');
    if (!canvas) {
        console.error("Canvas element for chart not found.");
        return;
    }

    const newChartInstance = new Chart(canvas, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: (tooltipItems) => {
                            // Mengembalikan fullName dari data stat
                            const index = tooltipItems[0].dataIndex;
                            return stats[index].fullName;
                        },
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y;
                            return label;
                        }
                    },
                    backgroundColor: '#0f172a', 
                    borderColor: '#334155', 
                    titleColor: '#94a3b8',
                    bodyColor: '#f8fafc',
                    boxPadding: 8,
                    borderRadius: 8,
                    borderWidth: 1,
                    titleFont: { weight: 'normal' },
                    bodyFont: { size: 12, weight: 'bold' }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#94a3b8',
                        font: { size: 10 },
                        stepSize: 1,
                        callback: function(value) {
                            if (value % 1 === 0) { // Hanya tampilkan bilangan bulat
                                return value;
                            }
                        }
                    },
                    grid: {
                        color: '#475569',
                        lineWidth: 0.5,
                        drawBorder: false,
                        tickMarkLength: 0
                    }
                },
                x: {
                    ticks: {
                        color: '#94a3b8',
                        font: { size: 11 }
                    },
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });

    localState.chartInstance = newChartInstance;
};

// --- RENDERING FUNCTIONS --- (Dipanggil dari renderAttendanceComponent)

const renderStatusBanner = () => {
    // ... (Sama seperti implementasi sebelumnya) ...
    updateTimeLogic(); 
    const { isLocked, isAdminLoggedIn: isAdmin, isPastCutoff, isLateWarning } = localState;
    
    if (isLocked) {
        return `
            <div class="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                <div class="p-2.5 rounded-full shrink-0 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    ${icons.Lock(20)}
                </div>
                <div class="flex-1">
                    <h3 class="text-sm font-bold uppercase tracking-wide mb-1 text-slate-700 dark:text-slate-300">
                        Absensi Ditutup
                    </h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">
                        Waktu pengisian absensi telah berakhir (08:00 WIB). Silakan hubungi <span class="font-bold">Admin Kelas</span> atau Guru Piket jika ada perubahan data.
                    </p>
                </div>
            </div>
        `;
    } 
    
    if (isAdmin && isPastCutoff) {
        return `
            <div class="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <div class="p-2.5 rounded-full shrink-0 bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200">
                    ${icons.Shield(20)}
                </div>
                <div class="flex-1">
                    <h3 class="text-sm font-bold uppercase tracking-wide mb-1 text-blue-700 dark:text-blue-300">
                        Mode Admin Akses Penuh
                    </h3>
                    <p class="text-sm text-blue-600 dark:text-blue-200">
                        Waktu normal pengisian telah habis, namun Anda memiliki akses Admin untuk mengubah data absensi kapan saja.
                    </p>
                </div>
            </div>
        `;
    }
    
    const icon = isLateWarning ? icons.AlertTriangle(20) : icons.Bell(20, "animate-bounce-slow");
    const bgClass = isLateWarning ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
    const iconBgClass = isLateWarning ? 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-200' : 'bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-200';
    const titleClass = isLateWarning ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300';
    const textClass = isLateWarning ? 'text-red-600 dark:text-red-200' : 'text-amber-600 dark:text-amber-200';
    const title = isLateWarning ? 'Peringatan Batas Waktu' : 'Pengingat Absensi';
    const subtitle = isLateWarning 
        ? `Mohon segera melengkapi data kehadiran. Batas waktu pengisian mandiri adalah pukul <span class="font-bold">08:00 WIB</span>. <span class="block mt-1 font-semibold italic opacity-90">Waktu hampir habis!</span>`
        : `Mohon segera melengkapi data kehadiran. Batas waktu pengisian mandiri adalah pukul <span class="font-bold">08:00 WIB</span>.`;
        
    return `
        <div class="rounded-xl p-4 border flex items-start md:items-center gap-4 shadow-sm transition-colors duration-300 ${bgClass}">
            <div class="p-2.5 rounded-full shrink-0 ${iconBgClass}">
                ${icon}
            </div>
            <div class="flex-1">
                <h3 class="text-sm font-bold uppercase tracking-wide mb-1 ${titleClass}">
                    ${title}
                </h3>
                <p class="text-sm ${textClass}">
                    ${subtitle}
                </p>
            </div>
        </div>
    `;
};


const renderAssignmentTable = (students, attendanceData, isLocked) => {
    const statusKeys = [AttendanceStatus.HADIR, AttendanceStatus.SAKIT, AttendanceStatus.IZIN, AttendanceStatus.DISPENSASI, AttendanceStatus.ALPA];
    
    let tableHtml = students.map((student, index) => {
        const studentStatus = attendanceData[student.id] || AttendanceStatus.UNSET;
        
        const buttonGroup = statusKeys.map((status) => {
            const isSelected = studentStatus === status;
            const baseColor = ATTENDANCE_COLORS[status];
            
            const style = isSelected ? 
                `background-color: ${baseColor}; color: white; box-shadow: 0 4px 12px -2px ${baseColor}66; --tw-ring-color: ${baseColor}; transform: scale(1.05); ring-2 ring-offset-1 dark:ring-offset-slate-900;` : 
                `background-color: #ffffff; color: #64748b; border: 1px solid #e2e8f0;`;

            const label = status === AttendanceStatus.DISPENSASI ? 'Disp' : status;
            
            return `
                <button
                    data-studentid="${student.id}"
                    data-status="${status}"
                    data-action="status-change"
                    ${isLocked ? 'disabled' : ''}
                    class="relative h-9 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all duration-200 flex items-center justify-center
                        ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer'}
                    "
                    style="${style}"
                >
                    ${label}
                </button>
            `;
        }).join('');
        
        return `
            <tr data-studentid="${student.id}" class="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors duration-150">
                <td class="px-4 py-3 text-sm text-center font-mono text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                    ${(index + 1).toString().padStart(2, '0')}
                </td>
                <td class="px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                    ${student.name}
                </td>
                <td class="px-4 py-2">
                    <div class="grid grid-cols-5 gap-2 max-w-xl mx-auto ${isLocked ? 'opacity-50 grayscale pointer-events-none select-none' : ''}">
                        ${buttonGroup}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    return `
        <div class="xl:col-span-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[calc(100vh-350px)] min-h-[600px]">
            
            <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center backdrop-blur-sm">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-6 bg-blue-500 rounded-full"></div>
                    <h2 class="font-bold text-lg text-slate-800 dark:text-white">Daftar Siswa</h2>
                    <span class="px-2 py-0.5 rounded text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        ${localState.selectedClass}
                    </span>
                </div>
                ${localState.isSaved ? `
                    <span class="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                        ${icons.Save(14)} Tersimpan Otomatis
                    </span>
                ` : ''}
            </div>

            <div class="overflow-auto flex-grow custom-scrollbar">
                <table id="attendance-table" class="w-full text-left border-collapse">
                    <thead class="bg-slate-100 dark:bg-slate-950 text-xs uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider sticky top-0 z-20 shadow-sm">
                        <tr>
                            <th class="px-4 py-4 w-14 text-center border-b border-slate-200 dark:border-slate-800">No</th>
                            <th class="px-6 py-4 min-w-[200px] border-b border-slate-200 dark:border-slate-800">Nama Siswa</th>
                            <th class="px-4 py-4 min-w-[450px] border-b border-slate-200 dark:border-slate-800 text-center">Status Kehadiran</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        ${tableHtml}
                    </tbody>
                </table>
            </div>
            
            <div class="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
                <span>Total Siswa: ${students.length}</span>
                <span>Sudah Absen: ${Object.values(attendanceData).filter(s => s !== AttendanceStatus.UNSET).length}</span>
            </div>
        </div>
    `;
};

const renderStatistics = (stats, unsetCount) => {
    return `
        <div class="xl:col-span-1 space-y-6 h-full flex flex-col">
            <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 flex-grow">
                <h2 class="font-bold text-lg mb-6 text-slate-800 dark:text-white flex items-center gap-2">
                    <div class="w-1 h-5 bg-purple-500 rounded-full"></div>
                    Statistik Realtime
                </h2>
                
                <div class="h-56 w-full mb-6">
                    <canvas id="attendance-chart"></canvas>
                </div>

                <div class="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar pr-2">
                    ${stats.map((stat) => `
                        <div class="flex items-center justify-between text-sm p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                            <div class="flex items-center gap-3">
                                <div class="w-3 h-3 rounded-full ring-2 ring-white dark:ring-slate-800 shadow-sm" style="background-color: ${ATTENDANCE_COLORS[stat.fullName]};"></div>
                                <span class="text-slate-700 dark:text-slate-300 font-medium">${stat.fullName}</span>
                            </div>
                            <span class="font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-700 px-2.5 py-0.5 rounded-md shadow-sm border border-slate-100 dark:border-slate-600 min-w-[30px] text-center">
                                ${stat.count}
                            </span>
                        </div>
                    `).join('')}
                    
                    <div class="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center justify-between text-sm p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <div class="flex items-center gap-3">
                                ${icons.HelpCircle(16)}
                                <span class="text-slate-500 dark:text-slate-400 font-medium">Belum Absen</span>
                            </div>
                            <span class="font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2.5 py-0.5 rounded-md shadow-sm min-w-[30px] text-center">
                                ${unsetCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="bg-blue-600 dark:bg-blue-900 rounded-2xl p-5 shadow-lg shadow-blue-500/20 text-white relative overflow-hidden group">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div class="flex gap-4 items-start relative z-10">
                    <div class="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        ${icons.Clock(24)}
                    </div>
                    <div>
                        <h4 class="font-bold text-white text-base mb-1">Auto-Sync Aktif</h4>
                        <p class="text-blue-100 text-xs leading-relaxed opacity-90">
                            Data absensi tersimpan otomatis di penyimpanan lokal browser. Data aman meskipun halaman direfresh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};


// --- FUNGSI UTAMA RENDER KOMPONEN ---

export const renderAttendanceComponent = () => {
    const prevClass = localState.selectedClass;
    const prevDate = localState.selectedDate;

    // Load data jika ada perubahan di luar render
    if (prevClass !== appState.adminClass || prevDate !== localState.selectedDate) {
         loadAttendanceData();
    }
    
    updateTimeLogic();
    
    const { students, attendanceData, selectedClass, selectedDate, isLocked } = localState;
    const { stats, unsetCount } = calculateStats(attendanceData, students);

    const rootElement = document.getElementById('attendance-root'); 
    if (!rootElement) {
        console.error("DOM element with ID 'attendance-root' not found.");
        return;
    }

    // Hanya merender ulang HTML utama jika ada perubahan pada data/view/filter/class/date
    const htmlToRender = `
        <header class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div class="flex-1">
                <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                    <span class="bg-blue-600 text-white p-2 rounded-lg shadow-lg shadow-blue-500/30">
                        ${icons.Users(24)}
                    </span>
                    Absensi Harian
                </h1>
                <p class="text-slate-500 dark:text-slate-400 mt-2 text-base">
                    Rekapitulasi kehadiran siswa Semester 1 TP 2025/2026.
                </p>
            </div>
            <div class="w-full lg:w-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="w-full md:w-48">
                    <label class="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                        ${icons.CalendarDays(14)} Tanggal
                    </label>
                    <input id="date-select"
                        type="date"
                        value="${selectedDate}"
                        class="w-full rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 transition-all"
                    />
                </div>
                <div class="w-full md:w-48">
                    <label class="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase mb-2">
                        ${icons.Users(14)} Kelas
                    </label>
                    ${appState.isAdminLoggedIn && appState.adminClass ? `
                        <div class="w-full rounded-lg border-slate-300 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-slate-500 dark:text-slate-300 px-4 py-2.5 flex items-center justify-between shadow-inner">
                            <span class="font-medium">${selectedClass}</span>
                            ${icons.Lock(14)}
                        </div>
                    ` : `
                        <select id="class-select"
                            value="${selectedClass}"
                            class="w-full rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
                        >
                            ${CLASSES.map(c => `<option value="${c}" ${c === selectedClass ? 'selected' : ''}>${c}</option>`).join('')}
                        </select>
                    `}
                </div>
            </div>
        </header>
        ${renderStatusBanner()}
        <div class="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
            ${renderAssignmentTable(students, attendanceData, isLocked)}
            ${renderStatistics(stats, unsetCount)}
        </div>
    `;

    // 1. Ganti HTML utama
    rootElement.className = "space-y-6 animate-fade-in pb-8";
    rootElement.innerHTML = htmlToRender;

    // 2. Attach Event Listeners (Delegasi)
    const attachListeners = () => {
        // Date/Class Select
        const dateSelect = rootElement.querySelector('#date-select');
        if (dateSelect) dateSelect.addEventListener('change', (e) => loadAttendanceData(setLocalState({ selectedDate: e.target.value })));
        
        const classSelect = rootElement.querySelector('#class-select');
        if (classSelect) classSelect.addEventListener('change', (e) => loadAttendanceData(setLocalState({ selectedClass: e.target.value })));
        
        // Status Buttons
        const tableBody = rootElement.querySelector('#attendance-table tbody');
        if (tableBody) {
            tableBody.addEventListener('click', (e) => {
                const button = e.target.closest('button[data-action="status-change"]');
                if (button && !button.disabled) {
                    const studentId = button.getAttribute('data-studentid');
                    const status = button.getAttribute('data-status');
                    handleStatusChange(studentId, status);
                }
            });
        }
    };
    attachListeners();
    
    // 3. Inisialisasi Chart.js (Dipanggil setelah DOM Chart ada)
    initializeChart(stats, rootElement);
};

// Panggil fungsi pemuatan awal
window.addEventListener('DOMContentLoaded', () => {
    // Memuat data awal dan memanggil render pertama
    loadAttendanceData();
});
