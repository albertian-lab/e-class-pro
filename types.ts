export enum AttendanceStatus {
  HADIR = 'Hadir',
  SAKIT = 'Sakit',
  IZIN = 'Izin',
  DISPENSASI = 'Dispensasi',
  ALPA = 'Alpa',
  UNSET = 'Belum Absen'
}

export interface Student {
  id: string;
  name: string;
}

export interface AttendanceRecord {
  studentId: string;
  status: AttendanceStatus;
  date: string; // ISO date string YYYY-MM-DD
}

export interface Assignment {
  id: string;
  classId: string;
  subject: string;
  title: string;
  deadline: string;
  note: string;
}

export interface ClassScheduleItem {
  time: string;
  subject: string;
  code?: string; // The short code e.g. "BIND"
  teacher?: string;
}

export interface DailySchedule {
  day: string;
  lessons: ClassScheduleItem[];
}

export type ScheduleMap = Record<string, DailySchedule[]>;

export type ThemeMode = 'light' | 'dark';
