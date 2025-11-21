// assignments.js

// Import helper functions and constants (Asumsi path sudah benar)
import { CLASSES } from './constants.js';
import { getSubjectIcon } from './assignment-icons.js';
// Asumsi Context/State Global
// import { appState, subscribe, renderApp } from './app-context.js'; 

// Placeholder State Global (Ganti dengan implementasi AppContext Anda)
const appState = {
    assignments: [], // Harus diisi data tugas
    isAdminLoggedIn: false,
    adminClass: null,
};
// Asumsi fungsi render ulang global
const renderApp = () => console.log("Render App called (Implement your global rerender logic)");

// State Lokal Komponen (Pengganti useState)
let selectedClassFilter = 'All';
let selectedStatusFilter = 'All';

// State yang harus diperbarui melalui setLocalState
const localState = {
    selectedClassFilter,
    selectedStatusFilter
};

const setLocalState = (newState) => {
    Object.assign(localState, newState);
    renderAssignmentsComponent();
};

// --- LOGIC HANDLERS (Pengganti Component Methods) ---

const getDeadlineStatus = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(dateStr);
    deadline.setHours(0, 0, 0, 0);
    
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays < 0) return { 
        category: 'Terlambat',
        text: 'Terlambat', 
        color: 'text-red-600 dark:text-red-400', 
        bg: 'bg-red-100 dark:bg-red-900/30', 
        border: 'border-red-200 dark:border-red-800' 
    };
    if (diffDays <= 2) return { 
        category: 'Segera',
        text: 'Segera', 
        color: 'text-orange-600 dark:text-orange-400', 
        bg: 'bg-orange-100 dark:bg-orange-900/30', 
        border: 'border-orange-200 dark:border-orange-800' 
    };
    return { 
        category: 'Akan Datang',
        text: `${diffDays} Hari lagi`, 
        color: 'text-green-600 dark:text-green-400', 
        bg: 'bg-green-100 dark:bg-green-900/30', 
        border: 'border-green-200 dark:border-green-800' 
    };
};

const filterAssignments = () => {
    const { selectedClassFilter: classFilter, selectedStatusFilter: statusFilter } = localState;
    
    return appState.assignments.filter(a => {
        const classMatch = classFilter === 'All' || a.classId === classFilter;
        
        if (!classMatch) return false;
        if (statusFilter === 'All') return true;

        const status = getDeadlineStatus(a.deadline);
        return status.category === statusFilter;
    });
};

// --- UTILITY ICONS (Pengganti Lucide-react) ---
const utilityIcons = {
    BookOpen: (size = 32, className = "h-8 w-8 text-slate-400") => getSubjectIcon('', size, className),
    Filter: (size = 16, className = "text-slate-400") => createSvg(iconPaths.Filter, size, className),
    CalendarDays: (size = 16, className = "text-slate-400") => createSvg(iconPaths.CalendarDays, size, className),
    ClockSmall: (size = 12, className = "mr-1") => createSvg(iconPaths.Clock, size, className),
    StickyNote: (size = 16, className = "flex-shrink-0 mt-0.5 text-slate-400") => createSvg(iconPaths.StickyNote, size, className),
};


// --- TEMPLATE DAN RENDERING (Pengganti JSX) ---

const renderAssignmentItem = (assignment) => {
    const status = getDeadlineStatus(assignment.deadline);
    const formattedDate = new Date(assignment.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    
    const div = document.createElement('div');
    div.key = assignment.id;
    div.className = `bg-white dark:bg-slate-900 rounded-xl shadow-lg border overflow-hidden flex flex-col hover:translate-y-[-2px] transition-transform duration-300 ${status.border} dark:border-slate-800`;
    
    div.innerHTML = `
        <div class="p-5 flex-grow">
            <div class="flex justify-between items-start mb-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    ${assignment.classId}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${status.bg} ${status.color}">
                    ${utilityIcons.ClockSmall(12, 'mr-1')}
                    ${status.text}
                </span>
            </div>
            
            <div class="flex gap-3 items-start mb-2">
                <div class="flex-shrink-0 mt-0.5 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                    ${getSubjectIcon(assignment.subject)}
                </div>
                <div>
                    <h3 class="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">${assignment.title}</h3>
                    <p class="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mt-1">${assignment.subject}</p>
                </div>
            </div>
            
            <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-sm text-slate-600 dark:text-slate-300 flex gap-2 border border-slate-100 dark:border-slate-700/50 mt-4">
                ${utilityIcons.StickyNote(16, "flex-shrink-0 mt-0.5 text-slate-400")}
                <p class="italic">${assignment.note || "Tidak ada catatan tambahan."}</p>
            </div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-950/30 px-5 py-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
            <span class="text-slate-500 dark:text-slate-400">Deadline:</span>
            <span class="font-bold text-slate-700 dark:text-slate-200">
                ${formattedDate}
            </span>
        </div>
    `;
    return div;
};

export const renderAssignmentsComponent = () => {
    const rootElement = document.getElementById('assignments-root'); // Ganti ID root DOM
    if (!rootElement) {
        console.error("DOM element with ID 'assignments-root' not found.");
        return;
    }

    // --- Efek Samping Awal (Pengganti useEffect) ---
    if (appState.isAdminLoggedIn && appState.adminClass && localState.selectedClassFilter !== appState.adminClass) {
        // Ini dipanggil sekali saat pertama kali admin login (setelah appState berubah)
        setLocalState({ selectedClassFilter: appState.adminClass });
        return; // Memicu render ulang
    }

    // Bersihkan konten lama
    rootElement.innerHTML = '';
    
    const { selectedClassFilter: classFilter, selectedStatusFilter: statusFilter } = localState;
    const filteredAssignments = filterAssignments();

    // --- Header ---
    const header = document.createElement('header');
    header.className = "flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4";
    header.innerHTML = `
        <div>
            <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Daftar Tugas</h1>
            <p class="text-slate-500 dark:text-slate-400">Tugas aktif dan tenggat waktu pengumpulan.</p>
        </div>
        <div class="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
            <div class="w-full md:w-56 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    ${utilityIcons.Filter(16, "text-slate-400")}
                </div>
                ${appState.isAdminLoggedIn && appState.adminClass ? `
                    <div class="w-full pl-10 pr-4 py-2 rounded-lg border-slate-300 bg-slate-100 dark:bg-slate-700 dark:border-slate-600 text-slate-500 dark:text-slate-300 shadow-sm truncate">
                        ${classFilter}
                    </div>
                ` : `
                    <select id="class-filter-select"
                        value="${classFilter}"
                        class="w-full pl-10 pr-4 py-2 rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none cursor-pointer"
                    >
                        <option value="All">Semua Kelas</option>
                        ${CLASSES.map(c => `<option value="${c}" ${c === classFilter ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                `}
            </div>
            <div class="w-full md:w-48 relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    ${utilityIcons.CalendarDays(16, "text-slate-400")}
                </div>
                <select id="status-filter-select"
                    value="${statusFilter}"
                    class="w-full pl-10 pr-4 py-2 rounded-lg border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                    <option value="All">Semua Status</option>
                    <option value="Segera" ${statusFilter === 'Segera' ? 'selected' : ''}>Segera (≤ 2 Hari)</option>
                    <option value="Akan Datang" ${statusFilter === 'Akan Datang' ? 'selected' : ''}>Akan Datang</option>
                    <option value="Terlambat" ${statusFilter === 'Terlambat' ? 'selected' : ''}>Terlambat</option>
                </select>
            </div>
        </div>
    `;
    
    // Attach event listeners for filters
    const classSelect = header.querySelector('#class-filter-select');
    if (classSelect) {
        classSelect.addEventListener('change', (e) => setLocalState({ selectedClassFilter: e.target.value }));
    }
    const statusSelect = header.querySelector('#status-filter-select');
    if (statusSelect) {
        statusSelect.addEventListener('change', (e) => setLocalState({ selectedStatusFilter: e.target.value }));
    }

    rootElement.appendChild(header);

    // --- Content ---
    const contentDiv = document.createElement('div');
    contentDiv.className = "space-y-6 animate-fade-in";

    if (filteredAssignments.length === 0) {
        contentDiv.innerHTML = `
            <div class="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed shadow-sm">
                <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    ${utilityIcons.BookOpen(32, "h-8 w-8 text-slate-400")}
                </div>
                <h3 class="text-lg font-medium text-slate-900 dark:text-white">Tidak ada tugas</h3>
                <p class="text-slate-500 mt-1">
                    Tidak ada tugas yang cocok dengan filter yang dipilih.
                </p>
            </div>
        `;
    } else {
        const grid = document.createElement('div');
        grid.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
        
        filteredAssignments.forEach(assignment => {
            grid.appendChild(renderAssignmentItem(assignment));
        });
        contentDiv.appendChild(grid);
    }
    
    rootElement.appendChild(contentDiv);
};

// Panggil untuk memulai (misalnya, setelah DOMContentLoaded)
// window.addEventListener('DOMContentLoaded', renderAssignmentsComponent);
