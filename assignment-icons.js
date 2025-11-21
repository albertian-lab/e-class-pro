// assignment-icons.js

// Fungsi helper untuk membuat SVG tag
const createSvg = (html, size = 20, className = '') => {
    // Fungsi ini hanya memberikan ukuran dan kelas, ikon harus diimpor/didefinisikan di tempat lain
    // Untuk tujuan konversi, kita akan menggunakan placeholder yang lebih sederhana
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}">${html}</svg>`;
};

// Ikon spesifik (diambil dari Lucide-react path)
const iconPaths = {
    BookOpen: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
    Clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    StickyNote: `<path d="M21 4H3C2.45 4 2 4.45 2 5v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM8 12h8m-8 4h4"/>`,
    Filter: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    CalendarDays: `<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>`,
    Calculator: `<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M12 18h.01"/><path d="M17 14h.01"/><path d="M7 14h.01"/><path d="M12 14h.01"/><path d="M17 10h.01"/><path d="M7 10h.01"/><path d="M12 10h.01"/><path d="M12 22h.01"/><path d="M20 22h.01"/><path d="M4 22h.01"/><path d="M2 8h20v14H2z"/>`,
    Atom: `<circle cx="12" cy="12" r="4"/><path d="M15 16s2.5 1.5 5 0 5-3 5-3v0"/><path d="M9 16s-2.5 1.5-5 0-5-3-5-3v0"/><path d="M10 8s1.5-2.5 0-5-3-5-3-5v0"/><path d="M14 8s-1.5-2.5 0-5 3-5 3-5v0"/>`,
    FlaskConical: `<path d="M10.95 4.88 15 2 19.05 4.88A2 2 0 0 1 20 6.64V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.64a2 2 0 0 1 1.05-1.76z"/><path d="M8 22h8"/>`,
    Dna: `<path d="M2 15V9c0-1.7 1.3-3 3-3h14c1.7 0 3 1.3 3 3v6c0 1.7-1.3 3-3 3H5c-1.7 0-3-1.3-3-3zM7 6v12M17 6v12M2 12h20M9 6v12M15 6v12M5 9h14M5 15h14"/>`,
    Globe: `<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`,
    TrendingUp: `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`,
    Users: `<path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7.5" r="4.5"/><path d="M17 14l5 5m-5 0l5-5"/>`,
    Monitor: `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="12" x2="12" y1="17" y2="21"/><line x1="8" x2="16" y1="21" y2="21"/>`,
    Palette: `<circle cx="12" cy="5" r="3"/><path d="M20 5c-3 1-4 3-4 4c0 1 1 2 2 2h2c1 0 2-1 2-2c0-1-1-3-4-4z"/><path d="M14 12c-1 3-3 5-5 5c-2 0-4-2-4-4c0-2 2-4 4-4c2 0 4 2 5 4z"/><path d="M6 16c-3 1-4 3-4 4c0 1 1 2 2 2h2c1 0 2-1 2-2c0-1-1-3-4-4z"/>`,
    Activity: `<path d="M10 12h4"/><path d="M12 10v4"/><path d="M2 12h20"/><path d="M12 2v20"/><circle cx="12" cy="12" r="10"/>`,
    Languages: `<path d="M5 8h.01"/><path d="M14 8h.01"/><path d="M10 2v4M10 18v4M2 10h4M18 10h4M10 10v4M12 12h2M12 2h2M12 22h2M2 14h2M18 14h4"/>`,
    Scale: `<path d="M4 14c0 1.1-.9 2-2 2"/><path d="M22 14c0 1.1-.9 2-2 2"/><path d="M12 5v14M17 19H7M5 14h14M7 14c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2M9 19h6M7 5h10M4 14h16"/>`,
    Moon: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
    Sun: `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.44 1.44"/><path d="m17.67 17.67 1.44 1.44"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.44 1.44"/><path d="m19.07 4.93-1.44 1.44"/>`,
    Book: `<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"/>`,
    Bird: `<path d="M15 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2h-1M5 12h14M5 16h14"/>`,
    Flower: `<path d="M12 2c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zM12 14v8M10 21h4M5 12h14"/>`,
    Star: `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    Flame: `<path d="M8.5 15s1.5-3 2.5-3 2 1 2 4-2 4-2 4h-2s-2-1-2-4z"/><path d="M20.5 7s-1.5 3-2.5 3-2-1-2-4 2-4 2-4h2s2 1 2 4z"/><path d="M22 22s-2.5-3-3.5-3-2 1-2 4 2 4 2 4h3s1-1 1-4z"/>`,
    BookHeart: `<path d="M19 21.5V16c0-1.1-.9-2-2-2h-4V4c0-1.1-.9-2-2-2H7C5.9 2 5 2.9 5 4v10H2c-1.1 0-2 .9-2 2v5.5a2.5 2.5 0 0 0 5 0V16h4v5.5a2.5 2.5 0 0 0 5 0V16h4v5.5a2.5 2.5 0 0 0 5 0z"/>`,
    HeartHandshake: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.61 0-3.05.7-4.06 1.76l-1.09 1.09-1.09-1.09A5.5 5.5 0 0 0 4.5 3C2.42 3 1 5.5 1 8.5c0 2.3 1.51 4.04 3 5.5l7 7Z"/><path d="M12 21.5-12 21.5M12 21.5h12M12 21.5L24 9.5"/>`,
    Lightbulb: `<path d="M15 14c.2-.5 1-.9 1.5-.9h.5c.9 0 1.5.6 1.5 1.5v1.9c0 .4-.1.7-.4 1L19 20h-6l-.6-1.5c-.3-.3-.4-.6-.4-1V15c0-.9.6-1.5 1.5-1.5z"/>`,
    // Shared Icons
    Minus: `<path d="M5 12h14"/>`,
    Plus: `<path d="M5 12h14"/><path d="M12 5v14"/>`,
};

// Fungsi getSubjectIcon yang dikonversi
export const getSubjectIcon = (subject, size = 20, className = '') => {
    const s = subject.toLowerCase();
    let iconName = 'BookOpen';
    let iconClass = 'text-slate-400';

    // Logic dari TSX (dipertahankan)
    // --- RELIGION (AGAMA) - YELLOW ---
    if (s.includes('islam')) { iconName = 'Moon'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('kristen')) { iconName = 'Book'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('katolik')) { iconName = 'Bird'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('hindu')) { iconName = 'Flower'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('budha') || s.includes('buddha')) { iconName = 'Sun'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('yahudi')) { iconName = 'Star'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('konghucu')) { iconName = 'Flame'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    else if (s.includes('agama') || s.includes('pabp')) { iconName = 'BookHeart'; iconClass = 'text-yellow-500 dark:text-yellow-400'; }
    // --- CIVICS (PKN) - RED ---
    else if (s.includes('pancasila') || s.includes('pkn')) { iconName = 'Scale'; iconClass = 'text-red-500 dark:text-red-400'; }
    // --- GUIDANCE (BK) - ROSE ---
    else if (s.includes('bk') || s.includes('bimbingan') || s.includes('konseling')) { iconName = 'HeartHandshake'; iconClass = 'text-rose-500 dark:text-rose-400'; }
    // --- ENTREPRENEURSHIP (PKWU/PRAKARYA) - AMBER/LIGHTBULB ---
    else if (s.includes('pkwu') || s.includes('kewirausahaan') || s.includes('wirausaha')) { iconName = 'Lightbulb'; iconClass = 'text-amber-500 dark:text-amber-400'; }
    // --- STEM ---
    else if (s.includes('matematika')) { iconName = 'Calculator'; iconClass = 'text-blue-500 dark:text-blue-400'; }
    else if (s.includes('fisika')) { iconName = 'Atom'; iconClass = 'text-cyan-500 dark:text-cyan-400'; }
    else if (s.includes('kimia')) { iconName = 'FlaskConical'; iconClass = 'text-purple-500 dark:text-purple-400'; }
    else if (s.includes('biologi')) { iconName = 'Dna'; iconClass = 'text-emerald-500 dark:text-emerald-400'; }
    else if (s.includes('informatika') || s.includes('info')) { iconName = 'Monitor'; iconClass = 'text-slate-500 dark:text-slate-400'; }
    // --- SOCIAL ---
    else if (s.includes('geografi')) { iconName = 'Globe'; iconClass = 'text-sky-500 dark:text-sky-400'; }
    else if (s.includes('ekonomi')) { iconName = 'TrendingUp'; iconClass = 'text-green-500 dark:text-green-400'; }
    else if (s.includes('sosiologi')) { iconName = 'Users'; iconClass = 'text-indigo-500 dark:text-indigo-400'; }
    else if (s.includes('sejarah')) { iconName = 'Clock'; iconClass = 'text-amber-700 dark:text-amber-500'; }
    // --- OTHERS ---
    else if (s.includes('seni') || s.includes('prakarya')) { iconName = 'Palette'; iconClass = 'text-pink-500 dark:text-pink-400'; }
    else if (s.includes('pjok') || s.includes('penjas')) { iconName = 'Activity'; iconClass = 'text-orange-500 dark:text-orange-400'; }
    else if (s.includes('bahasa') || s.includes('b.')) { iconName = 'Languages'; iconClass = 'text-teal-500 dark:text-teal-400'; }
    
    return createSvg(iconPaths[iconName] || iconPaths['BookOpen'], size, `${iconClass} ${className}`);
};
