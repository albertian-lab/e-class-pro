// === ASSIGNMENT ICONS AUTO-SWITCH ===

// Membuat SVG tag
const createSvg = (html, size = 20, className = '') => {
    return `
        <svg xmlns="http://www.w3.org/2000/svg"
            width="${size}" height="${size}"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="${className}">
            ${html}
        </svg>
    `;
};

// Path ikon
const iconPaths = {
    BookOpen: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
    Clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    StickyNote: `<path d="M21 4H3C2.45 4 2 4.45 2 5v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM8 12h8m-8 4h4"/>`,
    Filter: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    CalendarDays: `<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/>`,
    Calculator: `<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M12 18h.01"/><path d="M17 14h.01"/><path d="M7 14h.01"/><path d="M12 14h.01"/><path d="M17 10h.01"/><path d="M7 10h.01"/><path d="M12 10h.01"/><path d="M12 22h.01"/><path d="M20 22h.01"/><path d="M4 22h.01"/><path d="M2 8h20v14H2z"/>`,
    Atom: `<circle cx="12" cy="12" r="4"/>`,
    FlaskConical: `<path d="M10.95 4.88 15 2 19.05 4.88A2 2 0 0 1 20 6.64V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.64a2 2 0 0 1 1.05-1.76z"/><path d="M8 22h8"/>`,
    Dna: `<path d="M2 15V9c0-1.7 1.3-3 3-3h14c1.7 0 3 1.3 3 3v6c0 1.7-1.3 3-3 3H5c-1.7 0-3-1.3-3-3z"/>`,
    Globe: `<circle cx="12" cy="12" r="10"/>`,
    TrendingUp: `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`,
    Users: `<circle cx="9.5" cy="7.5" r="4.5"/>`,
    Monitor: `<rect width="20" height="14" x="2" y="3" rx="2"/>`,
    Palette: `<circle cx="12" cy="5" r="3"/>`,
    Activity: `<path d="M2 12h20"/>`,
    Languages: `<circle cx="12" cy="12" r="10"/>`,
    Scale: `<circle cx="12" cy="12" r="10"/>`,
    Sun: `<circle cx="12" cy="12" r="4"/>`,
    Moon: `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`,
};

// 🎯 Auto-switch Color System
const pickColor = (theme, category) => {
    const map = {
        light: {
            religion: "text-yellow-600",
            civics: "text-red-600",
            bk: "text-rose-600",
            economy: "text-green-600",
            science: "text-blue-600",
            social: "text-indigo-600",
            art: "text-pink-600",
        },
        dark: {
            religion: "text-yellow-400",
            civics: "text-red-400",
            bk: "text-rose-400",
            economy: "text-green-400",
            science: "text-blue-400",
            social: "text-indigo-400",
            art: "text-pink-400",
        },
        quantum: {
            religion: "text-yellow-300 drop-shadow-[0_0_4px_#ffee00]",
            civics: "text-red-300 drop-shadow-[0_0_4px_#ff4444]",
            bk: "text-rose-300 drop-shadow-[0_0_4px_#ff66aa]",
            economy: "text-green-300 drop-shadow-[0_0_4px_#00ff88]",
            science: "text-cyan-300 drop-shadow-[0_0_4px_#00eaff]",
            social: "text-indigo-300 drop-shadow-[0_0_4px_#9e66ff]",
            art: "text-pink-300 drop-shadow-[0_0_4px_#ff55cc]",
        }
    };
    return map[theme]?.[category] || "text-slate-500";
};

// 🔥 MAIN FUNCTION (Auto Switch)
export const getSubjectIcon = (subject, size = 20, className = "") => {
    const s = subject.toLowerCase();

    // cek theme aktif dari <html>
    const theme = document.documentElement.classList.contains("quantum")
        ? "quantum"
        : document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";

    // pencarian kategori
    let iconName = "BookOpen";
    let category = "science";

    if (s.includes("islam") || s.includes("kristen") || s.includes("katolik") ||
        s.includes("hindu") || s.includes("budha") || s.includes("agama")
    ) { iconName = "Sun"; category = "religion"; }
    else if (s.includes("pkn") || s.includes("pancasila")) { iconName = "Scale"; category = "civics"; }
    else if (s.includes("bk") || s.includes("konseling")) { iconName = "Users"; category = "bk"; }
    else if (s.includes("ekonomi")) { iconName = "TrendingUp"; category = "economy"; }
    else if (s.includes("matematika")) { iconName = "Calculator"; category = "science"; }
    else if (s.includes("fisika")) { iconName = "Atom"; category = "science"; }
    else if (s.includes("kimia")) { iconName = "FlaskConical"; category = "science"; }
    else if (s.includes("biologi")) { iconName = "Dna"; category = "science"; }
    else if (s.includes("informatika")) { iconName = "Monitor"; category = "science"; }
    else if (s.includes("geografi")) { iconName = "Globe"; category = "social"; }
    else if (s.includes("sosiologi")) { iconName = "Users"; category = "social"; }
    else if (s.includes("seni")) { iconName = "Palette"; category = "art"; }

    const iconColor = pickColor(theme, category);

    return createSvg(iconPaths[iconName], size, `${iconColor} ${className}`);
};
