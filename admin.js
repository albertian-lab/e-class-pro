// admin.js (JavaScript Murni dengan DOM Manipulation)
import { CLASSES, CLASS_PASSWORDS } from './constants.js'; // Pastikan path benar
// import { appState, appActions, subscribe } from './app-context.js'; // Ganti dengan path AppContext Anda

// --- FUNGSI UTILITY (Pengganti React Hooks dan Context) ---

// Placeholder untuk Context API (asumsi ada file app-context.js yang mengelola state global)
const appState = {
    assignments: [], // Ganti dengan data nyata
    isAdminLoggedIn: false,
    adminClass: null,
};

const appActions = {
    addAssignment: (newAssignment) => console.log('Add:', newAssignment),
    deleteAssignment: (id) => console.log('Delete:', id),
    updateAssignment: (id, data) => console.log('Update:', id, data),
    loginAdmin: (className) => { appState.isAdminLoggedIn = true; appState.adminClass = className; renderAdminComponent(); },
    logoutAdmin: () => { appState.isAdminLoggedIn = false; appState.adminClass = null; renderAdminComponent(); },
    // Anda perlu mengimplementasikan mekanisme reactive render (subscribe/publish)
};

// State Lokal Komponen (Pengganti useState)
let selectedLoginClass = CLASSES[0];
let passwordInput = "";
let loginError = false;
let isEditing = null; // string | null (id tugas yang sedang diedit)
let formData = {
    classId: CLASSES[0],
    subject: '',
    title: '',
    deadline: '',
    note: ''
};

const setGlobalState = (newState) => {
    Object.assign(window.adminState, newState);
    // Panggil ulang rendering untuk update UI
    renderAdminComponent();
};

window.adminState = {
    selectedLoginClass, passwordInput, loginError, isEditing, formData
};

// SVG Icons (Pengganti Lucide React)
const icons = {
    Lock: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    LogIn: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>`,
    Plus: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    Save: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
    X: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    Edit2: (size = 16) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
    Trash2: (size = 16) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    BookOpen: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
};

// --- LOGIC HANDLERS (Pengganti Component Methods) ---

const handleLogin = (e) => {
    e.preventDefault();
    
    const { selectedLoginClass: currentClass, passwordInput: currentPassword } = window.adminState;

    if (currentPassword === CLASS_PASSWORDS[currentClass]) {
        appActions.loginAdmin(currentClass);
        setGlobalState({ loginError: false, passwordInput: "" });
    } else {
        setGlobalState({ loginError: true });
    }
};

const handleLogout = () => {
    appActions.logoutAdmin();
};

const resetForm = () => {
    setGlobalState({
        formData: {
            classId: appState.adminClass || CLASSES[0],
            subject: '',
            title: '',
            deadline: '',
            note: ''
        },
        isEditing: null
    });
};

const handleEditClick = (assignment) => {
    setGlobalState({ isEditing: assignment.id, formData: { ...assignment } });
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleCancelEdit = () => {
    resetForm();
};

const handleSubmit = (e) => {
    e.preventDefault();
    const { formData: currentFormData, isEditing: currentIsEditing } = window.adminState;
    
    if (!currentFormData.subject || !currentFormData.title || !currentFormData.deadline) return;

    // Security check: ensure admin can only modify their own class
    if (currentFormData.classId !== appState.adminClass) return;

    if (currentIsEditing) {
        appActions.updateAssignment(currentIsEditing, currentFormData);
    } else {
        const newAssignment = {
            id: Date.now().toString(),
            classId: currentFormData.classId,
            subject: currentFormData.subject,
            title: currentFormData.title,
            deadline: currentFormData.deadline,
            note: currentFormData.note || ''
        };
        appActions.addAssignment(newAssignment);
    }
    resetForm();
};

// --- TEMPLATE DAN RENDERING (Pengganti JSX) ---

const createLoginView = () => {
    const { selectedLoginClass: currentClass, passwordInput: currentPassword, loginError: currentError } = window.adminState;
    
    // Create DOM structure for Login View
    const div = document.createElement('div');
    div.className = "flex items-center justify-center min-h-[60vh] animate-fade-in";
    
    div.innerHTML = `
        <div class="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div class="text-center mb-8">
                <div class="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    ${icons.Lock.replace('size="32"', '')}
                </div>
                <h1 class="text-2xl font-bold text-slate-800 dark:text-white">Admin Login</h1>
                <p class="text-slate-500 dark:text-slate-400 mt-2">Akses terbatas untuk administrator kelas.</p>
            </div>
            
            <form id="admin-login-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pilih Kelas</label>
                    <select id="login-class-select"
                        class="w-full rounded-lg border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-blue-500"
                    >
                        ${CLASSES.map(c => `<option value="${c}" ${c === currentClass ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <input id="login-password-input"
                        type="password"
                        value="${currentPassword}"
                        class="w-full rounded-lg border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan password..."
                    />
                </div>
                
                ${currentError ? `
                    <p class="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded">Password salah, silakan coba lagi.</p>
                ` : ''}
                
                <button 
                    type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/30"
                >
                    ${icons.LogIn} Masuk
                </button>
            </form>
        </div>
    `;

    // Attach event listeners
    const form = div.querySelector('#admin-login-form');
    form.addEventListener('submit', handleLogin);
    
    const select = div.querySelector('#login-class-select');
    select.addEventListener('change', (e) => setGlobalState({ selectedLoginClass: e.target.value }));

    const password = div.querySelector('#login-password-input');
    password.addEventListener('input', (e) => setGlobalState({ passwordInput: e.target.value }));
    
    return div;
};

const createAdminPanelView = () => {
    const { isEditing: currentIsEditing, formData: currentFormData } = window.adminState;
    const adminClass = appState.adminClass;
    
    const classAssignments = appState.assignments.filter(a => a.classId === adminClass);
    
    // Main Container
    const mainDiv = document.createElement('div');
    mainDiv.className = "space-y-8 animate-fade-in";
    
    // --- Header ---
    const header = document.createElement('header');
    header.className = "flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-6";
    header.innerHTML = `
        <div>
            <h1 class="text-3xl font-bold text-slate-800 dark:text-white">Panel Admin</h1>
            <p class="text-slate-500 dark:text-slate-400">Kelola tugas untuk kelas <span class="font-bold text-blue-600 dark:text-blue-400">${adminClass}</span></p>
        </div>
        <button id="logout-button" class="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
            Logout
        </button>
    `;
    mainDiv.appendChild(header);

    // Attach Logout listener
    header.querySelector('#logout-button').addEventListener('click', handleLogout);

    // --- Grid Container ---
    const grid = document.createElement('div');
    grid.className = "grid grid-cols-1 lg:grid-cols-3 gap-8";
    
    // --- 1. Add/Edit Form ---
    const formContainer = document.createElement('div');
    formContainer.className = "lg:col-span-1";
    formContainer.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 sticky top-24">
            <h2 class="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                ${currentIsEditing ? `
                    ${icons.Edit2(20).replace('currentColor', 'text-yellow-500')} Edit Tugas
                ` : `
                    ${icons.Plus.replace('width="18"', 'width="20"').replace('height="18"', 'height="20"').replace('currentColor', 'text-blue-500')} Tambah Tugas Baru
                `}
            </h2>
            <form id="assignment-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kelas</label>
                    <input 
                        type="text" 
                        value="${adminClass}" 
                        disabled 
                        class="w-full rounded-md border-slate-300 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 text-slate-500 dark:text-slate-400 p-2.5 text-sm font-bold cursor-not-allowed"
                    />
                    <p class="text-xs text-slate-400 mt-1">Anda hanya dapat menambahkan tugas untuk kelas Anda.</p>
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mata Pelajaran</label>
                    <input id="form-subject"
                        type="text" 
                        class="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: Matematika"
                        value="${currentFormData.subject || ''}"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Tugas</label>
                    <input id="form-title"
                        type="text" 
                        class="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                        placeholder="Judul tugas..."
                        value="${currentFormData.title || ''}"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tenggat Waktu</label>
                    <input id="form-deadline"
                        type="date" 
                        class="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                        value="${currentFormData.deadline || ''}"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan (Opsional)</label>
                    <textarea id="form-note"
                        class="w-full rounded-md border-slate-300 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        placeholder="Instruksi tambahan..."
                    >${currentFormData.note || ''}</textarea>
                </div>
                <div class="flex gap-2">
                    <button 
                        type="submit"
                        class="flex-1 text-white font-medium py-2.5 rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 ${currentIsEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}"
                    >
                        ${currentIsEditing ? icons.Save : icons.Plus}
                        ${currentIsEditing ? 'Simpan Perubahan' : 'Simpan Tugas'}
                    </button>
                    ${currentIsEditing ? `
                        <button id="cancel-edit-button"
                            type="button"
                            class="px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                        >
                            ${icons.X}
                        </button>
                    ` : ''}
                </div>
            </form>
        </div>
    `;

    // Attach form listeners
    const formElement = formContainer.querySelector('#assignment-form');
    formElement.addEventListener('submit', handleSubmit);
    
    // Attach input listeners to update formData state
    const createFormListener = (id, field) => {
        formContainer.querySelector(id).addEventListener('input', (e) => {
            setGlobalState({ formData: { ...window.adminState.formData, [field]: e.target.value } });
        });
    };
    
    createFormListener('#form-subject', 'subject');
    createFormListener('#form-title', 'title');
    createFormListener('#form-deadline', 'deadline');
    createFormListener('#form-note', 'note');

    if (currentIsEditing) {
        formContainer.querySelector('#cancel-edit-button').addEventListener('click', handleCancelEdit);
    }
    
    grid.appendChild(formContainer);


    // --- 2. List View ---
    const listContainer = document.createElement('div');
    listContainer.className = "lg:col-span-2 space-y-4";
    
    // List Header
    listContainer.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <h2 class="text-xl font-bold text-slate-800 dark:text-white">Daftar Tugas ${adminClass}</h2>
            <span class="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Total: ${classAssignments.length}</span>
        </div>
    `;

    // Empty State
    if (classAssignments.length === 0) {
        listContainer.innerHTML += `
            <div class="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 border-dashed">
                ${icons.BookOpen}
                <h3 class="text-lg font-medium text-slate-900 dark:text-white">Belum ada tugas</h3>
                <p class="text-slate-500 text-sm mt-1">Silakan tambah tugas baru melalui form di samping.</p>
            </div>
        `;
    } else {
        // Render Assignments
        classAssignments.forEach(assignment => {
            const assignmentDiv = document.createElement('div');
            const isSelected = currentIsEditing === assignment.id;
            
            assignmentDiv.className = `bg-white dark:bg-slate-900 rounded-lg border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all group ${isSelected ? 'border-yellow-500 ring-1 ring-yellow-500 shadow-md' : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'}`;

            const formattedDate = new Date(assignment.deadline).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

            assignmentDiv.innerHTML = `
                <div class="flex-1 w-full">
                    <div class="flex items-center justify-between md:justify-start gap-2 mb-2">
                        <span class="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                            ${assignment.classId}
                        </span>
                        <span class="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                            ${assignment.subject}
                        </span>
                        <div class="md:hidden flex gap-2">
                            <button data-action="edit" data-id="${assignment.id}" class="p-1.5 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded hover:bg-yellow-100">
                                ${icons.Edit2(16)}
                            </button>
                            <button data-action="delete" data-id="${assignment.id}" class="p-1.5 text-red-600 bg-red-50 dark:bg-red-900/20 rounded hover:bg-red-100">
                                ${icons.Trash2(16)}
                            </button>
                        </div>
                    </div>
                    <h3 class="font-semibold text-slate-800 dark:text-white text-lg">${assignment.title}</h3>
                    ${assignment.note ? `
                        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 italic bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded">"${assignment.note}"</p>
                    ` : ''}
                    <p class="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <span class="w-2 h-2 rounded-full bg-slate-300"></span>
                        Deadline: ${formattedDate}
                    </p>
                </div>
                
                <div class="hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button data-action="edit" data-id="${assignment.id}"
                        class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                    >
                        ${icons.Edit2(16)} Edit
                    </button>
                    <button data-action="delete" data-id="${assignment.id}"
                        class="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                        ${icons.Trash2(16)} Hapus
                    </button>
                </div>
            `;
            
            // Attach specific button listeners (delegation is better, but this is simple)
            assignmentDiv.querySelectorAll('button').forEach(button => {
                const id = button.getAttribute('data-id');
                const action = button.getAttribute('data-action');
                if (action === 'edit') {
                    button.addEventListener('click', () => handleEditClick(assignment));
                } else if (action === 'delete') {
                    button.addEventListener('click', () => appActions.deleteAssignment(id));
                }
            });
            
            listContainer.appendChild(assignmentDiv);
        });
    }

    grid.appendChild(listContainer);
    mainDiv.appendChild(grid);

    return mainDiv;
};


// --- FUNGSI UTAMA RENDER ---

export const renderAdminComponent = () => {
    const rootElement = document.getElementById('admin-root'); // Ganti dengan ID root DOM Anda
    if (!rootElement) {
        console.error("DOM element with ID 'admin-root' not found.");
        return;
    }

    // Bersihkan konten lama
    rootElement.innerHTML = '';
    
    let newView;
    if (!appState.isAdminLoggedIn || !appState.adminClass) {
        newView = createLoginView();
    } else {
        newView = createAdminPanelView();
    }
    
    rootElement.appendChild(newView);
    
    // Sinkronisasi state form setelah render (untuk useEffect equivalent)
    if (appState.adminClass && window.adminState.formData.classId !== appState.adminClass) {
        setGlobalState({ formData: { ...window.adminState.formData, classId: appState.adminClass } });
    }
};

// Panggil untuk memulai aplikasi (misalnya, di file utama Anda)
// renderAdminComponent();
