
import { User, Certificate, Result, Event, TimetableSlot, GalleryItem, InstituteSettings, QuizQuestion } from '../types';

const KEYS = {
  USERS: 'sms_users',
  CERTIFICATES: 'sms_certificates',
  RESULTS: 'sms_results',
  EVENTS: 'sms_events',
  TIMETABLE: 'sms_timetable',
  GALLERY: 'sms_gallery',
  SETTINGS: 'sms_settings',
  QUIZ: 'sms_quiz'
};

export const storageService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },
  getCertificates: (): Certificate[] => {
    const data = localStorage.getItem(KEYS.CERTIFICATES);
    return data ? JSON.parse(data) : [];
  },
  saveCertificates: (certs: Certificate[]) => {
    localStorage.setItem(KEYS.CERTIFICATES, JSON.stringify(certs));
  },
  getResults: (): Result[] => {
    const data = localStorage.getItem(KEYS.RESULTS);
    return data ? JSON.parse(data) : [];
  },
  saveResults: (results: Result[]) => {
    localStorage.setItem(KEYS.RESULTS, JSON.stringify(results));
  },
  getEvents: (): Event[] => {
    const data = localStorage.getItem(KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  },
  saveEvents: (events: Event[]) => {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  },
  getTimetable: (): TimetableSlot[] => {
    const data = localStorage.getItem(KEYS.TIMETABLE);
    return data ? JSON.parse(data) : [];
  },
  saveTimetable: (slots: TimetableSlot[]) => {
    localStorage.setItem(KEYS.TIMETABLE, JSON.stringify(slots));
  },
  getGallery: (): GalleryItem[] => {
    const data = localStorage.getItem(KEYS.GALLERY);
    return data ? JSON.parse(data) : [];
  },
  saveGallery: (items: GalleryItem[]) => {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(items));
  },
  getSettings: (): InstituteSettings | null => {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : null;
  },
  saveSettings: (settings: InstituteSettings) => {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  },
  getQuiz: (): QuizQuestion[] => {
    const data = localStorage.getItem(KEYS.QUIZ);
    return data ? JSON.parse(data) : [];
  },
  saveQuiz: (questions: QuizQuestion[]) => {
    localStorage.setItem(KEYS.QUIZ, JSON.stringify(questions));
  }
};
