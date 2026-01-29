
export enum UserRole {
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface AttendanceRecord {
  month: string;
  percentage: number;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  method: string;
}

export interface User {
  id: string;
  name: string;
  rollNo: string;
  username?: string;
  class: string;
  role: UserRole;
  password?: string;
  attendance?: number;
  attendanceHistory?: AttendanceRecord[];
  
  fatherName?: string;
  cnic?: string;
  age?: string;
  gender?: string;
  nationality?: string;
  religion?: string;
  address?: string;
  reference?: string;
  photo?: string;

  totalFee?: number;
  paidFee?: number;
  paymentHistory?: PaymentRecord[];
}

export interface GalleryItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
}

export interface InstituteSettings {
  aboutText: string;
  mission: string;
  location: string;
  phone: string;
  email: string;
  logoUrl?: string;
}

export interface Result {
  id: string;
  studentId: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}

export interface TimetableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
}

export enum CertificateType {
  NTI = 'NTI',
  TTB = 'TTB'
}

export enum CertificateStatus {
  ISSUED = 'ISSUED',
  PENDING = 'PENDING'
}

export interface Certificate {
  id: string;
  certificateNo: string;
  studentId: string;
  type: CertificateType;
  title: string;
  duration?: string;
  issueDate: string;
  status: CertificateStatus;
  grade: string;
  photo?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
