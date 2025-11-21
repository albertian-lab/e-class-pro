// --- Fungsi Rendering ---

function renderAssignments(assignments) {
    const list = document.getElementById('assignments-list');
    list.innerHTML = ''; // Hapus yang lama

    if (assignments.length === 0) {
        list.innerHTML = '<li>No assignments yet.</li>';
        return;
    }

    assignments.forEach(assignment => {
        const li = document.createElement('li');
        li.textContent = `${assignment.title} (Due: ${assignment.due}) - ${assignment.isCompleted ? 'DONE' : 'PENDING'}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => AppStore.deleteAssignment(assignment.id);
        
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

function renderTheme(theme) {
    document.getElementById('theme-display').textContent = theme;
    // Terapkan kelas tema ke body (sudah dilakukan di AppStore, tapi ini untuk demonstrasi)
    document.getElementById('app-body').className = theme;
}

function renderAdminStatus(isAdminLoggedIn, adminClass) {
    document.getElementById('admin-status-display').textContent = isAdminLoggedIn ? 'YES' : 'No';
    document.getElementById('admin-class-display').textContent = adminClass || 'None';
    
    document.getElementById('login-admin-btn').disabled = isAdminLoggedIn;
    document.getElementById('logout-admin-btn').disabled = !isAdminLoggedIn;
}

// --- Listener Utama (Fungsi yang dipanggil saat AppStore berubah) ---

function handleStateChange(state) {
    console.log("State Updated:", state);
    renderTheme(state.theme);
    renderAssignments(state.assignments);
    renderAdminStatus(state.isAdminLoggedIn, state.adminClass);
}

// --- Initialization ---

// 1. Sambungkan Event Listeners ke Tombol (Menggantikan onClick)
document.getElementById('toggle-theme-btn').addEventListener('click', AppStore.toggleTheme);

document.getElementById('login-admin-btn').addEventListener('click', () => {
    AppStore.loginAdmin('A101');
});

document.getElementById('logout-admin-btn').addEventListener('click', AppStore.logoutAdmin);

document.getElementById('add-assignment-btn').addEventListener('click', () => {
    const newId = Date.now().toString();
    const newAssignment = {
        id: newId, 
        title: `New Task #${newId.slice(-4)}`, 
        due: new Date().toISOString().split('T')[0], 
        isCompleted: false,
        classId: 'C303'
    };
    AppStore.addAssignment(newAssignment);
});

// 2. Subscribe ke AppStore (Menggantikan penggunaan useApp/useContext)
AppStore.subscribe(handleStateChange);

// 3. Panggil sekali untuk render awal
handleStateChange(AppStore.getState());
