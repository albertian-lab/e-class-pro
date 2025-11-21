/**
 * E-CLASS PRO - Vanilla JS Logic
 * Modular Architecture to prevent initialization errors
 */

// 1. Initialize Global Namespace immediately
window.app = window.app || {};

// 2. Data & Constants
app.data = {
    classes: Array.from({ length: 11 }, (_, i) => `11 P ${String(i + 1).padStart(2, '0')}`),
    
    // Passwords: smansa1 ... smansa11
    passwords: (() => {
        const pw = {};
        for (let i = 1; i <= 11; i++) pw[`11 P ${String(i).padStart(2, '0')}`] = `smansa${i}`;
        return pw;
    })(),

    subjects: {
        "PABP": "Pendidikan Agama", "PJOK": "Penjasorkes", "BINGTL": "B. Inggris Lanjut",
        "BJEP": "Bahasa Jepang", "SR": "Seni Rupa", "BIND": "Bahasa Indonesia",
        "BK": "Bimbingan Konseling", "SOSI": "Sosiologi", "BIDTL": "B. Indo Lanjut",
        "MM": "Matematika", "SEJA": "Sejarah", "PRKY": "Prakarya", "PKWU": "Kewirausahaan",
        "MLBJ": "B. Jawa", "PEPA": "Pendidikan Pancasila", "BING": "Bahasa Inggris",
        "FISI": "Fisika", "KIMI": "Kimia", "BIOL": "Biologi", "EKON": "Ekonomi",
        "GEOG": "Geografi", "INFO": "Informatika", "MMTL": "Matematika Lanjut",
        "PD": "Projek/Pulang", "U": "Upacara", "IST": "Istirahat"
    },

    students: {
        "11 P 01": ["ABDAN PANJI SAPUTRO", "ADINDA KHUMAIROH SHODIK", "AHMAD RIZKY SAPUTRA", "ANA KHANIFAN", "BESCHA SHIREEN PUTRI ASMADIYAR", "BUNGA CECILIA WIBOWO", "CANAYA PUTRI AULIA", "CHRISTIAN TONI ARIYANTO", "DARA AYU ANASTASYA", "DESI ANTIKA SARI", "DIDE SATRIA VALENTINO", "EKA FIRDA APRILIASARI", "ENDY WICAKSANA", "FANCY ALEXANDER REMUS KURNIAWAN", "FERI AHMAD FERNANDA", "FERRISKA PRATISTA", "GADING RAYA RAMADHANI CHRISDIANTO", "HAFIZ FAKHRI ARFA", "HANNY SETYANINGRUM", "HELMI RAHMAN HAKIM", "JONA ARRAYA BEKA PUTRA PRASETYA", "KEVIN YAYI KUSUMO", "LINDA DEVITA ALZAHRA", "MUHAMMAD AKBAR BASMALLAH", "MUHAMMAD HAKKIAN NAZILI", "MUHAMMAD PRIYAGUNG DAMAR SASONGKO", "NOVIANA MUFLIKHA", "PRAYATA CELIO ARGANANTA", "REIHAN GALANG SETIAWAN", "RICKY BAGUS ALBERTO PUTRA", "SELA ANINDITA", "SEVYA SALSABILLAH NUGRAINI", "YOGA ADITYA PRATAMA", "ZAKKY TAMAMI RIDLO"],
        "11 P 02": ["ADRIAN DJATI PERMANA", "AHMAD MAULANA AFFANDI", "AIDA APRILIA SARI", "ALIA AFIF ZAKIYA", "ANGELINA LEONY VINANDA", "ANNISA MAHARANI", "CELLONA SALSABILA IRWANDA", "ELSA MEIRINA PUTRI KRISTANTO", "FARADIZ OQUEVADZAN WIBOWO", "HAVA HASBI SYAFIAR MAULANA ATTAR", "IQBAL MAULANA JATMIKO", "JUWITA TRI ANGGRAINI", "KEYSHA MEYCHARLA", "LADIYA SUHENDRO", "LUKFIAN DWI KURNIAWAN", "MARIA LALITA VISTARA", "MITZYLEA YIERRA CHRISTABEL", "MOCHAMAD KHOIRUMAN", "MUHAMMAD RIZQY APRILLIANSYAHR", "NATHANIA OCTAGRACIA STHEVANNY", "NIRAYA FILRIZKY", "NOAN DHESTA ARTSAVINA", "RAHMADDIA OSYA WIDYANATA", "REZA MAULANA AZIDAN", "RISKA MELISA PITASARI", "ROMNEYA NARARYA PUTRI KINASIH", "SAMUEL EVANDER GILBERT", "VENSKA SALWA AZURA", "WARIDDAL INTI'BAH", "WIDYA JAYANTI CAHYANINGRUM", "WINEDAR MAULIA ARDHINI", "YOGA K, HADI PRATAMA", "YULIA LILIK NURHAYATI", "ZETA JOEVINA"],
        "11 P 03": ["AISYAH RIZKY JANUAR", "ANANDA RACHO PUTRA NUGROHO", "ANGELINA HAPPY FANANI IRMALIA", "ANITA ELPI MAHARANI", "ARENTA BELVA AMELIA", "ARJUN EKA SANUSI", "AURELLIA LEVI MEISYAH", "AZZA ANNISA", "CHILMA AFFAT SYAKINA AHDANISA", "DIMAS MA'AROUF JULIANSYAH", "ELISIA NADHIR", "ELVIRA ELSYA KIRANA PUTRI", "ENRICO FAREL GEOVANI", "EVRILLIAN RISKY SAPUTRA", "HANA KHAIRUNISA HAMIDA", "HANIF ROIHANAH SHOFI", "HELLEN MEGA VERNANDA", "JOCELLIN VANESYA", "KHANSA NABILA HADI HANIFAH", "KIRANA MISHYA PUTRI WAHYUDA", "LINTANG NUR AYUNNI", "MOHAMMAD MALFY RISEY", "MUHAMMAD FAZIL JAUHAR TIANUSRA", "MUHAMMAD SATRIO MAULANA", "MUHAMMAD SUFI FATHURAHMAN", "RHYLLA SYAFA' ATTRISHA AULIYA", "RIZKI DWI CAHYANTI", "ROLANDO FERDIAN RIZKI RAMADHANI", "SURYA GURUNG", "TAKHIARA IRANIA RIZQITHA", "TUTUT RAHAYU CAHYANINGTIYAS", "UMROTUL KHAYUMI SU'UDAH", "VIRSYA CLARISMA DIVISALMANTA", "YUNA MARCHELL NAZAR PUTRA"],
        "11 P 04": ["ALIA MELFIN RUDIA", "ANNISA ELOK RAMADHANI", "CINTA DWI HARDININGTYAS", "ELVIRA SEPTYA RAMADHANI", "FADLI RIDI FACHRIZA", "FARELL WILLIAM BAGASKARA", "FERY ARDIANSYAH", "GELSI HUWAIDA PUSPONEGARI", "GLADIAN ZWETA AZZAHRAWANI", "INTAN KHABIBATUL MAQFIROH", "JIHAN NAILA RIFDAH", "KEZIA LUNA PRAMUDYA", "KISSYA DE LAURA", "M, RIFQI MAULANA WAHYUDI", "MARISA SUSMITA AINI", "MOCH, IBRAHIM MOVIET AL AMIN", "MOCHAMMAD SHAFFAN PRAMONO", "MOHAMAD REYHAN DAFANTA", "MUHAMAD IKHBAL PRATAMA", "MUHAMMAD DAVID MAULAN", "NABILA SYIFA WARDHANY", "NAJWA DESFIRLIA PUTRI WIDODO", "NASIFA RIZKYA ROFI'I", "NUR AILSA BILQIS ZHIVERILL", "PRAHESTA WAHYUNENDYA", "PRINCES AGREESTA LOVELY TIENDRA", "RAFKA ZAGA DAMAIAR", "RIAN NURMA SANDY", "ROI ARDI ASMORO DEWO", "SARI AGUSTIN", "SEZY YUNINGTYAS", "TALITHA TSAQIF", "TANTY JULIANINGTYAS", "ZALFA NAZIFA FITRIA NIZAR ILANA"],
        "11 P 05": ["ADITIA HUSIN BATISTUTA", "ADIVA SEPTA BELQIS RAHMADANI SANTOSO", "AHMAD AFFAN YUSRIYYAH", "AHMAD ALFAN ALFIAN MANASIK", "ALMIRA SANIYYAH CLARISSA PUTRI", "ALVINA NUR HIDAYAH", "ALVIZA NUR HIDAYAH", "ANGGA FEBRIAN SETYO NUGROHO", "ANGGUN ASTA NEYSA", "BASHILIA NADINE ELVIANA", "BRENDA NAJLA PUTRI BIANTARA", "CANDY WINDYA VALENTERA DARMA", "CINDY NUR HIDAYAH", "DESTIA PUTRI AMALIA", "FARANDY GHATHFAN CALVINDORO", "HIRA PUTRI SARASWATI", "IFATH PUTRI HIDAYAH", "INDRA DEVI SETIAWATI", "KIRANA WANGSA PUTRI", "KOMANG FREDELLA SURYAASTAWAN SUCIPTA", "MAULIDYA RANA PUTRI TUNGGA DEWI", "MOH, RAFANSYAH BAGUS HARFANO", "MOHAMMAD RIFQI UBAIDILLAH", "MUHAMMAD FAWWAS MUHYIZABID PRAWIRA ARRIFANI", "MUHAMMAD IQBAL SATRIO WIJAKSONO", "MUHAMMAD RAFFI", "NUR AISYAH WAROHMAH", "NURUL ANISA ILMIYAH", "PRISCILLIA IDA NATISHA REVI", "PUAN KATARA KHAYRERA", "RACHELITA QEISYA PUTRI ANA", "ROSITA RASYIDA ARINI"],
        "11 P 06": ["AHMAD IQSAL ARIADI", "ANANDICHA ERVANA PUTRA PRAWIRA", "ANDRE SHANDY MUZAKI", "ARMILDA HANIFAH LAYANA", "AULIA NABILLA SETIAWAN", "AURA FITRI ISTIQOMAH", "BERNESSA RAKA DURIANTO", "BIMA APRILIANSYAH", "CEVIN ADILA PUTRA PRAKA YUDHA", "CHECA ALREZA ARIANTO", "DAVI RAHMADAN PUTRA ISWARA", "DIFTAR GEMA MAULANA", "FAIRUS AZKA NUHA", "FYARLLA MUFIDATUZ ZAHIYAH", "GADING ALFINZA NUGRAHA", "GASTIANDIRRIJAL WIKO FEBRIANSAH", "HILMI RIF'AT ISHOMI", "KIRANA EKA DAMAR PRATOLLAH", "MOHAMMAD FATIHKHUL HUDA", "MUHAMMAD ARVAN KHASYAFI", "MUHAMMAD HAMDAN AL-AMIN", "MUHAMMAD RAJA DICKSON", "MUHHAMMAD UBAI DHIA ARFIN", "NAURA SYIFA AMRINA IKRAM IDI", "NAYA KEYLLA RAHMASARI", "NOFIRSTAN DEO PRASETIYO", "PANJI MANDALA PUTRA", "PUJIANTORO", "RESIANS CINDY PUTRI PATRICIA", "SANDI HERMAWAN", "SAVIRA TITIS FEBRYASARI", "SYIFA ZAULA MU'IZZ", "YASHINTA ADELIA", "ZHIEVANA SERENE SIA ALMIRA"],
        "11 P 07": ["ABDI WAHYU PRATAMA", "AHMAD HIRZUL FAHRI", "AHMAD RIZKY PRATAMA", "ALFATIH ANANDA GEOVANY", "ARYA SHAFA MAHARDIKA", "ASHILAH SASMITA BUCHARI", "AYUNING FATIHUL ROHIMAH", "BIYAN LINGGAR HERMAWAN", "CHEZA YOVI NOVANDINI", "DAFIA MUTIARA RAMADHANI", "EGA GUITA FENDERA AKBAR", "EVELLYNA PAMBUDI", "FADIRA MULIA JUNIARITA", "FAREL MANDALA SAPUTRA", "FERNANDO EURO AKBAR", "FREHINO RAMA PUTRA PRAWIRA", "KESYA BULAN AMELIA", "MAYA SHIFA ALIVIA", "MILA ZAKIA", "MUHAMAD AKVIN FAHMI GHUFRON", "MUHAMAD IKHSAN FADILLAH", "MUHAMMAD FATIH AMRU", "MUHAMMAD IQBAL NUR HAKAM", "MUHAMMAD WILDAN BINTANG UZA", "NAFISHA ZAHRA KALISA PUTRI", "REISYA FAIRIZTYA JOCELYN ROY PUTRI", "RIZQI NARARYA FUTRA PRATAMA", "ROYYAN SUMARNO", "SHAFIRA BILZALIA", "SHEBY LOVE RATU BILKISS", "TRI NOVA AHSANU SHUFY SULHA", "TRIYASIH WIBAWATI", "WIRASINDU GIRI SAMODRA", "YUNIOR MUJIANDRI"],
        "11 P 08": ["ACHMAD FADIL HAFIDZ FADLURAHMAN", "ALDRICH AKBAR PRADITYA", "ALEXA SAVIRUS SURAWAN", "ALFIAN WIDYATAMA HABIBI", "ALMALIA KHALIFI KIRANA PRATIWI", "ALYA REGHINA ZAKIA MAKTA", "ARDEN BAGAS BIOGRADY", "ARI GILANG PRATAMA", "ARVELLA PUTRI WAHYUDA", "ASFA ABDIA PURWA SABRINA", "ASYAFFIYAH PUTRI WIDIARTO", "DAVINA SHAFIRA HUSNIAH", "DIANDRA BILQIST ASWIN MAULIDA", "EVANA ALTAFUNNISA NURSOLICHIN", "FITRI NANDA AYU LEFINA", "HAQI ELBANA ALFINUHA", "INDAH KUSUMA WARDANI", "JOVITA ANASTASYA VALENTINA", "KAYLA RAGANESIA AULIA SAHRATU", "KEVIN FEBRIANSYAH PUTRA PRATAMA", "KEYSHI ANGGRAINI SEKARWANGI", "LEXY ABHINAYA", "LOFLITA OLIVIA ENIRZHA", "MUHAMMAD CHAIRUS ANAYO SAPUTRA", "MUHAMMAD ROFIF FAWWAS FANDHILAH", "NAILA FAIZURA KHAKIM", "NAUFAL RAFIF BAGUS ANGGARA", "NAURA MUMTAZ ZAHARA EL YAHYA", "NIRINA YUANITA SALSABILA", "QUEENA BINTANG KEJORA ANNISA NASUTION", "RAISA NABIL AL FIZA", "RETRYZYA CANTIKA QUMAYROH", "RISMA FANISA ANGGRAINI", "SABRYA SEKAR ARUM OCTAVIANA"],
        "11 P 09": ["AHMAD DARMAWAN", "AL ANALA RHESA AGYA PUTRA", "ARKA MIRUNGGA PANGAYOM", "AURACINTA PUTRI RONITA", "AZKA EKA PUTRA AKBAR", "BERLIANDA OKTALIA PUTRI WULANDARI", "BRIGITA FAIRUZ ZAHIR", "CHEVINA NABILA ZIA FITRIA WAHYU SUGIANTO", "DAFRAN AZKA PUTRA SADA", "DAMAR HILAL RAFAZHA", "DENANDRA CHIARA MAYDINA", "DIDAN PUTRA ARIYANTO", "EGHY DHIAUDIN", "ESTYFANNY CHOLIFATU NISA", "FARA AISYAH RAMADHANI", "FATIMATUZ ZAHRA MAULIDA", "FERDIAN ASPRILINO", "GEAS PUSPITASARI", "IFFA KARIMA", "JENIS ALFIKA", "KAZAHRA INTAN APRILIA", "MA'RIFAN TAQIYAN RAHMADANI", "MUHAMMAD RIDWAN AFANDI", "NABILA ZAHWA YITNAMATSANI", "NANDITA JULIA ARSHINTA", "NESYA ANGGUN AZZAHRA", "NOVITA RAHMA ARDIANA", "RANUM MANAHHANINGSIH", "RISMA PUTRI ZHAFIRA", "SANIA AURA ZULFA", "SHINTA FAHRANI ARIANTI", "SYERIL HANUM KHAFIDATUL AMALIA", "TITA PUTRI RAHAYU", "UMI AINIL FAIZAH"],
        "11 P 10": ["ALBION ALERON", "ALVIRA YUDITASARI", "ANGGI NAMI HARAHAP", "ANNA NING VELA", "AURA DIASSYIFA", "BIANDA NADYA ANNISA", "CALISTA FITRI AZ ZAHRA", "CHOIRUNNISA ZAKIYATUN NUFUS", "CHRISTIAN JOHN FRANKLIN", "DERREL ALDEN DHARMA KRISNA", "DINAR NETA AULIA", "DINDA NUR ALIM", "DOIS GIAPRIL NUR CAHYANTI", "DONI FIRNANDO", "FEDERICHA LARASSATI", "GATEN WIDYATMAJA WIBAWA", "GAVRILA SENO EMMANUEL YUSTIRA", "GENDHIS PUTRI BAHARIZKY", "JERRY ADAM FIRMANSYAH", "JULIUZ CHRISTIANO HERLANDO", "JUSTIN JORDAN ERSA PRANYOTO", "KIKIKANAKU RAMADHANI", "MUHAMMAD AFFAN KHALILRANU HANDOKO", "NABILA AMELIA", "NAFISY TABITA CRISAMARYA", "NAZWA KIRANA IMEDA", "NINDYA AGISTA AURELTA", "NURADYAN INTEGRA AGUSTIN", "RADITYA DAMARIS", "RAYYA ZAKIYA SARI", "REVALINA AGUSTINA PUTRI WIBOWO", "RIVALDHO DWI PUTRA H", "TALITHA YUMNA CELIA FAIHA", "YEMIMA BRENDA CHRISSIA"],
        "11 P 11": ["AGNES VIANDA RISMAWATI", "ALLANDI ADE FEBIAWAN", "AMIRA NURUL IMAN", "ANGGUN ADISTIA PUTRI", "ANNISA JAZILATA RAMADHANI", "ARDYA KHANZA AZ-ZAHRA", "ASGY NUZULUL RAMADHANY", "AURA VIZKYA ANGGRAINI", "AYESHA KHIRANIA AGUSTIEN", "AZAHRA ARDYA MAHARDIKA KIRANI", "CAMILLA FADHIILAH ARIFIN", "DANIS ARKAN PUTRA SADA", "DELIMA RIZKY WIDI ASMARA", "EXCELL IBRA PRATAMA", "FACHRI IMAANUL HAQ", "HAIKAL FATHAN NUGRAHA", "ILMA AIZZA AN NAFIA", "IMANUELLA AYU PUSPITAWATI", "LIS ANISA RAMADHANI", "MOHAMMAD ANDRA DWI ERLANGGA", "MUHAMAD ARDIAS PUTRA", "MUHAMMAD IRSYAD RAIHAN SETIAWAN", "NAIYA MELANIE AMIRAH KURNIAWAN", "NAJWA QOIRADINES", "NISWA DZAKIA SAKHI", "NUR FADILAH ASMARA PRIAMBODO", "PRABU CHESTA CAKRABHIRAWA", "RAHMA ANUGRAH HIDA AGUSTINA", "REGINA SAVANI APHRODITYA BARZAN", "SUCI RAHMAWATI", "TALITHA IMTIYAAZ", "TIARA PUTRI NUR FADHIILAH", "YASMINE ATHAYA ARRASY", "ZAKI AUFAA KAMESWARA"]
    },

    schedules: {
        "11 P 01": [{d:"Senin",l:["U","PABP","PABP","PJOK","PJOK","BINGTL","BINGTL","BJEP","BJEP","BJEP"]},{d:"Selasa",l:["BJEP","BJEP","BJEP","SR","SR","SR","BIND","BK","BK","SOSI"]},{d:"Rabu",l:["SOSI","SOSI","SOSI","BIDTL","BIDTL","BIDTL","BINGTL","BINGTL","BINGTL","BJEP"]},{d:"Kamis",l:["MM","MM","BIDTL","BIDTL","SEJA","SEJA","PRKY","PRKY","MLBJ","MLBJ"]},{d:"Jumat",l:["BIND","BIND","MM","MM","PEPA","BING","BING","BING","PD","PD"]}],
        "11 P 02": [{d:"Senin",l:["U","MLBJ","MLBJ","BIND","BIND","MM","MM","BJEP","BJEP","BJEP"]},{d:"Selasa",l:["BK","BK","GEOG","GEOG","GEOG","SOSI","SOSI","BING","BING","BING"]},{d:"Rabu",l:["EKON","EKON","MM","MM","SOSI","SOSI","PEPA","PEPA","GEOG","GEOG"]},{d:"Kamis",l:["BIND","BIND","SEJA","SEJA","BJEP","BJEP","SR","SR","PRKY","PRKY"]},{d:"Jumat",l:["PJOK","PJOK","PJOK","PABP","PABP","EKON","EKON","PD","PD","PD"]}],
        "11 P 03": [{d:"Senin",l:["U","BING","BING","SEJA","SEJA","BIND","BIND","PEPA","PEPA","PEPA"]},{d:"Selasa",l:["SOSI","SOSI","SOSI","GEOG","GEOG","GEOG","MM","MM","BJEP","BJEP"]},{d:"Rabu",l:["MM","MM","BK","BK","PABP","PABP","SR","SR","SOSI","SOSI"]},{d:"Kamis",l:["BJEP","BJEP","PRKY","PRKY","PJOK","PJOK","PJOK","EKON","EKON","EKON"]},{d:"Jumat",l:["MLBJ","MLBJ","BIND","BIND","EKON","EKON","GEOG","GEOG","PD","PD"]}],
        "11 P 04": [{d:"Senin",l:["U","MM","MM","BJEP","BJEP","PEPA","PEPA","EKON","EKON","EKON"]},{d:"Selasa",l:["BIND","BIND","MM","MM","EKON","EKON","SOSI","SOSI","SOSI","SOSI"]},{d:"Rabu",l:["PJOK","PJOK","PJOK","SOSI","SOSI","SOSI","BK","BK","BIND","BIND"]},{d:"Kamis",l:["MLBJ","MLBJ","BJEP","BJEP","PABP","PABP","SR","SR","BING","BING"]},{d:"Jumat",l:["SR","SR","GEOG","GEOG","SEJA","SEJA","PRKY","PRKY","PD","PD"]}],
        "11 P 05": [{d:"Senin",l:["U","PRKY","PRKY","EKON","EKON","KIMI","KIMI","KIMI","PJOK","PJOK"]},{d:"Selasa",l:["PJOK","BJEP","BJEP","GEOG","GEOG","BIND","BIND","MLBJ","MLBJ","MLBJ"]},{d:"Rabu",l:["SEJA","SEJA","MM","MM","BJEP","BJEP","MLBJ","MLBJ","EKON","EKON"]},{d:"Kamis",l:["KIMI","KIMI","BING","BING","BING","BIND","BIND","GEOG","GEOG","GEOG"]},{d:"Jumat",l:["PABP","PABP","MM","MM","SR","SR","PEPA","PEPA","PD","PD"]}],
        "11 P 06": [{d:"Senin",l:["U","BIND","BIND","PEPA","PEPA","PABP","PABP","EKON","EKON","EKON"]},{d:"Selasa",l:["PJOK","PJOK","PJOK","MLBJ","MLBJ","BING","BING","INFO","INFO","INFO"]},{d:"Rabu",l:["BIOL","BIOL","BIOL","KIMI","KIMI","INFO","INFO","SR","SR","SR"]},{d:"Kamis",l:["PRKY","PRKY","MM","MM","EKON","EKON","KIMI","KIMI","KIMI","KIMI"]},{d:"Jumat",l:["BIOL","BIOL","SEJA","SEJA","BIND","BIND","BK","BK","PD","PD"]}],
        "11 P 07": [{d:"Senin",l:["U","MM","MM","BIND","BIND","MLBJ","MLBJ","BIOL","BIOL","BIOL"]},{d:"Selasa",l:["KIMI","KIMI","INFO","INFO","MM","MM","BIOL","BIOL","PRKY","PRKY"]},{d:"Rabu",l:["EKON","EKON","KIMI","KIMI","KIMI","SEJA","SEJA","BIND","BIND","BIND"]},{d:"Kamis",l:["PJOK","PJOK","PJOK","SR","SR","PEPA","PEPA","BING","BING","BING"]},{d:"Jumat",l:["INFO","INFO","EKON","EKON","EKON","PABP","PABP","PD","PD","PD"]}],
        "11 P 08": [{d:"Senin",l:["U","SEJA","SEJA","MLBJ","MLBJ","BIND","BIND","INFO","INFO","INFO"]},{d:"Selasa",l:["FISI","FISI","BIOL","BIOL","BIOL","BIND","BIND","PABP","PABP","PABP"]},{d:"Rabu",l:["PJOK","PJOK","PJOK","MM","MM","PEPA","PEPA","BK","BK","PRKY"]},{d:"Kamis",l:["BING","BING","INFO","INFO","MM","MM","KIMI","KIMI","KIMI","KIMI"]},{d:"Jumat",l:["KIMI","KIMI","SR","SR","BIOL","BIOL","FISI","FISI","PD","PD"]}],
        "11 P 09": [{d:"Senin",l:["U","FISI","FISI","MM","MM","SR","SR","KIMI","KIMI","KIMI"]},{d:"Selasa",l:["MLBJ","MLBJ","PABP","PABP","KIMI","KIMI","BIOL","BIOL","BIOL","BIOL"]},{d:"Rabu",l:["BIND","BIND","BIOL","BIOL","MMTL","MMTL","PEPA","BK","BK","BK"]},{d:"Kamis",l:["MM","MM","PRKY","PRKY","BIND","BIND","FISI","FISI","SEJA","SEJA"]},{d:"Jumat",l:["PJOK","PJOK","PJOK","BING","BING","MMTL","MMTL","PD","PD","PD"]}],
        "11 P 10": [{d:"Senin",l:["U","PABP","PABP","KIMI","KIMI","SEJA","SEJA","PEPA","PEPA","PEPA"]},{d:"Selasa",l:["MM","MM","FISI","FISI","MLBJ","MLBJ","MMTL","MMTL","MMTL","MMTL"]},{d:"Rabu",l:["BIOL","BIOL","BIOL","FISI","FISI","PRKY","PRKY","PJOK","PJOK","PJOK"]},{d:"Kamis",l:["SR","SR","KIMI","KIMI","BK","BIND","BIND","MM","MM","MM"]},{d:"Jumat",l:["BIOL","BIOL","BIND","BIND","MMTL","MMTL","BING","BING","PD","PD"]}],
        "11 P 11": [{d:"Senin",l:["U","BIOL","BIOL","MMTL","MMTL","FISI","FISI","MLBJ","MLBJ","MLBJ"]},{d:"Selasa",l:["PEPA","PEPA","PJOK","PJOK","PJOK","SR","SR","PRKY","PRKY","PRKY"]},{d:"Rabu",l:["BING","BING","BIND","BIND","BIND","MM","MM","BIOL","BIOL","BIOL"]},{d:"Kamis",l:["MMTL","MMTL","FISI","FISI","FISI","KIMI","KIMI","PABP","PABP","PABP"]},{d:"Jumat",l:["SEJA","SEJA","KIMI","KIMI","MM","MM","BIND","PD","PD","PD"]}]
    },
    
    times: ["07:00 - 07:45", "07:45 - 08:30", "08:30 - 09:15", "09:15 - 10:00", "10:00 - 10:15", "10:15 - 11:00", "11:00 - 11:45", "11:45 - 12:30", "12:30 - 13:00", "13:00 - 13:45", "13:45 - 14:30", "14:30 - 15:15"]
};

// 3. State Management
app.state = {
    theme: localStorage.getItem('theme') || 'dark',
    currentPage: 'home',
    admin: { loggedIn: false, class: null },
    attendance: { class: '11 P 01', date: new Date().toISOString().split('T')[0] },
    schedule: { class: '11 P 01' },
    assignments: JSON.parse(localStorage.getItem('assignments')) || [],
    groups: { class: '11 P 01', count: 4, mode: 'count' },
    assignmentsFilter: { class: 'All', status: 'All' }
};

// 4. Helpers
app.helpers = {
    toggleTheme() {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            app.state.theme = 'light';
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            app.state.theme = 'dark';
        }
        app.renderBackground();
    },
    applyTheme() {
        if (app.state.theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    },
    getDeadlineStatus(d) {
        const diff = Math.ceil((new Date(d) - new Date()) / (864e5));
        if (diff < 0) return { label: 'Terlambat', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', border: 'border-red-200' };
        if (diff <= 2) return { label: 'Segera', bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200' };
        return { label: `${diff} Hari`, bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', border: 'border-slate-200' };
    },
    getSubjectIcon(s) {
        s = s.toLowerCase();
        let icon = 'book-open', color = 'text-slate-400';
        if(s.includes('islam')) { icon = 'moon'; color = 'text-yellow-500'; }
        else if(s.includes('kristen')) { icon = 'book'; color = 'text-yellow-500'; }
        else if(s.includes('matematika')) { icon = 'calculator'; color = 'text-blue-500'; }
        else if(s.includes('fisika')) { icon = 'atom'; color = 'text-cyan-500'; }
        else if(s.includes('kimia')) { icon = 'flask-conical'; color = 'text-purple-500'; }
        else if(s.includes('biologi')) { icon = 'dna'; color = 'text-emerald-500'; }
        else if(s.includes('pkn')) { icon = 'scale'; color = 'text-red-500'; }
        return `<i data-lucide="${icon}" class="${color}"></i>`;
    },
    getStatusColor(s) {
        const colors = { 'Hadir':'#22c55e', 'Sakit':'#3b82f6', 'Izin':'#eab308', 'Dispensasi':'#a855f7', 'Alpa':'#ef4444' };
        return colors[s] || '#94a3b8';
    }
};

// 5. Components
app.components = {
    card(target, title, desc, icon, color, bg) {
        return `
            <div onclick="app.router.navigate('${target}')" class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
                <div class="w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i data-lucide="${icon}"></i>
                </div>
                <h3 class="text-lg font-bold dark:text-white mb-1">${title}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">${desc}</p>
            </div>
        `;
    },
    assignmentCard(t) {
        const status = app.helpers.getDeadlineStatus(t.deadline);
        const icon = app.helpers.getSubjectIcon(t.subject);
        return `
            <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border ${status.border} dark:border-slate-800 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                <div class="p-5 flex-grow">
                    <div class="flex justify-between items-start mb-3">
                        <span class="px-2 py-1 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 dark:text-slate-300">${t.classId}</span>
                        <span class="px-2 py-1 rounded text-xs font-bold ${status.bg} ${status.text}">${status.label}</span>
                    </div>
                    <div class="flex gap-3 mb-2">
                        <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 h-fit">
                            ${icon}
                        </div>
                        <div>
                            <h3 class="font-bold text-lg dark:text-white leading-tight">${t.title}</h3>
                            <p class="text-xs font-bold text-blue-500 uppercase mt-1">${t.subject}</p>
                        </div>
                    </div>
                    <p class="text-sm text-slate-500 dark:text-slate-400 italic mt-2 border-l-2 border-slate-200 dark:border-slate-700 pl-3">"${t.note || '...'}"</p>
                </div>
                <div class="bg-slate-50 dark:bg-slate-950/30 px-5 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex justify-between items-center">
                    <span>Deadline: ${t.deadline}</span>
                    <i data-lucide="clock" class="w-3 h-3"></i>
                </div>
            </div>
        `;
    }
};

// 6. Page Renderers
app.pages = {
    home() {
        return `
            <div class="space-y-8 animate-fade-in">
                <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 shadow-2xl p-8 md:p-12 text-white">
                    <div class="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div class="relative z-10">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4">E-Class Pro</h1>
                        <p class="text-lg text-blue-100 max-w-2xl mb-8">Platform manajemen kelas futuristik. Absensi, Jadwal, dan Tugas dalam satu genggaman.</p>
                        <button onclick="app.router.navigate('attendance')" class="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-transform hover:scale-105">
                            Mulai Absensi <i data-lucide="arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${app.components.card('attendance', 'Absensi', 'Rekap kehadiran.', 'activity', 'text-green-500', 'bg-green-100 dark:bg-green-900/20')}
                    ${app.components.card('schedule', 'Jadwal', 'Cek pelajaran.', 'calendar', 'text-purple-500', 'bg-purple-100 dark:bg-purple-900/20')}
                    ${app.components.card('assignments', 'Tugas', 'Deadline tugas.', 'book-open', 'text-orange-500', 'bg-orange-100 dark:bg-orange-900/20')}
                    ${app.components.card('groups', 'Kelompok', 'Generator acak.', 'users', 'text-pink-500', 'bg-pink-100 dark:bg-pink-900/20')}
                </div>
            </div>
        `;
    },
    attendance() {
        const cls = app.state.admin.loggedIn ? app.state.admin.class : app.state.attendance.class;
        const students = app.data.students[cls] || Array.from({length:30},(_,i)=>`Siswa ${cls} ${i+1}`);
        const key = `att_${cls}_${app.state.attendance.date}`;
        const saved = JSON.parse(localStorage.getItem(key)) || {};
        const now = new Date();
        const isLocked = (now.getHours() >= 8) && !app.state.admin.loggedIn;
        
        return `
            <div class="space-y-6">
                <div class="flex flex-col md:flex-row justify-between items-end gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div><h1 class="text-3xl font-bold dark:text-white">Absensi Harian</h1><p class="text-slate-500">Rekap kehadiran siswa.</p></div>
                    <div class="flex gap-3 w-full md:w-auto">
                        <input type="date" id="att-date" value="${app.state.attendance.date}" class="input-field">
                        ${app.state.admin.loggedIn ? `<div class="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-bold dark:text-white">${cls}</div>` : 
                        `<select id="att-class" class="input-field w-48">${app.data.classes.map(c=>`<option value="${c}" ${c===cls?'selected':''}>${c}</option>`).join('')}</select>`}
                    </div>
                </div>
                ${isLocked ? `<div class="p-4 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl flex items-center gap-3 text-slate-600 dark:text-slate-300"><i data-lucide="lock"></i> Absensi ditutup (Lewat 08:00 WIB).</div>` : ''}
                <div class="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="bg-slate-50 dark:bg-slate-950 text-xs uppercase font-bold text-slate-500">
                                <tr><th class="p-4 w-12 text-center">No</th><th class="p-4">Nama</th><th class="p-4 text-center">Status</th></tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                                ${students.map((s,i)=> {
                                    const st = saved[`${cls}-${i}`] || 'Belum Absen';
                                    return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-4 text-center font-mono text-slate-400">${i+1}</td><td class="p-4 font-medium dark:text-slate-200">${s}</td><td class="p-4"><div class="grid grid-cols-5 gap-1 ${isLocked?'pointer-events-none opacity-50':''}">${['Hadir','Sakit','Izin','Dispensasi','Alpa'].map(opt=>{
                                        const active = st===opt; const col = active ? app.helpers.getStatusColor(opt) : '';
                                        return `<button onclick="app.logic.setAtt('${cls}','${app.state.attendance.date}','${i}','${opt}')" class="text-[10px] font-bold uppercase py-1.5 rounded border transition-all ${active?'text-white scale-105 shadow-sm':'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'}" style="${active?`background:${col};border-color:${col}`:''}">${opt==='Dispensasi'?'Disp':opt}</button>`
                                    }).join('')}</div></td></tr>`
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    },
    schedule() {
        const cls = app.state.admin.loggedIn ? app.state.admin.class : app.state.schedule.class;
        const data = app.data.schedules[cls] || app.data.schedules["11 P 01"];
        return `
            <div class="space-y-6">
                <div class="flex justify-between items-center"><h1 class="text-3xl font-bold dark:text-white">Jadwal</h1>${!app.state.admin.loggedIn ? `<select id="sched-class" class="input-field w-48">${app.data.classes.map(c=>`<option value="${c}" ${c===cls?'selected':''}>${c}</option>`).join('')}</select>` : ''}</div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${data.map(d=>`<div class="card p-0 overflow-hidden"><div class="bg-slate-50 dark:bg-slate-800/50 p-4 border-b border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-200">${d.d}</div><div class="p-4"><ul class="space-y-3">${d.l.map((c,i)=>`<li class="pl-4 border-l-2 ${c==='IST'?'border-yellow-400':'border-blue-500'}"><div class="text-[10px] font-bold text-slate-400">Jam ${i+1}</div><div class="font-bold text-sm ${c==='IST'?'text-yellow-600 italic':'dark:text-white'}">${app.data.subjects[c]||c}</div></li>`).join('')}</ul></div></div>`).join('')}</div>
            </div>
        `;
    },
    assignments() {
        const filter = app.state.admin.loggedIn ? app.state.admin.class : app.state.assignmentsFilter.class;
        const list = app.state.assignments.filter(a => filter === 'All' || a.classId === filter);
        return `
            <div class="space-y-6">
                <div class="flex justify-between items-center"><h1 class="text-3xl font-bold dark:text-white">Tugas</h1>${!app.state.admin.loggedIn ? `<select id="asg-filter" class="input-field w-48"><option value="All">Semua</option>${app.data.classes.map(c=>`<option value="${c}" ${c===filter?'selected':''}>${c}</option>`).join('')}</select>`:''}</div>
                ${list.length === 0 ? '<div class="text-center py-20 border-2 border-dashed dark:border-slate-800 rounded-xl text-slate-500">Tidak ada tugas.</div>' : 
                `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${list.map(t => app.components.assignmentCard(t)).join('')}</div>`}
            </div>
        `;
    },
    groups() {
        const cls = app.state.admin.loggedIn ? app.state.admin.class : app.state.groups.class;
        return `
            <div class="space-y-6">
                <h1 class="text-3xl font-bold dark:text-white">Generator Kelompok</h1>
                <div class="card p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div><label class="label">Kelas</label>${!app.state.admin.loggedIn?`<select id="grp-class" class="input-field w-full">${app.data.classes.map(c=>`<option value="${c}" ${c===cls?'selected':''}>${c}</option>`).join('')}</select>`:`<div class="input-field flex items-center bg-slate-100 dark:bg-slate-800">${cls}</div>`}</div>
                    <div><label class="label">Mode</label><select id="grp-mode" class="input-field w-full"><option value="count">Per Anggota</option><option value="total">Total Kelompok</option></select></div>
                    <div><label class="label">Jumlah</label><input type="number" id="grp-val" value="4" class="input-field w-full"></div>
                    <button onclick="app.logic.generateGroups()" class="btn-primary w-full">Acak</button>
                </div>
                <div id="grp-result" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
            </div>
        `;
    },
    admin() {
        if(!app.state.admin.loggedIn) return `
            <div class="flex items-center justify-center min-h-[60vh]"><div class="card p-8 w-full max-w-md text-center"><h2 class="text-2xl font-bold mb-6 dark:text-white">Admin Login</h2><form onsubmit="app.logic.login(event)" class="space-y-4"><select id="login-class" class="input-field w-full">${app.data.classes.map(c=>`<option value="${c}">${c}</option>`).join('')}</select><input type="password" id="login-pass" class="input-field w-full" placeholder="Password..."><button class="btn-primary w-full">Masuk</button></form></div></div>
        `;
        const tasks = app.state.assignments.filter(a => a.classId === app.state.admin.class);
        return `
            <div class="space-y-8">
                <div class="flex justify-between border-b pb-4 dark:border-slate-700"><div><h1 class="text-3xl font-bold dark:text-white">Admin Panel</h1><p class="text-slate-500">${app.state.admin.class}</p></div><button onclick="app.logic.logout()" class="text-red-500 hover:bg-red-50 px-4 rounded-lg">Logout</button></div>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="card p-6 h-fit"><h3 class="font-bold mb-4 dark:text-white">Tambah Tugas</h3><form onsubmit="app.logic.addTask(event)" class="space-y-4"><input id="t-subj" placeholder="Mapel" class="input-field w-full" required><input id="t-title" placeholder="Judul" class="input-field w-full" required><input type="date" id="t-date" class="input-field w-full" required><textarea id="t-note" placeholder="Catatan" class="input-field w-full"></textarea><button class="btn-primary w-full">Simpan</button></form></div>
                    <div class="lg:col-span-2 space-y-4"><h3 class="font-bold dark:text-white">Tugas Aktif</h3>${tasks.map(t => `<div class="card p-4 flex justify-between items-center"><div><span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">${t.subject}</span><h4 class="font-bold dark:text-white mt-1">${t.title}</h4></div><button onclick="app.logic.delTask('${t.id}')" class="text-red-500 hover:bg-red-50 p-2 rounded"><i data-lucide="trash-2"></i></button></div>`).join('')}</div>
                </div>
            </div>
        `;
    },
    postRender(page) {
        if(page==='attendance') {
            document.getElementById('att-date')?.addEventListener('change', e => { app.state.attendance.date = e.target.value; app.router.refresh(); });
            document.getElementById('att-class')?.addEventListener('change', e => { app.state.attendance.class = e.target.value; app.router.refresh(); });
        }
        if(page==='schedule') document.getElementById('sched-class')?.addEventListener('change', e => { app.state.schedule.class = e.target.value; app.router.refresh(); });
        if(page==='assignments') document.getElementById('asg-filter')?.addEventListener('change', e => { app.state.assignmentsFilter.class = e.target.value; app.router.refresh(); });
        if(page==='groups') document.getElementById('grp-class')?.addEventListener('change', e => app.state.groups.class = e.target.value);
    }
};

// 7. Router
app.router = {
    navigate(page) {
        app.state.currentPage = page;
        window.location.hash = `/${page}`;
        this.render();
    },
    handle() {
        const hash = window.location.hash.slice(2) || 'home';
        app.state.currentPage = hash;
        this.render();
    },
    refresh() { this.render(); },
    render() {
        const page = app.state.currentPage;
        const container = document.getElementById('app');
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if(btn.dataset.target === page) btn.classList.add('bg-blue-100', 'text-blue-700', 'dark:bg-blue-900/30');
            else btn.classList.remove('bg-blue-100', 'text-blue-700', 'dark:bg-blue-900/30');
        });
        document.getElementById('mobile-menu').classList.add('hidden');
        
        if (app.pages[page]) {
            container.innerHTML = app.pages[page]();
            app.pages.postRender(page);
        } else {
            container.innerHTML = app.pages.home();
        }
        if(window.lucide) lucide.createIcons();
        window.scrollTo(0,0);
    }
};

// 8. Logic
app.logic = {
    setAtt(cls, date, idx, st) {
        const key = `att_${cls}_${date}`;
        const d = JSON.parse(localStorage.getItem(key)) || {};
        d[`${cls}-${idx}`] = st;
        localStorage.setItem(key, JSON.stringify(d));
        app.router.refresh();
    },
    login(e) {
        e.preventDefault();
        const cls = document.getElementById('login-class').value;
        const pass = document.getElementById('login-pass').value;
        if(pass === app.data.passwords[cls]) { app.state.admin.loggedIn = true; app.state.admin.class = cls; app.router.refresh(); } else alert('Password Salah');
    },
    logout() { app.state.admin.loggedIn = false; app.router.navigate('home'); },
    addTask(e) {
        e.preventDefault();
        app.state.assignments.push({
            id: Date.now().toString(),
            classId: app.state.admin.class,
            subject: document.getElementById('t-subj').value,
            title: document.getElementById('t-title').value,
            deadline: document.getElementById('t-date').value,
            note: document.getElementById('t-note').value
        });
        localStorage.setItem('assignments', JSON.stringify(app.state.assignments));
        app.router.refresh();
    },
    delTask(id) {
        if(confirm('Hapus?')) {
            app.state.assignments = app.state.assignments.filter(t => t.id !== id);
            localStorage.setItem('assignments', JSON.stringify(app.state.assignments));
            app.router.refresh();
        }
    },
    generateGroups() {
        const cls = app.state.admin.loggedIn ? app.state.admin.class : document.getElementById('grp-class').value;
        const mode = document.getElementById('grp-mode').value;
        const val = parseInt(document.getElementById('grp-val').value)||4;
        let list = [...(app.data.students[cls] || [])];
        for (let i = list.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [list[i], list[j]] = [list[j], list[i]]; }
        const res = [];
        if (mode === 'count') for (let i = 0; i < list.length; i += val) res.push(list.slice(i, i + val));
        else { for(let i=0;i<val;i++) res.push([]); list.forEach((s,i)=>res[i%val].push(s)); }
        document.getElementById('grp-result').innerHTML = res.map((g,i)=>`
            <div class="card p-4 animate-slide-up" style="animation-delay:${i*0.05}s"><h4 class="font-bold text-blue-600 mb-2">Kelompok ${i+1}</h4><ul class="text-sm text-slate-600 dark:text-slate-400 space-y-1">${g.map((s,j)=>`<li>${j+1}. ${s}</li>`).join('')}</ul></div>
        `).join('');
    }
};

// 9. Init & Background
app.renderBackground = function() {
    const c = document.getElementById('background-container');
    c.innerHTML = '<div class="absolute inset-0 bg-gradient-to-br from-slate-200/80 via-transparent to-blue-100/50 dark:from-slate-900 dark:via-slate-950 dark:to-blue-900/40"></div>';
    const sym = ["∑", "∫", "π", "√", "∞", "H₂O", "E=mc²"];
    for(let i=0; i<40; i++) {
        const el = document.createElement('div');
        el.className = 'particle text-slate-400/20 font-mono font-bold absolute';
        el.innerText = sym[Math.floor(Math.random()*sym.length)];
        el.style.left = Math.random()*100+'%'; el.style.top = Math.random()*100+'%';
        el.style.fontSize = (Math.random()*2+1)+'rem';
        c.appendChild(el);
    }
};

app.toggleTheme = app.helpers.toggleTheme;

// 10. Bootstrap
document.addEventListener('DOMContentLoaded', () => {
    // Initialize default students if empty
    app.data.classes.forEach(c => {
         if(!app.data.students[c]) app.data.students[c] = Array.from({length:30},(_,i)=>`Siswa ${c} ${i+1}`);
         if(!app.data.schedules[c]) app.data.schedules[c] = app.data.schedules["11 P 01"];
    });

    app.helpers.applyTheme();
    app.renderBackground();
    app.router.handle();
    window.addEventListener('hashchange', () => app.router.handle());
});
