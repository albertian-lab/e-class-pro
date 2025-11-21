// --- Defisi Minimal (Menggantikan Typescript Types dan Constants) ---
const MOCK_ASSIGNMENTS = [
    { id: 'a1', title: 'Math Homework', due: '2025-12-01', isCompleted: false, classId: 'A101' },
    { id: 'a2', title: 'Science Project', due: '2025-12-15', isCompleted: true, classId: 'B202' }
];
const DUMMY_STUDENT_ID = 'S999';
const DUMMY_DATE = '2025-11-21';

/**
 * Global Store / State Manager (Pengganti AppContext)
 * Menggunakan pola Module untuk mengelola state privat
 */
const AppStore = (() => {
    // Array untuk menyimpan listener yang akan dipanggil saat state berubah
    let listeners = [];

    // --- State Privat (Menggantikan useState) ---
    let state = {
        theme: localStorage.getItem('theme') || 'dark', // Ambil dari localStorage atau default 'dark'
        assignments: loadAssignmentsFromLocalStorage(),
        isAdminLoggedIn: false,
        adminClass: null,
    };

    // --- Persistence Helper Functions (Menggantikan State Initializer dan useEffect) ---
    
    function loadAssignmentsFromLocalStorage() {
        try {
            const saved = localStorage.getItem('assignments');
            return saved ? JSON.parse(saved) : MOCK_ASSIGNMENTS;
        } catch (error) {
            console.error("Failed to load assignments from local storage", error);
            return MOCK_ASSIGNMENTS;
        }
    }

    function saveAssignmentsToLocalStorage() {
        localStorage.setItem('assignments', JSON.stringify(state.assignments));
    }

    function saveThemeToLocalStorage() {
        localStorage.setItem('theme', state.theme);
        // Terapkan kelas tema langsung ke body (menggantikan useEffect di React)
        document.getElementById('app-body').className = state.theme;
    }

    // --- Observer Pattern (Untuk Memberitahu Komponen tentang Perubahan State) ---
    function notifyListeners() {
        // Panggil setiap listener dengan state yang diperbarui
        listeners.forEach(listener => listener(state));
    }

    // --- Public Interface (Menggantikan AppContextType functions) ---
    
    return {
        // Mengambil state saat ini (Pengganti useContext)
        getState: () => ({ ...state }),

        // Menambahkan listener (Pengganti Komponen yang menggunakan useContext dan Hooks)
        subscribe: (listener) => {
            listeners.push(listener);
            // Kembalikan fungsi unsubscribe
            return () => {
                listeners = listeners.filter(l => l !== listener);
            };
        },

        // --- Theme Logic ---
        toggleTheme: () => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            saveThemeToLocalStorage();
            notifyListeners();
        },

        // --- Assignment Logic ---
        addAssignment: (assignment) => {
            state.assignments = [...state.assignments, assignment];
            saveAssignmentsToLocalStorage();
            notifyListeners();
        },

        deleteAssignment: (id) => {
            state.assignments = state.assignments.filter(a => a.id !== id);
            saveAssignmentsToLocalStorage();
            notifyListeners();
        },

        // --- Persistence/Attendance Logic ---
        getAttendance: (classId, date) => {
            const key = `attendance-${classId}-${date}`;
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : {};
        },

        saveAttendance: (classId, date, data) => {
            const key = `attendance-${classId}-${date}`;
            localStorage.setItem(key, JSON.stringify(data));
            // Catatan: Biasanya tidak perlu notifyListeners di sini kecuali tampilan berubah
        },

        // --- Admin Auth Logic ---
        loginAdmin: (classId) => {
            state.isAdminLoggedIn = true;
            state.adminClass = classId;
            notifyListeners();
        },
        
        logoutAdmin: () => {
            state.isAdminLoggedIn = false;
            state.adminClass = null;
            notifyListeners();
        }
    };
})();

// Panggil untuk inisialisasi tema saat aplikasi dimuat
AppStore.getState().theme === 'dark' 
    ? document.getElementById('app-body').classList.add('dark') 
    : document.getElementById('app-body').classList.remove('dark');
