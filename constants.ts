
import { Assignment, AttendanceStatus, ScheduleMap } from "./types";

export const CLASSES = Array.from({ length: 11 }, (_, i) => {
    const num = i + 1;
    return `11 P ${num < 10 ? '0' + num : num}`;
});

// Admin Passwords per Class
export const CLASS_PASSWORDS: Record<string, string> = {};
CLASSES.forEach((className, index) => {
    CLASS_PASSWORDS[className] = `smansa${index + 1}`;
});

// Subject Codes Mapping
export const SUBJECT_MAP: Record<string, string> = {
    "PABP": "Pendidikan Agama",
    "PJOK": "Penjasorkes",
    "BINGTL": "B. Inggris Tingkat Lanjut",
    "BJEP": "Bahasa Jepang",
    "SR": "Seni Rupa",
    "BIND": "Bahasa Indonesia",
    "BK": "Bimbingan Konseling",
    "SOSI": "Sosiologi",
    "BIDTL": "B. Indonesia Tingkat Lanjut",
    "MM": "Matematika",
    "SEJA": "Sejarah",
    "PRKY": "Prakarya",
    "MLBJ": "Muatan Lokal B. Jawa",
    "PEPA": "Pendidikan Pancasila",
    "BING": "Bahasa Inggris",
    "FISI": "Fisika",
    "KIMI": "Kimia",
    "BIOL": "Biologi",
    "EKON": "Ekonomi",
    "GEOG": "Geografi",
    "INFO": "Informatika",
    "MMTL": "Matematika Tingkat Lanjut",
    "PD": "Projek / Pulang Dini",
    "U": "Upacara",
    "IST": "Istirahat"
};

// Real Student Data Based on Official Documents (Total 372 Students)
const STUDENTS_DATA: Record<string, string[]> = {
    "11 P 01": [
        "ABDAN PANJI SAPUTRO", "ADINDA KHUMAIROH SHODIK", "AHMAD RIZKY SAPUTRA", "ANA KHANIFAN", 
        "BESCHA SHIREEN PUTRI ASMADIYAR", "BUNGA CECILIA WIBOWO", "CANAYA PUTRI AULIA", "CHRISTIAN TONI ARIYANTO", 
        "DARA AYU ANASTASYA", "DESI ANTIKA SARI", "DIDE SATRIA VALENTINO", "EKA FIRDA APRILIASARI", 
        "ENDY WICAKSANA", "FANCY ALEXANDER REMUS KURNIAWAN", "FERI AHMAD FERNANDA", "FERRISKA PRATISTA", 
        "GADING RAYA RAMADHANI CHRISDIANTO", "HAFIZ FAKHRI ARFA", "HANNY SETYANINGRUM", "HELMI RAHMAN HAKIM", 
        "JONA ARRAYA BEKA PUTRA PRASETYA", "KEVIN YAYI KUSUMO", "LINDA DEVITA ALZAHRA", "MUHAMMAD AKBAR BASMALLAH", 
        "MUHAMMAD HAKKIAN NAZILI", "MUHAMMAD PRIYAGUNG DAMAR SASONGKO", "NOVIANA MUFLIKHA", "PRAYATA CELIO ARGANANTA", 
        "REIHAN GALANG SETIAWAN", "RICKY BAGUS ALBERTO PUTRA", "SELA ANINDITA", "SEVYA SALSABILLAH NUGRAINI", 
        "YOGA ADITYA PRATAMA", "ZAKKY TAMAMI RIDLO"
    ],
    "11 P 02": [
        "ADRIAN DJATI PERMANA", "AHMAD MAULANA AFFANDI", "AIDA APRILIA SARI", "ALIA AFIF ZAKIYA", 
        "ANGELINA LEONY VINANDA", "ANNISA MAHARANI", "CELLONA SALSABILA IRWANDA", "ELSA MEIRINA PUTRI KRISTANTO", 
        "FARADIZ OQUEVADZAN WIBOWO", "HAVA HASBI SYAFIAR MAULANA ATTAR", "IQBAL MAULANA JATMIKO", "JUWITA TRI ANGGRAINI", 
        "KEYSHA MEYCHARLA", "LADIYA SUHENDRO", "LUKFIAN DWI KURNIAWAN", "MARIA LALITA VISTARA", 
        "MITZYLEA YIERRA CHRISTABEL", "MOCHAMAD KHOIRUMAN", "MUHAMMAD RIZQY APRILLIANSYAHR", "NATHANIA OCTAGRACIA STHEVANNY", 
        "NIRAYA FILRIZKY", "NOAN DHESTA ARTSAVINA", "RAHMADDIA OSYA WIDYANATA", "REZA MAULANA AZIDAN", 
        "RISKA MELISA PITASARI", "ROMNEYA NARARYA PUTRI KINASIH", "SAMUEL EVANDER GILBERT", "VENSKA SALWA AZURA", 
        "WARIDDAL INTI'BAH", "WIDYA JAYANTI CAHYANINGRUM", "WINEDAR MAULIA ARDHINI", "YOGA K, HADI PRATAMA", 
        "YULIA LILIK NURHAYATI", "ZETA JOEVINA"
    ],
    "11 P 03": [
        "AISYAH RIZKY JANUAR", "ANANDA RACHO PUTRA NUGROHO", "ANGELINA HAPPY FANANI IRMALIA", "ANITA ELPI MAHARANI", 
        "ARENTA BELVA AMELIA", "ARJUN EKA SANUSI", "AURELLIA LEVI MEISYAH", "AZZA ANNISA", 
        "CHILMA AFFAT SYAKINA AHDANISA", "DIMAS MA'AROUF JULIANSYAH", "ELISIA NADHIR", "ELVIRA ELSYA KIRANA PUTRI", 
        "ENRICO FAREL GEOVANI", "EVRILLIAN RISKY SAPUTRA", "HANA KHAIRUNISA HAMIDA", "HANIF ROIHANAH SHOFI", 
        "HELLEN MEGA VERNANDA", "JOCELLIN VANESYA", "KHANSA NABILA HADI HANIFAH", "KIRANA MISHYA PUTRI WAHYUDA", 
        "LINTANG NUR AYUNNI", "MOHAMMAD MALFY RISEY", "MUHAMMAD FAZIL JAUHAR TIANUSRA", "MUHAMMAD SATRIO MAULANA", 
        "MUHAMMAD SUFI FATHURAHMAN", "RHYLLA SYAFA' ATTRISHA AULIYA", "RIZKI DWI CAHYANTI", "ROLANDO FERDIAN RIZKI RAMADHANI", 
        "SURYA GURUNG", "TAKHIARA IRANIA RIZQITHA", "TUTUT RAHAYU CAHYANINGTIYAS", "UMROTUL KHAYUMI SU'UDAH", 
        "VIRSYA CLARISMA DIVISALMANTA", "YUNA MARCHELL NAZAR PUTRA"
    ],
    "11 P 04": [
        "ALIA MELFIN RUDIA", "ANNISA ELOK RAMADHANI", "CINTA DWI HARDININGTYAS", "ELVIRA SEPTYA RAMADHANI", 
        "FADLI RIDI FACHRIZA", "FARELL WILLIAM BAGASKARA", "FERY ARDIANSYAH", "GELSI HUWAIDA PUSPONEGARI", 
        "GLADIAN ZWETA AZZAHRAWANI", "INTAN KHABIBATUL MAQFIROH", "JIHAN NAILA RIFDAH", "KEZIA LUNA PRAMUDYA", 
        "KISSYA DE LAURA", "M, RIFQI MAULANA WAHYUDI", "MARISA SUSMITA AINI", "MOCH, IBRAHIM MOVIET AL AMIN", 
        "MOCHAMMAD SHAFFAN PRAMONO", "MOHAMAD REYHAN DAFANTA", "MUHAMAD IKHBAL PRATAMA", "MUHAMMAD DAVID MAULAN", 
        "NABILA SYIFA WARDHANY", "NAJWA DESFIRLIA PUTRI WIDODO", "NASIFA RIZKYA ROFI'I", "NUR AILSA BILQIS ZHIVERILL", 
        "PRAHESTA WAHYUNENDYA", "PRINCES AGREESTA LOVELY TIENDRA", "RAFKA ZAGA DAMAIAR", "RIAN NURMA SANDY", 
        "ROI ARDI ASMORO DEWO", "SARI AGUSTIN", "SEZY YUNINGTYAS", "TALITHA TSAQIF", 
        "TANTY JULIANINGTYAS", "ZALFA NAZIFA FITRIA NIZAR ILANA"
    ],
    "11 P 05": [
        "ADITIA HUSIN BATISTUTA", "ADIVA SEPTA BELQIS RAHMADANI SANTOSO", "AHMAD AFFAN YUSRIYYAH", "AHMAD ALFAN ALFIAN MANASIK", 
        "ALMIRA SANIYYAH CLARISSA PUTRI", "ALVINA NUR HIDAYAH", "ALVIZA NUR HIDAYAH", "ANGGA FEBRIAN SETYO NUGROHO", 
        "ANGGUN ASTA NEYSA", "BASHILIA NADINE ELVIANA", "BRENDA NAJLA PUTRI BIANTARA", "CANDY WINDYA VALENTERA DARMA", 
        "CINDY NUR HIDAYAH", "DESTIA PUTRI AMALIA", "FARANDY GHATHFAN CALVINDORO", "HIRA PUTRI SARASWATI", 
        "IFATH PUTRI HIDAYAH", "INDRA DEVI SETIAWATI", "KIRANA WANGSA PUTRI", "KOMANG FREDELLA SURYAASTAWAN SUCIPTA", 
        "MAULIDYA RANA PUTRI TUNGGA DEWI", "MOH, RAFANSYAH BAGUS HARFANO", "MOHAMMAD RIFQI UBAIDILLAH", "MUHAMMAD FAWWAS MUHYIZABID PRAWIRA ARRIFANI", 
        "MUHAMMAD IQBAL SATRIO WIJAKSONO", "MUHAMMAD RAFFI", "NUR AISYAH WAROHMAH", "NURUL ANISA ILMIYAH", 
        "PRISCILLIA IDA NATISHA REVI", "PUAN KATARA KHAYRERA", "RACHELITA QEISYA PUTRI ANA", "ROSITA RASYIDA ARINI"
    ],
    "11 P 06": [
        "AHMAD IQSAL ARIADI", "ANANDICHA ERVANA PUTRA PRAWIRA", "ANDRE SHANDY MUZAKI", "ARMILDA HANIFAH LAYANA", 
        "AULIA NABILLA SETIAWAN", "AURA FITRI ISTIQOMAH", "BERNESSA RAKA DURIANTO", "BIMA APRILIANSYAH", 
        "CEVIN ADILA PUTRA PRAKA YUDHA", "CHECA ALREZA ARIANTO", "DAVI RAHMADAN PUTRA ISWARA", "DIFTAR GEMA MAULANA", 
        "FAIRUS AZKA NUHA", "FYARLLA MUFIDATUZ ZAHIYAH", "GADING ALFINZA NUGRAHA", "GASTIANDIRRIJAL WIKO FEBRIANSAH", 
        "HILMI RIF'AT ISHOMI", "KIRANA EKA DAMAR PRATOLLAH", "MOHAMMAD FATIHKHUL HUDA", "MUHAMMAD ARVAN KHASYAFI", 
        "MUHAMMAD HAMDAN AL-AMIN", "MUHAMMAD RAJA DICKSON", "MUHHAMMAD UBAI DHIA ARFIN", "NAURA SYIFA AMRINA IKRAM IDI", 
        "NAYA KEYLLA RAHMASARI", "NOFIRSTAN DEO PRASETIYO", "PANJI MANDALA PUTRA", "PUJIANTORO", 
        "RESIANS CINDY PUTRI PATRICIA", "SANDI HERMAWAN", "SAVIRA TITIS FEBRYASARI", "SYIFA ZAULA MU'IZZ", 
        "YASHINTA ADELIA", "ZHIEVANA SERENE SIA ALMIRA"
    ],
    "11 P 07": [
        "ABDI WAHYU PRATAMA", "AHMAD HIRZUL FAHRI", "AHMAD RIZKY PRATAMA", "ALFATIH ANANDA GEOVANY", 
        "ARYA SHAFA MAHARDIKA", "ASHILAH SASMITA BUCHARI", "AYUNING FATIHUL ROHIMAH", "BIYAN LINGGAR HERMAWAN", 
        "CHEZA YOVI NOVANDINI", "DAFIA MUTIARA RAMADHANI", "EGA GUITA FENDERA AKBAR", "EVELLYNA PAMBUDI", 
        "FADIRA MULIA JUNIARITA", "FAREL MANDALA SAPUTRA", "FERNANDO EURO AKBAR", "FREHINO RAMA PUTRA PRAWIRA", 
        "KESYA BULAN AMELIA", "MAYA SHIFA ALIVIA", "MILA ZAKIA", "MUHAMAD AKVIN FAHMI GHUFRON", 
        "MUHAMAD IKHSAN FADILLAH", "MUHAMMAD FATIH AMRU", "MUHAMMAD IQBAL NUR HAKAM", "MUHAMMAD WILDAN BINTANG UZA", 
        "NAFISHA ZAHRA KALISA PUTRI", "REISYA FAIRIZTYA JOCELYN ROY PUTRI", "RIZQI NARARYA FUTRA PRATAMA", "ROYYAN SUMARNO", 
        "SHAFIRA BILZALIA", "SHEBY LOVE RATU BILKISS", "TRI NOVA AHSANU SHUFY SULHA", "TRIYASIH WIBAWATI", 
        "WIRASINDU GIRI SAMODRA", "YUNIOR MUJIANDRI"
    ],
    "11 P 08": [
        "ACHMAD FADIL HAFIDZ FADLURAHMAN", "ALDRICH AKBAR PRADITYA", "ALEXA SAVIRUS SURAWAN", "ALFIAN WIDYATAMA HABIBI", 
        "ALMALIA KHALIFI KIRANA PRATIWI", "ALYA REGHINA ZAKIA MAKTA", "ARDEN BAGAS BIOGRADY", "ARI GILANG PRATAMA", 
        "ARVELLA PUTRI WAHYUDA", "ASFA ABDIA PURWA SABRINA", "ASYAFFIYAH PUTRI WIDIARTO", "DAVINA SHAFIRA HUSNIAH", 
        "DIANDRA BILQIST ASWIN MAULIDA", "EVANA ALTAFUNNISA NURSOLICHIN", "FITRI NANDA AYU LEFINA", "HAQI ELBANA ALFINUHA", 
        "INDAH KUSUMA WARDANI", "JOVITA ANASTASYA VALENTINA", "KAYLA RAGANESIA AULIA SAHRATU", "KEVIN FEBRIANSYAH PUTRA PRATAMA", 
        "KEYSHI ANGGRAINI SEKARWANGI", "LEXY ABHINAYA", "LOFLITA OLIVIA ENIRZHA", "MUHAMMAD CHAIRUS ANAYO SAPUTRA", 
        "MUHAMMAD ROFIF FAWWAS FANDHILAH", "NAILA FAIZURA KHAKIM", "NAUFAL RAFIF BAGUS ANGGARA", "NAURA MUMTAZ ZAHARA EL YAHYA", 
        "NIRINA YUANITA SALSABILA", "QUEENA BINTANG KEJORA ANNISA NASUTION", "RAISA NABIL AL FIZA", "RETRYZYA CANTIKA QUMAYROH", 
        "RISMA FANISA ANGGRAINI", "SABRYA SEKAR ARUM OCTAVIANA"
    ],
    "11 P 09": [
        "AHMAD DARMAWAN", "AL ANALA RHESA AGYA PUTRA", "ARKA MIRUNGGA PANGAYOM", "AURACINTA PUTRI RONITA", 
        "AZKA EKA PUTRA AKBAR", "BERLIANDA OKTALIA PUTRI WULANDARI", "BRIGITA FAIRUZ ZAHIR", "CHEVINA NABILA ZIA FITRIA WAHYU SUGIANTO", 
        "DAFRAN AZKA PUTRA SADA", "DAMAR HILAL RAFAZHA", "DENANDRA CHIARA MAYDINA", "DIDAN PUTRA ARIYANTO", 
        "EGHY DHIAUDIN", "ESTYFANNY CHOLIFATU NISA", "FARA AISYAH RAMADHANI", "FATIMATUZ ZAHRA MAULIDA", 
        "FERDIAN ASPRILINO", "GEAS PUSPITASARI", "IFFA KARIMA", "JENIS ALFIKA", "KAZAHRA INTAN APRILIA", 
        "MA'RIFAN TAQIYAN RAHMADANI", "MUHAMMAD RIDWAN AFANDI", "NABILA ZAHWA YITNAMATSANI", "NANDITA JULIA ARSHINTA", 
        "NESYA ANGGUN AZZAHRA", "NOVITA RAHMA ARDIANA", "RANUM MANAHHANINGSIH", "RISMA PUTRI ZHAFIRA", 
        "SANIA AURA ZULFA", "SHINTA FAHRANI ARIANTI", "SYERIL HANUM KHAFIDATUL AMALIA", "TITA PUTRI RAHAYU", "UMI AINIL FAIZAH"
    ],
    "11 P 10": [
        "ALBION ALERON", "ALVIRA YUDITASARI", "ANGGI NAMI HARAHAP", "ANNA NING VELA", 
        "AURA DIASSYIFA", "BIANDA NADYA ANNISA", "CALISTA FITRI AZ ZAHRA", "CHOIRUNNISA ZAKIYATUN NUFUS", 
        "CHRISTIAN JOHN FRANKLIN", "DERREL ALDEN DHARMA KRISNA", "DINAR NETA AULIA", "DINDA NUR ALIM", 
        "DOIS GIAPRIL NUR CAHYANTI", "DONI FIRNANDO", "FEDERICHA LARASSATI", "GATEN WIDYATMAJA WIBAWA", 
        "GAVRILA SENO EMMANUEL YUSTIRA", "GENDHIS PUTRI BAHARIZKY", "JERRY ADAM FIRMANSYAH", "JULIUZ CHRISTIANO HERLANDO", 
        "JUSTIN JORDAN ERSA PRANYOTO", "KIKIKANAKU RAMADHANI", "MUHAMMAD AFFAN KHALILRANU HANDOKO", "NABILA AMELIA", 
        "NAFISY TABITA CRISAMARYA", "NAZWA KIRANA IMEDA", "NINDYA AGISTA AURELTA", "NURADYAN INTEGRA AGUSTIN", 
        "RADITYA DAMARIS", "RAYYA ZAKIYA SARI", "REVALINA AGUSTINA PUTRI WIBOWO", "RIVALDHO DWI PUTRA H", 
        "TALITHA YUMNA CELIA FAIHA", "YEMIMA BRENDA CHRISSIA"
    ],
    "11 P 11": [
        "AGNES VIANDA RISMAWATI", "ALLANDI ADE FEBIAWAN", "AMIRA NURUL IMAN", "ANGGUN ADISTIA PUTRI", 
        "ANNISA JAZILATA RAMADHANI", "ARDYA KHANZA AZ-ZAHRA", "ASGY NUZULUL RAMADHANY", "AURA VIZKYA ANGGRAINI",
        "AYESHA KHIRANIA AGUSTIEN", "AZAHRA ARDYA MAHARDIKA KIRANI", "CAMILLA FADHIILAH ARIFIN", "DANIS ARKAN PUTRA SADA", 
        "DELIMA RIZKY WIDI ASMARA", "EXCELL IBRA PRATAMA", "FACHRI IMAANUL HAQ", "HAIKAL FATHAN NUGRAHA", 
        "ILMA AIZZA AN NAFIA", "IMANUELLA AYU PUSPITAWATI", "LIS ANISA RAMADHANI", "MOHAMMAD ANDRA DWI ERLANGGA", 
        "MUHAMAD ARDIAS PUTRA", "MUHAMMAD IRSYAD RAIHAN SETIAWAN", "NAIYA MELANIE AMIRAH KURNIAWAN", "NAJWA QOIRADINES", 
        "NISWA DZAKIA SAKHI", "NUR FADILAH ASMARA PRIAMBODO", "PRABU CHESTA CAKRABHIRAWA", "RAHMA ANUGRAH HIDA AGUSTINA", 
        "REGINA SAVANI APHRODITYA BARZAN", "SUCI RAHMAWATI", "TALITHA IMTIYAAZ", "TIARA PUTRI NUR FADHIILAH", 
        "YASMINE ATHAYA ARRASY", "ZAKI AUFAA KAMESWARA"
    ]
};

// Student Generator based on Class ID
export const generateStudents = (classId: string) => {
    const names = STUDENTS_DATA[classId] || [];
    
    return names.map((name, index) => ({
        id: `${classId.replace(/\s/g, '-')}-${index + 1}`,
        name: name
    }));
};

export const MOCK_ASSIGNMENTS: Assignment[] = [
    {
        id: '1',
        classId: '11 P 01',
        subject: 'Matematika',
        title: 'Latihan Persamaan Lingkaran',
        deadline: '2025-11-20',
        note: 'Kerjakan di buku latihan hal 45-47'
    },
    {
        id: '2',
        classId: '11 P 01',
        subject: 'Fisika',
        title: 'Laporan Praktikum Gelombang',
        deadline: '2025-11-22',
        note: 'Format PDF, kumpul di GC'
    },
    {
        id: '3',
        classId: '11 P 02',
        subject: 'Kimia',
        title: 'Stoikiometri Lanjut',
        deadline: '2025-11-25',
        note: 'Bawa kalkulator saat pembahasan'
    }
];

const TIMES = [
    "07:00 - 07:45", // 1
    "07:45 - 08:30", // 2
    "08:30 - 09:15", // 3
    "09:15 - 10:00", // 4
    "10:00 - 10:15", // IST 1
    "10:15 - 11:00", // 5
    "11:00 - 11:45", // 6
    "11:45 - 12:30", // 7
    "12:30 - 13:00", // IST 2
    "13:00 - 13:45", // 8
    "13:45 - 14:30", // 9
    "14:30 - 15:15"  // 10
];

// Helper to create schedule row
const createDay = (day: string, codes: string[]) => {
    let lessonIndex = 0;
    const lessons = [];
    
    for (let i = 0; i < TIMES.length; i++) {
        if (i === 4 || i === 8) { // Breaks
             lessons.push({ time: TIMES[i], subject: "ISTIRAHAT", code: "IST" });
             continue;
        }
        
        const code = codes[lessonIndex] || "-";
        lessons.push({
            time: TIMES[i],
            subject: SUBJECT_MAP[code] || code,
            code: code
        });
        lessonIndex++;
    }
    return { day, lessons };
};

// Schedule Data based on 2025/2026 Schedule
export const SCHEDULES: ScheduleMap = {
    "11 P 01": [
        createDay("Senin", ["U", "PABP", "PABP", "PJOK", "PJOK", "BINGTL", "BINGTL", "BJEP", "BJEP", "BJEP"]),
        createDay("Selasa", ["BJEP", "BJEP", "BJEP", "SR", "SR", "SR", "BIND", "BK", "BK", "SOSI"]),
        createDay("Rabu", ["SOSI", "SOSI", "SOSI", "BIDTL", "BIDTL", "BIDTL", "BINGTL", "BINGTL", "BINGTL", "BJEP"]),
        createDay("Kamis", ["MM", "MM", "BIDTL", "BIDTL", "SEJA", "SEJA", "PRKY", "PRKY", "MLBJ", "MLBJ"]),
        createDay("Jumat", ["BIND", "BIND", "MM", "MM", "PEPA", "BING", "BING", "BING", "PD", "PD"])
    ],
    "11 P 02": [
        createDay("Senin", ["U", "MLBJ", "MLBJ", "BIND", "BIND", "MM", "MM", "BJEP", "BJEP", "BJEP"]),
        createDay("Selasa", ["BK", "BK", "GEOG", "GEOG", "GEOG", "SOSI", "SOSI", "BING", "BING", "BING"]),
        createDay("Rabu", ["EKON", "EKON", "MM", "MM", "SOSI", "SOSI", "PEPA", "PEPA", "GEOG", "GEOG"]),
        createDay("Kamis", ["BIND", "BIND", "SEJA", "SEJA", "BJEP", "BJEP", "SR", "SR", "PRKY", "PRKY"]),
        createDay("Jumat", ["PJOK", "PJOK", "PJOK", "PABP", "PABP", "EKON", "EKON", "PD", "PD", "PD"])
    ],
    "11 P 03": [
        createDay("Senin", ["U", "BING", "BING", "SEJA", "SEJA", "BIND", "BIND", "PEPA", "PEPA", "PEPA"]),
        createDay("Selasa", ["SOSI", "SOSI", "SOSI", "GEOG", "GEOG", "GEOG", "MM", "MM", "BJEP", "BJEP"]),
        createDay("Rabu", ["MM", "MM", "BK", "BK", "PABP", "PABP", "SR", "SR", "SOSI", "SOSI"]),
        createDay("Kamis", ["BJEP", "BJEP", "PRKY", "PRKY", "PJOK", "PJOK", "PJOK", "EKON", "EKON", "EKON"]),
        createDay("Jumat", ["MLBJ", "MLBJ", "BIND", "BIND", "EKON", "EKON", "GEOG", "GEOG", "PD", "PD"])
    ],
    "11 P 04": [
        createDay("Senin", ["U", "MM", "MM", "BJEP", "BJEP", "PEPA", "PEPA", "EKON", "EKON", "EKON"]),
        createDay("Selasa", ["BIND", "BIND", "MM", "MM", "EKON", "EKON", "SOSI", "SOSI", "SOSI", "SOSI"]),
        createDay("Rabu", ["PJOK", "PJOK", "PJOK", "SOSI", "SOSI", "SOSI", "BK", "BK", "BIND", "BIND"]),
        createDay("Kamis", ["MLBJ", "MLBJ", "BJEP", "BJEP", "PABP", "PABP", "SR", "SR", "BING", "BING"]),
        createDay("Jumat", ["SR", "SR", "GEOG", "GEOG", "SEJA", "SEJA", "PRKY", "PRKY", "PD", "PD"])
    ],
    "11 P 05": [
        createDay("Senin", ["U", "PRKY", "PRKY", "EKON", "EKON", "KIMI", "KIMI", "KIMI", "PJOK", "PJOK"]),
        createDay("Selasa", ["PJOK", "BJEP", "BJEP", "GEOG", "GEOG", "BIND", "BIND", "MLBJ", "MLBJ", "MLBJ"]),
        createDay("Rabu", ["SEJA", "SEJA", "MM", "MM", "BJEP", "BJEP", "MLBJ", "MLBJ", "EKON", "EKON"]),
        createDay("Kamis", ["KIMI", "KIMI", "BING", "BING", "BING", "BIND", "BIND", "GEOG", "GEOG", "GEOG"]),
        createDay("Jumat", ["PABP", "PABP", "MM", "MM", "SR", "SR", "PEPA", "PEPA", "PD", "PD"])
    ],
    "11 P 06": [
        createDay("Senin", ["U", "BIND", "BIND", "PEPA", "PEPA", "PABP", "PABP", "EKON", "EKON", "EKON"]),
        createDay("Selasa", ["PJOK", "PJOK", "PJOK", "MLBJ", "MLBJ", "BING", "BING", "INFO", "INFO", "INFO"]),
        createDay("Rabu", ["BIOL", "BIOL", "BIOL", "KIMI", "KIMI", "INFO", "INFO", "SR", "SR", "SR"]),
        createDay("Kamis", ["PRKY", "PRKY", "MM", "MM", "EKON", "EKON", "KIMI", "KIMI", "KIMI", "KIMI"]),
        createDay("Jumat", ["BIOL", "BIOL", "SEJA", "SEJA", "BIND", "BIND", "BK", "BK", "PD", "PD"])
    ],
    "11 P 07": [
        createDay("Senin", ["U", "MM", "MM", "BIND", "BIND", "MLBJ", "MLBJ", "BIOL", "BIOL", "BIOL"]),
        createDay("Selasa", ["KIMI", "KIMI", "INFO", "INFO", "MM", "MM", "BIOL", "BIOL", "PRKY", "PRKY"]),
        createDay("Rabu", ["EKON", "EKON", "KIMI", "KIMI", "KIMI", "SEJA", "SEJA", "BIND", "BIND", "BIND"]),
        createDay("Kamis", ["PJOK", "PJOK", "PJOK", "SR", "SR", "PEPA", "PEPA", "BING", "BING", "BING"]),
        createDay("Jumat", ["INFO", "INFO", "EKON", "EKON", "EKON", "PABP", "PABP", "PD", "PD", "PD"])
    ],
    "11 P 08": [
        createDay("Senin", ["U", "SEJA", "SEJA", "MLBJ", "MLBJ", "BIND", "BIND", "INFO", "INFO", "INFO"]),
        createDay("Selasa", ["FISI", "FISI", "BIOL", "BIOL", "BIOL", "BIND", "BIND", "PABP", "PABP", "PABP"]),
        createDay("Rabu", ["PJOK", "PJOK", "PJOK", "MM", "MM", "PEPA", "PEPA", "BK", "BK", "PRKY"]),
        createDay("Kamis", ["BING", "BING", "INFO", "INFO", "MM", "MM", "KIMI", "KIMI", "KIMI", "KIMI"]),
        createDay("Jumat", ["KIMI", "KIMI", "SR", "SR", "BIOL", "BIOL", "FISI", "FISI", "PD", "PD"])
    ],
    "11 P 09": [
        createDay("Senin", ["U", "FISI", "FISI", "MM", "MM", "SR", "SR", "KIMI", "KIMI", "KIMI"]),
        createDay("Selasa", ["MLBJ", "MLBJ", "PABP", "PABP", "KIMI", "KIMI", "BIOL", "BIOL", "BIOL", "BIOL"]),
        createDay("Rabu", ["BIND", "BIND", "BIOL", "BIOL", "MMTL", "MMTL", "PEPA", "BK", "BK", "BK"]),
        createDay("Kamis", ["MM", "MM", "PRKY", "PRKY", "BIND", "BIND", "FISI", "FISI", "SEJA", "SEJA"]),
        createDay("Jumat", ["PJOK", "PJOK", "PJOK", "BING", "BING", "MMTL", "MMTL", "PD", "PD", "PD"])
    ],
    "11 P 10": [
        createDay("Senin", ["U", "PABP", "PABP", "KIMI", "KIMI", "SEJA", "SEJA", "PEPA", "PEPA", "PEPA"]),
        createDay("Selasa", ["MM", "MM", "FISI", "FISI", "MLBJ", "MLBJ", "MMTL", "MMTL", "MMTL", "MMTL"]),
        createDay("Rabu", ["BIOL", "BIOL", "BIOL", "FISI", "FISI", "PRKY", "PRKY", "PJOK", "PJOK", "PJOK"]),
        createDay("Kamis", ["SR", "SR", "KIMI", "KIMI", "BK", "BIND", "BIND", "MM", "MM", "MM"]),
        createDay("Jumat", ["BIOL", "BIOL", "BIND", "BIND", "MMTL", "MMTL", "BING", "BING", "PD", "PD"])
    ],
    "11 P 11": [
        createDay("Senin", ["U", "BIOL", "BIOL", "MMTL", "MMTL", "FISI", "FISI", "MLBJ", "MLBJ", "MLBJ"]),
        createDay("Selasa", ["PEPA", "PEPA", "PJOK", "PJOK", "PJOK", "SR", "SR", "PRKY", "PRKY", "PRKY"]),
        createDay("Rabu", ["BING", "BING", "BIND", "BIND", "BIND", "MM", "MM", "BIOL", "BIOL", "BIOL"]),
        createDay("Kamis", ["MMTL", "MMTL", "FISI", "FISI", "FISI", "KIMI", "KIMI", "PABP", "PABP", "PABP"]),
        createDay("Jumat", ["SEJA", "SEJA", "KIMI", "KIMI", "MM", "MM", "BIND", "PD", "PD", "PD"])
    ],
};

export const ATTENDANCE_COLORS = {
    [AttendanceStatus.HADIR]: "#22c55e", // Green 500
    [AttendanceStatus.SAKIT]: "#3b82f6", // Blue 500
    [AttendanceStatus.IZIN]: "#eab308", // Yellow 500
    [AttendanceStatus.DISPENSASI]: "#a855f7", // Purple 500
    [AttendanceStatus.ALPA]: "#ef4444", // Red 500
    [AttendanceStatus.UNSET]: "#94a3b8", // Slate 400
};
