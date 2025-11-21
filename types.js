// attendance_data.js (atau nama file yang sesuai)

// --- Konversi Enum menjadi Objek Konstanta (equivalent to export enum AttendanceStatus) ---
/**
 * @typedef {'Hadir' | 'Sakit' | 'Izin' | 'Dispensasi' | 'Alpa' | 'Belum Absen'} AttendanceStatusValue
 */
export const AttendanceStatus = {
  // Key           // Value
  HADIR: 'Hadir',
  SAKIT: 'Sakit',
  IZIN: 'Izin',
  DISPENSASI: 'Dispensasi',
  ALPA: 'Alpa',
  UNSET: 'Belum Absen'
};

// --- Definisi Tipe/Interface Dihilangkan (Hanya dalam Komentar JSDoc opsional) ---

/**
 * @typedef {object} Student
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {object} AttendanceRecord
 * @property {string} studentId
 * @property {AttendanceStatusValue} status
 * @property {string} date // ISO date string YYYY-MM-DD
 */

/**
 * @typedef {object} Assignment
 * @property {string} id
 * @property {string} classId
 * @property {string} subject
 * @property {string} title
 * @property {string} deadline
 * @property {string} note
 */

/**
 * @typedef {object} ClassScheduleItem
 * @property {string} time
 * @property {string} subject
 * @property {string} [code] // The short code e.g. "BIND"
 * @property {string} [teacher]
 */

/**
 * @typedef {object} DailySchedule
 * @property {string} day
 * @property {ClassScheduleItem[]} lessons
 */

/**
 * @typedef {Record<string, DailySchedule[]>} ScheduleMap
 */

/**
 * @typedef {'light' | 'dark'} ThemeMode
 */

// --- Contoh Penggunaan (opsional) ---
/*
console.log(AttendanceStatus.HADIR); // Output: Hadir

// Contoh objek yang menggunakan 'tipe' di atas (tanpa penegasan tipe)
const newStudent = {
    id: 'S001',
    name: 'Budi'
};

const record = {
    studentId: newStudent.id,
    status: AttendanceStatus.SAKIT,
    date: '2025-11-21'
};
*/
